export interface TechItem {
  id: string;
  name: string;
  icon: string;
  years: string;
  context: string;
  projects: string[];
  connectsTo: string[];
  category: "frontend" | "backend" | "database" | "ai" | "devops" | "language";
}

export const techEcosystem: TechItem[] = [
  {
    id: "react",
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    years: "2+ years",
    context: "Component-driven UIs, dashboards, and production web apps",
    projects: ["MRV System", "AI Chatbot", "ShortsOS"],
    connectsTo: ["nextjs", "javascript", "tailwind"],
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    years: "2+ years",
    context: "SSR, routing, and production deployments",
    projects: ["Portfolio", "MRV System"],
    connectsTo: ["react", "vercel", "typescript"],
    category: "frontend",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    years: "3+ years",
    context: "Full-stack scripting across frontend and backend",
    projects: ["All Pramana15 products"],
    connectsTo: ["nodejs", "react"],
    category: "language",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    years: "2+ years",
    context: "Type-safe application development",
    projects: ["Portfolio", "MRV System"],
    connectsTo: ["nextjs", "react"],
    category: "language",
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    years: "2+ years",
    context: "REST APIs, automation backends, service orchestration",
    projects: ["AI Chatbot", "ShortsOS"],
    connectsTo: ["javascript", "express", "supabase", "openai"],
    category: "backend",
  },
  {
    id: "express",
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    years: "2+ years",
    context: "REST API routing, middleware, and service layers",
    projects: ["AI Chatbot", "ShortsOS"],
    connectsTo: ["nodejs"],
    category: "backend",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    years: "2+ years",
    context: "Utility-first styling for responsive production UIs",
    projects: ["Portfolio", "MRV System", "Pramana15 products"],
    connectsTo: ["react", "nextjs"],
    category: "frontend",
  },
  {
    id: "git",
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    years: "3+ years",
    context: "Version control, branching, and release workflows",
    projects: ["All projects"],
    connectsTo: ["github"],
    category: "devops",
  },
  {
    id: "python",
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    years: "2+ years",
    context: "Data processing, ML integration, backend scripts",
    projects: ["Tata Power internship"],
    connectsTo: ["sql"],
    category: "language",
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    years: "1+ years",
    context: "PostgreSQL database, auth, and real-time data",
    projects: ["MRV System", "AI Chatbot"],
    connectsTo: ["nodejs", "sql"],
    category: "database",
  },
  {
    id: "sql",
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    years: "2+ years",
    context: "Schema design, queries, and data integrity",
    projects: ["MRV System", "Tata Power"],
    connectsTo: ["supabase", "nodejs"],
    category: "database",
  },
  {
    id: "openai",
    name: "OpenAI",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    years: "1+ years",
    context: "LLM integration, prompt engineering, automation",
    projects: ["AI Chatbot", "ShortsOS"],
    connectsTo: ["nodejs"],
    category: "ai",
  },
  {
    id: "docker",
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    years: "1+ years",
    context: "Containerization and deployment workflows",
    projects: ["DevOps coursework"],
    connectsTo: ["linux", "github"],
    category: "devops",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    years: "3+ years",
    context: "Version control, collaboration, and CI workflows",
    projects: ["All projects"],
    connectsTo: ["vercel"],
    category: "devops",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    years: "2+ years",
    context: "Edge deployment and production hosting",
    projects: ["MRV System", "Portfolio", "Pramana15"],
    connectsTo: ["nextjs", "github"],
    category: "devops",
  },
  {
    id: "linux",
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    years: "2+ years",
    context: "Server environments and deployment",
    projects: ["DevOps certification"],
    connectsTo: ["docker"],
    category: "devops",
  },
];

export function getTechById(id: string): TechItem | undefined {
  return techEcosystem.find((t) => t.id === id);
}

export function getConnections(id: string): TechItem[] {
  const tech = getTechById(id);
  if (!tech) return [];
  return tech.connectsTo
    .map((cid) => getTechById(cid))
    .filter((t): t is TechItem => !!t);
}
