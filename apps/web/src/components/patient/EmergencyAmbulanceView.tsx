import React, { useState, useEffect } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { AlertBanner } from '../ui/AlertBanner';
import { 
  PhoneCall, 
  MapPin, 
  Navigation, 
  Ambulance as AmbulanceIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Search,
  Phone
} from 'lucide-react';

export function EmergencyAmbulanceView() {
  const { lang } = useLanguageStore();
  const [callerPhone, setCallerPhone] = useState('');
  const [callerName, setCallerName] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [locating, setLocating] = useState(false);
  const [selectedType, setSelectedType] = useState<'ALL' | 'ICU' | 'AC' | 'NON_AC' | 'FREEZER'>('ALL');
  const [activeRequest, setActiveRequest] = useState<any | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-detect patient GPS location on mount
  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser');
      setLocation({ lat: 23.8103, lng: 90.4125 });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        setLocationError('');
      },
      (err) => {
        setLocation({ lat: 23.8103, lng: 90.4125 });
        setLocationError(lang === 'bn' ? 'ডিফল্ট অবস্থান (ঢাকা) ব্যবহৃত হচ্ছে' : 'Using default location (Dhaka)');
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const { data: ambulances, isLoading, refetch } = trpc.emergency.getNearbyAmbulances.useQuery({
    latitude: location?.lat,
    longitude: location?.lng,
    type: selectedType === 'ALL' ? undefined : selectedType
  });

  const createRequestMutation = trpc.emergency.createRequest.useMutation({
    onSuccess: (data) => {
      setActiveRequest(data);
      setSubmitSuccess(true);
      refetch();
    }
  });

  const handleInstantDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callerPhone || callerPhone.length < 11) {
      alert(lang === 'bn' ? 'সঠিক ১১ ডিজিটের ফোন নম্বর দিন' : 'Please provide a valid 11-digit phone number');
      return;
    }

    createRequestMutation.mutate({
      callerName: callerName || 'Emergency Patient',
      callerPhone,
      latitude: location?.lat || 23.8103,
      longitude: location?.lng || 90.4125,
      addressText: lang === 'bn' ? 'জরুরি রোগী অবস্থান' : 'Emergency patient location',
      patientCondition: condition || (lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স প্রয়োজন' : 'Urgent ambulance required')
    });
  };

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স ও ইমার্জেন্সি ৯৯৯' : 'Emergency 999 & Ambulance Dispatch'}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn'
              ? 'লগইন ছাড়াই সার্বক্ষণিক সেবা। নিকটস্থ আইসিইউ ও সাধারণ অ্যাম্বুলেন্স সরাসরি কল বা রিকুয়েস্ট করুন।'
              : '24/7 emergency dispatch. Request nearby ICU or AC ambulances directly without login.'}
          </p>
        </div>

        <a href="tel:999">
          <Button variant="danger" size="default" leftIcon={<PhoneCall className="w-4 h-4" />}>
            {lang === 'bn' ? 'জরুরি ৯৯৯ ডায়াল করুন' : 'Call 999 Emergency'}
          </Button>
        </a>
      </div>

      {/* ─── Clinical Alert Banner ─── */}
      <AlertBanner
        variant="danger"
        message={
          lang === 'bn'
            ? 'জরুরি সতর্কতা: জীবন সংশয়ী অবস্থায় তাৎক্ষণিকভাবে সরাসরি ৯৯৯ নম্বরে ফোন দিন। নিচের ফর্মটি পূরণ করলে নিকটস্থ সক্রিয় ড্রাইভারদের সংকেত পাঠানো হবে।'
            : 'Immediate Safety Alert: For life-threatening emergencies, dial 999 right away. Dispatch requests below alert active on-duty drivers in real time.'
        }
      />

      {submitSuccess && activeRequest && (
        <AlertBanner
          variant="success"
          message={
            lang === 'bn'
              ? `অ্যাম্বুলেন্স অনুরোধ গৃহীত হয়েছে! রিকুয়েস্ট আইডি: #${activeRequest.id.slice(-6)}। চালক শীঘ্রই ফোনে যোগাযোগ করবেন।`
              : `Dispatch request received! ID #${activeRequest.id.slice(-6)}. Assigned driver will contact your phone shortly.`
          }
        />
      )}

      {/* ─── 2-Column: Quick Dispatch Form & Nearby List ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Dispatch Form */}
        <Card padding="lg" className="space-y-4 lg:col-span-1">
          <div className="pb-3 border-b border-border">
            <h2 className="text-base font-semibold text-ink">
              {lang === 'bn' ? 'তাৎক্ষণিক অ্যাম্বুলেন্স রিকুয়েস্ট' : 'Request Ambulance Dispatch'}
            </h2>
            <p className="text-xs text-text-3">
              {lang === 'bn' ? 'ফোন নম্বর দিন, ড্রাইভার যোগাযোগ করবেন' : 'Provide phone number for instant dispatch'}
            </p>
          </div>

          <form onSubmit={handleInstantDispatch} className="space-y-3">
            <Input
              label={lang === 'bn' ? 'রোগী বা কলদাতার ফোন নম্বর *' : 'Contact Phone Number *'}
              type="tel"
              required
              placeholder="01XXXXXXXXX"
              value={callerPhone}
              onChange={(e) => setCallerPhone(e.target.value)}
            />

            <Input
              label={lang === 'bn' ? 'রোগীর নাম (ঐচ্ছিক)' : 'Patient Name (Optional)'}
              placeholder={lang === 'bn' ? 'যেমন: মোঃ করিম' : 'e.g. Patient Name'}
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
            />

            <Input
              label={lang === 'bn' ? 'রোগীর শারীরিক অবস্থা' : 'Patient Condition'}
              placeholder={lang === 'bn' ? 'যেমন: হৃদরোগ, শ্বাসকষ্ট...' : 'e.g. Chest pain, trauma...'}
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />

            <div className="p-3 rounded-lg bg-subtle border border-border text-xs text-text-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-ink flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {lang === 'bn' ? 'জিপিএস অবস্থান' : 'GPS Coordinates'}
                </span>
                <button
                  type="button"
                  onClick={detectLocation}
                  className="text-accent hover:underline font-medium cursor-pointer"
                >
                  {locating ? '...' : (lang === 'bn' ? 'রিফ্রেশ' : 'Refresh')}
                </button>
              </div>
              <div className="font-mono text-[11px] text-text-2">
                {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Detecting...'}
              </div>
              {locationError && <div className="text-[11px] text-text-3">{locationError}</div>}
            </div>

            <Button
              variant="primary"
              size="default"
              className="w-full"
              type="submit"
              isLoading={createRequestMutation.isPending}
            >
              {lang === 'bn' ? 'অ্যাম্বুলেন্স ডাকুন' : 'Dispatch Nearest Ambulance'}
            </Button>
          </form>
        </Card>

        {/* Right: Nearby Ambulances List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-ink">
                {lang === 'bn' ? 'নিকটস্থ প্রস্তুত অ্যাম্বুলেন্স' : 'Nearby On-Duty Ambulances'}
              </h2>
              <p className="text-xs text-text-3">
                {lang === 'bn' ? 'সরাসরি চালককে কল করে সেবা নিশ্চিত করুন' : 'Directly call drivers on duty'}
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['ALL', 'ICU', 'AC', 'NON_AC', 'FREEZER'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    selectedType === type
                      ? 'bg-accent-tint text-accent border-accent'
                      : 'bg-subtle text-text-2 border-border hover:border-border-strong hover:text-ink'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ambulances && ambulances.length > 0 ? (
              ambulances.map((amb) => (
                <Card key={amb.id} padding="md" className="flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="neutral">{amb.type}</Badge>
                      <Badge variant={amb.status === 'AVAILABLE' ? 'success' : 'warning'}>
                        {amb.status}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-ink">{amb.driverName}</h3>
                      <div className="text-xs text-text-3 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" /> {amb.phone}
                      </div>
                      <div className="text-xs text-text-2 mt-1 font-mono">
                        {amb.plateNumber}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                    <span className="text-xs text-text-3">
                      {lang === 'bn' ? 'প্রস্তুত' : 'Ready'}
                    </span>
                    <a href={`tel:${amb.phone}`}>
                      <Button variant="secondary" size="compact" leftIcon={<PhoneCall className="w-3 h-3" />}>
                        {lang === 'bn' ? 'কল দিন' : 'Call Driver'}
                      </Button>
                    </a>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-2 p-8 text-center bg-canvas rounded-xl border border-border text-sm text-text-3">
                {lang === 'bn' ? 'এই মুহূর্তে কোন অ্যাম্বুলেন্স উপলব্ধ নেই।' : 'No ambulances available right now in this zone.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
