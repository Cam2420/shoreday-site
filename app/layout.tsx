import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

// Body / UI sans — Hanken Grotesk: a warm, humanist grotesque that reads closer
// to trusted travel / hospitality brands than a generic geometric SaaS sans,
// while staying highly legible for body copy, labels, buttons, and timing
// numerals. Loaded via next/font (no package dependency).
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

// Warm editorial display face for selective headings only (hero + section
// titles). Body, UI, form labels, buttons, and timing numerals stay on Hanken
// Grotesk for legibility. Loaded via next/font (no package dependency).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shoredayapp.com"),
  title: {
    default: "ShoreDay | Bahamas Cruise Port AI Concierge",
    template: "%s | ShoreDay",
  },
  description:
    "Plan your Bahamas cruise port day around your all-aboard time with AI itineraries, ship countdowns, and curated local excursions.",
  icons: {
    icon: "/shoreday_icon.png",
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
      className={`${hankenGrotesk.variable} ${fraunces.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
