"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, ArrowUpRight, GitBranch, Database, Cpu } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import {
  HeroNetworkBg,
  AnimatedGrid,
} from "@/components/effects/section-backgrounds";
import { Typewriter } from "@/components/shared/Typewriter";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Button } from "@/components/ui/button";

const { personal, resume } = portfolioData;

const systemLabels = [
  { icon: GitBranch, label: "API Connections" },
  { icon: Database, label: "Data Flow" },
  { icon: Cpu, label: "System Nodes" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28">
      <div className="pointer-events-none absolute inset-0">
        <HeroNetworkBg className="h-full w-full" />
        <AnimatedGrid className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/75 to-background" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            {personal.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-muted-foreground sm:text-xl"
          >
            <Typewriter
              phrases={personal.typewriterPhrases}
              className="text-foreground"
            />
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground"
          >
            {personal.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Button size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="outline" size="lg" asChild>
                <a href={resume.downloadUrl} download>
                  <Download className="mr-1.5 h-4 w-4" strokeWidth={1.5} />
                  Resume
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="ghost" size="lg" asChild>
                <a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <ArrowUpRight className="ml-1 h-4 w-4" strokeWidth={1.5} />
                </a>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="hidden rounded-2xl border border-white/10 bg-card/30 p-6 backdrop-blur-xl lg:block"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            System map
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Every node represents a layer in how I build — connected APIs, flowing
            data, and deployed services. Move your cursor to interact.
          </p>
          <div className="mt-6 space-y-3">
            {systemLabels.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-4 py-3"
              >
                <Icon className="h-4 w-4 text-violet-400" strokeWidth={1.5} />
                <span className="text-sm">{label}</span>
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Co-founder of{" "}
            <a
              href={portfolioData.socials.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              Pramana15
            </a>{" "}
            · {personal.location}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-6"
      >
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </a>
      </motion.div>
    </section>
  );
}
