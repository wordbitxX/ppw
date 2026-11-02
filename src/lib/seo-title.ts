const SUFFIX = " | WordbitX";
const MAX = 58;
const BUDGET = MAX - SUFFIX.length; // 46

const DANGLING_RE =
  /(?:\s+(?:and|or|for|with|in|on|to|of|by|from|at|the|a|an|vs\.?|into|over|as|is|are|&)|\s*[|:;,/—–+-]+)$/i;

/**
 * Keeps rendered <title> tags inside ~58 characters so Google does not truncate
 * them mid-word in search results. Strips any existing "| WordbitX" (including
 * "| WordbitX Project Profile" / "| WordbitX Case Study") suffix first so
 * callers may pass either a bare title or an already-branded metaTitle without
 * double-branding, clips on a word boundary when needed, removes any dangling
 * trailing connectors/prepositions, and re-attaches the brand suffix.
 */
export function seoTitle(raw: string): string {
  const core = raw
    .replace(/(?:\s*\|\s*WordbitX(?:\s+(?:Project(?:\s+Profile)?|Case\s+Study))?)+\s*$/i, "")
    .trim();
  if (!core) return "WordbitX";
  if (core.length <= BUDGET) return `${core}${SUFFIX}`;

  let clipped = core.slice(0, BUDGET).replace(/\s+\S*$/, "");
  while (DANGLING_RE.test(clipped)) {
    clipped = clipped.replace(DANGLING_RE, "").trim();
  }
  clipped = clipped.replace(/\s*\|\s*(?:Buy|Get|How|Why|What|Which)$/i, "").trim();
  if (/:\s*Shared$/i.test(clipped) && /Shared\s+vs/i.test(core)) {
    clipped = clipped.replace(/:\s*Shared$/i, "").trim();
  }

  return `${clipped || core.slice(0, BUDGET).trim()}${SUFFIX}`;
}

/** Convenience wrapper for Next.js Metadata.title so layout template does not re-append "| WordbitX". */
export function seoTitleAbsolute(raw: string): { absolute: string } {
  return { absolute: seoTitle(raw) };
}
