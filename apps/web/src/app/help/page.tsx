import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore, useTranslation } from '../../stores/language.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertBanner } from '../../components/ui/AlertBanner';
import {
  HelpCircle,
  Calendar,
  FileBadge,
  Clock,
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export function HelpPage() {
  const { t } = useTranslation();
  const { lang } = useLanguageStore();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: t('help.faq1Q', 'Can I cancel or reschedule my appointment?'),
      a: t('help.faq1A', "Yes. Open Appointments, select your visit, and click 'Reschedule' or 'Cancel appointment'."),
    },
    {
      q: t('help.faq2Q', 'Who can see my uploaded medical records?'),
      a: t('help.faq2A', "By default, only you. When marked 'Doctor Access', your attending physician can review them during active visits."),
    },
    {
      q: t('help.faq3Q', 'How do I print my prescription?'),
      a: t('help.faq3A', "Open the prescription from your records and click 'Print Preview' for a clean A4/A5 clinical document."),
    },
  ];

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="space-y-1">
        <h1 className="text-[28px] font-semibold text-ink leading-tight">
          {t('help.title', 'Help & Support')}
        </h1>
        <p className="text-sm text-text-2">
          {t('help.desc', 'Step-by-step guidance on booking, medical records, and live chamber queue.')}
        </p>
      </div>

      {/* ─── Emergency Safety Strip (Section 9.10) ─── */}
      <AlertBanner
        variant="danger"
        message={t('help.emergencyNotice', 'In case of urgent medical emergency, call 999 immediately. Do not rely on web appointments.')}
      />

      {/* ─── 3 Quick Step Cards (Section 9.10) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <Card padding="md" className="space-y-3">
          <div className="w-8 h-8 rounded-lg bg-ink text-white grid place-items-center text-sm font-semibold">
            1
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-ink">
              {t('help.step1Title', '1. Book an appointment')}
            </h3>
            <p className="text-xs text-text-2 leading-relaxed">
              {t('help.step1Desc', 'Search by doctor or specialty, choose a time slot, and confirm in 3 simple steps.')}
            </p>
          </div>
          <Link to="/patient/doctors" className="inline-block pt-1">
            <span className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
              <span>{lang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find Doctors'}</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </Card>

        {/* Step 2 */}
        <Card padding="md" className="space-y-3">
          <div className="w-8 h-8 rounded-lg bg-ink text-white grid place-items-center text-sm font-semibold">
            2
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-ink">
              {t('help.step2Title', '2. View prescriptions & records')}
            </h3>
            <p className="text-xs text-text-2 leading-relaxed">
              {t('help.step2Desc', 'Access your digital medicine list, dosage instructions, and lab reports from any device.')}
            </p>
          </div>
          <Link to="/patient/documents" className="inline-block pt-1">
            <span className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
              <span>{lang === 'bn' ? 'রেকর্ড ভল্ট' : 'Open Vault'}</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </Card>

        {/* Step 3 */}
        <Card padding="md" className="space-y-3">
          <div className="w-8 h-8 rounded-lg bg-ink text-white grid place-items-center text-sm font-semibold">
            3
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-ink">
              {t('help.step3Title', '3. Live chamber token tracking')}
            </h3>
            <p className="text-xs text-text-2 leading-relaxed">
              {t('help.step3Desc', 'Check your serial and estimated consultation time live to avoid hospital waiting.')}
            </p>
          </div>
          <Link to="/patient/appointments" className="inline-block pt-1">
            <span className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
              <span>{lang === 'bn' ? 'সিরিয়াল পর্যবেক্ষণ' : 'Check Serial'}</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </Card>
      </div>

      {/* ─── Accordion FAQ ─── */}
      <Card padding="md" className="space-y-4">
        <h2 className="text-base font-semibold text-ink">
          {t('help.faqTitle', 'Frequently Asked Questions')}
        </h2>

        <div className="divide-y divide-border">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3">
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left text-sm font-medium text-ink hover:text-accent transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-text-3 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-3 shrink-0" />
                )}
              </button>
              {expandedFaq === idx && (
                <div className="pt-2 text-xs text-text-2 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* ─── Clinic Contact & Opening Hours ─── */}
      <Card padding="md" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border">
          <div>
            <h3 className="text-base font-semibold text-ink">
              {t('visit.title', 'Visit us')}
            </h3>
            <p className="text-xs text-text-3">
              {t('visit.hoursVal', 'Sat - Thu: 9:00 AM - 9:00 PM (Friday Closed)')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:01700000000">
              <Button variant="secondary" size="compact" leftIcon={<Phone className="w-3.5 h-3.5" />}>
                {t('cta.call', 'Call us')}
              </Button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-text-3 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-ink">{t('visit.address', 'Address')}</div>
              <div>{t('visit.addressVal', 'Dhanmondi 27, Dhaka 1209, Bangladesh')}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-text-3 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-ink">{t('visit.phone', 'Phone')}</div>
              <div>01700-000000 / 01800-000000</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
