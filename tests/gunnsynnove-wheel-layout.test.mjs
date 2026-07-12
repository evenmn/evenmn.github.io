import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [page, css] = await Promise.all([
  readFile(new URL('../gunnsynnove/index.html', import.meta.url), 'utf8'),
  readFile(new URL('../assets/css/gunnsynnove.css', import.meta.url), 'utf8'),
]);

assert.match(page, /wheel-label--5">Gå til<br>Vettakollen/, 'fifth wheel label is Vettakollen');
assert.match(page, /wheel-label--6">Bade på<br>Nydalen/, 'sixth wheel label is Nydalen');
assert.match(
  css,
  /\.date-planner \.wheel-label--5 \{ left: 0; top: 54%; \}/,
  'Vettakollen renders in the lower-left fifth segment',
);
assert.match(
  css,
  /\.date-planner \.wheel-label--6 \{ left: 7%; top: 31%; \}/,
  'Bade på Nydalen renders in the upper-left sixth segment',
);

console.log('Wheel label sectors match their date options');
