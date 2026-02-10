"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const missionText =
  "Healthcare teams are stretched thin. Patients fall through the cracks. We started QDR Health to change that — building AI that reaches every patient, surfaces risks early, and helps care happen before the crisis.";

export function Mission() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Split text into words for individual animation
  const words = missionText.split(" ");

  if (shouldReduceMotion) {
    return (
      <section id="mission" className="py-32 sm:py-40">
        <p className="max-w-3xl text-xl font-normal leading-relaxed text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          {missionText}
        </p>
      </section>
    );
  }

  return (
    <section id="mission" ref={containerRef} className="relative h-[200vh] sm:h-[300vh]">
      {/* Sticky container that stays pinned during scroll */}
      <div className="sticky top-0 flex h-screen items-center py-12">
        <p className="max-w-3xl text-xl font-normal leading-relaxed sm:text-2xl md:text-3xl lg:text-4xl">
          {words.map((word, index) => {
            // Calculate progress range for each word
            // Use a narrower range so words reveal faster
            const start = index / words.length;
            const end = start + 1.5 / words.length;

            return (
              <Word
                key={index}
                word={word}
                progress={scrollYProgress}
                range={[start, Math.min(end, 1)]}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}

interface WordProps {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Word({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block text-foreground"
    >
      {word}&nbsp;
    </motion.span>
  );
}
