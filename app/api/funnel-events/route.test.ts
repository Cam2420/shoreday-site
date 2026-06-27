import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

function postRequest(body: unknown): Request {
  return new Request("http://localhost/api/funnel-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function sentEvents(fetchMock: ReturnType<typeof vi.fn>) {
  const init = fetchMock.mock.calls[0][1] as RequestInit;
  return JSON.parse(init.body as string) as Array<{ event: string; properties: Record<string, unknown> }>;
}

describe("/api/funnel-events — Mixpanel forwarding", () => {
  const ORIGINAL_TOKEN = process.env.MIXPANEL_PROJECT_TOKEN;
  let fetchMock: ReturnType<typeof vi.fn>;
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock = vi.fn(async () => new Response("1", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    if (ORIGINAL_TOKEN === undefined) delete process.env.MIXPANEL_PROJECT_TOKEN;
    else process.env.MIXPANEL_PROJECT_TOKEN = ORIGINAL_TOKEN;
    delete process.env.MIXPANEL_API_HOST;
  });

  it("missing token: validates and returns 204 without forwarding (no throw)", async () => {
    delete process.env.MIXPANEL_PROJECT_TOKEN;
    const res = await POST(postRequest({ name: "landing_view", properties: { port: "nassau" } }));
    expect(res.status).toBe(204);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("non-canonical event: returns 204 and does not forward", async () => {
    process.env.MIXPANEL_PROJECT_TOKEN = "test-token";
    const res = await POST(postRequest({ name: "not_a_real_event", properties: { port: "nassau" } }));
    expect(res.status).toBe(204);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("forwards allowed props + a valid anonymous_id as distinct_id", async () => {
    process.env.MIXPANEL_PROJECT_TOKEN = "test-token";
    const anon = "123e4567-e89b-12d3-a456-426614174000";
    const res = await POST(
      postRequest({
        name: "excursion_click",
        properties: { port: "nassau", surface: "starter_card", excursion_id: "x1", offer_priority: "1" },
        anonymous_id: anon,
      }),
    );
    expect(res.status).toBe(204);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain("https://api.mixpanel.com/track");
    expect(String(fetchMock.mock.calls[0][0])).toContain("ip=0");
    const events = sentEvents(fetchMock);
    expect(events[0].event).toBe("excursion_click");
    expect(events[0].properties.token).toBe("test-token");
    expect(events[0].properties.distinct_id).toBe(anon);
    expect(events[0].properties.surface).toBe("starter_card");
    expect(events[0].properties.excursion_id).toBe("x1");
  });

  it("strips PII-shaped / unknown keys before forwarding", async () => {
    process.env.MIXPANEL_PROJECT_TOKEN = "test-token";
    await POST(
      postRequest({
        name: "email_submitted",
        properties: { port: "nassau", email: "a@b.com", ship_name: "Carnival Celebration", mode: "times" },
      }),
    );
    const events = sentEvents(fetchMock);
    expect("email" in events[0].properties).toBe(false);
    expect("ship_name" in events[0].properties).toBe(false);
    expect(events[0].properties.mode).toBe("times");
  });

  it("rejects a PII-shaped anonymous_id (no distinct_id forwarded)", async () => {
    process.env.MIXPANEL_PROJECT_TOKEN = "test-token";
    await POST(
      postRequest({
        name: "landing_view",
        properties: { port: "nassau" },
        anonymous_id: "user@example.com",
      }),
    );
    const events = sentEvents(fetchMock);
    expect("distinct_id" in events[0].properties).toBe(false);
  });

  it("forwarding failure does not break the route (still 204)", async () => {
    process.env.MIXPANEL_PROJECT_TOKEN = "test-token";
    fetchMock.mockRejectedValueOnce(new Error("network down"));
    const res = await POST(postRequest({ name: "results_view", properties: { port: "nassau" } }));
    expect(res.status).toBe(204);
  });

  it("honors the MIXPANEL_API_HOST override", async () => {
    process.env.MIXPANEL_PROJECT_TOKEN = "test-token";
    process.env.MIXPANEL_API_HOST = "https://api-eu.mixpanel.com";
    await POST(postRequest({ name: "landing_view", properties: { port: "nassau" } }));
    expect(String(fetchMock.mock.calls[0][0])).toContain("https://api-eu.mixpanel.com/track");
  });

  it("dev log carries only the event name — never the token or property values", async () => {
    process.env.MIXPANEL_PROJECT_TOKEN = "test-token";
    await POST(
      postRequest({
        name: "app_store_click",
        properties: { port: "nassau", store: "apple", surface: "home_app_badges" },
      }),
    );
    const logged = logSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");
    expect(logged).toContain("app_store_click");
    expect(logged).not.toContain("test-token");
    expect(logged).not.toContain("home_app_badges");
  });
});
