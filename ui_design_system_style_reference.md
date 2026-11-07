# UI Design System — Style Reference (7shifts Inspired)
> **Design Persona:** Warm diner counter with neon chalk accents — a bright, tactile SaaS interface where punchy indigo actions, orange hand-drawn underlines, and lime highlighter marks sit on clean white and warm bone surfaces, anchored by a structured Warm Bone navigation sidebar and occasional jet-black contrast bands.

**Theme:** Light  
**Target Environment:** Antigravity IDE / Web Application & Marketing System  

---

## 1. System Overview

This UI system pairs a light, air-kissed SaaS canvas with a single punchy indigo (`#4570ff`) as the primary interactive driver and a focused cast of warm accents doing the personality work. The interface reads like a clean, well-organized restaurant counter: pure white workspaces, warm bone (`#f1f0ec`) structural panels and navigation sidebars, soft pastel card variants, and high-contrast jet-black (`#000000`) bands or comparison widgets that make neighboring colors glow.

- **Signature Flourish:** Ember Orange (`#ff6808`) underlines hero/header keywords in a hand-drawn stroke, floods highlight panels, and outlines secondary actions.
- **High-Contrast Highlight:** Lime Highlighter (`#c6ff94`) acts as highlighter text, active status badges, and metric callouts inside dark sections.
- **Tactile Geometry:** Generous, friendly rounding across all surfaces (`9999px` pill buttons, `12px` sidebar nav items, `20px` cards, `40px` hero plates) paired with a compact, zero-shadow vertical rhythm.

---

## 2. Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| **Indigo Bolt** | `#4570ff` | `--color-indigo-bolt` | Primary action color for filled pill buttons, active sidebar navigation states, active tab indicators, and focused inputs. |
| **Ember Orange** | `#ff6808` | `--color-ember-orange` | Personality accent for hand-drawn underlines, outlined secondary buttons, notification badges, and feature highlight panels. |
| **Lime Highlighter** | `#c6ff94` | `--color-lime-highlighter` | High-contrast green accent for text highlights, positive trend pills, and active indicators exclusively on `#000000` or dark surfaces. |
| **Lavender Mist** | `#ebdcff` | `--color-lavender-mist` | Soft card surface and gentle section wash — breaks up the white canvas without adding visual noise. |
| **Ice Blue** | `#d6e0ff` | `--color-ice-blue` | Cool pastel card surface, section wash, or subtle active-row tint that reinforces the primary indigo at low intensity. |
| **Lilac Bloom** | `#c293f1` | `--color-lilac-bloom` | Saturated pastel card background used in rotating 4-column feature/KPI grids. |
| **Deep Navy** | `#193f78` | `--color-deep-navy` | Deep blue card fill and decorative band background (uses `#ffffff` text). Never use as a primary CTA button fill. |
| **Forest Sage** | `#244f47` | `--color-forest-sage` | Grounded, earthy teal card variant in the rotating card system (uses `#ffffff` text). |
| **Warm Bone** | `#f1f0ec` | `--color-warm-bone` | **Primary Sidebar surface**, secondary page canvas, quiet button fills, and hover states on white surfaces. |
| **Paper White** | `#ffffff` | `--color-paper-white` | Primary main-canvas background, card surfaces on bone sections, input fills, and text on dark surfaces. |
| **Ink Black** | `#000000` | `--color-ink-black` | Primary text, dark comparison cards, full-bleed contrast bands, and collapsed/dark-mode sidebar variants. |
| **Hairline** | `#e5e7eb` | `--color-hairline` | Structural borders (`1px solid`), sidebar dividers, table rules, and default input borders. |
| **Stone** | `#d1d5db` | `--color-stone` | Mid-gray strokes, disabled control backgrounds, and subtle icon containers. |
| **Smoke** | `#6e6d6c` | `--color-smoke` | Secondary body text, inactive sidebar labels, helper text, and muted table captions. |
| **Graphite** | `#555555` | `--color-graphite` | Tertiary text, default top-nav/sidebar link text, and neutral button labels. |

---

## 3. Tokens — Typography

