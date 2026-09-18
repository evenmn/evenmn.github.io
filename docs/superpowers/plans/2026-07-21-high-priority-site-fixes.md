# High-Priority Site Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the three broken diagrams, prevent the desktop navigation from covering headings at 1200-1399.98 pixels, and generate absolute production URLs.

**Architecture:** Add a focused Node contract test that reads the site sources and generated image signatures directly. Fix each contract at its source: render repository PNG assets from the original PDFs, align the intermediate responsive breakpoint in the main stylesheet, and declare the production origin in Jekyll configuration.

**Tech Stack:** Jekyll, Markdown, CSS, Node.js built-in test/assert/fs modules, Poppler `pdftoppm`

---

## File structure

- Create `tests/site-high-priority.test.mjs`: source-level regression tests for diagram assets and references, the responsive header rule, and the production URL.
- Create `assets/img/bris/enc-proc-dec.png`: high-resolution browser-compatible rendering of the existing encoder/processor/decoder PDF.
- Create `assets/img/bris/model.png`: high-resolution browser-compatible rendering of the existing BRIS model PDF.
- Create `assets/img/stretched_grid/gnn.png`: high-resolution browser-compatible rendering of the existing stretched-grid GNN PDF.
- Modify `_posts/2026-01-19-bris.md`: point two diagram image elements at their PNG renderings.
- Modify `_posts/2024-09-12-stretched-grid.md`: point one diagram image element at its PNG rendering.
- Modify `assets/css/beautifuljekyll.css`: add header spacing for the 1200-1399.98 pixel desktop transition range.
- Modify `_config.yml`: declare the site's canonical production origin.

### Task 1: Restore the three diagram images

**Files:**
- Create: `tests/site-high-priority.test.mjs`
- Create: `assets/img/bris/enc-proc-dec.png`
- Create: `assets/img/bris/model.png`
- Create: `assets/img/stretched_grid/gnn.png`
- Modify: `_posts/2026-01-19-bris.md:81,108`
- Modify: `_posts/2024-09-12-stretched-grid.md:27`
- Preserve: `assets/img/bris/enc-proc-dec.pdf`
- Preserve: `assets/img/bris/model.pdf`
- Preserve: `assets/img/stretched_grid/gnn.pdf`

- [ ] **Step 1: Write the failing media contract test**

Create `tests/site-high-priority.test.mjs` with:

```javascript
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const diagrams = [
  {
    source: '../_posts/2026-01-19-bris.md',
    pdf: '../assets/img/bris/enc-proc-dec.pdf',
    png: '../assets/img/bris/enc-proc-dec.png',
    publicPdf: '/assets/img/bris/enc-proc-dec.pdf',
    publicPng: '/assets/img/bris/enc-proc-dec.png',
  },
  {
    source: '../_posts/2026-01-19-bris.md',
    pdf: '../assets/img/bris/model.pdf',
    png: '../assets/img/bris/model.png',
    publicPdf: '/assets/img/bris/model.pdf',
    publicPng: '/assets/img/bris/model.png',
  },
  {
    source: '../_posts/2024-09-12-stretched-grid.md',
    pdf: '../assets/img/stretched_grid/gnn.pdf',
    png: '../assets/img/stretched_grid/gnn.png',
    publicPdf: '/assets/img/stretched_grid/gnn.pdf',
    publicPng: '/assets/img/stretched_grid/gnn.png',
  },
];

test('diagram image embeds use valid PNG renderings while preserving source PDFs', async () => {
  for (const diagram of diagrams) {
    const source = await readFile(new URL(diagram.source, import.meta.url), 'utf8');
    assert.doesNotMatch(source, new RegExp(`<img[^>]+${diagram.publicPdf.replaceAll('.', '\\.')}`));
    assert.match(source, new RegExp(`<img[^>]+${diagram.publicPng.replaceAll('.', '\\.')}`));

    await access(new URL(diagram.pdf, import.meta.url));
    const png = await readFile(new URL(diagram.png, import.meta.url));
    assert.deepEqual(png.subarray(0, pngSignature.length), pngSignature);
  }
});
```

