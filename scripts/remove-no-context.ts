import fs from "node:fs/promises";
import path from "node:path";

function containsNoContext(text: unknown): boolean {
  if (typeof text !== "string") return false;
  return /provided\s+context\s+does\s+not\s+contain/i.test(text);
}

function extractItems(data: any): { container: any; key?: string; items: any[] } {
  if (Array.isArray(data)) {
    return { container: data, items: data };
  }
  const keys = Object.keys(data || {});
  for (const k of keys) {
    if (Array.isArray((data as any)[k])) {
      return { container: data, key: k, items: (data as any)[k] };
    }
  }
  throw new Error("Could not find an array of items in the input JSON");
}

async function main() {
  const file = path.join(process.cwd(), "public", "malaria-evaluation-results.json");
  const backup = path.join(process.cwd(), "public", "malaria-evaluation-results.nocontext.backup.json");

  const raw = await fs.readFile(file, "utf8");
  await fs.writeFile(backup, raw, "utf8");

  let data: any;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    process.exit(1);
  }

  const { container, key, items } = extractItems(data);
  const total = items.length;

  const kept = items.filter((it: any) => {
    const bad = containsNoContext(it?.answer) || containsNoContext(it?.answerByLLM);
    return !bad;
  });

  const removed = total - kept.length;

  const output = Array.isArray(container) ? kept : { ...container, [key as string]: kept };
  await fs.writeFile(file, JSON.stringify(output, null, 2) + "\n", "utf8");

  console.log(`Removed ${removed} of ${total} item(s) where answer or answerByLLM indicated missing context.`);
  console.log(`Backup saved to ${path.relative(process.cwd(), backup)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