### Font Families

1. **Primary Sans (`--font-sans`)**
   - **Stack:** `'Inter', 'Manrope', 'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif`
   - **OpenType Features:** `"ss01" on, "cv11" on`
   - **Role:** All UI controls, sidebar navigation, data tables, body copy, and headings.
     - **Weight 400 (Regular):** Body copy, descriptions, table cells.
     - **Weight 500 (Medium):** Buttons, sidebar nav links, sub-headings, KPI values, and display headings.
     - **Weight 700 (Bold):** Reserved strictly for `11px–14px` uppercase eyebrow labels and sidebar section headers with opened tracking (`+0.025em`).

2. **Personality Script (`--font-script`)**
   - **Stack:** `'Nanum Pen Script', 'Caveat', 'Kalam', cursive`
   - **Weights:** `400`, `500`
   - **Sizes:** `28px–30px` | **Line Height:** `1.0–1.2` | **Letter Spacing:** `-0.03em`
   - **Role:** Hand-drawn personality accent (`#ff6808`) placed beneath a single keyword in hero or section headers. Never used in sidebar navigation, body text, or UI controls.

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Token |
|------|------|--------|-------------|----------------|-------|
| **Eyebrow / Sidebar Group** | `11px` | `700` | `1.4` | `+0.025em` (`+0.28px`) | `--text-eyebrow` |
| **Caption** | `12px` | `400` | `1.4` | `-0.2px` | `--text-caption` |
| **Body / Sidebar Item** | `14px` | `400 / 500` | `1.5` | `-0.28px` | `--text-body` |
| **Body Large / CTA** | `16px` | `400 / 500` | `1.5` | `-0.32px` | `--text-body-lg` |
| **Subheading** | `18px` | `500` | `1.4` | `-0.36px` | `--text-subheading` |
| **Heading SM (Card Title)** | `24px` | `500` | `1.33` | `-0.6px` (`-0.025em`) | `--text-heading-sm` |
| **Heading MD (Section)** | `36px` | `500` | `1.2` | `-0.9px` (`-0.025em`) | `--text-heading` |
| **Heading LG** | `48px` | `500` | `1.14` | `-1.44px` (`-0.03em`) | `--text-heading-lg` |
| **Display** | `64px` | `500` | `1.11` | `-1.92px` (`-0.03em`) | `--text-display` |

---

## 4. Tokens — Spacing, Shapes & Layout

**Base Unit:** `4px` | **Density:** Compact & Graphic (Zero-Shadow)

### Spacing Scale
- `--spacing-4`: `4px`
- `--spacing-8`: `8px`
- `--spacing-12`: `12px`
- `--spacing-16`: `16px`
- `--spacing-20`: `20px`
- `--spacing-24`: `24px`
- `--spacing-28`: `28px`
- `--spacing-40`: `40px`
- `--spacing-48`: `48px`
- `--spacing-60`: `60px`
- `--spacing-80`: `80px`
- `--spacing-120`: `120px`

### Border Radius Tokens
| Element | Value | Token |
|---------|-------|-------|
| Icons / Badges | `8px` | `--radius-icons` |
| Inputs / Sidebar Links | `12px` | `--radius-inputs` / `--radius-sidebar-item` |
| Top Nav / Dropdowns | `16px` | `--radius-nav` |
| Cards / Panels / Modals | `20px` | `--radius-cards` |
| Hero Plates / Dark Bands | `40px` | `--radius-hero` |
| Buttons / Pill Tags | `9999px` | `--radius-buttons` / `--radius-tags` |

### Layout Dimensions
- **App Shell Layout:** Fixed Left Sidebar (`260px` expanded, `72px` collapsed) + Fluid Main Workspace (`#ffffff` or `#f1f0ec` canvas).
- **Content Well Max-Width:** `1200px` (centered inside the main workspace or marketing page).
- **Section Gap:** `64px–80px` (marketing) / `24px–32px` (app views).
- **Card Padding:** `20px–24px`.
- **Element Gap:** `8px–12px`.

---

## 5. Navigation Sidebar Architecture (`NavSidebar`)

