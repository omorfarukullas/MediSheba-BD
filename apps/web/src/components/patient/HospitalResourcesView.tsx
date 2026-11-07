import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { 
  Hospital as HospitalIcon, 
  Bed, 
  Activity, 
  Heart, 
  DoorClosed, 
  Search, 
  MapPin, 
  Phone, 
  Ambulance as AmbulanceIcon, 
  FileText, 
  Filter,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export function HospitalResourcesView() {
  const { lang } = useLanguageStore();
  const [cityFilter, setCityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [resourceTab, setResourceTab] = useState<'resources' | 'tests' | 'ambulances'>('resources');
  const [testSearch, setTestSearch] = useState('');

  const { data: hospitals, isLoading } = trpc.hospital.list.useQuery({
    city: cityFilter || undefined,
    search: searchQuery || undefined
  });

  const { data: hospitalDetail, isLoading: isLoadingDetail } = trpc.hospital.getById.useQuery(
    { id: selectedHospitalId! },
    { enabled: !!selectedHospitalId }
  );

  const { data: testPrices } = trpc.testPrice.getByHospital.useQuery(
    { hospitalId: selectedHospitalId! },
    { enabled: !!selectedHospitalId }
  );

  // Group resources by type helper
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'ICU_BED': return <Activity className="w-4 h-4 text-rose-500" />;
      case 'CCU_BED': return <Heart className="w-4 h-4 text-purple-500" />;
      case 'CABIN': return <DoorClosed className="w-4 h-4 text-amber-500" />;
      default: return <Bed className="w-4 h-4 text-blue-500" />;
    }
  };

  const getResourceLabel = (type: string) => {
    switch (type) {
      case 'ICU_BED': return lang === 'bn' ? 'আইসিইউ বেড' : 'ICU Bed';
      case 'CCU_BED': return lang === 'bn' ? 'সিসিইউ বেড' : 'CCU Bed';
      case 'CABIN': return lang === 'bn' ? 'কেবিন' : 'Cabin';
      case 'GENERAL_BED': return lang === 'bn' ? 'জেনারেল বেড / ওয়ার্ড' : 'General Ward Bed';
      case 'OPERATION_THEATER': return lang === 'bn' ? 'অপারেশন থিয়েটার' : 'Operation Theater';
      default: return type;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
            <HospitalIcon className="w-4 h-4" />
            {lang === 'bn' ? 'লাইভ হাসপাতাল রিসোর্স ট্র্যাকার' : 'Live Hospital Resource Directory'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
            {lang === 'bn' ? 'হাসপাতালের বেড, আইসিইউ, সিসিইউ ও টেস্টের মূল্য তালিকা' : 'Hospital Beds, ICU, CCU & Test Price List'}
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            {lang === 'bn'
              ? 'নিবন্ধিত সরকারি ও বেসরকারি হাসপাতালের রিয়েল-টাইম খালি বেড, অ্যাম্বুলেন্স এবং ডায়াগনস্টিক পরীক্ষার মূল্য যাচাই করুন।'
              : 'Real-time resource occupancy, ready ambulance fleets, and diagnostic test price transparency.'}
          </p>
        </div>

        {/* Search & City Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-ink-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'হাসপাতাল খুঁজুন...' : 'Search hospital...'}
              className="pl-9 pr-3 py-2 text-sm border border-rule rounded-xl bg-panel text-ink focus:outline-none focus:border-accent w-48 md:w-60 shadow-xs"
            />
          </div>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-rule rounded-xl bg-panel text-ink focus:outline-none focus:border-accent shadow-xs"
          >
            <option value="">{lang === 'bn' ? 'সকল জেলা/শহর' : 'All Cities'}</option>
            <option value="Dhaka">Dhaka (ঢাকা)</option>
            <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
            <option value="Sylhet">Sylhet (সিলেট)</option>
            <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
            <option value="Khulna">Khulna (খুলনা)</option>
            <option value="Barisal">Barisal (বরিশাল)</option>
          </select>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      {isLoading ? (
        <div className="p-16 text-center text-ink-secondary">
          <HospitalIcon className="w-10 h-10 animate-pulse mx-auto mb-2 text-accent" />
          {lang === 'bn' ? 'হাসপাতাল ডেটা লোড হচ্ছে...' : 'Loading registered hospitals...'}
        </div>
      ) : hospitals && hospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hosp) => {
            const isSelected = selectedHospitalId === hosp.id;
            return (
              <div
                key={hosp.id}
                className={`bg-panel border rounded-2xl p-6 shadow-sm transition hover:shadow-md flex flex-col justify-between ${
                  isSelected ? 'border-accent ring-2 ring-accent/20' : 'border-rule'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent uppercase">
                        {hosp.type}
                      </span>
                      <h3 className="font-bold text-lg text-ink mt-1.5">{hosp.name}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-ink-secondary flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{hosp.address}, {hosp.city}</span>
                  </p>

                  {/* Bed counts quick grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {hosp.resources.map((res) => {
                      const isAvailable = res.availableCount > 0;
                      return (
                        <div
                          key={res.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                            isAvailable 
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40' 
                              : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {getResourceIcon(res.type)}
                            <span className="font-medium text-ink truncate max-w-[80px]">
                              {getResourceLabel(res.type)}
                            </span>
                          </div>
                          <span className={`font-bold ${isAvailable ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-400'}`}>
                            {res.availableCount}/{res.totalCount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-rule flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                    <AmbulanceIcon className="w-4 h-4 text-emerald-600" />
                    <span>{hosp.ambulances.length} {lang === 'bn' ? 'অ্যাম্বুলেন্স প্রস্তুত' : 'Ambulances Ready'}</span>
                  </div>

                  <button
                    onClick={() => setSelectedHospitalId(isSelected ? null : hosp.id)}
                    className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-accent text-on-accent hover:opacity-90 transition shadow-xs"
                  >
                    {isSelected 
                      ? (lang === 'bn' ? 'বন্ধ করুন' : 'Close Details') 
                      : (lang === 'bn' ? 'বিস্তারিত ও টেস্ট মূল্য' : 'View Full Resources')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center bg-panel border border-rule rounded-2xl text-ink-secondary">
          <HospitalIcon className="w-10 h-10 mx-auto mb-2 text-ink-secondary/40" />
          <p>{lang === 'bn' ? 'কোন হাসপাতাল পাওয়া যায়নি' : 'No hospitals found matching your filter.'}</p>
        </div>
      )}

      {/* Selected Hospital Detailed Modal / Drawer */}
      {selectedHospitalId && hospitalDetail && (
        <div className="bg-panel border border-accent/40 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-rule">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent text-on-accent">
                  {hospitalDetail.type}
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-ink">{hospitalDetail.name}</h2>
              </div>
              <p className="text-sm text-ink-secondary flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-accent" />
                {hospitalDetail.address}, {hospitalDetail.city} • <Phone className="w-3.5 h-3.5" /> {hospitalDetail.phone}
              </p>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-2 bg-ground-muted p-1 rounded-xl border border-rule text-xs font-semibold">
              <button
                onClick={() => setResourceTab('resources')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  resourceTab === 'resources' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {lang === 'bn' ? 'বেড ও কেবিন' : 'Beds & Cabins'}
              </button>
              <button
                onClick={() => setResourceTab('tests')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  resourceTab === 'tests' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {lang === 'bn' ? 'টেস্টের মূল্য তালিকা' : 'Test Price List'}
              </button>
              <button
                onClick={() => setResourceTab('ambulances')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  resourceTab === 'ambulances' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {lang === 'bn' ? 'অ্যাম্বুলেন্স বহর' : 'Ambulance Fleet'}
              </button>
            </div>
          </div>

          {/* TAB 1: Resources Breakdown */}
          {resourceTab === 'resources' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-ink">
                {lang === 'bn' ? 'রিসোর্স ক্যাপাসিটি ও বর্তমান খালি সংখ্যা' : 'Current Resource Capacity & Live Availability'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {hospitalDetail.resources.map((res) => {
                  const availablePercent = Math.round((res.availableCount / (res.totalCount || 1)) * 100);
                  const isAvailable = res.availableCount > 0;
                  return (
                    <div key={res.id} className="p-5 rounded-2xl border border-rule bg-ground space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getResourceIcon(res.type)}
                          <span className="font-bold text-sm text-ink">{getResourceLabel(res.type)}</span>
                        </div>
                        {isAvailable ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {lang === 'bn' ? 'খালি আছে' : 'Available'}
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            {lang === 'bn' ? 'পূর্ণ' : 'Full'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-black text-ink">{res.availableCount}</span>
                        <span className="text-xs text-ink-secondary">
                          {lang === 'bn' ? 'মোট:' : 'Total:'} {res.totalCount} {lang === 'bn' ? 'টি' : ''}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 rounded-full bg-rule overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            availablePercent > 30 ? 'bg-emerald-500' : availablePercent > 0 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${availablePercent}%` }}
                        />
                      </div>

                      {res.pricePerDay && (
                        <div className="text-[11px] text-ink-secondary pt-1 flex justify-between border-t border-rule/50">
                          <span>{lang === 'bn' ? 'দৈনিক ভাড়া:' : 'Daily Rate:'}</span>
                          <span className="font-bold text-ink">৳ {res.pricePerDay.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Diagnostic Test Price List */}
          {resourceTab === 'tests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-bold text-base text-ink">
                  {lang === 'bn' ? 'ডায়াগনস্টিক টেস্টের মূল্য তালিকা' : 'Hospital Diagnostic Test Price Transparency'}
                </h3>
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-ink-secondary" />
                  <input
                    type="text"
                    value={testSearch}
                    onChange={(e) => setTestSearch(e.target.value)}
                    placeholder={lang === 'bn' ? 'টেস্টের নাম দিয়ে খুঁজুন...' : 'Filter test (e.g. CBC, MRI)...'}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-rule rounded-xl bg-ground text-ink focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {testPrices && testPrices.length > 0 ? (
                <div className="overflow-x-auto border border-rule rounded-2xl">
                  <table className="w-full text-left text-xs text-ink">
                    <thead className="bg-ground-muted text-ink-secondary font-bold uppercase tracking-wider border-b border-rule">
                      <tr>
                        <th className="py-3 px-4">{lang === 'bn' ? 'টেস্টের নাম' : 'Test Name'}</th>
                        <th className="py-3 px-4">{lang === 'bn' ? 'বিভাগ / ক্যাটাগরি' : 'Category'}</th>
                        <th className="py-3 px-4">{lang === 'bn' ? 'ডেলিভারি সময়' : 'Turnaround Time'}</th>
                        <th className="py-3 px-4 text-right">{lang === 'bn' ? 'নির্ধারিত মূল্য' : 'Official Price (BDT)'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {testPrices
                        .filter(t => !testSearch || t.testName.toLowerCase().includes(testSearch.toLowerCase()))
                        .map((test) => (
                          <tr key={test.id} className="hover:bg-ground/50 transition">
                            <td className="py-3 px-4 font-semibold text-ink">{test.testName}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent font-medium">
                                {test.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-ink-secondary flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {test.deliveryHours || 24} {lang === 'bn' ? 'ঘণ্টা' : 'Hours'}
                            </td>
                            <td className="py-3 px-4 text-right font-black text-sm text-accent">
                              ৳ {test.price.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-ink-secondary bg-ground rounded-xl border border-rule">
                  {lang === 'bn' ? 'এই হাসপাতালের টেস্ট প্রাইস তালিকা শীঘ্রই আপডেট করা হবে।' : 'Diagnostic test prices will be updated shortly.'}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Ambulance Fleet */}
          {resourceTab === 'ambulances' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-ink">
                {lang === 'bn' ? 'হাসপাতালের নিবন্ধিত অ্যাম্বুলেন্স' : 'Registered Hospital Ambulances'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hospitalDetail.ambulances.map((amb) => (
                  <div key={amb.id} className="p-4 rounded-xl border border-rule bg-ground space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-accent">{amb.type} AMBULANCE</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        amb.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {amb.status}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-ink">{amb.plateNumber}</div>
                    <div className="text-xs text-ink-secondary">
                      {lang === 'bn' ? 'ড্রাইভার' : 'Driver'}: {amb.driverName}
                    </div>
                    <a
                      href={`tel:${amb.phone}`}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {amb.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

