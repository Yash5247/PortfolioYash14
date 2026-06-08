import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/shared/SocialLinks";

const { personal, navLinks, socials } = portfolioData;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="#hero" className="inline-block">
              <span className="text-lg font-semibold tracking-tight text-white">
                {personal.name}
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
              {personal.role}. Building scalable web applications, AI automation
              systems, and production-ready software.
            </p>
            <p className="mt-4 text-sm text-white/40">{personal.location}</p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="#hero" className="text-sm text-white/60 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <a href={`mailto:${personal.email}`} className="transition-colors hover:text-white">
                  {personal.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {personal.phone}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <SocialLinks platforms={["github", "linkedin", "codolio", "email"]} />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {year} {personal.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/35">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/60"
            >
              Open to opportunities
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
