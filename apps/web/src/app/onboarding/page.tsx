import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { UserRole } from '@medisheba/types';
import { LanguageToggle } from '../../components/shared/LanguageToggle';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Stethoscope, Building2, Check } from 'lucide-react';

export function OnboardingPage() {
  const { lang, t } = useLanguageStore();
  const { user, profile, setProfile } = useAuthStore();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PATIENT);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
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
        ? 'রোগীদের সিরিয়াল ম্যানেজ, চেম্বার শিডিউল নির্ধারণ এবং প্রেসক্রিপশন প্রদান' 
        : 'Manage live patient queue, configure chamber availability, and write prescriptions',
    },
    {
      id: UserRole.HOSPITAL_ADMIN,
      icon: Building2,
      title: lang === 'bn' ? 'হাসপাতাল প্রশাসন / রিসেপশন' : 'Reception / Hospital Admin',
      desc: lang === 'bn' 
        ? 'বেড, আইসিইউ, কেবিন, টেস্ট ফি তালিকা এবং রোগী রেজিস্ট্রেশন' 
        : 'Manage hospital beds, ICU capacity, test catalogs, and reception check-in',
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between items-center p-4 sm:p-6 font-sans text-[#111111]">
      <div className="w-full max-w-xl flex justify-end pt-2">
        <LanguageToggle />
      </div>

      <div className="w-full max-w-xl space-y-6 my-auto">
        <div className="text-center space-y-1.5">
          <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
            {lang === 'bn' ? 'আপনার ভূমিকা নির্বাচন করুন' : 'Select your workspace role'}
          </h1>
          <p className="text-[14px] text-[#57534e]">
            {lang === 'bn'
              ? 'আপনার চাহিদা অনুযায়ী সঠিক ড্যাশবোর্ডে প্রবেশ করতে নির্বাচন করুন'
              : 'Choose your profile to unlock tailored clinical or patient workspaces'}
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-5 rounded-xl border transition-colors duration-150 cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'border-[#3b5bdb] bg-[#eef2ff]'
                    : 'border-[#e7e5e4] bg-[#ffffff] hover:border-[#d6d3d1]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#3b5bdb] text-white' : 'bg-[#f4f4f2] text-[#111111]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base text-[#111111]">
                      {role.title}
                    </h3>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#3b5bdb] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#57534e] leading-relaxed">
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
          {lang === 'bn' ? 'চালিয়ে যান' : 'Continue to Workspace'}
        </Button>
      </div>

      <div className="text-[13px] text-[#78716c] py-4 text-center">
        {t('emergency.note')}
      </div>
    </div>
  );
}
