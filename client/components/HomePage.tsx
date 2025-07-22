import { useState } from "react";
import { motion } from "framer-motion";

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [query, setQuery] = useState("");
  const [activeMode, setActiveMode] = useState<"student" | "opd">("student");

  const examplePrompts = {
    student: [
      "25-year-old female with acute chest pain and shortness of breath",
      "Generate differential diagnosis for abdominal pain",
    ],
    opd: [
      "67-year-old male with fever, cough, and confusion",
      "What questions should I ask a patient with headache?",
    ],
  };

  const handleExampleClick = (prompt: string) => {
    setQuery(prompt);
  };

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    // Open chat page in new tab with the query as a URL parameter
    const chatUrl = `/chat?q=${encodeURIComponent(query.trim())}`;
    window.open(chatUrl, '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleAsk();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Main Headline */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-12">
            Sushruta Health
          </h1>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8 px-4">
          <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-2 w-full max-w-md">
            <div className="relative flex">
              {["student", "opd"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode as "student" | "opd")}
                  className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-200 z-10 flex-1 text-center ${
                    activeMode === mode
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {mode === "student" ? "Student Mode" : "OPD Mode"}
                </button>
              ))}
              <motion.div
                layoutId="active-mode-background"
                className="absolute bg-white rounded-xl shadow-sm z-0"
                style={{
                  top: '4px',
                  bottom: '4px',
                  left: activeMode === "student" ? "4px" : "calc(50% + 4px)",
                  right: activeMode === 'student' ? 'calc(50% + 4px)' : '4px',
                  width: activeMode === "student" ? "calc(50% - 8px)" : "calc(50% - 8px)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Query Box */}
        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  handleAsk();
                }
                handleKeyPress(e);
              }}
              placeholder="Enter a clinical case, chief complaint, or question..."
              className="w-full min-h-[160px] max-h-[160px] p-6 text-base border border-white/30 rounded-xl bg-white/70 backdrop-blur-md focus:outline-none focus:border-primary/50 focus:bg-white/80 placeholder:text-foreground/50 transition-all duration-200 shadow-lg"
              
            />
            <button
              onClick={handleAsk}
              disabled={!query.trim()}
              className="absolute bottom-4 right-4 btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              Ask Sushruta
            </button>
          </div>

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
                  className="w-full text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-foreground hover:bg-white/30 hover:text-primary cursor-pointer transition-all duration-200 text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Keyboard Shortcut Hint (always visible to prevent layout shift) */}
        <div className="text-center min-h-[28px]">
          <p className={`text-foreground/50 text-sm transition-opacity duration-200 ${query.trim() ? 'opacity-100' : 'opacity-40'}`}>
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