# UI Design System v2.1 — Healthcare, Minimal & Bilingual (English ⇄ বাংলা)

> **Design Persona:** A calm, clean clinic desk. White canvas, ink-black text, hairline borders, **one** blue accent. Nothing decorative. Every page does one job, health alerts are impossible to miss, and the whole interface switches between English and Bangla with **one click**.

**Theme:** Light only (dark mode is a later phase)
**Target Environment:** Antigravity IDE / Web Application
**Product:** Healthcare system — patients, doctors, and reception/admin staff.
**Version:** 2.1 (healthcare pages; replaces the 7shifts-inspired v1)

### Assumptions (delete or change what does not match your system)

- **Roles:** Patient · Doctor · Reception/Admin.
- **Modules:** Appointments, Patients, Prescriptions, Medical Records, Billing.
- Only **Section 9** (pages), the sidebar names in **Section 5**, and the strings in **Section 6.6** are system-specific. Everything else works for any system.

---

## 0. How to Use This File (for Antigravity / Gemini Flash)

1. Save this file in the repo root as `UI_DESIGN.md`.
2. Build **one page or one component per prompt**. Start every prompt with: *"Follow UI_DESIGN.md strictly."*
3. Use the prompts in **Section 14**, in the order in **Section 16**.
4. After each step, open the page in **both languages** and check it against the QA list in Section 16.

### Hard Rules (never break)

1. **One accent color only:** `#3b5bdb`. No orange, lime, purple, or pastel cards.
2. **No box-shadows.** Use `1px` borders and white vs. soft-gray surfaces.
3. **One primary button per page** (in the content area). The sidebar quick-action button does not count.
4. **No hard-coded text in components.** Every string comes from `t('key')`.
5. **Bangla text:** letter-spacing is always `0`, never uppercase, never heavier than weight `600`.
6. **Language toggle** is always visible in the top bar, on every page.
7. **No decorative fonts, no animations** except `150–200ms` color/width transitions.
8. Status colors (red / green / amber) are used **only** for statuses and clinical alerts, always with an icon + text. Red is reserved for allergies, drug conflicts, and overdue items.
9. Maximum **6 items** in the sidebar. Maximum **2 sections** of content above the fold.
10. Every page must have: title, one-line description, content, and designed empty / loading / error states.

---

## 1. Design Principles

| # | Principle | What it means in practice |
|---|-----------|---------------------------|
| 1 | **One screen, one job** | Each page answers one question. Extra things go behind "Show details". |
| 2 | **One color** | Blue shows what you can click or where you are. Everything else is gray, black, white. |
| 3 | **One click language** | EN ⇄ বাংলা in the top bar. No menus, no reload, no lost work. |
| 4 | **Safe by design** | Allergies, conflicts, and overdue items are always visible, never hidden in a tab. |
| 5 | **Fast for busy people** | Search first, smart defaults, keyboard shortcuts. A patient books in 3 steps; a doctor writes a prescription without leaving one page. |
| 6 | **Calm and private** | No alarming red unless needed. Sensitive data is masked and never put in URLs. |

---

## 2. Tokens — Colors

### Neutrals & Accent

| Name | Value | Token | Role |
|------|-------|-------|------|
| **Canvas** | `#ffffff` | `--color-canvas` | Main page background, cards, inputs. |
| **Sidebar** | `#f7f7f5` | `--color-sidebar` | NavSidebar surface only. |
| **Subtle** | `#f4f4f2` | `--color-subtle` | Hover fills, table header, language-toggle track, skeletons. |
| **Border** | `#e7e5e4` | `--color-border` | All `1px` borders: cards, inputs, table rows, dividers. |
| **Border Strong** | `#d6d3d1` | `--color-border-strong` | Secondary button border, active toggle segment, dashed upload zone. |
| **Ink** | `#111111` | `--color-ink` | Headings, primary text. |
| **Text 2** | `#57534e` | `--color-text-2` | Body text, inactive sidebar items. |
| **Text 3** | `#78716c` | `--color-text-3` | Helper text, captions, placeholders, table header. |
| **Accent** | `#3b5bdb` | `--color-accent` | Primary button, active nav item, focus ring, links, active tab underline. |
| **Accent Hover** | `#2f4bc0` | `--color-accent-hover` | Hover on primary button. |
| **Accent Tint** | `#eef2ff` | `--color-accent-tint` | Active nav item background, selected row, selected time slot. |

> The accent is slightly darker than v1 (`#4570ff`) so white text on it passes WCAG AA (≥ 4.5:1).

### Status Colors (statuses & clinical alerts only)

| Meaning | Text | Background | Border | Token prefix |
|---------|------|------------|--------|--------------|
| **Danger** — allergy, drug conflict, overdue | `#b42318` | `#fef3f2` | `#fecdca` | `--color-danger-*` |
| **Success** — confirmed, paid, normal | `#067647` | `#ecfdf3` | `#abefc6` | `--color-success-*` |
| **Warning** — pending, due soon, check | `#b54708` | `#fffaeb` | `#fedf89` | `--color-warning-*` |

### Status Map (use exactly this)

| Item | Status | Badge style |
|------|--------|-------------|
| Appointment | Scheduled | Neutral + clock icon |
| Appointment | Confirmed | Success + ✓ |
| Appointment | Pending | Warning + ◔ |
| Appointment | Completed | Neutral + ✓ |
| Appointment | Cancelled | Neutral + ✕ (not red, to keep the screen calm) |
| Invoice | Paid | Success + ✓ |
| Invoice | Due / Partial | Warning + ◔ |
| Invoice | Overdue | Danger + ! |
| Allergy / drug conflict | Alert | Danger banner + ! |

### Color Budget (per screen)

- Neutrals: everything by default.
- Accent: **at most 3 places** (active nav item, primary button, one link or focus ring).
- Status colors: only inside badges, alert banners, and the one value they describe.

---

## 3. Tokens — Typography

### Font Families

| Token | Stack | Used for |
|-------|-------|----------|
| `--font-sans` | `'Inter', 'Noto Sans Bengali', 'Hind Siliguri', ui-sans-serif, system-ui, sans-serif` | English UI |
| `--font-bn` | `'Noto Sans Bengali', 'Hind Siliguri', 'Kalpurush', 'Inter', ui-sans-serif, system-ui, sans-serif` | Bangla UI (applied by `:lang(bn)`) |

Load from Google Fonts with `display=swap`:
`Inter: 400, 500, 600` and `Noto Sans Bengali: 400, 500, 600`.

> **Removed from v1:** `Nanum Pen Script` (hand-drawn underline). No script fonts anywhere.

### Type Scale

