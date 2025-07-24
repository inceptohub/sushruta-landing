import React from "react";
import Image from "next/image";

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
      className={`w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm px-0 md:px-0 py-0 ${className}`}
      // Removed pointerEvents and userSelect for accessibility
    >
      {scenario && (
        <div className="px-6 pt-6">
          <span className="scenario-label">{scenario}</span>
        </div>
      )}
      <div className="flex flex-col gap-4 px-4 md:px-8 pb-10 pt-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="flex-shrink-0 mr-3">
                {/* Sushruta Logo Avatar */}
                <Image
                  src="/logo-sushruta.svg"
                  alt="Sushruta Health"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full bg-[#E5E7EB] border border-[#E5E7EB]"
                  aria-hidden="false"
                />
              </div>
            )}
            <div
              className={`relative max-w-xl rounded-2xl ${
                msg.role === "user"
                  ? "bg-[#2563EB] text-white font-inter px-6 py-4 ml-2 md:ml-8 text-base shadow-md"
                  : "bg-[#E5E7EB] text-[#111827] font-inter px-6 py-5 mr-2 md:mr-8 text-base shadow"
              }`}
              style={{
                borderTopRightRadius: msg.role === "user" ? '0.75rem' : '2rem',
                borderTopLeftRadius: msg.role === "assistant" ? '0.75rem' : '2rem',
              }}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 ml-3">
                {/* User Avatar Icon */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 rounded-full bg-[#2563EB]"
                  aria-hidden="false"
                >
                  <circle cx="16" cy="16" r="16" fill="#2563EB" />
                  <path
                    d="M16 16c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v2h20v-2c0-3.343-6.686-5-10-5z"
                    fill="#fff"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
