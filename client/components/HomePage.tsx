import { useState } from "react";

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [query, setQuery] = useState("");
  const [activeMode, setActiveMode] = useState<"student" | "opd">("student");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

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

    setIsAnalyzing(true);
    setShowDemo(false);

    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDemo(true);
    }, 2000);
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
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-1 flex">
            <button
              onClick={() => setActiveMode("student")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeMode === "student"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/10"
              }`}
            >
              Student Mode
            </button>
            <button
              onClick={() => setActiveMode("opd")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeMode === "opd"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/10"
              }`}
            >
              OPD Mode
            </button>
          </div>
        </div>

        {/* Interactive Query Box */}
        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter a clinical case, chief complaint, or question..."
              className="w-full min-h-[160px] p-6 text-base border border-white/30 rounded-xl bg-white/70 backdrop-blur-md resize-none focus:outline-none focus:border-primary/50 focus:bg-white/80 placeholder:text-foreground/50 transition-all duration-200 shadow-lg"
              disabled={isAnalyzing}
            />
            <button
              onClick={handleAsk}
              disabled={isAnalyzing || !query.trim()}
              className="absolute bottom-4 right-4 btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Ask Sushruta"}
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

        {/* Keyboard Shortcut Hint */}
        {!showDemo && !isAnalyzing && query.trim() && (
          <div className="text-center">
            <p className="text-foreground/50 text-sm">
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
        )}
      </div>

      {/* Fixed position results area to prevent layout shift */}
      <div className="w-full max-w-2xl mt-8">
        {/* Analysis State */}
        {isAnalyzing && (
          <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="text-foreground/70 font-medium">
                ANALYZING...
              </span>
            </div>
          </div>
        )}

        {/* Demo Output */}
        {showDemo && (
          <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-lg animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">
                  Analysis Complete
                </h3>
                <span className="text-xs text-foreground/60 bg-white/40 px-3 py-1 rounded-full">
                  DEMO MODE
                </span>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border border-white/20 p-4 rounded-lg">
                <div className="text-sm text-foreground/70 font-medium mb-2">
                  Input:
                </div>
                <div className="text-foreground">{query}</div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">
                    Differential Diagnosis:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-white/40 rounded-xl border border-white/20">
                      <span className="font-medium text-foreground">
                        1. Pulmonary Embolism
                      </span>
                      <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                        High probability
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/40 rounded-xl border border-white/20">
                      <span className="font-medium text-foreground">
                        2. Acute Coronary Syndrome
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                        Moderate probability
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/40 rounded-xl border border-white/20">
                      <span className="font-medium text-foreground">
                        3. Pneumothorax
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                        Moderate probability
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">
                    Recommended Actions:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-4 bg-white/40 rounded-xl border border-white/20">
                      <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-foreground">
                        Obtain vital signs and pulse oximetry
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-white/40 rounded-xl border border-white/20">
                      <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-foreground">
                        Perform ECG and chest X-ray
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-white/40 rounded-xl border border-white/20">
                      <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-foreground">
                        Consider D-dimer and CT-PA if PE suspected
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-white/40 rounded-xl border border-white/20">
                      <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-foreground">
                        Assess Wells score for PE probability
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">
                    Clinical Rationale:
                  </h4>
                  <div className="p-4 bg-white/50 rounded-xl border border-white/20">
                    <p className="text-foreground/80 leading-relaxed">
                      Young female with acute chest pain and dyspnea requires
                      immediate evaluation for life-threatening conditions. PE
                      risk factors should be assessed given the acute
                      presentation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/20">
                <button
                  onClick={() => onNavigate("features")}
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  See more detailed features and scenarios →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}