import type { Metadata } from "next";
import { PAYMENT_LINK_URL } from "@/lib/checkout";
import CheckoutRedirect from "./CheckoutRedirect";

const title = "ShoreDay Nassau Concierge — $15";
const description = "Secure payment · $15 one time for your whole group";

export const metadata: Metadata = {
  title: { absolute: "ShoreDay Nassau Concierge — Secure checkout" },
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
  openGraph: {
    title,
    description,
    url: "/checkout",
    siteName: "ShoreDay",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

// People normally never see this page: next.config.ts redirects them to the
// payment link before it renders. It exists for link-preview bots, plus a
// fallback redirect/button just in case.
export default function CheckoutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
        textAlign: "center",
        background: "#f4fafb",
        color: "#0b2a36",
      }}
    >
      <div>
        <p>Opening your secure ShoreDay checkout…</p>
        <a
          href={PAYMENT_LINK_URL}
          style={{
            display: "inline-block",
            marginTop: 12,
            background: "#0e7c86",
            color: "#fff",
            padding: "14px 22px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Continue to checkout
        </a>
        <CheckoutRedirect />
      </div>
    </main>
  );
}
