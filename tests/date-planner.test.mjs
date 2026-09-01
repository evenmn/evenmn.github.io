import assert from 'node:assert/strict';
import {
  DATE_OPTIONS,
  buildCalendarEvent,
  buildFormFields,
  getWheelRotationForIndex,
  isPastDate,
  selectWheelDate,
  validateBooking,
} from '../assets/js/date-planner.js';

assert.equal(validateBooking('', ''), false);
assert.equal(validateBooking('2026-07-12', '19:30'), true);
assert.equal(isPastDate('2026-07-11', new Date('2026-07-12T12:00:00')), true);
assert.equal(isPastDate('2026-07-12', new Date('2026-07-12T12:00:00')), false);
assert.equal(selectWheelDate(0), DATE_OPTIONS[0]);
assert.equal(selectWheelDate(5), DATE_OPTIONS[5]);
assert.equal(getWheelRotationForIndex(0), 2160, 'first segment remains under the top pointer');
assert.equal(getWheelRotationForIndex(1), 2460, 'second segment rotates to the top pointer');
assert.equal(
  getWheelRotationForIndex(2, 2460),
  4560,
  'later spins retain full rotations while aligning the selected segment',
);

const event = buildCalendarEvent({ activity: 'HYROX', date: '2026-07-13', time: '18:30' });
assert.match(event, /SUMMARY:HYROX/);
assert.match(event, /DTSTART:20260713T183000/);
assert.match(event, /DTEND:20260713T193000/);

const fields = buildFormFields({ activity: 'HYROX', date: '2026-07-13', time: '18:30' });
assert.deepEqual(fields, {
  activity: 'HYROX',
  date: '2026-07-13',
  time: '18:30',
  _subject: 'Ny date-avtale',
  _template: 'table',
});

console.log('Date planner helpers pass');
