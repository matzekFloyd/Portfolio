# Improve Website Plan

## Context

Started 2026-10-26. Personal portfolio at https://mathiasmayrhofer.at (Next.js in `web/`, content in Sanity).

Intake:

- Scope: homepage only (`/`).
- ONE action: start a conversation (contact). The live homepage currently offers two equal links, Explore projects and About me. Contact is in the nav, not the hero.
- Conversion problem: it feels off. No analytics, bounce rate, or form data.
- Visitor input: none, and none expected soon. Phase 1 objections cannot be quoted from visitors.
- Traffic: under 100 sessions a week. A/B tests will not reach significance. Evidence stays qualitative and heuristic.
- Loudest complaint: people simply do not get in touch. That does not front-load a look, type, or speed phase.
- Positioning: no `POSITIONING.md` and no other brand notes. Messaging starts from the live copy.
- Assets: read the live site. No analytics screenshots or Lighthouse run supplied.

Skip check at intake (none applied yet):

- Phase 4 stays pending. Global body is 17px / 1.75. Homepage description copy is `1.02rem` (~16.3px), measure `58ch`, line-height `1.8`. Size and measure meet the bar; line-height is above the 1.5–1.7 band.
- Phases 5 and 7 stay pending. The message has not been validated.
- Phase 6 stays pending. Core Web Vitals have not been measured.
- Phase 1 cannot be skipped.

Open scope note for later: the action completes on `/contact`. Phase 8 may need that form even though the page being improved is the homepage. Confirm at Phase 8 entry, not before.

## Phase Status

| Phase | Skill                  | Status | Artifact                               | Date       |
| ----- | ---------------------- | ------ | -------------------------------------- | ---------- |
| 1     | cro-methodology        | done   | METRICS.md, WEBSITE.md, EXPERIMENTS.md | 2026-10-26 |
| 2     | ux-heuristics          | done   | DESIGN.md, EXPERIMENTS.md              | 2026-10-26 |
| 3     | refactoring-ui         | done   | DESIGN.md, EXPERIMENTS.md              | 2026-10-26 |
| 4     | web-typography         | done   | DESIGN.md, EXPERIMENTS.md              | 2026-10-26 |
| 5     | storybrand-messaging   | done   | POSITIONING.md, EXPERIMENTS.md         | 2026-10-26 |
| 6     | high-perf-browser      | done   | METRICS.md, WEBSITE.md, EXPERIMENTS.md | 2026-10-26 |
| 7     | made-to-stick          | done   | POSITIONING.md, EXPERIMENTS.md         | 2026-10-26 |
| 8     | design-everyday-things | done   | DESIGN.md, EXPERIMENTS.md              | 2026-10-26 |

Statuses: pending · in-progress · awaiting-evidence · done · deferred: <reason> · skipped: <reason>

## Key Decisions

