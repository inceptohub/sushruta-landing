import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { v4 as uuidv4 } from "uuid";
import crypto from "node:crypto";

export type Participant = {
  email: string;
  name?: string;
  specialty?: string;
  years?: string;
  region?: string;
};

export type SessionMeta = {
  appVersion?: string | null;
  questionSetVersion?: number | null;
  randomSeed?: number | null;
  ua?: string | null;
  referer?: string | null;
  ip?: string | null;
};

export type QuestionDef = {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
};

export type Pairing = {
  sourceA?: "Answer" | "AnswerByLLM" | null;
  sourceB?: "Answer" | "AnswerByLLM" | null;
};

export async function upsertParticipant(p: Participant): Promise<string> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  const email = (p.email || "").trim().toLowerCase();
  if (!email) throw new Error("Email required");
  const participantId = email; // identity

  const { error } = await supabase
    .from("participants")
    .upsert(
      {
        participant_id: participantId,
        name: p.name ?? null,
        email,
        specialty: p.specialty ?? null,
        years_practice: p.years ?? null,
        region: p.region ?? null,
        consent: true,
      },
      { onConflict: "participant_id" },
    );
  if (error) throw new Error(error.message);

  return participantId;
}

export async function ensureSession(
  participantId: string,
  sessionId: string | null | undefined,
  meta: SessionMeta = {},
): Promise<string> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  let sid = sessionId || null;
  if (sid) {
    const { data: s, error: sErr } = await supabase
      .from("sessions")
      .select("session_id")
      .eq("session_id", sid)
      .single();
    if (sErr || !s) sid = null;
  }

  if (!sid) {
    sid = uuidv4();
    const { error: insErr } = await supabase.from("sessions").insert({
      session_id: sid,
      participant_id: participantId,
      app_version: meta.appVersion ?? null,
      question_set_version: meta.questionSetVersion ?? null,
      random_seed: meta.randomSeed ?? null,
      ua: meta.ua ?? null,
      referer: meta.referer ?? null,
      ip: meta.ip ?? null,
    });
    if (insErr) throw new Error(insErr.message);
  } else {
    const { error: updErr } = await supabase
      .from("sessions")
      .update({
        app_version: meta.appVersion ?? null,
        question_set_version: meta.questionSetVersion ?? null,
        random_seed: meta.randomSeed ?? null,
        ua: meta.ua ?? null,
        referer: meta.referer ?? null,
        ip: meta.ip ?? null,
      })
      .eq("session_id", sid);
    if (updErr) throw new Error(updErr.message);
  }

  return sid;
}

export async function upsertQuestion(q: QuestionDef, pairing?: Pairing | null): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  const { error } = await supabase
    .from("questions")
    .upsert(
      {
        question_id: q.id,
        prompt_text: q.text,
        optionA_text: q.optionA,
        optionB_text: q.optionB,
        sourceA_id: pairing?.sourceA ?? null,
        sourceB_id: pairing?.sourceB ?? null,
        active: true,
      },
      { onConflict: "question_id" },
    );
  if (error) throw new Error(error.message);
}

