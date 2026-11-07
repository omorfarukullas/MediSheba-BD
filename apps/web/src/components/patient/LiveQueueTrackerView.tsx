import React, { useState, useEffect } from 'react';
import { trpc } from '../../lib/trpc';
import { getSocket } from '../../lib/socket';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { 
  Clock, 
  UserCheck, 
  AlertCircle, 
  Bell, 
  Users, 
  CheckCircle2, 
  Radio, 
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';

export function LiveQueueTrackerView() {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [liveSerial, setLiveSerial] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [soundAlert, setSoundAlert] = useState(true);

  // Fetch doctors for selector
  const { data: doctors } = trpc.doctor.list.useQuery();

  // If patient has appointments, fetch them
  const { data: myAppointments } = trpc.appointment.myAppointments.useQuery(undefined, {
    enabled: !!user
  });

  // Default to first appointment doctor or first doctor in list
  useEffect(() => {
    if (myAppointments && myAppointments.length > 0 && !selectedDoctorId) {
      setSelectedDoctorId(myAppointments[0].doctorId);
    } else if (doctors && doctors.length > 0 && !selectedDoctorId) {
      setSelectedDoctorId(doctors[0].id);
    }
  }, [myAppointments, doctors]);

  // Query live queue data for selected doctor
  const { data: queueData, refetch } = trpc.queue.getStatus.useQuery(
    { doctorId: selectedDoctorId },
    { enabled: !!selectedDoctorId }
  );

  // Socket.io Realtime Listener
  useEffect(() => {
    if (!selectedDoctorId) return;

    const socket = getSocket();

    // Join doctor's specific queue room
    socket.emit('queue:join', { doctorId: selectedDoctorId });

    const handleQueueUpdate = (payload: any) => {
      if (payload.doctorId === selectedDoctorId) {
        if (payload.currentSerial !== undefined) {
          setLiveSerial(payload.currentSerial);
        }
        setLastUpdated(new Date().toLocaleTimeString());
        refetch();
      }
    };

    socket.on('queue:updated', handleQueueUpdate);

    return () => {
      socket.emit('queue:leave', { doctorId: selectedDoctorId });
      socket.off('queue:updated', handleQueueUpdate);
    };
  }, [selectedDoctorId, refetch]);

  const activeDoctor = doctors?.find((d) => d.id === selectedDoctorId);
  const patientAppointment = myAppointments?.find(
    (a) => a.doctorId === selectedDoctorId && a.status !== 'CANCELLED' && a.status !== 'COMPLETED'
  );

  const currentServingNumber = liveSerial ?? queueData?.currentlyServing ?? 0;
  const mySerial = patientAppointment?.queueNumber ?? null;
  const patientsAhead = mySerial && currentServingNumber ? Math.max(0, mySerial - currentServingNumber) : null;
  const estimatedWaitMinutes = patientsAhead ? patientsAhead * 12 : 0;
  const isMyTurnNow = mySerial && currentServingNumber === mySerial;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            {lang === 'bn' ? 'সরাসরি চেম্বার সংযোগ' : 'Real-Time Socket Connected'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
            {lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল ট্র্যাকার' : 'Live Chamber Serial Tracker'}
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            {lang === 'bn'
              ? 'চেম্বারের ভিড়ে অপেক্ষা না করে ঘরে বসেই জানুন বর্তমান চলমান সিরিয়াল ও আপনার আনুমানিক সময়।'
              : 'Track live chamber queue token from home and know exactly when your turn arrives.'}
          </p>
        </div>

        {/* Doctor Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="px-4 py-2.5 text-sm font-semibold border border-rule rounded-xl bg-panel text-ink focus:outline-none focus:border-accent shadow-xs"
          >
            {doctors?.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.user.fullName} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Turn Alert Banner (If it is patient's turn or approaching) */}
      {isMyTurnNow && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-yellow-300 animate-spin" />
            <div>
              <h3 className="font-extrabold text-lg">
                {lang === 'bn' ? 'আপনার সিরিয়াল ডাকা হয়েছে!' : "It's Your Turn! Please Enter Chamber"}
              </h3>
              <p className="text-sm text-white/90">
                {lang === 'bn' 
                  ? `ডাক্তার ${activeDoctor?.user.fullName || ''}-এর চেম্বারে প্রবেশ করুন।`
                  : `Doctor is waiting for Serial #${mySerial}.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Live Token Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Currently Serving (Big Display) */}
        <div className="md:col-span-2 bg-gradient-to-br from-panel via-ground to-panel border-2 border-accent/40 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              {lang === 'bn' ? 'বর্তমান চলমান সিরিয়াল' : 'Currently In Chamber'}
            </div>
            {lastUpdated && (
              <span className="text-[11px] text-ink-secondary flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {lang === 'bn' ? 'আপডেট:' : 'Updated:'} {lastUpdated}
              </span>
            )}
          </div>

          <div className="my-6 text-center">
            <div className="text-7xl md:text-9xl font-black text-ink tracking-tight font-display">
              {currentServingNumber > 0 ? (
                <span className="text-accent">{currentServingNumber}</span>
              ) : (
                <span className="text-ink-secondary text-5xl">--</span>
              )}
            </div>
            <p className="text-sm text-ink-secondary mt-2">
              {queueData?.activePatientName ? (
                <span className="font-semibold text-ink">
                  {lang === 'bn' ? 'পরামর্শ নিচ্ছেন:' : 'Consulting:'} {queueData.activePatientName}
                </span>
              ) : (
                <span>{lang === 'bn' ? 'চেম্বারে রোগী প্রবেশের অপেক্ষায়' : 'Chamber is preparing'}</span>
              )}
            </p>
          </div>

          <div className="pt-4 border-t border-rule flex items-center justify-between text-xs text-ink-secondary">
            <span>
              {lang === 'bn' ? 'ডাক্তার:' : 'Doctor:'} <strong className="text-ink">{activeDoctor?.user.fullName}</strong>
            </span>
            <span>
              {lang === 'bn' ? 'হাসপাতাল:' : 'Chamber:'} <strong className="text-ink">{activeDoctor?.hospital.name}</strong>
            </span>
          </div>
        </div>

        {/* Card 2: Patient's Personal Status */}
        <div className="bg-panel border border-rule rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-ink">
                {lang === 'bn' ? 'আপনার অ্যাপয়েন্টমেন্ট' : 'Your Serial Token'}
              </h3>
              <UserCheck className="w-5 h-5 text-accent" />
            </div>

            {mySerial ? (
              <div className="space-y-4">
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 text-center">
                  <div className="text-xs text-ink-secondary uppercase font-semibold">
                    {lang === 'bn' ? 'আপনার নির্ধারিত সিরিয়াল' : 'Your Serial Number'}
                  </div>
                  <div className="text-4xl font-extrabold text-accent mt-1">
                    #{mySerial}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-ground border border-rule">
                    <span className="text-ink-secondary">{lang === 'bn' ? 'আপনার সামনে রোগী:' : 'Patients Ahead:'}</span>
                    <span className="font-bold text-ink">
                      {patientsAhead !== null ? `${patientsAhead} ${lang === 'bn' ? 'জন' : ''}` : '--'}
                    </span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded-xl bg-ground border border-rule">
                    <span className="text-ink-secondary">{lang === 'bn' ? 'আনুমানিক অপেক্ষা:' : 'Est. Wait Time:'}</span>
                    <span className="font-bold text-accent">
                      ~ {estimatedWaitMinutes} {lang === 'bn' ? 'মিনিট' : 'mins'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center bg-ground rounded-2xl border border-rule text-xs text-ink-secondary space-y-3">
                <p>
                  {lang === 'bn' 
                    ? 'এই ডাক্তারের জন্য আপনার কোন চলমান সিরিয়াল নেই।' 
                    : 'You do not have an active booking with this doctor today.'}
                </p>
                <div className="text-[11px] text-ink-secondary/70">
                  {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিয়ে সিরিয়াল নম্বর সংগ্রহ করুন।' : 'Book an appointment to track your token.'}
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-rule text-center">
            <span className="text-[11px] text-ink-secondary">
              {lang === 'bn' ? 'রিয়েল-টাইম পুশ নোটিফিকেশন সক্রিয়' : 'Live queue updates connected'}
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming in Line Token List */}
      <div className="bg-panel border border-rule rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-base text-ink">
              {lang === 'bn' ? 'পরবর্তী সিরিয়াল তালিকা' : 'Next In Line Tokens'}
            </h3>
          </div>
          <span className="text-xs font-semibold text-ink-secondary">
            {lang === 'bn' ? 'অপেক্ষমাণ:' : 'Total Waiting:'} {queueData?.waitingCount ?? 0} {lang === 'bn' ? 'জন' : ''}
          </span>
        </div>

        {queueData?.nextInLine && queueData.nextInLine.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {queueData.nextInLine.map((item, idx) => {
              const isMine = mySerial === item.position;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-center transition ${
                    isMine 
                      ? 'border-accent bg-accent/15 ring-2 ring-accent' 
                      : 'border-rule bg-ground'
                  }`}
                >
                  <div className="text-[11px] font-semibold text-ink-secondary">
                    {idx === 0 ? (lang === 'bn' ? 'পরবর্তী' : 'Next') : `#${idx + 1}`}
                  </div>
                  <div className="text-xl font-bold text-ink mt-0.5">
                    #{item.position}
                  </div>
                  {isMine && (
                    <span className="text-[10px] font-bold text-accent uppercase">
                      {lang === 'bn' ? 'আপনার সিরিয়াল' : 'You'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-ink-secondary bg-ground rounded-xl border border-rule">
            {lang === 'bn' ? 'বর্তমানে কোন অপেক্ষমাণ রোগী নেই।' : 'No patients currently waiting in line.'}
          </div>
        )}
      </div>
    </div>
  );
}

