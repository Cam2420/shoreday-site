/**
 * ShoreDay Nassau Concierge on WhatsApp.
 *
 * The homepage section links here. The pre-filled first message matches the
 * WhatsApp funnel's entry message, so the Funnel 1 Welcome workflow and the
 * Front Desk bot treat website visitors like every other entry point.
 *
 * If the number or message changes, update it here AND regenerate
 * public/images/shoreday/whatsapp/shoreday-whatsapp-qr.svg (the QR encodes
 * WHATSAPP_CHAT_URL; lib/whatsapp.test.ts checks the file still matches).
 */
export const WHATSAPP_NUMBER = "17863478064";

export const WHATSAPP_PREFILL = "Hi ShoreDay! My cruise stops in Nassau";

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_PREFILL,
)}`;

export const WHATSAPP_QR_SRC = "/images/shoreday/whatsapp/shoreday-whatsapp-qr.svg";

/**
 * "Send to a cruise buddy" share from the mobile share card. The link lands on
 * the homepage WhatsApp section (id="whatsapp") with referral UTMs. Keep the
 * text free of prices so it stays true if the offer changes.
 */
export const WHATSAPP_SHARE_URL =
  "https://shoredayapp.com/?utm_source=share&utm_medium=referral&utm_campaign=cruise_buddy#whatsapp";

export const WHATSAPP_SHARE_TITLE = "ShoreDay: Nassau port-day plan";

export const WHATSAPP_SHARE_TEXT =
  "Heading to Nassau? ShoreDay builds your port day around your ship's all-aboard time: where to go, what it costs, when to head back. Free to message, and you only pay if you want the plan.";
