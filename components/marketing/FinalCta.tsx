import Image from "next/image";
import WhatsAppCta from "@/app/WhatsAppCta";
export default function FinalCta({ surface }: { surface: string }) {
  return (
    <section className="final-cta">
      <div className="final-cta-media">
        <Image
          src="/swimmingpig_bird.jpg"
          alt="A swimming pig with a bird perched on its back in turquoise water"
          fill
          sizes="(max-width: 760px) 94vw, 540px"
        />
      </div>
      <div className="final-cta-copy">
        <p className="section-kicker">Nassau, at your pace</p>
        <h2>One chat. Your whole Nassau day.</h2>
        <div className="cta-button-group">
          <WhatsAppCta surface={surface} className="final-btn" />
        </div>
        <p className="final-note">
          $9.99 once for your whole group. Free to message first.
        </p>
      </div>
    </section>
  );
}
