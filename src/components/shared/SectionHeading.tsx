"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <ScrollReveal className={`mb-14 max-w-2xl ${alignClass}`}>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
        {label}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-white/60">{description}</p>
      )}
    </ScrollReveal>
  );
}
