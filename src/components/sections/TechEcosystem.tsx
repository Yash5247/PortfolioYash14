"use client";

import { LogoLoop } from "@/components/effects/LogoLoop";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function TechEcosystem() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Skills"
          title="Technology ecosystem"
          description="Official logos in a continuous loop. Hover to magnify, reveal context, project usage, and how technologies connect in real systems."
        />
        <LogoLoop className="mt-12" speed={50} />
      </div>
    </section>
  );
}
