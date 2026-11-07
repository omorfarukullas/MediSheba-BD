import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { UserRole } from '@medisheba/types';
import { LanguageToggle } from '../../components/shared/LanguageToggle';
import { Button } from '../../components/ui/Button';
import { User, Stethoscope, Building2, Check, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#fffefc] flex flex-col justify-between items-center p-4 sm:p-6 font-sans text-[#222222]">
      <div className="w-full max-w-xl flex justify-end pt-2">
        <LanguageToggle />
      </div>

      <div className="w-full max-w-xl space-y-6 my-auto">
        <div className="text-center space-y-1.5">
          <div className="eyebrow uppercase text-[11px] font-semibold tracking-[0.08em] text-[#0f3e17]">
            {lang === 'bn' ? 'প্রোফাইল সেটআপ' : 'Profile Setup'}
          </div>
          <h1 className="font-serif text-[32px] font-light text-[#0f3e17] tracking-tight">
            {lang === 'bn' ? 'আপনার ভূমিকা নির্বাচন করুন' : 'Select your workspace role'}
          </h1>
          <p className="text-[14px] text-[#222222]/70">
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
                className={`p-5 rounded-[14px] border transition-all duration-150 cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'border-[#0f3e17] bg-[#e1f4df]'
                    : 'border-[#efeeeb] bg-[#fffefc] hover:border-[#b1dbb8] hover:bg-[#e1f4df]/20'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-[#0f3e17] text-[#fffefc]' : 'bg-[#e1f4df]/60 text-[#0f3e17]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-[17px] font-normal text-[#0f3e17]">
                      {role.title}
                    </h3>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#0f3e17] text-[#fffefc] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#222222]/70 leading-relaxed">
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
          className="mt-2"
        >
          <span>{lang === 'bn' ? 'চালিয়ে যান' : 'Continue to Workspace'}</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>

      <div className="text-xs text-[#222222]/60 py-4 text-center max-w-md">
        {t('emergency.note')}
      </div>
    </div>
  );
}
