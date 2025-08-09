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
      if (e.key.toLowerCase() === "a") setChoice("A");
      if (e.key.toLowerCase() === "b") setChoice("B");
      if (e.key.toLowerCase() === "t") setChoice("tie");
      if (e.key.toLowerCase() === "n") setChoice("neither");
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, responses]);

  // Removed auto-load to prevent client-side data swaps during hydration

  const loadFromResultsJson = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const rawResults = Array.isArray(data) ? data : data.results || [];

      const builtQuestions: EvalQuestion[] = [];
      const builtPairing: NonNullable<Submission["pairing"]> = [];

      rawResults.forEach((r: any, i: number) => {
        const qText = r.question || r.query || r.text || `Question ${i + 1}`;
        const ans1 = stripDisclaimer(r.answer ?? "");
        const ans2 = stripDisclaimer(r.answerByLLM ?? "");
        if (!qText || (!ans1 && !ans2)) return;

        // Randomize A/B mapping for anonymization
        const flip = Math.random() < 0.5;
        const id = r.id?.toString?.() || `q${i + 1}`;
        const optionA = flip ? ans1 : ans2;
        const optionB = flip ? ans2 : ans1;
        const sourceA = flip ? "Answer" : "AnswerByLLM";
        const sourceB = flip ? "AnswerByLLM" : "Answer";

        builtQuestions.push({ id, text: qText, optionA, optionB });
        builtPairing.push({ id, sourceA, sourceB, questionText: qText });
      });

      if (!builtQuestions.length)
        throw new Error("No valid questions found in JSON.");

      setQuestions(builtQuestions);
      setPairing(builtPairing);
      setResponses(
        builtQuestions.map((q) => ({ id: q.id, choice: null, feedback: "" })),
      );
      setIdx(0);
      // no-op messaging removed
    } catch (e: any) {
      console.error(e);
      // no-op messaging removed
    }
  };

  const loadFromEmbedded = async () => {
    try {
      // no-op messaging removed
      // Prefer prebuilt questions JSON
      let res = await fetch("/malaria-eval-questions.json", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const qs = (data.questions || []) as EvalQuestion[];
        const pr = (data.pairing || []) as NonNullable<Submission["pairing"]>;
        if (!qs.length) throw new Error("No questions found in prebuilt JSON");
        setQuestions(qs);
        setPairing(pr);
        setResponses(qs.map((q) => ({ id: q.id, choice: null, feedback: "" })));
        setIdx(0);
        // no-op messaging removed
        return;
      }

      // Fallback: derive from evaluation results JSON deterministically (A=Answer, B=AnswerByLLM)
      res = await fetch("/malaria-evaluation-results.json", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load embedded results JSON");
      const data = await res.json();
      const rawResults = Array.isArray(data) ? data : data.results || [];
      const qs: EvalQuestion[] = [];
      const pr: NonNullable<Submission["pairing"]> = [];
      rawResults.forEach((r: any, i: number) => {
        const id = r.id?.toString?.() || `q${i + 1}`;
        const text = r.question || r.query || r.text || `Question ${i + 1}`;
        const a = r.answer ?? "";
        const b = r.answerByLLM ?? "";
        if (!text || (!a && !b)) return;
        qs.push({ id, text, optionA: a, optionB: b });
        pr.push({
          id,
          sourceA: "Answer",
          sourceB: "AnswerByLLM",
          questionText: text,
        });
      });
      if (!qs.length)
        throw new Error("No valid questions found in embedded results JSON");
      setQuestions(qs);
      setPairing(pr);
      setResponses(qs.map((q) => ({ id: q.id, choice: null, feedback: "" })));
      setIdx(0);
      // no-op messaging removed
    } catch (e: any) {
      console.error(e);
      // no-op messaging removed
    }
  };

  // Auto-load removed: data is provided by getStaticProps for SSR consistency

  const handleSubmit = async () => {
    const payload: Submission = {
      participant,
      responses,
      pairing,
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

  const exportQuestionsJSON = () => {
    try {
      const payload = { questions, pairing };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "malaria-eval-questions.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export failed", e);
      alert("Failed to export questions JSON");
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 pb-28">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Sushruta Clinical Decision Support – Evaluation
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
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={participant.email ?? ""}
                  placeholder="e.g., name@example.com"
                  onChange={(e) =>
                    setParticipant((p) => ({ ...p, email: e.target.value }))
                  }
                />
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
              onSelect={() => setChoice("A")}
            />
            <OptionBlock
              label="Option B"
              body={current?.optionB ?? ""}
              selected={currentResp?.choice === "B"}
              onSelect={() => setChoice("B")}
            />
          </div>

          <div className="mt-4">
            <Label className="mb-2 block text-sm">Pick the better option</Label>
            <RadioGroup
              value={(currentResp?.choice as string) ?? ""}
              onValueChange={(v) => setChoice(v as EvalChoice)}
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
                  disabled={responses.some((r) => r.choice === null)}
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
