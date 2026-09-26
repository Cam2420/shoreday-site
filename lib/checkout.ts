/**
 * ShoreDay Nassau Concierge checkout.
 *
 * /checkout is a branded front door for the GoHighLevel payment link:
 * - People are redirected straight to the payment link by next.config.ts.
 * - Link-preview bots (WhatsApp, iMessage, etc.) get /checkout's own page, so
 *   chats show a ShoreDay preview card instead of GoHighLevel's generic one.
 *
 * To change where checkout goes (e.g. a new payment link or branded domain),
 * update PAYMENT_LINK_URL here — it is the only place it lives.
 */
export const PAYMENT_LINK_URL =
  "https://links.vmamgmt.com/payment-link/6ab5e84ebaea3cadef54f388";

/**
 * User agents of link-preview crawlers. These are NOT redirected, so they can
 * read /checkout's Open Graph tags. Everyone else is redirected server-side.
 * Case-sensitive JS regex (no inline flags) — tokens match real UA strings.
 */
export const PREVIEW_BOT_UA =
  ".*(facebookexternalhit|Facebot|meta-externalagent|WhatsApp|Twitterbot|Slackbot|TelegramBot|LinkedInBot|Discordbot|SkypeUriPreview|Applebot|Pinterestbot|redditbot|Embedly).*";
