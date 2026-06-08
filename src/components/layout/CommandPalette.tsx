"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const navLinks = portfolioData.navLinks;
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const commands = [
  ...navLinks.map((l) => ({ label: `Go to ${l.label}`, href: l.href, type: "nav" })),
  { label: "View Projects", href: "#projects", type: "nav" },
  { label: "Open Terminal", href: "#terminal", type: "nav" },
  { label: "Contact Me", href: "#contact", type: "nav" },
  { label: "Toggle Dark Mode", href: "#theme", type: "action" },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback(
    (cmd: (typeof commands)[0]) => {
      if (cmd.type === "action" && cmd.href === "#theme") {
        document.documentElement.classList.toggle("dark");
      } else {
        const el = document.querySelector(cmd.href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
      onClose();
      setQuery("");
    },
    [onClose]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        execute(filtered[selected]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, filtered, selected, execute]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[20%] z-[9991] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
                ESC
              </kbd>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.label}
                  onClick={() => execute(cmd)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                    i === selected
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {cmd.label}
                  <ArrowRight className="h-3 w-3 opacity-50" />
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
