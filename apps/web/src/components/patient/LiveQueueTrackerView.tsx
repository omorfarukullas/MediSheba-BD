import React, { useState, useEffect } from 'react';
import { trpc } from '../../lib/trpc';
import { getSocket } from '../../lib/socket';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Clock, 
  UserCheck, 
  Users, 
  Radio
} from 'lucide-react';

export function LiveQueueTrackerView() {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [liveSerial, setLiveSerial] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

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

  return (
    <div className="space-y-6">
      {/* Header & Doctor Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="eyebrow flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17] mb-1">
            <Radio className="w-3.5 h-3.5 text-[#0f3e17] animate-pulse" />
            <span>{lang === 'bn' ? 'সরাসরি চেম্বার সংযোগ' : 'Real-time chamber socket'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-[28px] font-light text-[#0f3e17] tracking-tight">
            {lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল বোর্ড' : 'Live Chamber Queue Board'}
          </h2>
          <p className="text-[14px] text-[#222222]/70">
            {lang === 'bn'
              ? 'চেম্বারের বর্তমান চলমান টোকেন এবং আপনার সিরিয়ালের সরাসরি আপডেট।'
              : 'Live token stream directly from the chamber desk.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="h-11 px-4 text-sm font-medium border border-[#efeeeb] rounded-[14px] bg-[#fffefc] text-[#0f3e17] focus:outline-none focus:ring-1 focus:ring-[#0f3e17]"
          >
            {doctors?.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.user.fullName} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Now Serving (Slate Hush Panel) & Patient Status (Cream Paper) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Currently In Chamber (Slate Hush Panel Container with Floating Card) */}
        <div className="bg-[#b6ced5] rounded-[14px] p-4 sm:p-5 flex flex-col justify-between">
          <div className="bg-[#fffefc] rounded-[14px] p-6 sm:p-7 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="accent" icon={<span className="w-2 h-2 rounded-full bg-[#0f3e17] animate-pulse mr-1 inline-block" />}>
                {lang === 'bn' ? 'বর্তমান সিরিয়াল' : 'Now Serving'}
              </Badge>
              {lastUpdated && (
                <span className="text-xs text-[#222222]/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {lang === 'bn' ? 'আপডেট:' : 'Updated:'} {lastUpdated}
                </span>
              )}
            </div>

            <div className="my-4 text-center">
              <div className="font-serif text-6xl sm:text-7xl font-light text-[#0f3e17] tracking-tight">
                {currentServingNumber > 0 ? `#${currentServingNumber}` : '--'}
              </div>
              <p className="text-[14px] text-[#222222]/70 mt-2">
                {queueData?.activePatientName ? (
                  <span>
                    {lang === 'bn' ? 'পরামর্শ নিচ্ছেন:' : 'Consulting:'} <strong className="text-[#0f3e17] font-medium">{queueData.activePatientName}</strong>
                  </span>
                ) : (
                  <span className="text-[#222222]/60">
                    {lang === 'bn' ? 'চেম্বারে রোগী প্রবেশের অপেক্ষায়' : 'Chamber is preparing'}
                  </span>
                )}
              </p>
            </div>

            <div className="pt-3 border-t border-[#efeeeb] flex items-center justify-between text-xs text-[#222222]/70">
              <span>
                {lang === 'bn' ? 'ডাক্তার:' : 'Doctor:'} <strong className="text-[#0f3e17] font-medium">{activeDoctor?.user.fullName}</strong>
              </span>
              <span>
                {lang === 'bn' ? 'চেম্বার:' : 'Chamber:'} <strong className="text-[#0f3e17] font-medium">{activeDoctor?.hospital.name}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Patient's Personal Status */}
        <Card variant="default" padding="lg" className="flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-light text-[#0f3e17]">
              {lang === 'bn' ? 'আপনার সিরিয়াল টোকেন' : 'Your Serial Token'}
            </h3>
            <UserCheck className="w-4 h-4 text-[#0f3e17]" />
          </div>

          {mySerial ? (
            <div className="space-y-4">
              <div className="p-5 rounded-[14px] bg-[#e1f4df] border border-[#0f3e17]/15 text-center">
                <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                  {lang === 'bn' ? 'আপনার নির্ধারিত সিরিয়াল' : 'Your Serial Number'}
                </div>
                <div className="font-serif text-5xl font-light text-[#0f3e17] mt-1">
                  #{mySerial}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-[14px] bg-[#fffefc] border border-[#efeeeb]">
                  <div className="text-[#222222]/60">{lang === 'bn' ? 'সামনে অপেক্ষমাণ:' : 'Patients Ahead:'}</div>
                  <div className="font-serif text-2xl font-light text-[#0f3e17] mt-0.5">
                    {patientsAhead !== null ? `${patientsAhead} ${lang === 'bn' ? 'জন' : ''}` : '--'}
                  </div>
                </div>

                <div className="p-3.5 rounded-[14px] bg-[#fffefc] border border-[#efeeeb]">
                  <div className="text-[#222222]/60">{lang === 'bn' ? 'আনুমানিক অপেক্ষা:' : 'Est. Wait Time:'}</div>
                  <div className="font-serif text-2xl font-light text-[#0f3e17] mt-0.5">
                    ~ {estimatedWaitMinutes} {lang === 'bn' ? 'মিনিট' : 'mins'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center bg-[#e1f4df]/30 rounded-[14px] border border-[#efeeeb] text-xs text-[#222222]/70 space-y-2">
              <p>
                {lang === 'bn' 
                  ? 'এই চিকিৎসকের কাছে আপনার আজকের কোন চলমান সিরিয়াল নেই।' 
                  : 'You do not have an active booking with this doctor today.'}
              </p>
              <p className="text-[#0f3e17] font-medium">
                {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিয়ে সিরিয়াল নম্বর সংগ্রহ করুন।' : 'Book an appointment to track your token.'}
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-[#efeeeb] text-center text-xs text-[#222222]/60">
            {lang === 'bn' ? 'রিয়েল-টাইম পুশ নোটিফিকেশন সংযুক্ত' : 'Live queue socket connected'}
          </div>
        </Card>
      </div>

      {/* Next in line tokens */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#efeeeb]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0f3e17]" />
            <h3 className="font-serif text-lg font-light text-[#0f3e17]">
              {lang === 'bn' ? 'পরবর্তী অপেক্ষমাণ সিরিয়াল' : 'Next In Line Tokens'}
            </h3>
          </div>
          <span className="text-xs text-[#222222]/60">
            {lang === 'bn' ? 'মোট অপেক্ষমাণ:' : 'Total Waiting:'} {queueData?.waitingCount ?? 0}
          </span>
        </div>

        {queueData?.nextInLine && queueData.nextInLine.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {queueData.nextInLine.map((item, idx) => {
              const isMine = mySerial === item.position;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-[14px] border text-center transition-colors ${
                    isMine 
                      ? 'border-[#0f3e17] bg-[#e1f4df] text-[#0f3e17]' 
                      : 'border-[#efeeeb] bg-[#fffefc] text-[#222222]'
                  }`}
                >
                  <div className="text-xs text-[#222222]/60">
                    {idx === 0 ? (lang === 'bn' ? 'পরবর্তী' : 'Next') : `#${idx + 1}`}
                  </div>
                  <div className="font-serif text-2xl font-light mt-0.5 text-[#0f3e17]">
                    #{item.position}
                  </div>
                  {isMine && (
                    <span className="eyebrow text-[10px] font-semibold text-[#0f3e17] uppercase tracking-wider block mt-0.5">
                      {lang === 'bn' ? 'আপনার' : 'You'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-[#222222]/60 bg-[#e1f4df]/20 rounded-[14px] border border-[#efeeeb]">
            {lang === 'bn' ? 'বর্তমানে কোন অপেক্ষমাণ রোগী নেই।' : 'No patients currently waiting in line.'}
          </div>
        )}
      </Card>
    </div>
  );
}
