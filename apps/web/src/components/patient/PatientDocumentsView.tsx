import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { useAuthStore } from '../../stores/auth.store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { AlertBanner } from '../ui/AlertBanner';
import { 
  FolderLock, 
  Upload, 
  FileText, 
  Lock, 
  ShieldCheck, 
  Plus, 
  Eye, 
  Trash2, 
  Share2,
  FileBadge
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

  const filterTabs = [
    { id: 'ALL', label: lang === 'bn' ? 'সকল রেকর্ড' : 'All Records' },
    { id: 'PRESCRIPTION', label: lang === 'bn' ? 'প্রেসক্রিপশন' : 'Prescriptions' },
    { id: 'LAB_REPORT', label: lang === 'bn' ? 'ল্যাব রিপোর্ট' : 'Lab Reports' },
    { id: 'SCAN', label: lang === 'bn' ? 'এক্স-রে ও স্ক্যান' : 'Imaging / Scans' },
  ];

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {lang === 'bn' ? 'প্রেসক্রিপশন ভল্ট ও মেডিকেল রেকর্ড' : 'Prescription Vault & Medical Records'}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn'
              ? 'পূর্ববর্তী রিপোর্ট সংরক্ষণ ও চিকিৎসকের সাথে গোপনীয়তা নিয়ন্ত্রণ (শুধুমাত্র আমি বনাম ডাক্তার প্রবেশাধিকার)।'
              : 'Secure record storage with strict privacy controls (Only Me vs Doctor Access).'}
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowUploadModal(true)}
          >
            {lang === 'bn' ? '+ নতুন রেকর্ড যোগ করুন' : '+ Upload Record'}
          </Button>
        </div>
      </div>

      {/* ─── Privacy Policy Alert Banner ─── */}
      <AlertBanner
        variant="info"
        message={
          lang === 'bn'
            ? 'গোপনীয়তা তথ্য: "ডাক্তার দেখতে পারবেন" মোডে আপনার নিবন্ধিত চিকিৎসকরা পরামর্শের সুবিধার্থে এই রিপোর্ট দেখতে পারবেন।'
            : 'Privacy Note: Records marked "Doctor Access" are only visible to certified physicians during active consultations.'
        }
      />

      {/* ─── Filter Chips ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => {
          const isSelected = categoryFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-accent-tint text-accent border-accent'
                  : 'bg-subtle text-text-2 border-border hover:border-border-strong hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ─── Document Cards Grid ─── */}
      {documents && documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents
            .filter((d) => categoryFilter === 'ALL' || d.fileType === categoryFilter)
            .map((doc) => {
              const isOnlyMe = doc.visibilityMode === 'ONLY_ME';
              return (
                <Card key={doc.id} padding="md" className="flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="neutral">
                        {doc.fileType}
                      </Badge>
                      <button
                        onClick={() => handleToggleVisibility(doc.id, doc.visibilityMode)}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border cursor-pointer ${
                          isOnlyMe
                            ? 'bg-subtle text-text-2 border-border'
                            : 'bg-accent-tint text-accent border-accent/30'
                        }`}
                        title={lang === 'bn' ? 'ক্লিক করে প্রাইভেসি পরিবর্তন করুন' : 'Click to toggle privacy'}
                      >
                        {isOnlyMe ? (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>{lang === 'bn' ? 'ব্যক্তিগত (Only Me)' : 'Only Me'}</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-3 h-3" />
                            <span>{lang === 'bn' ? 'ডাক্তার দেখতে পারবেন' : 'Doctor Access'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-ink line-clamp-1">{doc.title}</h3>
                      <p className="text-xs text-text-3 mt-1">
                        {lang === 'bn' ? 'সংরক্ষিত:' : 'Added:'} {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="secondary" size="compact" leftIcon={<Eye className="w-3.5 h-3.5" />} className="w-full">
                        {lang === 'bn' ? 'ফাইল দেখুন' : 'View File'}
                      </Button>
                    </a>

                    <button
                      onClick={() => handleToggleVisibility(doc.id, doc.visibilityMode)}
                      className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-text-3 hover:text-accent hover:border-accent transition-colors"
                      title={lang === 'bn' ? 'প্রাইভেসি পরিবর্তন' : 'Toggle Visibility'}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(lang === 'bn' ? 'এই ডকুমেন্টটি মুছে ফেলবেন?' : 'Delete this record?')) {
                          deleteMutation.mutate({ documentId: doc.id });
                        }
                      }}
                      className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-text-3 hover:text-danger-text hover:border-danger-border transition-colors"
                      title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              );
            })}
        </div>
      ) : (
        <Card padding="lg" className="text-center py-12 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-subtle text-text-3 mx-auto flex items-center justify-center">
            <FileText className="w-5 h-5 text-text-3" />
          </div>
          <h3 className="text-base font-semibold text-ink">
            {lang === 'bn' ? 'কোন প্রেসক্রিপশন বা রিপোর্ট আপলোড করা নেই' : 'No records uploaded yet'}
          </h3>
          <p className="text-xs text-text-3 max-w-sm mx-auto">
            {lang === 'bn'
              ? 'আপনার পূর্বের প্রেসক্রিপশন, রক্ত পরীক্ষার রিপোর্ট বা এক্স-রে নিরাপদ ভল্টে সংরক্ষণ করে রাখুন।'
              : 'Keep your past prescriptions, lab tests, and scans safely organized.'}
          </p>
          <div>
            <Button
              variant="primary"
              size="compact"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setShowUploadModal(true)}
            >
              {lang === 'bn' ? 'প্রথম ফাইল যোগ করুন' : 'Add First Record'}
            </Button>
          </div>
        </Card>
      )}

      {/* ─── Upload Record Modal ─── */}
      {showUploadModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowUploadModal(false)}
          title={lang === 'bn' ? 'প্রেসক্রিপশন / রিপোর্ট আপলোড' : 'Upload Medical Record'}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <Input
              label={lang === 'bn' ? 'ডকুমেন্টের শিরোনাম *' : 'Document Title *'}
              required
              placeholder={lang === 'bn' ? 'যেমন: ইসিজি রিপোর্ট ২০২৪' : 'e.g. Lipid Profile Oct 2024'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-3 mb-1">
                {lang === 'bn' ? 'ডকুমেন্টের ধরন' : 'Record Type'}
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full h-10 px-3 text-sm font-medium border border-border rounded-lg bg-canvas text-ink focus:outline-none focus:border-accent"
              >
                <option value="PRESCRIPTION">{lang === 'bn' ? 'প্রেসক্রিপশন (Prescription)' : 'Prescription'}</option>
                <option value="LAB_REPORT">{lang === 'bn' ? 'ল্যাব টেস্ট রিপোর্ট (Lab Report)' : 'Lab Report'}</option>
                <option value="SCAN">{lang === 'bn' ? 'এক্স-রে / এমআরআই স্ক্যান (Imaging)' : 'Imaging / Scan'}</option>
                <option value="DISCHARGE_LETTER">{lang === 'bn' ? 'হাসপাতাল ছাড়পত্র (Discharge)' : 'Discharge Summary'}</option>
              </select>
            </div>

            <Input
              label={lang === 'bn' ? 'ফাইল লিংক / URL *' : 'File URL *'}
              required
              type="url"
              placeholder="https://example.com/report.pdf"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              helperText={lang === 'bn' ? 'সরাসরি পিডিএফ বা ছবির লিংক দিন' : 'Direct link to PDF or image'}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-3 mb-1">
                {lang === 'bn' ? 'গোপনীয়তা মোড' : 'Privacy Control'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVisibilityMode('DOCTOR_ACCESS')}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    visibilityMode === 'DOCTOR_ACCESS'
                      ? 'bg-accent-tint border-accent text-accent'
                      : 'bg-canvas border-border text-text-2 hover:border-border-strong'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'ডাক্তার প্রবেশ' : 'Doctor Access'}</span>
                  </div>
                  <div className="text-[11px] text-text-3 mt-0.5">
                    {lang === 'bn' ? 'অনুমোদিত ডাক্তার দেখতে পারবেন' : 'Verified doctors can review'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVisibilityMode('ONLY_ME')}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    visibilityMode === 'ONLY_ME'
                      ? 'bg-accent-tint border-accent text-accent'
                      : 'bg-canvas border-border text-text-2 hover:border-border-strong'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'শুধুমাত্র আমি' : 'Only Me'}</span>
                  </div>
                  <div className="text-[11px] text-text-3 mt-0.5">
                    {lang === 'bn' ? 'সম্পূর্ণ ব্যক্তিগত থাকবে' : 'Completely private to you'}
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <Button variant="ghost" size="compact" onClick={() => setShowUploadModal(false)}>
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </Button>
              <Button variant="primary" size="compact" type="submit" isLoading={createMutation.isPending}>
                {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Record'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
