"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

const tools = portfolioData.tools;
const categories = Object.keys(tools);

export function Tools() {
  const [active, setActive] = useState(categories[0]);

  return (
    <section id="tools" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Toolkit"
          title="Tools & Technologies"
          description="Technologies I use to design, build, and ship production software. DevOps and deployment tools are part of the stack — not the headline."
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                active === cat
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
          >
            {tools[active].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-foreground/15"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
