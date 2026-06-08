import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/shared/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} {portfolioData.personal.name}. All rights reserved.
        </p>
        <SocialLinks
          platforms={["github", "linkedin", "codolio", "email"]}
        />
      </div>
    </footer>
  );
}
