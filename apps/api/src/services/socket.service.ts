import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

let io: SocketIOServer | null = null;

export interface QueueUpdatePayload {
  doctorId: string;
  currentSerial?: number;
  totalWaiting?: number;
  calledAppointmentId?: string;
  timestamp: string;
}

export interface AmbulanceLocationPayload {
  ambulanceId: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  timestamp: string;
}

export interface TelemedicineSignalPayload {
  roomId: string;
  senderId: string;
  targetId?: string;
  type: 'offer' | 'answer' | 'ice-candidate' | 'call-ended' | 'peer-ready';
  data: any;
}

export const initSocketServer = (httpServer: HttpServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173'
      ],
      credentials: true,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket: Socket) => {
    logger.info(`🔌 Socket client connected: ${socket.id}`);

    // Join doctor's live queue room
    socket.on('queue:join', ({ doctorId }: { doctorId: string }) => {
      const room = `doctor_queue_${doctorId}`;
      socket.join(room);
      logger.info(`Socket ${socket.id} joined room: ${room}`);
    });

    // Leave doctor's live queue room
    socket.on('queue:leave', ({ doctorId }: { doctorId: string }) => {
      const room = `doctor_queue_${doctorId}`;
      socket.leave(room);
    });

    // Doctor/Admin broadcasts queue advance/change
    socket.on('queue:advance', (payload: QueueUpdatePayload) => {
      const room = `doctor_queue_${payload.doctorId}`;
      io?.to(room).emit('queue:updated', payload);
      logger.info(`📢 Queue updated for doctor ${payload.doctorId}`);
    });

    // Join telemedicine video consultation room
    socket.on('telemedicine:join', ({ roomId, userId, role }: { roomId: string; userId: string; role: string }) => {
      const room = `tele_${roomId}`;
      socket.join(room);
      logger.info(`📹 User ${userId} (${role}) joined telemedicine room: ${room}`);
      
      // Notify other peer in the room
      socket.to(room).emit('telemedicine:peer-joined', { userId, role, socketId: socket.id });
    });

    // Exchange WebRTC peer-to-peer signals (offer, answer, ICE)
    socket.on('telemedicine:signal', (payload: TelemedicineSignalPayload) => {
      const room = `tele_${payload.roomId}`;
      socket.to(room).emit('telemedicine:signal', payload);
    });

    // End telemedicine call
    socket.on('telemedicine:end', ({ roomId }: { roomId: string }) => {
      const room = `tele_${roomId}`;
      io?.to(room).emit('telemedicine:call-ended');
      logger.info(`🛑 Telemedicine session ended in room: ${room}`);
    });

    // Ambulance driver sends live GPS updates
    socket.on('ambulance:update-location', (payload: AmbulanceLocationPayload) => {
      // Broadcast to all tracking clients
      io?.emit('ambulance:location-changed', payload);
    });

    socket.on('disconnect', () => {
      logger.info(`❌ Socket client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getSocketServer = (): SocketIOServer | null => {
  return io;
};

// Helper to broadcast queue updates from tRPC mutations
export const broadcastQueueUpdate = (payload: QueueUpdatePayload) => {
  if (!io) return;
  io.to(`doctor_queue_${payload.doctorId}`).emit('queue:updated', payload);
};

// Helper to broadcast ambulance emergency dispatched
export const broadcastEmergencyUpdate = (emergencyData: any) => {
  if (!io) return;
  io.emit('emergency:updated', emergencyData);
};

