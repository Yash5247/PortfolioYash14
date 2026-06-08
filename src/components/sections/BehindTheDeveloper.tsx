"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Lanyard } from "@/components/effects/Lanyard";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";
import { SectionHeader } from "@/components/shared/SectionHeader";

const { personal, socials } = portfolioData;

const skills = [
  "Full Stack Development",
  "AI Automation",
  "Frontend Engineering",
];

const socialItems = [
  {
    label: "GitHub",
    href: socials.github,
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: socials.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "Codolio",
    href: socials.codolio,
    icon: null,
  },
];

export function BehindTheDeveloper() {
  return (
    <section id="behind" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          label="Identity"
          title="Behind the developer"
          description="A developer badge that swings with physics — the person behind the systems."
        />

        <Lanyard className="mx-auto mt-8" ropeLength={200}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-[min(92vw,22rem)] overflow-hidden rounded-2xl border border-white/15 bg-card shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="h-28 bg-gradient-to-br from-violet-600/30 via-background to-background" />
            <div className="-mt-14 flex flex-col items-center px-6 pb-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-background bg-muted text-3xl font-bold shadow-lg">
                YM
              </div>
              <h3 className="mt-4 text-xl font-semibold">{personal.name}</h3>
              <p className="text-sm text-muted-foreground">Software Developer</p>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                Jaipur, Rajasthan
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" strokeWidth={1.5} />
                B.Tech CSE
              </div>

              <div className="mt-6 w-full space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-center text-xs font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground/20 hover:bg-muted/50"
                    aria-label={item.label}
                  >
                    {item.icon ? (
                      <item.icon className="h-4 w-4" />
                    ) : (
                      <span className="text-[10px] font-semibold">C</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </Lanyard>
      </div>
    </section>
  );
}
