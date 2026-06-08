// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  role: string;
  roles: string[];
  email: string;
  phone: string;
  location: string;
  typewriterPhrases: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  codolio: string;
  leetcode: string;
  codeforces: string;
  hackerrank: string;
  twitter: string;
  instagram: string;
  email: string;
  phone: string;
  portfolio: string;
}

export type SocialPlatform = keyof SocialLinks;

export interface SocialLinkEntry {
  platform: SocialPlatform;
  label: string;
  url: string;
  display: string;
  external: boolean;
}

export interface ResumeConfig {
  downloadUrl: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  features: string[];
  tech: string[];
  live: string;
  github: string;
  category: "fullstack" | "ai" | "devops";
  caseStudySlug: string;
  gradient: string;
  featured: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export interface GitHubRepo {
  name: string;
  stars: number;
  language: string;
}

export interface OpenSourceStats {
  contributions: number;
  repositories: number;
  commits: number;
}

export interface PortfolioData {
  personal: PersonalInfo;
  socials: SocialLinks;
  resume: ResumeConfig;
  projects: PortfolioProject[];
  stats: Stat[];
  techStack: Record<string, string[]>;
  devOpsCards: { name: string; description: string }[];
  pipelineSteps: string[];
  experience: ExperienceEntry[];
  architectureLayers: { name: string; tech: string }[];
  certifications: Certification[];
  services: Service[];
  navLinks: NavLink[];
  marqueeItems: string[];
  openSourceStats: OpenSourceStats;
  githubRepos: GitHubRepo[];
  blogPosts: BlogPost[];
  site: {
    url: string;
    description: string;
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  personal: {
    name: "Yash Mathur",
    role: "Software Developer | Full Stack Developer",
    roles: [
      "Software Developer",
      "Full Stack Developer",
      "DevOps Enthusiast",
      "AI Automation Builder",
    ],
    email: "yashmathur1425@gmail.com",
    phone: "+91 8824141454",
    location: "Jaipur, Rajasthan, India",
    typewriterPhrases: [
      "Building Scalable Software",
      "Creating Automation Systems",
      "Designing Modern Experiences",
      "Deploying Production Applications",
    ],
  },

  socials: {
    github: "https://github.com/Yash5247",
    linkedin: "https://www.linkedin.com/in/yash-mathur-965134284",
    codolio: "https://codolio.com/profile/Yash1410",
    leetcode: "",
    codeforces: "",
    hackerrank: "",
    twitter: "",
    instagram: "",
    email: "mailto:yashmathur1425@gmail.com",
    phone: "tel:+918824141454",
    portfolio: "https://pramana15.com",
  },

  resume: {
    downloadUrl: "/resume.pdf",
  },

  projects: [
    {
      id: "mrv-system",
      title: "Blockchain-based MRV System",
      description:
        "A monitoring, reporting, and verification platform with full traceability for sustainable supply chains.",
      features: ["Monitoring", "Reporting", "Verification", "Traceability"],
      tech: ["React", "Supabase", "REST APIs", "JavaScript", "Vercel"],
      live: "https://oceara-web-platform-1.vercel.app/",
      github: "",
      category: "fullstack",
      caseStudySlug: "mrv-system",
      gradient: "from-emerald-500/20 to-cyan-500/20",
      featured: true,
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot & Lead Automation System",
      description:
        "Intelligent chatbot with lead automation, OpenAI integration, and smart database routing.",
      features: [
        "OpenAI Integration",
        "Lead Automation",
        "REST APIs",
        "Database Routing",
      ],
      tech: ["React", "Node.js", "OpenAI API", "Supabase"],
      live: "https://automation.pramana15.com/",
      github: "",
      category: "ai",
      caseStudySlug: "ai-chatbot",
      gradient: "from-violet-500/20 to-purple-500/20",
      featured: true,
    },
    {
      id: "shortsos",
      title: "ShortsOS",
      description:
        "Content generation platform with workflow automation and AI-powered processing pipelines.",
      features: ["Content Generation", "Workflow Automation", "AI Processing"],
      tech: ["React", "Node.js", "OpenAI API", "REST APIs"],
      live: "https://pramana15.com",
      github: "",
      category: "ai",
      caseStudySlug: "shortsos",
      gradient: "from-orange-500/20 to-rose-500/20",
      featured: true,
    },
  ],

  stats: [
    { label: "Users Served", value: 300, suffix: "+" },
    { label: "Records Processed", value: 5000, suffix: "+" },
    { label: "GitHub Deployments", value: 20, suffix: "+" },
    { label: "REST API Integrations", value: 5, suffix: "+" },
    { label: "Live Applications", value: 3, suffix: "+" },
  ],

  techStack: {
    Frontend: ["React", "Next.js", "Tailwind", "HTML", "CSS", "JavaScript"],
    Backend: ["Node.js", "Express.js", "REST APIs"],
    Database: ["SQL", "DBMS", "Supabase"],
    DevOps: [
      "Docker",
      "CI/CD",
      "Linux",
      "GitHub Actions",
      "Vercel",
      "Deployment Pipelines",
    ],
    AI: [
      "OpenAI APIs",
      "Prompt Engineering",
      "Automation Systems",
      "LLM Workflows",
    ],
    Programming: ["C++", "Python", "JavaScript"],
  },

  devOpsCards: [
    { name: "Docker", description: "Containerized deployments" },
    { name: "CI/CD", description: "Automated build pipelines" },
    { name: "Linux", description: "Server administration" },
    { name: "GitHub Actions", description: "Workflow automation" },
    { name: "Vercel", description: "Edge deployments" },
    { name: "Monitoring", description: "Uptime & performance" },
    { name: "Deployment Automation", description: "Zero-downtime releases" },
  ],

  pipelineSteps: [
    "Code",
    "GitHub",
    "CI/CD",
    "Docker",
    "Vercel",
    "Production",
  ],

  experience: [
    {
      company: "Pramana15",
      role: "Co-Founder & Software Developer",
      period: "2024 — Present",
      achievements: [
        "Built scalable full-stack applications serving 300+ users",
        "Architected REST APIs and database integrations",
        "Led product development from concept to deployment",
      ],
    },
    {
      company: "OSHVIK",
      role: "Web Developer Intern",
      period: "2024",
      achievements: [
        "Developed responsive web interfaces with modern frameworks",
        "Collaborated on client-facing production applications",
        "Optimized performance and cross-browser compatibility",
      ],
    },
    {
      company: "Tata Power",
      role: "Web Developer & AI/ML Intern",
      period: "2024",
      achievements: [
        "Integrated AI/ML models into web applications",
        "Built data processing pipelines for 5000+ records",
        "Developed automation workflows for internal tools",
      ],
    },
  ],

  architectureLayers: [
    { name: "Frontend", tech: "Next.js · React · Tailwind" },
    { name: "API Layer", tech: "Node.js · Express · REST" },
    { name: "Database", tech: "SQL · Supabase · PostgreSQL" },
    { name: "Deployment", tech: "Docker · Vercel · CI/CD" },
  ],

  certifications: [
    {
      title: "NPTEL Elite Rank Holder",
      issuer: "NPTEL · IIT",
      year: "2024",
    },
    {
      title: "Full Stack Development",
      issuer: "Industry Certification",
      year: "2024",
    },
    {
      title: "DevOps Certification",
      issuer: "Industry Certification",
      year: "2024",
    },
  ],

  services: [
    {
      title: "Full Stack Development",
      description: "End-to-end web applications from database to deployment.",
      icon: "Layers",
    },
    {
      title: "Frontend Engineering",
      description: "Pixel-perfect, performant interfaces with modern frameworks.",
      icon: "Monitor",
    },
    {
      title: "Backend Development",
      description: "Scalable APIs, microservices, and database architecture.",
      icon: "Server",
    },
    {
      title: "DevOps & Deployment",
      description: "CI/CD pipelines, containerization, and cloud infrastructure.",
      icon: "Cloud",
    },
    {
      title: "AI Automation Systems",
      description: "LLM workflows, chatbots, and intelligent automation.",
      icon: "Bot",
    },
    {
      title: "UI/UX Design",
      description: "User-centered design with clean, modern aesthetics.",
      icon: "Palette",
    },
  ],

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#tech-stack" },
    { label: "DevOps", href: "#devops" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Architecture", href: "#architecture" },
    { label: "Contact", href: "#contact" },
  ],

  marqueeItems: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Docker",
    "OpenAI",
    "Supabase",
    "Tailwind CSS",
    "GitHub Actions",
    "Vercel",
    "Python",
    "CI/CD",
  ],

