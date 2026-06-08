"use client";

import {
  Mail,
  Phone,
  Code2,
  Trophy,
  Award,
  Globe,
  Send,
  type LucideIcon,
} from "lucide-react";
import {
  getActiveSocialLinks,
  type SocialLinkEntry,
  type SocialPlatform,
} from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

type IconComponent = LucideIcon | typeof GitHubIcon;

const PLATFORM_ICONS: Partial<Record<SocialPlatform, IconComponent>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  codolio: Send,
  leetcode: Code2,
  codeforces: Trophy,
  hackerrank: Award,
  twitter: Globe,
  instagram: Globe,
  email: Mail,
  phone: Phone,
  portfolio: Globe,
};

interface SocialLinksProps {
  platforms?: SocialPlatform[];
  variant?: "icons" | "cards";
  className?: string;
  iconClassName?: string;
}

function SocialIcon({ link, className }: { link: SocialLinkEntry; className?: string }) {
  const Icon = PLATFORM_ICONS[link.platform] ?? Globe;
  return <Icon className={className} aria-hidden />;
}

export function SocialLinks({
  platforms,
  variant = "icons",
  className,
  iconClassName = "h-4 w-4",
}: SocialLinksProps) {
  const links = getActiveSocialLinks(platforms);

  if (links.length === 0) return null;

  if (variant === "icons") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label={link.label}
            data-cursor="pointer"
          >
            <SocialIcon link={link} className={iconClassName} />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {links.map((link, i) => (
        <a
          key={link.platform}
          href={link.url}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-foreground/20 hover:shadow-md"
          data-cursor="pointer"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <SocialIcon link={link} className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{link.label}</p>
            <p className="font-medium">{link.display}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
