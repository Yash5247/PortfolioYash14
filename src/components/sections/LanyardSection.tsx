"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/components/LanyardClient"), {
  ssr: false,
});

export function LanyardSection() {
  return (
    <section id="badge" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black to-transparent py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Behind The Developer
        </h2>
        <p className="mt-2 text-sm text-white/50">
          Drag the badge — physics-powered developer ID
        </p>
      </div>
      <div className="relative h-screen w-full">
        <Lanyard
          position={[0, 0, 20]}
          gravity={[0, -40, 0]}
          frontImage="/badge.png"
          imageFit="cover"
          transparent
        />
      </div>
    </section>
  );
}
