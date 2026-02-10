# ANIMATION.md — Motion & Interaction Reference

This document governs all animation and motion decisions. Read it fully before adding any animation.

---

## Core Philosophy

Animation is not decoration. It is communication.

Every motion must have a **purpose**. If you cannot articulate why something moves, it should not move. The best animation is invisible — users feel it without noticing it.

### The Four Purposes of Animation

| Purpose | What It Does | Examples |
|---------|--------------|----------|
| **Orientation** | Answers "Where am I?" | Scroll progress, page transitions, section reveals |
| **Feedback** | Confirms "My action was received" | Button press, form submit, toggle state |
| **Continuity** | Maintains spatial mental model | Element transforms, shared element transitions |
| **Delight** | Rewards engagement (use sparingly) | Confetti on success, playful hover states |

If an animation doesn't serve one of these purposes, remove it.

---

## Duration

Speed matters. Too slow feels sluggish. Too fast feels jarring.

| Category | Duration | Examples |
|----------|----------|----------|
| Micro-interaction | 100–200ms | Hover states, focus rings, color shifts, toggles |
| Element transition | 200–400ms | Fade-in, slide, scale, modal open/close |
| Page orchestration | 400–800ms | Staggered section entrance, hero sequence |
| **Hard ceiling** | **1000ms** | Nothing exceeds this unless it's a loading indicator |

### Duration Decision Tree

```
Is it a hover/focus state?
  → 150ms

Is it a single element entering/leaving?
  → 300ms

Is it a coordinated sequence (multiple elements)?
  → 400-600ms total, with stagger

Does it feel slow when you watch it?
  → Cut duration by 30%
```

---

## Easing

**Never use `linear` for UI motion.** Linear motion feels mechanical and unnatural.

### Easing Reference

| Context | CSS | Cubic Bezier | Framer Motion |
|---------|-----|--------------|---------------|
| Element entering viewport | `ease-out` | `[0.25, 0.1, 0.25, 1]` | Default or custom |
| Element leaving viewport | `ease-in` | `[0.42, 0, 1, 1]` | — |
| State change (hover, toggle) | `ease-in-out` | `[0.42, 0, 0.58, 1]` | — |
| Snappy interaction | — | `[0.16, 1, 0.3, 1]` | Spring preferred |

### Tailwind Easing Classes

```tsx
// Standard transitions
className="transition-colors duration-150 ease-in-out"
className="transition-transform duration-200 ease-out"
className="transition-opacity duration-300 ease-out"
```

### Spring Physics (Framer Motion)

Springs feel more natural than bezier curves for interactive elements:

```tsx
// Snappy, responsive — default for most interactions
const snappy = { type: "spring", stiffness: 400, damping: 30 };

// Gentle, organic — page-level entrances, modals
const gentle = { type: "spring", stiffness: 200, damping: 20 };

// Bouncy — celebratory moments only, use very sparingly
const bouncy = { type: "spring", stiffness: 300, damping: 15 };

// Quick settle — tooltips, dropdowns
const quick = { type: "spring", stiffness: 500, damping: 35 };
```

**Rule of thumb**: Higher stiffness = faster. Higher damping = less bounce.

---

## Stagger Patterns

When multiple elements enter together (cards, list items, features), stagger their entrance.

### Stagger Timing

| Element Count | Stagger Delay | Total Duration |
|---------------|---------------|----------------|
| 2–4 elements | 60–80ms | ~300–400ms |
| 5–8 elements | 40–60ms | ~400–600ms |
| 9+ elements | 30–50ms | Cap at 600ms total |

**Never exceed 100ms stagger delay.** It becomes sluggish.

### Implementation

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06, // 60ms
      delayChildren: 0.1,    // Optional delay before first child
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
```

---

## Scroll-Triggered Animations

### Best Practices

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
>
```

| Setting | Value | Reason |
|---------|-------|--------|
| `once` | `true` | Elements animate in once, never re-trigger on scroll up |
| `amount` | `0.3` | 30% of element must be visible before triggering |
| `y` offset | `20–30px` | Subtle. Larger values look like broken layouts |

### Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| `once: false` | Elements flicker on scroll | Always use `once: true` |
| `amount: 0` | Triggers too early, feels random | Use `0.2–0.4` |
| `y: 50` or higher | Looks like layout shift | Keep under 30px |
| No stagger on grids | Everything appears at once | Add `staggerChildren` |

---

## Reduced Motion

**Non-negotiable.** Always respect `prefers-reduced-motion`.

Users enable reduced motion for medical reasons (vestibular disorders, motion sensitivity) or personal preference. Ignoring this setting is an accessibility failure.

### Implementation Pattern

