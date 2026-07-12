import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../gunnsynnove/index.html', import.meta.url), 'utf8');
const requiredMarkup = [
  'class="date-planner"',
  'data-view="invitation"',
  'data-view="wheel"',
  'data-view="booking"',
  'Skal vi dra på date?',
  '>Ja<',
  '>Nei<',
  'href="/"',
  'aria-label="Tilbake til Even Nordhagens hovedside"',
  'src="/assets/img/signature.png"',
  'data-view="wheel" hidden',
  'data-view="booking" hidden',
  'aria-live="polite"',
  'type="date"',
  'type="time"',
  'https://formsubmit.co/even.nordhagen@gmail.com',
  'method="POST"',
  'target="date-form-result"',
  'name="_subject"',
  'name="_template"',
  'role="alert"',
  '>Fullkroppsmassasje<',
];

const missing = requiredMarkup.filter((snippet) => !page.includes(snippet));

if (missing.length > 0) {
  throw new Error(`Date planner shell is missing: ${missing.join(', ')}`);
}

console.log('Date planner invitation shell is present');

const script = await readFile(new URL('../assets/js/gunnsynnove.js', import.meta.url), 'utf8');
const requiredControllerBehavior = [
  'function initDatePlanner',
  "querySelector('.date-planner')",
  "data-view",
  'buildCalendarEvent',
  'https://formsubmit.co/even.nordhagen@gmail.com',
  'pointermove',
  'pointerdown',
  '<= 100',
  'setTimeout',
  '4000',
  "download = 'date-med-even.ics'",
  'URL.createObjectURL',
  'getWheelRotationForIndex',
  "iframe.addEventListener('load'",
];
const missingBehavior = requiredControllerBehavior.filter((snippet) => !script.includes(snippet));

if (missingBehavior.length > 0) {
  throw new Error(`Date planner controller is missing: ${missingBehavior.join(', ')}`);
}

if (script.includes('Math.floor(Math.random() * 360)')) {
  throw new Error('Wheel alignment must not use an arbitrary angle offset');
}

const submitHandler = script.slice(script.indexOf("form.addEventListener('submit'"));
if (!submitHandler.includes('confirmation.hidden = true;') || !submitHandler.includes('awaitingSubmission = true;')) {
  throw new Error('Send confirmation must wait for the submission iframe load');
}

console.log('Date planner controller is present');
