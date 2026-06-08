"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import {
  portfolioData,
  getActiveSocialLinks,
} from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";

const { personal, projects, experience, techStack } = portfolioData;

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "  help       — Show this help message",
    "  about      — About Yash Mathur",
    "  skills     — Technical skills",
    "  projects   — Featured projects",
    "  experience — Work experience",
    "  contact    — Contact information",
    "  clear      — Clear terminal",
  ],
  about: () => [
    personal.name,
    personal.role,
    personal.location,
    "Software Engineer · Full Stack Developer",
    "DevOps Enthusiast · AI Automation Builder",
  ],
  skills: () => {
    const lines: string[] = [];
    Object.entries(techStack).forEach(([cat, items]) => {
      lines.push(`[${cat}]`);
      lines.push(`  ${items.join(" · ")}`);
    });
    return lines;
  },
  projects: () =>
    projects.map((p) => {
      const links = [p.live, p.github].filter(Boolean).join(" | ");
      return `→ ${p.title} (${p.tech.join(", ")})${links ? `\n    ${links}` : ""}`;
    }).flatMap((line) => line.split("\n")),
  experience: () =>
    experience.map(
      (e) => `→ ${e.role} @ ${e.company} (${e.period})`
    ),
  contact: () => [
    `Location:   ${personal.location}`,
    ...getActiveSocialLinks().map(
      (link) => `${link.label.padEnd(12)} ${link.url}`
    ),
  ],
};

export function DeveloperTerminal() {
  const [history, setHistory] = useState<string[]>([
    `Welcome to ${personal.name}'s terminal.`,
    'Type "help" to see available commands.',
    "",
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [`$ ${cmd}`];

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "") {
      setHistory((prev) => [...prev, ...newLines]);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      newLines.push(...handler());
    } else {
      newLines.push(`Command not found: ${trimmed}. Type "help" for options.`);
    }

    newLines.push("");
    setHistory((prev) => [...prev, ...newLines]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  return (
    <section id="terminal" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Terminal"
          title="Developer Console"
          description="An interactive terminal to explore my portfolio. Try typing 'help'."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-border bg-[#0d1117] shadow-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-white/50">
              yash@portfolio ~ %
            </span>
          </div>
          <div className="h-80 overflow-y-auto p-4 font-mono text-sm">
            {history.map((line, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  line.startsWith("$")
                    ? "text-green-400"
                    : line.startsWith("→")
                      ? "text-blue-300"
                      : line.startsWith("[")
                        ? "text-yellow-300"
                        : "text-white/70"
                }`}
              >
                {line}
              </p>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white/90 outline-none"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
