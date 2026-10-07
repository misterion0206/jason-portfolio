# Résumé source

`resume.html` is the source of truth for `public/resume.pdf`. Edit the HTML, never the PDF.

```bash
npm run resume:build
```

That renders `resume.html` (substituting values from `src/data/profile.ts`) and prints it to
`public/resume.pdf` with headless Chrome or Edge. No npm dependency is added for this — it shells
out to a browser you already have. Set `CHROME_PATH` if auto-detection fails.

After rebuilding, **bump `RESUME_VERSION` in `src/data/resume.ts`** to today's date so the
`?v=` cache-buster changes and visitors stop getting the old PDF.

## Design constraints

These exist to keep the PDF parseable by applicant tracking systems. Breaking one is usually
invisible on screen and only shows up as a mangled résumé inside a recruiter's ATS.

- **Exactly one US-Letter page.** The build fails otherwise.
- **Body text at 10pt.** Do not shrink text to win space — cut a bullet instead.
- **Single column.** No tables, sidebars, headshots, icons, skill bars, or multi-column text.
- **No `letter-spacing` on headings.** Chrome emits per-glyph positioning for tracked-out text,
  which extracts as `E D U C AT I O N` and breaks keyword matching. This bit us once already.
- **ASCII hyphens in date ranges.** `&ndash;`/`&mdash;` can extract as a replacement character,
  which confuses ATS date parsing.
- **Every link visible as a short URL** as well as being clickable, so the URL survives printing
  and plain-text extraction.
- **Only verified claims.** No technology, metric, employer, or date that cannot be backed up.

The right/left `.row` flex layout is deliberate: it right-aligns dates while keeping DOM order equal
to reading order, so extraction stays correct.

## Running out of space

Reclaim space in this order:

1. Shorten or drop the weakest bullet.
2. Tighten `.entry` / `h2` margins slightly.
3. Reduce the `@page` margin (currently `0.42in 0.5in`).

Do **not** drop the body font below 10pt.

## Verification checklist

`npm run resume:build` already enforces page count and page size. For a full check before sending
the résumé out:

```bash
# 1. Exactly one page, US Letter, and text in correct reading order
pdftotext public/resume.pdf -        # reading order; headings must not be letter-spaced

# 2. Page count / size / fonts / links / metadata
#    (any PDF inspector works; these are the properties that matter)
#    - exactly 1 page at 612x792pt
#    - all fonts embedded and subset (e.g. AAAAAA+ArialMT)
#    - /Subtype /Link annotations present for email, website, LinkedIn, GitHub
#    - /Title is "Yu-Chien Chen - .NET Full-Stack Software Engineer"

# 3. Render to an image and look at it — check for clipping, overlap,
#    awkward date wrapping, and crowding.
```

The download filename presented to visitors is set by `RESUME_DOWNLOAD_NAME` in
`src/data/resume.ts`, not by the file on disk.
