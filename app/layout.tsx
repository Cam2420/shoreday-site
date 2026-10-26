import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import RedditPixel from "@/components/RedditPixel";
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
    default: "ShoreDay | Nassau Port-Day Planning",
    template: "%s | ShoreDay",
  },
  description:
    "Your Nassau day in one WhatsApp chat, with a personal plan and offline PDF. $9.99 once for your whole group.",
  openGraph: { images: [{ url: "/opengraph-image", width: 1200, height: 630 }], siteName: "ShoreDay" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
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
      <body>
        <RedditPixel />
        {children}
      </body>
    </html>
  );
}
