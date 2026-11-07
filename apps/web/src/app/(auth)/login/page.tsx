import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../../stores/auth.store';
import { useLanguageStore } from '../../../stores/language.store';
import { LanguageToggle } from '../../../components/shared/LanguageToggle';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function LoginPage() {
  const { lang, t } = useLanguageStore();
  const { loginWithGoogle, loginWithEmail } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

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
      navigate(from !== '/' ? from : getRoleDashboardUrl(profile?.role));
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
      navigate(from !== '/' ? from : getRoleDashboardUrl(profile?.role));
    } catch (e: any) {
      setError(e.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between items-center p-4 sm:p-6 font-sans text-[#111111]">
      {/* Top right language toggle */}
      <div className="w-full max-w-[400px] flex justify-end pt-2">
        <LanguageToggle />
      </div>

      {/* Centered card 400px (Section 9.1) */}
      <div className="w-full max-w-[400px] space-y-6 my-auto">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#111111] text-white grid place-items-center text-xs font-semibold">
              M
            </div>
            <span className="font-semibold text-xl text-[#111111]">
              {t('app_name')}
            </span>
          </Link>
          <div>
            <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
              {t('action.signIn')}
            </h1>
            <p className="text-[14px] text-[#57534e]">
              Enter your email or phone to access your account
            </p>
          </div>
        </div>

        <Card padding="md" className="space-y-4">
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            <Input
              label="Email or Phone"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@example.com"
            />
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {error && (
              <div className="p-3 rounded-lg bg-[#fef3f2] border border-[#fecdca] text-[#b42318] text-[13px] font-medium">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth loading={loading}>
              {t('action.signIn')}
            </Button>
          </form>

          <div className="flex items-center gap-3 text-[12px] text-[#78716c] py-1">
            <div className="flex-1 h-px bg-[#e7e5e4]" />
            <span>or</span>
            <div className="flex-1 h-px bg-[#e7e5e4]" />
          </div>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={handleGoogle}
            disabled={loading}
          >
            Continue with Google
          </Button>

          <div className="text-center text-[13px] text-[#57534e] pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#3b5bdb] font-medium hover:underline">
              {t('action.createAccount')}
            </Link>
          </div>
        </Card>
      </div>

      {/* Emergency note caption at bottom (Section 9.1 & 10.2 #9) */}
      <div className="text-[13px] text-[#78716c] py-4 text-center">
        {t('emergency.note')}
      </div>
    </div>
  );
}
