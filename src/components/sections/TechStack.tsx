"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const techStack = portfolioData.techStack;
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

const categories = Object.keys(techStack) as (keyof typeof techStack)[];

export function TechStack() {
  const [active, setActive] = useState<keyof typeof techStack>("Frontend");

  return (
    <section id="tech-stack" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Skills"
          title="Tech Stack"
          description="Technologies and tools I use to build modern, scalable applications."
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                active === cat
                  ? "bg-foreground text-background"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
              data-cursor="pointer"
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          >
            {techStack[active].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="relative text-sm font-medium">{tech}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
