import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  FileText, 
  Video, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Trash2, 
  FolderLock, 
  Lock, 
  ShieldCheck, 
  HeartPulse, 
  PhoneCall, 
  Eye,
  Settings
} from 'lucide-react';

export function DoctorPortalView() {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'queue' | 'appointments' | 'schedule' | 'prescribe'>('queue');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  // Schedule settings state
  const [feePhysical, setFeePhysical] = useState(800);
  const [feeOnline, setFeeOnline] = useState(500);
  const [teleEnabled, setTeleEnabled] = useState(true);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]); // Sun-Thu
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('21:00');

  // Prescription Form State
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [medicines, setMedicines] = useState<{ name: string; dosage: string; duration: string; instruction: string }[]>([
    { name: 'Tab. Paracetamol 500mg', dosage: '1+1+1', duration: '3 days', instruction: 'After food' }
  ]);

  // Doctor dashboard overview
  const { data: dashboard, isLoading, refetch } = trpc.doctor.getDashboard.useQuery(undefined, {
    enabled: !!user
  });

  // Patient History (with visibility enforcement)
  const { data: patientHistory, isLoading: isLoadingHistory } = trpc.doctor.getPatientHistory.useQuery(
    { patientId: selectedPatientId! },
    { enabled: !!selectedPatientId }
  );

  // Queue mutations
  const updateQueueMutation = trpc.queue.updateStatus.useMutation({
    onSuccess: () => refetch()
  });

  const reorderQueueMutation = trpc.queue.reorderQueue.useMutation({
    onSuccess: () => refetch()
  });

  // Schedule mutation
  const updateScheduleMutation = trpc.doctor.updateSchedule.useMutation({
    onSuccess: () => {
      alert(lang === 'bn' ? 'সফলভাবে শিডিউল আপডেট হয়েছে!' : 'Schedule updated successfully!');
      refetch();
    }
  });

  const handleAdvanceQueue = (queueId: string, status: 'WAITING' | 'CALLED' | 'IN_CONSULTATION' | 'COMPLETED' | 'SKIPPED') => {
    updateQueueMutation.mutate({ queueId, status });
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '1+0+1', duration: '5 days', instruction: 'After food' }]);
  };

  const handleRemoveMedicine = (idx: number) => {
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const slots = selectedDays.map((d) => ({
      dayOfWeek: d,
      startTime,
      endTime,
      slotDuration: 15,
      consultationType: 'PHYSICAL' as const,
      isActive: true,
      maxPatients: 20
    }));

    updateScheduleMutation.mutate({
      slots,
      isTelemedicineEnabled: teleEnabled,
      consultationFeeOnline: feeOnline,
      consultationFeePhysical: feePhysical
    });
  };

  const activeQueue = dashboard?.doctor.queues || [];
  const todayAppointments = dashboard?.appointments || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4" />
            {lang === 'bn' ? 'চিকিৎসক নিয়ন্ত্রণ প্যানেল' : 'Physician Master Suite'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
            {lang === 'bn' ? 'ডাক্তার ড্যাশবোর্ড ও স্মার্ট চেম্বার কিউ' : 'Doctor Dashboard & Smart Queue Control'}
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            {lang === 'bn' 
              ? 'চেম্বারের রোগী তালিকা, স্মার্ট সিরিয়াল কলিং, পূর্ববর্তী প্রেসক্রিপশন ও টেলিমেডিসিন নিয়ন্ত্রণ।'
              : 'Manage patient appointments, advance smart serial queues, access medical history, and issue prescriptions.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-ground-muted p-1 rounded-2xl border border-rule text-xs font-semibold">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'queue' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            {lang === 'bn' ? 'স্মার্ট সিরিয়াল কিউ' : 'Live Smart Queue'}
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'appointments' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            {lang === 'bn' ? 'দৈনিক রোগী তালিকা' : 'Patient List'}
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'schedule' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            {lang === 'bn' ? 'চেম্বারের শিডিউল' : 'Availability Slots'}
          </button>
        </div>
      </div>

      {/* TAB 1: Smart Queue Management */}
      {activeTab === 'queue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-ink">
                {lang === 'bn' ? 'চেম্বারের লাইভ সিরিয়াল কিউ' : 'Active Queue Stream'}
              </h2>
              <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                {activeQueue.length} {lang === 'bn' ? 'জন অপেক্ষমাণ' : 'Patients Waiting'}
              </span>
            </div>

            {activeQueue.length === 0 ? (
              <div className="p-16 text-center bg-panel border border-rule rounded-3xl text-ink-secondary">
                <Clock className="w-10 h-10 mx-auto mb-2 text-ink-secondary/40" />
                <p>{lang === 'bn' ? 'বর্তমানে লাইভ কিউতে কোন অপেক্ষমাণ রোগী নেই।' : 'No patients currently in the live queue.'}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeQueue.map((item, idx) => {
                  const isCurrent = item.status === 'IN_CONSULTATION';
                  const isCalled = item.status === 'CALLED';
                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isCurrent 
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20' 
                          : isCalled 
                            ? 'border-accent bg-accent/10 ring-2 ring-accent/30' 
                            : 'border-rule bg-panel hover:bg-ground'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xs ${
                          isCurrent 
                            ? 'bg-emerald-600 text-white' 
                            : isCalled 
                              ? 'bg-accent text-on-accent animate-pulse' 
                              : 'bg-ground-muted text-ink'
                        }`}>
                          #{item.position}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-base text-ink">
                              {item.appointment.patient.user.fullName}
                            </h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isCurrent ? 'bg-emerald-100 text-emerald-800' : isCalled ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs text-ink-secondary mt-0.5">
                            {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট আইডি:' : 'Token ID:'} {item.appointmentId.slice(0, 8)} • {item.appointment.consultationType}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPatientId(item.appointment.patientId)}
                          className="px-3 py-1.5 rounded-xl border border-rule hover:border-accent text-xs font-semibold text-ink flex items-center gap-1.5 transition"
                        >
                          <FileText className="w-3.5 h-3.5 text-accent" />
                          <span>{lang === 'bn' ? 'ইতিহাস দেখুন' : 'History'}</span>
                        </button>

                        {item.status === 'WAITING' && (
                          <button
                            onClick={() => handleAdvanceQueue(item.id, 'CALLED')}
                            className="px-3.5 py-1.5 rounded-xl bg-accent text-on-accent font-bold text-xs hover:opacity-90 transition shadow-xs"
                          >
                            {lang === 'bn' ? 'সিরিয়াল ডাকুন' : 'Call Next'}
                          </button>
                        )}

                        {item.status === 'CALLED' && (
                          <button
                            onClick={() => handleAdvanceQueue(item.id, 'IN_CONSULTATION')}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shadow-xs"
                          >
                            {lang === 'bn' ? 'পরামর্শ শুরু' : 'Start Visit'}
                          </button>
                        )}

                        {item.status === 'IN_CONSULTATION' && (
                          <button
                            onClick={() => handleAdvanceQueue(item.id, 'COMPLETED')}
                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition shadow-xs"
                          >
                            {lang === 'bn' ? 'পরামর্শ সম্পন্ন' : 'Mark Completed'}
                          </button>
                        )}

                        <button
                          onClick={() => handleAdvanceQueue(item.id, 'SKIPPED')}
                          className="p-1.5 rounded-xl border border-rule hover:border-rose-400 text-ink-secondary hover:text-rose-600 text-xs transition"
                          title={lang === 'bn' ? 'বাদ দিন' : 'Skip'}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Sidebar: Selected Patient Medical History & Prescriptions */}
          <div className="bg-panel border border-rule rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div className="flex items-center gap-2">
                <FolderLock className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-base text-ink">
                  {lang === 'bn' ? 'রোগীর পূর্ববর্তী মেডিকেল রেকর্ড' : 'Patient Medical History'}
                </h3>
              </div>
            </div>

            {selectedPatientId && patientHistory ? (
              <div className="space-y-4">
                <div className="p-3 bg-ground rounded-2xl border border-rule">
                  <h4 className="font-bold text-sm text-ink">{patientHistory.user.fullName}</h4>
                  <p className="text-xs text-ink-secondary">{patientHistory.user.email} • {patientHistory.bloodGroup || 'Blood: N/A'}</p>
                </div>

                {/* Vitals summary */}
                {patientHistory.vitals && patientHistory.vitals.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-ink-secondary uppercase">
                      {lang === 'bn' ? 'সর্বশেষ ভাইটালস' : 'Latest Vitals'}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-ground border border-rule">
                        <span className="text-ink-secondary">BP: </span>
                        <strong className="text-ink">{patientHistory.vitals[0].bloodPressure || 'N/A'}</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-ground border border-rule">
                        <span className="text-ink-secondary">Pulse: </span>
                        <strong className="text-ink">{patientHistory.vitals[0].heartRate || 'N/A'} bpm</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Patient Shared Documents with Privacy Protection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink-secondary uppercase">
                      {lang === 'bn' ? 'অনুমোদিত রিপোর্ট ও প্রেসক্রিপশন' : 'Permitted Records'}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {lang === 'bn' ? 'রোগী শেয়ার করেছেন' : 'Patient Permitted'}
                    </span>
                  </div>

                  {patientHistory.documents.length === 0 ? (
                    <div className="p-6 text-center text-xs text-ink-secondary bg-ground rounded-2xl border border-rule">
                      {lang === 'bn' 
                        ? 'রোগী কোন উন্মুক্ত প্রেসক্রিপশন বা রিপোর্ট শেয়ার করেননি।' 
                        : 'No records shared by patient with doctor visibility.'}
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {patientHistory.documents.map((doc) => (
                        <div key={doc.id} className="p-3 rounded-xl bg-ground border border-rule flex items-center justify-between text-xs">
                          <div>
                            <div className="font-semibold text-ink line-clamp-1">{doc.title}</div>
                            <span className="text-[10px] text-ink-secondary uppercase">{doc.fileType}</span>
                          </div>
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-panel border border-rule text-accent hover:opacity-80"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-ink-secondary">
                {lang === 'bn' 
                  ? 'রোগীর পূর্ববর্তী প্রেসক্রিপশন ও রিপোর্ট দেখতে কিউ থেকে "ইতিহাস দেখুন" চাপুন।' 
                  : 'Click "History" on any patient above to inspect permitted medical records.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Daily Appointment List */}
      {activeTab === 'appointments' && (
        <div className="bg-panel border border-rule rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-bold text-lg text-ink">
              {lang === 'bn' ? 'তারিখ অনুযায়ী অ্যাপয়েন্টমেন্ট তালিকা' : 'Scheduled Appointments by Date'}
            </h2>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3.5 py-2 text-xs font-semibold border border-rule rounded-xl bg-ground text-ink focus:outline-none focus:border-accent"
            />
          </div>

          {todayAppointments.length === 0 ? (
            <div className="p-16 text-center text-ink-secondary">
              <Calendar className="w-10 h-10 mx-auto mb-2 text-ink-secondary/40" />
              <p>{lang === 'bn' ? 'এই তারিখে কোন অ্যাপয়েন্টমেন্ট বুক করা নেই।' : 'No appointments scheduled for this date.'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-rule rounded-2xl">
              <table className="w-full text-left text-xs text-ink">
                <thead className="bg-ground-muted text-ink-secondary font-bold uppercase tracking-wider border-b border-rule">
                  <tr>
                    <th className="py-3 px-4">{lang === 'bn' ? 'সিরিয়াল #' : 'Serial #'}</th>
                    <th className="py-3 px-4">{lang === 'bn' ? 'রোগীর নাম' : 'Patient Name'}</th>
                    <th className="py-3 px-4">{lang === 'bn' ? 'সময়' : 'Slot Time'}</th>
                    <th className="py-3 px-4">{lang === 'bn' ? 'ধরন' : 'Consultation'}</th>
                    <th className="py-3 px-4">{lang === 'bn' ? 'পেমেন্ট' : 'Payment'}</th>
                    <th className="py-3 px-4 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {todayAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-ground/50 transition">
                      <td className="py-3 px-4 font-black text-sm text-accent">#{appt.queueNumber || '--'}</td>
                      <td className="py-3 px-4 font-semibold text-ink">{appt.patient.user.fullName}</td>
                      <td className="py-3 px-4 text-ink-secondary">{appt.appointmentTime}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          appt.consultationType === 'ONLINE' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {appt.consultationType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          appt.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {appt.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedPatientId(appt.patientId);
                            setSelectedAppointmentId(appt.id);
                            setActiveTab('queue');
                          }}
                          className="px-3 py-1 rounded-xl bg-accent text-on-accent text-xs font-bold hover:opacity-90"
                        >
                          {lang === 'bn' ? 'ব্যবস্থাপনা' : 'Manage'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Schedule & Availability Settings */}
      {activeTab === 'schedule' && (
        <form onSubmit={handleSaveSchedule} className="bg-panel border border-rule rounded-3xl p-6 md:p-8 shadow-sm space-y-6 max-w-3xl">
          <div className="space-y-1">
            <h2 className="font-bold text-lg text-ink">
              {lang === 'bn' ? 'ডাক্তারের চেম্বার সময় ও টেলিমেডিসিন শিডিউল' : 'Chamber Availability & Fee Configuration'}
            </h2>
            <p className="text-xs text-ink-secondary">
              {lang === 'bn' 
                ? 'আপনার চেম্বার বসার দিন, সময় এবং কনসালটেশন ফি নির্ধারণ করুন।' 
                : 'Set weekly visiting hours, online telemedicine availability, and appointment fees.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">
                {lang === 'bn' ? 'সরাসরি চেম্বার ফি (BDT) *' : 'Physical Consultation Fee (BDT) *'}
              </label>
              <input
                type="number"
                value={feePhysical}
                onChange={(e) => setFeePhysical(Number(e.target.value))}
                className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">
                {lang === 'bn' ? 'অনলাইন টেলিমেডিসিন ফি (BDT) *' : 'Telemedicine Fee (BDT) *'}
              </label>
              <input
                type="number"
                value={feeOnline}
                onChange={(e) => setFeeOnline(Number(e.target.value))}
                className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">
                {lang === 'bn' ? 'চেম্বারের শুরু সময়' : 'Session Start Time'}
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">
                {lang === 'bn' ? 'চেম্বারের সমাপ্তি সময়' : 'Session End Time'}
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Days selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-ink-secondary">
              {lang === 'bn' ? 'চেম্বারে উপস্থিতির দিনসমূহ' : 'Available Days of Week'}
            </label>
            <div className="flex flex-wrap gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, idx) => {
                const isSelected = selectedDays.includes(idx);
                return (
                  <button
                    type="button"
                    key={d}
                    onClick={() => {
                      if (isSelected) setSelectedDays(selectedDays.filter((i) => i !== idx));
                      else setSelectedDays([...selectedDays, idx]);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                      isSelected 
                        ? 'bg-accent text-on-accent border-accent shadow-xs' 
                        : 'bg-ground text-ink-secondary border-rule hover:text-ink'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Telemedicine toggle */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-ground border border-rule">
            <input
              type="checkbox"
              id="telemedicineToggle"
              checked={teleEnabled}
              onChange={(e) => setTeleEnabled(e.target.checked)}
              className="w-4 h-4 text-accent rounded"
            />
            <label htmlFor="telemedicineToggle" className="text-xs font-semibold text-ink cursor-pointer">
              {lang === 'bn' ? 'টেলিমেডিসিন ভিডিও পরামর্শ সেবা সক্রিয় রাখুন' : 'Enable Telemedicine Video Consultations for Patients'}
            </label>
          </div>

          <div className="pt-3 border-t border-rule flex justify-end">
            <button
              type="submit"
              disabled={updateScheduleMutation.isPending}
              className="px-6 py-2.5 rounded-xl bg-accent text-on-accent font-bold text-xs hover:opacity-90 transition disabled:opacity-60 shadow-xs"
            >
              {updateScheduleMutation.isPending ? (lang === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (lang === 'bn' ? 'শিডিউল সংরক্ষণ করুন' : 'Save Schedule')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

