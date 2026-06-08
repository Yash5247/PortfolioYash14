"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { SpotlightCursor } from "@/components/effects/SpotlightCursor";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { ThreeBackground } from "@/components/effects/ThreeBackground";
import { InfiniteMarquee } from "@/components/shared/InfiniteMarquee";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { DevOps } from "@/components/sections/DevOps";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { SystemDesign } from "@/components/sections/SystemDesign";
import { OpenSource } from "@/components/sections/OpenSource";
import { Certifications } from "@/components/sections/Certifications";
import { Services } from "@/components/sections/Services";
import { DeveloperTerminal } from "@/components/sections/DeveloperTerminal";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export function PortfolioPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <SpotlightCursor />
      <ParticleBackground />
      <ThreeBackground />

      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Hero />
          <InfiniteMarquee />
          <About />
          <TechStack />
          <DevOps />
          <Experience />
          <Projects />
          <SystemDesign />
          <OpenSource />
          <Certifications />
          <Services />
          <DeveloperTerminal />
          <Blog />
          <Contact />
          <Footer />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
