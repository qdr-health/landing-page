"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const partners = [
  { name: "British Heart Foundation", logo: "/partners/bhf.jpg" },
  { name: "Clinical Entrepreneur", logo: "/partners/clinicalentrepeneur.webp" },
  { name: "DHL", logo: "/partners/dhl.png" },
  { name: "European Society of Cardiology", logo: "/partners/esc.jpg" },
  { name: "NHS", logo: "/partners/nhs.png" },
  { name: "P4", logo: "/partners/p4.jpeg" },
  { name: "Pioneer", logo: "/partners/pioneer.png" },
  { name: "Yorkshire", logo: "/partners/yorkshire.png" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function Partners() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="partners" className="py-24">
      <div className="space-y-4">
        <span className="text-xs font-medium uppercase tracking-widest text-accent-teal">
          Trusted By
        </span>
        <h2 className="max-w-lg text-xl font-normal leading-snug text-foreground sm:text-2xl">
          Backed by leading healthcare organizations
        </h2>
      </div>

      <div className="relative mt-12">
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

        {/* Grid container */}
        <motion.div
          className="relative grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-4"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="group relative flex items-center justify-center bg-background p-4 transition-colors duration-200 hover:bg-muted/50 sm:p-8"
            >
              {/* Subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Corner accents */}
              <div className="pointer-events-none absolute left-0 top-0 h-4 w-px bg-gradient-to-b from-accent-teal/30 to-transparent transition-all duration-300 group-hover:from-accent-teal/60" />
              <div className="pointer-events-none absolute left-0 top-0 h-px w-4 bg-gradient-to-r from-accent-teal/30 to-transparent transition-all duration-300 group-hover:from-accent-teal/60" />

              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="relative h-8 w-auto max-w-[80px] object-contain grayscale opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-12 sm:max-w-[120px]"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Grid line accents */}
        <div className="pointer-events-none absolute inset-0 rounded-lg border border-border" />
      </div>
    </section>
  );
}
