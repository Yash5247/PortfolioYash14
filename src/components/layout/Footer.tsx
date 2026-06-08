import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/shared/SocialLinks";

const { personal, navLinks } = portfolioData;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        <p className="text-xs font-medium text-white/70">
          © {year} {personal.name}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <SocialLinks platforms={["github", "linkedin", "codolio"]} />
      </div>
    </footer>
  );
}
