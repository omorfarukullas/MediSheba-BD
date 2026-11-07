import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import { useLanguageStore } from '../../stores/language.store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Sparkles,
  Send,
  User,
  Bot,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  RefreshCw
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendedSpecialty?: string;
  urgencyLevel?: 'routine' | 'urgent' | 'emergency';
}

export function AiHealthAssistantView() {
  const { lang } = useLanguageStore();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: lang === 'bn'
        ? 'নমস্কার / আসসালামু আলাইকুম। আমি মেডিসেবা বিডি-এর এআই স্বাস্থ্য সহকারী। আপনার কী ধরনের শারীরিক অস্বস্তি বা লক্ষণ দেখা দিচ্ছে? সংক্ষেপে জানান, আমি প্রাথমিক পরামর্শ ও বিশেষজ্ঞ ডাক্তারের সুপারিশ করছি।'
        : 'Hello. I am the MediSheba BD AI Health Assistant. What symptoms or discomfort are you experiencing? Describe them briefly, and I will provide preliminary triage and recommend the right specialist.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [input, setInput] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const symptomPills = [
    {
      label: lang === 'bn' ? 'জ্বর ও শরীর ব্যথা' : 'Fever & Body Aches',
      prompt: lang === 'bn' ? 'আমার ৩ দিন ধরে ১০২ ডিগ্রি জ্বর ও শরীর প্রচণ্ড ব্যথা করছে। কী করা উচিত?' : 'I have had 102°F fever and severe body aches for 3 days. What should I do?'
    },
    {
      label: lang === 'bn' ? 'বুকে চাপ ও অস্বস্তি' : 'Chest Pressure',
      prompt: lang === 'bn' ? 'হাঁটাহাটি করলে বুকের মাঝে ভারি চাপ ও অস্বস্তি অনুভূত হয়। কোন ডাক্তার দেখাবো?' : 'I feel heavy tightness and pressure in my chest when walking. Which doctor should I visit?'
    },
    {
      label: lang === 'bn' ? 'মাথাব্যথা ও চোখে চাপ' : 'Severe Headache',
      prompt: lang === 'bn' ? 'সকাল থেকে তীব্র একপাশের মাথাব্যথা এবং আলোতে তাকাতে সমস্যা হচ্ছে।' : 'Severe one-sided throbbing headache with light sensitivity since morning.'
    },
    {
      label: lang === 'bn' ? 'পেটে গ্যাস ও বুকজ্বালা' : 'Acidity & Indigestion',
      prompt: lang === 'bn' ? 'খাওয়ার পর পেট ফাঁপা ও তীব্র বুকজ্বালা অনুভূত হয়। কীভাবে উপশম পাবো?' : 'Severe acidity, heartburn, and bloating after eating.'
    },
  ];

  const aiChatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      const replyText = data.reply;
      const lower = replyText.toLowerCase();

      // Extract specialty recommendation if present
      let spec: string | undefined;
      if (lower.includes('cardio') || lower.includes('হৃদরোগ') || lower.includes('হার্ট')) spec = 'Cardiology';
      else if (lower.includes('medicine') || lower.includes('মেডিসিন')) spec = 'Internal Medicine';
      else if (lower.includes('ortho') || lower.includes('অর্থোপেডিক') || lower.includes('হাড়')) spec = 'Orthopedics';
      else if (lower.includes('pediatric') || lower.includes('শিশু')) spec = 'Pediatrics';
      else if (lower.includes('gastro') || lower.includes('গ্যাস্ট্র')) spec = 'Gastroenterology';

      const assistantMsg: ChatMessage = {
        id: String(Date.now()),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedSpecialty: spec
      };
      setMessages((prev) => [...prev, assistantMsg]);
    },
    onError: (err) => {
      const errorMsg: ChatMessage = {
        id: String(Date.now()),
        role: 'assistant',
        content: lang === 'bn'
          ? 'দুঃখিত, সংযোগে সমস্যা হচ্ছে। আপনার নিকটস্থ চিকিৎসকের পরামর্শ নিন অথবা জরুরি প্রয়োজনে ৯৯৯ নম্বরে যোগাযোগ করুন।'
          : 'Unable to connect to AI engine. Please consult your physician or call 999 in case of emergency.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  });

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || aiChatMutation.isPending) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    aiChatMutation.mutate({
      message: messageText.trim(),
      history: newHistory,
      lang: lang === 'bn' ? 'bn' : 'en'
    });
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, aiChatMutation.isPending]);

  return (
    <div className="space-y-6">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="eyebrow flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#0f3e17]" />
            <span>{lang === 'bn' ? 'স্মার্ট ক্লিনিকাল ট্রায়াজ' : 'CLINICAL TRIAGE ASSISTANT'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-[30px] font-light text-[#0f3e17] tracking-tight">
            {lang === 'bn' ? 'এআই লক্ষণ পরীক্ষক ও স্বাস্থ্য পরামর্শ' : 'AI Symptom Checker & Health Triage'}
          </h2>
          <p className="text-[14px] text-[#222222]/70">
            {lang === 'bn'
              ? 'আপনার উপসর্গ বিশ্লেষণ করে প্রাথমিক ধারণা ও সঠিক বিশেষজ্ঞ ডাক্তারের কাছে যাওয়ার গাইড প্রদান করে।'
              : 'Empathetic clinical guidance powered by Llama 3.3 to guide you to the right physician.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="accent" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            {lang === 'bn' ? 'নিরাপদ ও গোপনীয়' : 'Confidential'}
          </Badge>
        </div>
      </div>

      {/* ─── Main Interface Container: Slate Hush Panel (Ease Health) ─── */}
      <div className="rounded-[14px] bg-[#b6ced5] p-4 sm:p-6 space-y-4">
        {/* Quick Symptom Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="eyebrow text-[10px] font-semibold uppercase tracking-wider text-[#0f3e17] shrink-0">
            {lang === 'bn' ? 'দ্রুত বাছাই:' : 'Quick Select:'}
          </span>
          {symptomPills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(pill.prompt)}
              disabled={aiChatMutation.isPending}
              className="h-8 px-3 rounded-full text-xs font-medium bg-[#fffefc] text-[#0f3e17] hover:bg-[#e1f4df] border border-transparent whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              + {pill.label}
            </button>
          ))}
        </div>

        {/* Floating Chat Container (Cream Paper) */}
        <div className="rounded-[14px] bg-[#fffefc] border border-transparent p-5 sm:p-7 flex flex-col h-[460px] justify-between space-y-4">
          {/* Scrollable Message Well */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-[7px] shrink-0 flex items-center justify-center text-xs ${
                      isAssistant
                        ? 'bg-[#0f3e17] text-[#fffefc]'
                        : 'bg-[#e1f4df] text-[#0f3e17]'
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1.5">
                    <div
                      className={`p-4 rounded-[14px] text-[14px] leading-relaxed ${
                        isAssistant
                          ? 'bg-[#f9fbf8] border border-[#efeeeb] text-[#222222]'
                          : 'bg-[#0f3e17] text-[#fffefc]'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {msg.recommendedSpecialty && (
                        <div className="mt-3 pt-3 border-t border-[#efeeeb] flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-[#0f3e17]">
                            <Stethoscope className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'সুপারিশকৃত বিশেষজ্ঞ:' : 'Suggested Specialist:'} <strong>{msg.recommendedSpecialty}</strong></span>
                          </div>
                          <Link to="/patient/doctors">
                            <Button variant="secondary" size="sm">
                              <span>{lang === 'bn' ? 'ডাক্তার অ্যাপয়েন্টমেন্ট' : 'Book Specialist'}</span>
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                    <div
                      className={`text-[10px] text-[#222222]/50 px-1 ${
                        isAssistant ? 'text-left' : 'text-right'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {aiChatMutation.isPending && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-[7px] shrink-0 bg-[#0f3e17] text-[#fffefc] flex items-center justify-center text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-[14px] bg-[#f9fbf8] border border-[#efeeeb] text-[13px] text-[#222222]/70 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0f3e17]" />
                  <span>{lang === 'bn' ? 'উপসর্গ পর্যালোচনা ও বিশ্লেষণ করা হচ্ছে...' : 'Analyzing symptoms & preparing clinical guidance...'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="pt-3 border-t border-[#efeeeb]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'আপনার লক্ষণ বা স্বাস্থ্য সমস্যা লিখুন (যেমন: ২ দিন ধরে তীব্র কাশি...)'
                    : 'Describe your symptoms (e.g. Sharp abdominal pain since morning...)'
                }
                disabled={aiChatMutation.isPending}
                className="flex-1 h-12 px-4 rounded-[14px] border border-[#efeeeb] bg-[#fffefc] text-[14px] text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#0f3e17] disabled:bg-[#f9fbf8]"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!input.trim() || aiChatMutation.isPending}
                leftIcon={<Send className="w-4 h-4 text-[#fffefc]" />}
              >
                <span>{lang === 'bn' ? 'পরামর্শ নিন' : 'Consult AI'}</span>
              </Button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-[#222222]/60 pt-2 px-1">
              <span>{lang === 'bn' ? 'সাধারণ তথ্যের উদ্দেশ্যে প্রস্তুতকৃত। জরুরি প্রয়োজনে ৯৯৯ নম্বরে কল করুন।' : 'Informational guidance only. For medical emergencies, call 999.'}</span>
              <span className="hidden sm:inline font-mono">Llama 3.3 Clinical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
