import { Building2, Zap, Code2, type LucideIcon } from "lucide-react";

export interface CompanyMeta {
  icon: LucideIcon;
  color: string;
  initials: string;
  tagline: string;
}

export const companyMeta: Record<string, CompanyMeta> = {
  pramana15: {
    icon: Building2,
    color: "#7df9ff",
    initials: "P15",
    tagline: "Product Studio",
  },
  "tata-power": {
    icon: Zap,
    color: "#60a5fa",
    initials: "TP",
    tagline: "Energy & Operations",
  },
  oshvik: {
    icon: Code2,
    color: "#c084fc",
    initials: "OS",
    tagline: "Web Development",
  },
};
