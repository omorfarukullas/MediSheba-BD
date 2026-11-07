import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
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
  CheckCircle2,
  XCircle,
  FileText
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

  const getResourceLabel = (type: string) => {
    switch (type) {
      case 'ICU_BED': return lang === 'bn' ? 'আইসিইউ বেড' : 'ICU Bed';
      case 'CCU_BED': return lang === 'bn' ? 'সিসিইউ বেড' : 'CCU Bed';
      case 'CABIN': return lang === 'bn' ? 'কেবিন' : 'Cabin';
      case 'GENERAL_BED': return lang === 'bn' ? 'জেনারেল ওয়ার্ড' : 'General Ward';
      case 'OPERATION_THEATER': return lang === 'bn' ? 'অপারেশন থিয়েটার' : 'OT';
      default: return type;
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {lang === 'bn' ? 'হাসপাতালের বেড ও ডায়াগনস্টিক ফি' : 'Hospital Beds & Test Price List'}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn'
              ? 'নিবন্ধিত সরকারি ও বেসরকারি হাসপাতালের খালি বেড, অ্যাম্বুলেন্স এবং পরীক্ষার সরকারি ও নিজস্ব রেট।'
              : 'Real-time bed occupancy, ready ambulance fleets, and diagnostic test price transparency.'}
          </p>
        </div>

        {/* Search & City Filter */}
        <div className="flex items-center gap-3">
          <div className="w-48 sm:w-60">
            <Input
              placeholder={lang === 'bn' ? 'হাসপাতাল খুঁজুন...' : 'Search hospital...'}
              leftIcon={<Search className="w-4 h-4 text-text-3" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="h-10 px-3 text-sm font-medium border border-border rounded-lg bg-canvas text-ink focus:outline-none focus:border-accent"
          >
            <option value="">{lang === 'bn' ? 'সকল শহর' : 'All Cities'}</option>
            <option value="Dhaka">{lang === 'bn' ? 'ঢাকা' : 'Dhaka'}</option>
            <option value="Chittagong">{lang === 'bn' ? 'চট্টগ্রাম' : 'Chittagong'}</option>
            <option value="Sylhet">{lang === 'bn' ? 'সিলেট' : 'Sylhet'}</option>
            <option value="Rajshahi">{lang === 'bn' ? 'রাজশাহী' : 'Rajshahi'}</option>
          </select>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      {hospitals && hospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hospitals.map((hosp) => {
            const isSelected = selectedHospitalId === hosp.id;
            return (
              <Card
                key={hosp.id}
                padding="md"
                className={`flex flex-col justify-between space-y-4 transition-colors ${
                  isSelected ? 'border-accent ring-1 ring-accent' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="neutral">{hosp.type}</Badge>
                      <h3 className="font-semibold text-base text-ink mt-1.5">{hosp.name}</h3>
                      <p className="text-xs text-text-3 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {hosp.address}, {hosp.city}
                      </p>
                    </div>
                  </div>

                  {/* Bed stats mini list */}
                  <div className="pt-2 border-t border-border grid grid-cols-2 gap-2 text-xs">
                    {hosp.resources.slice(0, 4).map((res) => {
                      const isAvailable = res.availableCount > 0;
                      return (
                        <div key={res.id} className="p-2 rounded-lg bg-subtle flex items-center justify-between">
                          <span className="text-text-2 truncate max-w-[80px]">
                            {getResourceLabel(res.type)}
                          </span>
                          <span className={`font-semibold ${isAvailable ? 'text-success-text' : 'text-danger-text'}`}>
                            {res.availableCount}/{res.totalCount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-text-3">
                    <AmbulanceIcon className="w-3.5 h-3.5 text-text-2" />
                    <span>{hosp.ambulances.length} {lang === 'bn' ? 'অ্যাম্বুলেন্স' : 'Ambulances'}</span>
                  </div>

                  <Button
                    variant={isSelected ? 'secondary' : 'primary'}
                    size="compact"
                    onClick={() => setSelectedHospitalId(isSelected ? null : hosp.id)}
                  >
                    {isSelected 
                      ? (lang === 'bn' ? 'বন্ধ করুন' : 'Close') 
                      : (lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details')}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card padding="lg" className="text-center py-12 text-sm text-text-3">
          {lang === 'bn' ? 'কোন হাসপাতাল পাওয়া যায়নি।' : 'No hospitals found matching your filter.'}
        </Card>
      )}

      {/* Selected Hospital Detailed Section */}
      {selectedHospitalId && hospitalDetail && (
        <Card padding="lg" className="space-y-5 border-accent">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="accent">{hospitalDetail.type}</Badge>
                <h2 className="text-xl font-semibold text-ink">{hospitalDetail.name}</h2>
              </div>
              <p className="text-xs text-text-3 flex items-center gap-2 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {hospitalDetail.address}, {hospitalDetail.city} · <Phone className="w-3 h-3" /> {hospitalDetail.phone}
              </p>
            </div>

            {/* Segmented Sub-tabs */}
            <div className="flex items-center p-1 rounded-lg bg-subtle border border-border">
              <button
                onClick={() => setResourceTab('resources')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  resourceTab === 'resources'
                    ? 'bg-canvas text-ink font-semibold shadow-xs'
                    : 'text-text-3 hover:text-ink'
                }`}
              >
                {lang === 'bn' ? 'বেড ও কেবিন' : 'Beds & Cabins'}
              </button>
              <button
                onClick={() => setResourceTab('tests')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  resourceTab === 'tests'
                    ? 'bg-canvas text-ink font-semibold shadow-xs'
                    : 'text-text-3 hover:text-ink'
                }`}
              >
                {lang === 'bn' ? 'টেস্টের মূল্য তালিকা' : 'Test Price List'}
              </button>
              <button
                onClick={() => setResourceTab('ambulances')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  resourceTab === 'ambulances'
                    ? 'bg-canvas text-ink font-semibold shadow-xs'
                    : 'text-text-3 hover:text-ink'
                }`}
              >
                {lang === 'bn' ? 'অ্যাম্বুলেন্স বহর' : 'Ambulance Fleet'}
              </button>
            </div>
          </div>

          {/* Subtab 1: Beds & Cabins */}
          {resourceTab === 'resources' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hospitalDetail.resources.map((res) => {
                const isAvailable = res.availableCount > 0;
                return (
                  <div key={res.id} className="p-3.5 rounded-lg border border-border bg-canvas space-y-1">
                    <div className="text-xs text-text-3">{getResourceLabel(res.type)}</div>
                    <div className="flex items-baseline justify-between">
                      <span className={`text-xl font-semibold ${isAvailable ? 'text-success-text' : 'text-danger-text'}`}>
                        {res.availableCount}
                      </span>
                      <span className="text-xs text-text-3">/ {res.totalCount} {lang === 'bn' ? 'মোট' : 'total'}</span>
                    </div>
                    {res.pricePerDay && (
                      <div className="text-[11px] text-text-3 pt-1 border-t border-border">
                        ৳{res.pricePerDay} / {lang === 'bn' ? 'দিন' : 'day'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Subtab 2: Test Price List */}
          {resourceTab === 'tests' && (
            <div className="space-y-3">
              <div className="max-w-sm">
                <Input
                  placeholder={lang === 'bn' ? 'টেস্টের নাম দিয়ে খুঁজুন...' : 'Search test name...'}
                  leftIcon={<Search className="w-4 h-4 text-text-3" />}
                  value={testSearch}
                  onChange={(e) => setTestSearch(e.target.value)}
                />
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-subtle text-xs text-text-3 font-medium border-b border-border">
                    <tr>
                      <th className="px-4 py-3">{lang === 'bn' ? 'টেস্টের নাম' : 'Test Name'}</th>
                      <th className="px-4 py-3">{lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                      <th className="px-4 py-3">{lang === 'bn' ? 'হাসপাতাল রেট' : 'Hospital Fee'}</th>
                      <th className="px-4 py-3">{lang === 'bn' ? 'সরকারি রেট' : 'Govt Cap'}</th>
                      <th className="px-4 py-3 text-right">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {testPrices && testPrices.length > 0 ? (
                      testPrices
                        .filter((t) => !testSearch || t.testName.toLowerCase().includes(testSearch.toLowerCase()))
                        .map((tp) => (
                          <tr key={tp.id} className="hover:bg-subtle/50 transition-colors h-[48px]">
                            <td className="px-4 py-2.5 font-medium text-ink">{tp.testName}</td>
                            <td className="px-4 py-2.5 text-xs text-text-3">{tp.category}</td>
                            <td className="px-4 py-2.5 font-semibold text-ink">৳{tp.price}</td>
                            <td className="px-4 py-2.5 text-xs text-text-3">
                              {tp.deliveryHours ? `${tp.deliveryHours}h` : '24h'}
                            </td>
                            <td className="px-4 py-2.5 text-right">
                              <Badge variant={tp.isActive ? 'success' : 'neutral'}>
                                {tp.isActive
                                  ? (lang === 'bn' ? 'উপলব্ধ' : 'Available')
                                  : (lang === 'bn' ? 'বন্ধ' : 'Unavailable')}
                              </Badge>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-xs text-text-3">
                          {lang === 'bn' ? 'কোন টেস্ট মূল্য পাওয়া যায়নি।' : 'No test pricing data available.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtab 3: Ambulance Fleet */}
          {resourceTab === 'ambulances' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {hospitalDetail.ambulances.map((amb) => (
                <div key={amb.id} className="p-3.5 rounded-lg border border-border bg-canvas space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="neutral">{amb.type}</Badge>
                    <Badge variant={amb.status === 'AVAILABLE' ? 'success' : 'warning'}>
                      {amb.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-ink">{amb.driverName}</div>
                    <div className="text-xs text-text-3 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" /> {amb.phone}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-3">
                    <span>{amb.plateNumber}</span>
                    <a href={`tel:${amb.phone}`}>
                      <Button variant="secondary" size="compact">
                        {lang === 'bn' ? 'কল করুন' : 'Call'}
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
