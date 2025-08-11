import type { NextApiRequest, NextApiResponse } from "next";
import { countTable, getSampleForParticipant } from "@/lib/eval/repo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const participantId = (req.query.participantId as string) || undefined;

    const [participants, sessions, questions, responses] = await Promise.all([
      countTable("participants"),
      countTable("sessions"),
      countTable("questions"),
      countTable("responses"),
    ]);

    const sample = participantId ? await getSampleForParticipant(participantId) : {};

    return res.status(200).json({ ok: true, counts: { participants, sessions, questions, responses }, sample });
  } catch (err: any) {
    console.error("/api/eval/debug error", err);
    return res.status(500).json({ ok: false, error: err?.message || String(err) });
  }
}
