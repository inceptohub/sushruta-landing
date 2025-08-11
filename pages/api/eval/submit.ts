import type { NextApiRequest, NextApiResponse } from "next";
import { upsertParticipant, markSessionEnded } from "@/lib/eval/repo";

// Payload shape replicated from the client page
export type EvalChoice = "A" | "B" | "tie" | "neither";
export type Submission = {
  participant: {
    email?: string;
    specialty?: string;
    years?: string;
    region?: string;
  };
  responses: Array<{
    id: string;
    choice: EvalChoice | null;
    feedback?: string;
  }>;
  pairing?: Array<{
    id: string;
    sourceA: "Answer" | "AnswerByLLM";
    sourceB: "Answer" | "AnswerByLLM";
    questionText: string;
  }>;
  sessionId?: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = req.body as Submission;

    // basic validation
    if (!body || !Array.isArray(body.responses)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const email = (body?.participant?.email || "").trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Upsert participant
    await upsertParticipant({
      email,
      specialty: body.participant?.specialty,
      years: body.participant?.years,
      region: body.participant?.region,
    });

    // If a session is provided, mark it ended
    if (body.sessionId) {
      await markSessionEnded(body.sessionId, email);
    }

    // Build a record envelope with server metadata
    const record = {
      timestamp: new Date().toISOString(),
      participant: body.participant ?? {},
      responses: body.responses,
      pairing: body.pairing ?? [],
      // light-weight request metadata for audit
      ua: req.headers["user-agent"] || null,
      referer: req.headers.referer || req.headers.origin || null,
      ip:
        // next behind proxies
        (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        null,
    };

    // Optionally forward to Google Sheets if configured
    const SHEETS_WEB_APP_URL = process.env.SHEETS_WEB_APP_URL;
    if (SHEETS_WEB_APP_URL) {
      const gRes = await fetch(SHEETS_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!gRes.ok) {
        const text = await gRes.text();
        return res
          .status(502)
          .json({ error: "Sheets webhook failed", status: gRes.status, body: text });
      }
      // Try to parse response if JSON; otherwise just acknowledge
      let data: any = null;
      const ct = gRes.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        try {
          data = await gRes.json();
        } catch {}
      } else {
        try {
          data = await gRes.text();
        } catch {}
      }
      return res.status(200).json({ ok: true, sheets: data ?? null });
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("/api/eval/submit error", err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
