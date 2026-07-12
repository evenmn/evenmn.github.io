# Gunn Synnøve Date Planner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a playful, mobile-friendly date planner at `/gunnsynnove/` with an evasive “Nei” button, random date wheel, booking handoff, FormSubmit email and downloadable calendar event.

**Architecture:** Add one layout-free Jekyll page plus scoped stylesheet and ES module. Pure selection, validation, calendar and form-payload helpers live in the module and are exercised in a browser-hosted test page. The page keeps all state client-side, uses FormSubmit for delivery and generates an ICS file locally.

**Tech Stack:** Jekyll, vanilla HTML/CSS/JavaScript, native form controls, FormSubmit, ICS (RFC 5545-compatible plain text), browser-driven verification.

---

## File structure

- Create: `gunnsynnove/index.html` — static page markup with three controlled views and form fields.
- Create: `assets/css/gunnsynnove.css` — all feature-scoped responsive styling, animation and reduced-motion support.
- Create: `assets/js/gunnsynnove.js` — exported pure helpers plus DOM controller for the invitation, wheel and booking views.
- Create: `tests/gunnsynnove.test.html` — browser-runnable tests for helper behavior; writes pass/fail output to the page.

### Task 1: Create red tests for planner helpers

**Files:**
- Create: `tests/gunnsynnove.test.html`
- Test: `tests/gunnsynnove.test.html`

- [ ] **Step 1: Write the failing browser test page**

Create an HTML page that imports `../assets/js/gunnsynnove.js`, exposes an `assert(condition, message)` function, and runs these tests after the module loads:

```js
assert(validateBooking('', '') === false, 'missing date and time are invalid');
assert(validateBooking('2026-07-12', '') === false, 'missing time is invalid');
assert(validateBooking('2026-07-12', '19:30') === true, 'date and time are valid');
assert(isPastDate('2026-07-11', new Date('2026-07-12T12:00:00')) === true, 'past dates are rejected');
assert(isPastDate('2026-07-12', new Date('2026-07-12T12:00:00')) === false, 'today is allowed');
assert(selectWheelDate(0, DATE_OPTIONS) === 'Overnattingsdate hos GS', 'index zero selects first option');
assert(selectWheelDate(5, DATE_OPTIONS) === 'Bade på Nydalen', 'index five selects last option');
const ics = buildCalendarEvent({ activity: 'HYROX', date: '2026-07-13', time: '18:30' });
assert(ics.includes('SUMMARY:HYROX'), 'ICS contains selected activity');
assert(ics.includes('DTSTART:20260713T183000'), 'ICS contains local start time');
assert(ics.includes('DTEND:20260713T193000'), 'ICS contains one-hour end time');
const fields = buildFormFields({ activity: 'HYROX', date: '2026-07-13', time: '18:30' });
assert(fields.date === '2026-07-13' && fields.time === '18:30', 'form payload preserves booking values');
```

Render a final `0 failures` or a list of failures in an element with id `results`.

- [ ] **Step 2: Run the test page and verify it fails**

Run Jekyll locally and navigate the in-app browser to `http://localhost:4000/tests/gunnsynnove.test.html`. Expected result: module load fails with a missing `assets/js/gunnsynnove.js` resource or missing exports; no test can pass yet.

- [ ] **Step 3: Commit the failing test page**

```bash
git add tests/gunnsynnove.test.html
git commit -m "test: define date planner helper behavior"
```

### Task 2: Implement pure helper module and make tests green

**Files:**
- Create: `assets/js/gunnsynnove.js`
- Modify: `tests/gunnsynnove.test.html`
- Test: `tests/gunnsynnove.test.html`

- [ ] **Step 1: Implement the public constants and helper functions**

Export these exact values and functions:

```js
export const DATE_OPTIONS = [
  'Overnattingsdate hos GS',
  'HYROX',
  'Restaurant Festningen',
  'Fullkroppsmassasje',
  'Gå til Vettakollen',
  'Bade på Nydalen',
];

export function validateBooking(date, time) {
  return Boolean(date && time);
}

export function isPastDate(date, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return new Date(`${date}T00:00:00`) < today;
}

export function selectWheelDate(index, options = DATE_OPTIONS) {
  return options[index % options.length];
}

export function buildFormFields({ activity, date, time }) {
  return { activity, date, time, _subject: 'Ny date med Gunn Synnøve', _template: 'table' };
}
```

