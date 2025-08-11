import type { NextApiRequest, NextApiResponse } from "next";
import { getProgress as getEvalProgress } from "@/lib/eval/repo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const {
      participant,
      email: rawEmail,
      sessionId: requestedSid,
    } = req.body || {};
    const email: string | undefined = participant?.email || rawEmail;
    if (!email)
      return res.status(400).json({ ok: false, error: "email required" });

    // In our design, participant_id == email
    const participantId = email;

    const { sessionId, answeredIds, lastUpdatedId } = await getEvalProgress(
      participantId,
      requestedSid || null,
    );

    return res.status(200).json({ ok: true, sessionId, answeredIds, lastUpdatedId });
  } catch (err: any) {
    console.error("/api/eval/progress error", err);
    return res
      .status(500)
      .json({ ok: false, error: err?.message || String(err) });
  }
}
