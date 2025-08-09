import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { scenarios } from "../lib/scenarios";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeMode, setActiveMode] = useState<"student" | "opd">("student");
  const [demoResponseContent, setDemoResponseContent] = useState<React.ReactNode | null>(null);
  const router = useRouter();

  // Add global keyboard shortcut for Cmd/Ctrl+Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (query.trim()) {
          handleAsk();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [query]);

  const modeMeta: Record<"student" | "opd", { label: string; description: string }> = {
    student: {
      label: "Clinical Evaluation",
      description:
        "Practice clinical reasoning with structured guidance: build differentials, assess red flags, and learn next steps.",
    },
    opd: {
      label: "Case Discussion",
      description:
        "Discuss real-world cases efficiently: ask focused questions, triage, and draft concise management plans.",
    },
  };

  const examplePrompts = {
    student: scenarios.homePageScenarios
      .filter((s) => s.mode === "Clinical Evaluation")
      .map((s) => s.prompt),
    opd: scenarios.homePageScenarios
      .filter((s) => s.mode === "Case Discussion")
      .map((s) => s.prompt),
  };

  const handleExampleClick = (prompt: string) => {
    setQuery(prompt);
  };

  const handleAsk = async () => {
    if (!query.trim()) return;
    const chatUrl = `/ChatPage?q=${encodeURIComponent(query.trim())}`;
    router.push(chatUrl);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleAsk();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#F9FAFB]">
      <div className="w-full max-w-xl space-y-12">
        {/* Brand Block */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-satoshi font-bold mb-2">
            Sushruta Health
          </h1>
          <h2 className="text-xl md:text-2xl font-normal text-[#111827] font-inter">
            Your intelligent co-pilot for clinical decision-making.
          </h2>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md rounded-2xl bg-[#E5E7EB] p-2 flex items-center">
            <div className="relative flex w-full">
              {["student", "opd"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode as "student" | "opd")}
                  className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 z-10 flex-1 text-center ${
                    activeMode === mode
                      ? "text-white"
                      : "text-[#111827] hover:text-[#2563EB]"
                  }`}
                >
                  {modeMeta[mode as "student" | "opd"].label}
                </button>
              ))}
              <motion.div
                className="absolute top-1 left-1 bottom-1 w-1/2 rounded-xl shadow-sm z-0 bg-[#2563EB]"
                animate={{ x: activeMode === "student" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>
        </div>

        {/* Mode Description */}
        <div className="text-center text-sm text-[#374151] -mt-2 mb-2">
          {modeMeta[activeMode].description}
        </div>

        {/* Interactive Query Box */}
        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (demoResponseContent) {
                  setDemoResponseContent(null);
                }
              }}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  handleAsk();
                }
                handleKeyPress(e);
              }}
              placeholder="Enter a clinical case, chief complaint, or question..."
              className="modern-query-box"
              ref={(el) => {
                if (el) el.focus();
              }}
            />
            <button
              onClick={handleAsk}
              disabled={!query.trim()}
              className="absolute bottom-4 right-4 btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              Ask Sushruta
            </button>
          </div>

          {/* Demo Response Area */}
          {demoResponseContent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            >
              {demoResponseContent}
            </motion.div>
          )}

          {/* Dynamic Example Prompts */}
          <div className="space-y-4">
            <p className="text-center text-foreground/60 text-sm">
              Try these examples:
            </p>
            <div className="space-y-3">
              {examplePrompts[activeMode].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(prompt)}
                  className="example-prompt"
                >
                  <span className="example-prompt__icon" aria-hidden="true">
                    {/* Sparkle SVG icon - minimalist line style, currentColor */}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2v2M9 14v2M16 9h-2M4 9H2M13.657 4.343l-1.414 1.414M5.757 12.243l-1.414 1.414M13.657 13.657l-1.414-1.414M5.757 5.757L4.343 4.343" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      <circle cx="9" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.3"/>
                    </svg>
                  </span>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Keyboard Shortcut Hint (always visible to prevent layout shift) */}
        <div className="text-center min-h-[28px]">
          <p
            className={`text-foreground/50 text-sm transition-opacity duration-200 ${query.trim() ? "opacity-100" : "opacity-40"}`}
          >
            Press{" "}
            <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">
              ⌘
            </kbd>{" "}
            +{" "}
            <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">
              Enter
            </kbd>{" "}
            to analyze
          </p>
        </div>
      </div>
    </div>
  );
}
