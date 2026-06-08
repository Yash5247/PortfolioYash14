"use client";

import dynamic from "next/dynamic";
import { portfolioData } from "@/data/portfolio";

const ProfileCard = dynamic(
  () => import("@/components/components/ProfileCardClient"),
  { ssr: false }
);

export function ExperienceCards() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Work Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Companies I&apos;ve worked with and the systems I&apos;ve built.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 lg:items-start">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex justify-center [&_.pc-card]:!h-[420px] [&_.pc-card]:!max-h-[420px]">
              <ProfileCard
                name={exp.company}
                title={exp.role}
                handle={exp.id}
                status={exp.period}
                contactText="Details"
                avatarUrl="/profile.png"
                showUserInfo
                enableTilt
                behindGlowEnabled
                innerGradient="linear-gradient(145deg,#4338ca44 0%,#818cf844 100%)"
                onContactClick={() => {
                  const el = document.getElementById(`exp-detail-${exp.id}`);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-20 space-y-8">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              id={`exp-detail-${exp.id}`}
              className="rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                <span className="text-sm text-white/50">{exp.period}</span>
              </div>
              <p className="mt-1 text-violet-300">{exp.company}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{exp.summary}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-white">Responsibilities</h4>
                  <ul className="space-y-2 text-sm text-white/70">
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
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="mb-3 font-semibold text-white">Impact</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  {exp.impact.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
