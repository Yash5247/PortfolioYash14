"use client";

import { ArrowRight, Building2, Calendar, Layers } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { companyMeta } from "@/lib/company-meta";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ExperienceCards() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Career"
          title="Work Experience"
          description="Roles where I've designed, built, and shipped production software."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {experiences.map((exp, index) => {
            const meta = companyMeta[exp.id] ?? {
              icon: Building2,
              color: "#94a3b8",
              initials: exp.company.slice(0, 2).toUpperCase(),
              tagline: "Experience",
            };
            const Icon = meta.icon;

            return (
              <ScrollReveal key={exp.id} delay={index * 0.1}>
                <article
                  className="exp-card group relative flex min-h-[320px] flex-col overflow-hidden rounded-xl p-6"
                  style={{ "--accent": meta.color } as Record<string, string>}
                >
                  <div className="exp-card-accent" />

                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-transform duration-300 group-hover:scale-105"
                    >
                      <Icon
                        className="h-5 w-5 transition-colors duration-300"
                        style={{ color: meta.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="font-mono text-xs text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-5 text-[11px] font-medium uppercase tracking-widest text-white/40">
                    {meta.tagline}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{exp.company}</h3>
                  <p className="mt-1.5 text-sm text-white/75">{exp.role}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/45">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      {exp.techStack.length} technologies
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-white/60">
                    {exp.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.techStack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/55"
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
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors group-hover:text-white"
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </article>
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
                  className="pro-card rounded-xl p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                    <span className="text-sm text-white/45">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium" style={{ color: meta?.color ?? "#94a3b8" }}>
                    {exp.company}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{exp.summary}</p>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                        Responsibilities
                      </h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        {exp.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="text-white/30">—</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/75"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                      Impact
                    </h4>
                    <ul className="space-y-2 text-sm text-white/70">
                      {exp.impact.map((i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-white/30">—</span>
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
