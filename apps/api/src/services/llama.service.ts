import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { LlamaChatPromptSchema } from '@medisheba/zod-schemas';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export class LlamaService {
  private apiUrl: string;
  private apiKey: string;
  private primaryModel: string;
  private fallbackModels: string[];

  constructor() {
    this.apiUrl = process.env.LLAMA_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    this.apiKey = process.env.LLAMA_API_KEY || '';
    this.primaryModel = process.env.LLAMA_MODEL || 'qwen/qwen3.8-27b';
    this.fallbackModels = [
      this.primaryModel,
      'qwen/qwen3.8-27b',
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'allam-2-7b'
    ];
  }

  async generateHealthAdvice(input: z.infer<typeof LlamaChatPromptSchema>) {
    const apiUrl = process.env.LLAMA_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const apiKey = process.env.LLAMA_API_KEY || '';
    const primaryModel = process.env.LLAMA_MODEL || 'qwen/qwen3.8-27b';

    const systemPrompt = input.lang === 'bn' 
      ? `আপনি "মেডিসেবা বিডি" (MediSheba BD)-এর এআই স্বাস্থ্য পরামর্শক। আপনি রোগীদের উপসর্গের ভিত্তিতে সাধারণ পরামর্শ, প্রাথমিক ফার্স্ট এইড ও কোন বিশেষজ্ঞ ডাক্তার দেখানো উচিত তা বাংলায় সুন্দরভাবে বুঝিয়ে বলবেন। কোনো প্রেসক্রিপশন লিখবেন না এবং সবসময় জরুরি অবস্থায় হাসপাতালে যাওয়ার পরামর্শ দিবেন।`
      : `You are the AI health assistant for "MediSheba BD". Provide clear, empathetic preliminary health guidance, suggest relevant medical specialties, and recommend hospital emergency services if symptoms appear critical. Do not prescribe controlled medications.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(input.history || []),
      { role: 'user', content: input.message }
    ];

    // Try primary and fallback models in order
    const modelsToTry = [
      primaryModel,
      'qwen/qwen3.8-27b',
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'allam-2-7b'
    ];

    for (const model of Array.from(new Set(modelsToTry))) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.6,
            max_tokens: 800
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          console.warn(`[AI Service] Model ${model} failed with ${response.status}: ${errText}`);
          continue; // Try next model
        }

        const data = (await response.json()) as any;
        const reply = data?.choices?.[0]?.message?.content;
        if (reply) {
          return { reply };
        }
      } catch (err: any) {
        console.warn(`[AI Service] Model ${model} network error:`, err.message);
        continue;
      }
    }

    // If all models failed
    return {
      reply: input.lang === 'bn'
        ? 'এআই সেবা সাময়িকভাবে অনুপলব্ধ রয়েছে। জরুরি প্রয়োজনে নিকটস্থ চিকিৎসকের পরামর্শ নিন।'
        : 'AI service is temporarily unavailable. Please seek emergency medical care if needed.'
    };
  }
}

export const llamaService = new LlamaService();
