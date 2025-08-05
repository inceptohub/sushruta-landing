import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import Image from "next/image";
import StructuredResponse from '../components/StructuredResponse';

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

  // Generate query-specific response based on the input
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check for specific clinical scenarios and generate appropriate responses
    if (lowerQuery.includes('epigastric pain') || lowerQuery.includes('back pain')) {
      return `Based on the clinical presentation of "${query}", here are the key considerations:\n\n**Differential Diagnosis:**\n1. **Acute Pancreatitis** - Most likely given epigastric pain radiating to back\n2. **Peptic Ulcer Disease** - Consider perforated ulcer\n3. **Biliary Colic** - Gallstone-related pain\n\n**Immediate Actions:**\n• Obtain vital signs and pain assessment\n• Order lipase, amylase, CBC, BMP\n• Consider CT abdomen if severe\n• NPO status and IV fluids\n\n**Red Flags:**\n• Severe persistent pain\n• Signs of shock\n• Rigid abdomen`;
    }
    
    if (lowerQuery.includes('cough') && lowerQuery.includes('fever')) {
      return `For the clinical scenario "${query}", here's my analysis:\n\n**Differential Diagnosis:**\n1. **Community-Acquired Pneumonia** - Most likely given age and symptoms\n2. **Bronchitis** - Consider if no systemic symptoms\n3. **COVID-19** - Important to rule out\n\n**Workup:**\n• Chest X-ray\n• CBC with differential\n• Blood cultures if febrile\n• COVID-19 testing\n• Sputum culture if productive\n\n**Management:**\n• Empiric antibiotics if pneumonia suspected\n• Supportive care\n• Monitor oxygen saturation\n• Consider hospitalization if severe`;
    }
    
    if (lowerQuery.includes('chest pain') || lowerQuery.includes('dyspnea')) {
      return `Clinical analysis for "${query}":\n\n**Differential Diagnosis:**\n1. **Acute Coronary Syndrome** - Rule out first\n2. **Pulmonary Embolism** - Consider risk factors\n3. **Pneumothorax** - Especially in young patients\n\n**Immediate Assessment:**\n• 12-lead ECG\n• Troponin levels\n• Chest X-ray\n• D-dimer if PE suspected\n• Vital signs and oxygen saturation\n\n**Critical Actions:**\n• Aspirin if ACS suspected\n• Oxygen if hypoxic\n• Pain control\n• Cardiology consultation if indicated`;
    }
    
    // Default response for other queries
    return `Thank you for the clinical question: "${query}"\n\nI've analyzed this case and here are my recommendations:\n\n**Clinical Approach:**\n• Thorough history and physical examination\n• Appropriate diagnostic workup based on presentation\n• Consider differential diagnoses\n• Implement evidence-based treatment\n\n**Next Steps:**\n• Gather additional history if needed\n• Order relevant investigations\n• Monitor patient response\n• Consider specialist consultation if indicated\n\nPlease provide more specific details if you'd like a more targeted analysis.`;
  };

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
            content: generateResponse(initialQuery),
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
                key={uuidv4()}
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
                  {message.role === "assistant" ? (
                    <StructuredResponse content={message.content} query={message.query} />
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
