import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { track } from "./analytics";

const rdt = vi.fn();
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("window", { rdt });
  vi.stubGlobal("navigator", { sendBeacon: vi.fn(() => true) });
});
afterEach(() => vi.unstubAllGlobals());

it("sends one named click without forwarding properties or the companion event", () => {
  track("whatsapp_click", { surface: "home_hero", port: "nassau" });
  track("whatsapp_cta_click", { page: "/", position: "home_hero" });
  track("landing_view", { port: "nassau" });
  expect(rdt).toHaveBeenCalledExactlyOnceWith("track", "Custom", {
    customEventName: "WhatsAppClick",
  });
});

it("continues safely if the pixel is absent or throws", () => {
  vi.stubGlobal("window", {});
  expect(() => track("whatsapp_click")).not.toThrow();
  vi.stubGlobal("window", { rdt: () => { throw new Error("blocked"); } });
  expect(() => track("whatsapp_click")).not.toThrow();
  expect(navigator.sendBeacon).toHaveBeenCalledTimes(2);
});
