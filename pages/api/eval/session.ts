import type { NextApiRequest, NextApiResponse } from "next";
import { ensureSession, upsertParticipant } from "@/lib/eval/repo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
    }

  try {
    const body = req.body as {
      participant: {
        name?: string;
        email: string;
        specialty?: string;
        years?: string;
        region?: string;
      };
      sessionId?: string | null;
      appVersion?: string | null;
      questionSetVersion?: number | null;
      randomSeed?: number | null;
    };

    const email = (body?.participant?.email || "").trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Upsert participant and ensure session via shared repo
    const participantId = await upsertParticipant({
      email,
      name: body.participant.name,
      specialty: body.participant.specialty,
      years: body.participant.years,
      region: body.participant.region,
    });

    const sessionId = await ensureSession(participantId, body.sessionId || null, {
      appVersion: body.appVersion ?? null,
      questionSetVersion: body.questionSetVersion ?? null,
      randomSeed: body.randomSeed ?? null,
      ua: (req.headers["user-agent"] as string) || null,
      referer: ((req.headers.referer as string) || (req.headers.origin as string)) ?? null,
      ip:
        ((req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
          req.socket.remoteAddress ||
          null) as string | null,
    });

    return res.status(200).json({ ok: true, participantId, sessionId });
  } catch (err: any) {
    console.error("/api/eval/session error", err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
