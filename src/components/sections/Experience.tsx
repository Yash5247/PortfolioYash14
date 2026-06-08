"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const experience = portfolioData.experience;
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Career"
          title="Experience"
          description="My professional journey building software and leading technical initiatives."
        />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="relative space-y-2">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-border lg:block" />
            {experience.map((exp, i) => (
              <button
                key={exp.company}
                onClick={() => setActive(i)}
                className={`relative flex w-full items-start gap-4 rounded-xl p-4 text-left transition-all duration-300 ${
                  active === i
                    ? "bg-muted"
                    : "hover:bg-muted/50"
                }`}
                data-cursor="pointer"
              >
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    active === i
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background"
                  }`}
                >
                  <Briefcase className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-semibold">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8">
                  <p className="text-sm text-muted-foreground">
                    {experience[active].period}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    {experience[active].role}
                  </h3>
                  <p className="mt-1 text-lg text-muted-foreground">
                    {experience[active].company}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {experience[active].achievements.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-3 text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