The **NavSidebar** is the primary structural anchor for the application shell. It translates the "warm diner counter" aesthetic into a functional workspace navigation panel without using drop shadows.

### Structure & Dimensions
- **Width:** `260px` (Expanded) | `72px` (Collapsed icon-only mode)
- **Mobile Behavior:** Off-canvas drawer (`280px` width) over a `rgba(0, 0, 0, 0.4)` backdrop, sliding in from the left.
- **Surface:** `#f1f0ec` (Warm Bone) default surface with a `1px solid #e5e7eb` (Hairline) right border separating it from the `#ffffff` main workspace.
- **Padding:** `16px` outer container padding; `8px` vertical gap between navigation groups.

### Sidebar Sub-Components

1. **Brand & Location Switcher Header (Top Zone)**
   - **Height:** `64px` (aligned with top workspace header).
   - **Workspace/Location Pill:** Interactive selector inside the sidebar top (`#ffffff` fill, `1px solid #e5e7eb` border, `12px` radius, `10px 12px` padding). Displays restaurant/workspace avatar (`28px` square, `8px` radius in `#193f78` Navy or `#ff6808` Orange), title in `14px` weight `500` `#000000`, and a `#6e6d6c` chevron.

2. **Primary Action Button (Optional Quick-Create)**
   - Full-width Primary Pill Button (`#4570ff` fill, `#ffffff` text, `9999px` radius, `10px 16px` padding, `14px` weight `500`) positioned directly below the header for high-frequency actions (e.g., `+ New Shift` or `+ Quick Action`).

3. **Navigation Section Group Labels**
   - `11px` uppercase, weight `700`, `#6e6d6c` (Smoke) text, letter-spacing `+0.025em`, padding `16px 12px 6px 12px`.

4. **Sidebar Nav Item (`NavItem`)**
   - **Shape & Spacing:** `12px` border-radius (`--radius-sidebar-item`), `10px` vertical × `12px` horizontal padding, `10px` gap between icon (`20px × 20px`) and label (`14px`, line-height `1.4`).
   - **Default State:** Transparent fill, `#555555` (Graphite) text and icon, weight `400`.
   - **Hover State:** `#ffffff` (Paper White) fill on the Warm Bone sidebar, `#000000` (Ink Black) text and icon, weight `500`.
   - **Active / Selected State (Primary):** `#4570ff` (Indigo Bolt) fill, `#ffffff` text and icon, weight `500`.
   - **Active / Selected State (Sub-item or Secondary):** `#d6e0ff` (Ice Blue) fill, `#000000` text, weight `500`, with a `6px` `#4570ff` dot indicator on the right.
   - **Notification / Count Badge:** Right-aligned pill (`9999px` radius, `2px 8px` padding, `11px` weight `500`). Uses `#ff6808` (Ember Orange) with `#ffffff` text for urgent alerts, or `#e5e7eb` with `#000000` text for neutral counts.

5. **Collapsible Sub-Menu (Nested Items)**
   - Indented `20px` from the left with a `1px solid #d1d5db` (Stone) vertical guide line. Sub-items use `8px 12px` padding and `13px` font size.

6. **Sidebar Promo / Status Card (Bottom Utility Zone)**
   - Sits above the user profile footer. Filled `#000000` (Ink Black), `16px` radius, `16px` padding, `#ffffff` text. Uses `#c6ff94` (Lime Highlighter) for the accent headline or status metric, and a small pill button or link at the bottom.

7. **User Profile Footer (Bottom Zone)**
   - Separated by a `1px solid #e5e7eb` top border. Contains user avatar (`36px` circle), user name (`14px` weight `500` `#000000`), role badge (`12px` `#6e6d6c`), and a collapse-sidebar toggle icon button (`8px` radius, `#555555`, hover `#ffffff`).

---

## 6. Core UI Components

