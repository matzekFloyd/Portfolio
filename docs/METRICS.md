# Metrics

## Funnel

Homepage goal: start a conversation (contact). Scored 2026-10-26 against the live page at https://www.mathiasmayrhofer.at/. Diagnostic score: **0/10**. All seven checks failed. No stage has a visitor count.

| Stage                                           | On the path today                                                         | Volume                                                  | Diagnosis                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| Land on `/`                                     | Yes                                                                       | Unknown. Sitewide traffic is under 100 sessions a week. | Entry                                              |
| Understand who should write, and what they get  | No                                                                        | —                                                       | Missing link                                       |
| Contact ask on the homepage                     | No. Contact is a nav link. The hero offers Explore projects and About me. | —                                                       | Missing link. This is the first fix.               |
| Open `/contact`                                 | Yes. Copy: "Have a question or want to work together?"                    | Unknown                                                 | Not the first fix                                  |
| Submit the form (name, email, subject, message) | Yes                                                                       | Unknown                                                 | Destination. Out of scope until the homepage asks. |
| Conversation                                    | Off the site, by email                                                    | Unknown                                                 | Outcome                                            |

No blocked artery. A blocked artery is a busy step that underperforms, and every volume cell is empty.

## Stage & One Metric That Matters

| Stage                   | One metric                         | Baseline | Target                                        | How we'll read it                                                                                                               |
| ----------------------- | ---------------------------------- | -------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Homepage → conversation | Contact form submissions per month | Unknown  | More than the prior month after the ask ships | Count for four weeks before and four weeks after. No A/B test. Under 100 sessions a week, a result cannot reach 95% confidence. |

Guardrail: the latest-projects grid stays on the homepage. The work remains visible.

## Baselines & Targets

Measured 2026-10-26. Speed score: **6/10**. One field row is open, and one transport row fails. The page renders. These numbers are one lab pass, not field data from visitors.

| CWV metric | Baseline                                                                                                                           | Target      | Miss response                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- |
| TTFB       | 207–350ms on three requests from this machine. One fresh browser navigation was 516ms. An earlier 3s browser sample was discarded. | Under 800ms | Recheck the Netlify edge. Do not change the homepage for this.   |
| LCP        | 816ms. The element is the portrait, a 29KB JPEG from the Sanity CDN.                                                               | Under 2.5s  | If it crosses 2.5s, stop marking that image lazy and preload it. |
| INP        | Not measured. No click was timed.                                                                                                  | Under 200ms | Time a click before calling this a miss.                         |
| CLS        | 0 on this load. The portrait has width and height. Project thumbs reserve space with 66.666% padding.                              | Under 0.1   | If it rises, look for an image without reserved space.           |

Font file that actually loaded: one WOFF2, 48,432 bytes. Under the 200KB budget. The CSS lists more subset files. This page transferred one.

Also true, and not a Core Web Vital: the browser connection was HTTP/2. HTML is Brotli-compressed. Scripts are deferred. Two small CSS files block rendering. Hashed files under `/_next/static/` are sent with `Cache-Control: public, max-age=0, must-revalidate`, not `immutable`. No HTTP/1.1 domain-sharding workaround is in the page.
