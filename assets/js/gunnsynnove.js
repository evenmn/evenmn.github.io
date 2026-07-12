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
