import React, { useState } from 'react';
import { useLanguageStore } from '../../../stores/language.store';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { StatusDot } from '../../../components/ui/StatusDot';
import { Search, Stethoscope, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';

export function PatientDoctorsPage() {
  const { lang } = useLanguageStore();
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [bookedDoctor, setBookedDoctor] = useState<string | null>(null);

  const specialties = [
    { id: 'all', label: lang === 'bn' ? 'সকল বিভাগ' : 'All Specialties' },
    { id: 'medicine', label: lang === 'bn' ? 'মেডিসিন' : 'Medicine' },
    { id: 'cardiology', label: lang === 'bn' ? 'কার্ডিওলজি' : 'Cardiology' },
    { id: 'orthopedic', label: lang === 'bn' ? 'অর্থোপেডিক' : 'Orthopedics' },
    { id: 'gynecology', label: lang === 'bn' ? 'স্ত্রী ও প্রসূতি' : 'Gynecology' },
    { id: 'pediatric', label: lang === 'bn' ? 'শিশু রোগ' : 'Pediatrics' },
  ];

  const doctors = [
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
      status: 'online' as const,
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
      status: 'online' as const,
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
      status: 'busy' as const,
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          {lang === 'bn' ? 'বিশেষজ্ঞ চিকিৎসক খুঁজুন ও সিরিয়াল নিন' : 'Find Doctors & Book Serial'}
        </h1>
        <p className="text-[14px] text-ink-secondary">
          {lang === 'bn'
            ? 'বিএমডিসি অনুমোদিত চিকিৎসকদের তালিকা থেকে বেছে নিন এবং সরাসরি সিরিয়াল বুক করুন'
            : 'Explore certified specialist physicians across leading hospitals in Bangladesh'}
        </p>
      </div>

      {bookedDoctor && (
        <div className="p-4 rounded-panel bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-emerald-800">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-[14px] font-semibold">
              {lang === 'bn'
                ? 'আপনার সিরিয়াল বুকিং সফল হয়েছে! লাইভ সিরিয়াল ট্র্যাকারে গিয়ে আপনার সিরিয়াল নম্বর দেখুন।'
                : 'Appointment booked successfully! Check your token number in the Live Serial Tracker.'}
            </span>
          </div>
          <Button size="sm" variant="outline" onClick={() => setBookedDoctor(null)}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder={
              lang === 'bn'
                ? 'ডাক্তার, বিভাগ বা হাসপাতালের নাম দিয়ে খুঁজুন...'
                : 'Search by doctor name, specialty, or hospital...'
            }
            leftIcon={<Search className="w-4 h-4 text-ink-secondary" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Specialty Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {specialties.map((spec) => (
          <button
            key={spec.id}
            onClick={() => setSelectedSpecialty(spec.id)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition duration-interaction ${
              selectedSpecialty === spec.id
                ? 'bg-accent text-on-accent shadow-xs'
                : 'bg-panel border border-rule text-ink-secondary hover:text-ink hover:bg-ground-muted'
            }`}
          >
            {spec.label}
          </button>
        ))}
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doc) => (
          <Card key={doc.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <StatusDot
                    variant={doc.status === 'online' ? 'online' : 'busy'}
                    ping={doc.status === 'online'}
                  />
                  <Badge variant="neutral" size="sm">BMDC {doc.bmdc}</Badge>
                </div>
                <div className="font-display font-bold text-accent text-lg">
                  ৳{doc.fee}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-ink tracking-tight">
                  {doc.name}
                </h3>
                <div className="text-[12px] font-semibold text-accent mt-0.5">
                  {doc.degrees}
                </div>
                <div className="text-[13px] text-ink font-medium mt-1">
                  {doc.specialty}
                </div>
              </div>

              <div className="space-y-1.5 text-[12px] text-ink-secondary pt-1 border-t border-rule/60">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="truncate">{doc.hospital}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Next: {doc.nextSlot}</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={() => setBookedDoctor(doc.id)}
            >
              {lang === 'bn' ? 'সিরিয়াল বুক করুন' : 'Book Appointment'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

