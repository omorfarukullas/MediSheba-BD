import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, getRoleDashboardUrl } from '../../../stores/auth.store';
import { useLanguageStore } from '../../../stores/language.store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { HeartPulse } from 'lucide-react';

export function LoginPage() {
  const { lang } = useLanguageStore();
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
    <div className="min-h-screen bg-ground flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-panel bg-accent text-on-accent flex items-center justify-center font-bold shadow-sm">
              <HeartPulse className="w-6 h-6" />
            </div>
            <span className="font-display font-extrabold text-2xl text-ink">
              MediSheba BD
            </span>
          </Link>
          <p className="text-[14px] text-ink-secondary">
            {lang === 'bn' ? 'আপনার অ্যাকাউন্টে সাইন ইন করুন' : 'Sign in to access your healthcare portal'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{lang === 'bn' ? 'লগইন' : 'Sign In'}</CardTitle>
            <CardDescription>
              {lang === 'bn'
                ? 'ইমেইল অথবা গুগল অ্যাকাউন্ট দিয়ে প্রবেশ করুন'
                : 'Enter your credentials or continue with Google'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              fullWidth
              onClick={handleGoogle}
              disabled={loading}
              leftIcon={
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.3 9 3.4l6.7-6.7C35.8 2.4 30.3 0 24 0 14.7 0 6.8 5.4 2.9 13.3l7.8 6C12.3 13.3 17.6 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.6-4.9 7.3l7.5 5.8c4.4-4.1 7.2-10.1 7.2-17.4z"/>
                  <path fill="#FBBC05" d="M10.7 28.3A14.6 14.6 0 0 1 9.5 24c0-1.5.3-2.9.7-4.3l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.9 10.7l7.8-6.4z"/>
                  <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.5-4.9 2.4-8.4 2.4-6.4 0-11.7-3.8-13.3-9.5l-7.8 6.4C6.8 42.6 14.7 48 24 48z"/>
                </svg>
              }
            >
              {lang === 'bn' ? 'Google দিয়ে সাইন ইন' : 'Continue with Google'}
            </Button>

            <div className="flex items-center gap-3 text-[12px] text-ink-secondary py-1">
              <div className="flex-1 h-px bg-rule" />
              <span>{lang === 'bn' ? 'অথবা ইমেইলে' : 'or with email'}</span>
              <div className="flex-1 h-px bg-rule" />
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              <Input
                label={lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
              />
              <Input
                label={lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-[13px]">
                  {error}
                </div>
              )}

              <Button type="submit" variant="primary" fullWidth loading={loading}>
                {lang === 'bn' ? 'লগইন করুন' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center text-[13px] text-ink-secondary pt-2">
              {lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলতে চান? ' : "Don't have an account? "}
              <Link to="/register" className="text-accent font-semibold hover:underline">
                {lang === 'bn' ? 'রেজিস্ট্রেশন করুন' : 'Create account'}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

