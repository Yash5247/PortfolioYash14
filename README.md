# Yash Mathur — Portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Yash5247/PortfolioYash14)

A premium personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Three.js.

**Repository:** [github.com/Yash5247/PortfolioYash14](https://github.com/Yash5247/PortfolioYash14)

## Features

- Animated hero with typewriter and text scramble effects
- Interactive tech stack, DevOps pipeline, and system architecture sections
- Bento grid project showcase with filtering and case study pages
- Working developer terminal (`help`, `skills`, `projects`, etc.)
- Command palette (`Ctrl+K` / `Cmd+K`)
- Dark/light mode, custom cursor, particle + Three.js backgrounds
- Scroll progress bar, loading screen, magnetic buttons
- SEO optimization with structured data (JSON-LD)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

Edit all portfolio content in `src/data/portfolio.ts`:

- Personal info, social links, email, phone
- Project live/GitHub URLs, resume path
- Experience, certifications, tech stack, stats

Updating a URL in `portfolio.ts` updates the entire site automatically.

Add your resume to `public/resume.pdf`.

## Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full Vercel deployment instructions.

```bash
npm run build
vercel --prod
```

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS v4, Shadcn UI |
| Animation | Framer Motion, GSAP |
| 3D | Three.js |
| Icons | Lucide React |