Implement `buildCalendarEvent({ activity, date, time })` by removing dashes and colons, adding one hour to a local `Date`, formatting both values as `YYYYMMDDTHHMMSS`, escaping commas, semicolons and newlines in the summary, and returning this structure. Use `crypto.randomUUID()` for `<event-id>` and format `DTSTAMP` as a UTC value ending in `Z`:

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Even Nordhagen//Gunn Synnøve Date Planner//NO
BEGIN:VEVENT
UID:<event-id>@evennordhagen.com
DTSTAMP:<UTC timestamp ending in Z>
DTSTART:<local start timestamp>
DTEND:<local end timestamp>
SUMMARY:<escaped activity>
DESCRIPTION:Date med Even
END:VEVENT
END:VCALENDAR
```

- [ ] **Step 2: Re-run the browser test page and verify green output**

Reload the test URL. Expected result: `0 failures` and every assertion rendered as passed.

- [ ] **Step 3: Commit the helper module**

```bash
git add assets/js/gunnsynnove.js tests/gunnsynnove.test.html
git commit -m "feat: add date planner helpers"
```

### Task 3: Add the complete date planner interface

**Files:**
- Create: `gunnsynnove/index.html`
- Create: `assets/css/gunnsynnove.css`
- Modify: `assets/js/gunnsynnove.js`
- Test: `tests/gunnsynnove.test.html`

- [ ] **Step 1: Add the page shell and accessible three-view markup**

Create `gunnsynnove/index.html` with no Jekyll layout front matter except:

```yaml
---
layout: null
title: Gunn Synnøve
---
```

Include the feature CSS and module. Add a signature link in the upper right on the persistent page shell:

```html
<a class="signature-link" href="/" aria-label="Tilbake til Even Nordhagens hovedside">
  <img src="/assets/img/signature.png" alt="Even Nordhagen">
</a>
```

Add these three sections, only one visible at a time, each marked `data-view`:

```html
<section data-view="invitation">…</section>
<section data-view="wheel" hidden>…</section>
<section data-view="booking" hidden>…</section>
```

Use real heading and button text from the approved spec. The booking section must contain required native date and time fields, a summary element, error element with `role="alert"`, a disabled `Legg i kalender` button and a `<form action="https://formsubmit.co/even.nordhagen@gmail.com" method="POST">` with hidden activity/date/time fields and the required FormSubmit payload fields. Set the date field `min` to the current local `YYYY-MM-DD` value at page initialization. Include a small note that the first FormSubmit delivery requires Even to confirm the recipient address.

- [ ] **Step 2: Extend the controller after the failing page state exists**

After loading the page, verify the wheel and booking controls cannot be reached before clicking the unique `Ja` button. Then add a `DatePlanner` controller that:

```js
// The core state is exactly this shape.
this.state = { activity: null, date: '', time: '', spinning: false };
```

- advances `Ja` to the wheel;
- moves `Nei` to a random bounded `translate(x, y)` when the pointer enters a 100 px radius and on `pointerdown`;
- spins the CSS wheel for 4 seconds, chooses a random option index, updates the visible result and an `aria-live="polite"` region, and enables the continue control;
- validates booking inputs on change; updates the summary and form hidden fields with `buildFormFields`;
- makes calendar download available only when both fields validate; creates a Blob from `buildCalendarEvent`, an object URL, clicks a temporary `<a download="date-med-even.ics">` and revokes the URL;
- sets the form target to a hidden iframe so the flow can show an in-page sent message after submit while preserving the user's selected state.

- [ ] **Step 3: Add scoped visual system and interactions**

In `assets/css/gunnsynnove.css`, use page-local selectors beginning with `.date-planner`. Implement approved style B with:

- warm off-white body background and dark plum text;
- coral primary controls, mint secondary decorations and yellow sticker-like shapes;
- circular six-segment conic-gradient wheel and visible fixed pointer;
- signature link aligned upper right at desktop and mobile;
- responsive layout that remains single-column at 320 px;
- `:focus-visible` styles on every interactive control;
- `@media (prefers-reduced-motion: reduce)` that removes transitions and resolves wheel behavior without long animation.

- [ ] **Step 4: Verify core flow in the in-app browser**

Navigate to `/gunnsynnove/`, click the unique `Ja` button, spin the wheel, continue, set a future date and time, and verify that the summary, enabled calendar action, generated download and form hidden inputs reflect the chosen activity/date/time. Check that the signature always links to `/`.

- [ ] **Step 5: Commit the interface**

```bash
git add gunnsynnove/index.html assets/css/gunnsynnove.css assets/js/gunnsynnove.js
git commit -m "feat: add Gunn Synnøve date planner"
```

### Task 4: Validate Jekyll output and responsive behavior

**Files:**
- Modify: only if verification finds a defect in `gunnsynnove/index.html`, `assets/css/gunnsynnove.css`, or `assets/js/gunnsynnove.js`
- Test: `tests/gunnsynnove.test.html`

- [ ] **Step 1: Build the Jekyll site**

Run:

```bash
bundle exec jekyll build
```

Expected: exit code 0 and `_site/gunnsynnove/index.html` exists.

- [ ] **Step 2: Run automated browser assertions at desktop and mobile widths**

At a 1280 px viewport and a 320 px viewport, verify:

```text
invitation heading and both buttons visible
signature link is visible and points to /
Nei changes transform on pointer proximity
wheel cannot double-spin while spinning
one of the six approved labels appears as selection
booking rejects missing values
calendar button enables only with date plus time
FormSubmit form action and hidden field names are correct
```

- [ ] **Step 3: Re-run helper test page and check browser console**

Expected: `0 failures`; no JavaScript errors on `/gunnsynnove/`.

- [ ] **Step 4: Commit any verification fixes**

```bash
git add gunnsynnove/index.html assets/css/gunnsynnove.css assets/js/gunnsynnove.js tests/gunnsynnove.test.html
git commit -m "fix: polish date planner interactions"
```

Only commit this task if a verification defect required a code change.
