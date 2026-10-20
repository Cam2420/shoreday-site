import { OFFER } from "@/data/shoreday";
import WhatsAppCta from "@/app/WhatsAppCta";
export default function FinalCta({ surface }: { surface: string }) {
  return (
    <section className="final-cta">
      <div className="final-cta-media" aria-hidden="true">
        <Image
          src="/swimmingpig_bird.jpg"
          alt=""
          fill
          sizes="(max-width: 600px) 94vw, 1080px"
        />
      </div>
      <p className="section-kicker">Nassau, at your pace</p>
      <h2>One chat. Your whole Nassau day.</h2>
      <p>{OFFER}</p>
      <div className="cta-button-group">
        <WhatsAppCta surface={surface} className="final-btn" />
      </div>
      <p className="final-note">
        $15 once for your whole group. Free to message first.
      </p>
    </section>
  );
}
import Image from "next/image";
