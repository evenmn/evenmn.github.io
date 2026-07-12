# Gunn Synnøve date planner — design

## Purpose

Create a private-feeling, playful date-planning experience at `/gunnsynnove/` on evennordhagen.com. It should guide Gunn Synnøve from accepting a date invitation, through randomly choosing a date idea, to selecting a date and time and sending the result to Even.

## Scope and architecture

The feature is one self-contained static page that uses local CSS and JavaScript. It intentionally does not use the site's normal Jekyll layout so the date experience is visually distinct, but it uses the existing `/assets/img/signature.png` image as a compact link back to `/` in the upper-right corner throughout the flow.

The page owns its three stateful views in JavaScript:

1. Invitation
2. Date wheel
3. Date and time booking

No choice is persisted beyond the open browser tab. Reloading starts a new invitation.

## Visual direction

Use the approved direction B: playful and personal. The palette is buttery yellow, warm off-white, dark plum, mint, coral and soft pink. Rounded cards, bold outlined accents, hand-drawn-feeling stickers, and compact micro-animations create a warm, humorous feeling. The design must retain legibility and keyboard focus states.

## Flow

### 1. Invitation

- Heading: `Skal vi dra på date?`
- Primary button: `Ja`
- Secondary button: `Nei`
- `Ja` advances to the wheel.
- The `Nei` button uses a bounded random position shift whenever a pointer gets close. On touch, it shifts on press before it can decline. It remains focusable and harmlessly shifts if activated with a keyboard, so the page is not inaccessible.

### 2. Date wheel

- Heading: `Hva skal vi gjøre?`
- A large six-segment wheel with a center `Snurr hjulet` button.
- Items, in this exact spelling:
  - Overnattingsdate hos GS
  - HYROX
  - Restaurant Festningen
  - Fullkroppsmassasje
  - Gå til Vettakollen
  - Bade på Nydalen
- The spin animation lasts about 4 seconds, uses a random final rotation and resolves to a single selected item.
- During the animation the spin control is disabled. Once it stops, the selected date is announced in text and a continue button advances to booking.

### 3. Booking and handoff

- Heading includes the selected date; users can go back and re-spin before submitting.
- Native `date` and `time` controls require both a date and a time. The date control cannot pick a past date.
- A live summary shows the selected activity, local date and time, and uses the browser's local timezone for calendar data.
- `Legg i kalender` downloads an `.ics` calendar file. It contains a one-hour event, the chosen activity as its summary, and `Date med Even` as its description. This does not need a server and works with common calendar clients.
- `Send` posts the activity, date and time to `https://formsubmit.co/even.nordhagen@gmail.com`. FormSubmit's first delivery must be confirmed by the recipient before it starts forwarding submissions. The UI must state this unobtrusively before the first real submission is relied upon.
- After a successful form submission, the user sees a confirmation message on the page. The submission must not expose a recipient address as editable UI content.

## Error handling

- Booking controls show a clear in-page validation message if either date or time is missing.
- Calendar generation is disabled until both values are valid.
- A failed or blocked form submission leaves the selected details intact and suggests retrying.
- The experience remains useful when reduced motion is enabled: the wheel selection is shown without extended spinning and the `Nei` button changes position without motion-heavy transitions.

## Responsive and accessibility requirements

- Works from narrow mobile screens (320 px) through desktop.
- No hover-only path is required: the primary flow works with tap and keyboard.
- Buttons have visible focus states, adequate contrast and concise accessible labels.
- The date-wheel result is delivered through an `aria-live` region.
- Decorative stickers are hidden from assistive technology.

## Testing and verification

- Unit tests cover date selection validation, wheel-result calculation, `.ics` generation, and FormSubmit payload generation.
- Browser tests cover the three-state flow, the evasive `Nei` control, selection display, validation, calendar download trigger and required form fields.
- Run the Jekyll build, tests and responsive browser checks before delivery.

## Non-goals

- No account system, database, availability lookup, backend function, analytics or calendar-provider OAuth.
- No automatic calendar insertion; calendar clients receive a downloaded `.ics` event because this is reliable for a static GitHub Pages site.
