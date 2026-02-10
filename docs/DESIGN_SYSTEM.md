# DESIGN_SYSTEM.md — Visual Design Reference

This document is the source of truth for all visual design decisions. Read it fully before any layout or styling work.

---

## Design Philosophy: Restrained Minimalism

This landing page follows a philosophy of **radical restraint**. The design communicates through typography and whitespace, not decoration.

### Core Principles

1. **Content occupies ≤60% of viewport width.** The remaining 40%+ is intentional negative space. This creates breathing room and signals confidence.

2. **Monochromatic palette.** Black and white with subtle off-tones. No brand colors in the hero. Color is reserved for interactive states and feedback.

3. **Typography does the heavy lifting.** Hierarchy comes from size and weight, not color or ornamentation.

4. **Left-aligned asymmetry.** Content anchors to the left edge. The right side is open space. This creates tension and directs the eye.

5. **No visual noise.** No gradients, no shadows, no decorative borders in primary sections. Every element earns its place.

### Reference Aesthetic

Think: Stripe's documentation, Linear's marketing site, Apple's product pages. Confidence through restraint.

---

## Visual Hierarchy

A landing page has one job: guide the visitor through a narrative that ends in action. Hierarchy controls that narrative.

### Principles

- **One H1 per page.** The single most important statement. Everything else is subordinate.
- **Hierarchy tools** in order of impact: size → weight → space → position → color (color is last, not first).
- **Squint test**: Blur the page. Can you still identify the heading and the section breaks? If not, hierarchy has failed.
- **The headline IS the hero.** No supporting images, icons, or illustrations in the hero unless they add meaning. The typography alone should command attention.

### Common Failures

| Problem | Symptom | Fix |
|---------|---------|-----|
| Competing focal points | Two elements fight for attention | Remove the weaker element entirely |
| Flat hierarchy | Everything looks the same importance | Dramatically increase heading size |
| Visual clutter | Too many elements | Delete until it hurts, then delete one more |
| Centered hero | Feels static, generic | Left-align, let whitespace work |

---

## Layout: The 60% Rule

**Content must not exceed 60% of the viewport width.** This is non-negotiable for primary sections.

### Implementation

```tsx
// Hero and major sections — content constrained to left 60%
<section className="min-h-screen px-6 sm:px-12 lg:px-24">
  <div className="max-w-[60%] lg:max-w-[55%]">
    {/* All content lives here */}
  </div>
</section>

// Alternative: explicit max-width (preferred for consistency)
<section className="min-h-screen px-6 sm:px-12 lg:px-24">
  <div className="max-w-3xl"> {/* ~48rem, roughly 60% of 80rem container */}
    {/* Content */}
  </div>
</section>
```

### Breakpoint Behavior

| Viewport | Content Width | Notes |
|----------|---------------|-------|
| Mobile (<640px) | 100% minus padding | Full width is acceptable |
| Tablet (640-1024px) | ~70% | Begin introducing asymmetry |
| Desktop (1024px+) | ≤60% | Strict adherence |
| Large (1440px+) | ≤55% | Even more restraint |

### Section Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo/Menu]                                      [Login]    │  ← Nav: full width
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  The AI-powered lease                                       │
│  abstraction, data organization,                            │
│  and integrated chat platform for          ← 60% max        │  ← Hero content
│  your commercial real estate                                │
│  portfolio                                                  │
│                                                             │
│                                              ← 40% empty    │  ← Intentional void
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  LEASE ABSTRACTION                                          │
│  Your most important document, decoded      ← 60% max       │  ← Section content
│  [Description text...]                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Typography

Typography is the primary design tool. It must be confident and precise.

### Scale

Use a constrained set of sizes. The scale creates clear hierarchy through dramatic size differences.

```css
/* Display — Hero headlines only */
--font-size-display: clamp(2.5rem, 5vw + 1rem, 4.5rem);  /* 40px → 72px */

/* Headings */
--font-size-h1: clamp(2rem, 4vw + 0.5rem, 3.5rem);      /* 32px → 56px */
--font-size-h2: clamp(1.5rem, 2vw + 0.5rem, 2.25rem);   /* 24px → 36px */
--font-size-h3: 1.25rem;                                 /* 20px */

/* Body */
--font-size-body-lg: 1.125rem;   /* 18px — primary body, descriptions */
--font-size-body: 1rem;          /* 16px — standard body */
--font-size-body-sm: 0.875rem;   /* 14px — secondary, metadata */

/* UI */
--font-size-caption: 0.75rem;    /* 12px — labels, legal */
--font-size-overline: 0.6875rem; /* 11px — section labels, ALL CAPS */
```

### Tailwind Implementation

```tsx
// Hero headline — display size, tight leading, tight tracking
<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] tracking-tight">

// Section subheading — overline style
<span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">

// Body text — comfortable reading
<p className="text-lg leading-relaxed text-neutral-600">
```