| Date       | Phase  | Decision                                                                         | Rationale                                                                                                                  |
| ---------- | ------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-26 | Intake | Homepage only; ONE action is contact                                             | A page with two equal CTAs has no goal. Explore projects and About me compete with the action.                             |
| 2026-10-26 | Intake | No numbers, no visitor quotes, under 100 sessions/week                           | Phase 1 uses the live page plus heuristic evidence. No A/B test can reach significance.                                    |
| 2026-10-26 | Intake | Do not front-load phases 3–6                                                     | The complaint is that people do not get in touch, not look, clarity, speed, or readability.                                |
| 2026-10-26 | Intake | Start messaging from live copy                                                   | No positioning doc exists.                                                                                                 |
| 2026-10-26 | Intake | Keep phases 4, 5, 6, and 7 pending                                               | Type line-height misses the band; message is unvalidated; Core Web Vitals are unmeasured.                                  |
| 2026-10-26 | 1      | Enter Phase 1 now                                                                | Plan confirmed. Phase 1 is the gate; no visual or copy change ships before it.                                             |
| 2026-10-26 | 1      | Contact is the only hero action                                                  | Projects stay in the grid. About leaves the hero. Explore projects and About me are competing calls to action.             |
| 2026-10-26 | 1      | Attack the missing contact ask first                                             | No stage volumes, so no blocked artery can be named. The homepage never asks for contact.                                  |
| 2026-10-26 | 1      | Accept heuristic objections, labeled unresearched                                | No visitor quotes and under 100 sessions a week. No A/B test.                                                              |
| 2026-10-26 | 1      | Approve and write the Phase 1 docs                                               | Funnel, objection table, audit, and ICE backlog match the live homepage diagnosis.                                         |
| 2026-10-26 | 2      | Enter Phase 2 now                                                                | Usability friction is next. Findings stay tied to the Phase 1 contact goal.                                                |
| 2026-10-26 | 2      | Fix the severity-4 Contact control now. Hold the severity-3 wording for Phase 5. | Fixes run by severity. The menu label, focus ring, and hidden portrait are severity 2, so they wait.                       |
| 2026-10-26 | 2      | Approve and write the Phase 2 docs                                               | Homepage usability score is 4/10. Trunk test is logged for `/`.                                                            |
| 2026-10-26 | 3      | Enter Phase 3 now                                                                | Hierarchy work stays tied to the Contact control. Color waits until the layout reads in grayscale.                         |
| 2026-10-26 | 3      | Add spacing and shadow tokens. Keep the current hues.                            | The page has no spacing scale. Off-scale values include 18px, 20px, 21.6px, and 38.4px.                                    |
| 2026-10-26 | 3      | Color waits                                                                      | The Contact control uses the existing blue as a solid fill so it still reads in grayscale.                                 |
| 2026-10-26 | 3      | Write the token spec. Do not apply the CSS.                                      | Homepage code stays unchanged. Score remains 5/10 until a later build.                                                     |
| 2026-10-26 | 4      | Enter Phase 4 now                                                                | Size and measure already pass. Line height 1.75–1.8 is outside 1.5–1.7.                                                    |
| 2026-10-26 | 4      | Keep Inter. Stop using weight 650.                                               | One family. 650 is not in the loaded set of 400, 500, 600, and 700.                                                        |
| 2026-10-26 | 4      | Font budget stays under 200KB                                                    | Phase 6 measures the files. No new weight and no second font file.                                                         |
| 2026-10-26 | 4      | Hero paragraphs move to line-height 1.6                                          | Shared body stays 1.75 so other pages do not change.                                                                       |
| 2026-10-26 | 4      | Write the type spec. Do not apply the CSS.                                       | Homepage code stays unchanged. Type score remains 8/10 until a later build.                                                |
| 2026-10-26 | 5      | Enter Phase 5 now                                                                | The hero greeting was held for this phase. The live line does not say who should write.                                    |
| 2026-10-26 | 5      | The internal problem is fit                                                      | Writing feels like a guess because a visitor can't tell if Mathias is the right engineer. Still a hypothesis, not a quote. |
| 2026-10-26 | 5      | One-liner chosen                                                                 | "I help people who want to work together, and can't tell if it's a fit, start with one message."                           |
| 2026-10-26 | 5      | Write the message spec. Do not change the page.                                  | Hero words are chosen. Live copy is unchanged. Script score is 7/10.                                                       |
| 2026-10-26 | 6      | Enter Phase 6 now                                                                | Core Web Vitals are unmeasured. The page does render. Speed was not the complaint.                                         |
| 2026-10-26 | 6      | Do not pull a speed fix ahead of Contact                                         | LCP was 816ms and the page renders. The complaint was that people do not write.                                            |
| 2026-10-26 | 6      | Record the lazy portrait and the cache header. Build neither now.                | Both are real. Neither is a conversion test, and traffic cannot support one.                                               |
| 2026-10-26 | 6      | Write the speed baselines. Do not change the page.                               | TTFB and LCP are inside the targets. CLS was 0. INP was not measured.                                                      |
| 2026-10-26 | 7      | Enter Phase 7 now                                                                | The one-liner is clear. This phase checks whether it is memorable.                                                         |
| 2026-10-26 | 7      | Commander's Intent is "Start with one message."                                  | If a visitor remembers one thing, it is the action.                                                                        |
| 2026-10-26 | 7      | Lead the hero with that sentence. Do not invent a number.                        | Fit stays as the feeling. There is no true statistic to scale.                                                             |
| 2026-10-26 | 7      | Write the memory scores. Do not change the page.                                 | The lines move from 28/60 to 32/60. Still forgettable until there is proof.                                                |
| 2026-10-26 | 8      | Enter Phase 8, including the contact form                                        | The homepage has no form. The message is sent on /contact.                                                                 |
| 2026-10-26 | 8      | Disable Send until the four fields are valid. Remove noValidate.                 | An empty form should never become an error.                                                                                |
| 2026-10-26 | 8      | No confirmation and no undo window                                               | Sending is the goal. A confirmation would add a step.                                                                      |
| 2026-10-26 | 8      | Write the form spec. Do not change the code.                                     | The contact form scores 6/10 until Send is disabled for invalid fields.                                                    |

## Next Actions

- [x] Confirm this plan (Mathias, 2026-10-26)
- [x] Write METRICS.md, WEBSITE.md, and EXPERIMENTS.md (2026-10-26)
- [x] Choose whether to enter Phase 2 (Mathias, 2026-10-26) — proceed
- [x] Finish Phase 2 — severity-rated usability findings (2026-10-26)
- [x] Choose whether to enter Phase 3 (Mathias, 2026-10-26) — proceed
- [x] Finish Phase 3 — hierarchy, spacing, tokens (2026-10-26)
- [x] Choose whether to enter Phase 4 (Mathias, 2026-10-26) — proceed
- [x] Finish Phase 4 — type size, measure, line height, loading (2026-10-26)
- [x] Choose whether to enter Phase 5 (Mathias, 2026-10-26) — proceed
- [x] Finish Phase 5 — one-liner, brand script, hero copy (2026-10-26)
- [x] Choose whether to enter Phase 6 (Mathias, 2026-10-26) — proceed
- [x] Finish Phase 6 — speed baselines and targets (2026-10-26)
- [x] Choose whether to enter Phase 7 (Mathias, 2026-10-26) — proceed
- [x] Finish Phase 7 — memorable message (2026-10-26)
- [x] Choose whether to enter Phase 8 (Mathias, 2026-10-26) — proceed, include the contact form
- [x] Finish Phase 8 — signifiers, constraints, feedback (2026-10-26)
- [x] Build the homepage Contact button (Mathias, 2026-10-26). The new hero lines were rejected the same day. Local only until deploy.
