import assert from 'node:assert/strict';
import {
  DATE_OPTIONS,
  buildCalendarEvent,
  buildFormFields,
  isPastDate,
  selectWheelDate,
  validateBooking,
} from '../assets/js/gunnsynnove.js';

assert.equal(validateBooking('', ''), false);
assert.equal(validateBooking('2026-07-12', '19:30'), true);
assert.equal(isPastDate('2026-07-11', new Date('2026-07-12T12:00:00')), true);
assert.equal(isPastDate('2026-07-12', new Date('2026-07-12T12:00:00')), false);
assert.equal(selectWheelDate(0), DATE_OPTIONS[0]);
assert.equal(selectWheelDate(5), DATE_OPTIONS[5]);

const event = buildCalendarEvent({ activity: 'HYROX', date: '2026-07-13', time: '18:30' });
assert.match(event, /SUMMARY:HYROX/);
assert.match(event, /DTSTART:20260713T183000/);
assert.match(event, /DTEND:20260713T193000/);

const fields = buildFormFields({ activity: 'HYROX', date: '2026-07-13', time: '18:30' });
assert.deepEqual(fields, {
  activity: 'HYROX',
  date: '2026-07-13',
  time: '18:30',
  _subject: 'Ny date med Gunn Synnøve',
  _template: 'table',
});

console.log('Date planner helpers pass');
