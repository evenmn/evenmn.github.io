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
    this.listeners.get(type)?.(event);
    return event;
  }

  focus() {}
  getBoundingClientRect() { return { left: 0, right: 80, top: 0, bottom: 40 }; }
}

const element = () => new FakeElement();
const elements = {
  '[data-action="accept"]': element(),
  '[data-action="decline"]': element(),
  '[data-action="spin"]': element(),
  '[data-action="continue"]': element(),
  '[data-action="respin"]': element(),
  '[data-action="calendar"]': element(),
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
  '[data-submission-frame]': element(),
};
const planner = new FakeElement();
planner.querySelector = (selector) => elements[selector] ?? null;
planner.querySelectorAll = (selector) => (selector === '[data-view]' || selector === '[data-selected-activity]' ? [] : []);
elements['[data-submit-confirmation]'].hidden = true;

globalThis.window = {
  matchMedia: () => ({ matches: false }),
  setTimeout,
  innerWidth: 1280,
  innerHeight: 800,
};
globalThis.document = {
  querySelector: () => null,
  createElement: () => element(),
  body: { appendChild() {} },
};

const { initDatePlanner } = await import('../assets/js/gunnsynnove.js');
initDatePlanner(planner);

const iframe = elements['[data-submission-frame]'];
const confirmation = elements['[data-submit-confirmation]'];
assert.equal(iframe.src, 'about:blank', 'the known bootstrap load is explicitly requested after listener setup');
iframe.dispatch('load');
assert.equal(confirmation.hidden, true, 'bootstrap iframe load never confirms a submission');

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
elements['[data-date]'].value = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
elements['[data-time]'].value = '19:30';
elements['[data-booking-form]'].dispatch('submit');
assert.equal(confirmation.hidden, true, 'valid submission stays unconfirmed until its iframe response loads');
iframe.dispatch('load');
assert.equal(confirmation.hidden, false, 'the first valid submission response confirms the date');

console.log('Iframe confirmation waits for bootstrap then first submission response');
