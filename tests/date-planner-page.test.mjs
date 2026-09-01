import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../date-planner/index.html', import.meta.url), 'utf8');
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
  'name="_subject"',
  'name="_template"',
  'role="alert"',
  '>Fullkroppsmassasje<',
  'data-action="send"',
];

const missing = requiredMarkup.filter((snippet) => !page.includes(snippet));

if (missing.length > 0) {
  throw new Error(`Date planner shell is missing: ${missing.join(', ')}`);
}

if (page.includes('data-submission-frame') || page.includes('date-form-result')) {
  throw new Error('The JavaScript submission flow must not retain the hidden iframe transport');
}

console.log('Date planner invitation shell is present');

const script = await readFile(new URL('../assets/js/date-planner.js', import.meta.url), 'utf8');
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
  'fetch(',
  'https://formsubmit.co/ajax/even.nordhagen@gmail.com',
  'new FormData(form)',
];
const missingBehavior = requiredControllerBehavior.filter((snippet) => !script.includes(snippet));

if (missingBehavior.length > 0) {
  throw new Error(`Date planner controller is missing: ${missingBehavior.join(', ')}`);
}

if (script.includes('Math.floor(Math.random() * 360)')) {
  throw new Error('Wheel alignment must not use an arbitrary angle offset');
}

if (script.includes('iframe')) {
  throw new Error('The JavaScript submission flow must not retain the hidden iframe transport');
}

const submitHandler = script.slice(script.indexOf("form.addEventListener('submit'"));
if (!submitHandler.includes('response.ok') || !submitHandler.includes('result.success')) {
  throw new Error('Send confirmation must wait for a successful FormSubmit AJAX response');
}

console.log('Date planner controller is present');
