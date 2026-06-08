import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  portfolioData,
  getStructuredDataSameAs,
} from "@/data/portfolio";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { personal, site } = portfolioData;

export const metadata: Metadata = {
  title: `${personal.name} | Software Developer & Full Stack Engineer`,
  description: `Portfolio of ${personal.name} — ${personal.role}. ${site.description}`,
  keywords: [
    personal.name,
    "Software Developer",
    "Full Stack Developer",
    "DevOps",
    "AI Automation",
    "Next.js",
    "React",
    "Portfolio",
  ],
  authors: [{ name: personal.name }],
  openGraph: {
    title: `${personal.name} | Software Developer`,
    description: site.description,
    type: "website",
    locale: "en_US",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | Software Developer`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: personal.role,
  description: site.description,
  email: personal.email,
  telephone: personal.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: personal.location,
  },
  url: site.url,
  sameAs: getStructuredDataSameAs(),
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "DevOps",
    "AI Automation",
    "UI/UX Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
