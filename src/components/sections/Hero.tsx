"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Typewriter } from "@/components/shared/Typewriter";
import { TextScramble } from "@/components/shared/TextScramble";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const { personal, resume } = portfolioData;

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap justify-center gap-2"
        >
          {personal.roles.map((role) => (
            <Badge key={role} variant="outline" className="text-xs">
              {role}
            </Badge>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <TextScramble text={personal.name} duration={1500} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-base text-muted-foreground sm:text-lg"
        >
          {personal.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-lg text-muted-foreground sm:text-xl"
        >
          <Typewriter
            phrases={personal.typewriterPhrases}
            className="text-foreground"
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
                <Download className="mr-1 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="ghost" size="lg" asChild>
              <a href="#contact" data-cursor="pointer">
                <Mail className="mr-1 h-4 w-4" />
                Contact Me
              </a>
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            data-cursor="pointer"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
