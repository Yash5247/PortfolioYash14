"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/shared/SectionHeading";

const Lanyard = dynamic(() => import("@/components/components/LanyardClient"), {
  ssr: false,
});

export function LanyardSection() {
  return (
    <section id="badge" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black via-black/80 to-transparent px-6 pb-8 pt-12">
        <SectionHeading
          label="Developer ID"
          title="Behind The Developer"
          description="Drag the badge to interact."
        />
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
