"use client";

import { Send } from "lucide-react";
import { type KeyboardEvent, useState } from "react";

export function AIChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-slate-200 p-3 dark:border-white/10">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder="Ask about shipments, pricing, services…"
        className="max-h-24 flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#e50914] dark:border-white/10 dark:bg-slate-900 dark:text-white"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || !value.trim()}
        className="flex size-9 items-center justify-center rounded-xl bg-[#e50914] text-white transition hover:bg-[#c70710] disabled:opacity-50"
        aria-label="Send message"
      >
        <Send className="size-4" />
      </button>
    </div>
  );
}
