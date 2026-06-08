"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const { personal, resume, navLinks } = portfolioData;

const links = [{ label: "Home", href: "#hero" }, ...navLinks];

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/8 bg-black/85 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-6">
        <a href="#hero" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-xs font-semibold tracking-wide text-white">
            YM
          </div>
          <div className="hidden sm:block">
            <span className="block text-sm font-medium text-white">{personal.name}</span>
            <span className="block text-[11px] text-white/45">Software Developer</span>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-2 text-[13px] font-medium transition-colors duration-200",
                active === link.href
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-3 -bottom-px h-px bg-white/70"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden h-8 border-white/12 bg-transparent text-xs text-white/80 hover:bg-white/5 sm:flex"
            asChild
          >
            <a href={resume.downloadUrl} download>
              <Download className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
              Resume
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:hidden"
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/8 bg-black/95 lg:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm transition-colors",
                    active === link.href
                      ? "bg-white/5 text-white"
                      : "text-white/65 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={resume.downloadUrl}
                download
                className="mt-2 block rounded-md border border-white/10 px-3 py-2.5 text-center text-sm text-white/80"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
