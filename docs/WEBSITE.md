# Website

## Sitemap

- `/` — homepage. The only page in this journey.
- `/projects` — project index.
- `/project/[slug]` — project detail.
- `/about` — about.
- `/contact` — contact form. Destination of the homepage action. Not in scope until Phase 8.
- `/impressum` — legal notice.
- `/try/[slug]` — project tryout.

## Page Briefs

### / (home)

- Purpose & primary conversion action: start a conversation. One hero action: Contact. Projects stay in the grid. About leaves the hero.
- Message on the page: the Sanity subtitle and description. The proposed lines "Start with one message." and "If you can't tell whether I'm the right engineer, that's the whole first step." were rejected after seeing them on the page, 2026-10-26.
- CTA (direct + transitional): direct is Contact, not on the hero yet. Transitional is the project grid, already on the page. No second hero button.
- Copy blocks, live: kicker "Software Engineer"; greeting; one body sentence; hero links "Explore projects" and "About me"; "Latest projects" with EvoLift, BearWithMe, and VisOnboarding.

## Conversion Elements

Objections are hypothesized. No visitor said these words. Counters are not on the page.

| Objection (Big 5)                                       | Counter                                                                                         | Placement              | Status                                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| Trust. "I don't know if I should write to this person." | One true line of proof beside the ask: a role, a result, or a context Mathias can stand behind. | Hero, next to Contact  | Hypothesized. Not on the page. Owner: Mathias. Priority: P2.                               |
| Fit. "Which kind of engineer is this?"                  | "If you can't tell whether I'm the right engineer, start with one message."                     | Hero headline and body | Rejected after seeing it on the page, 2026-10-26. Owner: Mathias. Priority: P1.            |
| Timing. "Is he even available?"                         | One true line on availability or reply time.                                                    | Beside the ask         | Hypothesized. Not on the page. Owner: Mathias. Priority: P2.                               |
| Effort. "What do I say, and where?"                     | One Contact action on the homepage, plus a hint for what the message is about.                  | Hero                   | Contact button built, 2026-10-26. The new hint was rejected. Owner: Mathias. Priority: P1. |
| Price. "Is a message worth my time?"                    | Say what they get from writing.                                                                 | Hero body              | Rejected with the new hero lines, 2026-10-26. Owner: Mathias. Priority: P1.                |

## Audit Findings

Diagnostic score on 2026-10-26: 0/10. Identity is clear within five seconds. The reason to write is not. Proof on the page is a portrait and three project cards. Project copy describes features.

| Issue                                                                                             | Severity (0-4) | Fix                                                                                                                        | Status                                                                                                                             |
| ------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| The hero never asks for contact, and it offers Explore projects and About me as equal next steps. | 4              | One Contact action in the hero. Remove the other two hero links. Keep the project grid.                                    | Built on the homepage, 2026-10-26. Owner: Mathias. Priority: P1.                                                                   |
| The greeting does not say who should write, or what the conversation is for.                      | 3              | Headline: "Start with one message." Body: "If you can't tell whether I'm the right engineer, that's the whole first step." | Rejected after seeing it on the page, 2026-10-26. Homepage uses the Sanity subtitle and description. Owner: Mathias. Priority: P1. |
| Nothing beside the ask proves that writing is worth it.                                           | 3              | Add one true proof line. Do not invent a client, a number, or a testimonial.                                               | Blocked on a real fact. Owner: Mathias. Priority: P2.                                                                              |
| Project cards describe features, not a reason to write.                                           | 2              | Leave them until the ask exists. Rewriting them first adds another detour.                                                 | Backlog. Owner: Mathias. Priority: P3.                                                                                             |
| The portrait is the largest paint and is marked lazy. Largest paint was still 816ms.              | 2              | Give that image priority so it is preloaded and not lazy.                                                                  | Built with the homepage pass, 2026-10-26. Owner: Mathias. Priority: P3.                                                            |
| Hashed `/_next/static/` files use `max-age=0, must-revalidate`.                                   | 1              | `Cache-Control: public, max-age=31536000, immutable` for `/_next/static/*`.                                                | Recorded. Not ahead of Contact. Owner: Mathias. Priority: P3.                                                                      |

## Lead Capture

Not used. This site has no quiz or lead magnet. The capture is the contact form.
