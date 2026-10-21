import Image from "next/image";
import Link from "next/link";
import type { Guide } from "@/data/guides";
import type { ShipGuide } from "@/data/ships";
import { INDEPENDENCE } from "@/data/cruise-lines";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/data/shoreday";
import HomeAnalytics from "@/app/HomeAnalytics";
import WhatsAppCta from "@/app/WhatsAppCta";
import StickyWhatsAppCta from "@/app/StickyWhatsAppCta";
import ShoreDayWordmark from "@/components/brand/ShoreDayWordmark";
import { BreadcrumbSchema } from "./StructuredData";
import FaqList from "./FaqList";
import GuideLinks from "./GuideLinks";
import FinalCta from "./FinalCta";
import TimingExample from "./TimingExample";
import { ChatCard } from "./ChatPreview";
import "@/app/home.css";
import "@/app/marketing.css";
export default function GuidePage({
  guide,
  ship,
}: {
  guide: Guide;
  ship?: ShipGuide;
}) {
  const path = ship ? `/ships/${guide.slug}` : `/${guide.slug}`;
  return (
    <div className="home marketing guide-page">
      <HomeAnalytics />
      <BreadcrumbSchema title={ship ? ship.ship : guide.title} path={path} />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="logo">
          <Image src="/logo_transparent.png" width={28} height={36} alt="" />
          <ShoreDayWordmark />
        </Link>
        <Link href="/#guides" className="header-guide">
          Nassau guides
        </Link>
        <WhatsAppCta surface="guide_header" className="nav-cta" />
      </header>
      <main id="content">
        <div className="guide-hero">
          <div className="breadcrumb">
            <Link href="/">ShoreDay</Link>
            <span aria-hidden="true"> / </span>
            <span>{ship ? ship.ship : "Nassau guide"}</span>
          </div>
          <p className="section-kicker">{guide.eyebrow}</p>
          <h1>{guide.h1}</h1>
          <p className="guide-intro">{guide.intro}</p>
          <WhatsAppCta surface="guide_hero" className="wa-button" />
          <p className="section-note">
            $9.99 once for your whole group. Free to message first.
          </p>
          <p className="guide-independent">{INDEPENDENCE}</p>
        </div>
        <div className="guide-content">
          <article className="guide-article">
            {ship && (
              <aside className="source-note">
                <strong>About this ship</strong>
                <p>{ship.sourceNote}</p>
                <a
                  href={ship.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ship.sourceLabel} ↗
                </a>
                <small>
                  Source checked October 20, 2026. Confirm your own booking and
                  onboard times.
                </small>
              </aside>
            )}
            {guide.sections.map((section, i) => (
              <section key={section.title} id={`section-${i}`}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {guide.timing && i === 1 && <TimingExample />}
                {guide.menu && i === 2 && (
                  <figure className="guide-menu">
                    <ChatCard type="menu" />
                    <figcaption>
                      Goldie’s chat excerpt · prices as of Oct 2026. Adapted to
                      light mode. Confirm current prices.
                    </figcaption>
                  </figure>
                )}
              </section>
            ))}
            {guide.app && (
              <p className="store-text-links">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShoreDay for iOS ↗
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShoreDay for Android ↗
                </a>
              </p>
            )}
            <section className="guide-faq">
              <h2>Your questions, answered</h2>
              <FaqList items={guide.faq} />
            </section>
          </article>
          <aside className="guide-aside">
            <p className="section-kicker">Keep the day simple</p>
            <h2>Start with your ship’s clock.</h2>
            <p>
              Your all-aboard time decides which stops fit. Send it in WhatsApp
              before choosing your day.
            </p>
            <WhatsAppCta surface="guide_sidebar" className="wa-button" />
            <div className="guide-contents">
              <p>In this guide</p>
              {guide.sections.map((s, i) => (
                <a href={`#section-${i}`} key={s.title}>
                  {s.title}
                </a>
              ))}
            </div>
          </aside>
        </div>
        <GuideLinks slugs={guide.related} />
        <FinalCta surface="guide_final" />
      </main>
      <footer>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/concierge-terms">Concierge Terms</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <p>{INDEPENDENCE}</p>
        <p>© 2026 VMAManagement LLC · ShoreDay</p>
      </footer>
      <StickyWhatsAppCta />
    </div>
  );
}
