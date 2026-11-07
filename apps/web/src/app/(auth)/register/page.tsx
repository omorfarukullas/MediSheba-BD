import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/auth.store';
import { useLanguageStore } from '../../../stores/language.store';
import { LanguageToggle } from '../../../components/shared/LanguageToggle';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Phone, ArrowRight } from 'lucide-react';

export function RegisterPage() {
  const { lang, t } = useLanguageStore();
  const { register, loginWithGoogle } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/onboarding');
    } catch (e: any) {
      setError(e.message || 'Google registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(email, password);
      navigate('/onboarding');
    } catch (e: any) {
      setError(e.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffefc] flex flex-col justify-between items-center p-4 sm:p-6 font-sans text-[#222222]">
      <div className="w-full max-w-[420px] flex justify-end pt-2">
        <LanguageToggle />
      </div>

      <div className="w-full max-w-[420px] space-y-6 my-auto">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[7px] bg-[#0f3e17] text-[#fffefc] grid place-items-center text-sm font-semibold">
              M
            </div>
            <span className="font-serif text-2xl font-normal text-[#0f3e17] tracking-tight">
              {t('app_name')}
            </span>
          </Link>
          <div>
            <h1 className="font-serif text-[32px] font-light text-[#0f3e17] tracking-tight">
              {t('action.createAccount')}
            </h1>
            <p className="text-[14px] text-[#222222]/70 mt-1">
              {lang === 'bn' 
                ? 'অ্যাপয়েন্টমেন্ট, প্রেসক্রিপশন ও হেলথ রেকর্ড সুরক্ষিত রাখতে একাউন্ট খুলুন' 
                : 'Manage appointments, medical vault, and chamber visits'}
            </p>
          </div>
        </div>

        <div className="bg-[#fffefc] border border-[#efeeeb] rounded-[14px] p-6 sm:p-7 space-y-4">
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <Input
              label={lang === 'bn' ? 'পুরো নাম' : 'Full Name'}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'bn' ? 'তানভীর আহমেদ' : 'Tanvir Ahmed'}
            />
            <Input
              label={lang === 'bn' ? 'ইমেইল অথবা মোবাইল নম্বর' : 'Email Address'}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@example.com"
            />
            <Input
              label={lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              helperText={lang === 'bn' ? 'কমপক্ষে ৬ অক্ষর হতে হবে' : 'At least 6 characters'}
            />

            {error && (
              <div className="p-3.5 rounded-[14px] bg-[#fef3f2] border border-[#fecdca] text-[#b42318] text-xs font-medium">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} className="mt-2">
              <span>{t('action.createAccount')}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="flex items-center gap-3 text-xs text-[#222222]/50 py-1">
            <div className="flex-1 h-px bg-[#efeeeb]" />
            <span>{lang === 'bn' ? 'অথবা' : 'or'}</span>
            <div className="flex-1 h-px bg-[#efeeeb]" />
          </div>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={handleGoogle}
            disabled={loading}
          >
            {lang === 'bn' ? 'গুগল দিয়ে শুরু করুন' : 'Continue with Google'}
          </Button>

          {/* Call us secondary button */}
          <a href="tel:01700000000" className="block w-full">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              fullWidth
              leftIcon={<Phone className="w-4 h-4" />}
            >
              {lang === 'bn' ? 'সাহায্য প্রয়োজন? ফোন করুন' : 'Need help? Call us'}
            </Button>
          </a>

          <div className="text-center text-[13px] text-[#222222]/70 pt-2">
            {lang === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? ' : 'Already have an account? '}
            <Link to="/login" className="text-[#0f3e17] font-medium hover:underline">
              {t('action.signIn')}
            </Link>
          </div>
        </div>
      </div>

      <div className="text-xs text-[#222222]/60 py-4 text-center max-w-md">
        {t('emergency.note')}
      </div>
    </div>
  );
}
