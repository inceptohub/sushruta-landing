import fs from "fs";
import path from "path";

const inputPath = path.resolve(process.cwd(), "public/malaria-evaluation-results.json");
const outputPath = path.resolve(process.cwd(), "public/malaria-evaluation-results.filtered.json");

function hasText(v: unknown): boolean {
  if (v == null) return false;
  const s = String(v).trim();
  return s.length > 0;
}

function resolveSentiment(item: any): string | undefined {
  // Be flexible: support several possible sentiment field names
  const candKeys = [
    "sentiment",
    "answerSentiment",
    "llmSentiment",
    "answerByLLMSentiment",
  ];
  for (const k of candKeys) {
    if (Object.prototype.hasOwnProperty.call(item, k) && hasText(item[k])) {
      return String(item[k]).trim();
    }
  }
  return undefined;
}

function keepItem(item: any): boolean {
  // User rule: keep if BOTH answers are provided and sentiment is NOT empty
  const hasAnswer = hasText(item?.answer);
  const hasLLM = hasText(item?.answerByLLM);
  const sentiment = resolveSentiment(item);
  return hasAnswer && hasLLM && !!sentiment;
}

function readJson(file: string): any {
  if (!fs.existsSync(file)) {
    throw new Error(`File not found: ${file}`);
  }
  const raw = fs.readFileSync(file, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${file}: ${(e as Error).message}`);
  }
}

function writeJson(file: string, data: any) {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(file, json, "utf8");
}

function extractItems(data: any): { container: any; key?: string; items: any[] } {
  // Support common shapes: an array root, or an object with a single array field
  if (Array.isArray(data)) {
    return { container: data, items: data };
  }
  // Try common keys
  const keys = Object.keys(data || {});
  for (const k of keys) {
    if (Array.isArray((data as any)[k])) {
      return { container: data, key: k, items: (data as any)[k] };
    }
  }
  throw new Error("Could not find an array of items in the input JSON");
}

function main() {
  try {
    const data = readJson(inputPath);
    const { container, key, items } = extractItems(data);

    const total = items.length;
    const kept = items.filter(keepItem);
    const removed = total - kept.length;

    // Preserve original shape
    let out: any;
    if (Array.isArray(container)) {
      out = kept;
    } else {
      out = { ...container, [key as string]: kept };
    }

    writeJson(outputPath, out);

    // Console summary
    console.log("Filter complete");
    console.log(`Total:   ${total}`);
    console.log(`Kept:    ${kept.length}`);
    console.log(`Removed: ${removed}`);
    console.log(`Output -> ${outputPath}`);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
}

// ESM-friendly execution guard
const isMain = import.meta.url === new URL(process.argv[1], "file://").href;
if (isMain) {
  main();
}
