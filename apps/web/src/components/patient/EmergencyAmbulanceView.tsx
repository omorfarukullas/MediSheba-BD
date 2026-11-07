import React, { useState, useEffect } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { 
  PhoneCall, 
  MapPin, 
  Navigation, 
  Ambulance as AmbulanceIcon, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ShieldAlert, 
  Search,
  ExternalLink
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
      // Default to Dhaka coordinates
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
        // Fallback default Dhaka coordinates
        setLocation({ lat: 23.8103, lng: 90.4125 });
        setLocationError(lang === 'bn' ? 'ডিফল্ট লোকেশন (ঢাকা) ব্যবহৃত হচ্ছে' : 'Using default location (Dhaka)');
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Emergency Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-yellow-300 animate-pulse" />
              {lang === 'bn' ? 'লগইন ছাড়াই সার্বক্ষণিক সেবা' : '24/7 Access • No Login Required'}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স ও নিকটস্থ হাসপাতাল সেবা' : 'Emergency Ambulance & Nearest Hospital Dispatch'}
            </h1>
            <p className="text-white/80 text-sm max-w-2xl">
              {lang === 'bn' 
                ? 'আপনার লোকেশন স্বয়ংক্রিয়ভাবে শনাক্ত করে নিকটস্থ হাসপাতালের রেডি অ্যাম্বুলেন্স ড্রাইভারের সাথে তাৎক্ষণিক যোগাযোগ করুন।'
                : 'Instantly view ready ambulances at nearby registered hospitals with direct driver calling and 1-tap dispatch.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:999"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-red-50 font-bold px-6 py-3 rounded-xl shadow-md transition"
            >
              <PhoneCall className="w-5 h-5 text-red-600" />
              <span>{lang === 'bn' ? 'জাতীয় কল: ৯৯৯' : 'National Call: 999'}</span>
            </a>
            <button
              onClick={detectLocation}
              disabled={locating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-800/60 hover:bg-red-800 text-white font-medium px-4 py-3 rounded-xl border border-white/20 transition text-sm"
            >
              <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
              <span>{lang === 'bn' ? 'লোকেশন রিফ্রেশ' : 'Refresh GPS'}</span>
            </button>
          </div>
        </div>

        {location && (
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-xs text-white/90">
            <MapPin className="w-4 h-4 text-yellow-300" />
            <span>
              {lang === 'bn' ? 'শনাক্তকৃত জিপিএস স্থানাঙ্ক:' : 'Detected GPS:'} {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              {locationError && ` (${locationError})`}
            </span>
          </div>
        )}
      </div>

      {/* Instant Emergency Request Card */}
      <div className="bg-panel border border-red-200 dark:border-red-900/50 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h2 className="font-bold text-lg text-ink">
            {lang === 'bn' ? '১-ক্লিকে অ্যাম্বুলেন্স রিকোয়েস্ট পাঠান' : '1-Click Instant Ambulance Request'}
          </h2>
        </div>

        {submitSuccess && activeRequest ? (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 p-5 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="font-bold text-base">
                  {lang === 'bn' ? 'অ্যাম্বুলেন্স রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে!' : 'Emergency Request Dispatched!'}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  {lang === 'bn' ? 'হাসপাতাল:' : 'Assigned Hospital:'} {activeRequest.assignedHospital}
                </p>
              </div>
            </div>
            {activeRequest.ambulancePhone && (
              <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-lg border border-emerald-200">
                <div className="flex-1">
                  <div className="text-xs text-ink-secondary">{lang === 'bn' ? 'অ্যাম্বুলেন্স ড্রাইভার' : 'Driver'}: {activeRequest.driverName}</div>
                  <div className="font-bold text-ink">{activeRequest.ambulancePhone}</div>
                </div>
                <a
                  href={`tel:${activeRequest.ambulancePhone}`}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 text-sm hover:bg-emerald-700 transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  {lang === 'bn' ? 'সরাসরি কল করুন' : 'Call Driver'}
                </a>
              </div>
            )}
            <button
              onClick={() => { setSubmitSuccess(false); setActiveRequest(null); }}
              className="text-xs underline text-emerald-700 hover:text-emerald-900"
            >
              {lang === 'bn' ? 'নতুন রিকোয়েস্ট করুন' : 'Submit another request'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleInstantDispatch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">
                {lang === 'bn' ? 'রোগী/কলকারীর ফোন নম্বর *' : 'Caller Phone Number *'}
              </label>
              <input
                type="tel"
                required
                value={callerPhone}
                onChange={(e) => setCallerPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">
                {lang === 'bn' ? 'রোগীর নাম (ঐচ্ছিক)' : 'Patient Name (Optional)'}
              </label>
              <input
                type="text"
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                placeholder={lang === 'bn' ? 'রোগীর নাম' : 'e.g. Rahim Ahmed'}
                className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">
                {lang === 'bn' ? 'রোগীর অবস্থা / সমস্যা' : 'Condition / Reason'}
              </label>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder={lang === 'bn' ? 'হার্ট অ্যাটাক / সড়ক দুর্ঘটনা...' : 'Heart issue / accident / oxygen...'}
                className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={createRequestMutation.isPending}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <AmbulanceIcon className="w-5 h-5 animate-bounce" />
                <span>{createRequestMutation.isPending ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Dispatching...') : (lang === 'bn' ? 'তাৎক্ষণিক পাঠান' : 'Dispatch Now')}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Ambulance Filter Tabs */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AmbulanceIcon className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-lg text-ink">
              {lang === 'bn' ? 'হাসপাতাল অনুযায়ী প্রস্তুত অ্যাম্বুলেন্স তালিকা' : 'Registered Hospital Ambulance Fleet'}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-ground-muted p-1 rounded-xl border border-rule text-xs font-semibold">
            {(['ALL', 'ICU', 'AC', 'NON_AC', 'FREEZER'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedType === t 
                    ? 'bg-accent text-on-accent shadow-xs' 
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {t === 'ALL' ? (lang === 'bn' ? 'সব' : 'All') : t}
              </button>
            ))}
          </div>
        </div>

        {/* Ambulances List Grid */}
        {isLoading ? (
          <div className="p-12 text-center text-ink-secondary">
            <AmbulanceIcon className="w-8 h-8 animate-pulse mx-auto mb-2 text-accent" />
            {lang === 'bn' ? 'নিকটস্থ অ্যাম্বুলেন্স তথ্য লোড হচ্ছে...' : 'Locating nearest ambulances...'}
          </div>
        ) : ambulances && ambulances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ambulances.map((amb) => {
              const isAvailable = amb.status === 'AVAILABLE';
              return (
                <div
                  key={amb.id}
                  className={`bg-panel border rounded-2xl p-5 shadow-sm transition hover:shadow-md ${
                    isAvailable ? 'border-emerald-200 dark:border-emerald-900/40' : 'border-rule opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-1.5 ${
                        amb.type === 'ICU' 
                          ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300' 
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      }`}>
                        {amb.type} AMBULANCE
                      </span>
                      <h4 className="font-bold text-base text-ink">{amb.plateNumber}</h4>
                      <p className="text-xs text-ink-secondary flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {amb.hospital?.name} ({amb.hospital?.city})
                      </p>
                    </div>

                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isAvailable 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {amb.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-ink-secondary mb-4 bg-ground p-3 rounded-xl border border-rule">
                    <div className="flex justify-between">
                      <span>{lang === 'bn' ? 'ড্রাইভার' : 'Driver'}:</span>
                      <span className="font-semibold text-ink">{amb.driverName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === 'bn' ? 'হাসপাতাল ফোন' : 'Hospital Phone'}:</span>
                      <span className="font-semibold text-ink">{amb.hospital?.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === 'bn' ? 'ঠিকানা' : 'Address'}:</span>
                      <span className="text-right truncate max-w-[180px]">{amb.hospital?.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${amb.phone}`}
                      className={`flex-1 flex items-center justify-center gap-2 font-bold py-2.5 px-3 rounded-xl text-sm transition shadow-xs ${
                        isAvailable 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : 'bg-ground-muted text-ink-secondary hover:text-ink'
                      }`}
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'ড্রাইভারকে কল' : 'Call Driver'}</span>
                    </a>

                    <a
                      href={`tel:${amb.hospital?.phone}`}
                      title={lang === 'bn' ? 'হাসপাতালে সরাসরি কল' : 'Call Hospital'}
                      className="p-2.5 rounded-xl border border-rule hover:border-accent text-ink-secondary hover:text-accent transition"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-panel border border-rule rounded-2xl text-ink-secondary">
            <AmbulanceIcon className="w-10 h-10 mx-auto mb-2 text-ink-secondary/40" />
            <p>{lang === 'bn' ? 'এই ফিল্টারে কোন অ্যাম্বুলেন্স পাওয়া যায়নি' : 'No ambulances found for this filter.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

