"use client";

import { useRef, useEffect } from "react";

export function ProductIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section id="product" className="py-16">
      <div className="space-y-4">
        <span className="text-xs font-medium uppercase tracking-widest text-accent-teal">
          Introducing Toju
        </span>
        <h2 className="max-w-lg text-xl font-normal leading-snug text-foreground sm:text-2xl">
          The voice between visits
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Toju calls your patients. It checks in on symptoms, medication
          adherence, and wellbeing; then surfaces high-risk cases to your
          clinical team. Patients get timely support. Providers get actionable
          insight. No one falls through the cracks.
        </p>
      </div>

      <div className="mt-12 rounded-lg border-2 border-accent-teal/20 p-1">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/product-demo-poster.jpg"
          className="w-full rounded-md"
        >
          <source src="/video/product-demo.webm" type="video/webm" />
          <source src="/video/product-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
