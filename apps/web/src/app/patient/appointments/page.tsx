import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore, useTranslation } from '../../../stores/language.store';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { LiveQueueTrackerView } from '../../../components/patient/LiveQueueTrackerView';
import {
  Calendar,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MoreVertical,
  Radio
} from 'lucide-react';

export function PatientAppointmentsPage() {
  const { t } = useTranslation();
  const { lang } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'past' | 'cancelled'>('upcoming');
  const [search, setSearch] = useState('');

  const appointments = [
    {
      id: 'apt-1',
      group: 'today',
      time: '05:00 PM',
      doctor: lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam',
      specialty: lang === 'bn' ? 'মেডিসিন ও হৃদরোগ' : 'Cardiology Specialist',
      hospital: lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ ও হাসপাতাল' : 'Dhaka Medical College & Hospital',
      chamber: 'Room 402',
      status: 'confirmed' as const,
      serial: 18,
    },
    {
      id: 'apt-2',
      group: 'tomorrow',
      time: '10:00 AM',
      doctor: lang === 'bn' ? 'ডা. ফারহানা আহমেদ' : 'Dr. Farhana Ahmed',
      specialty: lang === 'bn' ? 'হৃদরোগ ও রক্তচাপ' : 'Cardiologist',
      hospital: lang === 'bn' ? 'জাতীয় হৃদরোগ ইনস্টিটিউট' : 'NICVD, Dhaka',
      chamber: 'Chamber 203',
      status: 'pending' as const,
      serial: 7,
    },
    {
      id: 'apt-3',
      group: 'past',
      time: '15 Oct 2024, 04:30 PM',
      doctor: lang === 'bn' ? 'ডা. তানভীর হাসান চৌধুরী' : 'Dr. Tanvir Hasan Chowdhury',
      specialty: lang === 'bn' ? 'অর্থোপেডিক সার্জন' : 'Orthopedic Surgeon',
      hospital: 'BSMMU, Shahbag',
      chamber: 'Block-C, Room 105',
      status: 'completed' as const,
      serial: 12,
    },
  ];

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {t('nav.appointments', 'Appointments')}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn' ? 'আপনার চিকিৎসকের সাথে সাক্ষাতের সময়সূচি ও সিরিয়াল পরিচালনা।' : 'Manage your visits and chamber tokens.'}
          </p>
        </div>
        <div>
          <Link to="/patient/doctors">
            <Button variant="primary" leftIcon={<Calendar className="w-4 h-4" />}>
              {t('patient.book_appointment', '+ Book appointment')}
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── Page Tabs: Underline Style (Section 7) ─── */}
      <div className="flex items-center gap-6 border-b border-border">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
            activeTab === 'upcoming'
              ? 'border-accent text-ink font-semibold'
              : 'border-transparent text-text-3 hover:text-ink'
          }`}
        >
          {lang === 'bn' ? 'আসন্ন ভিজিট' : 'Upcoming'}
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'live'
              ? 'border-accent text-accent font-semibold'
              : 'border-transparent text-text-3 hover:text-ink'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>{lang === 'bn' ? 'লাইভ চেম্বার সিরিয়াল' : 'Live Queue Tracker'}</span>
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
            activeTab === 'past'
              ? 'border-accent text-ink font-semibold'
              : 'border-transparent text-text-3 hover:text-ink'
          }`}
        >
          {lang === 'bn' ? 'পূর্ববর্তী' : 'Past'}
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
            activeTab === 'cancelled'
              ? 'border-accent text-ink font-semibold'
              : 'border-transparent text-text-3 hover:text-ink'
          }`}
        >
          {lang === 'bn' ? 'বাতিলকৃত' : 'Cancelled'}
        </button>
      </div>

      {activeTab === 'live' ? (
        <LiveQueueTrackerView />
      ) : (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="max-w-md">
            <Input
              placeholder={lang === 'bn' ? 'ডাক্তার বা হাসপাতালের নাম দিয়ে অনুসন্ধান...' : 'Search doctor or hospital...'}
              leftIcon={<Search className="w-4 h-4 text-text-3" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Grouped Day Sections */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-3">
                {lang === 'bn' ? 'আজ' : 'Today'}
              </div>
              <Card padding="none" className="divide-y divide-border">
                {appointments
                  .filter((a) => a.group === 'today')
                  .map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-subtle/50 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="text-sm font-semibold text-accent min-w-[70px]">
                          {apt.time}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink">
                            {apt.doctor}
                          </div>
                          <div className="text-xs text-text-3">
                            {apt.specialty} · {apt.hospital} ({apt.chamber})
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant="accent">
                          {lang === 'bn' ? `টোকেন #${apt.serial}` : `Token #${apt.serial}`}
                        </Badge>
                        <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>
                          {t('status.confirmed', 'Confirmed')}
                        </Badge>
                        <Button
                          variant="secondary"
                          size="compact"
                          onClick={() => setActiveTab('live')}
                        >
                          {lang === 'bn' ? 'লাইভ সিরিয়াল' : 'Track Serial'}
                        </Button>
                      </div>
                    </div>
                  ))}
              </Card>

              <div className="text-xs font-semibold uppercase tracking-wider text-text-3 pt-4">
                {lang === 'bn' ? 'আগামীকাল' : 'Tomorrow'}
              </div>
              <Card padding="none" className="divide-y divide-border">
                {appointments
                  .filter((a) => a.group === 'tomorrow')
                  .map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-subtle/50 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="text-sm font-semibold text-ink min-w-[70px]">
                          {apt.time}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink">
                            {apt.doctor}
                          </div>
                          <div className="text-xs text-text-3">
                            {apt.specialty} · {apt.hospital} ({apt.chamber})
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant="accent">
                          {lang === 'bn' ? `টোকেন #${apt.serial}` : `Token #${apt.serial}`}
                        </Badge>
                        <Badge variant="warning">
                          {t('status.pending', 'Pending')}
                        </Badge>
                        <Button variant="ghost" size="compact">
                          {t('action.cancel', 'Cancel')}
                        </Button>
                      </div>
                    </div>
                  ))}
              </Card>
            </div>
          )}

          {activeTab === 'past' && (
            <Card padding="none" className="divide-y divide-border">
              {appointments
                .filter((a) => a.group === 'past')
                .map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-subtle/50 transition-colors"
                  >
                    <div>
                      <div className="text-xs text-text-3">{apt.time}</div>
                      <div className="text-sm font-semibold text-ink mt-0.5">
                        {apt.doctor}
                      </div>
                      <div className="text-xs text-text-3">
                        {apt.specialty} · {apt.hospital}
                      </div>
                    </div>
                    <Badge variant="neutral">
                      {t('status.completed', 'Completed')}
                    </Badge>
                  </div>
                ))}
            </Card>
          )}

          {activeTab === 'cancelled' && (
            <div className="p-8 text-center bg-canvas rounded-xl border border-border text-sm text-text-3">
              {lang === 'bn' ? 'কোন বাতিলকৃত ভিজিট নেই।' : 'No cancelled appointments.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
