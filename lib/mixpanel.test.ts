import { describe, expect, it, vi } from "vitest";
import {
  buildMixpanelEvent,
  DEFAULT_MIXPANEL_HOST,
  forwardToMixpanel,
  sanitizeAnonymousId,
} from "./mixpanel";

type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

describe("mixpanel — sanitizeAnonymousId (privacy-safe distinct_id)", () => {
  it("accepts an opaque UUID and an anon-style id", () => {
    const uuid = "123e4567-e89b-12d3-a456-426614174000";
    expect(sanitizeAnonymousId(uuid)).toBe(uuid);
    expect(sanitizeAnonymousId("anon-abc123-xyz789")).toBe("anon-abc123-xyz789");
  });

  it("rejects non-strings, wrong-length, and PII-shaped values", () => {
    expect(sanitizeAnonymousId(undefined)).toBeUndefined();
    expect(sanitizeAnonymousId(12345)).toBeUndefined();
    expect(sanitizeAnonymousId({})).toBeUndefined();
    expect(sanitizeAnonymousId("short")).toBeUndefined(); // < 8 chars
    expect(sanitizeAnonymousId("a".repeat(65))).toBeUndefined(); // > 64 chars
    expect(sanitizeAnonymousId("user@example.com")).toBeUndefined(); // email-shaped
    expect(sanitizeAnonymousId("Jane Doe")).toBeUndefined(); // contains a space / name-shaped
  });
});

describe("mixpanel — buildMixpanelEvent (payload shape)", () => {
  it("builds token, time, $insert_id, distinct_id, and allowed props", () => {
    const e = buildMixpanelEvent({
      name: "excursion_click",
      token: "test-token",
      distinctId: "anon-123-xyz",
      props: { port: "nassau", surface: "starter_card", excursion_id: "x1", offer_priority: "1" },
      insertId: "ins-1",
      timeMs: 1700000000000,
    });
    expect(e.event).toBe("excursion_click");
    expect(e.properties.token).toBe("test-token");
    expect(e.properties.time).toBe(1700000000000);
    expect(e.properties.$insert_id).toBe("ins-1");
    expect(e.properties.distinct_id).toBe("anon-123-xyz");
    expect(e.properties.surface).toBe("starter_card");
    expect(e.properties.excursion_id).toBe("x1");
    expect(e.properties.offer_priority).toBe("1");
  });

  it("omits distinct_id when none is provided", () => {
    const e = buildMixpanelEvent({
      name: "landing_view",
      token: "test-token",
      props: { port: "nassau" },
      insertId: "i",
      timeMs: 1,
    });
    expect("distinct_id" in e.properties).toBe(false);
  });

  it("re-filters unknown / PII-shaped props (defence in depth)", () => {
    const e = buildMixpanelEvent({
      name: "email_submitted",
      token: "test-token",
      props: { port: "nassau", email: "a@b.com", ship_name: "Carnival", foo: "bar", mode: "times" },
      insertId: "i",
      timeMs: 1,
    });
    expect("email" in e.properties).toBe(false);
    expect("ship_name" in e.properties).toBe(false);
    expect("foo" in e.properties).toBe(false);
    expect(e.properties.mode).toBe("times");
    expect(e.properties.port).toBe("nassau");
  });
});

describe("mixpanel — forwardToMixpanel (transport)", () => {
  it("POSTs a JSON array to <host>/track?ip=0 and returns true on 2xx", async () => {
    const fetchMock = vi.fn<FetchFn>(() => Promise.resolve(new Response("1", { status: 200 })));
    vi.stubGlobal("fetch", fetchMock);
    const event = { event: "landing_view", properties: { token: "t" } };
    const ok = await forwardToMixpanel([event]);
    expect(ok).toBe(true);
    expect(String(fetchMock.mock.calls[0][0])).toBe(`${DEFAULT_MIXPANEL_HOST}/track?ip=0`);
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(init.body as string)).toEqual([event]);
    vi.unstubAllGlobals();
  });

  it("returns false and does not throw on network failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );
    await expect(forwardToMixpanel([{ event: "x", properties: {} }])).resolves.toBe(false);
    vi.unstubAllGlobals();
  });

  it("uses the MIXPANEL_API_HOST override when provided", async () => {
    const fetchMock = vi.fn<FetchFn>(() => Promise.resolve(new Response("1", { status: 200 })));
    vi.stubGlobal("fetch", fetchMock);
    await forwardToMixpanel([{ event: "x", properties: {} }], { host: "https://api-eu.mixpanel.com/" });
    expect(String(fetchMock.mock.calls[0][0])).toBe("https://api-eu.mixpanel.com/track?ip=0");
    vi.unstubAllGlobals();
  });
});
