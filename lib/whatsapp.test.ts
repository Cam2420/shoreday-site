import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { WHATSAPP_CHAT_URL, WHATSAPP_QR_SRC } from "./whatsapp";

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
