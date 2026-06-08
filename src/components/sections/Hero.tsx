"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Download, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Typewriter } from "@/components/shared/Typewriter";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Button } from "@/components/ui/button";

const SceneBackground = dynamic(
  () =>
    import("@/components/effects/SceneBackground").then((m) => m.SceneBackground),
  { ssr: false }
);

const { personal, resume } = portfolioData;

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      <div className="pointer-events-none absolute inset-0">
        <SceneBackground className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/75 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
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
          className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
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
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <Button size="lg" asChild>
              <a href="#projects" data-cursor="pointer">
                View Projects
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="outline" size="lg" asChild>
              <a href={resume.downloadUrl} download data-cursor="pointer">
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
                data-cursor="pointer"
              >
                GitHub
                <ArrowUpRight className="ml-1 h-4 w-4" strokeWidth={1.5} />
              </a>
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-24"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            data-cursor="pointer"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
