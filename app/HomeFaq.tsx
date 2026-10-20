import Link from "next/link";
import { HOME_FAQ } from "@/data/shoreday";
import FaqList from "@/components/marketing/FaqList";
export default function HomeFaq() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="faq-head">
        <p className="section-kicker">Good to know</p>
        <h2 id="faq-title">Questions before you start</h2>
      </div>
      <FaqList items={HOME_FAQ} />
      <p className="faq-policy-links">
        <Link href="/concierge-terms">Concierge Terms</Link> ·{" "}
        <Link href="/privacy">Privacy Policy</Link>
      </p>
    </section>
  );
}
