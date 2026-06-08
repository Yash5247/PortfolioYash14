"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";

const phases = portfolioData.engineering;

export function Engineering() {
  return (
    <section id="engineering" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Process"
          title="How I Build Software"
          description="My engineering workflow — from problem definition through deployment and iteration. Every step exists because it prevents a class of mistakes I've encountered building real products."
        />

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-border md:block" />

          <div className="space-y-6">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                className="relative md:pl-12"
              >
                <div className="absolute left-0 top-6 hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-background font-mono text-xs font-medium md:flex">
                  {phase.phase}
                </div>

                <div className="rounded-xl border border-border p-6 transition-colors hover:border-foreground/15">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-muted-foreground md:hidden">
                      {phase.phase}
                    </span>
                    <h3 className="text-lg font-semibold">{phase.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {phase.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {phase.practices.map((practice) => (
                      <span
                        key={practice}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {practice}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
