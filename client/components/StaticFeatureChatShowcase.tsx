import React from "react";

interface Message {
  role: "user" | "assistant";
  content: React.ReactNode;
}

interface StaticFeatureChatShowcaseProps {
  scenario?: string;
  messages: Message[];
  className?: string;
}

export default function StaticFeatureChatShowcase({
  scenario,
  messages,
  className = "",
}: StaticFeatureChatShowcaseProps) {
  return (
    <div
      className={`w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg px-6 md:px-10 pb-10 pt-6 ${className}`}
      style={{ pointerEvents: "none", userSelect: "text" }}
    >
      {scenario && (
        <div className="px-6 mb-2">
          <span className="inline-block mb-4 px-3 py-1 bg-sushruta-blue-50 text-sushruta-blue-700 font-semibold rounded-full uppercase tracking-wide text-xs shadow-sm border border-sushruta-blue-100">
            {scenario}
          </span>
        </div>
      )}
      <div className="space-y-10 mt-6 mb-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-2xl shadow-lg max-w-xl whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white ml-12 px-8 py-5 font-mono text-[15px]"
                  : "bg-white/90 text-foreground border border-gray-200 mr-12 px-8 py-6"
              }`}
              style={{ marginTop: i === 0 ? 0 : 12, marginBottom: i === messages.length - 1 ? 0 : 12 }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
