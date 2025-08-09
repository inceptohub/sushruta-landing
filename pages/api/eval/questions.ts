import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const override = process.env.MALARIA_RESULTS_PATH;
    const defaultPath = path.resolve(process.cwd(), "../sushruta-be/malaria-evaluation-results.json");
    const filePath = override || defaultPath;

    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    const results: any[] = Array.isArray(data) ? data : (data.results || []);

    const questions: Array<{ id: string; text: string; optionA: string; optionB: string }>= [];
    const pairing: Array<{ id: string; sourceA: "Answer"|"AnswerByLLM"; sourceB: "Answer"|"AnswerByLLM"; questionText: string }>= [];

    results.forEach((r, i) => {
      const qText = r.question || r.query || r.text || `Question ${i + 1}`;
      const ans1 = r.answer ?? "";
      const ans2 = r.answerByLLM ?? "";
      if (!qText || (!ans1 && !ans2)) return;

      const flip = Math.random() < 0.5;
      const id = r.id?.toString?.() || `q${i + 1}`;
      const optionA = flip ? ans1 : ans2;
      const optionB = flip ? ans2 : ans1;
      const sourceA = flip ? "Answer" : "AnswerByLLM";
      const sourceB = flip ? "AnswerByLLM" : "Answer";

      questions.push({ id, text: qText, optionA, optionB });
      pairing.push({ id, sourceA, sourceB, questionText: qText });
    });

    return res.status(200).json({ questions, pairing, count: questions.length, source: filePath });
  } catch (err: any) {
    console.error("/api/eval/questions error", err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
