"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PillNav from "@/components/layout/PillNav";
import { portfolioData } from "@/data/portfolio";

const GridScan = dynamic(() => import("@/components/effects/GridScan"), {
  ssr: false,
});

const navItems = portfolioData.navLinks.map((l) => ({
  label: l.label,
  href: l.href,
}));

export function PortfolioPage() {
  const [activeHref, setActiveHref] = useState(navItems[0]?.href ?? "#about");

  useEffect(() => {
    const sections = navItems
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-foreground">
      <GridScan
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#1a1a24"
        gridScale={0.1}
        scanColor="#818cf8"
        scanOpacity={0.5}
        enablePost
        bloomIntensity={0.6}
        chromaticAberration={0.002}
        noiseIntensity={0.006}
        scanDuration={1.6}
        scanDelay={1e9}
      />

      <PillNav
        logo="/profile.png"
        logoAlt="Yash Mathur"
        items={navItems}
        activeHref={activeHref}
        baseColor="#09090b"
        pillColor="#fafafa"
        hoveredPillTextColor="#09090b"
        pillTextColor="#09090b"
        initialLoadAnimation
      />

      <main className="relative z-10">
        <section
          id="hero"
          className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
        >
          <div className="relative mb-8 h-40 w-40 overflow-hidden rounded-3xl border-2 border-white/10 shadow-2xl shadow-indigo-500/10">
            <Image
              src="/profile.png"
              alt="Yash Mathur"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Software Developer
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            {portfolioData.personal.name}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {portfolioData.personal.summary}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {portfolioData.personal.location} · B.Tech CSE
          </p>
          <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground/60">
            Touch anywhere to activate the scan light
          </p>
        </section>

        {navItems.map((item) => (
          <section
            key={item.href}
            id={item.href.replace("#", "")}
            className="flex min-h-[50vh] items-center justify-center px-6 py-24"
          >
            <div className="max-w-2xl rounded-2xl border border-white/8 bg-black/30 p-10 text-center backdrop-blur-md">
              <h2 className="text-3xl font-semibold tracking-tight">
                {item.label}
              </h2>
              <p className="mt-4 text-muted-foreground">
                Section coming next — structure is live with PillNav and GridScan.
              </p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
