# High-Priority Site Fixes Design

## Goal

Fix the three high-priority defects confirmed during the live-site audit:

1. Three diagrams fail to render because PDF files are used as `<img>` sources.
2. The fixed navigation overlaps page headings between 1200 and 1399 pixels wide.
3. Canonical, Open Graph, sitemap, RSS, and social-sharing URLs are generated as relative URLs.

The changes must preserve the current visual style, existing source PDFs, and the site's custom-domain deployment.

## Media conversion

Convert the first and only page of each affected PDF to a high-resolution PNG:

- `assets/img/bris/enc-proc-dec.pdf` → `assets/img/bris/enc-proc-dec.png`
- `assets/img/bris/model.pdf` → `assets/img/bris/model.png`
- `assets/img/stretched_grid/gnn.pdf` → `assets/img/stretched_grid/gnn.png`

The PNGs will preserve the full page, aspect ratio, and transparency or white background produced by the source document. The original PDFs will remain in the repository. Update only the three Markdown `<img>` references, retaining their existing alternative text, widths, and captions.

## Responsive header correction

The navigation switches to its large desktop presentation at 1200 pixels, but the larger header margins currently begin at 1400 pixels. Add a targeted media rule for widths from 1200 through 1399.98 pixels that applies the existing large-layout margins:

- Regular headers: `margin-top: 14.125rem`
- Cover-image headers: `margin-top: 5.6875rem`

The existing 1400-pixel rules remain responsible for larger heading fonts and cover-image padding. This isolates the correction to the broken range without changing mobile, tablet, or wide-desktop typography.

## Absolute production URLs

Add the canonical production origin to `_config.yml`:

```yaml
url: "https://evennordhagen.com"
```

Keep the base URL empty because the site is deployed at the root of the custom domain. Existing `absolute_url` filters and `jekyll-sitemap` will then generate absolute canonical, Open Graph, RSS, sitemap, and social-share URLs without template duplication.

## Regression coverage

Add a Node test dedicated to these site contracts. It will verify:

- No Markdown source embeds the three PDF diagrams as images.
- All three PNG replacements exist and have a valid PNG signature.
- The 1200–1399.98 pixel CSS rule contains both required header margins.
- `_config.yml` declares the canonical HTTPS origin.

Run the new test alone first to demonstrate the pre-fix failure, then run it after each minimal implementation step and finish with the full existing Node test suite. Where the local Ruby toolchain permits, build Jekyll into a temporary destination and verify that canonical and sitemap URLs are absolute. If the repository's unconfigured local Ruby still blocks that build, validate generated URL behavior through the source contract test and report the environmental limitation explicitly.

## Scope boundaries

This change will not address lower-priority audit findings such as large GIF optimization, copy edits, MathJax migration, public development artifacts, or footer-profile cleanup. It will not delete or overwrite the original PDF diagrams.
