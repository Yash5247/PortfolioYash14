"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Building2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { companyMeta } from "@/lib/company-meta";

const ElectricBorder = dynamic(
  () => import("@/components/effects/ElectricBorderClient"),
  { ssr: false }
);

export function ExperienceCards() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
            Work Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Companies I&apos;ve worked with and the systems I&apos;ve built.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {experiences.map((exp) => {
            const meta = companyMeta[exp.id] ?? {
              icon: Building2,
              color: "#7df9ff",
              initials: exp.company.slice(0, 2).toUpperCase(),
              tagline: "Experience",
            };
            const Icon = meta.icon;

            return (
              <ElectricBorder
                key={exp.id}
                color={meta.color}
                speed={1.1}
                chaos={0.1}
                borderRadius={20}
                className="w-full"
                style={{ borderRadius: 20 }}
              >
                <div className="glass-panel flex min-h-[300px] flex-col p-6">
                  <div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${meta.color}22, rgba(0,0,0,0.6))`,
                    }}
                  >
                    <Icon className="h-8 w-8" style={{ color: meta.color }} strokeWidth={1.5} />
                  </div>

                  <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                    {meta.tagline}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{exp.company}</h3>
                  <p className="mt-2 text-sm font-medium text-white/80">{exp.role}</p>
                  <p className="mt-1 text-xs text-white/50">{exp.period}</p>

                  <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-white/65">
                    {exp.summary}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById(`exp-detail-${exp.id}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </ElectricBorder>
            );
          })}
        </div>

        <div className="mt-20 space-y-8">
          {experiences.map((exp) => {
            const meta = companyMeta[exp.id];
            return (
              <article
                key={exp.id}
                id={`exp-detail-${exp.id}`}
                className="glass-panel rounded-2xl p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                  <span className="text-sm text-white/50">{exp.period}</span>
                </div>
                <p className="mt-1" style={{ color: meta?.color ?? "#a78bfa" }}>
                  {exp.company}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{exp.summary}</p>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-white">Responsibilities</h4>
                    <ul className="space-y-2 text-sm text-white/75">
                      {exp.responsibilities.map((r) => (
                        <li key={r}>• {r}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-semibold text-white">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="mb-3 font-semibold text-white">Impact</h4>
                  <ul className="space-y-2 text-sm text-white/75">
                    {exp.impact.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
