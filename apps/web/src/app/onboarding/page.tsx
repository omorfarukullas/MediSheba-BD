import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { UserRole } from '@medisheba/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Stethoscope, Building2, CheckCircle2 } from 'lucide-react';

export function OnboardingPage() {
  const { lang } = useLanguageStore();
  const { user, profile, setProfile } = useAuthStore();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PATIENT);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      // Set the profile in store
      const updatedProfile = {
        id: profile?.id || user?.uid || 'temp-id',
        email: user?.email || '',
        fullName: user?.displayName || user?.email?.split('@')[0] || 'User',
        role: selectedRole,
        avatarUrl: user?.photoURL || null,
      };
      setProfile(updatedProfile);
      navigate(getRoleDashboardUrl(selectedRole));
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: UserRole.PATIENT,
      icon: User,
      title: lang === 'bn' ? 'আমি একজন রোগী' : 'I am a Patient',
      desc: lang === 'bn' 
        ? 'ডাক্তার অ্যাপয়েন্টমেন্ট বুকিং, লাইভ সিরিয়াল ট্র্যাকিং এবং প্রেসক্রিপশন সংরক্ষণ' 
        : 'Book doctor appointments, live chamber queue tracking, and store medical records',
    },
    {
      id: UserRole.DOCTOR,
      icon: Stethoscope,
      title: lang === 'bn' ? 'আমি একজন চিকিৎসক' : 'I am a Doctor',
      desc: lang === 'bn' 
        ? 'রোগীদের সিরিয়াল ম্যানেজ, চেম্বার শিডিউল নির্ধারণ এবং টেলিমেডিসিন পরামর্শ' 
        : 'Manage live patient queue, configure chamber availability, and conduct telemedicine',
    },
    {
      id: UserRole.HOSPITAL_ADMIN,
      icon: Building2,
      title: lang === 'bn' ? 'হাসপাতাল প্রশাসন' : 'Hospital Admin',
      desc: lang === 'bn' 
        ? 'বেড, আইসিইউ, কেবিন, টেস্ট ফি তালিকা এবং অ্যাম্বুলেন্স ফ্লীট ব্যবস্থাপনা' 
        : 'Manage hospital beds, ICU/CCU capacity, diagnostic test pricing, and ambulances',
    },
  ];

  return (
    <div className="min-h-screen bg-ground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-display text-3xl font-bold text-ink tracking-tight">
            {lang === 'bn' ? 'আপনার ভূমিকা নির্বাচন করুন' : 'Select Your Role'}
          </h1>
          <p className="text-[14px] text-ink-secondary">
            {lang === 'bn'
              ? 'আপনার চাহিদা অনুযায়ী সঠিক ড্যাশবোর্ডে প্রবেশ করতে নির্বাচন করুন'
              : 'Choose how you intend to use the MediSheba BD platform'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-5 rounded-panel border-2 transition-all cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'border-accent bg-accent/5 shadow-sm'
                    : 'border-rule bg-panel hover:border-accent/40'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-accent text-on-accent' : 'bg-ground-muted text-ink'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-ink">
                      {role.title}
                    </h3>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    )}
                  </div>
                  <p className="text-[13px] text-ink-secondary leading-relaxed">
                    {role.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handleContinue}
        >
          {lang === 'bn' ? 'চালিয়ে যান' : 'Continue to Dashboard'}
        </Button>
      </div>
    </div>
  );
}

