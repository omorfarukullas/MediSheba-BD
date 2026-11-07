import React, { useState } from 'react';
import { useLanguageStore, useTranslation } from '../../../stores/language.store';
import { Card, StatCard } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { Activity, Plus, Heart, Droplets, Scale, Thermometer, CheckCircle2 } from 'lucide-react';

export function PatientVitalsPage() {
  const { t } = useTranslation();
  const { lang } = useLanguageStore();

  const [vitals, setVitals] = useState([
    {
      id: '1',
      date: lang === 'bn' ? 'আজ, ০৮:৩০ সকাল' : 'Today, 08:30 AM',
      bp: '120/80 mmHg',
      sugar: '5.8 mmol/L',
      pulse: '72 bpm',
      weight: '68 kg',
      status: 'Normal',
    },
    {
      id: '2',
      date: lang === 'bn' ? 'গতকাল, ০৯:১৫ সকাল' : 'Yesterday, 09:15 AM',
      bp: '128/84 mmHg',
      sugar: '6.2 mmol/L',
      pulse: '76 bpm',
      weight: '68.2 kg',
      status: 'Normal',
    },
  ]);

  const [bp, setBp] = useState('');
  const [sugar, setSugar] = useState('');
  const [pulse, setPulse] = useState('');
  const [weight, setWeight] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bp && !sugar) return;
    setVitals((prev) => [
      {
        id: String(Date.now()),
        date: lang === 'bn' ? 'মাত্র এইমাত্র' : 'Just now',
        bp: bp || '—',
        sugar: sugar ? `${sugar} mmol/L` : '—',
        pulse: pulse ? `${pulse} bpm` : '—',
        weight: weight ? `${weight} kg` : '—',
        status: 'Normal',
      },
      ...prev,
    ]);
    setBp('');
    setSugar('');
    setPulse('');
    setWeight('');
    setShowAdd(false);
  };

  return (
    <div className="max-w-[1120px] mx-auto space-y-6">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold text-ink leading-tight">
            {lang === 'bn' ? 'স্বাস্থ্য লক্ষণ ও ভাইটালস' : 'Health Vitals Log'}
          </h1>
          <p className="text-sm text-text-2 mt-1">
            {lang === 'bn'
              ? 'নিয়মিত রক্তচাপ, সুগার এবং পালস পরিমাপের তথ্য সংরক্ষণ করুন।'
              : 'Log and monitor blood pressure, glucose, pulse rate, and body metrics.'}
          </p>
        </div>
        <div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAdd(!showAdd)}
          >
            {lang === 'bn' ? '+ নতুন ভাইটালস যোগ করুন' : '+ Log Vitals'}
          </Button>
        </div>
      </div>

      {/* ─── 4 Identical Stat Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={lang === 'bn' ? 'রক্তচাপ (BP)' : 'Blood Pressure'}
          value="120/80"
          caption={lang === 'bn' ? 'স্বাভাবিক (mmHg)' : 'Normal (mmHg)'}
        />
        <StatCard
          label={lang === 'bn' ? 'পালস রেট' : 'Pulse Rate'}
          value="72"
          caption={lang === 'bn' ? 'বিপিএম (bpm)' : 'Normal (bpm)'}
        />
        <StatCard
          label={lang === 'bn' ? 'ব্লাড সুগার' : 'Blood Sugar'}
          value="5.8"
          caption={lang === 'bn' ? 'ফাস্টিং (mmol/L)' : 'Fasting (mmol/L)'}
        />
        <StatCard
          label={lang === 'bn' ? 'শরীরের ওজন' : 'Body Weight'}
          value="68"
          caption={lang === 'bn' ? 'কেজি (kg)' : 'Kilograms (kg)'}
        />
      </div>

      {/* ─── Add Vitals Form ─── */}
      {showAdd && (
        <Card padding="lg" className="space-y-4">
          <div className="pb-3 border-b border-border">
            <h2 className="text-base font-semibold text-ink">
              {lang === 'bn' ? 'নতুন পরিমাপ যোগ করুন' : 'Record New Reading'}
            </h2>
            <p className="text-xs text-text-3">
              {lang === 'bn' ? 'আজকের পরিমাপের মানগুলো লিখুন' : 'Enter your latest vital signs measurements'}
            </p>
          </div>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                label={lang === 'bn' ? 'রক্তচাপ (BP, e.g. 120/80)' : 'Blood Pressure (e.g. 120/80)'}
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                placeholder="120/80"
              />
              <Input
                label={lang === 'bn' ? 'ব্লাড সুগার (mmol/L)' : 'Blood Sugar (mmol/L)'}
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                placeholder="5.8"
              />
              <Input
                label={lang === 'bn' ? 'পালস রেট (bpm)' : 'Pulse Rate (bpm)'}
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                placeholder="72"
              />
              <Input
                label={lang === 'bn' ? 'ওজন (kg)' : 'Weight (kg)'}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="68"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <Button variant="ghost" size="compact" onClick={() => setShowAdd(false)}>
                {t('action.cancel', 'Cancel')}
              </Button>
              <Button variant="primary" size="compact" type="submit">
                {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Vitals'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* ─── Vitals Log Table ─── */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-border bg-subtle">
          <h2 className="text-sm font-semibold text-ink">
            {lang === 'bn' ? 'পূর্ববর্তী পরিমাপ ইতিহাস' : 'Recent Measurements Log'}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-subtle text-xs text-text-3 font-medium border-b border-border">
              <tr>
                <th className="px-5 py-3">{lang === 'bn' ? 'তারিখ ও সময়' : 'Date & Time'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'রক্তচাপ' : 'Blood Pressure'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'সুগার' : 'Sugar'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'পালস' : 'Pulse'}</th>
                <th className="px-5 py-3">{lang === 'bn' ? 'ওজন' : 'Weight'}</th>
                <th className="px-5 py-3 text-right">{lang === 'bn' ? 'অবস্থা' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vitals.map((v) => (
                <tr key={v.id} className="hover:bg-subtle/50 transition-colors h-[52px]">
                  <td className="px-5 py-3 text-ink font-medium">{v.date}</td>
                  <td className="px-5 py-3 text-ink font-mono">{v.bp}</td>
                  <td className="px-5 py-3 text-ink font-mono">{v.sugar}</td>
                  <td className="px-5 py-3 text-ink font-mono">{v.pulse}</td>
                  <td className="px-5 py-3 text-ink font-mono">{v.weight}</td>
                  <td className="px-5 py-3 text-right">
                    <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>
                      {lang === 'bn' ? 'স্বাভাবিক' : 'Normal'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
