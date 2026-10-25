# ShoreDay Nassau directory

## Preview scope

This feature is prepared on `codex/nassau-directory` for review before production publication. It adds a directory hub, seven interest categories and 36 place pages (44 new routes), plus Explore Nassau navigation and a homepage discovery section immediately above the existing guides.

All 50 in-scope entries from the reference inventory are accounted for. Five duplicate mentions merge into shared records. Three unresolved entries are withheld; six broader topics remain inside their categories. See [coverage and sources](coverage-and-sources.md).

Twelve place photographs have verified Commons license records and visible attribution. The other 24 place pages use a clearly labelled placeholder. See [image licenses](image-licenses.md). No Google Maps photos or reviews were copied, no paid API is used, and no new project dependency was added.

## Editing through Codex

- `data/nassau-directory.json`: visitor copy, source URLs, fact scopes, verification dates, status and Maps destination queries.
- `data/nassau-directory-coverage.json`: the complete 50-row reference-to-catalog mapping.
- `data/nassau-directory-images.json`: asset location, photographer, source page, license, capture/retrieval dates and modifications.
- `public/images/directory/`: optimized, licensed WebP photographs.
- `components/directory/` and `app/directory.css`: shared page presentation.

To update a listing, ask Codex to check the operator’s current information, update only supported facts and revise its source/check date. Do not turn a past event into a future date by changing its year. A Maps identity match is not proof that a venue is currently open. Keep uncertain prices and hours out of the copy.

To add a photograph, verify the precise place and original license, add the attribution record and retain the required credits. Keep placeholders when permission or identity is uncertain. Do not use a generic beach image as a named beach.

## SEO behavior

Directory text and links are generated on the server. Each route has its own title, description and production canonical. JSON-LD uses BreadcrumbList plus CollectionPage/ItemList or WebPage/Place. There are no copied ratings, invented offers or unconfirmed Event dates. Place photographs have descriptive alt text and local social-image metadata. All 44 routes are included in the sitemap.

The existing `/nassau` and `/nassau-cheat-sheet` noindex rules and sitemap exclusions remain intact. The $9.99 concierge offer and exact WhatsApp greeting remain unchanged.

## Validation on October 24, 2026

- Normal production build: passed (`npm run build`, Next.js Turbopack).
- TypeScript: passed (`npm run typecheck`).
- ESLint: passed for this project. The command excluded `.claude/**` and `under-control-ac-demo/**`, which contain unrelated local worktrees and a separate untracked project. An unrestricted run scans those generated/unrelated files.
- Vitest: 151 tests passed in 11 test files, excluding those same unrelated directories. Six new directory safeguards cover inventory, source records, withholding, links/sitemap, image licenses and preserved funnel behavior.
- HTTP validation: 44 directory routes return valid pages, 51 internal link targets return 200, and withheld/unknown place routes return 404. Unique titles, one H1, production canonicals, JSON-LD parsing, exact WhatsApp prefill, sitemap entries and the two noindex funnels passed.
- Browser review: responsive directory/category/place layouts at 390 px; category navigation, photo-credit expansion and homepage placement checked. Additional desktop and small-screen checks are recorded with the preview artifacts.

Mobile Lighthouse 12.8.2, local production build, simulated mobile throttling, one run per page:

| Page | Performance | Accessibility | Best practices | SEO |
|---|---:|---:|---:|---:|
| Directory hub | 90 | 100 | 100 | 100 |
| Beaches category | 97 | 100 | 100 | 100 |
| John Watling’s place page | 94 | 100 | 100 | 100 |
| Homepage | 93 | 100 | 100 | 100 |

These are lab scores, not field Core Web Vitals or a ranking guarantee. Raw Lighthouse HTML/JSON reports and local validation output are in the ignored `outputs/nassau-directory/` folder. The existing homepage chat preview has a non-scoring accessible-name diagnostic; it is outside this directory change.

The initial webpack fallback hit a stale-cache error and then a Google Font loader error; the normal Next.js build succeeded. No font or dependency workaround is included in this change.

## Approval and release

1. Review the branch preview in a browser: homepage discovery, directory, a category and a place page. Check the tone, placeholders and closure/access notices.
2. Approve publication explicitly. Until then, do not merge the branch or promote its preview.
3. After the approved production release passes its checks, use the existing ShoreDay property in Google Search Console. Sign in if requested; submit `https://shoredayapp.com/sitemap.xml` and inspect the hub and representative category/place URLs.
4. Use Search Console’s indexing and performance reports to review discovered pages, impressions, queries and clicks. Investigate crawl/indexing errors before expanding content. Publication and sitemap submission do not guarantee indexing or rankings.

No production publication or Search Console submission has been performed as part of this preview preparation.