| Role | EN size | BN size | Weight | Line height EN / BN | Token |
|------|---------|---------|--------|---------------------|-------|
| **Caption** | `12px` | `13px` | 400 / 500 | `1.4` / `1.6` | `--text-caption` |
| **Body** | `14px` | `15px` | 400 / 500 | `1.5` / `1.7` | `--text-body` |
| **Body Large** | `16px` | `17px` | 400 / 500 | `1.5` / `1.7` | `--text-body-lg` |
| **Title** | `20px` | `21px` | 600 | `1.4` / `1.6` | `--text-title` |
| **Heading (page H1)** | `28px` | `28px` | 600 | `1.25` / `1.45` | `--text-heading` |
| **Stat number** | `28px` | `28px` | 600 | `1.2` | `--text-stat` |

Only these 3 weights exist: **400** (body), **500** (buttons, nav, labels), **600** (titles, numbers).

### Bangla Typography Rules

1. `letter-spacing: 0` always. Negative or positive tracking breaks Bangla conjuncts (যুক্তাক্ষর).
2. `text-transform: none` always. Bangla has no uppercase.
3. Small "eyebrow" labels: English = `11px`, uppercase, `+0.04em`. Bangla = `12px`, normal case, no tracking.
4. Never use italic for Bangla. Never go above weight `600`.
5. Use `overflow-wrap: anywhere` on user-generated text (long names, notes, URLs), and `word-break: normal`.
6. Allow Bangla labels to be up to **30% wider** than English. Never set fixed widths on buttons or tabs.

```css
:lang(bn) {
  font-family: var(--font-bn);
  letter-spacing: 0;
  text-transform: none;
  font-feature-settings: "kern" 1;
}
:lang(bn) body, body:lang(bn) { line-height: 1.7; font-size: 15px; }
```

---

## 4. Tokens — Spacing, Shape & Layout

**Base unit:** `4px` | **Density:** Comfortable (staff use tablets and desktops) | **Shadows:** none

### Spacing Scale
`4` · `8` · `12` · `16` · `24` · `32` · `48` · `64` (px). Tokens: `--space-1` … `--space-8`.

### Radius
| Element | Value | Token |
|---------|-------|-------|
| Buttons, inputs, nav items, square badges | `8px` | `--radius-sm` |
| Cards, tables, dialogs, drawers, banners | `12px` | `--radius-md` |
| Pills (status badges, chips) | `9999px` | `--radius-pill` |

### Borders & Focus
- All borders: `1px solid var(--color-border)`.
- **Focus ring (all controls):** `outline: 2px solid var(--color-accent); outline-offset: 2px;` (an outline, not a shadow).

### Motion
- Hover/color: `150ms ease-out`. Sidebar collapse: `200ms ease-out`.
- Respect `prefers-reduced-motion: reduce` (turn all transitions off).

### Layout Dimensions
| Item | Value |
|------|-------|
| Sidebar | `240px` expanded · `64px` collapsed · `280px` mobile drawer |
| Top bar | `56px` high |
| Content max-width | `1120px`, centered |
| Page padding | `32px` desktop · `24px` tablet · `16px` mobile |
| Gap between sections | `24px` |
| Card padding | `20px` (mobile) · `24px` (desktop) |
| Element gap | `8px–12px` |

---

## 5. App Shell — NavSidebar + Top Bar

```
┌───────────┬──────────────────────────────────────────────────┐
│ Sidebar   │ Top bar:  ☰  Breadcrumb          [EN|বাংলা]  (AV) │
│ 240px     ├──────────────────────────────────────────────────┤
│           │  Page content (max 1120px)                       │
│           │                                                  │
└───────────┴──────────────────────────────────────────────────┘
```

### NavSidebar

- **Surface:** `--color-sidebar` with `1px` right border. Padding `16px`.
- **Order (top → bottom):**
  1. **Brand:** logo mark (`28px` square, ink-black, white letter) + system name (`16px`, 600). No workspace switcher.
  2. **Quick action** (full-width Primary button, `40px`), by role:
     - Patient / Reception → **"+ Book appointment"**
     - Doctor → **"+ New prescription"**
  3. **Group "Workspace":** Dashboard · Appointments
  4. **Group "Care":** Patients · Prescriptions · Records
  5. **Group "Admin":** Billing
  6. **Bottom zone** (pinned): Help · Settings · User row (avatar initials `32px`, name, role caption, collapse button).
- **Removed from v1:** black promo card, orange badges, "7s" workspace switcher.

### Items by Role (hide what the role cannot use; never show disabled items)

| Item | Patient | Doctor | Reception / Admin |
|------|:------:|:------:|:-----------------:|
| Dashboard | ✓ | ✓ | ✓ |
| Appointments | ✓ (own) | ✓ (own schedule) | ✓ (all) |
| Patients | — | ✓ | ✓ |
| Prescriptions | ✓ (own, read-only) | ✓ (create) | ✓ (read) |
| Records | ✓ (own) | ✓ | ✓ |
| Billing | ✓ (own invoices) | — | ✓ |

### NavItem

