"use client";

import { X } from "lucide-react";
import Image from "next/image";
import aiLogo from "@/assets/logo/ai-chat.jpg";

export function AIChatLauncher({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={
        open
          ? "Close SwiftCourier AI assistant"
          : "Open SwiftCourier AI assistant"
      }
      onClick={onClick}
      className="group fixed bottom-10 right-7 z-50 flex size-14 items-center justify-center overflow-visible rounded-full border border-white/20 bg-white shadow-lg shadow-[#e50914]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#e50914]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 dark:border-white/10 dark:bg-slate-900"
    >
      {/* Animated ring */}
      {!open && (
        <>
          <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#e50914]/70 animate-[ai-ring_2s_ease-out_infinite]" />
          <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#e50914]/50 animate-[ai-ring_2s_ease-out_infinite_1s]" />
        </>
      )}

      {/* AI Logo */}
      <div
        className={`absolute inset-0 overflow-hidden rounded-full flex items-center justify-center transition-all duration-300 ${
          open
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <Image
          src={aiLogo}
          alt="SwiftCourier AI"
          fill
          className="rounded-full object-cover"
          sizes="56px"
          priority
        />
      </div>

      {/* Close icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-full bg-[#e50914] text-white transition-all duration-300 ${
          open
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      >
        <X className="size-6" />
      </div>
    </button>
  );
}
