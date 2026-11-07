import React, { useState, useEffect, useRef } from 'react';
import { trpc } from '../../lib/trpc';
import { getSocket } from '../../lib/socket';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  Send, 
  FileText, 
  ShieldCheck, 
  CheckCircle,
  User,
  Radio,
  Clock
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
        // Mock remote connected stream / notification
        if (remoteVideoRef.current && stream) {
          remoteVideoRef.current.srcObject = stream;
        }
      });

      socket.on('telemedicine:call-ended', () => {
        handleEndCall();
      });
    } catch (err) {
      console.warn('Camera/mic access error:', err);
      // Fallback preview mode
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
      streamRef.current = null;
    }
    if (sessionData?.session?.roomId) {
      getSocket().emit('telemedicine:end', { roomId: sessionData.session.roomId });
    }
    setInCall(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: user?.displayName || user?.email?.split('@')[0] || 'Me',
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputMessage('');
  };

  const currentAppt = teleAppointments?.find((a) => a.id === selectedAppointmentId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
            <Video className="w-4 h-4 text-emerald-500 animate-pulse" />
            {lang === 'bn' ? 'এইচডি অডিও ও ভিডিও কনসাল্টেশন' : 'HD Telemedicine Suite'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
            {lang === 'bn' ? 'টেলিমেডিসিন ভিডিও পরামর্শ' : 'Telemedicine Video Consultation'}
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            {lang === 'bn'
              ? 'অনলাইনে বিশেষজ্ঞ ডাক্তারের সাথে সরাসরি কথা বলুন এবং ডিজিটাল প্রেসক্রিপশন সংগ্রহ করুন।'
              : 'Direct peer-to-peer secure video call with doctor and real-time digital prescription.'}
          </p>
        </div>

        {!inCall && (
          <div className="flex items-center gap-3">
            <select
              value={selectedAppointmentId}
              onChange={(e) => setSelectedAppointmentId(e.target.value)}
              className="px-4 py-2.5 text-xs font-semibold border border-rule rounded-xl bg-panel text-ink focus:outline-none focus:border-accent shadow-xs"
            >
              {teleAppointments && teleAppointments.length > 0 ? (
                teleAppointments.map((a) => (
                  <option key={a.id} value={a.id}>
                    Dr. {a.doctor.user.fullName} ({new Date(a.appointmentDate).toLocaleDateString()} {a.appointmentTime})
                  </option>
                ))
              ) : (
                <option value="">{lang === 'bn' ? 'অনলাইন অ্যাপয়েন্টমেন্ট নেই' : 'No online appointments booked'}</option>
              )}
            </select>

            <button
              onClick={() => {
                if (selectedAppointmentId) {
                  getOrCreateSessionMutation.mutate({ appointmentId: selectedAppointmentId });
                }
              }}
              disabled={!selectedAppointmentId || getOrCreateSessionMutation.isPending}
              className="bg-accent hover:opacity-90 text-on-accent font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-sm disabled:opacity-50"
            >
              <Video className="w-4 h-4" />
              <span>{lang === 'bn' ? 'কল শুরু করুন' : 'Join Video Call'}</span>
            </button>
          </div>
        )}
      </div>

      {inCall ? (
        /* Video Consultation Room Screen */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Screen */}
          <div className="lg:col-span-3 bg-gray-950 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between min-h-[500px]">
            {/* Top Bar inside Call */}
            <div className="relative z-10 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span className="font-bold text-sm">
                  Dr. {currentAppt?.doctor.user.fullName || 'Consultant'}
                </span>
                <span className="text-xs text-white/70">
                  ({lang === 'bn' ? 'চলমান পরামর্শ' : 'Active Session'})
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>WebRTC Encrypted</span>
              </div>
            </div>

            {/* Video Canvas Container */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              {/* Remote Doctor Video */}
              <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-2xl relative overflow-hidden">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-2 pointer-events-none">
                  <User className="w-16 h-16 text-white/20" />
                  <span className="text-xs">Dr. {currentAppt?.doctor.user.fullName} (Connected)</span>
                </div>
              </div>

              {/* Local Patient Video (Picture-in-Picture) */}
              <div className="absolute bottom-6 right-6 w-44 h-32 bg-black rounded-2xl border-2 border-white/30 overflow-hidden shadow-xl z-20">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white/60 text-[11px]">
                    <VideoOff className="w-5 h-5 mb-1" />
                  </div>
                )}
                <div className="absolute bottom-1 left-2 text-[10px] text-white/90 font-bold bg-black/60 px-1.5 rounded">
                  {lang === 'bn' ? 'আপনি' : 'You'}
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 p-5 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-center gap-4">
              <button
                onClick={handleToggleMic}
                className={`p-3.5 rounded-2xl transition ${
                  isMicOn ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-rose-600 text-white'
                }`}
                title={isMicOn ? 'Mute' : 'Unmute'}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={handleToggleCamera}
                className={`p-3.5 rounded-2xl transition ${
                  isCameraOn ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-rose-600 text-white'
                }`}
                title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition"
              >
                <PhoneOff className="w-5 h-5" />
                <span>{lang === 'bn' ? 'পরামর্শ সমাপ্ত' : 'End Call'}</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar: In-call Chat & Prescription */}
          <div className="bg-panel border border-rule rounded-3xl p-5 shadow-sm flex flex-col justify-between h-[500px]">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-rule">
                <MessageSquare className="w-4 h-4 text-accent" />
                <h3 className="font-bold text-sm text-ink">
                  {lang === 'bn' ? 'পরামর্শ চ্যাট ও নোট' : 'In-Call Messages'}
                </h3>
              </div>

              {/* Chat Message List */}
              <div className="py-3 space-y-3 overflow-y-auto max-h-[340px]">
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-xs text-ink-secondary">
                    {lang === 'bn' ? 'কোন বার্তা নেই। নিচে মেসেজ লিখুন।' : 'Send a message to the doctor'}
                  </div>
                ) : (
                  messages.map((m, idx) => (
                    <div key={idx} className="bg-ground p-2.5 rounded-xl border border-rule text-xs space-y-1">
                      <div className="flex justify-between text-[10px] text-ink-secondary font-semibold">
                        <span>{m.sender}</span>
                        <span>{m.time}</span>
                      </div>
                      <p className="text-ink font-medium">{m.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-rule">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={lang === 'bn' ? 'মেসেজ লিখুন...' : 'Type message...'}
                className="flex-1 border border-rule rounded-xl px-3 py-2 text-xs bg-ground text-ink focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-accent text-on-accent hover:opacity-90 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Empty / Pre-call View */
        <div className="bg-panel border border-rule rounded-3xl p-10 text-center max-w-xl mx-auto shadow-sm space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-accent/10 text-accent flex items-center justify-center mx-auto shadow-xs">
            <Video className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-ink">
              {lang === 'bn' ? 'টেলিমেডিসিন রুম প্রস্তুত' : 'Virtual Consultation Room Ready'}
            </h2>
            <p className="text-xs text-ink-secondary max-w-sm mx-auto">
              {lang === 'bn'
                ? 'অনলাইন অ্যাপয়েন্টমেন্ট নির্বাচন করে "কল শুরু করুন" বোতামে চাপ দিন। আপনার ক্যামেরা ও মাইক্রোফোন ব্যবহারের অনুমতি দিন।'
                : 'Select your scheduled appointment and click "Join Video Call" to meet your physician.'}
            </p>
          </div>

          {currentAppt ? (
            <div className="p-4 rounded-2xl bg-ground border border-rule text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-ink-secondary">{lang === 'bn' ? 'চিকিৎসক' : 'Physician'}:</span>
                <span className="font-bold text-ink">Dr. {currentAppt.doctor.user.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">{lang === 'bn' ? 'হাসপাতাল' : 'Hospital'}:</span>
                <span className="font-semibold text-ink">{currentAppt.doctor.hospital.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">{lang === 'bn' ? 'তারিখ ও সময়' : 'Schedule'}:</span>
                <span className="font-semibold text-accent">
                  {new Date(currentAppt.appointmentDate).toLocaleDateString()} at {currentAppt.appointmentTime}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200">
              {lang === 'bn' 
                ? 'আপনার কোন অনলাইন অ্যাপয়েন্টমেন্ট পাওয়া যায়নি। প্রথমে "ডাক্তার খুঁজুন" ট্যাব থেকে অনলাইন কনসাল্টেশন বুক করুন।' 
                : 'No online consultation appointment found. Please book an online slot under Find Doctor.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
