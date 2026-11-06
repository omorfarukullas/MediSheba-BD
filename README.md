# 🏥 MediSheba BD (মেডিসেবা বিডি)
> A modern healthcare cloud platform for Bangladesh — featuring real-time doctor chamber queue tracking, BMDC verified physician directory, hospital bed availability, open-source Llama clinical triage, and instant slot reservations.

---

## ⚡ Quick Start

### 1. Requirements
- Node.js 22 LTS or newer
- Free [Supabase](https://supabase.com) account (PostgreSQL)
- Free [Firebase](https://console.firebase.google.com) project (Auth)

### 2. Follow Setup Guide
Read the step-by-step setup guide at:
👉 **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

### 3. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Push Database & Seed
```bash
# Push tables to Supabase
npm run prisma:migrate --workspace=@medisheba/api

# Populate Bangladesh hospitals & doctors
npm run prisma:seed --workspace=@medisheba/api
```

### 5. Run Development Servers
```bash
# Start backend API (http://localhost:5000)
npm run dev --workspace=@medisheba/api

# Start web frontend (http://localhost:3000)
npm run dev --workspace=@medisheba/web
```

---

## 🏗️ Architecture

- **Frontend:** React 18 + Vite 6 + Tailwind CSS (Software Design System: Host Grotesk + Instrument Sans)
- **Backend:** Node.js 22 + Express 5 + tRPC (Type-Safe RPC)
- **Database:** Supabase (Hosted PostgreSQL) via Prisma 6 ORM
- **Authentication:** Firebase Auth (Google OAuth & Email)
- **AI Health Assistant:** Open-source Llama 3.3 (70B) via Groq Cloud / Ollama
- **Translations:** 1-Click Bengali (বাংলা) / English toggle powered by Zustand