```tsx
"use client";

import { useReducedMotion } from "framer-motion";

interface AnimatedProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### What to Preserve vs. Remove

| Keep (essential) | Remove (decorative) |
|------------------|---------------------|
| Opacity fades (instant) | Transforms (slide, scale) |
| Color transitions | Parallax effects |
| Focus indicators | Stagger delays |
| Loading spinners | Bouncy springs |

---

## Performance Constraints

### The Golden Rule

**Only animate `transform` and `opacity`.**

These properties are compositor-only — they don't trigger layout or paint recalculation.

| Safe (Compositor) | Unsafe (Layout/Paint) |
|-------------------|----------------------|
| `transform: translateX/Y` | `width`, `height` |
| `transform: scale` | `top`, `left`, `right`, `bottom` |
| `transform: rotate` | `margin`, `padding` |
| `opacity` | `border-width` |
| `filter` (with care) | `font-size` |

### `will-change` Usage

Use sparingly. Overuse creates memory issues.

```tsx
// Correct: Apply just before animation starts
onMouseEnter={() => setWillChange(true)}
onAnimationComplete={() => setWillChange(false)}

// Incorrect: Static will-change on many elements
className="will-change-transform" // Avoid on static elements
```

### When to Use CSS vs. Framer Motion

| Use Tailwind CSS | Use Framer Motion |
|------------------|-------------------|
| Hover/focus states | Scroll-triggered entrances |
| Simple color shifts | Staggered animations |
| Duration < 200ms | Spring physics |
| No JS dependency needed | Gesture-based interactions |
| Micro-interactions | Page transitions |

---

## Landing Page Animation Patterns

### Hero Entrance Sequence

The hero should feel instant yet polished. Total duration under 600ms.

| Element | Delay | Duration | Transform |
|---------|-------|----------|-----------|
| Headline | 0ms | 400ms | opacity + y: 20 |
| Subtext | 100ms | 400ms | opacity + y: 20 |
| CTA buttons | 200ms | 400ms | opacity + y: 20 |
| Supporting visual | 300ms | 500ms | opacity + scale: 0.95 |

```tsx
const heroVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};
```

### Feature Card Grid

```tsx
// Container triggers children
<motion.div
  className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {features.map((feature) => (
    <motion.div key={feature.id} variants={itemVariants}>
      <FeatureCard {...feature} />
    </motion.div>
  ))}
</motion.div>
```

### Number/Stat Counter Animation

Only animate when in viewport. Never auto-play on load.

```tsx
"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export function AnimatedCounter({ target, duration = 2000, suffix = "" }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}
```

### Parallax (Use Sparingly)

- **Rate**: 10–20% difference between layers. No more.
- **Disable on mobile**: Touch-based parallax causes disorientation.
- **Respect reduced motion**: Disable entirely when preference is set.

```tsx
"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  if (shouldReduceMotion) {
    return <img src={src} alt={alt} className="object-cover" />;
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="object-cover scale-110" // Scale to prevent gaps
      />
    </div>
  );
}
```

### Gradient Animations

For animated gradients, use CSS `@property` for GPU-accelerated hue/position shifts:

```css
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.animated-gradient {
  background: linear-gradient(var(--gradient-angle), #6366f1, #8b5cf6, #a855f7);
  animation: rotate-gradient 8s linear infinite;
}

@keyframes rotate-gradient {
  to {
    --gradient-angle: 360deg;
  }
}
```

Keep cycle > 5 seconds to avoid visual fatigue.

---

## Reusable Animation Components

### AnimatedGroup + AnimatedItem

Standard pattern for staggered entrance animations:

```tsx
"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";

interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: keyof JSX.IntrinsicElements;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function AnimatedGroup({
  children,
  className,
  staggerDelay = 0.06,
  as = "div",
}: AnimatedGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  if (shouldReduceMotion) {
    const StaticComponent = as;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  return (
    <Component
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={staggerDelay}
    >
      {children}
    </Component>
  );
}

export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
```

### SectionWrapper

Consistent section spacing with optional ID for anchor links:

```tsx
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  container?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  as: Component = "section",
  container = true,
}: SectionWrapperProps) {
  return (
    <Component
      id={id}
      className={cn("py-16 sm:py-24 lg:py-32", className)}
    >
      {container ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
```

### FadeIn

Simple fade-in wrapper for individual elements:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

const directionOffsets = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
  none: {},
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionOffsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Cursor & Pointer Interactions

Only add these if they genuinely enhance understanding:

### Acceptable

- **Magnetic buttons**: Subtle pull toward cursor, < 5px max
- **Spotlight/glow on hover**: Feature cards, pricing tables
- **Tilt on hover**: 3D card effects with `perspective`

### Never Do

- Replace the native cursor with a custom element
- Add drag behaviors to non-draggable content
- Create cursor trails or following elements
- Make the cursor disappear or change unexpectedly

### Magnetic Button Example

```tsx
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Max 4px pull
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="..." // Your button styles
    >
      {children}
    </motion.button>
  );
}
```

---

## Animation Debugging Checklist

Before shipping any animation:

- [ ] Does it serve one of the four purposes (orientation, feedback, continuity, delight)?
- [ ] Is the duration under 1000ms?
- [ ] Does it use only `transform` and `opacity`?
- [ ] Does it respect `prefers-reduced-motion`?
- [ ] Does the stagger total stay under 600ms?
- [ ] Is `viewport={{ once: true }}` set for scroll triggers?
- [ ] Does it feel fast, not sluggish?
- [ ] Would removing it hurt the experience? (If no, remove it.)
