import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router.js';
import { createContext } from './trpc.js';
import { initSocketServer } from './services/socket.service.js';
import pino from 'pino';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

// Proper secure CORS
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'MediSheba BD API (tRPC + Node.js 22 + Prisma)',
    timestamp: new Date().toISOString()
  });
});

// tRPC API Endpoint
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

const httpServer = http.createServer(app);

// Initialize Socket.io WebSocket server
initSocketServer(httpServer);

httpServer.listen(PORT, () => {
  logger.info(`🏥 MediSheba BD API Server running on http://localhost:${PORT}`);
  logger.info(`⚡ tRPC endpoint available at http://localhost:${PORT}/trpc`);
  logger.info(`🔌 Realtime WebSocket Server initialized on port ${PORT}`);
});

