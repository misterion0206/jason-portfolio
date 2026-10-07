// Bump RESUME_VERSION whenever public/resume.pdf is replaced so
// browsers/CDN don't keep serving a stale cached copy.
// Regenerate the PDF with `npm run resume:build` (source: resume/resume.html).
const RESUME_VERSION = "2026-10-07";

export const RESUME_HREF = `/resume.pdf?v=${RESUME_VERSION}`;
export const RESUME_DOWNLOAD_NAME = "Yu-Chien-Chen-DotNet-Software-Engineer-Resume.pdf";
