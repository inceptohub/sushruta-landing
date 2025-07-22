import { useState } from "react";

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const examplePrompts = [
    "25-year-old female with acute chest pain and shortness of breath",
    "67-year-old male with fever, cough, and confusion",
    "What questions should I ask a patient with headache?",
    "Generate differential diagnosis for abdominal pain",
  ];

  const handleExampleClick = (prompt: string) => {
    setQuery(prompt);
    setShowDemo(false);
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
    <div className="page-section flex items-center justify-center">
      <div className="container max-w-3xl text-center space-y-12">
        {/* Main Headline */}
        <h1 className="mb-12">Sushruta Health</h1>

        {/* Interactive Query Box */}
        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter a clinical case, chief complaint, or question..."
              className="query-box"
              disabled={isAnalyzing}
            />
            <button
              onClick={handleAsk}
              disabled={isAnalyzing || !query.trim()}
              className="absolute bottom-4 right-4 btn-primary disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Ask"}
            </button>
          </div>

          {/* Example Prompts */}
          <div className="space-y-3">
            <p className="supporting-text">Try these examples:</p>
            <div className="grid gap-2">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(prompt)}
                  className="example-prompt text-left p-3 rounded border border-input hover:border-primary/50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis State */}
        {isAnalyzing && (
          <div className="output-box">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="text-muted-foreground">ANALYZING...</span>
            </div>
          </div>
        )}

        {/* Demo Output */}
        {showDemo && (
          <div className="output-box text-left animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Analysis Complete</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  DEMO MODE
                </span>
              </div>

              <div className="input-box">
                Input: {query}
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Differential Diagnosis:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>1. Pulmonary Embolism</span>
                      <span className="text-muted-foreground">High probability</span>
                    </li>
                    <li className="flex justify-between">
                      <span>2. Acute Coronary Syndrome</span>
                      <span className="text-muted-foreground">Moderate probability</span>
                    </li>
                    <li className="flex justify-between">
                      <span>3. Pneumothorax</span>
                      <span className="text-muted-foreground">Moderate probability</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Recommended Actions:</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside">
                    <li>Obtain vital signs and pulse oximetry</li>
                    <li>Perform ECG and chest X-ray</li>
                    <li>Consider D-dimer and CT-PA if PE suspected</li>
                    <li>Assess Wells score for PE probability</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Clinical Rationale:</h4>
                  <p className="text-sm text-muted-foreground">
                    Young female with acute chest pain and dyspnea requires immediate 
                    evaluation for life-threatening conditions. PE risk factors should 
                    be assessed given the acute presentation.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => onNavigate("features")}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  See more detailed features and scenarios →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard Shortcut Hint */}
        <p className="text-xs text-muted-foreground">
          Press <kbd className="px-1 py-0.5 bg-muted rounded">⌘</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded">Enter</kbd> to analyze
        </p>
      </div>
    </div>
  );
}
