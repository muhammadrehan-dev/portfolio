import type { Metadata } from "next";
import { Caveat, Sacramento, Great_Vibes } from "next/font/google";
import "./globals.css";
import { PersistentBadge } from "@/components/PersistentBadge";
import { CustomCursor } from "@/components/CustomCursor";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { IosGreetingsSplash } from "@/components/IosGreetingsSplash";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const sacramento = Sacramento({
  weight: "400",
  variable: "--font-sacramento",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadrehan-dev.me"),
  title: {
    default: "Muhammad Rehan (CH4 Ezio) | Web Developer & Cybersecurity Analyst",
    template: "%s | Muhammad Rehan",
  },
  description:
    "Portfolio of Muhammad Rehan (CH4 Ezio) — Web Developer & Cybersecurity Analyst based in Karachi, Pakistan. Specializing in secure, high-performance web applications, penetration testing, and VAPT.",
  keywords: [
    "Muhammad Rehan",
    "CH4 Ezio",
    "muhammadrehan-dev",
    "Muhammad Rehan dev",
    "Web Developer Karachi",
    "Cybersecurity Analyst Pakistan",
    "VAPT Analyst",
    "Full Stack Developer Pakistan",
    "Next.js Developer",
    "React Developer",
    "Penetration Tester Pakistan",
    "7 Experts PK",
    "Karachi Web Developer",
  ],
  authors: [{ name: "Muhammad Rehan", url: "https://muhammadrehan-dev.me" }],
  creator: "Muhammad Rehan",
  publisher: "Muhammad Rehan",
  alternates: {
    canonical: "https://muhammadrehan-dev.me",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadrehan-dev.me",
    siteName: "Muhammad Rehan | REHAN.DEV",
    title: "Muhammad Rehan (CH4 Ezio) | Web Developer & Cybersecurity Analyst",
    description:
      "Web Developer & Cybersecurity Analyst based in Karachi, Pakistan. Delivering secure full-stack applications and professional security assessments.",
    images: [
      {
        url: "/media/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Rehan - Web Developer & Cybersecurity Analyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rehan (CH4 Ezio) | Web Developer & Cybersecurity Analyst",
    description:
      "Web Developer & Cybersecurity Analyst based in Karachi, Pakistan. Delivering secure, modern web experiences.",
    images: ["/media/hero-bg.jpg"],
    creator: "@its_rehan_riaz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "UGOwuM_hZYYHixFCm_oL7KZ_wyZunZUS47CeXOY7M4U",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${sacramento.variable} ${greatVibes.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-black text-white selection:bg-white selection:text-black overflow-hidden"
        suppressHydrationWarning
      >
        <AnalyticsProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebSite",
                    "@id": "https://muhammadrehan-dev.me/#website",
                    "url": "https://muhammadrehan-dev.me",
                    "name": "Muhammad Rehan | Web Developer & Cybersecurity Analyst",
                    "description": "Portfolio of Muhammad Rehan (CH4 Ezio), Web Developer & Cybersecurity Analyst based in Karachi, Pakistan.",
                    "publisher": {
                      "@id": "https://muhammadrehan-dev.me/#person",
                    },
                    "inLanguage": "en-US",
                  },
                  {
                    "@type": "Person",
                    "@id": "https://muhammadrehan-dev.me/#person",
                    "name": "Muhammad Rehan",
                    "alternateName": ["CH4 Ezio", "Rehan Riaz", "muhammadrehan-dev"],
                    "url": "https://muhammadrehan-dev.me",
                    "image": "https://muhammadrehan-dev.me/media/hero-bg.jpg",
                    "jobTitle": "Web Developer & Cybersecurity Analyst",
                    "description": "Full-stack developer and VAPT security analyst specializing in Next.js, React, Node.js, and web application security.",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Karachi",
                      "addressCountry": "PK",
                    },
                    "sameAs": [
                      "https://github.com/muhammadrehan-dev",
                      "https://www.linkedin.com/in/muhammad-rehanriaz/",
                      "https://instagram.com/its.rehan.riaz",
                      "https://7expertspk.com",
                    ],
                    "knowsAbout": [
                      "Web Development",
                      "Cybersecurity",
                      "Vulnerability Assessment and Penetration Testing (VAPT)",
                      "Next.js",
                      "React",
                      "TypeScript",
                      "Application Security",
                    ],
                  },
                ],
              }),
            }}
          />
          <IosGreetingsSplash />
          <CustomCursor />
          <PersistentBadge />
          {children}
          <CookieBanner />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
