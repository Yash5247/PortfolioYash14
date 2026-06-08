"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Building2, Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { companyMeta } from "@/lib/company-meta";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const ElectricBorder = dynamic(
  () => import("@/components/effects/ElectricBorderClient"),
  { ssr: false }
);

export function ExperienceCards() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Career"
          title="Work Experience"
          description="Companies I've worked with and the systems I've built."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {experiences.map((exp, index) => {
            const meta = companyMeta[exp.id] ?? {
              icon: Building2,
              color: "#7df9ff",
              initials: exp.company.slice(0, 2).toUpperCase(),
              tagline: "Experience",
            };
            const Icon = meta.icon;

            return (
              <ScrollReveal key={exp.id} delay={index * 0.1}>
                <ElectricBorder
                  color={meta.color}
                  speed={1}
                  chaos={0.1}
                  borderRadius={18}
                  className="w-full"
                  style={{ borderRadius: 18 }}
                >
                  <div className="readable-card flex min-h-[300px] flex-col p-6">
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15"
                        style={{
                          background: `linear-gradient(135deg, ${meta.color}30, rgba(0,0,0,0.5))`,
                        }}
                      >
                        <Icon
                          className="h-7 w-7"
                          style={{ color: meta.color }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="font-mono text-xs text-white/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-white/60">
                      {meta.tagline}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white text-shadow-sm">
                      {exp.company}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-white/90">{exp.role}</p>

                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/70">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </div>

                    <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-white/80">
                      {exp.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.techStack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        document
                          .getElementById(`exp-detail-${exp.id}`)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </ElectricBorder>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-16 space-y-6">
          {experiences.map((exp, index) => {
            const meta = companyMeta[exp.id];
            return (
              <ScrollReveal key={exp.id} delay={index * 0.06}>
                <article
                  id={`exp-detail-${exp.id}`}
                  className="readable-card rounded-xl p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="text-sm font-medium text-white/70">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold" style={{ color: meta?.color ?? "#a78bfa" }}>
                    {exp.company}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/85">{exp.summary}</p>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                        Responsibilities
                      </h4>
                      <ul className="space-y-2 text-sm text-white/85">
                        {exp.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="text-white/40">—</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                      Impact
                    </h4>
                    <ul className="space-y-2 text-sm text-white/85">
                      {exp.impact.map((i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-white/40">—</span>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
