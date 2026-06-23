import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
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
    <html lang="en" className={plusJakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
