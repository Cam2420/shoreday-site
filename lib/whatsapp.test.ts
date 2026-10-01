import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  WHATSAPP_CHAT_URL,
  WHATSAPP_QR_SRC,
  WHATSAPP_SHARE_TEXT,
  WHATSAPP_SHARE_TITLE,
  WHATSAPP_SHARE_URL,
} from "./whatsapp";

describe("WhatsApp concierge link", () => {
  it("opens the ShoreDay number with the funnel's first message", () => {
    expect(WHATSAPP_CHAT_URL).toBe(
      "https://wa.me/17863478064?text=Hi%20ShoreDay!%20My%20cruise%20stops%20in%20Nassau",
    );
  });

  it("QR code file was generated for the same link", () => {
    const svg = readFileSync(join(process.cwd(), "public", WHATSAPP_QR_SRC), "utf8");
    expect(svg).toContain(`<desc>${WHATSAPP_CHAT_URL}</desc>`);
  });
});

describe("WhatsApp share (cruise buddy)", () => {
  it("links to the homepage WhatsApp section with referral UTMs", () => {
    expect(WHATSAPP_SHARE_URL).toBe(
      "https://shoredayapp.com/?utm_source=share&utm_medium=referral&utm_campaign=cruise_buddy#whatsapp",
    );
    const url = new URL(WHATSAPP_SHARE_URL);
    expect(url.origin).toBe("https://shoredayapp.com");
    expect(url.hash).toBe("#whatsapp");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      utm_source: "share",
      utm_medium: "referral",
      utm_campaign: "cruise_buddy",
    });
  });

  it("uses the agreed title and text, with no prices or AI wording", () => {
    expect(WHATSAPP_SHARE_TITLE).toBe("ShoreDay: Nassau port-day plan");
    expect(WHATSAPP_SHARE_TEXT).toBe(
      "Heading to Nassau? ShoreDay builds your port day around your ship's all-aboard time: where to go, what it costs, when to head back. Free to message, and you only pay if you want the plan.",
    );
    expect(WHATSAPP_SHARE_TEXT).not.toMatch(/\$|\d+\s*(usd|dollars?)/i);
    expect(`${WHATSAPP_SHARE_TITLE} ${WHATSAPP_SHARE_TEXT}`).not.toMatch(/\bAI\b/);
  });
});
