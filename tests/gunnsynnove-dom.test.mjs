import assert from 'node:assert/strict';

class FakeElement {
  constructor() {
    this.disabled = false;
    this.hidden = false;
    this.style = {};
    this.value = '';
    this.textContent = '';
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  dispatch(type) {
    const event = { prevented: false, preventDefault() { this.prevented = true; } };
    return this.listeners.get(type)?.(event);
  }

  focus() {}
  getBoundingClientRect() { return { left: 0, right: 80, top: 0, bottom: 40 }; }
}

const tomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

function createHarness() {
  const element = () => new FakeElement();
  const views = ['invitation', 'wheel', 'booking'].map((name) => ({ ...element(), dataset: { view: name } }));
  const elements = {
    '[data-action="accept"]': element(),
    '[data-action="decline"]': element(),
    '[data-action="spin"]': element(),
    '[data-action="continue"]': element(),
    '[data-action="respin"]': element(),
    '[data-action="calendar"]': element(),
    '[data-action="send"]': element(),
    '[data-wheel]': element(),
    '[data-wheel-result]': element(),
    '[data-date]': element(),
    '[data-time]': element(),
    '[data-booking-form]': element(),
    '[data-form-error]': element(),
    '[data-booking-summary]': element(),
    '[data-submit-confirmation]': element(),
    '[data-form-activity]': element(),
    '[data-form-date]': element(),
    '[data-form-time]': element(),
  };
  const activity = element();
  const planner = element();
  planner.querySelector = (selector) => elements[selector] ?? null;
  planner.querySelectorAll = (selector) => {
    if (selector === '[data-view]') return views;
    if (selector === '[data-selected-activity]') return [activity];
    return [];
  };
  elements['[data-submit-confirmation]'].hidden = true;
  elements['[data-form-error]'].hidden = true;

  return { activity, elements, planner };
}

globalThis.window = {
  matchMedia: () => ({ matches: true }),
  setTimeout: (callback) => { callback(); return 0; },
  innerWidth: 1280,
  innerHeight: 800,
};
globalThis.document = {
  querySelector: () => null,
  createElement: () => new FakeElement(),
  body: { appendChild() {} },
};
globalThis.FormData = class {
  constructor(form) { this.form = form; }
};

const { initDatePlanner } = await import('../assets/js/gunnsynnove.js');

async function submitWith(fetchImplementation) {
  const harness = createHarness();
  const calls = [];
  globalThis.fetch = async (...args) => {
    calls.push(args);
    return fetchImplementation({ harness, args });
  };
  initDatePlanner(harness.planner);
  harness.elements['[data-action="spin"]'].dispatch('click');
  harness.elements['[data-action="continue"]'].dispatch('click');
  harness.elements['[data-date]'].value = tomorrow();
  harness.elements['[data-time]'].value = '19:30';
  await harness.elements['[data-booking-form]'].dispatch('submit');
  return { ...harness, calls };
}

const success = await submitWith(({ harness, args }) => {
  assert.equal(harness.elements['[data-action="send"]'].disabled, true, 'send button disables while request is pending');
  assert.equal(args[1].headers.Accept, 'application/json', 'AJAX request asks FormSubmit for JSON');
  assert.equal(args[1].body.form, harness.elements['[data-booking-form]'], 'AJAX request contains the booking FormData');
  return { ok: true, json: async () => ({ success: 'true' }) };
});
assert.equal(success.elements['[data-submit-confirmation]'].hidden, false, 'successful JSON confirms the date');
assert.equal(success.elements['[data-form-error]'].hidden, true, 'successful JSON leaves no retry error');
assert.equal(success.elements['[data-action="send"]'].disabled, false, 'send button re-enables after success');
assert.equal(success.elements['[data-booking-form]'].action, 'https://formsubmit.co/even.nordhagen@gmail.com', 'non-JS fallback remains intact');
assert.equal(success.calls[0][0], 'https://formsubmit.co/ajax/even.nordhagen@gmail.com', 'JS submits to FormSubmit AJAX endpoint');

const rejected = await submitWith(() => ({ ok: false, json: async () => ({ success: false }) }));
assert.equal(rejected.elements['[data-submit-confirmation]'].hidden, true, 'non-ok response does not confirm the date');
assert.equal(rejected.elements['[data-form-error]'].hidden, false, 'non-ok response offers a retry');
assert.equal(rejected.elements['[data-date]'].value, tomorrow(), 'non-ok response preserves selected date');
assert.equal(rejected.elements['[data-time]'].value, '19:30', 'non-ok response preserves selected time');
assert.notEqual(rejected.elements['[data-form-activity]'].value, '', 'non-ok response preserves selected activity');
assert.equal(rejected.elements['[data-action="send"]'].disabled, false, 'send button re-enables after non-ok response');

const networkFailure = await submitWith(() => { throw new Error('Network unavailable'); });
assert.equal(networkFailure.elements['[data-submit-confirmation]'].hidden, true, 'network error does not confirm the date');
assert.equal(networkFailure.elements['[data-form-error]'].hidden, false, 'network error offers a retry');
assert.equal(networkFailure.elements['[data-date]'].value, tomorrow(), 'network error preserves selected date');
assert.equal(networkFailure.elements['[data-time]'].value, '19:30', 'network error preserves selected time');
assert.notEqual(networkFailure.elements['[data-form-activity]'].value, '', 'network error preserves selected activity');
assert.equal(networkFailure.elements['[data-action="send"]'].disabled, false, 'send button re-enables after network error');

console.log('FormSubmit AJAX handles success, rejection, and network failure');
