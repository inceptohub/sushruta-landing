import fs from "node:fs/promises";
import path from "node:path";

function stripDisclaimer(text: string): string {
  if (!text) return "";
  const patterns = [
    /\*\*?\s*IMPORTANT MEDICAL DISCLAIMER[:\s\-]*\*\*?/i,
    /IMPORTANT\s+MEDICAL\s+DISCLAIMER/i,
  ];
  let idx = -1;
  for (const re of patterns) {
    const m = text.match(re);
    if (m && m.index !== undefined) {
      idx = m.index;
      break;
    }
  }
  if (idx === -1) return text.trim();
  return text.slice(0, idx).trim();
}

async function main() {
  const file = path.join(process.cwd(), "public", "malaria-evaluation-results.json");
  const backup = path.join(process.cwd(), "public", "malaria-evaluation-results.backup.json");

  const raw = await fs.readFile(file, "utf8");
  await fs.writeFile(backup, raw, "utf8");

  let data: any;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    process.exit(1);
  }

  // Results can be an array or { results: [...] }
  const results: any[] = Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : [];

  let modified = 0;
  for (const r of results) {
    if (typeof r.answer === "string") {
      const newA = stripDisclaimer(r.answer);
      if (newA !== r.answer) {
        r.answer = newA;
        modified++;
      }
    }
    if (typeof r.answerByLLM === "string") {
      const newB = stripDisclaimer(r.answerByLLM);
      if (newB !== r.answerByLLM) {
        r.answerByLLM = newB;
        modified++;
      }
    }
  }

  const output = Array.isArray(data) ? results : { ...data, results };
  await fs.writeFile(file, JSON.stringify(output, null, 2) + "\n", "utf8");

  console.log(`Sanitized ${modified} field(s). Backup saved to ${path.relative(process.cwd(), backup)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
