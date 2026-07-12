export const DATE_OPTIONS = [
  'Overnattingsdate hos GS',
  'HYROX',
  'Restaurant Festningen',
  'Fullkroppsmassasje',
  'Gå til Vettakollen',
  'Bade på Nydalen',
];

const pad = (value) => String(value).padStart(2, '0');

function formatLocalDateTime(date) {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function formatUtcDateTime(date) {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function escapeCalendarText(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function validateBooking(date, time) {
  return Boolean(date && time);
}

export function isPastDate(date, now = new Date()) {
  const [year, month, day] = date.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return selectedDate < currentDate;
}

export function selectWheelDate(index, options = DATE_OPTIONS) {
  return options[index % options.length];
}

export function getWheelRotationForIndex(index, currentRotation = 0, fullRotations = 6) {
  const segmentDegrees = 360 / DATE_OPTIONS.length;
  const normalizedIndex = ((index % DATE_OPTIONS.length) + DATE_OPTIONS.length) % DATE_OPTIONS.length;
  const pointerAlignment = (360 - normalizedIndex * segmentDegrees) % 360;
  const currentFullTurns = currentRotation - (((currentRotation % 360) + 360) % 360);

  return currentFullTurns + fullRotations * 360 + pointerAlignment;
}

export function buildFormFields({ activity, date, time }) {
  return {
    activity,
    date,
    time,
    _subject: 'Ny date med Gunn Synnøve',
    _template: 'table',
  };
}

export function buildCalendarEvent({ activity, date, time }) {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const startsAt = new Date(year, month - 1, day, hours, minutes, 0);
  const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Even Nordhagen//Gunn Synnøve Date Planner//NO',
    'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@evennordhagen.com`,
    `DTSTAMP:${formatUtcDateTime(new Date())}`,
    `DTSTART:${formatLocalDateTime(startsAt)}`,
    `DTEND:${formatLocalDateTime(endsAt)}`,
    `SUMMARY:${escapeCalendarText(activity)}`,
    'DESCRIPTION:Date med Even',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n') + '\r\n';
}

function localIsoDate(now = new Date()) {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function formatBookingSummary(date, time) {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const dateTime = new Date(year, month - 1, day, hours, minutes);

  return new Intl.DateTimeFormat('nb-NO', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(dateTime);
}

export function initDatePlanner(planner) {
  const views = [...planner.querySelectorAll('[data-view]')];
  const acceptButton = planner.querySelector('[data-action="accept"]');
  const declineButton = planner.querySelector('[data-action="decline"]');
  const spinButton = planner.querySelector('[data-action="spin"]');
  const continueButton = planner.querySelector('[data-action="continue"]');
  const respinButton = planner.querySelector('[data-action="respin"]');
  const calendarButton = planner.querySelector('[data-action="calendar"]');
  const wheel = planner.querySelector('[data-wheel]');
  const wheelResult = planner.querySelector('[data-wheel-result]');
  const dateInput = planner.querySelector('[data-date]');
  const timeInput = planner.querySelector('[data-time]');
  const form = planner.querySelector('[data-booking-form]');
  const formError = planner.querySelector('[data-form-error]');
  const summary = planner.querySelector('[data-booking-summary]');
  const confirmation = planner.querySelector('[data-submit-confirmation]');
  const activityFields = planner.querySelectorAll('[data-selected-activity]');
  const formActivity = planner.querySelector('[data-form-activity]');
  const formDate = planner.querySelector('[data-form-date]');
  const formTime = planner.querySelector('[data-form-time]');
  const iframe = planner.querySelector('[data-submission-frame]');
  const formEndpoint = 'https://formsubmit.co/even.nordhagen@gmail.com';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let selectedActivity = '';
  let rotation = 0;
  let spinning = false;
  let bootstrapLoadPending = true;
  let awaitingSubmission = false;

  iframe.addEventListener('load', () => {
    if (bootstrapLoadPending) {
      bootstrapLoadPending = false;
      return;
    }

    if (awaitingSubmission) {
      confirmation.hidden = false;
      awaitingSubmission = false;
    }
  });
  iframe.src = 'about:blank';

  form.action = formEndpoint;
  dateInput.min = localIsoDate();

  function showView(name) {
    views.forEach((view) => {
      view.hidden = view.dataset.view !== name;
    });
  }

  function setSelectedActivity(activity) {
    selectedActivity = activity;
    activityFields.forEach((field) => {
      field.textContent = activity;
    });
    formActivity.value = activity;
  }

  function clearBooking() {
    dateInput.value = '';
    timeInput.value = '';
    formDate.value = '';
    formTime.value = '';
    formError.hidden = true;
    confirmation.hidden = true;
    awaitingSubmission = false;
    summary.textContent = 'Velg dato og klokkeslett, så reserverer vi litt magi.';
    calendarButton.disabled = true;
  }

  function bookingIsValid() {
    return validateBooking(dateInput.value, timeInput.value) && !isPastDate(dateInput.value);
  }

  function updateBooking() {
    const valid = bookingIsValid();
    formDate.value = dateInput.value;
    formTime.value = timeInput.value;
    calendarButton.disabled = !valid;

    if (valid) {
      summary.textContent = `${selectedActivity} – ${formatBookingSummary(dateInput.value, timeInput.value)}.`;
      formError.hidden = true;
    } else if (dateInput.value && isPastDate(dateInput.value)) {
      summary.textContent = 'Velg en dato fra i dag eller senere.';
    } else {
      summary.textContent = 'Velg dato og klokkeslett, så reserverer vi litt magi.';
    }
  }

  function moveDeclineButton() {
    const rect = declineButton.getBoundingClientRect();
    const maxLeft = Math.min(120, Math.max(0, rect.left - 12));
    const maxRight = Math.min(120, Math.max(0, window.innerWidth - rect.right - 12));
    const maxUp = Math.min(80, Math.max(0, rect.top - 12));
    const maxDown = Math.min(80, Math.max(0, window.innerHeight - rect.bottom - 12));
    const x = Math.round(Math.random() * (maxLeft + maxRight) - maxLeft);
    const y = Math.round(Math.random() * (maxUp + maxDown) - maxUp);

    declineButton.style.transform = `translate(${x}px, ${y}px)`;
  }

  function pointerIsNearDecline(event) {
    const rect = declineButton.getBoundingClientRect();
    const closestX = Math.max(rect.left, Math.min(event.clientX, rect.right));
    const closestY = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
    return Math.hypot(event.clientX - closestX, event.clientY - closestY) <= 100;
  }

  acceptButton.addEventListener('click', () => {
    showView('wheel');
    spinButton.focus();
  });

  planner.addEventListener('pointermove', (event) => {
    if (!planner.querySelector('[data-view="invitation"]').hidden && pointerIsNearDecline(event)) {
      moveDeclineButton();
    }
  });

  declineButton.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    moveDeclineButton();
  });
  declineButton.addEventListener('click', (event) => {
    event.preventDefault();
    moveDeclineButton();
  });

  spinButton.addEventListener('click', () => {
    if (spinning) return;

    spinning = true;
    spinButton.disabled = true;
    continueButton.disabled = true;
    wheelResult.textContent = 'Hjulet tenker veldig hardt…';
    const winnerIndex = Math.floor(Math.random() * DATE_OPTIONS.length);
    rotation = getWheelRotationForIndex(winnerIndex, rotation, 6 + Math.floor(Math.random() * 2));
    wheel.style.transform = `rotate(${rotation}deg)`;

    window.setTimeout(() => {
      setSelectedActivity(selectWheelDate(winnerIndex));
      wheelResult.textContent = `Det blir: ${selectedActivity}!`;
      continueButton.disabled = false;
      spinButton.disabled = false;
      spinning = false;
      continueButton.focus();
    }, reduceMotion ? 0 : 4000);
  });

  continueButton.addEventListener('click', () => {
    clearBooking();
    showView('booking');
    dateInput.focus();
  });

  respinButton.addEventListener('click', () => {
    clearBooking();
    showView('wheel');
    spinButton.focus();
  });

  dateInput.addEventListener('input', updateBooking);
  timeInput.addEventListener('input', updateBooking);

  calendarButton.addEventListener('click', () => {
    if (!bookingIsValid()) return;

    const calendar = buildCalendarEvent({
      activity: selectedActivity,
      date: dateInput.value,
      time: timeInput.value,
    });
    const url = URL.createObjectURL(new Blob([calendar], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'date-med-even.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  form.addEventListener('submit', (event) => {
    updateBooking();
    if (!bookingIsValid()) {
      event.preventDefault();
      formError.textContent = 'Velg både en gyldig dato og et klokkeslett før du sender.';
      formError.hidden = false;
      return;
    }

    formError.hidden = true;
    confirmation.hidden = true;
    awaitingSubmission = true;
  });
}

if (typeof document !== 'undefined') {
  const planner = document.querySelector('.date-planner');
  if (planner) {
    initDatePlanner(planner);
  }
}
