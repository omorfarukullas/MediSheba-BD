import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { 
  Building2, 
  Bed, 
  Activity, 
  Ambulance as AmbulanceIcon, 
  FileText, 
  UserCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Clock, 
  Phone, 
  Save, 
  RefreshCw 
} from 'lucide-react';

export function HospitalAdminView() {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();
  const [adminTab, setAdminTab] = useState<'resources' | 'ambulances' | 'tests' | 'doctors'>('resources');

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

  const updateTestMutation = trpc.testPrice.update.useMutation({
    onSuccess: () => refetch()
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
    if (!testName || !testPrice || !hospital?.id) return;

    createTestMutation.mutate({
      hospitalId: hospital.id,
      testName,
      category: testCategory,
      price: testPrice,
      deliveryHours
    });
  };

  if (isLoading) {
    return (
      <div className="p-16 text-center text-ink-secondary">
        <Building2 className="w-10 h-10 animate-pulse mx-auto mb-2 text-accent" />
        {lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড লোড হচ্ছে...' : 'Loading hospital management console...'}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            {lang === 'bn' ? 'হাসপাতাল প্রশাসন পোর্টাল' : 'Hospital Management Suite'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
            {hospital?.name || (lang === 'bn' ? 'হাসপাতাল প্রশাসন' : 'Hospital Administration')}
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            {lang === 'bn'
              ? 'বেড ও আইসিইউ প্রাপ্যতা, অ্যাম্বুলেন্স বহর এবং ডায়াগনস্টিক পরীক্ষার মূল্য তালিকা আপডেট করুন।'
              : 'Live manage beds/ICU/CCU capacity, fleet dispatch, test price catalogs, and affiliated doctors.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-ground-muted p-1 rounded-2xl border border-rule text-xs font-semibold">
          <button
            onClick={() => setAdminTab('resources')}
            className={`px-3.5 py-2 rounded-xl transition ${
              adminTab === 'resources' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            {lang === 'bn' ? 'বেড ও আইসিইউ' : 'Beds & ICU'}
          </button>
          <button
            onClick={() => setAdminTab('ambulances')}
            className={`px-3.5 py-2 rounded-xl transition ${
              adminTab === 'ambulances' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            {lang === 'bn' ? 'অ্যাম্বুলেন্স বহর' : 'Ambulances'}
          </button>
          <button
            onClick={() => setAdminTab('tests')}
            className={`px-3.5 py-2 rounded-xl transition ${
              adminTab === 'tests' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            {lang === 'bn' ? 'টেস্টের মূল্য তালিকা' : 'Test Price List'}
          </button>
          <button
            onClick={() => setAdminTab('doctors')}
            className={`px-3.5 py-2 rounded-xl transition ${
              adminTab === 'doctors' ? 'bg-accent text-on-accent shadow-xs' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            {lang === 'bn' ? 'ডাক্তার তালিকা' : 'Doctor Roster'}
          </button>
        </div>
      </div>

      {/* TAB 1: Resource Management (Bed, ICU, CCU, Cabin, Ward) */}
      {adminTab === 'resources' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-ink">
              {lang === 'bn' ? 'রিসোর্স ও বেডের প্রাপ্যতা আপডেট' : 'Live Bed & ICU Availability Controls'}
            </h2>
            <button
              onClick={() => setShowAddResource(true)}
              className="inline-flex items-center gap-1.5 bg-accent text-on-accent font-bold px-3.5 py-2 rounded-xl text-xs hover:opacity-90 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন বেড/ওয়ার্ড যোগ করুন' : 'Add Resource Category'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hospital?.resources.map((res) => {
              const isEditing = editingResourceId === res.id;
              return (
                <div key={res.id} className="bg-panel border border-rule rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-ink">{res.type.replace('_', ' ')}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      res.availableCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {res.availableCount > 0 ? (lang === 'bn' ? 'খালি আছে' : 'Available') : (lang === 'bn' ? 'পূর্ণ' : 'Full')}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3 bg-ground p-3 rounded-xl border border-accent">
                      <div>
                        <label className="text-[11px] font-semibold text-ink-secondary">{lang === 'bn' ? 'বর্তমান খালি:' : 'Available:'}</label>
                        <input
                          type="number"
                          value={editAvailable}
                          onChange={(e) => setEditAvailable(Number(e.target.value))}
                          className="w-full text-xs font-bold border border-rule rounded-lg px-2 py-1 bg-panel text-ink"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-ink-secondary">{lang === 'bn' ? 'মোট ক্যাপাসিটি:' : 'Total Capacity:'}</label>
                        <input
                          type="number"
                          value={editTotal}
                          onChange={(e) => setEditTotal(Number(e.target.value))}
                          className="w-full text-xs font-bold border border-rule rounded-lg px-2 py-1 bg-panel text-ink"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleSaveResourceEdit(res)}
                          className="flex-1 bg-emerald-600 text-white font-bold py-1.5 rounded-lg text-xs"
                        >
                          {lang === 'bn' ? 'সংরক্ষণ' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingResourceId(null)}
                          className="px-3 bg-ground-muted text-ink py-1.5 rounded-lg text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-black text-ink">{res.availableCount}</span>
                        <span className="text-xs text-ink-secondary">{lang === 'bn' ? 'মোট:' : 'Total:'} {res.totalCount}</span>
                      </div>
                      <div className="text-[11px] text-ink-secondary flex justify-between border-t border-rule/50 pt-2">
                        <span>{lang === 'bn' ? 'দৈনিক ভাড়া:' : 'Daily Rate:'}</span>
                        <span className="font-bold text-ink">৳ {res.pricePerDay || 0}</span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingResourceId(res.id);
                          setEditAvailable(res.availableCount);
                          setEditTotal(res.totalCount);
                        }}
                        className="w-full mt-2 text-xs font-bold text-accent py-1.5 rounded-xl border border-rule hover:bg-ground transition"
                      >
                        {lang === 'bn' ? 'সংখ্যা পরিবর্তন করুন' : 'Edit Counts'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Ambulance Fleet Management */}
      {adminTab === 'ambulances' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-ink">
              {lang === 'bn' ? 'হাসপাতালের অ্যাম্বুলেন্স বহর নিয়ন্ত্রণ' : 'Ambulance Fleet Status & Drivers'}
            </h2>
            <button
              onClick={() => setShowAddAmbulance(true)}
              className="inline-flex items-center gap-1.5 bg-accent text-on-accent font-bold px-3.5 py-2 rounded-xl text-xs hover:opacity-90 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন অ্যাম্বুলেন্স যোগ করুন' : 'Register Ambulance'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hospital?.ambulances.map((amb) => (
              <div key={amb.id} className="bg-panel border border-rule rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-accent">{amb.type} AMBULANCE</span>
                  <select
                    value={amb.status}
                    onChange={(e) => updateAmbulanceMutation.mutate({
                      ambulanceId: amb.id,
                      status: e.target.value as any
                    })}
                    className="text-[11px] font-bold px-2 py-1 rounded-lg border border-rule bg-ground text-ink"
                  >
                    <option value="AVAILABLE">AVAILABLE (প্রস্তুত)</option>
                    <option value="BUSY">BUSY (ব্যস্ত)</option>
                    <option value="ON_THE_WAY">ON THE WAY (অন দ্য ওয়ে)</option>
                    <option value="MAINTENANCE">MAINTENANCE (মেরামত)</option>
                  </select>
                </div>

                <div className="font-bold text-base text-ink">{amb.plateNumber}</div>
                <div className="text-xs text-ink-secondary">
                  <div>{lang === 'bn' ? 'ড্রাইভার' : 'Driver'}: <strong className="text-ink">{amb.driverName}</strong></div>
                  <div>{lang === 'bn' ? 'ফোন' : 'Phone'}: <strong className="text-ink">{amb.phone}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Diagnostic Test Price List */}
      {adminTab === 'tests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-ink">
              {lang === 'bn' ? 'ডায়াগনস্টিক টেস্টের মূল্য তালিকা নির্ধারণ' : 'Diagnostic Lab Test Catalog & Pricing'}
            </h2>
            <button
              onClick={() => setShowAddTest(true)}
              className="inline-flex items-center gap-1.5 bg-accent text-on-accent font-bold px-3.5 py-2 rounded-xl text-xs hover:opacity-90 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন টেস্ট যোগ করুন' : 'Add New Test'}</span>
            </button>
          </div>

          {hospital?.testPrices && hospital.testPrices.length > 0 ? (
            <div className="overflow-x-auto border border-rule rounded-2xl bg-panel">
              <table className="w-full text-left text-xs text-ink">
                <thead className="bg-ground-muted text-ink-secondary font-bold uppercase tracking-wider border-b border-rule">
                  <tr>
                    <th className="py-3 px-4">{lang === 'bn' ? 'টেস্টের নাম' : 'Test Name'}</th>
                    <th className="py-3 px-4">{lang === 'bn' ? 'বিভাগ' : 'Category'}</th>
                    <th className="py-3 px-4">{lang === 'bn' ? 'ডেলিভারি সময়' : 'Delivery Hours'}</th>
                    <th className="py-3 px-4">{lang === 'bn' ? 'নির্ধারিত মূল্য' : 'Official Price (BDT)'}</th>
                    <th className="py-3 px-4 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {hospital.testPrices.map((test) => (
                    <tr key={test.id} className="hover:bg-ground/50 transition">
                      <td className="py-3 px-4 font-semibold text-ink">{test.testName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent font-medium">
                          {test.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-ink-secondary">{test.deliveryHours || 24} Hours</td>
                      <td className="py-3 px-4 font-black text-sm text-accent">৳ {test.price.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(lang === 'bn' ? 'এই টেস্টটি মুছে ফেলবেন?' : 'Delete this test?')) {
                              deleteTestMutation.mutate({ id: test.id });
                            }
                          }}
                          className="p-1.5 rounded-lg border border-rule hover:border-rose-400 text-ink-secondary hover:text-rose-600 transition"
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
          ) : (
            <div className="p-16 text-center bg-panel border border-rule rounded-2xl text-ink-secondary">
              <FileText className="w-10 h-10 mx-auto mb-2 text-ink-secondary/40" />
              <p>{lang === 'bn' ? 'কোন টেস্ট মূল্য তালিকা এন্ট্রি করা নেই।' : 'No test prices added yet.'}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Doctor Roster */}
      {adminTab === 'doctors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-ink">
              {lang === 'bn' ? 'হাসপাতালের অনুমোদিত ডাক্তার তালিকা' : 'Affiliated Physician Directory'}
            </h2>
            <span className="text-xs font-semibold text-accent">
              {hospital?.doctors.length || 0} {lang === 'bn' ? 'জন চিকিৎসক' : 'Physicians'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hospital?.doctors.map((doc) => (
              <div key={doc.id} className="bg-panel border border-rule rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    BMDC: {doc.bmdcNumber}
                  </span>
                  <span className="text-xs font-bold text-accent">{doc.status}</span>
                </div>
                <h4 className="font-bold text-base text-ink">{doc.user.fullName}</h4>
                <p className="text-xs text-ink-secondary">{doc.specialization} • {doc.experienceYears} Years Exp</p>
                <div className="text-xs text-ink-secondary border-t border-rule/50 pt-2 flex justify-between">
                  <span>{lang === 'bn' ? 'ফি:' : 'Fee:'}</span>
                  <strong className="text-ink">৳ {doc.consultationFeePhysical} (Physical)</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Test Modal */}
      {showAddTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-field/80 backdrop-blur-sm px-4">
          <div className="bg-panel border border-rule rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-ink">{lang === 'bn' ? 'নতুন টেস্ট যোগ করুন' : 'Add Diagnostic Test'}</h3>
              <button onClick={() => setShowAddTest(false)} className="text-ink-secondary hover:text-ink font-bold">✕</button>
            </div>
            <form onSubmit={handleAddTestSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-ink-secondary">{lang === 'bn' ? 'টেস্টের নাম *' : 'Test Name *'}</label>
                <input
                  type="text"
                  required
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g. CBC, Serum Creatinine, MRI Brain"
                  className="w-full text-xs border border-rule rounded-xl px-3 py-2 bg-ground text-ink"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-secondary">{lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}</label>
                  <select
                    value={testCategory}
                    onChange={(e) => setTestCategory(e.target.value)}
                    className="w-full text-xs border border-rule rounded-xl px-3 py-2 bg-ground text-ink"
                  >
                    <option value="Blood">Blood (রক্ত পরীক্ষা)</option>
                    <option value="Urine">Urine (প্রস্রাব পরীক্ষা)</option>
                    <option value="Radiology">Radiology (এক্স-রে / এমআরআই)</option>
                    <option value="Cardiology">Cardiology (ইসিজি / ইকো)</option>
                    <option value="Pathology">Pathology (বায়োপসি)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink-secondary">{lang === 'bn' ? 'মূল্য (BDT) *' : 'Price (BDT) *'}</label>
                  <input
                    type="number"
                    required
                    value={testPrice}
                    onChange={(e) => setTestPrice(Number(e.target.value))}
                    className="w-full text-xs border border-rule rounded-xl px-3 py-2 bg-ground text-ink"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddTest(false)} className="px-4 py-2 text-xs border border-rule rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold bg-accent text-on-accent rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Ambulance Modal */}
      {showAddAmbulance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-field/80 backdrop-blur-sm px-4">
          <div className="bg-panel border border-rule rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-ink">{lang === 'bn' ? 'নতুন অ্যাম্বুলেন্স নিবন্ধন' : 'Register Ambulance'}</h3>
              <button onClick={() => setShowAddAmbulance(false)} className="text-ink-secondary hover:text-ink font-bold">✕</button>
            </div>
            <form onSubmit={handleAddAmbulanceSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-ink-secondary">{lang === 'bn' ? 'ড্রাইভারের নাম *' : 'Driver Name *'}</label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full text-xs border border-rule rounded-xl px-3 py-2 bg-ground text-ink"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-secondary">{lang === 'bn' ? 'ড্রাইভারের ফোন নম্বর *' : 'Phone Number *'}</label>
                <input
                  type="tel"
                  required
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full text-xs border border-rule rounded-xl px-3 py-2 bg-ground text-ink"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-secondary">{lang === 'bn' ? 'গাড়ির নাম্বার প্লেট *' : 'Plate Number *'}</label>
                  <input
                    type="text"
                    required
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    placeholder="Dhaka Metro-Ch..."
                    className="w-full text-xs border border-rule rounded-xl px-3 py-2 bg-ground text-ink"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink-secondary">{lang === 'bn' ? 'অ্যাম্বুলেন্স ধরন' : 'Type'}</label>
                  <select
                    value={ambulanceType}
                    onChange={(e) => setAmbulanceType(e.target.value as any)}
                    className="w-full text-xs border border-rule rounded-xl px-3 py-2 bg-ground text-ink"
                  >
                    <option value="ICU">ICU</option>
                    <option value="AC">AC</option>
                    <option value="NON_AC">Non-AC</option>
                    <option value="FREEZER">Freezer</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddAmbulance(false)} className="px-4 py-2 text-xs border border-rule rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold bg-accent text-on-accent rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

