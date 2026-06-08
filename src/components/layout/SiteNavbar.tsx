"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const { personal, resume, navLinks } = portfolioData;

const links = [{ label: "Home", href: "#hero" }, ...navLinks];

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]?.target.id) setActive(`#${vis[0].target.id}`);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-white/10 bg-black/75 shadow-lg shadow-black/40 backdrop-blur-xl"
          : "border-transparent bg-black/20 backdrop-blur-sm"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <motion.a
          href="#hero"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/25 shadow-md shadow-violet-500/20">
            <Image src="/profile.png" alt={personal.name} fill className="object-cover" />
          </div>
          <span className="hidden text-sm font-semibold sm:inline">{personal.name}</span>
        </motion.a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3 py-2 text-sm transition-colors duration-300",
                active === link.href
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-violet-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden border-white/20 bg-black/30 backdrop-blur-sm sm:flex" asChild>
            <a href={resume.downloadUrl} download>
              <Download className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
              Resume
            </a>
          </Button>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Moon className="h-4 w-4" strokeWidth={1.5} />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-black/90 md:hidden"
          >
            <div className="px-4 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
