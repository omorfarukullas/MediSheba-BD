import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { 
  FolderLock, 
  Upload, 
  FileText, 
  Lock, 
  Unlock, 
  Eye, 
  Trash2, 
  ShieldCheck, 
  Plus, 
  Check, 
  Share2, 
  ExternalLink 
} from 'lucide-react';

export function PatientDocumentsView() {
  const { lang } = useLanguageStore();
  const { user } = useAuthStore();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('PRESCRIPTION');
  const [visibilityMode, setVisibilityMode] = useState<'ONLY_ME' | 'DOCTOR_ACCESS' | 'PUBLIC'>('DOCTOR_ACCESS');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const { data: documents, isLoading, refetch } = trpc.document.listMyDocuments.useQuery(undefined, {
    enabled: !!user
  });

  const createMutation = trpc.document.create.useMutation({
    onSuccess: () => {
      setShowUploadModal(false);
      setTitle('');
      setFileUrl('');
      refetch();
    }
  });

  const updateVisibilityMutation = trpc.document.updateVisibility.useMutation({
    onSuccess: () => refetch()
  });

  const deleteMutation = trpc.document.delete.useMutation({
    onSuccess: () => refetch()
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !fileUrl) return;

    createMutation.mutate({
      title,
      fileUrl,
      fileType,
      visibilityMode,
      sharedDoctorIds: []
    });
  };

  const handleToggleVisibility = (docId: string, currentMode: string) => {
    const newMode = currentMode === 'ONLY_ME' ? 'DOCTOR_ACCESS' : 'ONLY_ME';
    updateVisibilityMutation.mutate({
      documentId: docId,
      visibilityMode: newMode,
      sharedDoctorIds: []
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
            <FolderLock className="w-4 h-4" />
            {lang === 'bn' ? 'রোগীর ডিজিটাল প্রেসক্রিপশন ও রিপোর্ট ভল্ট' : 'Digital Prescription & Report Vault'}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
            {lang === 'bn' ? 'পূর্ববর্তী প্রেসক্রিপশন ও স্বাস্থ্য রেকর্ড' : 'My Prescriptions & Medical Reports'}
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            {lang === 'bn'
              ? 'পরবর্তী অ্যাপয়েন্টমেন্টের জন্য আপনার রিপোর্ট সংরক্ষণ করুন এবং ডাক্তার দেখতে পারবেন কি না তা সম্পূর্ণ আপনার নিয়ন্ত্রণে রাখুন।'
              : 'Store previous medical records for future appointments with full privacy controls (Only Me vs Doctor Access).'}
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-on-accent font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'bn' ? 'নতুন রিপোর্ট / প্রেসক্রিপশন যোগ করুন' : 'Upload Medical Record'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-rule pb-3 text-xs font-semibold">
        {(['ALL', 'PRESCRIPTION', 'LAB_REPORT', 'DISCHARGE_SUMMARY', 'SCAN'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg transition ${
              categoryFilter === cat 
                ? 'bg-accent text-on-accent' 
                : 'text-ink-secondary hover:text-ink hover:bg-ground-muted'
            }`}
          >
            {cat === 'ALL' ? (lang === 'bn' ? 'সব রেকর্ড' : 'All Records') : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Document Grid */}
      {isLoading ? (
        <div className="p-16 text-center text-ink-secondary">
          <FileText className="w-10 h-10 animate-pulse mx-auto mb-2 text-accent" />
          {lang === 'bn' ? 'প্রেসক্রিপশন ও রিপোর্ট লোড হচ্ছে...' : 'Loading records...'}
        </div>
      ) : documents && documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents
            .filter((d) => categoryFilter === 'ALL' || d.fileType === categoryFilter)
            .map((doc) => {
              const isOnlyMe = doc.visibilityMode === 'ONLY_ME';
              return (
                <div
                  key={doc.id}
                  className="bg-panel border border-rule rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent uppercase">
                        {doc.fileType.replace('_', ' ')}
                      </span>

                      {/* Privacy Badge Toggle */}
                      <button
                        onClick={() => handleToggleVisibility(doc.id, doc.visibilityMode)}
                        title={lang === 'bn' ? 'ক্লিক করে প্রাইভেসি পরিবর্তন করুন' : 'Click to toggle visibility'}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition shadow-xs ${
                          isOnlyMe
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200'
                        }`}
                      >
                        {isOnlyMe ? (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'শুধুমাত্র আমি (Only Me)' : 'Only Me'}</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'ডাক্তার দেখতে পারবেন' : 'Doctor Can Access'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h3 className="font-bold text-base text-ink line-clamp-1">{doc.title}</h3>
                    <p className="text-xs text-ink-secondary mt-1">
                      {lang === 'bn' ? 'সংযুক্ত তারিখ:' : 'Uploaded:'} {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-rule flex items-center justify-between gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-ground-muted hover:bg-ground border border-rule font-semibold text-xs py-2 px-3 rounded-xl text-ink transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'ফাইল দেখুন' : 'View File'}</span>
                    </a>

                    <button
                      onClick={() => handleToggleVisibility(doc.id, doc.visibilityMode)}
                      className="p-2 rounded-xl border border-rule hover:border-accent text-ink-secondary hover:text-accent transition"
                      title={lang === 'bn' ? 'প্রাইভেসি পরিবর্তন' : 'Change Visibility'}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(lang === 'bn' ? 'এই ডকুমেন্টটি মুছে ফেলবেন?' : 'Delete this record?')) {
                          deleteMutation.mutate({ documentId: doc.id });
                        }
                      }}
                      className="p-2 rounded-xl border border-rule hover:border-rose-400 text-ink-secondary hover:text-rose-600 transition"
                      title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="p-16 text-center bg-panel border border-rule rounded-2xl text-ink-secondary space-y-3">
          <FileText className="w-12 h-12 mx-auto text-ink-secondary/40" />
          <h3 className="font-bold text-base text-ink">
            {lang === 'bn' ? 'কোন প্রেসক্রিপশন বা রিপোর্ট আপলোড করা নেই' : 'No records uploaded yet'}
          </h3>
          <p className="text-xs max-w-sm mx-auto">
            {lang === 'bn'
              ? 'আপনার পূর্বের প্রেসক্রিপশন, রক্ত পরীক্ষার রিপোর্ট বা এক্স-রে সংরক্ষণ করে রাখুন।'
              : 'Keep your past prescriptions, lab tests, and scans safely organized.'}
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 bg-accent text-on-accent font-bold px-4 py-2 rounded-xl text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'bn' ? 'প্রথম ফাইল যোগ করুন' : 'Add First File'}</span>
          </button>
        </div>
      )}

      {/* Upload Record Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-field/80 backdrop-blur-sm px-4">
          <div className="bg-panel border border-rule rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-ink">
                {lang === 'bn' ? 'প্রেসক্রিপশন / রিপোর্ট সংরক্ষণ' : 'Upload Medical Record'}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-ink-secondary hover:text-ink text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-secondary mb-1">
                  {lang === 'bn' ? 'ডকুমেন্টের শিরোনাম *' : 'Document Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: সিবিসি ও লিপিড প্রোফাইল রিপোর্ট' : 'e.g. CBC & Blood Sugar Report'}
                  className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary mb-1">
                  {lang === 'bn' ? 'ক্যাটাগরি / ধরন' : 'Document Type'}
                </label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-accent"
                >
                  <option value="PRESCRIPTION">{lang === 'bn' ? 'প্রেসক্রিপশন' : 'Prescription'}</option>
                  <option value="LAB_REPORT">{lang === 'bn' ? 'ল্যাব টেস্ট রিপোর্ট' : 'Lab Test Report'}</option>
                  <option value="DISCHARGE_SUMMARY">{lang === 'bn' ? 'হাসপাতাল ছাড়পত্র' : 'Discharge Summary'}</option>
                  <option value="SCAN">{lang === 'bn' ? 'এক্স-রে / এমআরআই স্ক্যান' : 'X-Ray / MRI Scan'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary mb-1">
                  {lang === 'bn' ? 'ফাইল লিংক / ক্লাউড স্টোরেজ URL *' : 'File URL / Cloud Storage Link *'}
                </label>
                <input
                  type="url"
                  required
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://drive.google.com/... or https://..."
                  className="w-full border border-rule rounded-xl px-3.5 py-2.5 text-sm bg-ground text-ink focus:outline-none focus:border-accent"
                />
              </div>

              {/* Privacy Radio */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-ink-secondary">
                  {lang === 'bn' ? 'ভিজিবিলিটি ও নিরাপত্তা নির্ধারণ *' : 'Visibility & Privacy Level *'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    onClick={() => setVisibilityMode('ONLY_ME')}
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between gap-1 transition ${
                      visibilityMode === 'ONLY_ME'
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
                        : 'border-rule bg-ground'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-ink">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{lang === 'bn' ? 'শুধুমাত্র আমি' : 'Only Me'}</span>
                    </div>
                    <span className="text-[11px] text-ink-secondary">
                      {lang === 'bn' ? 'ডাক্তার দেখতে পারবেন না' : 'Hidden from all doctors'}
                    </span>
                  </label>

                  <label
                    onClick={() => setVisibilityMode('DOCTOR_ACCESS')}
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between gap-1 transition ${
                      visibilityMode === 'DOCTOR_ACCESS'
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-rule bg-ground'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-ink">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lang === 'bn' ? 'ডাক্তার দেখতে পাবেন' : 'Doctor Can Access'}</span>
                    </div>
                    <span className="text-[11px] text-ink-secondary">
                      {lang === 'bn' ? 'অ্যাপয়েন্টমেন্টে ডাক্তার দেখতে পাবেন' : 'Shared during consultation'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-rule hover:bg-ground"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-accent text-on-accent hover:opacity-90 transition disabled:opacity-60"
                >
                  {createMutation.isPending ? (lang === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Record')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

