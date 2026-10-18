"use client";

import { Bot, User } from "lucide-react";
import type { IAIChatMessage, IAIToolResult } from "@/types/ai-assistant.type";
import { AIChatResultCard } from "./AIChatResultCard";

export function AIChatMessageBubble({
  message,
  toolResult,
}: {
  message: IAIChatMessage;
  toolResult?: IAIToolResult | null;
}) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-slate-200 dark:bg-white/10" : "bg-[#e50914] text-white"
        }`}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div className={`max-w-[80%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block rounded-2xl px-3 py-2 text-sm ${
            isUser
              ? "bg-[#e50914] text-white"
              : "bg-slate-100 text-slate-800 dark:bg-white/5 dark:text-slate-200"
          }`}
        >
          {message.content}
        </div>
        {toolResult && <AIChatResultCard result={toolResult} />}
      </div>
    </div>
  );
}
