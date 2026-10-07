import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Homepage FAQ: the last objections, answered right before the final CTA.
 * Native <details>/<summary>, so it works without JavaScript and by keyboard.
 *
 * Every answer must stay true to the live chat, checkout and /concierge-terms.
 * Never claim: fillable inside WhatsApp, 24/7 human help, that plans transfer
 * to the app, or other ports.
 */
const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "Is it free to message?",
    a: "Yes. Message ShoreDay and look around first. You only pay $15 if you want the plan.",
  },
  {
    q: "Is it a person or automated?",
    a: "Both. Automated replies anytime, and a person answers in the same chat daily 12–5 pm ET.",
  },
  {
    q: "What counts as a group?",
    a: "One WhatsApp number, for one Nassau port call. One $15 payment covers the group you’re planning for.",
  },
  {
    q: "What do I need to send?",
    a: "Your ship, Nassau date, all-aboard time, group, and day style. You send them in the chat after checkout.",
  },
  {
    q: "What’s the 17-page PDF?",
    a: "The offline Playbook kit. It’s sent to the same chat after payment. Save it to your phone before you step ashore.",
  },
  {
    q: "Can I get a refund?",
    a: (
      <>
        Yes, a full refund any time before your plan is sent. See the{" "}
        <Link href="/concierge-terms">Concierge terms</Link>.
      </>
    ),
  },
  {
    q: "What if my ship’s times change?",
    a: "Your ship’s official all-aboard time and onboard instructions always come first. You can message the same chat through the end of your Nassau port day.",
  },
  {
    q: "Is the ShoreDay app the same thing?",
    a: "No. The app is a separate, self-serve option for planning on your own. The concierge happens in WhatsApp.",
  },
];

export default function HomeFaq() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="faq-head">
        <p className="section-kicker">Good to know</p>
        <h2 id="faq-title">Questions before you start</h2>
      </div>
      <div className="faq-list">
        {FAQ.map(({ q, a }) => (
          <details className="faq-item" key={q}>
            <summary>{q}</summary>
            <p className="faq-answer">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