export async function upsertResponse(args: {
  sessionId: string;
  participantId: string;
  question: QuestionDef;
  pairing?: Pairing | null;
  choice: "A" | "B" | "tie" | "neither" | null;
  feedback?: string;
  timeStarted?: string | null;
  timeSpentMs?: number | null;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  const optionAHash = crypto.createHash("sha256").update(args.question.optionA || "").digest("hex");
  const optionBHash = crypto.createHash("sha256").update(args.question.optionB || "").digest("hex");
  const responseId = `${args.sessionId}:${args.question.id}`;

  const shownOrder = args.pairing
    ? args.pairing.sourceA === "Answer" && args.pairing.sourceB === "AnswerByLLM"
      ? "A|B"
      : args.pairing.sourceA === "AnswerByLLM" && args.pairing.sourceB === "Answer"
        ? "B|A"
        : "A|B"
    : "A|B";

  const { error } = await supabase
    .from("responses")
    .upsert(
      {
        response_id: responseId,
        session_id: args.sessionId,
        participant_id: args.participantId,
        question_id: args.question.id,
        shown_order: shownOrder,
        choice: args.choice ?? null,
        feedback_text: args.feedback ?? null,
        time_started: args.timeStarted ? new Date(args.timeStarted).toISOString() : null,
        time_spent_ms: args.timeSpentMs ?? null,
        sourceA_id_at_eval: args.pairing?.sourceA ?? null,
        sourceB_id_at_eval: args.pairing?.sourceB ?? null,
        optionA_text_hash: optionAHash,
        optionB_text_hash: optionBHash,
      },
      { onConflict: "response_id" },
    );
  if (error) throw new Error(error.message);
}

export async function markSessionEnded(sessionId: string, participantId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  const { error } = await supabase
    .from("sessions")
    .update({ ended_at: new Date().toISOString() })
    .eq("session_id", sessionId)
    .eq("participant_id", participantId);
  if (error) throw new Error(error.message);
}

export async function resolveLatestSessionId(participantId: string): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  let sessionId: string | null = null;
  const { data: sessOpen, error: e1 } = await supabase
    .from("sessions")
    .select("session_id, created_at")
    .eq("participant_id", participantId)
    .is("ended_at", null)
    .order("created_at", { ascending: false })
    .limit(1);
  if (e1) throw new Error(e1.message);
  if (sessOpen && sessOpen.length > 0) sessionId = sessOpen[0].session_id;

  if (!sessionId) {
    const { data: sessAny, error: e2 } = await supabase
      .from("sessions")
      .select("session_id, created_at")
      .eq("participant_id", participantId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (e2) throw new Error(e2.message);
    if (sessAny && sessAny.length > 0) sessionId = sessAny[0].session_id;
  }

  return sessionId;
}

export async function getProgress(
  participantId: string,
  sessionId?: string | null,
): Promise<{ sessionId: string | null; answeredIds: string[]; lastUpdatedId: string | null }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  let sid = sessionId ?? null;
  if (!sid) sid = await resolveLatestSessionId(participantId);
  if (!sid) return { sessionId: null, answeredIds: [], lastUpdatedId: null };

  const { data: resp, error: rerr } = await supabase
    .from("responses")
    .select("question_id, choice, updated_at")
    .eq("participant_id", participantId)
    .eq("session_id", sid);
  if (rerr) throw new Error(rerr.message);

  const answeredIds = (resp || [])
    .filter((r: any) => r.choice != null)
    .map((r: any) => r.question_id as string);

  let lastUpdatedId: string | null = null;
  if (resp && resp.length > 0) {
    const sorted = [...resp].sort(
      (a: any, b: any) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime(),
    );
    lastUpdatedId = sorted[0]?.question_id ?? null;
  }

  return { sessionId: sid, answeredIds, lastUpdatedId };
}

// Debug helpers
export async function countTable(
  table: "participants" | "sessions" | "questions" | "responses",
): Promise<number> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  // Try RPC if exists
  try {
    const { data } = await supabase.rpc("_count_table", { _tbl: table });
    if (typeof data === "number") return data;
  } catch {
    // ignore, fallback below
  }

  const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function getSampleForParticipant(participantId: string): Promise<{
  participant: any;
  session: any;
  responses: any[];
}> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase admin not configured");

  const [pr, sr, rr] = await Promise.all([
    supabase.from("participants").select("*").eq("participant_id", participantId).limit(1),
    supabase
      .from("sessions")
      .select("*")
      .eq("participant_id", participantId)
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("responses")
      .select("*")
      .eq("participant_id", participantId)
      .order("updated_at", { ascending: false })
      .limit(3),
  ]);

  return {
    participant: pr.data?.[0] ?? null,
    session: sr.data?.[0] ?? null,
    responses: rr.data ?? [],
  };
}
