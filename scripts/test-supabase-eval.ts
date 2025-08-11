/*
 Simple test to verify Supabase insertions via local API.
 Requires dev server running at http://localhost:3000 and env vars configured for Supabase.
 Run: pnpm -s tsx scripts/test-supabase-eval.ts
*/

const base = process.env.TEST_BASE_URL || "http://localhost:3000";

async function post(path: string, body: any) {
  const res = await fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.error || text);
    return json;
  } catch (e) {
    if (!res.ok) throw new Error(text);
    throw e;
  }
}

async function get(path: string) {
  const res = await fetch(base + path);
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.error || text);
    return json;
  } catch (e) {
    if (!res.ok) throw new Error(text);
    throw e;
  }
}

async function main() {
  const participant = {
    email: "test-eval@example.com",
    name: "Test Eval",
    specialty: "internal-medicine",
    years: "3-5",
    region: "India",
  };

  console.log("Creating/ensuring session...");
  const s = await post("/api/eval/session", { participant });
  const sessionId = s.sessionId as string;
  if (!sessionId) throw new Error("No sessionId returned");
  console.log("sessionId:", sessionId);

  const question = {
    id: "q-test",
    text: "A test prompt for evaluation.",
    optionA: "Alpha option text",
    optionB: "Beta option text",
  };
  const pairing = {
    id: question.id,
    sourceA: "Answer" as const,
    sourceB: "AnswerByLLM" as const,
    questionText: question.text,
  };

  console.log("Recording interaction (choice A)...");
  await post("/api/eval/interaction", {
    participant,
    sessionId,
    question,
    pairing,
    choice: "A",
    feedback: "Looks good",
    timeStarted: new Date(Date.now() - 5000).toISOString(),
    timeSpentMs: 5000,
  });

  console.log("Recording interaction update (feedback only)...");
  await post("/api/eval/interaction", {
    participant,
    sessionId,
    question,
    pairing,
    choice: null,
    feedback: "Refined feedback",
    timeStarted: new Date(Date.now() - 8000).toISOString(),
    timeSpentMs: 8000,
  });

  console.log("Fetching debug counts and sample...");
  const dbg = await get(`/api/eval/debug?participantId=${encodeURIComponent(participant.email)}`);
  console.log(JSON.stringify(dbg, null, 2));

  console.log("Marking session ended...");
  const sub = await post("/api/eval/submit", { participant, sessionId });
  console.log("submit:", sub);

  console.log("OK");
}

main().catch((err) => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
