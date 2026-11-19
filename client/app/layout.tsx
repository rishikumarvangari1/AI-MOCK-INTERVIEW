import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

import Navbar from "@/components/Navbar";
import AIAssistantWidget from "@/components/AIAssistantWidget";
import { AuthProvider } from "@/context/Authcontent";
import { ThemeProvider } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

/* =====================================================
   SITE CONSTANTS
===================================================== */

const SITE_NAME = "AI Mock Interview";
const SITE_SHORT_NAME = "MockInterview";
const SITE_TAGLINE = "Practice smarter. Prepare better. Perform confidently.";
const SITE_DESCRIPTION =
  "AI-powered mock interview preparation platform. Practice real interview questions, analyse your resume and track your progress.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const THEME_COLOR = "#2563eb";
const COPYRIGHT_YEAR = 2026;

/* =====================================================
   METADATA
===================================================== */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "education",
  keywords: [
    "mock interview",
    "AI interview",
    "interview practice",
    "resume analysis",
    "career preparation",
    "interview questions",
    "javascript interview",
    "react interview",
    "system design interview",
  ],
  authors: [{ name: "MockInterview AI" }],
  creator: "MockInterview AI",
  publisher: "MockInterview AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

/* =====================================================
   VIEWPORT
===================================================== */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
  colorScheme: "light",
};

/* =====================================================
   FOOTER TYPES
===================================================== */

type FooterLink = {
  label: string;
  href: string;
  badge?: string;
  badgeTone?: "green" | "blue" | "amber";
};

type FooterGroup = {
  heading: string;
  links: FooterLink[];
};

type SocialLink = {
  label: string;
  href: string;
  text: string;
};

type LegalLink = {
  label: string;
  href: string;
};

/* =====================================================
   FOOTER DATA
===================================================== */

const footerGroups: FooterGroup[] = [
  {
    heading: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Practice interview", href: "/dashboard/interview" },
      {
        label: "Resume analysis",
        href: "/dashboard/resume",
        badge: "New",
        badgeTone: "green",
      },
      { label: "My sessions", href: "/dashboard/history" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "Profile", href: "/dashboard/profile" },
    ],
  },
  {
    heading: "Preparation",
    links: [
      { label: "Common HR questions", href: "/dashboard/interview?domain=general" },
      { label: "STAR method", href: "/dashboard/interview?domain=general" },
      { label: "JavaScript questions", href: "/dashboard/interview?domain=javascript" },
      { label: "React questions", href: "/dashboard/interview?domain=react" },
      {
        label: "System design",
        href: "/dashboard/interview?domain=system-design",
        badge: "Popular",
        badgeTone: "blue",
      },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", text: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com", text: "in" },
  { label: "X (Twitter)", href: "https://x.com", text: "X" },
  { label: "Email us", href: "mailto:support@mockinterview.ai", text: "✉" },
];

const legalLinks: LegalLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

/* =====================================================
   STRUCTURED DATA (helps search engines)
===================================================== */

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

/* =====================================================
   FOOTER HELPERS
===================================================== */

function badgeClass(tone?: FooterLink["badgeTone"]): string {
  if (tone === "blue") return "footer-badge footer-badge--blue";
  if (tone === "amber") return "footer-badge footer-badge--amber";

  return "footer-badge";
}

/* =====================================================
   FOOTER: BRAND BLOCK
===================================================== */

function FooterBrand() {
  return (
    <div className="site-footer__brand">
      <Link href="/" className="site-footer__logo">
        <span className="site-footer__logo-icon">AI</span>

        <span className="site-footer__logo-text">
          <strong>{SITE_SHORT_NAME}</strong>
          <small>AI Powered</small>
        </span>
      </Link>

      <p className="site-footer__about">{SITE_DESCRIPTION}</p>

      <div className="site-footer__cta">
        <Link href="/register" className="footer-btn footer-btn--primary">
          Start practicing
        </Link>

        <Link href="/login" className="footer-btn footer-btn--ghost">
          Login
        </Link>
      </div>

      <FooterSocial />
    </div>
  );
}

/* =====================================================
   FOOTER: SOCIAL BUTTONS
===================================================== */

function FooterSocial() {
  return (
    <div className="site-footer__social" aria-label="Social links">
      {socialLinks.map((social) => {
        const isExternal = social.href.startsWith("http");

        return (
          <a
            key={social.label}
            href={social.href}
            className="footer-social"
            aria-label={social.label}
            title={social.label}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {social.text}
          </a>
        );
      })}
    </div>
  );
}

/* =====================================================
   FOOTER: LINK COLUMN
===================================================== */

function FooterColumn({ group }: { group: FooterGroup }) {
  return (
    <nav aria-label={group.heading} className="site-footer__column">
      <h4 className="site-footer__heading">{group.heading}</h4>

      <ul className="site-footer__list">
        {group.links.map((link) => (
          <li key={`${group.heading}-${link.label}`}>
            <Link href={link.href} className="footer-link">
              <span className="footer-link__label">{link.label}</span>

              {link.badge && (
                <span className={badgeClass(link.badgeTone)}>
                  {link.badge}
                </span>
              )}

              <span className="footer-link__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* =====================================================
   FOOTER: LEGAL LINKS
===================================================== */

function FooterLegal() {
  return (
    <nav aria-label="Legal" className="site-footer__legal">
      {legalLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="footer-legal-link"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

/* =====================================================
   FOOTER: BOTTOM BAR
===================================================== */

function FooterBottom() {
  return (
    <div className="site-footer__bottom">
      <p className="site-footer__copy">
        © {COPYRIGHT_YEAR} {SITE_SHORT_NAME} AI. All rights reserved.
      </p>

      <FooterLegal />

      <p className="site-footer__tagline">{SITE_TAGLINE}</p>

      <a href="#top" className="footer-top-btn">
        <span className="footer-top-btn__icon" aria-hidden="true">
          ↑
        </span>
        Back to top
      </a>
    </div>
  );
}

/* =====================================================
   FOOTER COMPONENT
===================================================== */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <FooterBrand />

          {footerGroups.map((group) => (
            <FooterColumn key={group.heading} group={group} />
          ))}
        </div>

        <hr className="site-footer__divider" />

        <FooterBottom />
      </div>
    </footer>
  );
}

/* =====================================================
   SKIP LINK (keyboard accessibility)
===================================================== */

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
    >
      Skip to main content
    </a>
  );
}

/* =====================================================
   JSON-LD SCRIPT
===================================================== */

function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

/* =====================================================
   ROOT LAYOUT
===================================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans")}
      suppressHydrationWarning
    >
      <body
        id="top"
        className="flex min-h-screen flex-col bg-white text-gray-900 antialiased"
      >
        <StructuredData />

        <ThemeProvider>
          <AuthProvider>
            <SkipLink />

            <Navbar />

            <div id="main-content" className="flex-1">
              {children}
            </div>

            <Footer />

            <AIAssistantWidget />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}