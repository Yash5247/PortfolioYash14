import { techEcosystem } from "@/lib/tech-ecosystem";

const heroIds = [
  "react",
  "nextjs",
  "nodejs",
  "typescript",
  "supabase",
  "openai",
  "javascript",
  "tailwind",
  "git",
  "github",
  "vercel",
  "python",
];

export const techMarqueeLogos = heroIds
  .map((id) => {
    const tech = techEcosystem.find((t) => t.id === id);
    return tech
      ? { src: tech.icon, alt: tech.name, title: tech.name }
      : null;
  })
  .filter(Boolean) as { src: string; alt: string; title: string }[];
