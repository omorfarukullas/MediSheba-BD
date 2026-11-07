import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../../stores/auth.store';
import { useLanguageStore } from '../../../stores/language.store';
import { LanguageToggle } from '../../../components/shared/LanguageToggle';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Phone, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const { lang, t } = useLanguageStore();
  const { loginWithGoogle, loginWithEmail } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nextParam = searchParams.get('next');
  const from = nextParam || (location.state as any)?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      const profile = useAuthStore.getState().profile;
      navigate(from !== '/dashboard' ? from : getRoleDashboardUrl(profile?.role));
    } catch (e: any) {
      setError(e.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithEmail(email, password);
      const profile = useAuthStore.getState().profile;
      navigate(from !== '/dashboard' ? from : getRoleDashboardUrl(profile?.role));
    } catch (e: any) {
      setError(e.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffefc] flex flex-col justify-between items-center p-4 sm:p-6 font-sans text-[#222222]">
      {/* Top right language toggle */}
      <div className="w-full max-w-[420px] flex justify-end pt-2">
        <LanguageToggle />
      </div>

      {/* Centered card 420px */}
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
              {t('action.signIn')}
            </h1>
            <p className="text-[14px] text-[#222222]/70 mt-1">
              {lang === 'bn' ? 'অ্যাকাউন্টে প্রবেশ করতে ইমেইল বা ফোন লিখুন' : 'Enter your email or phone to access your account'}
            </p>
          </div>
        </div>

        <div className="bg-[#fffefc] border border-[#efeeeb] rounded-[14px] p-6 sm:p-7 space-y-4">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              label={lang === 'bn' ? 'ইমেইল অথবা মোবাইল নম্বর' : 'Email or Phone'}
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. 01700000000 / name@example.com"
            />
            <Input
              label={lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {error && (
              <div className="p-3.5 rounded-[14px] bg-[#fef3f2] border border-[#fecdca] text-[#b42318] text-xs font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              className="mt-2"
            >
              <span>{t('action.signIn')}</span>
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
            {lang === 'bn' ? 'গুগল দিয়ে প্রবেশ করুন' : 'Continue with Google'}
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
            {lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলতে চান? ' : "Don't have an account? "}
            <Link to="/register" className="text-[#0f3e17] font-medium hover:underline">
              {t('action.createAccount')}
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency note caption at bottom */}
      <div className="text-xs text-[#222222]/60 py-4 text-center max-w-md">
        {t('emergency.note')}
      </div>
    </div>
  );
}
