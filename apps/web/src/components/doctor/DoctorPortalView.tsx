import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { Card, StatCard } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { AlertBanner } from '../ui/AlertBanner';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Eye,
  Printer,
  ArrowRight
} from 'lucide-react';

export interface DoctorPortalViewProps {
  initialTab?: 'queue' | 'appointments' | 'schedule' | 'prescribe';
}

export function DoctorPortalView({ initialTab = 'queue' }: DoctorPortalViewProps) {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'queue' | 'appointments' | 'schedule' | 'prescribe'>(initialTab);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  // Schedule settings state
  const [feePhysical, setFeePhysical] = useState(800);
  const [feeOnline, setFeeOnline] = useState(500);
  const [teleEnabled, setTeleEnabled] = useState(true);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]); // Sun-Thu
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('21:00');

  // Prescription Form State
  const [prescriptionPatientName, setPrescriptionPatientName] = useState('Karim Ullah');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [medicines, setMedicines] = useState<{ name: string; dosage: string; duration: string; instruction: string }[]>([
    { name: 'Tab. Paracetamol 500mg', dosage: '1+0+1', duration: '3 days', instruction: 'After food' }
  ]);
  const [prescriptionSaved, setPrescriptionSaved] = useState(false);

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

  // Schedule mutation
  const updateScheduleMutation = trpc.doctor.updateSchedule.useMutation({
    onSuccess: () => {
      alert(lang === 'bn' ? 'শিডিউল সফলভাবে সংরক্ষিত হয়েছে!' : 'Schedule updated successfully!');
      refetch();
    }
  });

  const handleAdvanceQueue = (queueId: string, status: 'WAITING' | 'CALLED' | 'IN_CONSULTATION' | 'COMPLETED' | 'SKIPPED') => {
    updateQueueMutation.mutate({ queueId, status });
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '1+0+1', duration: '5 days', instruction: 'After meal' }]);
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
      consultationFeePhysical: feePhysical,
      consultationFeeOnline: feeOnline,
      isTelemedicineEnabled: teleEnabled,
      slots
    });
  };

  const handleSavePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    setPrescriptionSaved(true);
    setTimeout(() => setPrescriptionSaved(false), 4000);
  };

  const activeQueue = dashboard?.doctor?.queues || [];
  const todayAppointments = dashboard?.doctor?.appointments || [];

  return (
    <div className="max-w-[1120px] mx-auto space-y-7">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="eyebrow mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]/80">
            {lang === 'bn' ? 'ক্লিনিকাল ডেস্ক ও চেম্বার' : 'Clinical Desk & Chamber'}
          </div>
          <h1 className="font-serif text-[32px] sm:text-[38px] font-light text-[#0f3e17] tracking-tight leading-tight">
            {lang === 'bn' ? 'চিকিৎসক পোর্টাল ও চেম্বার' : 'Physician Desk & Chamber'}
          </h1>
          <p className="text-[14px] text-[#222222]/70 mt-1">
            {lang === 'bn'
              ? 'চেম্বারের লাইভ সিরিয়াল পরিচালনা, রোগীর রিপোর্ট যাচাই এবং ডিজিটাল প্রেসক্রিপশন তৈরি।'
              : 'Real-time chamber queue tokens, confidential medical records, and digital prescriptions.'}
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setActiveTab('prescribe')}
        >
          <span>{lang === 'bn' ? 'নতুন প্রেসক্রিপশন' : 'New Prescription'}</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>

      {/* ─── 4 Identical Stat Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={lang === 'bn' ? 'অপেক্ষমাণ রোগী' : 'Waiting in Queue'}
          value={String(activeQueue.filter((q) => q.status === 'WAITING' || q.status === 'CALLED').length)}
          caption={lang === 'bn' ? 'আজকের সিরিয়াল' : 'Today'}
        />
        <StatCard
          label={lang === 'bn' ? 'চলমান পরামর্শ' : 'In Consultation'}
          value={String(activeQueue.filter((q) => q.status === 'IN_CONSULTATION').length)}
          caption={lang === 'bn' ? 'চেম্বারে উপস্থিত' : 'Active Patient'}
        />
        <StatCard
          label={lang === 'bn' ? 'সম্পন্ন পরামর্শ' : 'Completed Today'}
          value={String(activeQueue.filter((q) => q.status === 'COMPLETED').length)}
          caption={lang === 'bn' ? 'পরামর্শ সম্পন্ন' : 'Finished'}
        />
        <StatCard
          label={lang === 'bn' ? 'মোট শিডিউল বুকিং' : "Today's Bookings"}
          value={String(todayAppointments.length)}
          caption={lang === 'bn' ? 'মোট রোগী' : 'Appointments'}
        />
      </div>

      {/* ─── Page Tabs (Underline Style) ─── */}
      <div className="flex items-center gap-6 border-b border-[#efeeeb] overflow-x-auto">
        <button
          onClick={() => setActiveTab('queue')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer shrink-0 ${
            activeTab === 'queue'
              ? 'border-[#0f3e17] text-[#0f3e17] font-semibold'
              : 'border-transparent text-[#222222]/60 hover:text-[#0f3e17]'
          }`}
        >
          {lang === 'bn' ? 'চেম্বার লাইভ কিউ' : 'Chamber Queue'}
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer shrink-0 ${
            activeTab === 'appointments'
              ? 'border-[#0f3e17] text-[#0f3e17] font-semibold'
              : 'border-transparent text-[#222222]/60 hover:text-[#0f3e17]'
          }`}
        >
          {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট তালিকা' : 'Appointments'}
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer shrink-0 ${
            activeTab === 'schedule'
              ? 'border-[#0f3e17] text-[#0f3e17] font-semibold'
              : 'border-transparent text-[#222222]/60 hover:text-[#0f3e17]'
          }`}
        >
          {lang === 'bn' ? 'ভিজিটিং সময় ও ফি' : 'Visiting Hours & Fees'}
        </button>
        <button
          onClick={() => setActiveTab('prescribe')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer shrink-0 ${
            activeTab === 'prescribe'
              ? 'border-[#0f3e17] text-[#0f3e17] font-semibold'
              : 'border-transparent text-[#222222]/60 hover:text-[#0f3e17]'
          }`}
        >
          {lang === 'bn' ? 'প্রেসক্রিপশন জেনারেটর' : 'New Prescription'}
        </button>
      </div>

      {/* ─── TAB 1: Queue Stream ─── */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-light text-[#0f3e17]">
              {lang === 'bn' ? 'আজকের সিরিয়াল লাইন' : 'Live Chamber Queue Stream'}
            </h2>
            <Badge variant="accent">
              {activeQueue.length} {lang === 'bn' ? 'জন নিবন্ধিত' : 'Patients In Line'}
            </Badge>
          </div>

          {activeQueue.length === 0 ? (
            <Card variant="default" padding="lg" className="text-center py-12 text-sm text-[#222222]/60">
              <Clock className="w-8 h-8 mx-auto mb-2 text-[#0f3e17]/40" />
              <p>{lang === 'bn' ? 'বর্তমানে লাইভ কিউতে কোন অপেক্ষমাণ রোগী নেই।' : 'No patients currently in the live queue.'}</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {activeQueue.map((item) => {
                const isCurrent = item.status === 'IN_CONSULTATION';
                const isCalled = item.status === 'CALLED';
                return (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 rounded-[14px] border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                      isCurrent
                        ? 'border-[#0f3e17] bg-[#e1f4df]'
                        : isCalled
                        ? 'border-[#b1dbb8] bg-[#e1f4df]/40'
                        : 'border-[#efeeeb] bg-[#fffefc]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[10px] border border-[#efeeeb] bg-[#fffefc] flex items-center justify-center font-serif text-xl font-light text-[#0f3e17]">
                        #{item.position}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[15px] text-[#0f3e17]">
                            {item.appointment.patient.user.fullName}
                          </h4>
                          <Badge
                            variant={
                              isCurrent
                                ? 'success'
                                : isCalled
                                ? 'warning'
                                : 'neutral'
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-[#222222]/60 mt-0.5">
                          {item.appointment.consultationType} · ID: {item.appointmentId.slice(0, 8)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<FileText className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedPatientId(item.appointment.patientId)}
                      >
                        {lang === 'bn' ? 'মেডিকেল রেকর্ড' : 'History'}
                      </Button>

                      {item.status === 'WAITING' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAdvanceQueue(item.id, 'CALLED')}
                        >
                          {lang === 'bn' ? 'সিরিয়াল ডাকুন' : 'Call Next'}
                        </Button>
                      )}

                      {item.status === 'CALLED' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAdvanceQueue(item.id, 'IN_CONSULTATION')}
                        >
                          {lang === 'bn' ? 'পরামর্শ শুরু' : 'Start Visit'}
                        </Button>
                      )}

                      {item.status === 'IN_CONSULTATION' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAdvanceQueue(item.id, 'COMPLETED')}
                        >
                          {lang === 'bn' ? 'পরামর্শ সমাপ্ত' : 'Complete Visit'}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 2: Appointments ─── */}
      {activeTab === 'appointments' && (
        <Card variant="default" padding="none" className="overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#efeeeb] bg-[#f9fbf8] flex items-center justify-between">
            <h2 className="font-serif text-lg font-light text-[#0f3e17]">
              {lang === 'bn' ? 'আজকের অ্যাপয়েন্টমেন্ট তালিকা' : "Today's Appointment Schedule"}
            </h2>
            <span className="text-xs text-[#222222]/60 font-mono">{filterDate}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f9fbf8] text-xs text-[#222222]/70 font-medium border-b border-[#efeeeb]">
                <tr>
                  <th className="px-5 py-3.5">{lang === 'bn' ? 'টোকেন' : 'Token'}</th>
                  <th className="px-5 py-3.5">{lang === 'bn' ? 'রোগীর নাম' : 'Patient Name'}</th>
                  <th className="px-5 py-3.5">{lang === 'bn' ? 'সময়' : 'Time'}</th>
                  <th className="px-5 py-3.5">{lang === 'bn' ? 'পরামর্শ ধরন' : 'Consultation'}</th>
                  <th className="px-5 py-3.5">{lang === 'bn' ? 'অবস্থা' : 'Status'}</th>
                  <th className="px-5 py-3.5 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efeeeb]">
                {todayAppointments && todayAppointments.length > 0 ? (
                  todayAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-[#e1f4df]/20 transition-colors h-[54px]">
                      <td className="px-5 py-3 font-serif text-base text-[#0f3e17]">#{appt.queueNumber || '--'}</td>
                      <td className="px-5 py-3 font-medium text-[#0f3e17]">{appt.patient.user.fullName}</td>
                      <td className="px-5 py-3 text-xs text-[#222222]/60">{appt.appointmentTime}</td>
                      <td className="px-5 py-3 text-xs text-[#222222]/70">{appt.consultationType}</td>
                      <td className="px-5 py-3">
                        <Badge variant={appt.status === 'CONFIRMED' ? 'success' : 'neutral'}>
                          {appt.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPatientId(appt.patientId)}
                        >
                          {lang === 'bn' ? 'রেকর্ড দেখুন' : 'View Record'}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-xs text-[#222222]/60">
                      {lang === 'bn' ? 'আজকের জন্য কোন অ্যাপয়েন্টমেন্ট নেই।' : 'No appointments scheduled for today.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ─── TAB 3: Schedule & Visiting Hours ─── */}
      {activeTab === 'schedule' && (
        <Card variant="default" padding="lg" className="space-y-5">
          <div className="pb-3 border-b border-[#efeeeb]">
            <h2 className="font-serif text-xl font-light text-[#0f3e17]">
              {lang === 'bn' ? 'চেম্বার শিডিউল ও ভিজিটিং ফি নির্ধারণ' : 'Chamber Schedule & Visiting Fees'}
            </h2>
            <p className="text-xs text-[#222222]/60 mt-0.5">
              {lang === 'bn' ? 'সাপ্তাহিক দিন ও ফি আপডেট করুন' : 'Configure consultation fee and regular chamber timings'}
            </p>
          </div>

          <form onSubmit={handleSaveSchedule} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={lang === 'bn' ? 'চেম্বার ভিজিট ফি (BDT ৳)' : 'In-Person Chamber Fee (৳)'}
                type="number"
                value={String(feePhysical)}
                onChange={(e) => setFeePhysical(Number(e.target.value))}
              />

              <Input
                label={lang === 'bn' ? 'টেলিমেডিসিন ফি (BDT ৳)' : 'Online Telemedicine Fee (৳)'}
                type="number"
                value={String(feeOnline)}
                onChange={(e) => setFeeOnline(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={lang === 'bn' ? 'শুরুর সময়' : 'Start Time'}
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />

              <Input
                label={lang === 'bn' ? 'সমাপ্তির সময়' : 'End Time'}
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <div className="pt-3 border-t border-[#efeeeb] flex justify-end">
              <Button variant="primary" size="lg" type="submit" loading={updateScheduleMutation.isPending}>
                {lang === 'bn' ? 'শিডিউল সংরক্ষণ করুন' : 'Save Schedule Settings'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* ─── TAB 4: Prescription Generator ─── */}
      {activeTab === 'prescribe' && (
        <div className="space-y-5">
          {prescriptionSaved && (
            <AlertBanner
              variant="success"
              message={
                lang === 'bn'
                  ? 'প্রেসক্রিপশন সফলভাবে সংরক্ষিত হয়েছে এবং রোগীর প্রেসক্রিপশন ভল্টে যুক্ত হয়েছে।'
                  : 'Prescription saved successfully and securely synced to patient record vault.'
              }
            />
          )}

          <Card variant="default" padding="lg" className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#efeeeb]">
              <div>
                <h2 className="font-serif text-xl font-light text-[#0f3e17]">
                  {lang === 'bn' ? 'ডিজিটাল প্রেসক্রিপশন তৈরি' : 'Create New Prescription'}
                </h2>
                <p className="text-xs text-[#222222]/60 mt-0.5">
                  {lang === 'bn' ? 'রোগীর উপসর্গ, রোগ নির্ণয় এবং ওষুধের তালিকা যোগ করুন' : 'Add diagnosis, medication regimen, and dietary advice'}
                </p>
              </div>

              <div className="w-64">
                <Input
                  label={lang === 'bn' ? 'রোগীর নাম' : 'Patient Name'}
                  value={prescriptionPatientName}
                  onChange={(e) => setPrescriptionPatientName(e.target.value)}
                />
              </div>
            </div>

            <form onSubmit={handleSavePrescription} className="space-y-4">
              <Input
                label={lang === 'bn' ? 'রোগ নির্ণয় (Diagnosis) *' : 'Clinical Diagnosis *'}
                required
                placeholder={lang === 'bn' ? 'যেমন: Acute Upper Respiratory Tract Infection...' : 'e.g. Essential Hypertension, Type 2 DM...'}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />

              {/* Medicines Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]">
                    {lang === 'bn' ? 'ওষুধের তালিকা (Rx)' : 'Medications (Rx)'}
                  </label>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                    onClick={handleAddMedicine}
                  >
                    {lang === 'bn' ? '+ ওষুধ যোগ করুন' : '+ Add Medicine'}
                  </Button>
                </div>

                <div className="space-y-2">
                  {medicines.map((med, idx) => (
                    <div key={idx} className="p-3.5 rounded-[14px] border border-[#efeeeb] bg-[#fffefc] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          required
                          placeholder="Medicine name (e.g. Paracetamol 500mg)"
                          value={med.name}
                          onChange={(e) => {
                            const updated = [...medicines];
                            updated[idx].name = e.target.value;
                            setMedicines(updated);
                          }}
                          className="w-full h-10 px-3 text-xs border border-[#efeeeb] rounded-[10px] bg-[#fffefc] text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#0f3e17]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="1+0+1"
                          value={med.dosage}
                          onChange={(e) => {
                            const updated = [...medicines];
                            updated[idx].dosage = e.target.value;
                            setMedicines(updated);
                          }}
                          className="w-full h-10 px-3 text-xs border border-[#efeeeb] rounded-[10px] bg-[#fffefc] text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#0f3e17]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="5 days"
                          value={med.duration}
                          onChange={(e) => {
                            const updated = [...medicines];
                            updated[idx].duration = e.target.value;
                            setMedicines(updated);
                          }}
                          className="w-full h-10 px-3 text-xs border border-[#efeeeb] rounded-[10px] bg-[#fffefc] text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#0f3e17]"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          placeholder="After food / Before meal"
                          value={med.instruction}
                          onChange={(e) => {
                            const updated = [...medicines];
                            updated[idx].instruction = e.target.value;
                            setMedicines(updated);
                          }}
                          className="w-full h-10 px-3 text-xs border border-[#efeeeb] rounded-[10px] bg-[#fffefc] text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#0f3e17]"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(idx)}
                          className="p-1.5 rounded-[7px] hover:bg-[#fef3f2] text-[#222222]/50 hover:text-[#b42318] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17] block mb-1">
                  {lang === 'bn' ? 'পরামর্শ ও নির্দেশিকা (Advice)' : 'Clinical Advice & Instructions'}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'bn' ? 'পর্যাপ্ত পানি পান করুন, তৈলাক্ত খাবার পরিহার করুন...' : 'Drink plenty of fluids, review in 7 days...'}
                  className="w-full p-3.5 text-xs border border-[#efeeeb] rounded-[14px] bg-[#fffefc] text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#0f3e17]"
                />
              </div>

              <div className="pt-3 border-t border-[#efeeeb] flex items-center justify-end gap-3">
                <Button variant="secondary" size="lg" type="button" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>
                  {lang === 'bn' ? 'প্রিন্ট ভিউ' : 'Print Preview'}
                </Button>
                <Button variant="primary" size="lg" type="submit">
                  {lang === 'bn' ? 'সংরক্ষণ ও প্রদান' : 'Save Prescription'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ─── Patient Medical History Drawer / Modal ─── */}
      {selectedPatientId && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPatientId(null)}
          title={lang === 'bn' ? 'রোগীর পূর্ববর্তী মেডিকেল রেকর্ড' : 'Confidential Patient History'}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <AlertBanner
              variant="info"
              message={
                lang === 'bn'
                  ? 'রোগীর সম্মতি অনুযায়ী শুধুমাত্র "Doctor Access" অনুমোদিত রিপোর্টগুলো প্রদর্শিত হচ্ছে।'
                  : 'Only records explicitly marked "Doctor Access" by the patient are visible.'
              }
            />

            {isLoadingHistory ? (
              <div className="py-8 text-center text-xs text-[#222222]/60">Loading history...</div>
            ) : patientHistory?.documents && patientHistory.documents.length > 0 ? (
              <div className="divide-y divide-[#efeeeb] border border-[#efeeeb] rounded-[14px] overflow-hidden">
                {patientHistory.documents.map((doc: any) => (
                  <div key={doc.id} className="p-3.5 flex items-center justify-between hover:bg-[#e1f4df]/20 transition-colors">
                    <div>
                      <div className="font-medium text-sm text-[#0f3e17]">{doc.title}</div>
                      <div className="text-xs text-[#222222]/60 mt-0.5">
                        {doc.fileType} · {new Date(doc.uploadedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                        {lang === 'bn' ? 'ফাইল দেখুন' : 'View File'}
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#222222]/60 bg-[#e1f4df]/20 rounded-[14px] border border-[#efeeeb]">
                {lang === 'bn' ? 'কোন অনুমোদিত মেডিকেল রেকর্ড নেই।' : 'No shared medical records found for this patient.'}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
