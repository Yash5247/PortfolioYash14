"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Card, CardContent } from "@/components/ui/card";

const specializations = [
  "Software Engineering",
  "Full Stack Development",
  "DevOps",
  "Automation",
  "AI Integration",
];

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="About"
          title="Professional Summary"
          description="Computer Science undergraduate specializing in building scalable software, automation systems, and modern digital experiences."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m a passionate software developer with expertise spanning
              full-stack development, DevOps practices, and AI-powered
              automation. I thrive on solving complex problems and delivering
              production-ready applications that make a real impact.
            </p>
            <ul className="mt-8 space-y-3">
              {specializations.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
            {portfolioData.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group transition-all duration-300 hover:border-foreground/20 hover:shadow-lg">
                  <CardContent className="p-6">
                    <p className="text-3xl font-semibold tracking-tight">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
