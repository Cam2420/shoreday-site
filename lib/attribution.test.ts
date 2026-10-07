import { describe, expect, it, vi } from "vitest";
import { FUNNEL_EVENT_PROPERTY_KEYS } from "./funnel-events";
import { landingContextProps, referrerHostFrom, utmPropsFromSearch } from "./attribution";

describe("utmPropsFromSearch", () => {
  it("copies present utm_* values, trimmed", () => {
    expect(
      utmPropsFromSearch("?utm_source=share&utm_medium=referral&utm_campaign=%20cruise_buddy%20"),
    ).toEqual({ utm_source: "share", utm_medium: "referral", utm_campaign: "cruise_buddy" });
  });

  it("drops empty values and non-utm params", () => {
    expect(utmPropsFromSearch("?utm_source=&utm_term=%20%20&ref=abc&email=x@y.z")).toEqual({});
    expect(utmPropsFromSearch("")).toEqual({});
  });
});

describe("referrerHostFrom", () => {
  it("keeps the hostname only", () => {
    expect(referrerHostFrom("https://l.instagram.com/?u=https%3A%2F%2Fshoredayapp.com")).toBe(
      "l.instagram.com",
    );
  });

  it("returns undefined for no or unparseable referrer", () => {
    expect(referrerHostFrom("")).toBeUndefined();
    expect(referrerHostFrom("not a url")).toBeUndefined();
  });
});

describe("landingContextProps", () => {
  it("is empty during SSR", () => {
    expect(landingContextProps()).toEqual({});
  });

  it("reads the path, referrer host and utm_* from the page, all allow-listed", () => {
    vi.stubGlobal("window", {
      location: { pathname: "/", search: "?utm_source=share&utm_campaign=cruise_buddy" },
    });
    vi.stubGlobal("document", { referrer: "https://www.tiktok.com/@shoreday?lang=en" });
    try {
      const props = landingContextProps();
      expect(props).toEqual({
        page_path: "/",
        referrer_host: "www.tiktok.com",
        utm_source: "share",
        utm_campaign: "cruise_buddy",
      });
      const allowed = new Set<string>(FUNNEL_EVENT_PROPERTY_KEYS);
      for (const key of Object.keys(props)) expect(allowed.has(key)).toBe(true);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("omits referrer_host and utm_* when absent", () => {
    vi.stubGlobal("window", { location: { pathname: "/", search: "" } });
    vi.stubGlobal("document", { referrer: "" });
    try {
      expect(landingContextProps()).toEqual({ page_path: "/" });
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
