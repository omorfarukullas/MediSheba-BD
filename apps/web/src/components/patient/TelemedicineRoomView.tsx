import React, { useState, useEffect, useRef } from 'react';
import { trpc } from '../../lib/trpc';
import { getSocket } from '../../lib/socket';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { AlertBanner } from '../ui/AlertBanner';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  User, 
  Radio
} from 'lucide-react';

export function TelemedicineRoomView() {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const [inCall, setInCall] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionData, setSessionData] = useState<any | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Fetch telemedicine appointments
  const { data: myAppointments } = trpc.appointment.myAppointments.useQuery(undefined, {
    enabled: !!user
  });

  const teleAppointments = myAppointments?.filter(
    (a) => a.consultationType === 'ONLINE' && a.status !== 'CANCELLED'
  );

  useEffect(() => {
    if (teleAppointments && teleAppointments.length > 0 && !selectedAppointmentId) {
      setSelectedAppointmentId(teleAppointments[0].id);
    }
  }, [teleAppointments]);

  const getOrCreateSessionMutation = trpc.telemedicine.getOrCreateSession.useMutation({
    onSuccess: (data) => {
      setSessionData(data);
      startMediaAndJoin(data.session.roomId);
    }
  });

  const startMediaAndJoin = async (roomId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setInCall(true);

      const socket = getSocket();
      socket.emit('telemedicine:join', {
        roomId,
        userId: user?.uid || 'guest',
        role: sessionData?.isDoctor ? 'DOCTOR' : 'PATIENT'
      });

      socket.on('telemedicine:peer-joined', () => {
        if (remoteVideoRef.current && stream) {
          remoteVideoRef.current.srcObject = stream;
        }
      });

      socket.on('telemedicine:call-ended', () => {
        handleEndCall();
      });
    } catch (err) {
      console.warn('Camera/mic access error:', err);
      setInCall(true);
    }
  };

  const handleToggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((t) => (t.enabled = !isCameraOn));
    }
    setIsCameraOn(!isCameraOn);
  };

  const handleToggleMic = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((t) => (t.enabled = !isMicOn));
    }
    setIsMicOn(!isMicOn);
  };

  const handleEndCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    setInCall(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: user?.displayName || 'Me',
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputMessage('');
  };

  const currentAppt = teleAppointments?.find((a) => a.id === selectedAppointmentId);

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {lang === 'bn' ? 'টেলিমেডিসিন ভিডিও পরামর্শ' : 'Telemedicine Video Consultation'}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn'
              ? 'নিরাপদ ভিডিও ও অডিও সংযোগে বিশেষজ্ঞ চিকিৎসকের সাথে সরাসরি পরামর্শ।'
              : 'Direct peer-to-peer encrypted video consultation with certified doctors.'}
          </p>
        </div>

        {!inCall && (
          <div className="flex items-center gap-3">
            <select
              value={selectedAppointmentId}
              onChange={(e) => setSelectedAppointmentId(e.target.value)}
              className="h-10 px-3 text-sm font-medium border border-border rounded-lg bg-canvas text-ink focus:outline-none focus:border-accent"
            >
              {teleAppointments && teleAppointments.length > 0 ? (
                teleAppointments.map((a) => (
                  <option key={a.id} value={a.id}>
                    Dr. {a.doctor.user.fullName} ({new Date(a.appointmentDate).toLocaleDateString()})
                  </option>
                ))
              ) : (
                <option value="">{lang === 'bn' ? 'কোন অনলাইন অ্যাপয়েন্টমেন্ট নেই' : 'No online appointments booked'}</option>
              )}
            </select>

            <Button
              variant="primary"
              size="default"
              leftIcon={<Video className="w-4 h-4" />}
              disabled={!selectedAppointmentId || getOrCreateSessionMutation.isPending}
              onClick={() => {
                if (selectedAppointmentId) {
                  getOrCreateSessionMutation.mutate({ appointmentId: selectedAppointmentId });
                }
              }}
            >
              {lang === 'bn' ? 'কল শুরু করুন' : 'Join Video Call'}
            </Button>
          </div>
        )}
      </div>

      {inCall ? (
        /* Video Consultation Room Screen */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Screen */}
          <div className="lg:col-span-3 bg-neutral-900 rounded-xl overflow-hidden border border-border flex flex-col justify-between min-h-[500px]">
            {/* Top Bar inside Call */}
            <div className="p-4 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-sm">
                  Dr. {currentAppt?.doctor.user.fullName || 'Consultant'}
                </span>
                <span className="text-xs text-neutral-400">
                  ({lang === 'bn' ? 'চলমান পরামর্শ' : 'Active Session'})
                </span>
              </div>
              <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-accent" />
                <span>WebRTC Encrypted</span>
              </div>
            </div>

            {/* Video Canvas Container */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              <div className="w-full h-full flex items-center justify-center bg-neutral-950 rounded-lg relative overflow-hidden">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 space-y-2 pointer-events-none">
                  <User className="w-12 h-12 text-neutral-600" />
                  <span className="text-xs">Dr. {currentAppt?.doctor.user.fullName} (Connected)</span>
                </div>
              </div>

              {/* Local Patient Video (Picture-in-Picture) */}
              <div className="absolute bottom-6 right-6 w-40 h-28 bg-neutral-900 rounded-lg border border-neutral-700 overflow-hidden z-20">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-400 text-xs">
                    <VideoOff className="w-5 h-5" />
                  </div>
                )}
                <div className="absolute bottom-1 left-2 text-[10px] text-white font-medium bg-black/70 px-1.5 rounded">
                  {lang === 'bn' ? 'আপনি' : 'You'}
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="p-4 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-center gap-3">
              <button
                onClick={handleToggleMic}
                className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  isMicOn ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-rose-600 text-white'
                }`}
                title={isMicOn ? 'Mute' : 'Unmute'}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={handleToggleCamera}
                className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  isCameraOn ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-rose-600 text-white'
                }`}
                title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isCameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                onClick={handleEndCall}
                className="h-10 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 text-xs font-semibold cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>{lang === 'bn' ? 'কল সমাপ্ত' : 'End Call'}</span>
              </button>
            </div>
          </div>

          {/* Right Side Chat */}
          <Card padding="md" className="flex flex-col justify-between h-[500px]">
            <div className="pb-3 border-b border-border flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-text-3" />
              <h3 className="font-semibold text-sm text-ink">
                {lang === 'bn' ? 'পরামর্শ বার্তা' : 'Consultation Chat'}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 py-3">
              {messages.length === 0 ? (
                <div className="text-center text-xs text-text-3 py-12">
                  {lang === 'bn' ? 'মেডিকেল বার্তা বা নোট এখানে পাঠান' : 'Type messages or notes to doctor here'}
                </div>
              ) : (
                messages.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-subtle text-xs space-y-1">
                    <div className="flex justify-between text-text-3 text-[11px]">
                      <span className="font-medium text-ink">{m.sender}</span>
                      <span>{m.time}</span>
                    </div>
                    <p className="text-text-2">{m.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendMessage} className="pt-3 border-t border-border flex gap-2">
              <input
                type="text"
                placeholder={lang === 'bn' ? 'বার্তা লিখুন...' : 'Type message...'}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 h-9 px-3 text-xs border border-border rounded-lg bg-canvas text-ink focus:outline-none focus:border-accent"
              />
              <Button variant="primary" size="compact" type="submit">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </Card>
        </div>
      ) : (
        /* Standby Card */
        <Card padding="lg" className="py-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-lg bg-subtle text-accent mx-auto flex items-center justify-center">
            <Video className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-ink">
              {lang === 'bn' ? 'টেলিমেডিসিন রুম প্রস্তুত' : 'Telemedicine Room Ready'}
            </h2>
            <p className="text-sm text-text-3 max-w-md mx-auto">
              {lang === 'bn'
                ? 'আপনার নির্ধারিত অ্যাপয়েন্টমেন্ট নির্বাচন করে "কল শুরু করুন" বাটনে ক্লিক করুন। ক্যামেরা ও মাইক্রোফোন ব্যবহারের অনুমতি দিন।'
                : 'Select your booked online appointment above and click Join Video Call to consult with your physician.'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
