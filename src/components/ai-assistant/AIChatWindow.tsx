"use client";

import { Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { sendAIChat } from "@/api/ai-assistant.api";
import type { IAIChatMessage, IAIToolResult } from "@/types/ai-assistant.type";
import { AIChatInput } from "./AIChatInput";
import { AIChatMessageBubble } from "./AIChatMessage";
import { AIChatSuggestions } from "./AIChatSuggestions";

interface ChatEntry extends IAIChatMessage {
  id: string;
  toolResult?: IAIToolResult | null;
}

const WELCOME: ChatEntry = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm SwiftCourier AI. Ask me to track a shipment, estimate a delivery cost, or explain our services.",
};

const createId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export function AIChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatEntry[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageCount = messages.length;

  useEffect(() => {
    void messageCount;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageCount]);

  const handleSend = async (text: string) => {
    if (loading) return;
    setError(null);

    const nextMessages: ChatEntry[] = [
      ...messages,
      { id: createId(), role: "user", content: text },
    ];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const history: IAIChatMessage[] = nextMessages
        .filter((m) => m.id !== WELCOME.id)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await sendAIChat(text, history);
      const data = res.data;

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: data.reply,
          toolResult: data.toolResult ?? null,
        },
      ]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-24 right-4 z-50 flex h-[min(600px,80vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-950"
      role="dialog"
      aria-label="SwiftCourier AI assistant"
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-[#e50914] px-4 py-3 text-white dark:border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5" />
          <div>
            <p className="text-sm font-bold">SwiftCourier AI</p>
            <p className="text-[10px] opacity-90">
              Ask about shipments, pricing & services
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-full p-1 hover:bg-white/20"
        >
          <X className="size-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-3">
        {messages.map((m) => (
          <AIChatMessageBubble
            key={m.id}
            message={m}
            toolResult={m.toolResult}
          />
        ))}
        {loading && (
          <div className="text-xs italic text-slate-400 dark:text-slate-500">
            SwiftCourier AI is typing…
          </div>
        )}
        {error && (
          <div className="rounded-lg bg-red-50 p-2 text-xs text-red-600 dark:bg-red-950/30">
            {error}
          </div>
        )}
      </div>

      <AIChatSuggestions onPick={handleSend} />
      <AIChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
