# The Fussy Baby — Go-to-Market Strategy

Version: draft v1 · Companion to MVP PRD v1.1

## Positioning

**An investigator, not a tracker.**

Every baby app tracks. Huckleberry, Baby Tracker, Glow Baby — they all
log feeds and naps and show charts. None of them help a parent answer
the question that's actually keeping her up: *why is my baby fussy?*

The Fussy Baby's wedge is the investigation loop: guided playbook,
under-a-minute observation capture, and patterns surfaced as evidence.
The disclaimer is part of the positioning, not a legal footnote — "we
never diagnose, we help you see" is what makes it recommendable by
professionals.

**One-line pitch:** Figure out what's behind the fuss — calmly,
systematically, together with your pediatrician.

## Distribution stages

### Stage 0 — Web prototype (now)

The app is live at the GitHub Pages URL as a mobile web app.
Zero install, works on any phone, each visitor gets their own private
data (stored on-device).

Use it for: hallway tests, mom-friend feedback, showing investors or
collaborators. Share the link or the QR code.

Caveats: data lives in the browser (clearing Safari data erases it),
no home-screen icon yet, voice input works in Chrome/Safari but not
every in-app browser (Instagram/Facebook webviews).

### Stage 1 — PWA beta (1–2 weeks of work)

Add a web manifest + service worker: installable to the home screen
with an icon, full-screen, offline-capable. Still just a link — no app
store, no review, instant updates.

Use it for: the structured 20–50 mom beta. A PWA is the fastest way to
put something that *feels like an app* in testers' hands.

### Stage 2 — TestFlight (the platform you were blanking on)

TestFlight is Apple's beta-testing platform. Requirements and path:

1. **Apple Developer Program** — $99/year, enroll at
   developer.apple.com. Takes a day or two to approve.
2. **Wrap the web app in a native shell** with Capacitor. The React
   code ships unchanged inside an iOS app; adds native voice, haptics,
   and real local storage. Roughly a week of work including icons,
   splash screens, and device testing.
3. **App Store Connect** — create the app record, upload the build
   from Xcode.
4. **Internal testing** — up to 100 testers on your team, no review,
   available within minutes of upload.
5. **External testing** — up to 10,000 testers via a public TestFlight
   link. Requires a lightweight "beta app review" (usually 1–2 days).
   This public link is the growth tool: anyone with the link installs
   the beta in two taps.

Android equivalent: Google Play Console ($25 one-time) with a closed
testing track. Note: new personal Play accounts must run a closed test
with 12+ testers for 14 days before production release — start that
clock early if Android matters.

### Stage 3 — App Store launch

After the beta iterates: production App Store release. Gate on the
pre-launch requirements below, not on a date.

## Where first: channels

The buyer and the user are the same person: a parent (mostly moms) of
a 0–6 month old, mid-fussiness-crisis, actively googling at 3am.
Two channel types matter, in this order:

**1. Professionals who get asked "is this normal?" all day.**
- Lactation consultants (IBCLCs) — the app's observation history is
  genuinely useful *to them* ("bring a week of observations to your
  appointment"). A tool that makes their consults better is a tool
  they recommend. This is the highest-leverage channel.
- Pediatric practices, doulas, night nurses, mother's groups run by
  hospitals.
- The pitch to professionals leans on what the app *doesn't* do:
  no diagnosis, no treatment advice, structured notes they can trust.

**2. Where the 3am googling happens.**
- Facebook mom groups and Peanut communities (local + due-date groups).
- Reddit: r/NewParents, r/beyondthebump, r/breastfeeding — as a
  participating member sharing a free tool, never as drive-by promo
  (these communities ban it).
- Instagram/TikTok parenting educators — micro-influencers (10–100k)
  in the lactation/infant-sleep space convert far better than big
  accounts.
- SEO eventually: the Learn articles ("what does green stool mean")
  map exactly onto high-volume search queries. Publishing them as a
  public content site is a long-term acquisition engine.

## Feedback plan for the MVP

**Round 1 — Moderated sessions (this month, n=5–8).**
Sit with moms (or video call), give them the link, say nothing.
Watch: Do they finish onboarding? Do they understand Detective without
explanation? Does the first log take under a minute? What do they
*expect* Patterns to tell them? The gap between expectation and our
evidence-not-conclusions stance is the single most important thing to
learn — it's the product's core bet.

**Round 2 — Diary beta (2 weeks, n=20–50, PWA).**
Real use, real babies. Weekly 5-question check-in survey.

**Metrics that matter:**
- Onboarding completion rate
- Time to first saved observation (target: < 1 minute)
- Logging retention: % of testers who log 5+ of their first 7 days
- % who reach their first surfaced pattern, and time-to-first-pattern
- Qualitative: do they *trust* the patterns? Would they show their
  pediatrician?

**What we're testing, in one sentence:** does "evidence, never
diagnosis" feel like calm expertise or like withholding?

## Pre-launch requirements (gate the store release)

- **Legal review** of the disclaimer and all pattern language (PRD
  TODO since v1). Non-negotiable for a baby-health-adjacent app.
- **Privacy policy** — required by the App Store regardless; today the
  story is excellent (everything on-device, nothing transmitted) and
  worth advertising.
- **AI backend decision** — if AI extraction/narration ships, the
  privacy story changes ("processed then discarded") and both the
  policy and onboarding copy must say so plainly.
- **Clinical review** of the vocabulary and Playbook content
  (lactation consultant + pediatric reviewer). Doubles as the start of
  the professional channel: reviewers become advocates.

## Sequence summary

| When | What | Goal |
| --- | --- | --- |
| Now | Pages link + QR | Hallway feedback, n=5–8 moderated |
| +2 weeks | PWA beta | 20–50 mom diary study |
| +4–6 weeks | Capacitor + TestFlight external link | Broader beta, waitlist building |
| +8–12 weeks | App Store launch | Gated on legal/clinical review, not a date |
| Ongoing | IBCLC partnerships, Learn-content SEO | Durable acquisition |
