# Design System

## Design Direction

Phase 3 and later fill this section.

## Typography

Recorded 2026-10-26. Homepage type score: **8/10**. Body is 17px. The hero paragraph is about 16.3px, measure 58 characters, which is inside 45–75. Headings use line-height 1.2, inside 1.1–1.25. Two checks are open: the font files were not measured, and 200% zoom was not tested.

Typeface: Inter only. No second face. Loaded weights are 400, 500, 600, and 700, Latin subset, `font-display: swap`, with fallbacks Inter, Segoe UI, Roboto, Helvetica Neue, Arial. `next/font` preloads the files it injects. Weight 650 is used on the headline and the MM mark and is not loaded. The headline moves to 500, as Phase 3 decided. The MM mark moves to 600. That shared rule also paints the mark on other pages.

Hero paragraphs move from line-height 1.8 to 1.6. The shared site body stays 1.75. Card excerpts stay at 1.85. Measure stays 58 characters.

| Role                         | Size                         | Weight | Line height | Measure |
| ---------------------------- | ---------------------------- | ------ | ----------- | ------- |
| Kicker and "Latest projects" | 12px                         | 600    | 1.4         | —       |
| Hero paragraph               | 16px                         | 400    | 1.6         | 58ch    |
| Hero headline                | current clamp, about 33–46px | 500    | 1.2         | 18ch    |
| Contact button               | 16px                         | 600    | 1.25        | —       |
| MM mark                      | 1.35rem                      | 600    | —           | —       |

Loading budget: under 200KB for all font files together. Phase 6 measures the real size. Do not add a weight or a second font file.

## Tokens

Recorded 2026-10-26. Current visual score: **5/10**. Four checks fail: the action disappears if you blur the page, the action disappears in grayscale, spacing is off the scale, and shadows are a single faint layer. White space, label treatment, line length, and contrast already pass. The score stays 5 until the homepage uses these tokens. A 10 also waits on Phase 5 shortening the greeting, because that line is still the largest text.

Spacing scale, in px: 4, 8, 16, 24, 32, 48, 64. No new color hues. Text stays `#111827`. Grays stay the current cool tints.

Homepage snaps, from the live SCSS. Shared header and shell padding stay as they are.

| Place                           | Current         | Token   |
| ------------------------------- | --------------- | ------- |
| Hero column gap                 | 38.4px          | 32      |
| Space above the hero / below it | 22.4px / 44.8px | 16 / 48 |
| Text block padding              | 21.6px          | 24      |
| Headline space below            | 14.4px          | 16      |
| Kicker space below              | 12.8px          | 8       |
| "Latest projects" space below   | 18px            | 16      |
| Card title space above / below  | 14.4px / 7.2px  | 16 / 8  |
| Grid gap                        | 24px            | 24      |

Shadows use the same ink, `rgba(17, 24, 39, …)`, in two layers:

- Raised, for cards: `0 1px 2px rgba(17, 24, 39, 0.06), 0 4px 8px rgba(17, 24, 39, 0.04)`
- Floating, for the menu later: `0 4px 6px rgba(17, 24, 39, 0.08), 0 10px 15px rgba(17, 24, 39, 0.08)`

## Components

| Component     | Decision                                                                                                                                                                                                                                       | Status                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Hero action   | One filled control. Label Contact. Link `/contact`. Min-height 48px, padding 0 24px, background `$color-accent`, white label, weight 600, radius 8px. It is the only solid shape in the text column, so it still reads with the color removed. | Built on the homepage, 2026-10-26. Owner: Mathias. Priority: P1.                                        |
| Hero headline | Keep the words. Drop weight from 650 to 500 so the line is no longer large, bold, and dark together. The filled button keeps the weight.                                                                                                       | Built on the homepage, 2026-10-26. Owner: Mathias. Priority: P1.                                        |
| Project cards | Use the raised shadow when the homepage pass is built.                                                                                                                                                                                         | Built, 2026-10-26. The same card component is used on the projects index. Owner: Mathias. Priority: P3. |

## UX Audit Findings

Audited 2026-10-26 with Nielsen's heuristics and Krug's laws. Page: `/` only. Score: **4/10**. Start at 10. The missing action is severity 4 (−2). The greeting makes people stop and think, severity 3 (−2). There is no search, severity 1 (−1). The mobile menu icon has no visible label, severity 2 (−1).

Trunk test on `/`:

