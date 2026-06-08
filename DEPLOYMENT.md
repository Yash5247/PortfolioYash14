# Deployment Guide — Yash Mathur Portfolio

## Prerequisites

- Node.js 18.17 or later
- npm or pnpm
- A [Vercel](https://vercel.com) account
- A [GitHub](https://github.com) account

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push the project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel auto-detects Next.js — no custom build settings needed.
5. Click **Deploy**.

### Environment Variables

No environment variables are required for the base portfolio. If you add a contact form backend or analytics, configure them in Vercel:

**Project Settings → Environment Variables**

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (optional) |
| `RESEND_API_KEY` | Email service API key (optional) |

## Custom Domain

1. In Vercel, go to **Project Settings → Domains**.
2. Add your domain (e.g. `yashmathur.dev`).
3. Update DNS records as instructed by Vercel.

## Performance Optimization

The portfolio is optimized for Lighthouse scores of 95+:

- Server Components where possible
- Lazy-loaded client components
- Optimized fonts via `next/font`
- Minimal bundle size with tree-shaking
- Static generation for case study pages

## Before Deploying

1. Update all links in `src/data/portfolio.ts` (email, GitHub, LinkedIn, Codolio, projects).
2. Add your resume PDF to `public/resume.pdf`.
3. Replace project URLs with live demo and GitHub links.
4. Update `site.url` in `src/data/portfolio.ts` for SEO structured data.

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, SEO, structured data
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles & theme
│   ├── blog/page.tsx       # Blog placeholder
│   └── case-studies/[slug]/ # Dynamic case study pages
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── layout/             # Navbar, Footer, Loading, etc.
│   ├── effects/            # Cursor, particles, Three.js
│   ├── sections/           # Portfolio sections
│   └── shared/             # Reusable components
├── lib/
│   ├── data/
│   │   └── portfolio.ts    # Single source of truth for all URLs & content
│   └── utils.ts            # Utility functions
└── providers/
    └── theme-provider.tsx  # Dark/light mode
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails on Vercel | Ensure Node.js version is 18+ in Project Settings |
| Three.js not rendering | Check browser WebGL support; component is client-side only |
| Theme flash on load | `suppressHydrationWarning` is set on `<html>` |
| GSAP ScrollTrigger errors | Components using GSAP are client-side (`"use client"`) |
