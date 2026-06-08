"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";

const specializations = [
  "Full Stack Development",
  "AI Automation Systems",
  "Backend Architecture",
  "Database Design",
  "Product Engineering",
];

export function About() {
  const { personal } = portfolioData;

  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="About"
          title="Engineering real systems"
          description={personal.summary}
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              I&apos;m a Computer Science undergraduate based in{" "}
              {personal.location}. My work centers on shipping production
              software — not demos. As co-founder of{" "}
              <a
                href={portfolioData.socials.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                Pramana15
              </a>
              , I build full-stack products spanning AI chatbot automation,
              content pipelines, and data management platforms.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I care about system design, clean API boundaries, and building
              software that solves operational problems — lead capture,
              content workflows, record validation, and stakeholder dashboards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Focus Areas
            </p>
            <ul className="space-y-3">
              {specializations.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 border-b border-border py-3 text-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
