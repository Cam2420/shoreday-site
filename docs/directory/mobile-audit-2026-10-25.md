# Mobile speed audit — October 25, 2026

The current local production build was tested before publication. The starting commit was 19fea66; the directory and outdoor category were rechecked after the image-delivery changes described below. Ardastra was added to verify the changed asset. The other four measurements are from the fresh initial pass because their primary content did not change.

Lighthouse 12.8.2, mobile simulation, 412 × 823 viewport, 4× CPU slowdown, 150 ms network round-trip latency and approximately 1.6 Mbps throughput. Each reported score is one run; lab scores vary and do not represent field Core Web Vitals.

| Page | Performance | Accessibility | Best practices | SEO | Largest contentful paint |
|---|---:|---:|---:|---:|---:|
| Homepage | 94 | 100 | 100 | 100 | 3.1 s |
| Directory hub | 86 | 100 | 100 | 100 | 4.3 s |
| Beaches | 94 | 100 | 100 | 100 | 3.1 s |
| John Watling’s place page | 91 | 100 | 100 | 100 | 3.5 s |
| Outdoor & adventure | 94 | 100 | 100 | 100 | 3.1 s |
| Events & festivals | 95 | 100 | 100 | 100 | 3.0 s |
| Ardastra place page | 87 | 100 | 100 | 100 | 4.1 s |

All seven pages completed without Lighthouse runtime errors, with 0 ms total blocking time and approximately 0.004 cumulative layout shift. The 100 scores reflect the automated checks, not a complete accessibility or search-ranking certification.

## Changes made from the audit

- Ardastra’s direct-display WebP was reduced from 382,834 bytes at 1200 × 933 to 170,164 bytes at 900 × 700, a 56% reduction. The original PNG remains unchanged, and the direct URL preserves the blank-image fix.
- Featured images other than Ardastra returned to lazy loading, so below-screen cards do not all compete with the main image. Ardastra retains eager loading; primary page images retain high fetch priority.
- The directory hub’s measured transfer size fell from 1,102,656 to 830,014 bytes (25%); its score was 87 initially and 86 on recheck, so no hub score improvement is claimed. Outdoor fell from 1,090,118 to 831,278 bytes and scored 94 after an initial 90.
- Ardastra’s smaller image and the Plan my visit CTA were visibly checked at 390 px, with no horizontal overflow.

## Remaining speed opportunities

The directory hub (86) and Ardastra place page (87) are the slowest tested pages. Their simulated largest-contentful-paint times are around 4 seconds. Image sizing/compression and initial CSS/font delivery remain the main opportunities. There are no blocking JavaScript or major layout-shift failures in these runs. The report does not treat an 80s performance score as a failed functional test.

Raw Lighthouse JSON/HTML files, logs, summary.json and mobile screenshot evidence are retained in the ignored outputs/nassau-directory/mobile-audit-2026-10-25/ directory. The earlier audit reports are retained separately. Production build, targeted ESLint, ten directory/WhatsApp tests and git diff --check passed for the image changes.

## Search Console and publication

The user’s Search Console screenshot shows the existing https://shoredayapp.com/sitemap.xml submission as Success, with 13 discovered URLs. A live read on October 25 confirmed 13 sitemap URLs and no new directory/place routes. Discovered URLs do not establish that all 13 are indexed. No new Search Console input is needed before release.

After the user explicitly approves publication:

1. Verify the production homepage, directory hub, a category, Ardastra and a gallery page, including images, WhatsApp destinations, canonical URLs and status codes.
2. Confirm the production sitemap contains the new directory, seven categories and 36 place pages (44 additional routes) and that those public routes are indexable.
3. In Chrome, open the existing shoredayapp.com property in Google Search Console, then Sitemaps. Keep the existing sitemap entry. Google periodically recrawls successful sitemap submissions; one resubmission is optional after this substantial expansion. The URL remains https://shoredayapp.com/sitemap.xml.
4. In the top URL Inspection field, inspect https://shoredayapp.com/things-to-do-in-nassau and a representative category/place URL. Use Test Live URL, then Request Indexing when appropriate. Do not enter localhost or the protected preview. Individual inspection is for a few priority pages; the sitemap covers the full set.
5. Check Page indexing and the sitemap’s last-read/discovered counts as Google processes the release. Search Console can lag behind publication; avoid repeated indexing requests for the same URL.

Post-publication checks remain pending because the directory is still an unpublished preview. No production release or Search Console submission was performed in this audit.

Sources: [Google Sitemaps report](https://support.google.com/webmasters/answer/7451001) and [Ask Google to recrawl URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
