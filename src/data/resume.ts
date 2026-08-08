// Bump RESUME_VERSION whenever public/resume.pdf is replaced so
// browsers/CDN don't keep serving a stale cached copy.
const RESUME_VERSION = "2026-08-08";

export const RESUME_HREF = `/resume.pdf?v=${RESUME_VERSION}`;
export const RESUME_DOWNLOAD_NAME = "Yu-Chien-Chen-Resume.pdf";
