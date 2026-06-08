"use client";

import { portfolioData } from "@/data/portfolio";

const marqueeItems = portfolioData.marqueeItems;

export function InfiniteMarquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-border bg-muted/20 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex animate-marquee gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 text-sm font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