### Buttons
- **Primary Pill Button:** Filled `#4570ff` (Indigo Bolt), `#ffffff` text, `9999px` radius, `12px 24px` padding (`10px 18px` compact), `16px` (`14px` compact) weight `500`. No shadow. Hover shifts to `#345ee6`.
- **Outlined Orange Button:** Transparent fill, `2px solid #ff6808` border, `#ff6808` text, `9999px` radius, `10px 20px` padding, weight `500`. Hover fills with `rgba(255, 104, 8, 0.08)`.
- **Neutral Bone Pill Button:** Filled `#f1f0ec` (Warm Bone), `#000000` text, `9999px` radius, `10px 20px` padding, weight `500`. Hover shifts to `#e5e7eb`.
- **Ghost Button:** Transparent fill, `#555555` text, `16px` radius, `8px 12px` padding. Hover fills with `#f1f0ec` and `#000000` text.

### Cards & Containers
- **Standard Content Card:** `#ffffff` surface, `20px` radius, `20px–24px` padding, `1px solid #e5e7eb` border (when sitting on `#ffffff`) or borderless (when sitting on `#f1f0ec`). Zero drop shadow.
- **Rotating Colored Feature / KPI Cards:** `20px` radius, `24px` padding. Rotate across 4-column grids using:
  1. `#ebdcff` (Lavender Mist) — `#000000` text
  2. `#d6e0ff` (Ice Blue) — `#000000` text
  3. `#c293f1` (Lilac Bloom) — `#000000` text
  4. `#193f78` (Deep Navy) or `#244f47` (Forest Sage) — `#ffffff` text
- **Dark Comparison / Highlight Card:** Filled `#000000`, `#ffffff` text, `20px` radius, `24px` padding. Uses `#c6ff94` (Lime Highlighter) for key metrics or tags. Paired side-by-side against a `#f1f0ec` Warm Bone card.
- **Hero / Section Plate:** Full-bleed container with `40px` top/bottom border-radius, `60px–80px` vertical padding.

### Navigation & Tabs
- **Tabbed Bar:** Horizontal row of tabs with `16px` weight `400` `#6e6d6c` labels. Active tab uses weight `500` `#000000` text and a `2px solid #4570ff` bottom underline.
- **Pill Tags / Chips:** `9999px` radius, `4px 12px` padding, `12px–14px` weight `400` or `500`. Variants: `#f1f0ec` (neutral), `#ebdcff` (lavender), `#c6ff94` on `#000000` (lime highlight).

### Form Inputs & Tables
- **Text Input / Select:** `#ffffff` background, `1px solid #e5e7eb` border, `12px` radius (`--radius-inputs`), `10px 14px` padding, `14px` `#000000` text, placeholder `#6e6d6c`. Focus state uses `2px solid #4570ff` outline and zero shadow.
- **Data Table:** Wrapped in a `20px` radius `#ffffff` card with `1px solid #e5e7eb` border. Header row uses `#f1f0ec` background, `11px` uppercase weight `700` `#6e6d6c` labels (`+0.025em` tracking). Rows separated by `1px solid #e5e7eb`, hover background `#f1f0ec`.

### Signature Flourishes
- **Hand-Drawn Underline Accent:** `Nanum Pen Script` at `28px–30px` in `#ff6808`, positioned directly beneath a single keyword in a `36px–64px` heading, or an SVG hand-drawn chalk stroke in `#ff6808` underneath the target word.
- **Check / Cross Lists:** `16px` weight `500` items stacked at `8px` gap, prefixed by a `20px` filled `#000000` circle containing a crisp white `✓` or `×` (on dark cards, use a `#c6ff94` circle with `#000000` `✓`).

---

## 7. Surfaces & Elevation Rules

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| **0** | Workspace Canvas | `#ffffff` | Primary main content background |
| **1** | Warm Bone Structural | `#f1f0ec` | **NavSidebar surface**, secondary page sections, quiet containers |
| **2** | Elevated Card | `#ffffff` | Content cards sitting on `#f1f0ec` sections, or bordered cards on `#ffffff` |
| **3** | Contrast Dark Band | `#000000` | Full-bleed dark sections, sidebar promo blocks, dark comparison cards |
| **4** | Pastel Wash | `#ebdcff` / `#d6e0ff` / `#c293f1` | Tinted KPI cards, active secondary pills, feature callouts |

