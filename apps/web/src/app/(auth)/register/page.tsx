import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/auth.store';
import { useLanguageStore } from '../../../stores/language.store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { HeartPulse } from 'lucide-react';

export function RegisterPage() {
  const { lang } = useLanguageStore();
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
    <div className="min-h-screen bg-[#f1f0ec] flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[8px] bg-[#193f78] text-white flex items-center justify-center font-bold text-xs shadow-none">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="font-medium text-2xl text-[#000000] tracking-tight">
              MediSheba BD
            </span>
          </Link>
          <p className="text-[14px] text-[#6e6d6c]">
            {lang === 'bn' ? (
              <>
                স্মার্ট স্বাস্থ্য নেটওয়ার্কে{' '}
                <span className="font-script text-[24px] text-[#ff6808] font-bold">
                  যুক্ত হোন
                </span>
              </>
            ) : (
              'Join Bangladesh’s Smart Healthcare Network'
            )}
          </p>
        </div>

        <Card variant="default" padding="lg" className="border border-[#e5e7eb]">
          <CardHeader>
            <CardTitle>{lang === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</CardTitle>
            <CardDescription>
              {lang === 'bn'
                ? 'আপনার স্বাস্থ্য সংক্রান্ত তথ্যাদি নিরাপদে সংরক্ষণ করুন'
                : 'Manage doctor serials, hospital beds, and medical records'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="bone"
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
              {lang === 'bn' ? 'Google দিয়ে সাইন আপ' : 'Sign Up with Google'}
            </Button>

            <div className="flex items-center gap-3 text-[12px] text-[#6e6d6c] py-1">
              <div className="flex-1 h-px bg-[#e5e7eb]" />
              <span>{lang === 'bn' ? 'অথবা ইমেইলে' : 'or with email'}</span>
              <div className="flex-1 h-px bg-[#e5e7eb]" />
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <Input
                label={lang === 'bn' ? 'আপনার পুরো নাম' : 'Full Name'}
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tanvir Ahmed"
              />
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                helperText={lang === 'bn' ? 'কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন' : 'Must be at least 6 characters'}
              />

              {error && (
                <div className="p-3 rounded-[12px] bg-[#ff6808]/10 border border-[#ff6808]/30 text-[#ff6808] text-[13px] font-medium">
                  {error}
                </div>
              )}

              <Button type="submit" variant="primary" fullWidth loading={loading}>
                {lang === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Register'}
              </Button>
            </form>

            <div className="text-center text-[13px] text-[#6e6d6c] pt-2">
              {lang === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? ' : 'Already have an account? '}
              <Link to="/login" className="text-[#4570ff] font-medium hover:underline">
                {lang === 'bn' ? 'লগইন করুন' : 'Sign In'}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
