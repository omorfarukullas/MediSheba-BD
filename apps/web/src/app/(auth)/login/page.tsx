import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../../stores/auth.store';
import { useLanguageStore } from '../../../stores/language.store';
import { LanguageToggle } from '../../../components/shared/LanguageToggle';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Phone } from 'lucide-react';

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
    <div className="min-h-screen bg-canvas flex flex-col justify-between items-center p-4 sm:p-6 font-sans text-ink">
      {/* Top right language toggle */}
      <div className="w-full max-w-[400px] flex justify-end pt-2">
        <LanguageToggle />
      </div>

      {/* Centered card 400px (Section 9.1) */}
      <div className="w-full max-w-[400px] space-y-6 my-auto">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ink text-white grid place-items-center text-sm font-semibold">
              M
            </div>
            <span className="font-semibold text-xl text-ink">
              {t('app_name')}
            </span>
          </Link>
          <div>
            <h1 className="text-[28px] font-semibold text-ink tracking-tight">
              {t('action.signIn')}
            </h1>
            <p className="text-sm text-text-2 mt-0.5">
              {lang === 'bn' ? 'অ্যাকাউন্টে প্রবেশ করতে ইমেইল বা ফোন লিখুন' : 'Enter your email or phone to access your account'}
            </p>
          </div>
        </div>

        <Card padding="lg" className="space-y-4">
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            <Input
              label={lang === 'bn' ? 'ইমেইল অথবা মোবাইল নম্বর' : 'Email or Phone'}
              type="text"
              required
              density="comfort"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. 01700000000 / name@example.com"
            />
            <Input
              label={lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              type="password"
              required
              density="comfort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {error && (
              <div className="p-3 rounded-lg bg-danger-bg border border-danger-border text-danger-text text-xs font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="comfort"
              fullWidth
              loading={loading}
            >
              {t('action.signIn')}
            </Button>
          </form>

          <div className="flex items-center gap-3 text-xs text-text-3 py-1">
            <div className="flex-1 h-px bg-border" />
            <span>{lang === 'bn' ? 'অথবা' : 'or'}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button
            type="button"
            variant="secondary"
            size="comfort"
            fullWidth
            onClick={handleGoogle}
            disabled={loading}
          >
            {lang === 'bn' ? 'গুগল দিয়ে প্রবেশ করুন' : 'Continue with Google'}
          </Button>

          {/* Call us secondary button (Section 9.1) */}
          <a href="tel:01700000000" className="block w-full">
            <Button
              type="button"
              variant="secondary"
              size="comfort"
              fullWidth
              leftIcon={<Phone className="w-5 h-5" />}
            >
              {lang === 'bn' ? 'সাহায্য প্রয়োজন? ফোন করুন' : 'Need help? Call us'}
            </Button>
          </a>

          <div className="text-center text-xs text-text-2 pt-2">
            {lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলতে চান? ' : "Don't have an account? "}
            <Link to="/register" className="text-accent font-medium hover:underline">
              {t('action.createAccount')}
            </Link>
          </div>
        </Card>
      </div>

      {/* Emergency note caption at bottom (Section 9.1 & 10.2 #9) */}
      <div className="text-xs text-text-3 py-4 text-center">
        {t('emergency.note')}
      </div>
    </div>
  );
}
