import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import coverage from "@/data/nassau-directory-coverage.json";
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_ENTRIES,
  DIRECTORY_GUIDES,
  DIRECTORY_PATH,
  PLACE_ENTRIES,
  PUBLISHED_ENTRIES,
  entryPath,
  mapsUrl,
} from "@/data/nassau-directory";
import { DIRECTORY_IMAGES } from "@/data/nassau-directory-images";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/data/shoreday";
import { WHATSAPP_CHAT_URL } from "./whatsapp";

describe("Nassau directory publishing safeguards", () => {
  it("accounts for all 50 reference entries and five duplicate merges", () => {
    expect(coverage).toHaveLength(50);
    expect(new Set(coverage.map((row) => row.entrySlug)).size).toBe(45);
    expect(DIRECTORY_ENTRIES).toHaveLength(45);
    expect(new Set(DIRECTORY_ENTRIES.map((entry) => entry.slug)).size).toBe(45);
    expect(
      Object.fromEntries(
        [...new Set(coverage.map((row) => row.section))].map((section) => [
          section,
          coverage.filter((row) => row.section === section).length,
        ]),
      ),
    ).toEqual({
      "Popular experiences": 8,
      Dining: 7,
      Nightlife: 2,
      "History and culture": 8,
      "Outdoor and adventure": 5,
      Beaches: 9,
      "Art galleries": 6,
      Events: 5,
    });
    for (const row of coverage)
      expect(
        DIRECTORY_ENTRIES.some((entry) => entry.slug === row.entrySlug),
      ).toBe(true);
    expect(JSON.stringify(DIRECTORY_ENTRIES)).not.toMatch(
      /Eleuthera|Pineapple Festival/i,
    );
  });

  it("withholds unresolved records and generates only useful place pages", () => {
    expect(
      DIRECTORY_ENTRIES.filter((entry) => entry.status === "research")
        .map((entry) => entry.slug)
        .sort(),
    ).toEqual(["big-picture", "goldies-conch-house", "rum-bahamas-festival"]);
    expect(PLACE_ENTRIES).toHaveLength(36);
    for (const entry of PUBLISHED_ENTRIES) {
      expect(entry.sources.length).toBeGreaterThan(0);
      expect(entry.description.length).toBeGreaterThan(80);
      expect(
        entry.categories.every((slug) =>
          DIRECTORY_CATEGORIES.some((category) => category.slug === slug),
        ),
      ).toBe(true);
      for (const source of entry.sources) {
        expect(new URL(source.url).protocol).toBe("https:");
        expect(source.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(source.supports.length).toBeGreaterThan(12);
      }
      if (entry.status !== "listed") expect(entry.notice).toBeTruthy();
    }
  });

  it("keeps all directory routes reachable while excluding research and noindex funnels", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(SITE_URL + DIRECTORY_PATH);
    for (const category of DIRECTORY_CATEGORIES)
      expect(urls).toContain(`${SITE_URL}${DIRECTORY_PATH}/${category.slug}`);
    for (const entry of PLACE_ENTRIES)
      expect(urls).toContain(SITE_URL + entryPath(entry));
    for (const entry of DIRECTORY_ENTRIES.filter(
      (entry) => entry.status === "research",
    ))
      expect(urls).not.toContain(SITE_URL + entryPath(entry));
    for (const path of ["/nassau", "/nassau-cheat-sheet"])
      expect(urls).not.toContain(SITE_URL + path);
    for (const guide of DIRECTORY_GUIDES)
      expect(GUIDES.some((item) => item.slug === guide.slug)).toBe(true);
  });

  it("provides valid Maps destinations without API keys", () => {
    for (const entry of PLACE_ENTRIES) {
      const url = new URL(mapsUrl(entry, true));
      expect(url.origin).toBe("https://www.google.com");
      expect(url.pathname).toBe("/maps/dir/");
      expect(url.searchParams.get("api")).toBe("1");
      expect(url.searchParams.get("destination")).toBeTruthy();
      expect(url.searchParams.has("key")).toBe(false);
    }
  });

  it("requires a licensed local asset and attribution for every selected photograph", () => {
    for (const entry of PLACE_ENTRIES)
      if (entry.image) expect(DIRECTORY_IMAGES[entry.image]).toBeDefined();
    for (const image of Object.values(DIRECTORY_IMAGES)) {
      expect(existsSync(join(process.cwd(), "public", image.src))).toBe(true);
      expect(image.author).toBeTruthy();
      expect(image.title).toBeTruthy();
      expect(image.license).toMatch(/^CC BY(?:-SA)? [234]\.0$/);
      expect(image.licenseUrl).toMatch(
        /^https:\/\/creativecommons.org\/licenses\//,
      );
      expect(image.sourceUrl).toMatch(
        /^https:\/\/commons.wikimedia.org\/wiki\/File:/,
      );
      expect(image.retrieved).toBe("2026-10-24");
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(image.changes).toBeTruthy();
    }
  });

  it("preserves the concierge greeting and funnel noindex tags", () => {
    expect(new URL(WHATSAPP_CHAT_URL).searchParams.get("text")).toBe(
      "Hi ShoreDay! My cruise stops in Nassau",
    );
    expect(
      readFileSync(
        join(process.cwd(), "components/marketing/StructuredData.tsx"),
        "utf8",
      ),
    ).toContain('price: "9.99"');
    for (const path of [
      "app/nassau/page.tsx",
      "app/nassau-cheat-sheet/page.tsx",
    ]) {
      expect(readFileSync(join(process.cwd(), path), "utf8")).toMatch(
        /index:\s*false/,
      );
    }
  });
});
