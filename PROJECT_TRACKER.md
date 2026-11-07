# 🏥 MediSheba BD — Live Project Tracker

> **Last Updated:** 2026-11-07  
> **Status:** 🟢 UI Design System v2.1 Overhaul Complete · Healthcare Minimal & Bilingual (English ⇄ বাংলা)  
> **Architecture:** Turbo monorepo · Express 5 + tRPC · Socket.io · Supabase PostgreSQL + Prisma 6 · React 18 + Vite 6 + Tailwind CSS

---

## 🎯 Progress Overview

```
Phase 0: Foundation, Realtime & Schema   [██████████] 100% (Completed)
Phase 1: Patient Core Features            [██████████] 100% (Completed)
Phase 2: Doctor Experience & Queue        [██████████] 100% (Completed)
Phase 3: Hospital Admin & Fleet           [██████████] 100% (Completed)
Phase 4: Telemedicine & WebRTC Signals    [██████████] 100% (Completed)
Phase 5: UI Design System v2.1 Redesign   [██████████] 100% (Completed)
```

---

## 🎨 Phase 5: UI Design System v2.1 — Healthcare Minimal & Bilingual (100% Complete)

### 1. Typography & Tokens
- [x] **Font Stack**: Configured Google Fonts `Inter (400, 500, 600)` and `Noto Sans Bengali (400, 500, 600)`. Removed script fonts (`Caveat`, `Nanum Pen Script`).
- [x] **Strict Bangla Typography Rules**: `:lang(bn)` overrides with `letter-spacing: 0 !important; text-transform: none !important; font-weight: <= 600; line-height: 1.7;`.
- [x] **Single Accent Color**: `#3b5bdb` (hover `#2f4bc0`, tint `#eef2ff`). Zero pastels, zero orange/purple/lime card backgrounds.
- [x] **Zero-Shadow Policy**: Reset `box-shadow: none !important;` globally. Depth achieved exclusively through `1px solid #e7e5e4` hairline borders and `#ffffff` vs `#f7f7f5` / `#f4f4f2` surfaces.
- [x] **Accessible Focus Ring**: `2px solid #3b5bdb; outline-offset: 2px;` on all interactive controls.

### 2. Bilingual Localization Infrastructure
- [x] **Flat Dot-Notated Keys**: Synchronized `apps/web/src/locales/en/translation.json` and `bn/translation.json` with keys (`nav.*`, `groups.*`, `action.*`, `status.*`, `patient.*`, `appt.*`, `emergency.*`, etc.).
- [x] **LanguageToggle Control**: `[ EN | বাংলা ]` segmented button with `32px` height, `56px` min width, `Alt + L` shortcut, `aria-live` announcement, and automatic `<html lang>` sync without page reloading.

### 3. Core UI Primitives Overhauled
- [x] `Button.tsx`: Heights 40px (default/md) and 32px (compact/sm). Radius 8px. Variants: `primary` (#3b5bdb), `secondary` (white with border), `ghost`, `danger`.
- [x] `Card.tsx`: Radius 12px, border `1px solid #e7e5e4`, no shadow, white background. Added `StatCard` helper.
- [x] `Badge.tsx`: Pill 9999px radius, icon support, standard status mapping (`success`, `warning`, `danger`, `accent`, `neutral`).
- [x] `Input.tsx`: 40px height, 8px radius, border `1px solid #e7e5e4`, focus outline `2px solid #3b5bdb`, visible labels and helper texts.
- [x] `Modal.tsx`: 12px radius, hairline border, backdrop `rgba(0,0,0,0.4)` blur.
- [x] `AlertBanner.tsx`: Clinical safety alert banner (`danger` for allergies/conflicts, `warning`, `success`, `info`).
- [x] `EmptyState.tsx`, `Skeleton.tsx`, `StatusDot.tsx`, `Avatar.tsx`: Converted to v2.1 token standards.

### 4. Layout Shells & Navigation
- [x] `PatientLayout.tsx`: 240px sidebar (`#f7f7f5`, `1px solid #e7e5e4`), `+ Book appointment` full-width primary button, grouped Workspace and Care sections, bottom emergency hotline callout + user row with sign out.
- [x] `DoctorLayout.tsx`: Quick action `+ New prescription`, Workspace and Care sections, 56px top bar with breadcrumb and `LanguageToggle`.
- [x] `AdminLayout.tsx` & `SuperAdminLayout.tsx`: Streamlined navigation with maximum 6 items, active item tint `#eef2ff`, and top bar `LanguageToggle`.

### 5. Application Views Redesigned
- [x] **Landing Page (`/`)**: Calm clinic desk presentation, next appointment card, 4 identical stat cards, 999 emergency banner.
- [x] **Auth Pages (`/login`, `/register`, `/onboarding`)**: Centered 400px white card, `LanguageToggle` in top-right, emergency caption note.
- [x] **Patient Dashboard (`/patient/dashboard`)**: Single primary button `[ Book appointment ]`, upcoming schedule block with token status, 4 identical stat cards, recent prescriptions and latest records previews.
- [x] **Specialist Directory & Booking (`/patient/doctors`)**: Search field with `/` shortcut, department chips, 3-step side drawer/modal stepper (`Step 1 of 3 ●○○`, week strip starting Saturday, slot grid).
- [x] **Live Queue Tracker (`/patient/appointments`)**: Live Socket.io token feed, Now Serving number, estimated arrival wait timer, queue board.
- [x] **Health Vitals Log (`/patient/vitals`)**: 4 identical stat cards (BP, Pulse, Sugar, Weight), add reading form, measurements table.
- [x] **Medical Record Vault (`/patient/documents`)**: Privacy-first file manager with `Doctor Access` vs `Only Me` toggle, upload modal, filter chips.
- [x] **Hospital Bed & Test Transparency (`/patient/resources`)**: Real-time bed occupancy, government cap vs private diagnostic test prices, ready ambulance fleets.
- [x] **Emergency 999 Dispatch (`/emergency`)**: Danger alert banner, direct 999 telephone callout, GPS coordinates auto-detection, no-login ambulance dispatch.
- [x] **Telemedicine Room (`/patient/telemedicine`)**: Clean WebRTC video canvas with encrypted room status, in-call controls, side chat panel.
- [x] **Doctor Chamber Desk (`/doctor/dashboard`)**: Chamber queue advance actions (Call Next, Start Visit, Complete), appointment schedule, visiting hours configuration, digital prescription generator with print preview.
- [x] **Hospital Admin Desk (`/admin/dashboard`)**: Bed category management, on-duty ambulance fleet controls, diagnostic catalog manager.
- [x] **Super Admin Console (`/super-admin/dashboard`)**: Nationwide platform monitoring, hospital approvals table, system audit logs.

---

## 🔍 Verification & Build Results
- **TypeScript**: `npm run typecheck --workspace=@medisheba/web` → `0 errors`
- **Vite Production Build**: `npm run build --workspace=@medisheba/web` → `✓ built in 11.70s`
- **Dist Assets**: `dist/index.html (0.79 kB)`, `dist/assets/index-kJFYSgdk.css (31.55 kB)`, `dist/assets/index-DI_SUvw8.js (735.44 kB)`
