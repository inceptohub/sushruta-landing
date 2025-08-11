/*
 Verifies Drizzle connection and basic inserts/selects.
 Requires:
 - DRIZZLE_DB_URL in env (e.g., postgresql://postgres:ENCODED_PASSWORD@HOST:5432/postgres?sslmode=require)
 - Run after `pnpm drizzle:push`

 Run: pnpm -s tsx scripts/drizzle-test.ts
*/
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { and, eq, count } from "drizzle-orm";
import {
  participants,
  sessions,
  questions,
  responses,
} from "../drizzle/schema";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  const url = process.env.DRIZZLE_DB_URL;
  if (!url) throw new Error("DRIZZLE_DB_URL not set");
  const client = postgres(url, { prepare: false, max: 1 });
  const db = drizzle(client);

  const pid = "drizzle-test@example.com";
  const sid = "00000000-0000-0000-0000-0000000000dd"; // deterministic
  const qid = "q-drizzle";

  console.log("Upserting participant...");
  await db
    .insert(participants)
    .values({
      participantId: pid,
      email: pid,
      name: "Drizzle Tester",
      region: "India",
    })
    .onConflictDoUpdate({
      target: participants.participantId,
      set: { updatedAt: new Date() },
    });

  console.log("Ensuring session...");
  try {
    await db
      .insert(sessions)
      .values({ sessionId: sid as any, participantId: pid });
  } catch {}

  console.log("Ensuring question...");
  try {
    await db.insert(questions).values({
      questionId: qid,
      promptText: "Drizzle prompt",
      optionAText: "A1",
      optionBText: "B1",
      sourceAId: "Answer",
      sourceBId: "AnswerByLLM",
    });
  } catch {}

  console.log("Upserting response...");
  await db
    .insert(responses)
    .values({
      responseId: `${sid}:${qid}`,
      sessionId: sid as any,
      participantId: pid,
      questionId: qid,
      shownOrder: "A|B",
      choice: "A",
      feedbackText: "Looks good",
      timeStarted: new Date(Date.now() - 3000) as any,
      timeSpentMs: 3000,
    })
    .onConflictDoUpdate({
      target: responses.responseId,
      set: { updatedAt: new Date(), feedbackText: "Looks great" },
    });

  console.log("Counts...");
  const [pc] = await db.select({ c: count() }).from(participants);
  const [sc] = await db.select({ c: count() }).from(sessions);
  const [qc] = await db.select({ c: count() }).from(questions);
  const [rc] = await db.select({ c: count() }).from(responses);
  console.log({
    participants: pc.c,
    sessions: sc.c,
    questions: qc.c,
    responses: rc.c,
  });

  console.log("Sample...");
  const rows = await db
    .select()
    .from(responses)
    .where(and(eq(responses.participantId, pid), eq(responses.questionId, qid)))
    .limit(1);
  console.log(rows[0]);

  await client.end({ timeout: 1 });
  console.log("OK");
}

main().catch(async (e) => {
  console.error("DRIZZLE TEST FAILED:", e);
  process.exit(1);
});
