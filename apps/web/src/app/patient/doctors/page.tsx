import React, { useState } from 'react';
import { useLanguageStore, useTranslation } from '../../../stores/language.store';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { StatusDot } from '../../../components/ui/StatusDot';
import { Modal } from '../../../components/ui/Modal';
import { AlertBanner } from '../../../components/ui/AlertBanner';
import {
  Search,
  Stethoscope,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  X
} from 'lucide-react';

interface DoctorItem {
  id: string;
  name: string;
  degrees: string;
  specialty: string;
  specKey: string;
  hospital: string;
  chamber: string;
  fee: number;
  nextSlot: string;
  bmdc: string;
  status: 'online' | 'busy' | 'offline';
}

export function PatientDoctorsPage() {
  const { t } = useTranslation();
  const { lang } = useLanguageStore();
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Booking Flow State (3 Steps)
  const [activeBookingDoctor, setActiveBookingDoctor] = useState<DoctorItem | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [selectedDay, setSelectedDay] = useState<string>('Sat');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('05:00 PM');
  const [visitReason, setVisitReason] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const specialties = [
    { id: 'all', label: lang === 'bn' ? 'সকল বিভাগ' : 'All Departments' },
    { id: 'medicine', label: lang === 'bn' ? 'মেডিসিন' : 'Medicine' },
    { id: 'cardiology', label: lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology' },
    { id: 'orthopedic', label: lang === 'bn' ? 'অর্থোপেডিক' : 'Orthopedics' },
    { id: 'gynecology', label: lang === 'bn' ? 'স্ত্রী ও প্রসূতি' : 'Gynecology' },
    { id: 'pediatric', label: lang === 'bn' ? 'শিশু রোগ' : 'Pediatrics' },
  ];

  const doctors: DoctorItem[] = [
    {
      id: 'doc-1',
      name: lang === 'bn' ? 'অধ্যাপক ডা. মোঃ রফিকুল ইসলাম' : 'Prof. Dr. Md. Rafiqul Islam',
      degrees: 'MBBS, FCPS, FRCP (Edin)',
      specialty: lang === 'bn' ? 'মেডিসিন ও হৃদরোগ বিশেষজ্ঞ' : 'Medicine & Cardiology Specialist',
      specKey: 'medicine',
      hospital: lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ ও হাসপাতাল' : 'Dhaka Medical College & Hospital',
      chamber: 'Room 402, 4th Floor',
      fee: 800,
      nextSlot: 'Today 05:00 PM',
      bmdc: 'A-45912',
      status: 'online',
    },
    {
      id: 'doc-2',
      name: lang === 'bn' ? 'ডা. ফারহানা আহমেদ' : 'Dr. Farhana Ahmed',
      degrees: 'MBBS, MD (Cardiology)',
      specialty: lang === 'bn' ? 'হৃদরোগ ও রক্তচাপ বিশেষজ্ঞ' : 'Cardiologist & Blood Pressure Specialist',
      specKey: 'cardiology',
      hospital: lang === 'bn' ? 'জাতীয় হৃদরোগ ইনস্টিটিউট (NICVD)' : 'National Institute of Cardiovascular Diseases',
      chamber: 'Chamber 203',
      fee: 1000,
      nextSlot: 'Tomorrow 10:00 AM',
      bmdc: 'A-67210',
      status: 'online',
    },
    {
      id: 'doc-3',
      name: lang === 'bn' ? 'ডা. তানভীর হাসান চৌধুরী' : 'Dr. Tanvir Hasan Chowdhury',
      degrees: 'MBBS, MS (Orthopedics)',
      specialty: lang === 'bn' ? 'হাড়, জোড়া ও ট্রমা সার্জন' : 'Orthopedic & Trauma Surgeon',
      specKey: 'orthopedic',
      hospital: lang === 'bn' ? 'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU)' : 'BSMMU, Shahbag, Dhaka',
      chamber: 'Block-C, Room 105',
      fee: 900,
      nextSlot: 'Tomorrow 06:30 PM',
      bmdc: 'A-51093',
      status: 'busy',
    },
  ];

  const filtered = doctors.filter((doc) => {
    const matchSpec = selectedSpecialty === 'all' || doc.specKey === selectedSpecialty;
    const matchSearch =
      search.trim() === '' ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  const handleStartBooking = (doc: DoctorItem) => {
    setActiveBookingDoctor(doc);
    setBookingStep(2); // Jump straight to step 2 (date/time) as doctor is already selected
  };

  const handleConfirmAppointment = () => {
    setBookingSuccess(true);
    setActiveBookingDoctor(null);
    setBookingStep(1);
  };

  const weekDays = [
    { key: 'Sat', labelEn: 'Sat, 9 Nov', labelBn: 'শনি, ৯ নভে' },
    { key: 'Sun', labelEn: 'Sun, 10 Nov', labelBn: 'রবি, ১০ নভে' },
    { key: 'Mon', labelEn: 'Mon, 11 Nov', labelBn: 'সোম, ১১ নভে' },
    { key: 'Tue', labelEn: 'Tue, 12 Nov', labelBn: 'মঙ্গল, ১২ নভে' },
    { key: 'Wed', labelEn: 'Wed, 13 Nov', labelBn: 'বুধ, ১৩ নভে' },
  ];

  const timeSlots = [
    { time: '04:30 PM', booked: false },
    { time: '05:00 PM', booked: false },
    { time: '05:30 PM', booked: true },
    { time: '06:00 PM', booked: false },
    { time: '06:30 PM', booked: true },
    { time: '07:00 PM', booked: false },
  ];

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="space-y-1">
        <h1 className="text-[28px] font-semibold text-ink leading-tight">
          {lang === 'bn' ? 'চিকিৎসক অনুসন্ধান ও অ্যাপয়েন্টমেন্ট' : 'Find Specialists & Book Appointment'}
        </h1>
        <p className="text-sm text-text-2">
          {lang === 'bn'
            ? 'বিএমডিসি নিবন্ধিত বিশেষজ্ঞ চিকিৎসকদের চেম্বার শিডিউল এবং সরাসরি সিরিয়াল বুকিং।'
            : 'Verified specialist directory across leading hospitals. Book chamber queue tokens directly.'}
        </p>
      </div>

      {bookingSuccess && (
        <AlertBanner
          variant="success"
          message={
            lang === 'bn'
              ? 'আপনার সিরিয়াল বুকিং সম্পন্ন হয়েছে! সিরিয়াল ট্র্যাকার থেকে লাইভ অবস্থান পর্যবেক্ষণ করুন।'
              : 'Appointment confirmed successfully! Track your queue token live in Appointments.'
          }
          action={{
            label: lang === 'bn' ? 'বন্ধ করুন' : 'Dismiss',
            onClick: () => setBookingSuccess(false),
          }}
        />
      )}

      {/* ─── Search Field (40px, 1px border, 8px radius) ─── */}
      <div>
        <Input
          placeholder={
            lang === 'bn'
              ? 'ডাক্তার, বিভাগ বা হাসপাতালের নাম দিয়ে অনুসন্ধান করুন...'
              : 'Search by doctor name, specialty, or hospital...'
          }
          leftIcon={<Search className="w-4 h-4 text-text-3" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ─── Department Filter Chips ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {specialties.map((spec) => {
          const isSelected = selectedSpecialty === spec.id;
          return (
            <button
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-accent-tint text-accent border-accent'
                  : 'bg-subtle text-text-2 border-border hover:border-border-strong hover:text-ink'
              }`}
            >
              {spec.label}
            </button>
          );
        })}
      </div>

      {/* ─── Doctor Cards Grid (12px radius, 1px border, no shadow) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doc) => (
          <Card key={doc.id} padding="md" className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusDot variant={doc.status} />
                    <span className="text-xs text-text-3 font-mono">BMDC {doc.bmdc}</span>
                  </div>
                  <h3 className="text-base font-semibold text-ink mt-1">
                    {doc.name}
                  </h3>
                  <div className="text-xs text-text-3 font-mono mt-0.5">{doc.degrees}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-border space-y-1.5 text-xs text-text-2">
                <div className="font-medium text-ink">{doc.specialty}</div>
                <div className="flex items-center gap-1.5 text-text-3">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{doc.hospital} · {doc.chamber}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-3">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'bn' ? 'পরবর্তী সিরিয়াল:' : 'Next slot:'} {doc.nextSlot}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <div>
                <span className="text-xs text-text-3">{lang === 'bn' ? 'পরামর্শ ফি' : 'Consultation Fee'}</span>
                <div className="text-sm font-semibold text-ink">৳{doc.fee}</div>
              </div>
              <Button
                variant="primary"
                size="compact"
                onClick={() => handleStartBooking(doc)}
              >
                {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Serial'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* ─── 3-Step Booking Modal / Drawer ─── */}
      {activeBookingDoctor && (
        <Modal
          isOpen={true}
          onClose={() => setActiveBookingDoctor(null)}
          title={lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুকিং' : 'Book Appointment'}
          maxWidth="max-w-lg"
        >
          <div className="space-y-5">
            {/* Stepper Header: Step X of 3 + Dots */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-medium text-text-3">
                {lang === 'bn'
                  ? `ধাপ ${bookingStep} / ৩`
                  : `Step ${bookingStep} of 3`}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    bookingStep === 1
                      ? 'bg-accent'
                      : bookingStep > 1
                      ? 'bg-ink'
                      : 'bg-border-strong'
                  }`}
                />
                <span
                  className={`w-2 h-2 rounded-full ${
                    bookingStep === 2
                      ? 'bg-accent'
                      : bookingStep > 2
                      ? 'bg-ink'
                      : 'bg-border-strong'
                  }`}
                />
                <span
                  className={`w-2 h-2 rounded-full ${
                    bookingStep === 3 ? 'bg-accent' : 'bg-border-strong'
                  }`}
                />
              </div>
            </div>

            {/* Step 2: Date & Time */}
            {bookingStep === 2 && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-subtle border border-border">
                  <div className="text-xs text-text-3">{lang === 'bn' ? 'নির্বাচিত চিকিৎসক' : 'Selected Doctor'}</div>
                  <div className="text-sm font-semibold text-ink mt-0.5">{activeBookingDoctor.name}</div>
                  <div className="text-xs text-text-2">{activeBookingDoctor.specialty} · ৳{activeBookingDoctor.fee}</div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-3 block mb-2">
                    {lang === 'bn' ? 'তারিখ নির্বাচন করুন' : 'Select Date (Week starts Saturday)'}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {weekDays.map((day) => (
                      <button
                        key={day.key}
                        onClick={() => setSelectedDay(day.key)}
                        className={`p-2.5 rounded-lg border text-xs text-center transition-colors ${
                          selectedDay === day.key
                            ? 'bg-accent-tint border-accent text-accent font-semibold'
                            : 'bg-canvas border-border text-ink hover:border-border-strong'
                        }`}
                      >
                        {lang === 'bn' ? day.labelBn : day.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-3 block mb-2">
                    {lang === 'bn' ? 'সময় নির্বাচন করুন' : 'Available Time Slots'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((slot, i) => (
                      <button
                        key={i}
                        disabled={slot.booked}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`h-10 px-3 rounded-lg border text-xs font-medium transition-colors ${
                          slot.booked
                            ? 'bg-subtle border-border text-text-3 cursor-not-allowed line-through'
                            : selectedTimeSlot === slot.time
                            ? 'bg-accent-tint border-accent text-accent font-semibold'
                            : 'bg-canvas border-border text-ink hover:border-border-strong'
                        }`}
                      >
                        {slot.time} {slot.booked && '(Booked)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                  <Button variant="ghost" size="compact" onClick={() => setActiveBookingDoctor(null)}>
                    {t('action.cancel', 'Cancel')}
                  </Button>
                  <Button variant="primary" size="compact" onClick={() => setBookingStep(3)}>
                    {lang === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {bookingStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border bg-canvas space-y-3">
                  <div className="flex justify-between items-start pb-2 border-b border-border">
                    <div>
                      <div className="text-xs text-text-3">{lang === 'bn' ? 'চিকিৎসক' : 'Physician'}</div>
                      <div className="text-sm font-semibold text-ink">{activeBookingDoctor.name}</div>
                      <div className="text-xs text-text-3">{activeBookingDoctor.hospital}</div>
                    </div>
                    <Badge variant="accent">৳{activeBookingDoctor.fee}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-text-3">{lang === 'bn' ? 'তারিখ:' : 'Date:'}</span>{' '}
                      <strong className="text-ink">{selectedDay}, Nov 2024</strong>
                    </div>
                    <div>
                      <span className="text-text-3">{lang === 'bn' ? 'সময়:' : 'Time:'}</span>{' '}
                      <strong className="text-ink">{selectedTimeSlot}</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-text-2 block mb-1">
                    {lang === 'bn' ? 'পরামর্শের কারণ (ঐচ্ছিক)' : 'Reason for Visit (Optional)'}
                  </label>
                  <Input
                    placeholder={lang === 'bn' ? 'যেমন: তীব্র মাথা ব্যথা ও রক্তচাপ...' : 'e.g. Chest discomfort, routine check...'}
                    value={visitReason}
                    onChange={(e) => setVisitReason(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="compact"
                    leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                    onClick={() => setBookingStep(2)}
                  >
                    {lang === 'bn' ? 'পূর্ববর্তী' : 'Back'}
                  </Button>
                  <Button variant="primary" size="compact" onClick={handleConfirmAppointment}>
                    {lang === 'bn' ? 'বুকিং নিশ্চিত করুন' : 'Confirm Appointment'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