### Line Height

| Context | Value | Tailwind |
|---------|-------|----------|
| Display/Hero headlines | 1.1 | `leading-[1.1]` or `leading-none` |
| Section headings | 1.2 | `leading-tight` |
| Body text | 1.6–1.7 | `leading-relaxed` |
| Overlines/Labels | 1 | `leading-none` |

### Letter Spacing

| Context | Treatment | Tailwind |
|---------|-----------|----------|
| Display headlines (48px+) | Tight | `tracking-tight` |
| All-caps overlines | Wide | `tracking-widest` or `tracking-[0.2em]` |
| Body text | Never adjust | — |

### Font Weight

Limit to **two weights maximum** per page:

| Weight | Use |
|--------|-----|
| 400 (regular) | Body text, descriptions |
| 500 (medium) | Headlines, buttons, nav |

Avoid bold (700) except for extreme emphasis. The size difference should create hierarchy, not weight.

---

## Color System: Monochromatic

The palette is intentionally limited. Black and white with carefully chosen off-tones.

### The Palette

```css
/* === Backgrounds === */
--color-bg: #ffffff;              /* Pure white — page background */
--color-bg-subtle: #fafafa;       /* Off-white — alternating sections */
--color-bg-muted: #f5f5f5;        /* Light gray — cards, wells */
--color-bg-inverse: #0a0a0a;      /* Near-black — dark sections, footer */

/* === Text === */
--color-text: #0a0a0a;            /* Near-black — headlines, primary text */
--color-text-secondary: #525252;  /* Dark gray — body text */
--color-text-muted: #737373;      /* Medium gray — descriptions, secondary */
--color-text-subtle: #a3a3a3;     /* Light gray — placeholders, tertiary */
--color-text-inverse: #fafafa;    /* Off-white — text on dark backgrounds */

/* === Borders === */
--color-border: #e5e5e5;          /* Light gray — default borders */
--color-border-subtle: #f0f0f0;   /* Lighter — dividers */
--color-border-focus: #0a0a0a;    /* Near-black — focus rings */

/* === Interactive (used sparingly) === */
--color-interactive: #0a0a0a;     /* Near-black — primary buttons */
--color-interactive-hover: #262626; /* Slightly lighter on hover */
```

### Tailwind Mapping

```tsx
// Use Tailwind's neutral scale for consistency
bg-white              // --color-bg
bg-neutral-50         // --color-bg-subtle
bg-neutral-100        // --color-bg-muted
bg-neutral-950        // --color-bg-inverse

text-neutral-950      // --color-text (headlines)
text-neutral-700      // --color-text-secondary (body)
text-neutral-500      // --color-text-muted (descriptions)
text-neutral-400      // --color-text-subtle (placeholders)

border-neutral-200    // --color-border
border-neutral-100    // --color-border-subtle
```

### Color Usage Rules

1. **Headlines**: Always `text-neutral-950` (near-black)
2. **Body text**: `text-neutral-600` or `text-neutral-700`
3. **Descriptions/secondary**: `text-neutral-500`
4. **Section labels (overlines)**: `text-neutral-500` + uppercase
5. **Buttons**: Black background (`bg-neutral-950`) with white text, or ghost (border only)
6. **No accent colors in hero**. Save color for CTAs deep in the page or interactive states.

### Stylized Off-Tones

For subtle variation without introducing color:

```css
/* Warm off-white (slightly yellow undertone) */
--bg-warm: #fffef9;

/* Cool off-white (slightly blue undertone) */
--bg-cool: #f8fafc;

/* Warm black (brown undertone) */
--text-warm: #1c1917;

/* Cool black (blue undertone) */
--text-cool: #0f172a;
```

Use these sparingly to add subtle warmth or coolness without breaking monochrome.

---

## Spacing System

### Base Unit: 4px

| Token | Value | Tailwind | Use |
|-------|-------|----------|-----|
| 1 | 4px | `gap-1` | Icon padding |
| 2 | 8px | `gap-2` | Tight element spacing |
| 3 | 12px | `gap-3` | Button padding |
| 4 | 16px | `gap-4` | Standard gaps |
| 6 | 24px | `gap-6` | Section internal |
| 8 | 32px | `gap-8` | Between content blocks |
| 12 | 48px | `py-12` | Section padding (mobile) |
| 16 | 64px | `py-16` | Section padding (tablet) |
| 24 | 96px | `py-24` | Section padding (desktop) |
| 32 | 128px | `py-32` | Hero padding |
| 40 | 160px | `py-40` | Extra breathing room |

### Generous Vertical Rhythm

For this aesthetic, err toward **more** vertical space:

```tsx
// Hero section — maximum breathing room
<section className="min-h-screen flex flex-col justify-center py-24 lg:py-32">

// Content sections — generous padding
<section className="py-24 sm:py-32 lg:py-40">

// Space between headline and description
<div className="space-y-6 sm:space-y-8">
  <h1>...</h1>
  <p>...</p>
</div>

// Space between section label and heading
<div className="space-y-4">
  <span className="overline">LEASE ABSTRACTION</span>
  <h2>Your most important document, decoded</h2>
</div>
```

---

## Component Patterns

### Navigation

Minimal, unobtrusive, black and white:

```tsx
<header className="fixed top-0 inset-x-0 z-50">
  <nav className="flex items-center justify-between px-6 sm:px-12 lg:px-24 py-6">
    {/* Left: Logo + Menu in pill */}
    <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2">
      <Logo className="h-5 w-5" />
      <span className="text-sm font-medium">Menu</span>
    </div>

    {/* Right: Login button */}
    <a
      href="/login"
      className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50"
    >
      Log In
    </a>
  </nav>
</header>
```

### Primary Button

Black background, white text, rounded-full:

```tsx
<button className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2">
  Get Started
</button>
```

### Secondary/Ghost Button

Border only, transparent background:

```tsx
<button className="rounded-full border border-neutral-200 bg-transparent px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2">
  Learn More
</button>
```

### Section Label (Overline)

```tsx
<span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">
  Lease Abstraction
</span>
```

### Cards (If Used)

Minimal, no shadow, subtle border or background:

```tsx
<div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8">
  {/* Card content */}
</div>
```

---

## Hero Pattern

The hero is typography-forward. No images, no illustrations, just words and space.

```tsx
<section className="relative min-h-screen">
  {/* Navigation */}
  <Header />

  {/* Hero Content — constrained to left 60% */}
  <div className="flex min-h-screen flex-col justify-center px-6 sm:px-12 lg:px-24 pt-24 pb-32">
    <div className="max-w-3xl">
      <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
        The AI-powered lease abstraction, data organization, and integrated
        chat platform for your commercial real estate portfolio
      </h1>
    </div>
  </div>
</section>
```

### Hero Variations

**With subtext:**
```tsx
<div className="max-w-3xl space-y-8">
  <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
    Headline here
  </h1>
  <p className="max-w-xl text-lg leading-relaxed text-neutral-600">
    Supporting description that elaborates on the headline.
  </p>
</div>
```

**With CTA:**
```tsx
<div className="max-w-3xl space-y-12">
  <div className="space-y-6">
    <h1>...</h1>
    <p>...</p>
  </div>
  <div className="flex flex-wrap gap-4">
    <PrimaryButton>Get Started</PrimaryButton>
    <SecondaryButton>Learn More</SecondaryButton>
  </div>
</div>
```

---

## Section Pattern

```tsx
<section className="py-24 sm:py-32 lg:py-40">
  <div className="px-6 sm:px-12 lg:px-24">
    <div className="max-w-3xl space-y-6">
      {/* Overline */}
      <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">
        Lease Abstraction
      </span>

      {/* Heading */}
      <h2 className="text-2xl font-medium leading-tight tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl">
        Your most important document, decoded
      </h2>

      {/* Description */}
      <p className="max-w-xl text-lg leading-relaxed text-neutral-600">
        Datum's AI-powered lease abstraction tool empowers you to understand
        your lease with depth, speed, and accuracy.
      </p>
    </div>
  </div>
</section>
```

---

## Contrast & Accessibility

### Text Contrast (WCAG AA)

| Pairing | Ratio | Status |
|---------|-------|--------|
| `neutral-950` on `white` | 19.6:1 | Pass |
| `neutral-700` on `white` | 8.6:1 | Pass |
| `neutral-600` on `white` | 5.7:1 | Pass |
| `neutral-500` on `white` | 4.6:1 | Pass (just) |
| `neutral-400` on `white` | 3.0:1 | Fail for body text |

**Rule**: `neutral-500` is the lightest gray acceptable for body text. Use `neutral-400` only for placeholder text or decorative elements.

### Focus States

All interactive elements must have visible focus:

```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
```

---

## What NOT to Do

| Don't | Why |
|-------|-----|
| Add gradients to backgrounds | Breaks monochrome, adds visual noise |
| Use drop shadows on cards | Too decorative for this aesthetic |
| Center the hero headline | Loses tension, feels generic |
| Add hero images/illustrations | Let typography be the hero |
| Use more than 2 font weights | Creates noise, weakens hierarchy |
| Fill the viewport with content | Violates 60% rule, feels cramped |
| Add decorative dividers | Whitespace should separate sections |
| Use colored buttons in hero | Save color for deeper in the page |
| Add background patterns | Distracts from content |
| Use rounded corners > 2xl | Feels too soft; prefer `rounded-2xl` or `rounded-full` |
