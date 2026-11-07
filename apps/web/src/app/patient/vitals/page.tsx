import React, { useState } from 'react';
import { useLanguageStore } from '../../../stores/language.store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { Activity, Plus, Heart, Droplets, Scale, Thermometer } from 'lucide-react';

export function PatientVitalsPage() {
  const { lang } = useLanguageStore();

  const [vitals, setVitals] = useState([
    {
      id: '1',
      date: 'Today, 08:30 AM',
      bp: '120/80 mmHg',
      sugar: '5.8 mmol/L',
      pulse: '72 bpm',
      weight: '68 kg',
      temp: '98.4 °F',
      status: 'Normal',
    },
    {
      id: '2',
      date: 'Yesterday, 09:15 AM',
      bp: '128/84 mmHg',
      sugar: '6.2 mmol/L',
      pulse: '76 bpm',
      weight: '68.2 kg',
      temp: '98.6 °F',
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
        date: 'Just now',
        bp: bp || '—',
        sugar: sugar ? `${sugar} mmol/L` : '—',
        pulse: pulse ? `${pulse} bpm` : '—',
        weight: weight ? `${weight} kg` : '—',
        temp: '98.6 °F',
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            {lang === 'bn' ? 'দৈনিক স্বাস্থ্য লক্ষণ ও ভাইটালস' : 'Health Vitals Log'}
          </h1>
          <p className="text-[14px] text-ink-secondary">
            {lang === 'bn'
              ? 'আপনার রক্তচাপ, ডায়াবেটিস, ওজন এবং পালস নিয়মিত রেকর্ড করুন'
              : 'Log and monitor blood pressure, glucose, pulse rate, and body metrics'}
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowAdd(!showAdd)}
        >
          {lang === 'bn' ? 'নতুন ভাইটালস যোগ করুন' : 'Log New Vitals'}
        </Button>
      </div>

      {showAdd && (
        <Card>
          <CardHeader>
            <CardTitle>{lang === 'bn' ? 'নতুন তথ্য যোগ করুন' : 'Record New Reading'}</CardTitle>
            <CardDescription>
              {lang === 'bn' ? 'বর্তমান পরিমাপের মানগুলো লিখুন' : 'Enter your latest vital measurements'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                label="Blood Pressure (e.g. 120/80)"
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                placeholder="120/80"
              />
              <Input
                label="Blood Sugar (mmol/L)"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                placeholder="5.8"
              />
              <Input
                label="Pulse Rate (bpm)"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                placeholder="72"
              />
              <Input
                label="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="68"
              />
              <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2.5 pt-2">
                <Button variant="outline" type="button" onClick={() => setShowAdd(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Reading
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] text-ink-secondary font-medium">Blood Pressure</div>
            <div className="font-display text-xl font-bold text-ink">120/80</div>
            <Badge variant="success" size="sm" className="mt-1">Normal</Badge>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] text-ink-secondary font-medium">Blood Sugar</div>
            <div className="font-display text-xl font-bold text-ink">5.8 mmol/L</div>
            <Badge variant="success" size="sm" className="mt-1">Fasting</Badge>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] text-ink-secondary font-medium">Pulse Rate</div>
            <div className="font-display text-xl font-bold text-ink">72 bpm</div>
            <Badge variant="info" size="sm" className="mt-1">Resting</Badge>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[12px] text-ink-secondary font-medium">Body Weight</div>
            <div className="font-display text-xl font-bold text-ink">68.0 kg</div>
            <Badge variant="neutral" size="sm" className="mt-1">BMI 22.4</Badge>
          </div>
        </Card>
      </div>

      {/* History Table */}
      <Card padding="none">
        <div className="p-4 sm:p-6 border-b border-rule">
          <h3 className="font-display font-bold text-lg text-ink">
            {lang === 'bn' ? 'সাম্প্রতিক পরিমাপের ইতিহাস' : 'Recent Measurements History'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-ground-muted text-ink-secondary border-b border-rule text-[12px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Blood Pressure</th>
                <th className="py-3 px-4">Glucose</th>
                <th className="py-3 px-4">Pulse</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/60 text-ink">
              {vitals.map((v) => (
                <tr key={v.id} className="hover:bg-ground-muted/40 transition-colors">
                  <td className="py-3.5 px-4 font-medium">{v.date}</td>
                  <td className="py-3.5 px-4">{v.bp}</td>
                  <td className="py-3.5 px-4">{v.sugar}</td>
                  <td className="py-3.5 px-4">{v.pulse}</td>
                  <td className="py-3.5 px-4">{v.weight}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success" size="sm">{v.status}</Badge>
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

