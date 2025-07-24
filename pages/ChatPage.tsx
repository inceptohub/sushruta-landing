import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
  query?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Add global keyboard shortcut for Cmd/Ctrl+Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        // Only send if input is non-empty and not loading
        if (input.trim() && !isLoading) {
          // Create a synthetic event for handleSubmit
          const form = document.querySelector("form");
          if (form) {
            form.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true }),
            );
          }
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [input, isLoading]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize with the initial query from the home page if it exists
  useEffect(() => {
    const initialQuery = router.query.q as string;

    if (initialQuery) {
      setMessages([{ role: "user", content: initialQuery }]);
      setIsLoading(true);

      // Simulate analysis delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "MEDICAL_ANALYSIS", // Special marker for styled content
            query: initialQuery,
          },
        ]);
        setIsLoading(false);
      }, 2000);
    }
  }, [router.query.q]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: `Thank you for your question: "${input}". Here's my medical analysis and recommendations based on the clinical information provided...`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] py-4 px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">
            Sushruta AI Chat
          </h1>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-foreground/70 hover:text-foreground bg-white/50 hover:bg-white/70 px-4 py-2 rounded-lg border border-white/30 transition-all duration-200"
            type="button"
            aria-label="Close Chat"
          >
            Close Chat
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-lg">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Welcome to Sushruta AI
                </h2>
                <p className="text-foreground/70">
                  Start a conversation by typing your medical question below.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex items-end ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Image
                    src="/logo-sushruta.svg"
                    alt="Sushruta Health"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full bg-[#E5E7EB] border border-[#E5E7EB] mr-3"
                    aria-hidden="false"
                  />
                )}
                <div
                  className={`relative max-w-xl rounded-2xl shadow-md ${
                    message.role === "user"
                      ? "bg-[#2563EB] text-white font-inter px-6 py-4 ml-2 md:ml-8"
                      : "bg-[#E5E7EB] text-[#111827] font-inter px-6 py-5 mr-2 md:mr-8"
                  }`}
                  style={{
                    borderTopRightRadius: message.role === "user" ? '0.75rem' : '2rem',
                    borderTopLeftRadius: message.role === "assistant" ? '0.75rem' : '2rem',
                  }}
                >
                  {message.content === "MEDICAL_ANALYSIS" ? (
                    <div className="p-8 space-y-6">
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
                        <div className="text-foreground">{message.query}</div>
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
                              Young female with acute chest pain and dyspnea
                              requires immediate evaluation for life-threatening
                              conditions. PE risk factors should be assessed
                              given the acute presentation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="px-6 py-4 whitespace-pre-wrap">
                      {message.content}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/80 backdrop-blur-md border border-white/30 text-foreground rounded-2xl px-6 py-4 shadow-lg mr-12">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <span className="ml-2 text-foreground/70">Analyzing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#E5E7EB] p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  if (input.trim() && !isLoading) {
                    handleSubmit(e as any);
                  }
                }
              }}
              placeholder="Type your medical question..."
              className="form-input flex-1 border border-[#E5E7EB] rounded-xl px-4 py-3 bg-white/80 focus:outline-none focus:border-[#2563EB] focus:bg-white placeholder:text-foreground/50 transition-all duration-200 shadow-sm"
              aria-label="Type your medical question"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-primary px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              aria-label="Send medical question"
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
