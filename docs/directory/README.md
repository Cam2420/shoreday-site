# ShoreDay Nassau directory

## Preview scope

This feature is prepared on `codex/nassau-directory` for review before production publication. It adds a directory hub, seven interest categories and 36 place pages (44 new routes), plus Explore Nassau navigation and a homepage discovery section immediately above the existing guides.

All 50 in-scope entries from the reference inventory are accounted for. Five duplicate mentions merge into shared records. Three unresolved entries are withheld; six broader topics remain inside their categories. See [coverage and sources](coverage-and-sources.md).

Two active place photographs have verified Commons license records and visible attribution. Thirty-four place pages and all six published area/activity/event cards use the exact screenshots supplied and expressly selected by the user, recorded separately from licensed photographs. All 36 published place cards now have images. Ten replaced Commons assets and their license records are retained as unused alternatives. See [image licenses and supplied-image provenance](image-licenses.md). No paid API is used, no Maps reviews were copied, and no new project dependency was added.

## Editing through Codex

- `data/nassau-directory.json`: visitor copy, source URLs, fact scopes, verification dates, status and Maps destination queries.
- `data/nassau-directory-coverage.json`: the complete 50-row reference-to-catalog mapping.
- `data/nassau-directory-images.json`: asset location, photographer, source page, license, capture/retrieval dates and modifications.
- `public/images/directory/`: licensed WebP photographs and the original user-supplied screenshots.
- `components/directory/` and `app/directory.css`: shared page presentation.

To update a listing, ask Codex to check the operator’s current information, update only supported facts and revise its source/check date. Do not turn a past event into a future date by changing its year. A Maps identity match is not proof that a venue is currently open. Keep uncertain prices and hours out of the copy.

To add a photograph, verify the precise place and original license, add the attribution record and retain the required credits. Keep placeholders when permission or identity is uncertain. Do not use a generic beach image as a named beach.

## SEO behavior

Directory text and links are generated on the server. Each route has its own title, description and production canonical. JSON-LD uses BreadcrumbList plus CollectionPage/ItemList or WebPage/Place. There are no copied ratings, invented offers or unconfirmed Event dates. Place photographs have descriptive alt text and local social-image metadata. All 44 routes are included in the sitemap.

The existing `/nassau` and `/nassau-cheat-sheet` noindex rules and sitemap exclusions remain intact. The $9.99 concierge offer and exact WhatsApp greeting remain unchanged.

## Concierge and card presentation — October 25, 2026

Place-page visit cards use “Plan my visit” with the shared, tracked ShoreDay concierge link and unchanged funnel greeting. The cards begin with the location details, without the former kicker and heading. Google Maps is no longer the visible primary action. Supplied-photo source captions and all “Photo details” disclosures have been removed from the directory UI; the two active Commons photographs retain concise author, license and crop attribution. The sailing screenshot retains its visible photographer watermark. Source records and image provenance remain in the data files and image ledger.

Visible source-check dates have been removed from the hub, category cards and place pages. Event dates and their supporting links remain. Hero images retain high fetch priority; Ardastra remains eager and other card images load lazily. Ardastra’s original PNG is retained, and a smaller 900 px WebP display copy is served directly to avoid the problematic responsive image URL. Its active display file is 56% smaller than the previous 1200 px copy.

Validation: production build and targeted ESLint passed, along with all ten directory/WhatsApp safeguards. Ardastra was visibly confirmed in the same 739 px browser tab that reproduced the blank card, then on its place page and category card at 390 px. The concierge button resolves to the existing WhatsApp URL with the unchanged greeting and `directory_place_plan` analytics surface. No horizontal overflow was observed. Screenshots are saved in `outputs/nassau-directory/ardastra-card-fixed.png` and `outputs/nassau-directory/concierge-cta-mobile.png`.

## Validation on October 24, 2026