**Strict Zero-Shadow Policy:** Do not use `box-shadow` to separate the sidebar, cards, or buttons. All hierarchy is achieved via surface color contrast (`#ffffff` vs `#f1f0ec` vs `#000000`) and crisp `1px solid #e5e7eb` borders.

---

## 8. Do's and Don'ts

### Do
- **Use `#4570ff` exclusively for primary interactive states:** Primary pill CTAs, active sidebar navigation links, and active tab underlines.
- **Anchor app views with the `#f1f0ec` NavSidebar:** Keep the sidebar warm and quiet so the active `#4570ff` pill item and `#ffffff` workspace pop.
- **Use `#ff6808` (Ember Orange) for personality & urgency:** Hero keyword underlines, outlined secondary buttons, and notification badges inside the sidebar.
- **Rotate pastel & deep card fills:** Use `#ebdcff`, `#d6e0ff`, `#c293f1`, `#193f78`, and `#244f47` across 3–4 column KPI or feature rows.
- **Maintain tight negative tracking on headings:** `-0.03em` to `-0.05em` on large headings (`36px+`), and `+0.025em` opened tracking strictly on `11px–14px` bold uppercase eyebrows and sidebar section titles.

### Don't
- **Don't fill primary buttons or active sidebar items with `#ff6808`:** Orange is an accent, outline, or badge color — never a primary action fill.
- **Don't use `Nanum Pen Script` in the sidebar, tables, or body text:** Restrict it to a single keyword underline or annotation in hero/page headers.
- **Don't add drop shadows to the sidebar or cards:** Rely on `#f1f0ec` vs `#ffffff` surface contrast and `#e5e7eb` hairline borders.
- **Don't place `#c6ff94` (Lime Highlighter) text on `#ffffff` or `#f1f0ec`:** It must only sit on `#000000`, `#193f78`, or `#244f47` surfaces for legibility.

---

## 9. Agent Prompt Recipes (Antigravity)

1. **App Shell with NavSidebar:**
   > "Create a full-height application layout with a fixed left `NavSidebar` (`260px` wide, `#f1f0ec` background, `1px solid #e5e7eb` right border, `16px` padding) and a fluid `#ffffff` main workspace. Inside the sidebar, add a top workspace switcher card (`#ffffff` fill, `12px` radius, `1px solid #e5e7eb`), two section groups with `11px` bold uppercase `#6e6d6c` headers (`+0.025em` tracking), and navigation links with `12px` radius and `10px 12px` padding. Set the active nav item to `#4570ff` fill with `#ffffff` weight `500` text, inactive items to `#555555` with `#ffffff` hover fill, and add an `#ff6808` pill badge on one item. Pin a `#000000` status card (`16px` radius, `#c6ff94` accent text) and user profile row at the bottom."

2. **Dashboard Header & 4-Card KPI Row:**
   > "Inside the `#ffffff` main workspace (`1200px` max-width container, `32px` padding), create a page header with a `36px` weight `500` `#000000` title where one keyword has an `#ff6808` `Nanum Pen Script` (`28px`) note underneath, paired with a right-aligned `#4570ff` pill CTA (`9999px` radius, `12px 24px` padding) and a `#f1f0ec` secondary pill button. Below, build a 4-column KPI grid (`16px` gap) with `20px` radius cards (`24px` padding) rotating through `#ebdcff`, `#d6e0ff`, `#c293f1` (all `#000000` text), and `#193f78` (`#ffffff` text)."

3. **Before/After or Status Split Block:**
   > "Create a 2-column split section (`20px` gap). Left card: `#f1f0ec` fill, `20px` radius, `24px` padding, `24px` weight `500` `#000000` heading, and items prefixed with `#000000` circles containing white `×` marks. Right card: `#000000` fill, `#ffffff` text, `20px` radius, `24px` padding, `#c6ff94` pill tag at the top, and items prefixed with `#c6ff94` circles containing `#000000` `✓` marks."

---

