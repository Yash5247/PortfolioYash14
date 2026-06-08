"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { SpotlightCursor } from "@/components/effects/SpotlightCursor";
import { InfiniteMarquee } from "@/components/shared/InfiniteMarquee";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Tools } from "@/components/sections/Tools";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Founder } from "@/components/sections/Founder";
import { SystemArchitecture } from "@/components/sections/SystemArchitecture";
import { Engineering } from "@/components/sections/Engineering";
import { Certifications } from "@/components/sections/Certifications";
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
      <SpotlightCursor />

      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          <Hero />
          <InfiniteMarquee />
          <About />
          <Experience />
          <Projects />
          <Founder />
          <SystemArchitecture />
          <Engineering />
          <Tools />
          <Certifications />
          <Contact />
          <Footer />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
