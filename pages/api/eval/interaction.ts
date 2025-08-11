import type { NextApiRequest, NextApiResponse } from "next";
import {
  upsertParticipant,
  ensureSession,
  upsertQuestion,
  upsertResponse,
} from "@/lib/eval/repo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = req.body as {
      participant: { email: string; name?: string; specialty?: string; years?: string; region?: string };
      sessionId: string;
      question: { id: string; text: string; optionA: string; optionB: string };
      pairing?: { id: string; sourceA: "Answer" | "AnswerByLLM"; sourceB: "Answer" | "AnswerByLLM"; questionText: string };
      choice: "A" | "B" | "tie" | "neither" | null;
      feedback?: string;
      timeStarted?: string | null;
      timeSpentMs?: number | null;
    };

    const email = (body?.participant?.email || "").trim().toLowerCase();
    if (!email) return res.status(400).json({ error: "Email required" });
    if (!body.sessionId) return res.status(400).json({ error: "sessionId required" });

    const participantId = await upsertParticipant({
      email,
      name: body.participant.name,
      specialty: body.participant.specialty,
      years: body.participant.years,
      region: body.participant.region,
    });

    // ensure session exists (or create minimal)
    await ensureSession(participantId, body.sessionId, {
      ua: (req.headers["user-agent"] as string) || null,
      referer: ((req.headers.referer as string) || (req.headers.origin as string)) ?? null,
      ip:
        ((req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
          req.socket.remoteAddress ||
          null) as string | null,
    });

    // upsert question and response
    await upsertQuestion(
      {
        id: body.question.id,
        text: body.question.text,
        optionA: body.question.optionA,
        optionB: body.question.optionB,
      },
      { sourceA: body.pairing?.sourceA ?? null, sourceB: body.pairing?.sourceB ?? null },
    );

    await upsertResponse({
      sessionId: body.sessionId,
      participantId,
      question: {
        id: body.question.id,
        text: body.question.text,
        optionA: body.question.optionA,
        optionB: body.question.optionB,
      },
      pairing: { sourceA: body.pairing?.sourceA ?? null, sourceB: body.pairing?.sourceB ?? null },
      choice: body.choice,
      feedback: body.feedback,
      timeStarted: body.timeStarted ?? null,
      timeSpentMs: body.timeSpentMs ?? null,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("/api/eval/interaction error", err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
