import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../stores/auth.store';
import { useLanguageStore } from '../../stores/language.store';
import { UserRole } from '@medisheba/types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Stethoscope, Building2, Check } from 'lucide-react';

export function OnboardingPage() {
  const { lang } = useLanguageStore();
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
      tag: 'Most Popular',
    },
    {
      id: UserRole.DOCTOR,
      icon: Stethoscope,
      title: lang === 'bn' ? 'আমি একজন চিকিৎসক' : 'I am a Doctor',
      desc: lang === 'bn' 
        ? 'রোগীদের সিরিয়াল ম্যানেজ, চেম্বার শিডিউল নির্ধারণ এবং টেলিমেডিসিন পরামর্শ' 
        : 'Manage live patient queue, configure chamber availability, and conduct telemedicine',
      tag: 'BMDC Verified',
    },
    {
      id: UserRole.HOSPITAL_ADMIN,
      icon: Building2,
      title: lang === 'bn' ? 'হাসপাতাল প্রশাসন' : 'Hospital Authority',
      desc: lang === 'bn' 
        ? 'বেড, আইসিইউ, কেবিন, টেস্ট ফি তালিকা এবং অ্যাম্বুলেন্স ফ্লীট ব্যবস্থাপনা' 
        : 'Manage hospital beds, ICU/CCU capacity, diagnostic test pricing, and ambulances',
      tag: 'Staff Authority',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f1f0ec] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-[0.025em] text-[#ff6808]">
            Welcome to MediSheba BD
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium text-[#000000] tracking-tight">
            {lang === 'bn' ? (
              <>
                আপনার ভূমিকা{' '}
                <span className="font-script text-[32px] text-[#ff6808] font-bold">
                  নির্বাচন করুন
                </span>
              </>
            ) : (
              'Select your workspace role'
            )}
          </h1>
          <p className="text-[14px] text-[#6e6d6c]">
            {lang === 'bn'
              ? 'আপনার চাহিদা অনুযায়ী সঠিক ড্যাশবোর্ডে প্রবেশ করতে নির্বাচন করুন'
              : 'Choose your profile to unlock tailored clinical or patient workspaces'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-5 rounded-[20px] border transition-colors duration-150 cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'border-[#4570ff] bg-[#d6e0ff]/40'
                    : 'border-[#e5e7eb] bg-[#ffffff] hover:border-[#4570ff]/40 hover:bg-[#ffffff]'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#4570ff] text-white' : 'bg-[#f1f0ec] text-[#000000]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-base text-[#000000]">
                        {role.title}
                      </h3>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f1f0ec] text-[#6e6d6c]">
                        {role.tag}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#4570ff] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#6e6d6c] leading-relaxed">
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
    </div>
  );
}
