import React, { useEffect, useMemo, useRef, useState } from "react";
import type { GetStaticProps } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type EvalQuestion = {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
};

export type EvalChoice = "A" | "B" | "tie" | "neither";

export type Submission = {
  participant: {
    name?: string;
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
  // extra metadata we include when submitting
  pairing?: Array<{
    id: string;
    sourceA: "Answer" | "AnswerByLLM";
    sourceB: "Answer" | "AnswerByLLM";
    questionText: string;
  }>;
};

// Remove any appended IMPORTANT MEDICAL DISCLAIMER text from answers
function stripDisclaimer(text: string): string {
  if (!text) return "";
  const patterns = [
    /\*\*?\s*IMPORTANT MEDICAL DISCLAIMER[:\s\-]*\*\*?/i,
    /IMPORTANT\s+MEDICAL\s+DISCLAIMER/i,
  ];
  let idx = -1;
  for (const re of patterns) {
    const m = text.match(re);
    if (m && m.index !== undefined) {
      idx = m.index;
      break;
    }
  }
  if (idx === -1) return text.trim();
  return text.slice(0, idx).trim();
}

function useLocalState<T>(key: string, initial: T) {
  // Initialize with server-rendered default to avoid hydration mismatch
  const [state, setState] = useState<T>(initial);
  // After mount, hydrate from localStorage (if present)
  useEffect(() => {
    try {
      const v = window.localStorage.getItem(key);
      if (v != null) setState(JSON.parse(v) as T);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState] as const;
}

type EvalPageProps = {
  initialQuestions?: EvalQuestion[];
  initialPairing?: NonNullable<Submission["pairing"]>;
};

export default function EvaluationPage({
  initialQuestions = [],
  initialPairing = [],
}: EvalPageProps) {
  const [participant, setParticipant] = useLocalState<
    Submission["participant"]
  >("doc_eval_participant", {
    name: "",
    email: "",
    specialty: undefined,
    years: undefined,
    region: undefined,
  });

  const [questions, setQuestions] = useState<EvalQuestion[]>(
    initialQuestions.length
      ? initialQuestions
      : [
          {
            id: "q1",
            text: "A 28-year-old pregnant woman presents with fever and chills in a malaria endemic region. What is the best initial management?",
            optionA:
              "Empirical artesunate-based therapy after confirming pregnancy trimester and local resistance patterns.",
            optionB:
              "Delay treatment until smear confirms species and start chloroquine regardless of resistance.",
          },
          {
            id: "q2",
            text: "How should severe falciparum malaria be treated in adults?",
            optionA:
              "Initiate IV artesunate immediately with supportive care and monitor complications closely.",
            optionB:
              "Start oral artemisinin combination therapy and observe as outpatient.",
          },
        ],
  );

  const [pairing, setPairing] =
    useState<NonNullable<Submission["pairing"]>>(initialPairing);

  const [responses, setResponses] = useLocalState<Submission["responses"]>(
    "doc_eval_responses",
    questions.map((q) => ({ id: q.id, choice: null, feedback: "" })),
  );

  // Persist session id locally to associate interactions
  const [sessionId, setSessionId] = useLocalState<string | null>(
    "doc_eval_session_id",
    null,
  );
  const [emailError, setEmailError] = useState<string>("");

  const questionStartRef = useRef<number | null>(null);

  // re-seed responses if question set changes in length
  useEffect(() => {
    if (responses.length !== questions.length) {
      setResponses(
        questions.map((q) => ({ id: q.id, choice: null, feedback: "" })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length]);

  const [idx, setIdx] = useLocalState<number>("doc_eval_index", 0);
  const total = questions.length;

  const current = questions[idx];
  const currentResp = responses[idx];

  const setChoice = (choice: EvalChoice) => {
    const next = [...responses];
    next[idx] = { ...next[idx], choice };
    setResponses(next);
  };
  const setFeedback = (feedback: string) => {
    const next = [...responses];
    next[idx] = { ...next[idx], feedback };
    setResponses(next);
  };

  const go = (delta: number) => {
    setIdx((i) => Math.min(Math.max(i + delta, 0), total - 1));
  };

  const firstUnanswered = useMemo(
    () => responses.findIndex((r) => r.choice === null),
    [responses],
  );

  // Keyboard shortcuts: A/B/T/N, Left/Right, Cmd/Ctrl+Enter submit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === "TEXTAREA") return;
      if (e.key.toLowerCase() === "a") {
        setChoice("A");
        recordInteraction(idx, "A", responses[idx]?.feedback ?? "");
      }
      if (e.key.toLowerCase() === "b") {
        setChoice("B");
        recordInteraction(idx, "B", responses[idx]?.feedback ?? "");
      }
      if (e.key.toLowerCase() === "t") {
        setChoice("tie");
        recordInteraction(idx, "tie", responses[idx]?.feedback ?? "");
      }
      if (e.key.toLowerCase() === "n") {
        setChoice("neither");
        recordInteraction(idx, "neither", responses[idx]?.feedback ?? "");
      }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, responses]);

  // Track time spent per question
  useEffect(() => {
    questionStartRef.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const isValidEmail = (email?: string | null) =>
    !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Determine index to jump to based on answered set and last updated id
  const computeResumeIndex = (
    answeredIds: string[],
    lastUpdatedId: string | null,
  ) => {
    // Prefer first unanswered in current ordering
    const answered = new Set(answeredIds);
    const firstUn = questions.findIndex((q) => !answered.has(q.id));
    if (firstUn >= 0) return firstUn;
    // All answered: if lastUpdated exists, stay there; otherwise 0
    if (lastUpdatedId) {
      const li = questions.findIndex((q) => q.id === lastUpdatedId);
      if (li >= 0) return li;
    }
    return 0;
  };

  // Load last progress for an email and jump
  const loadProgress = async () => {
    try {
      if (!isValidEmail(participant.email)) return;
      const res = await fetch("/api/eval/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participant, sessionId }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as {
        ok: boolean;
        sessionId: string | null;
        answeredIds: string[];
        lastUpdatedId: string | null;
      };
      if (!data?.ok) return;
      if (data.sessionId) setSessionId(data.sessionId);
      const target = computeResumeIndex(data.answeredIds || [], data.lastUpdatedId || null);
      if (Number.isFinite(target)) setIdx(target as number);
    } catch (e) {
      // non-fatal
      console.warn("progress load failed", e);
    }
  };

  // When email becomes valid (or questions change), attempt resume
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isValidEmail(participant.email)) return;
      await loadProgress();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participant.email, questions.length]);

  const ensureSession = async () => {
    if (!isValidEmail(participant.email)) return null;
    try {
      const res = await fetch("/api/eval/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participant, sessionId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as {
        ok: boolean;
        participantId: string;
        sessionId: string;
      };
      if (data?.sessionId) setSessionId(data.sessionId);
      return data.sessionId;
    } catch (e) {
      console.error("ensureSession failed", e);
      return null;
    }
  };

  const recordInteraction = async (
    questionIdx: number,
    choice: EvalChoice | null,
    feedback?: string,
  ) => {
    try {
      // Require email to persist
      if (!isValidEmail(participant.email)) return;
      const sid = sessionId || (await ensureSession());
      if (!sid) return;
      const q = questions[questionIdx];
      if (!q) return;
      const pr = pairing?.find((p) => p.id === q.id);
      const startedAt = questionStartRef.current
        ? new Date(questionStartRef.current).toISOString()
        : null;
      const spent = questionStartRef.current
        ? Date.now() - questionStartRef.current
        : null;
      await fetch("/api/eval/interaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participant,
          sessionId: sid,
          question: q,
          pairing: pr,
          choice,
          feedback,
          timeStarted: startedAt,
          timeSpentMs: spent,
        }),
      });
    } catch (e) {
      console.error("recordInteraction failed", e);
    }
  };

  const handleSubmit = async () => {
    // Validate email before submit
    if (!isValidEmail(participant.email)) {
      setEmailError("Please enter a valid email to submit.");
      alert("Please enter a valid email to submit.");
      return;
    }
    const sid = sessionId || (await ensureSession());
    const payload: Submission = {
      participant,
      responses,
      pairing,
      // Include session id so server can mark end
      // @ts-expect-error: extended field supported by API
      sessionId: sid,
    };
    try {
      const res = await fetch("/api/eval/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      // Clear only answers; keep participant for convenience
      setResponses(
        questions.map((q) => ({ id: q.id, choice: null, feedback: "" })),
      );
      setIdx(0);
      alert("Thank you! Your evaluation has been recorded.");
    } catch (err: any) {
      console.error(err);
      alert("Submit failed: " + err?.message || String(err));
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 pb-28">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Sushrut Clinical Decision Support – Evaluation
        </h1>
        <p className="text-sm text-muted-foreground">
          You will see a clinical question and two anonymized options (A and B).
          Please select the better answer, or mark them as equally good or
          neither. We are building an accurate, safe, and localized clinical
          assistant for malaria care. Your expert feedback will help us improve.
        </p>
      </header>

      <section className="mb-6 rounded-2xl border bg-muted/40 p-4">
        <h2 className="mb-2 text-lg font-medium">Participant information</h2>
        <Card className="bg-card text-card-foreground">
          <CardContent>
            <div className="grid gap-4 p-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  value={participant.name ?? ""}
                  placeholder="e.g., John Doe"
                  onChange={(e) =>
                    setParticipant((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email (required)</Label>
                <Input
                  id="email"
                  type="email"
                  value={participant.email ?? ""}
                  placeholder="e.g., name@example.com"
                  required
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  onChange={(e) => {
                    const v = e.target.value;
                    setParticipant((p) => ({ ...p, email: v }));
                    if (!v) setEmailError("Email is required");
                    else if (!isValidEmail(v))
                      setEmailError("Enter a valid email address");
                    else setEmailError("");
                    // If email changes, force new session on next persist
                    setSessionId(null);
                  }}
                  onBlur={(e) => {
                    const v = e.target.value;
                    if (!v) setEmailError("Email is required");
                    else if (!isValidEmail(v))
                      setEmailError("Enter a valid email address");
                    else {
                      setEmailError("");
                      // attempt resume on blur when email becomes valid
                      loadProgress();
                    }
                  }}
                />
                {emailError ? (
                  <div id="email-error" className="text-xs text-red-600">
                    {emailError}
                  </div>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialty">Specialty (optional)</Label>
                <Select
                  value={participant.specialty ?? ""}
                  onValueChange={(v) =>
                    setParticipant((p) => ({ ...p, specialty: v }))
                  }
                >
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal-medicine">
                      Internal Medicine
                    </SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="obgyn">Ob/Gyn</SelectItem>
                    <SelectItem value="infectious-diseases">
                      Infectious Diseases
                    </SelectItem>
                    <SelectItem value="emergency">
                      Emergency Medicine
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="years">Years of practice (optional)</Label>
                <Select
                  value={participant.years ?? ""}
                  onValueChange={(v) =>
                    setParticipant((p) => ({ ...p, years: v }))
                  }
                >
                  <SelectTrigger id="years">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0–2</SelectItem>
                    <SelectItem value="3-5">3–5</SelectItem>
                    <SelectItem value="6-10">6–10</SelectItem>
                    <SelectItem value=">10">10+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="region">Region/Country (optional)</Label>
                <Input
                  id="region"
                  value={participant.region ?? ""}
                  placeholder="e.g., India"
                  onChange={(e) =>
                    setParticipant((p) => ({ ...p, region: e.target.value }))
                  }
                />
              </div>
              {/* additional fields are above; grid will wrap on small screens */}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Load questions section removed as data is embedded */}

      {/* Question card */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-4 text-base font-medium leading-relaxed">
            {/* Avoid hydration warning if any whitespace differs */}
            <span suppressHydrationWarning>{current?.text}</span>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-2">
            <OptionBlock
              label="Option A"
              body={current?.optionA ?? ""}
              selected={currentResp?.choice === "A"}
              onSelect={() => {
                setChoice("A");
                recordInteraction(idx, "A", currentResp?.feedback ?? "");
              }}
            />
            <OptionBlock
              label="Option B"
              body={current?.optionB ?? ""}
              selected={currentResp?.choice === "B"}
              onSelect={() => {
                setChoice("B");
                recordInteraction(idx, "B", currentResp?.feedback ?? "");
              }}
            />
          </div>

          <div className="mt-4">
            <Label className="mb-2 block text-sm">Pick the better option</Label>
            <RadioGroup
              value={(currentResp?.choice as string) ?? ""}
              onValueChange={(v) => {
                const c = v as EvalChoice;
                setChoice(c);
                recordInteraction(idx, c, currentResp?.feedback ?? "");
              }}
              className="grid gap-2 md:grid-cols-4"
            >
              <RadioRow value="A" label="Option A better" />
              <RadioRow value="B" label="Option B better" />
              <RadioRow value="tie" label="Both equally good" />
              <RadioRow value="neither" label="Neither is correct" />
            </RadioGroup>
          </div>

          <div className="mt-4">
            <Label htmlFor="feedback" className="mb-2 block text-sm">
              Optional feedback (what’s missing, unsafe, or excellent?)
            </Label>
            <Textarea
              id="feedback"
              value={currentResp?.feedback ?? ""}
              onChange={(e) => setFeedback(e.target.value)}
              onBlur={(e) => {
                recordInteraction(
                  idx,
                  currentResp?.choice ?? null,
                  e.target.value,
                );
              }}
              rows={5}
              placeholder="Write your comments (optional)"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              {firstUnanswered >= 0 ? (
                <button
                  className="underline"
                  onClick={() =>
                    firstUnanswered >= 0 && setIdx(firstUnanswered)
                  }
                >
                  Jump to first unanswered
                </button>
              ) : (
                <span>All questions answered</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => go(-1)}
                disabled={idx === 0}
              >
                Back
              </Button>
              {idx < total - 1 ? (
                <Button onClick={() => go(1)} disabled={!currentResp?.choice}>
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    responses.some((r) => r.choice === null) ||
                    !isValidEmail(participant.email)
                  }
                >
                  Submit All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        {/* sticky hint + safety for submit */}
        <div className="rounded-2xl bg-background/95 px-4 py-2 text-xs text-muted-foreground shadow-lg ring-1 ring-border backdrop-blur">
          Shortcuts: A/B = choose option, T = tie, N = neither, ←/→ = prev/next,
          ⌘/Ctrl+Enter = submit
        </div>
      </footer>
    </div>
  );
}

function OptionBlock({
  label,
  body,
  selected,
  onSelect,
}: {
  label: string;
  body: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const [html, setHtml] = useState<string>("");

  const stripLeadingEmptyBlocks = (s: string) => {
    if (!s) return s;
    // Remove leading empty <p>...</p> or <br> etc. and surrounding whitespace
    return s
      .replace(
        /^(\s*<(?:p|div)>\s*(?:&nbsp;|<br\s*\/>|<br>|\s)*<\/(?:p|div)>)+/i,
        "",
      )
      .trimStart();
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { marked } = await import("marked");
        const { default: DOMPurify } = await import("dompurify");
        const raw = marked.parse(body || "");
        const safe = DOMPurify.sanitize(String(raw));
        const cleaned = stripLeadingEmptyBlocks(safe);
        if (!cancelled) setHtml(cleaned);
      } catch {
        // Fallback: escape + convert newlines to <br/>
        const esc = (body || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        const withBr = esc.replace(/\n/g, "<br/>");
        const cleaned = stripLeadingEmptyBlocks(withBr);
        if (!cancelled) setHtml(cleaned);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [body]);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "overflow-hidden rounded-2xl border text-left transition-all p-0 h-full flex flex-col",
        selected ? "border-primary ring-2 ring-primary" : "hover:bg-muted/40",
      )}
    >
      <div className="flex flex-col items-start gap-2 px-4 pb-4 pt-0">
        <div className="text-sm font-semibold leading-none tracking-wide text-muted-foreground mt-4">
          {label}
        </div>
        <div
          className={cn(
            // Proper Markdown formatting, no top spacing
            "prose prose-sm max-w-none leading-relaxed pt-0 [&>*:first-child]:mt-0 prose-p:mt-0 prose-headings:mt-0 prose-h1:mt-0 prose-h2:mt-0 prose-h3:mt-0 prose-h4:mt-0 prose-h5:mt-0 prose-h6:mt-0 prose-ol:mt-0 prose-ul:mt-0 prose-pre:mt-0 prose-table:mt-0 prose-blockquote:mt-0",
          )}
          // Hydration may differ slightly until client JS loads
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </button>
  );
}

function RadioRow({ value, label }: { value: EvalChoice; label: string }) {
  const id = `r-${value}`;
  return (
    <div className="flex items-center gap-2 rounded-xl border p-2">
      <RadioGroupItem id={id} value={value} />
      <Label htmlFor={id} className="cursor-pointer text-sm">
        {label}
      </Label>
    </div>
  );
}

export const getStaticProps: GetStaticProps<EvalPageProps> = async () => {
  const pubDir = path.join(process.cwd(), "public");
  let initialQuestions: EvalQuestion[] = [];
  let initialPairing: NonNullable<Submission["pairing"]> = [];

  // Try prebuilt questions file first
  try {
    const buf = await fs.readFile(
      path.join(pubDir, "malaria-eval-questions.json"),
      "utf8",
    );
    const data = JSON.parse(buf);
    const qs = (data?.questions ?? []) as EvalQuestion[];
    const pr = (data?.pairing ?? []) as NonNullable<Submission["pairing"]>;
    if (Array.isArray(qs) && qs.length > 0) {
      // sanitize option text from any appended disclaimers
      initialQuestions = qs.map((q) => ({
        ...q,
        optionA: stripDisclaimer(q.optionA ?? ""),
        optionB: stripDisclaimer(q.optionB ?? ""),
      }));
      initialPairing = pr || [];
    }
  } catch {}

  // Fallback: derive deterministically from evaluation results
  if (initialQuestions.length === 0) {
    try {
      const buf = await fs.readFile(
        path.join(pubDir, "malaria-evaluation-results.json"),
        "utf8",
      );
      const data = JSON.parse(buf);
      const rawResults = Array.isArray(data) ? data : data.results || [];
      rawResults.forEach((r: any, i: number) => {
        const id = r.id?.toString?.() || `q${i + 1}`;
        const text = r.question || r.query || r.text || `Question ${i + 1}`;
        const a = stripDisclaimer(r.answer ?? "");
        const b = stripDisclaimer(r.answerByLLM ?? "");
        if (!text || (!a && !b)) return;
        initialQuestions.push({ id, text, optionA: a, optionB: b });
        initialPairing.push({
          id,
          sourceA: "Answer",
          sourceB: "AnswerByLLM",
          questionText: text,
        });
      });
    } catch {}
  }

  return {
    props: {
      initialQuestions,
      initialPairing,
    },
  };
};
