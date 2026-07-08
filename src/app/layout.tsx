import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import { PersistentBadge } from "@/components/PersistentBadge";
import { CustomCursor } from "@/components/CustomCursor";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { CookieBanner } from "@/components/CookieBanner";
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REHAN.DEV - Web Developer & Cybersecurity Analyst",
  description: "Portfolio of Muhammad Rehan (CH4 Ezio), Web Developer & Cybersecurity Analyst based in Karachi, Pakistan. Specializing in secure, high-performance web applications.",
  keywords: ["Muhammad Rehan", "CH4 Ezio", "Web Developer", "Cybersecurity Analyst", "Karachi", "Pakistan", "VAPT", "React", "Next.js", "Muhammad Rehan dev", "Muhammadrehan-dev"],
  authors: [{ name: "Muhammad Rehan" }],
  creator: "Muhammad Rehan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadrehan-dev.vercel.app/",
    title: "Muhammad Rehan | Web Developer & Cybersecurity Analyst",
    description: "Portfolio of Muhammad Rehan (CH4 Ezio), Web Developer & Cybersecurity Analyst based in Karachi, Pakistan.",
    siteName: "REHAN.DEV",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rehan | Web Developer & Cybersecurity Analyst",
    description: "Portfolio of Muhammad Rehan (CH4 Ezio), Web Developer & Cybersecurity Analyst based in Karachi, Pakistan.",
  },
  verification: {
    google: "UGOwuM_hZYYHixFCm_oL7KZ_wyZunZUS47CeXOY7M4U",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white selection:bg-white selection:text-black overflow-hidden">
        <AnalyticsProvider>
          <CustomCursor />
          <PersistentBadge />
          {children}
          <CookieBanner />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
