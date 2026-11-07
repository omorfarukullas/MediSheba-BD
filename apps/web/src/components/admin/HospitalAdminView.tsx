import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { Card, StatCard } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { 
  Building2, 
  Bed, 
  Activity, 
  Ambulance as AmbulanceIcon, 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export interface HospitalAdminViewProps {
  initialTab?: 'resources' | 'ambulances' | 'tests' | 'doctors';
}

export function HospitalAdminView({ initialTab = 'resources' }: HospitalAdminViewProps) {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();
  const [adminTab, setAdminTab] = useState<'resources' | 'ambulances' | 'tests' | 'doctors'>(initialTab);

  // Resource Edit state
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [editAvailable, setEditAvailable] = useState<number>(0);
  const [editTotal, setEditTotal] = useState<number>(0);

  // Add Resource modal state
  const [showAddResource, setShowAddResource] = useState(false);
  const [newResourceType, setNewResourceType] = useState<'ICU_BED' | 'CCU_BED' | 'GENERAL_BED' | 'CABIN' | 'OPERATION_THEATER'>('ICU_BED');
  const [newTotal, setNewTotal] = useState(10);
  const [newAvailable, setNewAvailable] = useState(5);
  const [newPrice, setNewPrice] = useState(5000);

  // Add Ambulance state
  const [showAddAmbulance, setShowAddAmbulance] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [ambulanceType, setAmbulanceType] = useState<'ICU' | 'AC' | 'NON_AC' | 'FREEZER'>('ICU');

  // Add Test Price state
  const [showAddTest, setShowAddTest] = useState(false);
  const [testName, setTestName] = useState('');
  const [testCategory, setTestCategory] = useState('Blood');
  const [testPrice, setTestPrice] = useState(500);
  const [deliveryHours, setDeliveryHours] = useState(24);

  // Fetch hospital admin dashboard
  const { data: hospital, isLoading, refetch } = trpc.hospital.getAdminDashboard.useQuery(undefined, {
    enabled: !!user
  });

  // Resource mutations
  const updateResourceMutation = trpc.hospital.upsertResource.useMutation({
    onSuccess: () => {
      setEditingResourceId(null);
      setShowAddResource(false);
      refetch();
    }
  });

  // Ambulance mutations
  const updateAmbulanceMutation = trpc.hospital.updateAmbulance.useMutation({
    onSuccess: () => refetch()
  });

  const addAmbulanceMutation = trpc.hospital.addAmbulance.useMutation({
    onSuccess: () => {
      setShowAddAmbulance(false);
      setDriverName('');
      setDriverPhone('');
      setPlateNumber('');
      refetch();
    }
  });

  // Test price mutations
  const createTestMutation = trpc.testPrice.create.useMutation({
    onSuccess: () => {
      setShowAddTest(false);
      setTestName('');
      refetch();
    }
  });

  const deleteTestMutation = trpc.testPrice.delete.useMutation({
    onSuccess: () => refetch()
  });

  const handleSaveResourceEdit = (res: any) => {
    updateResourceMutation.mutate({
      resourceId: res.id,
      type: res.type,
      totalCount: editTotal,
      availableCount: editAvailable,
      pricePerDay: res.pricePerDay
    });
  };

  const handleAddResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateResourceMutation.mutate({
      type: newResourceType,
      totalCount: newTotal,
      availableCount: newAvailable,
      pricePerDay: newPrice
    });
  };

  const handleAddAmbulanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName || !driverPhone || !plateNumber) return;

    addAmbulanceMutation.mutate({
      driverName,
      phone: driverPhone,
      plateNumber,
      type: ambulanceType
    });
  };

  const handleAddTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !hospital?.id) return;

    createTestMutation.mutate({
      hospitalId: hospital.id,
      testName,
      category: testCategory,
      price: testPrice,
      deliveryHours
    });
  };

  const totalBeds = hospital?.resources.reduce((acc, r) => acc + r.totalCount, 0) || 0;
  const availableBeds = hospital?.resources.reduce((acc, r) => acc + r.availableCount, 0) || 0;
  const readyAmbulances = hospital?.ambulances.filter((a) => a.status === 'AVAILABLE').length || 0;
  const activeDoctors = hospital?.doctors.length || 0;

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {hospital?.name || (lang === 'bn' ? 'হাসপাতাল প্রশাসন ড্যাশবোর্ড' : 'Hospital Admin Desk')}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn'
              ? 'আইসিইউ বেড ক্যাপাসিটি, অ্যাম্বুলেন্স বহর এবং ডায়াগনস্টিক টেস্ট রেট তদারকি।'
              : 'Live bed occupancy, emergency ambulance fleets, and diagnostic test transparency.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {adminTab === 'resources' && (
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowAddResource(true)}
            >
              {lang === 'bn' ? '+ নতুন বেড ক্যাটাগরি' : '+ Add Bed Category'}
            </Button>
          )}
          {adminTab === 'ambulances' && (
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowAddAmbulance(true)}
            >
              {lang === 'bn' ? '+ নতুন অ্যাম্বুলেন্স' : '+ Add Ambulance'}
            </Button>
          )}
          {adminTab === 'tests' && (
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowAddTest(true)}
            >
              {lang === 'bn' ? '+ নতুন টেস্ট রেট' : '+ Add Diagnostic Test'}
            </Button>
          )}
        </div>
      </div>

      {/* ─── 4 Identical Stat Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={lang === 'bn' ? 'মোট নিবন্ধিত বেড' : 'Total Bed Capacity'}
          value={String(totalBeds)}
          caption={lang === 'bn' ? 'সকল ওয়ার্ড' : 'All Wards & Cabins'}
        />
        <StatCard
          label={lang === 'bn' ? 'খালি প্রস্তুত বেড' : 'Available Beds'}
          value={String(availableBeds)}
          caption={lang === 'bn' ? 'লাইভ খালি' : 'Ready for Admission'}
        />
        <StatCard
          label={lang === 'bn' ? 'প্রস্তুত অ্যাম্বুলেন্স' : 'Ready Ambulances'}
          value={String(readyAmbulances)}
          caption={lang === 'bn' ? 'অন-ডিউটি' : 'On-Duty Fleet'}
        />
        <StatCard
          label={lang === 'bn' ? 'সংযুক্ত চিকিৎসক' : 'Physicians Roster'}
          value={String(activeDoctors)}
          caption={lang === 'bn' ? 'বিএমডিসি অনুমোদিত' : 'BMDC Verified'}
        />
      </div>

      {/* ─── Page Tabs (Underline Style) ─── */}
      <div className="flex items-center gap-6 border-b border-border">
        <button
          onClick={() => setAdminTab('resources')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
            adminTab === 'resources'
              ? 'border-accent text-ink font-semibold'
              : 'border-transparent text-text-3 hover:text-ink'
          }`}
        >
          {lang === 'bn' ? 'বেড ও আইসিইউ' : 'Beds & ICU'}
        </button>
        <button
          onClick={() => setAdminTab('ambulances')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
            adminTab === 'ambulances'
              ? 'border-accent text-ink font-semibold'
              : 'border-transparent text-text-3 hover:text-ink'
          }`}
        >
          {lang === 'bn' ? 'অ্যাম্বুলেন্স বহর' : 'Ambulance Fleet'}
        </button>
        <button
          onClick={() => setAdminTab('tests')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
            adminTab === 'tests'
              ? 'border-accent text-ink font-semibold'
              : 'border-transparent text-text-3 hover:text-ink'
          }`}
        >
          {lang === 'bn' ? 'ডায়াগনস্টিক টেস্ট' : 'Diagnostic Tests'}
        </button>
        <button
          onClick={() => setAdminTab('doctors')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
            adminTab === 'doctors'
              ? 'border-accent text-ink font-semibold'
              : 'border-transparent text-text-3 hover:text-ink'
          }`}
        >
          {lang === 'bn' ? 'চিকিৎসক তালিকা' : 'Doctor Roster'}
        </button>
      </div>

      {/* ─── TAB 1: Resources (Beds & ICU) ─── */}
      {adminTab === 'resources' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hospital?.resources.map((res) => {
            const isEditing = editingResourceId === res.id;
            return (
              <Card key={res.id} padding="md" className="space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-ink">{res.type.replace('_', ' ')}</span>
                    <Badge variant={res.availableCount > 0 ? 'success' : 'danger'}>
                      {res.availableCount > 0 ? (lang === 'bn' ? 'খালি' : 'Available') : (lang === 'bn' ? 'পূর্ণ' : 'Full')}
                    </Badge>
                  </div>

                  {isEditing ? (
                    <div className="mt-3 space-y-2 p-2.5 rounded-lg bg-subtle border border-border">
                      <Input
                        label={lang === 'bn' ? 'বর্তমান খালি:' : 'Available:'}
                        type="number"
                        value={String(editAvailable)}
                        onChange={(e) => setEditAvailable(Number(e.target.value))}
                      />
                      <Input
                        label={lang === 'bn' ? 'মোট বেড:' : 'Total:'}
                        type="number"
                        value={String(editTotal)}
                        onChange={(e) => setEditTotal(Number(e.target.value))}
                      />
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="primary"
                          size="compact"
                          className="flex-1"
                          onClick={() => handleSaveResourceEdit(res)}
                        >
                          {lang === 'bn' ? 'সেভ' : 'Save'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="compact"
                          onClick={() => setEditingResourceId(null)}
                        >
                          {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <div className="text-3xl font-semibold text-ink">
                        {res.availableCount}{' '}
                        <span className="text-xs font-normal text-text-3">/ {res.totalCount} {lang === 'bn' ? 'মোট' : 'total'}</span>
                      </div>
                      {res.pricePerDay && (
                        <div className="text-xs text-text-3 mt-1">
                          ৳{res.pricePerDay} / {lang === 'bn' ? 'দিন' : 'day'}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {!isEditing && (
                  <div className="pt-2 border-t border-border">
                    <Button
                      variant="secondary"
                      size="compact"
                      className="w-full"
                      leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                      onClick={() => {
                        setEditingResourceId(res.id);
                        setEditAvailable(res.availableCount);
                        setEditTotal(res.totalCount);
                      }}
                    >
                      {lang === 'bn' ? 'সংখ্যা পরিবর্তন' : 'Update Count'}
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* ─── TAB 2: Ambulance Fleet ─── */}
      {adminTab === 'ambulances' && (
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 border-b border-border bg-subtle">
            <h2 className="text-sm font-semibold text-ink">
              {lang === 'bn' ? 'অ্যাম্বুলেন্স বহর ও চালক তালিকা' : 'Registered Ambulances & Drivers'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-xs text-text-3 font-medium border-b border-border">
                <tr>
                  <th className="px-5 py-3">{lang === 'bn' ? 'লাইসেন্স প্লেট' : 'Plate / Reg'}</th>
                  <th className="px-5 py-3">{lang === 'bn' ? 'ধরন' : 'Type'}</th>
                  <th className="px-5 py-3">{lang === 'bn' ? 'চালক ও ফোন' : 'Driver & Contact'}</th>
                  <th className="px-5 py-3">{lang === 'bn' ? 'অবস্থা' : 'Status'}</th>
                  <th className="px-5 py-3 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {hospital?.ambulances.map((amb) => (
                  <tr key={amb.id} className="hover:bg-subtle/50 transition-colors h-[52px]">
                    <td className="px-5 py-3 font-mono font-medium text-ink">{amb.plateNumber}</td>
                    <td className="px-5 py-3">
                      <Badge variant="neutral">{amb.type}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-ink">{amb.driverName}</div>
                      <div className="text-xs text-text-3">{amb.phone}</div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={amb.status === 'AVAILABLE' ? 'success' : 'warning'}>
                        {amb.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        variant="secondary"
                        size="compact"
                        onClick={() => {
                          const nextStatus = amb.status === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE';
                          updateAmbulanceMutation.mutate({ ambulanceId: amb.id, status: nextStatus });
                        }}
                      >
                        {amb.status === 'AVAILABLE' ? (lang === 'bn' ? 'ব্যস্ত করুন' : 'Set Busy') : (lang === 'bn' ? 'প্রস্তুত করুন' : 'Set Available')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ─── TAB 3: Diagnostic Tests ─── */}
      {adminTab === 'tests' && (
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 border-b border-border bg-subtle">
            <h2 className="text-sm font-semibold text-ink">
              {lang === 'bn' ? 'ডায়াগনস্টিক পরীক্ষার তালিকা ও ফি' : 'Diagnostic Catalog & Prices'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-xs text-text-3 font-medium border-b border-border">
                <tr>
                  <th className="px-5 py-3">{lang === 'bn' ? 'টেস্টের নাম' : 'Test Name'}</th>
                  <th className="px-5 py-3">{lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                  <th className="px-5 py-3">{lang === 'bn' ? 'ডেলিভারি সময়' : 'Turnaround'}</th>
                  <th className="px-5 py-3">{lang === 'bn' ? 'হাসপাতাল ফি' : 'Hospital Fee'}</th>
                  <th className="px-5 py-3 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {hospital?.testPrices.map((test) => (
                  <tr key={test.id} className="hover:bg-subtle/50 transition-colors h-[52px]">
                    <td className="px-5 py-3 font-medium text-ink">{test.testName}</td>
                    <td className="px-5 py-3 text-xs text-text-3">{test.category}</td>
                    <td className="px-5 py-3 text-xs text-text-2">{test.deliveryHours || 24} Hours</td>
                    <td className="px-5 py-3 font-semibold text-ink">৳{test.price.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm(lang === 'bn' ? 'এই টেস্টটি মুছে ফেলবেন?' : 'Delete this test?')) {
                            deleteTestMutation.mutate({ id: test.id });
                          }
                        }}
                        className="p-1.5 rounded-lg border border-border text-text-3 hover:text-danger-text hover:border-danger-border transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ─── TAB 4: Doctor Roster ─── */}
      {adminTab === 'doctors' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hospital?.doctors.map((doc) => (
            <Card key={doc.id} padding="md" className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="neutral">BMDC {doc.bmdcNumber}</Badge>
                <Badge variant="success">{doc.status}</Badge>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-ink">{doc.user.fullName}</h4>
                <p className="text-xs text-text-3 mt-0.5">{doc.specialization} · {doc.experienceYears} Years Exp</p>
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-3">
                <span>{lang === 'bn' ? 'পরামর্শ ফি' : 'Fee'}</span>
                <span className="font-semibold text-ink">৳{doc.consultationFeePhysical}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ─── Modal: Add Resource ─── */}
      {showAddResource && (
        <Modal
          isOpen={true}
          onClose={() => setShowAddResource(false)}
          title={lang === 'bn' ? 'নতুন বেড / ওয়ার্ড যুক্ত করুন' : 'Add Bed Category'}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddResourceSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-3 mb-1">
                {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
              </label>
              <select
                value={newResourceType}
                onChange={(e: any) => setNewResourceType(e.target.value)}
                className="w-full h-10 px-3 text-sm font-medium border border-border rounded-lg bg-canvas text-ink focus:outline-none focus:border-accent"
              >
                <option value="ICU_BED">ICU Bed</option>
                <option value="CCU_BED">CCU Bed</option>
                <option value="GENERAL_BED">General Ward</option>
                <option value="CABIN">Cabin</option>
                <option value="OPERATION_THEATER">Operation Theater</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label={lang === 'bn' ? 'মোট সংখ্যা' : 'Total Count'}
                type="number"
                value={String(newTotal)}
                onChange={(e) => setNewTotal(Number(e.target.value))}
              />
              <Input
                label={lang === 'bn' ? 'খালি সংখ্যা' : 'Available Count'}
                type="number"
                value={String(newAvailable)}
                onChange={(e) => setNewAvailable(Number(e.target.value))}
              />
            </div>

            <Input
              label={lang === 'bn' ? 'প্রতিদিনের ভাড়া (BDT ৳)' : 'Cost Per Day (৳)'}
              type="number"
              value={String(newPrice)}
              onChange={(e) => setNewPrice(Number(e.target.value))}
            />

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <Button variant="ghost" size="compact" onClick={() => setShowAddResource(false)}>
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </Button>
              <Button variant="primary" size="compact" type="submit">
                {lang === 'bn' ? 'যোগ করুন' : 'Add Category'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ─── Modal: Add Ambulance ─── */}
      {showAddAmbulance && (
        <Modal
          isOpen={true}
          onClose={() => setShowAddAmbulance(false)}
          title={lang === 'bn' ? 'নতুন অ্যাম্বুলেন্স নিবন্ধন' : 'Add Ambulance'}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddAmbulanceSubmit} className="space-y-4">
            <Input
              label={lang === 'bn' ? 'রেজিস্ট্রেশন প্লেট নম্বর *' : 'Plate / Reg Number *'}
              required
              placeholder="DHAKA-METRO-CHA-11-2233"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />

            <Input
              label={lang === 'bn' ? 'চালকের নাম *' : 'Driver Name *'}
              required
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
            />

            <Input
              label={lang === 'bn' ? 'চালকের ফোন নম্বর *' : 'Driver Contact Phone *'}
              required
              placeholder="01XXXXXXXXX"
              value={driverPhone}
              onChange={(e) => setDriverPhone(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-3 mb-1">
                {lang === 'bn' ? 'অ্যাম্বুলেন্স ধরন' : 'Ambulance Type'}
              </label>
              <select
                value={ambulanceType}
                onChange={(e: any) => setAmbulanceType(e.target.value)}
                className="w-full h-10 px-3 text-sm font-medium border border-border rounded-lg bg-canvas text-ink focus:outline-none focus:border-accent"
              >
                <option value="ICU">ICU Ambulance</option>
                <option value="AC">AC Ambulance</option>
                <option value="NON_AC">Non-AC Ambulance</option>
                <option value="FREEZER">Freezer Ambulance</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <Button variant="ghost" size="compact" onClick={() => setShowAddAmbulance(false)}>
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </Button>
              <Button variant="primary" size="compact" type="submit">
                {lang === 'bn' ? 'যোগ করুন' : 'Save Ambulance'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ─── Modal: Add Test ─── */}
      {showAddTest && (
        <Modal
          isOpen={true}
          onClose={() => setShowAddTest(false)}
          title={lang === 'bn' ? 'নতুন টেস্ট যোগ করুন' : 'Add Diagnostic Test'}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddTestSubmit} className="space-y-4">
            <Input
              label={lang === 'bn' ? 'টেস্টের নাম *' : 'Test Name *'}
              required
              placeholder="e.g. CBC Complete Blood Count"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label={lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                value={testCategory}
                onChange={(e) => setTestCategory(e.target.value)}
              />
              <Input
                label={lang === 'bn' ? 'ডেলিভারি (ঘণ্টা)' : 'Hours'}
                type="number"
                value={String(deliveryHours)}
                onChange={(e) => setDeliveryHours(Number(e.target.value))}
              />
            </div>

            <Input
              label={lang === 'bn' ? 'হাসপাতাল ফি (BDT ৳) *' : 'Official Hospital Fee (৳) *'}
              type="number"
              required
              value={String(testPrice)}
              onChange={(e) => setTestPrice(Number(e.target.value))}
            />

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <Button variant="ghost" size="compact" onClick={() => setShowAddTest(false)}>
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </Button>
              <Button variant="primary" size="compact" type="submit">
                {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Add Test'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
