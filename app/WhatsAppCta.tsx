import type { ReactNode } from "react";
import { WHATSAPP_CHAT_URL } from "@/lib/whatsapp";

/** WhatsApp chat-bubble glyph used on the homepage's WhatsApp buttons. */
export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 3C6.9 3 3 6.6 3 11.1c0 2.3 1 4.4 2.7 5.9L5 21l4.2-2.1c.9.2 1.8.3 2.8.3 5.1 0 9-3.6 9-8.1S17.1 3 12 3Zm-4 9.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z"
      />
    </svg>
  );
}

/**
 * Every homepage "Start in WhatsApp" button. One component so the destination
 * (the live WhatsApp entry link and its prefill) and the tracking can't drift
 * between buttons.
 *
 * - Tracked by HomeAnalytics as `whatsapp_click` with the given `surface`.
 * - `data-wa-cta` marks the button for the mobile sticky bar, which hides while
 *   any marked button is on screen. The sticky bar's own button sets
 *   `watched={false}` so it never hides itself.
 */
export default function WhatsAppCta({
  surface,
  className,
  icon = true,
  watched = true,
  children = "Start in WhatsApp",
}: {
  surface: string;
  className?: string;
  icon?: boolean;
  watched?: boolean;
  children?: ReactNode;
}) {
  return (
    <a
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-analytics-event="whatsapp_click"
      data-analytics-surface={surface}
      data-wa-cta={watched ? "" : undefined}
    >
      {icon ? <WhatsAppIcon /> : null}
      {children}
    </a>
  );
}