  openSourceStats: {
    contributions: 500,
    repositories: 25,
    commits: 800,
  },

  githubRepos: [
    { name: "mrv-system", stars: 12, language: "TypeScript" },
    { name: "ai-automation", stars: 8, language: "JavaScript" },
    { name: "shortsos", stars: 15, language: "Python" },
    { name: "devops-toolkit", stars: 6, language: "Shell" },
  ],

  blogPosts: [
    {
      title: "Building Scalable APIs with Node.js",
      excerpt: "Best practices for REST API design and deployment.",
      date: "Coming Soon",
      slug: "scalable-apis",
    },
    {
      title: "AI Automation in Production",
      excerpt: "Integrating LLM workflows into real applications.",
      date: "Coming Soon",
      slug: "ai-automation",
    },
  ],

  site: {
    url: "https://yashmathur.dev",
    description:
      "Building scalable software, automation systems, and modern digital experiences.",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLACEHOLDER_URLS = new Set(["", "#", "ADD_GITHUB_LINK", "ADD_LINK"]);

export function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  return trimmed.length > 0 && !PLACEHOLDER_URLS.has(trimmed);
}

type PersonalDisplayField = "email" | "phone" | "location" | "name" | "role";

const SOCIAL_META: Record<
  SocialPlatform,
  { label: string; external: boolean; displayFromPersonal?: PersonalDisplayField }
> = {
  github: { label: "GitHub", external: true },
  linkedin: { label: "LinkedIn", external: true },
  codolio: { label: "Codolio", external: true },
  leetcode: { label: "LeetCode", external: true },
  codeforces: { label: "Codeforces", external: true },
  hackerrank: { label: "HackerRank", external: true },
  twitter: { label: "Twitter / X", external: true },
  instagram: { label: "Instagram", external: true },
  email: { label: "Email", external: false, displayFromPersonal: "email" },
  phone: { label: "Phone", external: false, displayFromPersonal: "phone" },
  portfolio: { label: "Portfolio", external: true },
};

function getSocialDisplay(
  platform: SocialPlatform,
  url: string
): string {
  const meta = SOCIAL_META[platform];
  if (meta.displayFromPersonal) {
    return portfolioData.personal[meta.displayFromPersonal];
  }
  if (platform === "email" && url.startsWith("mailto:")) {
    return url.replace("mailto:", "");
  }
  if (platform === "phone" && url.startsWith("tel:")) {
    return portfolioData.personal.phone;
  }
  return meta.label;
}

export function getSocialLink(
  platform: SocialPlatform
): SocialLinkEntry | null {
  const url = portfolioData.socials[platform];
  if (!isValidUrl(url)) return null;

  const meta = SOCIAL_META[platform];
  return {
    platform,
    label: meta.label,
    url,
    display: getSocialDisplay(platform, url),
    external: meta.external,
  };
}

export function getActiveSocialLinks(
  platforms?: SocialPlatform[]
): SocialLinkEntry[] {
  const keys = platforms ?? (Object.keys(portfolioData.socials) as SocialPlatform[]);
  return keys
    .map((platform) => getSocialLink(platform))
    .filter((link): link is SocialLinkEntry => link !== null);
}

export function getStructuredDataSameAs(): string[] {
  return getActiveSocialLinks([
    "github",
    "linkedin",
    "codolio",
    "leetcode",
    "codeforces",
    "hackerrank",
    "twitter",
    "instagram",
    "portfolio",
  ]).map((link) => link.url);
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioData.projects.find((p) => p.caseStudySlug === slug);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioData.projects.filter((p) => p.featured);
}