- [ ] **Step 2: Run the media contract to verify it fails**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/site-high-priority.test.mjs
```

Expected: `FAIL`; the existing Markdown still references `.pdf`, and the three `.png` files do not exist.

- [ ] **Step 3: Render each single-page PDF at 300 DPI**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm -png -r 300 -singlefile assets/img/bris/enc-proc-dec.pdf assets/img/bris/enc-proc-dec
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm -png -r 300 -singlefile assets/img/bris/model.pdf assets/img/bris/model
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm -png -r 300 -singlefile assets/img/stretched_grid/gnn.pdf assets/img/stretched_grid/gnn
```

Expected: each command exits `0` and creates the exact `.png` path listed above without modifying its source PDF.

- [ ] **Step 4: Update only the three image source extensions**

Change the affected lines to:

```html
<img src="/assets/img/bris/enc-proc-dec.png" alt="Model schematic" style="width: 70%;">
<img src="/assets/img/bris/model.png" alt="Model schematic" style="width: 90%;">
<img src="/assets/img/stretched_grid/gnn.png" alt="GNN" style="width: 70%;">
```

Retain the surrounding indentation, captions, and post content.

- [ ] **Step 5: Run the media contract to verify it passes**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/site-high-priority.test.mjs
```

Expected: `PASS`; one test passes and zero fail.

- [ ] **Step 6: Inspect all three PNGs visually**

Open each generated PNG with the workspace image viewer and confirm the complete page is visible, the diagrams are sharp, text is legible, and there is no clipping, overlap, black rectangle, or missing glyph.

- [ ] **Step 7: Commit the media repair**

```bash
git add tests/site-high-priority.test.mjs _posts/2026-01-19-bris.md _posts/2024-09-12-stretched-grid.md assets/img/bris/enc-proc-dec.png assets/img/bris/model.png assets/img/stretched_grid/gnn.png
git commit -m "fix: restore diagram images"
```

### Task 2: Correct header spacing at the intermediate desktop breakpoint

**Files:**
- Modify: `tests/site-high-priority.test.mjs`
- Modify: `assets/css/beautifuljekyll.css:755`

- [ ] **Step 1: Add the failing responsive-header contract test**

Append this test after the media test in `tests/site-high-priority.test.mjs`:

```javascript
test('intermediate desktop navigation leaves room for page headers', async () => {
  const css = await readFile(
    new URL('../assets/css/beautifuljekyll.css', import.meta.url),
    'utf8',
  );
  const breakpoint = css.match(
    /@media \(min-width: 1200px\) and \(max-width: 1399\.98px\) \{([\s\S]*?)\n\}/,
  );

  assert.ok(breakpoint, 'expected a rule scoped to the broken 1200-1399.98px range');
  assert.match(breakpoint[1], /\.intro-header \{\s*margin-top: 14\.125rem;\s*\}/);
  assert.match(breakpoint[1], /\.intro-header\.big-img \{\s*margin-top: 5\.6875rem;/);
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test --test-name-pattern="intermediate desktop" tests/site-high-priority.test.mjs
```

Expected: `FAIL` with `expected a rule scoped to the broken 1200-1399.98px range`.

- [ ] **Step 3: Add the targeted CSS rule**

Immediately before the existing `@media (min-width: 1400px)` intro-header block, add:

```css
@media (min-width: 1200px) and (max-width: 1399.98px) {
  .intro-header {
    margin-top: 14.125rem;
  }
  .intro-header.big-img {
    margin-top: 5.6875rem;
  }
}
```

- [ ] **Step 4: Run the responsive-header test to verify it passes**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test --test-name-pattern="intermediate desktop" tests/site-high-priority.test.mjs
```

Expected: `PASS`; one matching test passes, the non-matching media test is skipped, and zero tests fail.

- [ ] **Step 5: Run the complete contract test**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/site-high-priority.test.mjs
```

Expected: `PASS`; two tests pass and zero fail.

- [ ] **Step 6: Commit the responsive correction**

```bash
git add tests/site-high-priority.test.mjs assets/css/beautifuljekyll.css
git commit -m "fix: prevent desktop header overlap"
```

### Task 3: Configure absolute production URLs

**Files:**
- Modify: `tests/site-high-priority.test.mjs`
- Modify: `_config.yml:16`

- [ ] **Step 1: Add the failing production-origin contract test**

Append this test after the responsive-header test in `tests/site-high-priority.test.mjs`:

```javascript
test('Jekyll has the canonical HTTPS production origin', async () => {
  const config = await readFile(new URL('../_config.yml', import.meta.url), 'utf8');
  assert.match(config, /^url:\s*["']https:\/\/evennordhagen\.com["']\s*$/m);
});
```

- [ ] **Step 2: Run the production-origin test to verify it fails**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test --test-name-pattern="canonical HTTPS" tests/site-high-priority.test.mjs
```

Expected: `FAIL`; `_config.yml` does not yet declare `url`.

- [ ] **Step 3: Declare the canonical origin**

Under the `# --- Required options --- #` heading and before `title`, add:

```yaml
# Canonical production origin used by SEO metadata, feeds, and sitemaps
url: "https://evennordhagen.com"
```

Do not add a non-empty `baseurl`; the custom domain serves the site at `/`.

- [ ] **Step 4: Run the production-origin test to verify it passes**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test --test-name-pattern="canonical HTTPS" tests/site-high-priority.test.mjs
```

Expected: `PASS`; one matching test passes, two non-matching tests are skipped, and zero tests fail.

- [ ] **Step 5: Run the complete contract test**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/site-high-priority.test.mjs
```

Expected: `PASS`; three tests pass and zero fail.

- [ ] **Step 6: Commit the production URL configuration**

```bash
git add tests/site-high-priority.test.mjs _config.yml
git commit -m "fix: configure canonical site URL"
```

### Task 4: Verify the complete high-priority repair

**Files:**
- Verify: all files changed in Tasks 1-3
- Do not modify: the pre-existing untracked build outputs and personal assets

- [ ] **Step 1: Run the complete Node test suite**

Run:

```bash
/Users/evenmn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.mjs
```

Expected: all existing tests and the three new contract tests pass with zero failures.

- [ ] **Step 2: Check patch hygiene and scope**

Run:

```bash
git diff --check HEAD~3..HEAD
git status --short
git diff --stat HEAD~3..HEAD
```

Expected: `git diff --check` prints nothing; status lists only the user's pre-existing untracked files; the three commits contain the test, three PNGs, three Markdown references, one CSS rule, and one config entry.

- [ ] **Step 3: Attempt a temporary Jekyll build and verify generated URLs**

Run:

```bash
site_verify_root="$(mktemp -d)"
site_verify_dir="$site_verify_root/site"
bundle exec jekyll build --destination "$site_verify_dir" && \
  rg -n 'rel="canonical"|property="og:url"' "$site_verify_dir/index.html" && \
  rg -n '<loc>https://evennordhagen\.com/' "$site_verify_dir/sitemap.xml"
```

Expected when the repository's Ruby environment is configured: exit `0`; canonical and Open Graph URLs use `https://evennordhagen.com/`, and sitemap locations begin with the same origin. If the known local Bundler/Ruby mismatch blocks the build, record the exact error, rely on the passing source contract, and do not change or commit `Gemfile.lock`, `vendor/`, `_site/`, or nested `_site/` directories.

- [ ] **Step 4: Review the final commits**

Run:

```bash
git log --oneline -4
git show --stat --oneline HEAD~3..HEAD
```

Expected: the design commit is followed by three focused fix commits; no unrelated user files are included.
