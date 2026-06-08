"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Building2, Code2, Bot, Database } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { AnimatedGrid } from "@/components/effects/section-backgrounds";
import { SectionHeader } from "@/components/shared/SectionHeader";

const { personal } = portfolioData;

const bentoItems = [
  {
    icon: Building2,
    title: "Co-Founder",
    subtitle: "Pramana15",
    description:
      "Building AI automation, lead systems, and full-stack products from zero to production.",
    className: "md:col-span-2 md:row-span-2",
    large: true,
  },
  {
    icon: Code2,
    title: "Full Stack",
    subtitle: "Engineering",
    description: "React, Node.js, APIs, and database design.",
    className: "md:col-span-1",
  },
  {
    icon: Bot,
    title: "AI Automation",
    subtitle: "OpenAI · LLM",
    description: "Chatbots, prompt pipelines, and workflow automation.",
    className: "md:col-span-1",
  },
  {
    icon: Database,
    title: "Data Systems",
    subtitle: "SQL · Supabase",
    description: "Schema design, validation, and traceable records.",
    className: "md:col-span-2",
  },
  {
    icon: MapPin,
    title: personal.location,
    subtitle: "Based in",
    description: personal.email,
    className: "md:col-span-1",
    link: `mailto:${personal.email}`,
  },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <AnimatedGrid className="pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          label="About"
          title={personal.name}
          description={personal.summary}
        />

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-3">
          {bentoItems.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`group flex h-full flex-col justify-between rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-foreground/15 hover:bg-card/80 ${item.className}`}
              >
                <div>
                  <Icon
                    className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground"
                    strokeWidth={1.5}
                  />
                  <p className="mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {item.subtitle}
                  </p>
                  <h3
                    className={`mt-1 font-semibold tracking-tight ${
                      item.large ? "text-2xl sm:text-3xl" : "text-lg"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {item.link && (
                  <Mail className="mt-4 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                )}
              </motion.div>
            );

            return item.link ? (
              <a key={item.title} href={item.link} className={item.className}>
                {content}
              </a>
            ) : (
              <div key={item.title} className={item.className}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