## 10. Quick Start — CSS & Tailwind v4

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-indigo-bolt: #4570ff;
  --color-indigo-bolt-hover: #345ee6;
  --color-ember-orange: #ff6808;
  --color-lime-highlighter: #c6ff94;
  --color-lavender-mist: #ebdcff;
  --color-ice-blue: #d6e0ff;
  --color-lilac-bloom: #c293f1;
  --color-deep-navy: #193f78;
  --color-forest-sage: #244f47;
  --color-warm-bone: #f1f0ec;
  --color-paper-white: #ffffff;
  --color-ink-black: #000000;
  --color-hairline: #e5e7eb;
  --color-stone: #d1d5db;
  --color-smoke: #6e6d6c;
  --color-graphite: #555555;

  /* Typography — Font Families */
  --font-sans: 'Inter', 'Manrope', 'DM Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-script: 'Nanum Pen Script', 'Caveat', cursive;

  /* Typography — Scale */
  --text-eyebrow: 11px;
  --leading-eyebrow: 1.4;
  --tracking-eyebrow: 0.025em;

  --text-caption: 12px;
  --leading-caption: 1.4;
  --tracking-caption: -0.2px;

  --text-body: 14px;
  --leading-body: 1.5;
  --tracking-body: -0.28px;

  --text-body-lg: 16px;
  --leading-body-lg: 1.5;
  --tracking-body-lg: -0.32px;

  --text-subheading: 18px;
  --leading-subheading: 1.4;
  --tracking-subheading: -0.36px;

  --text-heading-sm: 24px;
  --leading-heading-sm: 1.33;
  --tracking-heading-sm: -0.6px;

  --text-heading: 36px;
  --leading-heading: 1.2;
  --tracking-heading: -0.9px;

  --text-heading-lg: 48px;
  --leading-heading-lg: 1.14;
  --tracking-heading-lg: -1.44px;

  --text-display: 64px;
  --leading-display: 1.11;
  --tracking-display: -1.92px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-60: 60px;
  --spacing-80: 80px;
  --spacing-120: 120px;
  --spacing-160: 160px;

  /* Layout & Sidebar */
  --sidebar-width-expanded: 260px;
  --sidebar-width-collapsed: 72px;
  --topbar-height: 64px;
  --page-max-width: 1200px;

  /* Named Radii */
  --radius-icons: 8px;
  --radius-inputs: 12px;
  --radius-sidebar-item: 12px;
  --radius-nav: 16px;
  --radius-cards: 20px;
  --radius-hero: 40px;
  --radius-buttons: 9999px;
  --radius-tags: 9999px;

  /* Surfaces */
  --surface-page-canvas: #ffffff;
  --surface-sidebar: #f1f0ec;
  --surface-warm-bone-section: #f1f0ec;
  --surface-card: #ffffff;
  --surface-dark-band: #000000;
}
```

### Tailwind v4 Configuration

```css
@theme {
  /* Colors */
  --color-indigo-bolt: #4570ff;
  --color-indigo-bolt-hover: #345ee6;
  --color-ember-orange: #ff6808;
  --color-lime-highlighter: #c6ff94;
  --color-lavender-mist: #ebdcff;
  --color-ice-blue: #d6e0ff;
  --color-lilac-bloom: #c293f1;
  --color-deep-navy: #193f78;
  --color-forest-sage: #244f47;
  --color-warm-bone: #f1f0ec;
  --color-paper-white: #ffffff;
  --color-ink-black: #000000;
  --color-hairline: #e5e7eb;
  --color-stone: #d1d5db;
  --color-smoke: #6e6d6c;
  --color-graphite: #555555;

  /* Font Families */
  --font-sans: 'Inter', 'Manrope', 'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-script: 'Nanum Pen Script', 'Caveat', cursive;

  /* Radii */
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-card: 20px;
  --radius-hero: 40px;
  --radius-pill: 9999px;
}
```

### Reference HTML Pattern — App Shell & NavSidebar

```html
<div class="flex min-h-screen bg-[var(--color-paper-white)] font-[var(--font-sans)] text-[var(--color-ink-black)]">
  <!-- NavSidebar -->
  <aside class="w-[260px] shrink-0 bg-[var(--color-warm-bone)] border-r border-[var(--color-hairline)] p-4 flex flex-col justify-between select-none">
    <div class="space-y-4">
      <!-- Brand / Location Switcher -->
      <button class="w-full flex items-center justify-between bg-[var(--color-paper-white)] border border-[var(--color-hairline)] rounded-[12px] p-2.5 text-left">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-[8px] bg-[var(--color-deep-navy)] text-white flex items-center justify-center font-medium text-xs">7s</div>
          <div>
            <div class="text-[14px] font-medium leading-tight text-[var(--color-ink-black)]">Downtown Diner</div>
            <div class="text-[11px] text-[var(--color-smoke)]">Main Counter</div>
          </div>
        </div>
        <span class="text-[var(--color-smoke)] text-xs">▾</span>
      </button>

      <!-- Primary Sidebar CTA -->
      <button class="w-full bg-[var(--color-indigo-bolt)] text-white font-medium text-[14px] py-2.5 px-4 rounded-full">
        + Publish Schedule
      </button>

      <!-- Navigation Group: Operations -->
      <div>
        <div class="px-3 pt-3 pb-1.5 text-[11px] font-bold uppercase tracking-[0.025em] text-[var(--color-smoke)]">
          Operations
        </div>
        <nav class="space-y-1">
          <!-- Active Item -->
          <a href="#" class="flex items-center justify-between px-3 py-2.5 rounded-[12px] bg-[var(--color-indigo-bolt)] text-white font-medium text-[14px]">
            <span>Schedules</span>
            <span class="bg-white/20 text-white text-[11px] px-2 py-0.5 rounded-full">Live</span>
          </a>
          <!-- Default Item with Orange Alert Badge -->
          <a href="#" class="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-[var(--color-graphite)] hover:bg-[var(--color-paper-white)] hover:text-[var(--color-ink-black)] hover:font-medium text-[14px] transition-colors">
            <span>Time Clocking</span>
            <span class="bg-[var(--color-ember-orange)] text-white text-[11px] font-medium px-2 py-0.5 rounded-full">3</span>
          </a>
          <!-- Secondary Active / Tinted Item -->
          <a href="#" class="flex items-center justify-between px-3 py-2.5 rounded-[12px] bg-[var(--color-ice-blue)] text-[var(--color-ink-black)] font-medium text-[14px]">
            <span>Tip Pooling</span>
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-indigo-bolt)]"></span>
          </a>
          <a href="#" class="flex items-center justify-between px-3 py-2.5 rounded-[12px] text-[var(--color-graphite)] hover:bg-[var(--color-paper-white)] hover:text-[var(--color-ink-black)] text-[14px] transition-colors">
            <span>Team Chat</span>
          </a>
        </nav>
      </div>
    </div>

    <!-- Bottom Sidebar Zone -->
    <div class="space-y-3 pt-4">
      <!-- Dark Contrast Promo / Metric Widget -->
      <div class="bg-[var(--color-ink-black)] text-white rounded-[16px] p-4 space-y-2">
        <div class="text-[11px] font-bold uppercase tracking-[0.025em] text-[var(--color-lime-highlighter)]">
          Labor Target
        </div>
        <div class="text-[24px] font-medium tracking-[-0.6px] leading-tight">
          18.4% <span class="text-[12px] font-normal text-[var(--color-lime-highlighter)]">(-2.1%)</span>
        </div>
        <div class="text-[12px] text-[var(--color-stone)]">On track for Friday dinner rush.</div>
      </div>

      <!-- User Footer -->
      <div class="pt-3 border-t border-[var(--color-hairline)] flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-[var(--color-lavender-mist)] text-[var(--color-ink-black)] font-medium text-xs flex items-center justify-center">AK</div>
          <div>
            <div class="text-[14px] font-medium leading-none">Alex Kim</div>
            <div class="text-[12px] text-[var(--color-smoke)] mt-1">General Manager</div>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main Workspace -->
  <main class="flex-1 p-8 max-w-[1200px]">
    <!-- Workspace Content -->
  </main>
</div>
```