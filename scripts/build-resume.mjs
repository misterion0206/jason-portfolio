/**
 * Generates public/resume.pdf from resume/resume.html.
 *
 *   npm run resume:build
 *
 * Deliberately dependency-free: no Puppeteer, no PDF library, nothing added to
 * package.json. It substitutes {{placeholders}} in the template from
 * src/data/profile.ts, then drives an already-installed Chrome/Edge in headless
 * mode via --print-to-pdf. Chrome subsets and embeds the fonts it uses, emits
 * /Link annotations for every <a href>, takes the page size from the
 * stylesheet's @page rule, and writes the <title> into the PDF /Title field.
 *
 * Override the browser with CHROME_PATH=/path/to/chrome if auto-detection fails.
 */

import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = path.join(repoRoot, "resume", "resume.html");
const outputPath = path.join(repoRoot, "public", "resume.pdf");

/** Chrome/Edge locations by platform, in preference order. */
const BROWSER_CANDIDATES = {
  win32: [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ],
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ],
  linux: [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/microsoft-edge",
  ],
};

function resolveBrowser() {
  if (process.env.CHROME_PATH) {
    if (!existsSync(process.env.CHROME_PATH)) {
      throw new Error(`CHROME_PATH is set but does not exist: ${process.env.CHROME_PATH}`);
    }
    return process.env.CHROME_PATH;
  }

  const found = (BROWSER_CANDIDATES[process.platform] ?? []).find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      "Could not find Chrome or Edge. Install one, or set CHROME_PATH to its executable.",
    );
  }
  return found;
}

/**
 * Values available to the template. Everything identity-related comes from
 * src/data/profile.ts so the resume can never drift from the website.
 */
async function buildReplacements() {
  const profileModule = await import(
    pathToFileURL(path.join(repoRoot, "src", "data", "profile.ts")).href
  );
  const { profile, professionalSummary } = profileModule;

  return {
    metaTitle: `${profile.legalName} - ${profile.title}`,
    nameUpper: "YU-CHIEN (JASON) CHEN",
    titleUpper: profile.titleUpper,
    location: profile.location,
    email: profile.email,
    phoneDisplay: profile.phoneDisplay,
    siteUrl: profile.siteUrl,
    siteDisplay: profile.siteDisplay,
    linkedinUrl: profile.linkedinUrl,
    linkedinDisplay: profile.linkedinDisplay,
    githubUrl: profile.githubUrl,
    githubDisplay: profile.githubDisplay,
    summary: professionalSummary,
  };
}

function render(template, replacements) {
  const rendered = template.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    if (!(key in replacements)) {
      throw new Error(`Template placeholder {{${key}}} has no value in profile data.`);
    }
    return String(replacements[key]);
  });

  const leftover = rendered.match(/\{\{\w+\}\}/g);
  if (leftover) {
    throw new Error(`Unsubstituted placeholders remain: ${leftover.join(", ")}`);
  }
  return rendered;
}

/**
 * The resume must stay exactly one US-Letter page. Content creep is the most
 * likely way to break that, so fail the build rather than ship a 2-page PDF.
 */
async function assertSinglePageLetter(pdfPath) {
  const bytes = await readFile(pdfPath);
  const pageCount = (bytes.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;

  const mediaBoxes = new Set(bytes.toString("latin1").match(/\/MediaBox\s*\[[^\]]*\]/g) ?? []);
  const letterish = [...mediaBoxes].every((box) => {
    const [x0, y0, x1, y1] = box.match(/-?[\d.]+/g).map(Number);
    return Math.abs(x1 - x0 - 612) < 1 && Math.abs(y1 - y0 - 792) < 1;
  });

  if (pageCount !== 1) {
    throw new Error(
      `resume.pdf is ${pageCount} pages — it must be exactly 1. Trim content in ` +
        `resume/resume.html (shorten a bullet or tighten spacing) and rebuild. ` +
        `Do not shrink the body text below 10pt.`,
    );
  }
  if (!letterish || mediaBoxes.size === 0) {
    throw new Error(
      `resume.pdf page size is not US Letter (612x792pt): ${[...mediaBoxes].join(", ") || "none"}`,
    );
  }
  console.log("Verified: 1 page, US Letter (612x792pt).");
}

async function main() {
  const browser = resolveBrowser();
  const template = await readFile(templatePath, "utf8");
  const html = render(template, await buildReplacements());

  // Chrome needs the page on disk; a temp dir also isolates the throwaway
  // user-data-dir so we never touch the developer's real Chrome profile.
  const workDir = await mkdtemp(path.join(tmpdir(), "resume-pdf-"));
  const htmlPath = path.join(workDir, "resume.html");
  await writeFile(htmlPath, html, "utf8");

  try {
    await execFileAsync(
      browser,
      [
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--no-first-run",
        `--user-data-dir=${path.join(workDir, "profile")}`,
        // Page geometry comes from the @page rule in resume.html.
        "--no-pdf-header-footer",
        "--print-to-pdf-no-header",
        `--print-to-pdf=${outputPath}`,
        pathToFileURL(htmlPath).href,
      ],
      { timeout: 120_000, maxBuffer: 10 * 1024 * 1024 },
    );
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }

  if (!existsSync(outputPath)) {
    throw new Error("Chrome exited without writing public/resume.pdf.");
  }

  await assertSinglePageLetter(outputPath);

  const { size } = await stat(outputPath);
  console.log(`Wrote ${path.relative(repoRoot, outputPath)} (${(size / 1024).toFixed(1)} KB)`);
  console.log("Next: bump RESUME_VERSION in src/data/resume.ts, then verify the PDF.");
}

main().catch((error) => {
  console.error(`resume:build failed — ${error.message}`);
  process.exitCode = 1;
});