- Normal production build: passed (`npm run build`, Next.js Turbopack).
- TypeScript: passed (`npm run typecheck`).
- ESLint: passed for this project. The command excluded `.claude/**` and `under-control-ac-demo/**`, which contain unrelated local worktrees and a separate untracked project. An unrestricted run scans those generated/unrelated files.
- Vitest: 151 tests passed in 11 test files, excluding those same unrelated directories. Six new directory safeguards cover inventory, source records, withholding, links/sitemap, image licenses and preserved funnel behavior.
- HTTP validation: 44 directory routes return valid pages, 51 internal link targets return 200, and withheld/unknown place routes return 404. Unique titles, one H1, production canonicals, JSON-LD parsing, exact WhatsApp prefill, sitemap entries and the two noindex funnels passed.
- External source links: 31 returned HTTP 200; 15 rejected automated requests with HTTP 403 and remain supported by the web research. One timed-out operator link was removed in favor of its verified tourism-board source.
- Browser review: responsive directory/category/place layouts at 390 px; category navigation, photo-credit expansion and homepage placement checked. Additional desktop and small-screen checks are recorded with the preview artifacts.
- Supplied dining/bar photo update: ten screenshots matched to their requested places; original-file hashes checked after import. Production build, type check and all six directory safeguards passed. All eleven food-and-drink card images loaded at 1280 px; 390 px card/detail layouts and both portrait-image crops were checked. Screenshot evidence is saved with the preview artifacts.

Mobile Lighthouse 12.8.2, local production build, simulated mobile throttling, one run per page:

| Page | Performance | Accessibility | Best practices | SEO |
|---|---:|---:|---:|---:|
| Directory hub | 90 | 100 | 100 | 100 |
| Beaches category | 97 | 100 | 100 | 100 |
| John Watling’s place page | 94 | 100 | 100 | 100 |
| Homepage | 93 | 100 | 100 | 100 |

These are lab scores, not field Core Web Vitals or a ranking guarantee. Raw Lighthouse HTML/JSON reports and local validation output are in the ignored `outputs/nassau-directory/` folder. The existing homepage chat preview has a non-scoring accessible-name diagnostic; it is outside this directory change.

The [fresh October 25 mobile audit](mobile-audit-2026-10-25.md) supersedes these initial scores for the current preview. Seven representative pages scored 86–95 for performance and 100 for automated accessibility, best practices and SEO. It records the image-delivery improvements and the remaining speed opportunities on the hub and Ardastra page.

The initial webpack fallback hit a stale-cache error and then a Google Font loader error; the normal Next.js build succeeded. No font or dependency workaround is included in this change.

## History, art and culture photo update — October 25, 2026

Eleven supplied screenshots were mapped to the requested cards and checked against the original files with SHA-256 hashes. Seven existing images were replaced, three place placeholders were filled, and Junkanoo gained an event-card image in both History & culture and Events. Existing place facts and access/closure notices were preserved.

The production build, type check, targeted ESLint and all six directory safeguards passed. At 1280 px, all twelve History & culture images loaded with no horizontal overflow. The Junkanoo event card and Queen’s Staircase detail page were checked at 390 px; both images displayed correctly with no horizontal overflow. Desktop and mobile screenshots are saved in `outputs/nassau-directory/`.

## Outdoor, gallery and event update — October 25, 2026

Eleven supplied screenshots were matched to the user’s final assignments, including the corrected sequence for the food festival, sailing and Carnival. All originals were checked with SHA-256 hashes. The diving activity is now named “Stuart Cove Shark Diving”, preserving its existing anchor. The sailing photograph retains its visible JanPehrson.com watermark and credit.

All four published event cards now show a month/season, dates where supported, a link to the date source, and an explanation of annual variation. Junkanoo shows its traditional December 26 and January 1 dates; the other cards distinguish past editions from future schedules. The government calendar and dated reports support the regatta example. No unannounced future dates or Event structured-data dates were added. The unresolved Rum Bahamas Festival remains unpublished.

Production build, type check, targeted ESLint and all six directory safeguards passed. All images loaded in the Outdoor & adventure, Art & galleries and Events categories at 1280 px. Event cards also passed the 390 px overflow check; the sailing watermark remains visible. Desktop and mobile screenshots are saved in `outputs/nassau-directory/`.

## Approval and release

1. Review the branch preview in a browser: homepage discovery, directory, a category and a place page. Check the tone, placeholders and closure/access notices.
2. Approve publication explicitly. Until then, do not merge the branch or promote its preview.
3. After the approved production release passes its checks, use the existing ShoreDay property in Google Search Console. The sitemap is already submitted successfully; verify the updated `https://shoredayapp.com/sitemap.xml` entry and inspect the hub and representative category/place URLs. One resubmission is optional after the expansion. Follow the detailed checklist in the fresh mobile-audit report.
4. Use Search Console’s indexing and performance reports to review discovered pages, impressions, queries and clicks. Investigate crawl/indexing errors before expanding content. Publication and sitemap submission do not guarantee indexing or rankings.

No production publication or Search Console submission has been performed as part of this preview preparation.

The Vercel preview is protected by the project’s existing sign-in requirement. An anyone-with-the-link share URL was not created. Production remains on its existing deployment.
