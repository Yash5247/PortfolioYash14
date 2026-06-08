"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";

const phases = portfolioData.engineering;

export function Engineering() {
  const [activePhase, setActivePhase] = useState(phases[0].phase);

  const active = phases.find((p) => p.phase === activePhase) ?? phases[0];
  const activeIndex = phases.findIndex((p) => p.phase === activePhase);

  return (
    <section id="process" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Process"
          title="How I build software"
          description="Click each phase to explore the workflow. Every step exists because it prevents a class of mistakes I've encountered building real products."
        />

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="relative space-y-1">
            <div
              className="absolute bottom-4 left-[19px] top-4 w-px bg-border transition-all duration-500"
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(99,102,241,0.5) 0%, 
                  rgba(99,102,241,0.5) ${((activeIndex + 1) / phases.length) * 100}%, 
                  rgba(255,255,255,0.05) ${((activeIndex + 1) / phases.length) * 100}%, 
                  rgba(255,255,255,0.05) 100%)`,
              }}
            />
            {phases.map((phase, i) => (
              <button
                key={phase.phase}
                onClick={() => setActivePhase(phase.phase)}
                className={`relative flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                  activePhase === phase.phase
                    ? "bg-muted"
                    : "hover:bg-muted/50"
                }`}
              >
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-all ${
                    activePhase === phase.phase
                      ? "border-violet-500 bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                      : i < activeIndex
                        ? "border-violet-500/50 bg-violet-500/10 text-violet-400"
                        : "border-border"
                  }`}
                >
                  {phase.phase}
                </span>
                <span className="text-sm font-medium">{phase.title}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.phase}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-card/50 p-8"
            >
              <div className="flex items-center gap-2 text-violet-400">
                <span className="font-mono text-sm">{active.phase}</span>
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm font-medium">{active.title}</span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {active.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.practices.map((practice, i) => (
                  <motion.span
                    key={practice}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {practice}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