| Question                   | Result                                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| What site is this?         | Pass, weakly. The heading names Mathias. The mark says MM.                                                 |
| What page am I on?         | Pass. This is the homepage. It does not need a Home title.                                                 |
| What major sections exist? | Pass. Projects, About, Contact.                                                                            |
| What are my options here?  | Fail. The hero offers two equal links, and neither is contact.                                             |
| Where am I?                | Weak pass. Corner marks on MM when the path is `/`. Home is not a nav item, so no nav item is highlighted. |
| How can I search?          | Fail. No search. Severity 1. Do not add it. Three projects are already on the page.                        |

Interior pages were not trunk-tested. This journey's key page is the homepage.

| Issue                                                                                                                                                                                           | Heuristic                                                            | Severity (0-4) | Fix                                                                                                                                                               | Status                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| No obvious primary action. Explore projects and About me are equal text links. Contact is only in the nav. On a phone the portrait is gone and those two links sit centered under the greeting. | 8. Aesthetic and minimalist design. Krug: don't make me think.       | 4              | One Contact control. Remove the other two hero links. Keep the project grid. Label it Contact so it matches the nav.                                              | Fix now. Owner: Mathias. Priority: P1.                                                |
| "Hello, I'm Mathias!" is happy talk. The next sentence says to explore projects.                                                                                                                | 8. Aesthetic and minimalist design. Krug: get rid of half the words. | 3              | Cut the greeting. The sentence that says who should write waits for Phase 5.                                                                                      | Held for Phase 5. Owner: Mathias. Priority: P1.                                       |
| Nav says About and Projects. The hero says About me and Explore projects.                                                                                                                       | 4. Consistency and standards.                                        | 2              | Removing the hero links removes the mismatch.                                                                                                                     | Resolved by the severity-4 fix. Owner: Mathias. Priority: P1.                         |
| Below 860px the menu is an unlabeled icon, 42×38px, and its focus outline is removed.                                                                                                           | 6. Recognition rather than recall. Visibility of focus.              | 2              | Visible Menu label, at least 44×44px, and the same focus ring as the nav links.                                                                                   | Scheduled. Not ahead of severity 3–4. Owner: Mathias. Priority: P3.                   |
| Below 680px the portrait is hidden.                                                                                                                                                             | 8. Aesthetic and minimalist design.                                  | 2              | Show the portrait on small screens.                                                                                                                               | Scheduled. Owner: Mathias. Priority: P3.                                              |
| Project excerpts are long for a scan.                                                                                                                                                           | Krug: people scan.                                                   | 2              | Leave them until the ask exists.                                                                                                                                  | Same item as the Phase 1 project-card row. Owner: Mathias. Priority: P3.              |
| The mark says MM. The heading says the name.                                                                                                                                                    | Krug trunk test: site id.                                            | 1              | No change. The heading carries the name.                                                                                                                          | Accepted, no fix.                                                                     |
| There is no search.                                                                                                                                                                             | Krug trunk test: search.                                             | 1              | Do not add search.                                                                                                                                                | Accepted, no fix.                                                                     |
| `/contact` error says "Something went wrong. Please try again." It does not say what failed.                                                                                                    | 9. Help users recover from errors. Norman gulf of evaluation.        | 2              | Use that sentence only when the send itself fails: "Message not sent. Check your connection and try again." Keep the typed text.                                  | Accepted, not built. Homepage Contact is already built. Owner: Mathias. Priority: P2. |
| The contact form sets `noValidate`, and Send stays enabled when the fields are empty. The server then rejects the post, and the page hides the reason.                                          | Norman gulf of execution. Constraint.                                | 3              | Remove `noValidate`. Disable Send until name, email, subject, and message are valid. While it is disabled, show "Name, email, subject, and message are required." | Accepted, not built. Homepage Contact is already built. Owner: Mathias. Priority: P2. |
| Send has no confirmation and no undo.                                                                                                                                                           | Norman gulf of evaluation.                                           | 0              | Leave it. Sending is the goal.                                                                                                                                    | Accepted, no fix.                                                                     |
| The homepage hero does not signify Contact.                                                                                                                                                     | Norman gulf of execution.                                            | 4              | The filled Contact button already specified in Components.                                                                                                        | Built on the homepage, 2026-10-26. Owner: Mathias. Priority: P1.                      |

Label copy, homepage: the hero action reads Contact. Nav labels stay Projects, About, Contact.

## Microinteraction Inventory

| Interaction | Trigger/Rules/Feedback/Loops | Fix | Status |
| ----------- | ---------------------------- | --- | ------ |
|             |                              |     |        |