| State | Spec |
|-------|------|
| **Size** | Height `40px`, padding `0 12px`, gap `12px`, radius `8px`. Icon `18px` (Lucide, stroke `1.75`), label `14px` (BN `15px`). |
| **Default** | Transparent, text/icon `--color-text-2`, weight 400. |
| **Hover** | `--color-subtle` fill, `--color-ink` text. |
| **Active** | `--color-accent-tint` fill, `--color-accent` text + icon, weight 500. `aria-current="page"`. |
| **Count badge** | Neutral pill only: `--color-subtle` bg, `--color-text-3` text, `12px` (e.g., today's appointments). Never colored. |
| **Group label** | EN: `11px`, uppercase, 600, `--color-text-3`, `+0.04em`. BN: `12px`, normal case, tracking `0`. Padding `16px 12px 6px`. |

### Collapsed (64px) & Responsive
- **Desktop ≥ 1024px:** expanded by default; collapse button in user row; state saved in `localStorage`.
- **Tablet 640–1023px:** collapsed rail (icons only). Tooltip with the label on hover/focus.
- **Mobile < 640px:** off-canvas drawer (`280px`) over `rgba(0,0,0,0.4)` backdrop, opened by ☰ in the top bar. Closes on item click, backdrop click, or `Esc`.
- Collapsed items must keep `aria-label` with the translated name.

### Top Bar
- Height `56px`, white, `1px` bottom border.
- **Left:** ☰ button (mobile/tablet) or collapse toggle (desktop) + breadcrumb (`14px`, `--color-text-3`; current page in `--color-ink`).
- **Right:** **LanguageToggle** → avatar button (menu: Settings, Sign out).
- The page title (H1) lives **inside the content area**, not in the top bar.
- Do not show patient names or other personal data in the top bar breadcrumb of shared screens (use "Patient profile").

---

## 6. One-Click Language System (English ⇄ বাংলা)

### 6.1 LanguageToggle Component

- **Look:** Segmented control, track `--color-subtle`, radius `8px`, padding `2px`. Two buttons: **`EN`** and **`বাংলা`**.
- **Segment:** height `32px`, min-width `56px`, padding `0 12px`, `13px` weight 500.
- **Active segment:** white fill, `--color-ink` text, `1px solid --color-border-strong`.
- **Inactive segment:** transparent, `--color-text-2`; hover → `--color-ink`.
- **Position:** top bar, right side, **left of** the avatar. On the Sign-in page: top-right corner.

### 6.2 Behavior (must all be true)

| # | Rule |
|---|------|
| 1 | **One click.** Clicking the other segment switches the whole UI instantly. Never hidden in a menu or in Settings only. |
| 2 | **No reload, no navigation.** The URL, scroll position, typed text, selected doctor/time slot, filters, and sidebar state all stay the same. |
| 3 | **Remembered.** Save to `localStorage['ui-lang']` (and to the user profile after sign-in). |
| 4 | **Smart first visit.** If `navigator.languages` starts with `bn` → Bangla; otherwise English. |
| 5 | **`<html lang>` updates** to `en` or `bn`, so fonts, line height, and screen readers follow. |
| 6 | **Keyboard:** Tab to focus → `←` `→` or `Enter`/`Space` to switch. Global shortcut: `Alt + L`. |
| 7 | **Screen-reader message** (`aria-live="polite"`): "Language changed to English" / "ভাষা বাংলায় পরিবর্তিত হয়েছে". |
| 8 | **Fallback.** Missing Bangla key → show the English text and `console.warn` in development. |
| 9 | **Layout safe.** No fixed-width text containers; test every page in both languages. |
| 10 | **Both toggle labels are always shown in their own script** (`EN`, `বাংলা`) so a user who cannot read the current language can still find it. |

### 6.3 What Gets Translated

| Translate | Do NOT translate |
|-----------|------------------|
| Navigation, buttons, labels, placeholders | Patient and doctor names |
| Page titles and descriptions | Medicine names (brand/generic) and strengths (`500 mg`) |
| Statuses (Confirmed, Paid…), department names | Diagnosis, notes, and advice typed by staff |
| Empty, loading, error states, toasts, dialogs | IDs (patient ID, invoice no.), phone numbers |
| Dates, times, numbers (via `Intl`) | Standard abbreviations: BP, BMI, SpO₂, mg, ml |
| Allergy / conflict alert messages | |

### 6.4 Number, Date & Dose Formatting

- Use `Intl.NumberFormat(locale)` and `Intl.DateTimeFormat(locale)`; locales are `en-US` and `bn-BD`.
- **Default:** Latin digits in both languages (easier to scan in tables), e.g. `bn-BD-u-nu-latn`.
- **Setting (Settings page):** "Use Bangla digits (০–৯)" switch → uses plain `bn-BD`.
- **Time:** 12-hour clock with AM/PM (e.g., `10:30 AM`).
- **Calendar:** week starts on **Saturday** by default (Bangladesh convention); make it a setting.
- **Dose notation:** `1+0+1` = Morning + Noon + Night. Show a small legend under the field. With Bangla digits on: `১+০+১`.

### 6.5 Translation File Rules

- Files: `/locales/en.json` and `/locales/bn.json`. **Flat keys**, dot-named: `nav.appointments`, `appt.confirm`.
- Both files must have **exactly the same keys** (add a CI/test script that compares them).
- Keys describe meaning, not text: `status.confirmed`, not `green_label`.
- Use short, plain Bangla (সহজ ভাষা). Prefer common words; keep well-known words in Bangla script when natural (অ্যাপয়েন্টমেন্ট, প্রেসক্রিপশন, ড্যাশবোর্ড).
- Medical wording in Bangla should be reviewed by a doctor or nurse before release.

### 6.6 Core Strings (starter set)

| Key | English | বাংলা |
|-----|---------|-------|
| `nav.dashboard` | Dashboard | ড্যাশবোর্ড |
| `nav.appointments` | Appointments | অ্যাপয়েন্টমেন্ট |
| `nav.patients` | Patients | রোগী |
| `nav.prescriptions` | Prescriptions | প্রেসক্রিপশন |
| `nav.records` | Records | মেডিকেল রেকর্ড |
| `nav.billing` | Billing | বিল |
| `nav.settings` | Settings | সেটিংস |
| `nav.help` | Help | সহায়তা |
| `action.book` | Book appointment | অ্যাপয়েন্টমেন্ট বুক করুন |
| `action.newRx` | New prescription | নতুন প্রেসক্রিপশন |
| `action.save` | Save | সংরক্ষণ করুন |
| `action.saveprint` | Save & print | সংরক্ষণ ও প্রিন্ট |
| `action.cancel` | Cancel | বাতিল করুন |
| `action.confirm` | Confirm | নিশ্চিত করুন |
| `search.placeholder` | Search by name, phone or ID | নাম, ফোন বা আইডি দিয়ে খুঁজুন |
| `status.scheduled` | Scheduled | নির্ধারিত |
| `status.confirmed` | Confirmed | নিশ্চিত |
| `status.pending` | Pending | অপেক্ষমাণ |
| `status.completed` | Completed | সম্পন্ন |
| `status.cancelled` | Cancelled | বাতিল |
| `bill.paid` | Paid | পরিশোধিত |
| `bill.due` | Due | বাকি |
| `appt.doctor` | Doctor | ডাক্তার |
| `appt.department` | Department | বিভাগ |
| `appt.date` | Date | তারিখ |
| `appt.time` | Time | সময় |
| `patient.allergies` | Allergies | অ্যালার্জি |
| `patient.age` | Age | বয়স |
| `rx.dose` | Dose | ডোজ |
| `rx.duration` | Duration | মেয়াদ |
| `rx.instructions` | Instructions | নির্দেশনা |
| `empty.appointments` | No appointments yet | এখনও কোনো অ্যাপয়েন্টমেন্ট নেই |
| `error.generic` | Something went wrong. Try again. | কিছু ভুল হয়েছে। আবার চেষ্টা করুন। |
| `emergency.note` | In an emergency, call 999. | জরুরি অবস্থায় ৯৯৯ নম্বরে কল করুন। |
| `lang.label` | Language | ভাষা |

---

## 7. Core UI Components

### Buttons (height `40px`, compact `32px`, radius `8px`, no shadow)
| Type | Spec |
|------|------|
| **Primary** | `--color-accent` fill, white text, weight 500, padding `0 16px`. Hover `--color-accent-hover`. **One per page.** |
| **Secondary** | White fill, `1px solid --color-border-strong`, `--color-ink` text. Hover `--color-subtle`. |
| **Ghost** | Transparent, `--color-text-2` text. Hover `--color-subtle` + ink text. |
| **Danger** | White fill, `--color-danger-text` text + border. Only inside a destructive confirm (e.g., cancel appointment, delete record). |
| **Disabled** | `--color-subtle` fill, `--color-text-3` text, `cursor: not-allowed`. |
| **Loading** | Small spinner on the left; label stays; width does not change. |

### Cards
White, `1px` border, `12px` radius, padding `20–24px`, **no shadow, no colored fills**. Cards never contain other cards.
**Stat card:** label (`12px`, text-3) above number (`28px`, 600) with a one-line caption (date or unit). All stat cards look identical (no rotating pastels).

### Inputs
- Height `40px`, white, `1px` border, radius `8px`, padding `0 12px`, `14px` text; placeholder `--color-text-3`.
- Focus: `2px` accent outline. Label **above** the field (`14px`, 500). Helper `12px` text-3.
- **Error:** border `--color-danger-text`, message below with an icon + text (never color only).
- **Search input:** leading search icon, `/` focuses it, clear (✕) button when filled.
- **Autocomplete (doctor, medicine, patient):** dropdown with `1px` border, `12px` radius, max 6 results, arrow keys + `Enter`.
- **Textarea:** min-height `96px`, grows to `240px`.

### Tabs & Segmented Control
- **Page tabs:** underline style, inactive `--color-text-3`, active `--color-ink` weight 500 with `2px` accent underline.
- **Segmented (language, date range):** same pattern as LanguageToggle (6.1).

### Badges & Chips
Pill, `12px`, weight 500, padding `2px 10px`.
- Neutral: `--color-subtle` bg, `--color-text-2` text.
- Status: use the **Status Map** (Section 2). Always icon + word.
- Department filter chips: neutral; selected = `--color-accent-tint` bg + `--color-accent` text.

### Alert Banner (clinical safety)
Full width inside the page or card, `12px` radius, `1px` status border, status background, icon `18px`, text `14px` weight 500, optional action link on the right.
- **Allergy banner:** Danger style. Always visible at the top of the patient profile and prescription form. **Not dismissible.**
- **Drug-conflict warning:** Danger style, appears inline under the medicine row; requires an explicit "Save anyway" confirmation.
- **Info / reminder:** Neutral style (`--color-subtle`), dismissible.

### Stepper (booking)
"Step 1 of 3" caption + 3 dots (current = accent, done = ink, next = border-strong). Back (ghost) on the left, Next/Confirm (primary) on the right.

### Time-Slot Button
`40px` high, `1px` border, radius `8px`, `14px`. Selected: accent-tint bg, accent border + text. Unavailable: disabled style, with the word "Booked" in the tooltip and `aria-label`. Slots sit in a 3–4 column grid.

### Data Table
- Wrapped in a card (`12px` radius, `1px` border).
- Header row: `--color-subtle` bg, `12px`, weight 500, `--color-text-3`, sentence case.
- Rows: height `52px`, `1px` bottom border, hover `--color-subtle`, whole row clickable.
- Maximum **6 columns**. On mobile (< 640px) each row becomes a stacked list item.
- Pagination: `20` rows per page, "Previous / Next" ghost buttons.

### Dialog, Toast, Drawer
- **Dialog:** `480px`, white, `1px` border, `12px` radius, backdrop `rgba(0,0,0,0.4)`. Use **only** for destructive or irreversible confirmations.
- **Toast:** bottom-center, white, `1px` border, auto-hide `4s`, never blocks input. Used for "Saved", "Copied". Never put patient names in toasts.
- **Side drawer:** `480px` from the right, white, left border. Used for booking, invoice details, and record preview.

### States (every data view must design all four)
| State | Spec |
|-------|------|
| **Empty** | `24px` outline icon (`--color-text-3`) + one sentence + one button. |
| **Loading** | Skeleton blocks (`--color-subtle`, pulse `1.2s`). Spinner only inside buttons. |
| **Error** | Inline message + **Retry** button. Never show raw error codes or stack traces. |
| **Success** | Toast or inline confirmation. No modal. |

---

## 8. Page Template (applies to EVERY page)

```
┌ Top bar ─────────────────────────────────────────────────┐
├ Sidebar ┬────────────────────────────────────────────────┤
│         │ H1 (28px)                         [Primary btn]│
│         │ One-line description (14px, text-2)            │
│         │                                                │
│         │ ── Section 1 (card or open area) ──            │
│         │ ── Section 2 (optional) ──                     │
└─────────┴────────────────────────────────────────────────┘
```

Rules:
1. H1 + one-line description on every page.
2. **At most one** primary button in the content area, top-right of the header (or bottom-right in forms).
3. Content has **at most 2 sections** above the fold; extra details sit behind "Show details" or a tab.
4. Vertical gap between sections: `24px`. No nested cards, no tabs inside tabs.
5. Primary action is always on the right; secondary actions to its left.
6. Every page has a deep-linkable URL that contains **no personal data** (use opaque IDs like `/patients/p_8f3k2`).

---

## 9. Pages — UX Plan

> Sidebar order: **Dashboard · Appointments · Patients · Prescriptions · Records · Billing**, with **Help · Settings** at the bottom. Hide pages by role (Section 5). Remove any page you do not build; never exceed 6 sidebar items.

### 9.1 Sign In `/login`
- Centered card `400px`. Logo, H1, **phone or email**, password, **Sign in** (primary, full width), "Forgot password" link. LanguageToggle in the top-right corner.
- No sidebar, no top bar. Show the emergency note (`emergency.note`) as a caption at the bottom.

### 9.2 Dashboard `/` (role-aware)

**Goal:** see what matters today in under 5 seconds.

**Doctor / Reception view**
```
Dashboard
Your day at a glance.

[ Today's appointments ] [ Waiting now ] [ Completed ] [ New patients ]

Today's schedule
┌────────────────────────────────────────────────────────┐
│ 09:00 AM   Patient name · Reason       ✓ Confirmed  Open│
│ 09:30 AM   Patient name · Reason       ◔ Pending    Open│
└────────────────────────────────────────────────────────┘
```
- 4 identical stat cards. The schedule list is the main section; click **Open** (or the row) to go to the patient.
- Doctor: row action opens the patient profile; Reception: row action opens the appointment drawer.

**Patient view**
```
Dashboard
Your health at a glance.                  [ Book appointment ]

┌ Next appointment ─────────────────────────────┐
│ Dr. A. Rahman · Cardiology                    │
│ Sun, 9 Nov · 10:30 AM        ✓ Confirmed      │
│ [ Reschedule ]  [ Cancel ]                    │
└───────────────────────────────────────────────┘
Recent prescriptions            Latest records
 (3 rows, "View all")            (3 rows, "View all")

In an emergency, call 999.
```
- If there is no upcoming appointment, show the empty state with the primary **Book appointment** button.

### 9.3 Appointments `/appointments`

```
Appointments
Manage your visits.                       [ + Book appointment ]

[ Upcoming | Past | Cancelled ]     [ Search… ] [ Department ▾ ] [ Date ▾ ]
Today
┌────────────────────────────────────────────────────────┐
│ 10:30 AM  Dr. A. Rahman · Cardiology   ✓ Confirmed   ⋯ │
Tomorrow
│ 04:00 PM  Dr. S. Akter · General       ◔ Pending     ⋯ │
└────────────────────────────────────────────────────────┘
```
- List grouped by day ("Today", "Tomorrow", then dates). Optional **Calendar** view via a small segmented control (List | Week); default is List.
- Row menu (⋯): Open, Reschedule, Cancel (Danger confirm dialog with an optional reason).
- Staff roles show the patient name; patient role shows the doctor.

**Booking flow (side drawer, 3 steps)**
```
Book appointment                          Step 1 of 3  ●○○
Step 1 — Doctor
 [ Search doctor or department ]
 [All] [General] [Cardiology] [Pediatrics] …
 ┌ Dr. A. Rahman · Cardiology    Next free: Today 4:30 PM  [Select] ┐

Step 2 — Date & time
 [ Sat ][ Sun ][ Mon ][ Tue ] …            (week strip, starts Saturday)
 [09:00][09:30][10:00 Booked][10:30] …      (slot grid)

Step 3 — Confirm
 Summary card (doctor, date, time)
 Reason (optional)                [ Back ]  [ Confirm appointment ]
```
- Pre-select the earliest free slot. Selecting a doctor moves straight to step 2 (no extra Next click).
- After confirming: toast "Appointment confirmed", drawer closes, new item appears in the list with a brief highlight.
- If a slot is taken while booking, show an inline message and refresh the slots (no dialog).

### 9.4 Patients `/patients` (Doctor, Reception)

```
Patients
Find and open a patient record.               [ + Add patient ]

[ Search by name, phone or ID… ]  [ Department ▾ ]
┌ Name · ID · Age / Sex · Last visit · Phone ┐   (max 6 columns)
```
- **Search-first:** the search field is focused on page load. Results appear as you type (≥ 2 characters).
- Phone is partially masked (`01•••••678`); click the eye icon to reveal for the current row.
- Row click → patient profile.
- "Add patient" is Reception-only; Doctors see no primary button here.

### 9.5 Patient Profile `/patients/[id]`

```
Patient name                               [ + New prescription ]
ID P-00124 · 34 y · Male · A+ · 01•••••678 👁

┌ ! Allergy: Penicillin ────────────────────────────────────┐  ← only if present, not dismissible
[ Overview | Visits | Prescriptions | Records ]

[ BP ] [ Pulse ] [ Temp ] [ Weight ]        ← identical stat cards, with "recorded on" date
Active medicines                 Last visit
(list, up to 5)                  (date, doctor, diagnosis)
```
- Breadcrumb: "Patients / Patient profile" (no name in the breadcrumb).
- Each tab is one list or table; no tabs inside tabs.
- Audit line at the bottom of sections that staff edit: "Last updated by Dr. X · 7 Nov, 10:42 AM".

### 9.6 Prescriptions `/prescriptions` and `/prescriptions/new`

**List:** table (Date, Patient/Doctor, Diagnosis, Medicines count, Status) with search; row opens a read-only prescription view with **Print**.

**Create (Doctor):** one page, no wizard.
```
New prescription                                   Patient: [ search patient ▾ ]
! Allergy: Penicillin                              (banner, if present)

Diagnosis   [______________________________________]

Medicines
┌ Medicine              Dose      Duration    Instructions ┐
│ [Paracetamol 500 mg ▾] [1+0+1]  [5 days ▾]  [After meal ▾]   ✕ │
│ + Add medicine                                              │
   Dose legend: Morning + Noon + Night

Advice / notes  [______________________________________]

                              [ Save draft ]  [ Save & print ]
```
- `Tab` moves across fields; `Enter` on the last field adds a new row; `Ctrl/Cmd + S` saves.
- **Conflict check:** if a medicine matches a recorded allergy, show the Danger warning under that row; "Save & print" becomes "Save anyway" with an explicit confirm.
- **Print preview:** A4/A5 print stylesheet with clinic header, patient info, medicines table, doctor signature line. A small **"Print in: EN | বাংলা"** switch lets the printed instructions use either language, independent of the UI language.
- Draft autosaves every 10 seconds.

### 9.7 Records `/records`

```
Records
Reports, test results and documents.                  [ + Upload record ]

[ Search… ] [ Type ▾ ] [ Date ▾ ]
┌ Name · Type (Lab / Imaging / Other) · Date · Added by ┐
```
- Click a row → right drawer with preview (PDF/image), details, and Download.
- Upload: drag-and-drop zone, accepts PDF/JPG/PNG, max `10 MB`, shows file name and a progress bar.
- Patient role: read-only (no upload button).

### 9.8 Billing `/billing` (Reception/Admin, Patient)

```
Billing
Invoices and payments.                          [ + Create invoice ]

[ All | Due | Paid ]  [ Search… ] [ Date ▾ ]
┌ Invoice no. · Patient · Date · Amount · Status ┐
```
- Status badges: Paid, Due, Overdue (see Status Map).
- Click a row → invoice drawer with line items, total, and **Print**.
- Currency: `৳` (BDT) formatted with `Intl.NumberFormat(locale, { style: 'currency', currency: 'BDT' })`.
- "Create invoice" is Reception/Admin only; the patient role sees no primary button.

### 9.9 Settings `/settings`
Simple rows inside one card each, saved **instantly** (no Save button, toast "Saved"):
1. **Language** — same segmented control as the top bar.
2. **Use Bangla digits (০–৯)** — switch.
3. **Week starts on** — Saturday / Sunday.
4. **Reminders** — SMS / email switches for appointment reminders.
5. **Account** — name, phone, email, change password, Sign out.
6. **Privacy** — auto sign-out time (default 15 min).

### 9.10 Help `/help`
- Short numbered steps for the 3 main tasks (Book an appointment, View a prescription, Pay an invoice).
- Accordion FAQ; clinic contact; the emergency note (`In an emergency, call 999.`).
- No long text.

---

## 10. UX Rules

### 10.1 "Smart" Behavior Checklist

1. **Three steps or fewer** to book an appointment; **one click** to change language.
2. **Smart defaults:** remember last filters, tab, date range, sidebar state; pre-select the earliest free slot.
3. **Instant feedback:** respond to every click in ≤ `100ms` (pressed state, spinner, or skeleton).
4. **Plain language:** short sentences; errors say what happened and what to do next.
5. **No dead ends:** every empty/error state has one button that moves forward.
6. **Prefer undo over confirm** for light actions (toast "Cancelled · Undo"); dialog only for destructive or irreversible ones.
7. **Consistent placement:** primary action top-right (header) or bottom-right (forms).
8. **Progressive disclosure:** details behind tabs or "Show details".
9. **Keyboard first:** `/` focus search, `Ctrl/Cmd+S` save, `Alt+L` language, `Esc` closes drawers/dialogs.
10. **Touch targets** ≥ `44×44px` on tablets and phones.
11. **Never lose work:** typed text, selected slots, and prescription drafts survive language switch and sidebar collapse.

### 10.2 Healthcare Safety & Privacy

1. **Allergy and conflict alerts are always visible** (profile header, prescription form) and never dismissible.
2. **Critical actions** (cancel appointment, delete record, save with a conflict) need an explicit confirmation.
3. **Audit trail:** show "last updated by / when" on clinical data.
4. **Mask sensitive data by default** (phone, NID); reveal per row on click.
5. **No personal data in URLs, page titles, toasts, or breadcrumbs.** Use opaque IDs.
6. **Auto sign-out** after 15 minutes of inactivity, with a 60-second warning dialog and "Stay signed in" button.
7. **Role-based UI:** hide what a role cannot use; never show a disabled item with no explanation.
8. **Printing:** prescriptions and invoices have a dedicated print stylesheet (no sidebar, no top bar, black on white).
9. Show the emergency note (`In an emergency, call 999.`) on Sign in, Patient Dashboard, and Help.

### 10.3 Core User Flows

```
Patient:    Dashboard → Book appointment → doctor → date/time → Confirm   (3 steps)
Doctor:     Dashboard → open patient from today's schedule → New prescription → Save & print
Reception:  Patients → search → open patient → Book appointment → Confirm
```

---

## 11. Responsive Behavior

| Breakpoint | Sidebar | Layout |
|------------|---------|--------|
| **≥ 1024px** | `240px` expanded (collapsible to `64px`) | Content max `1120px`; stat cards in 4 columns |
| **640–1023px** | `64px` icon rail | Stat cards in 2 columns; tables keep ≤ 5 columns; booking drawer full height |
| **< 640px** | Drawer via ☰ | Single column; tables → stacked list; primary button full width; LanguageToggle stays in the top bar; slot grid 3 columns |

---

## 12. Accessibility

- Text contrast ≥ `4.5:1` (all token pairs above pass).
- Visible focus ring on every control; logical Tab order; skip-to-content link.
- Color is never the only signal: statuses have icon + text; alerts have icon + message.
- `lang` attribute follows the selected language; toggle announces changes (6.2 #7).
- Support browser zoom up to `200%` and text size increases without breaking layout (many patients are older adults).
- Respect `prefers-reduced-motion`.
- Forms: every input has a visible label; errors are announced with `aria-live`.

---

## 13. Do's and Don'ts

### Do
- Use **white + soft gray + ink** for 95% of every screen.
- Use the **accent only** for the primary button, active nav item, focus, and links.
- Give every page the same skeleton (Section 8).
- Design and test **Bangla first-class**: real Bangla strings, not placeholder text.
- Use icons from **one** set (Lucide, `1.75` stroke).
- Keep allergy and safety alerts at the top, in Danger style.

### Don't
- Don't add colored cards, gradients, illustrations, or hand-drawn flourishes.
- Don't use orange, lime, purple, or navy fills (v1 colors are removed).
- Don't add box-shadows.
- Don't set `letter-spacing` or `uppercase` on Bangla text.
- Don't hide the language toggle in a menu.
- Don't put more than one primary button in a page's content.
- Don't write UI text directly in components.
- Don't use red for anything except danger (allergy, conflict, overdue).
- Don't show patient names or phone numbers in URLs, toasts, or page titles.

---

## 14. Agent Prompt Recipes (Antigravity)

> Paste one at a time. Each begins with: *"Follow UI_DESIGN.md strictly."*

1. **Setup (tokens + fonts):**
   > "Follow UI_DESIGN.md strictly. Add the CSS variables and Tailwind v4 `@theme` from Section 15. Load Inter and Noto Sans Bengali (400/500/600) with `display=swap`. Add the `:lang(bn)` base rules. No components yet."

2. **Language system:**
   > "Follow UI_DESIGN.md strictly. Create `/locales/en.json` and `/locales/bn.json` with the starter strings from Section 6.6, a `LanguageProvider` + `useI18n()` hook, and a `LanguageToggle` component exactly as in Section 6.1/6.2 (EN | বাংলা, one click, saved in localStorage, updates `<html lang>`). Add a script that fails if the two JSON files have different keys."

3. **App shell:**
   > "Follow UI_DESIGN.md strictly. Build the app shell from Section 5: `NavSidebar` (240px, #f7f7f5, 1px right border) with brand, role-based quick-action button, groups Workspace / Care / Admin, items filtered by role (table in Section 5), Help/Settings/user row at the bottom; and a 56px top bar with breadcrumb, `LanguageToggle`, and avatar. Active item = accent tint + accent text. Collapsible to 64px, drawer on mobile. All text from `t()`."

4. **Shared components:**
   > "Follow UI_DESIGN.md strictly. Build the components from Section 7: Button variants, Card, Stat card, Input, Search input, Autocomplete, Tabs, Badge (with the Status Map in Section 2), Alert Banner, Stepper, Time-Slot Button, Data Table, Dialog, Toast, Side Drawer, and Empty/Loading/Error states."

5. **Sign in + Dashboard:**
   > "Follow UI_DESIGN.md strictly. Build `/login` (Section 9.1) and the role-aware Dashboard `/` (Section 9.2): doctor/reception view with 4 identical stat cards and today's schedule, and patient view with next-appointment card, recent prescriptions, latest records, and the emergency note. Use mock data."

6. **Appointments + booking drawer:**
   > "Follow UI_DESIGN.md strictly. Build `/appointments` and the 3-step booking drawer from Section 9.3: tabs Upcoming/Past/Cancelled, list grouped by day, row menu, and the drawer with doctor search, department chips, week strip starting Saturday, time-slot grid, summary, and Confirm. Pre-select the earliest free slot."

7. **Patients + profile:**
   > "Follow UI_DESIGN.md strictly. Build `/patients` and `/patients/[id]` from Sections 9.4–9.5: search-first table with masked phone and reveal icon, profile header, non-dismissible allergy banner, tabs Overview/Visits/Prescriptions/Records, four identical vitals cards, active medicines, and an audit line."

8. **Prescriptions:**
   > "Follow UI_DESIGN.md strictly. Build `/prescriptions` and `/prescriptions/new` from Section 9.6: patient autocomplete, allergy banner, diagnosis, medicine rows (medicine autocomplete, dose like 1+0+1 with legend, duration, instructions), Tab/Enter row shortcuts, conflict warning with 'Save anyway', autosaved draft, and a print stylesheet with a 'Print in: EN | বাংলা' switch."

9. **Records + Billing:**
   > "Follow UI_DESIGN.md strictly. Build `/records` and `/billing` from Sections 9.7–9.8: tables with search and filters, a right drawer for preview/invoice details, upload drop zone (Records), status badges (Billing), BDT currency formatting, and role-based primary buttons."

10. **Settings + Help:**
    > "Follow UI_DESIGN.md strictly. Build `/settings` and `/help` from Sections 9.9–9.10. Settings save instantly with a toast."

11. **Privacy & safety pass:**
    > "Follow UI_DESIGN.md strictly. Implement Section 10.2: masked phone/NID with reveal, no personal data in URLs/toasts/titles, 15-minute auto sign-out with a 60-second warning dialog, and audit lines on clinical data."

12. **QA pass:**
    > "Follow UI_DESIGN.md strictly. Review every page in English and Bangla at 375px, 768px, and 1280px. Fix: hard-coded strings, text overflow, Bangla letter-spacing/uppercase, any box-shadow, any color outside the tokens, more than one primary button per page, missing empty/loading/error states."

---

## 15. Quick Start — CSS & Tailwind v4

### CSS Custom Properties

```css
:root {
  /* Neutrals */
  --color-canvas: #ffffff;
  --color-sidebar: #f7f7f5;
  --color-subtle: #f4f4f2;
  --color-border: #e7e5e4;
  --color-border-strong: #d6d3d1;
  --color-ink: #111111;
  --color-text-2: #57534e;
  --color-text-3: #78716c;

  /* Accent */
  --color-accent: #3b5bdb;
  --color-accent-hover: #2f4bc0;
  --color-accent-tint: #eef2ff;

  /* Status (statuses & clinical alerts only) */
  --color-danger-text: #b42318;   --color-danger-bg: #fef3f2;   --color-danger-border: #fecdca;
  --color-success-text: #067647;  --color-success-bg: #ecfdf3;  --color-success-border: #abefc6;
  --color-warning-text: #b54708;  --color-warning-bg: #fffaeb;  --color-warning-border: #fedf89;

  /* Fonts */
  --font-sans: 'Inter', 'Noto Sans Bengali', 'Hind Siliguri', ui-sans-serif, system-ui, sans-serif;
  --font-bn: 'Noto Sans Bengali', 'Hind Siliguri', 'Kalpurush', 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Type scale (English) */
  --text-caption: 12px;
  --text-body: 14px;
  --text-body-lg: 16px;
  --text-title: 20px;
  --text-heading: 28px;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-pill: 9999px;

  /* Layout */
  --sidebar-width: 240px;
  --sidebar-width-collapsed: 64px;
  --topbar-height: 56px;
  --page-max-width: 1120px;
}

html { font-family: var(--font-sans); color: var(--color-ink); background: var(--color-canvas); }
body { font-size: var(--text-body); line-height: 1.5; }

/* Bangla */
:lang(bn) { font-family: var(--font-bn); letter-spacing: 0 !important; text-transform: none !important; }
body:lang(bn), html:lang(bn) body { font-size: 15px; line-height: 1.7; }

/* Focus */
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }

/* Print (prescriptions, invoices) */
@media print {
  aside, header, .no-print { display: none !important; }
  body { background: #fff; color: #000; font-size: 12pt; }
}
```

### Tailwind v4 Configuration

```css
@theme {
  --color-canvas: #ffffff;
  --color-sidebar: #f7f7f5;
  --color-subtle: #f4f4f2;
  --color-border: #e7e5e4;
  --color-border-strong: #d6d3d1;
  --color-ink: #111111;
  --color-text-2: #57534e;
  --color-text-3: #78716c;
  --color-accent: #3b5bdb;
  --color-accent-hover: #2f4bc0;
  --color-accent-tint: #eef2ff;

  --color-danger-text: #b42318;  --color-danger-bg: #fef3f2;  --color-danger-border: #fecdca;
  --color-success-text: #067647; --color-success-bg: #ecfdf3; --color-success-border: #abefc6;
  --color-warning-text: #b54708; --color-warning-bg: #fffaeb; --color-warning-border: #fedf89;

  --font-sans: 'Inter', 'Noto Sans Bengali', 'Hind Siliguri', ui-sans-serif, system-ui, sans-serif;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-pill: 9999px;
}
```

### Translation Files (example)

```json
// locales/en.json
{
  "nav.dashboard": "Dashboard",
  "nav.appointments": "Appointments",
  "action.book": "Book appointment",
  "status.confirmed": "Confirmed",
  "lang.label": "Language"
}
```
```json
// locales/bn.json
{
  "nav.dashboard": "ড্যাশবোর্ড",
  "nav.appointments": "অ্যাপয়েন্টমেন্ট",
  "action.book": "অ্যাপয়েন্টমেন্ট বুক করুন",
  "status.confirmed": "নিশ্চিত",
  "lang.label": "ভাষা"
}
```

### React / Next.js — LanguageProvider + LanguageToggle

```tsx
// lib/i18n.tsx
'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import en from '@/locales/en.json';
import bn from '@/locales/bn.json';

export type Lang = 'en' | 'bn';
const dict: Record<Lang, Record<string, string>> = { en, bn };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>(null!);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // First visit: saved choice → browser language → English
  useEffect(() => {
    const saved = localStorage.getItem('ui-lang') as Lang | null;
    const guess: Lang = navigator.language.startsWith('bn') ? 'bn' : 'en';
    setLangState(saved ?? guess);
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('ui-lang', l);
  }, []);

  const t = useCallback(
    (key: string) => dict[lang][key] ?? dict.en[key] ?? key,
    [lang]
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
```

```tsx
// components/LanguageToggle.tsx
'use client';
import { useI18n, type Lang } from '@/lib/i18n';

const OPTIONS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'bn', label: 'বাংলা' },
];

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t('lang.label')}
         className="inline-flex rounded-lg bg-subtle p-0.5">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          lang={o.id}
          aria-pressed={lang === o.id}
          onClick={() => setLang(o.id)}
          className={
            'h-8 min-w-14 px-3 rounded-md border text-[13px] font-medium transition-colors ' +
            (lang === o.id
              ? 'bg-canvas text-ink border-border-strong'
              : 'border-transparent text-text-2 hover:text-ink')
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
```

### Reference HTML — App Shell (Doctor role example)

```html
<div class="flex min-h-screen bg-canvas text-ink font-sans">
  <!-- NavSidebar -->
  <aside class="w-[240px] shrink-0 bg-sidebar border-r border-border p-4 flex flex-col justify-between">
    <div class="space-y-4">
      <!-- Brand -->
      <div class="flex items-center gap-3 px-1 h-10">
        <div class="w-7 h-7 rounded-lg bg-ink text-white grid place-items-center text-xs font-medium">H</div>
        <span class="text-[16px] font-semibold">Health System</span>
      </div>

      <!-- Quick action (role-based; does not count as the page's primary button) -->
      <button class="w-full h-10 rounded-lg bg-accent hover:bg-accent-hover text-white text-[14px] font-medium">
        + New prescription
      </button>

      <!-- Group: Workspace -->
      <div>
        <div class="px-3 pt-4 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-text-3">Workspace</div>
        <nav class="space-y-1">
          <!-- Active -->
          <a href="/" aria-current="page"
             class="flex items-center gap-3 h-10 px-3 rounded-lg bg-accent-tint text-accent text-[14px] font-medium">
            <!-- icon: lucide "layout-dashboard" 18px --> <span>Dashboard</span>
          </a>
          <!-- Default with neutral count badge -->
          <a href="/appointments"
             class="flex items-center gap-3 h-10 px-3 rounded-lg text-text-2 hover:bg-subtle hover:text-ink text-[14px] transition-colors">
            <!-- icon: lucide "calendar" 18px --> <span class="flex-1">Appointments</span>
            <span class="bg-subtle text-text-3 text-[12px] px-2 rounded-full">8</span>
          </a>
        </nav>
      </div>

      <!-- Group: Care -->
      <div>
        <div class="px-3 pt-4 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-text-3">Care</div>
        <nav class="space-y-1">
          <a href="/patients" class="flex items-center gap-3 h-10 px-3 rounded-lg text-text-2 hover:bg-subtle hover:text-ink text-[14px] transition-colors">
            <!-- icon: lucide "users" 18px --> <span>Patients</span>
          </a>
          <a href="/prescriptions" class="flex items-center gap-3 h-10 px-3 rounded-lg text-text-2 hover:bg-subtle hover:text-ink text-[14px] transition-colors">
            <!-- icon: lucide "file-text" 18px --> <span>Prescriptions</span>
          </a>
          <a href="/records" class="flex items-center gap-3 h-10 px-3 rounded-lg text-text-2 hover:bg-subtle hover:text-ink text-[14px] transition-colors">
            <!-- icon: lucide "folder-heart" 18px --> <span>Records</span>
          </a>
        </nav>
      </div>
    </div>

    <!-- Bottom zone -->
    <div class="space-y-1 pt-4">
      <a href="/help" class="flex items-center gap-3 h-10 px-3 rounded-lg text-text-2 hover:bg-subtle hover:text-ink text-[14px]">Help</a>
      <a href="/settings" class="flex items-center gap-3 h-10 px-3 rounded-lg text-text-2 hover:bg-subtle hover:text-ink text-[14px]">Settings</a>
      <div class="pt-3 mt-2 border-t border-border flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-subtle border border-border grid place-items-center text-xs font-medium">AR</div>
        <div class="leading-tight">
          <div class="text-[14px] font-medium">Dr. A. Rahman</div>
          <div class="text-[12px] text-text-3">Doctor</div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main -->
  <div class="flex-1 min-w-0 flex flex-col">
    <!-- Top bar -->
    <header class="h-14 border-b border-border px-6 flex items-center justify-between">
      <nav class="text-[14px] text-text-3">Dashboard</nav>
      <div class="flex items-center gap-3">
        <!-- <LanguageToggle /> goes here (Section 6.1) -->
        <div class="w-8 h-8 rounded-full bg-subtle border border-border grid place-items-center text-xs font-medium">AR</div>
      </div>
    </header>

    <!-- Page -->
    <main class="p-8 max-w-[1120px] w-full mx-auto space-y-6">
      <div>
        <h1 class="text-[28px] leading-tight font-semibold tracking-[-0.02em]">Dashboard</h1>
        <p class="text-[14px] text-text-2 mt-1">Your day at a glance.</p>
      </div>
      <!-- Page sections -->
    </main>
  </div>
</div>
```

> Note: `tracking-[-0.02em]` on the H1 applies to English only; the `:lang(bn)` rule resets it to `0`.

---

## 16. Build Order & QA Checklist

### Build Order
1. Tokens + fonts (Prompt 1)
2. Language system + toggle (Prompt 2)
3. App shell (Prompt 3)
4. Shared components (Prompt 4)
5. Sign in + Dashboard (Prompt 5) ← **first demo-ready screen**
6. Appointments + booking drawer (Prompt 6) ← **core patient flow**
7. Patients + profile (Prompt 7)
8. Prescriptions (Prompt 8) ← **core doctor flow**
9. Records + Billing (Prompt 9)
10. Settings + Help (Prompt 10)
11. Privacy & safety pass (Prompt 11)
12. QA pass (Prompt 12)

### QA Checklist (run for every page, in EN and বাংলা)

- [ ] One H1, one-line description, at most one primary button in the content.
- [ ] No text hard-coded; switching language changes **everything** (including empty/error states and toasts).
- [ ] Language switch keeps typed text, selected slot, filters, drafts, and scroll position.
- [ ] No Bangla text with letter-spacing, uppercase, or weight above 600.
- [ ] No text clipped or overflowing at 375px, 768px, and 1280px.
- [ ] Only token colors used; no box-shadows.
- [ ] Statuses always show icon + text + color; allergy alerts are visible and not dismissible.
- [ ] Empty, loading, and error states exist and look right.
- [ ] Keyboard: Tab order is logical, focus ring visible, `Esc` closes drawers/dialogs.
- [ ] Sidebar: items match the role, active item correct, collapsed tooltips work, mobile drawer closes on navigate.
- [ ] No personal data in URLs, toasts, page titles, or breadcrumbs.
- [ ] Print preview of a prescription and an invoice looks clean (no sidebar/top bar).

---

## 17. What Changed from v1 (7shifts)

| Area | v1 | v2.1 |
|------|----|----|
| **Colors** | Indigo + orange + lime + 5 pastel/deep fills | **One accent** (`#3b5bdb`) + neutrals; status colors only for statuses and clinical alerts |
| **Fonts** | Inter + hand-drawn script | Inter + Noto Sans Bengali; 3 weights |
| **Sidebar** | Warm bone, workspace switcher, orange badges, black promo card | Soft gray, brand + role-based quick action, neutral badges, role-based items |
| **Cards** | Rotating pastel KPI cards, 40px hero plates | Identical white bordered cards, `12px` radius |
| **Buttons** | Pills, outlined orange variant | `8px` radius; primary / secondary / ghost / danger |
| **Language** | English only | **One-click EN ⇄ বাংলা**, Bangla typography rules, Bangla digits option, bilingual printing |
| **UX** | Marketing-style | Page template, smart defaults, 3-step booking, safety and privacy rules, full state design |
| **Pages** | Restaurant examples | Sign in, Dashboard, Appointments, Patients, Patient profile, Prescriptions, Records, Billing, Settings, Help |