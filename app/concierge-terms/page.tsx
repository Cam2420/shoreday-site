import type { Metadata } from "next";
import "../legal.css";

const title = "ShoreDay Nassau Concierge — Terms";
const description =
  "What the $15 ShoreDay Nassau Concierge includes, refunds, and support.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/concierge-terms" },
  openGraph: {
    title,
    description,
    url: "/concierge-terms",
    siteName: "ShoreDay",
    type: "website",
  },
};

export default function ConciergeTerms() {
  return (
    <main className="legal">
      <h1>ShoreDay Nassau Concierge — Terms</h1>

      <h2>What you get</h2>
      <p>
        A personalized Nassau port-day plan, the offline Nassau Playbook kit, and
        WhatsApp help through the end of your Nassau port day. $15 USD one-time,
        per group (one WhatsApp number), for one Nassau port call.
      </p>

      <h2>Refunds</h2>
      <p>
        Full refund any time before your personalized plan is sent to you in
        WhatsApp. Once your plan is delivered, the $15 is non-refundable unless
        ShoreDay fails to provide the service described. To request a refund,
        message us in the same WhatsApp chat — please contact us before disputing
        a charge with your bank.
      </p>

      <h2>Independent service</h2>
      <p>
        ShoreDay is an independent planning service, not affiliated with any
        cruise line or the Nassau Cruise Port. Times, prices and recommendations
        are estimates. You are responsible for returning to your ship by its
        all-aboard time.
      </p>

      <h2>Support</h2>
      <p>
        Human help daily 12–5 pm ET in the same WhatsApp chat, or{" "}
        <a href="mailto:support@shoredayapp.com">support@shoredayapp.com</a>. ShoreDay is
        not an emergency service — in an emergency call 919 or 911.
      </p>

      <p>Operated by VMA Management LLC, Miami, Florida.</p>
    </main>
  );
}
