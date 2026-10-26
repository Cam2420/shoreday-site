import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Reddit page visits", () => {
  const appendChild = vi.fn();
  const createElement = vi.fn(() => ({ src: "", async: false }));

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.stubGlobal("window", {});
    vi.stubGlobal("document", { createElement, head: { appendChild } });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("loads once, deduplicates rerenders, and tracks subsequent route visits", async () => {
    const { trackRedditPageVisit } = await import("./reddit-pixel");
    trackRedditPageVisit("/");
    trackRedditPageVisit("/");
    trackRedditPageVisit("/things-to-do-in-nassau");
    trackRedditPageVisit("/");

    expect(appendChild).toHaveBeenCalledTimes(1);
    expect(appendChild.mock.calls[0][0]).toEqual({
      src: "https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_jwzpg5ilr1zg",
      async: true,
    });
    expect(window.rdt?.callQueue).toEqual([
      ["init", "a2_jwzpg5ilr1zg"],
      ["track", "PageVisit"],
      ["track", "PageVisit"],
      ["track", "PageVisit"],
    ]);
  });

  it("uses the loaded vendor dispatcher without adding event properties", async () => {
    const { trackRedditPageVisit } = await import("./reddit-pixel");
    trackRedditPageVisit("/");
    const sendEvent = vi.fn();
    window.rdt!.sendEvent = sendEvent;
    trackRedditPageVisit("/privacy");
    expect(sendEvent).toHaveBeenCalledExactlyOnceWith("track", "PageVisit");
  });

  it("does nothing during server rendering", async () => {
    vi.stubGlobal("window", undefined);
    const { trackRedditPageVisit } = await import("./reddit-pixel");
    expect(() => trackRedditPageVisit("/")).not.toThrow();
    expect(appendChild).not.toHaveBeenCalled();
  });
});
