"use client";

import { Loader2, Package, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";

type LoadingScreenProps = {
  label?: string;
  description?: string;
};

export default function LoadingScreen({
  label = "Verifying account",
  description = "Please wait while we securely process your request.",
}: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(#e50914 1px, transparent 1px),
            linear-gradient(90deg, #e50914 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/10 blur-[100px] sm:size-[420px] sm:blur-[130px]" />

      <div className="pointer-events-none absolute -left-24 top-1/4 size-56 rounded-full bg-[#e50914]/5 blur-[90px]" />

      <div className="pointer-events-none absolute -right-24 bottom-1/4 size-56 rounded-full bg-[#e50914]/5 blur-[90px]" />

      {/* Loading Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/75 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl dark:bg-background/60 dark:shadow-black/30 sm:p-8">
          {/* Top Red Accent */}
          <div className="absolute inset-x-0 top-0 h-0.75 bg-[#e50914]" />

          {/* Decorative Glow */}
          <div className="absolute -right-16 -top-16 size-36 rounded-full bg-[#e50914]/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            {/* Logo / Loader */}
            <div className="relative mb-6">
              {/* Outer Ring */}
              <div className="absolute inset-0 animate-ping rounded-full border border-[#e50914]/20" />

              <div className="relative flex size-20 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/5 shadow-lg shadow-[#e50914]/10 sm:size-24">
                {/* Rotating Ring */}
                <div className="absolute inset-1.5 animate-spin rounded-xl border-2 border-transparent border-r-[#e50914]/30 border-t-[#e50914]" />

                <Package
                  className="size-8 text-[#e50914] sm:size-9"
                  strokeWidth={1.8}
                />
              </div>

              {/* Small Truck Badge */}
              <div className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-full border border-background bg-[#e50914] text-white shadow-lg shadow-[#e50914]/30">
                <Truck className="size-4" />
              </div>
            </div>

            {/* Loading Spinner */}
            <div className="mb-3 flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-[#e50914]" />

              <h1 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {label}
              </h1>
            </div>

            <p className="max-w-xs text-xs leading-5 text-muted-foreground sm:text-sm">
              {description}
            </p>

            {/* Progress Dots */}
            <div className="mt-6 flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-[#e50914]" />
              <span className="size-1.5 animate-pulse rounded-full bg-[#e50914]/60 [animation-delay:150ms]" />
              <span className="size-1.5 animate-pulse rounded-full bg-[#e50914]/30 [animation-delay:300ms]" />
            </div>

            {/* Secure Badge */}
            <div className="mt-6 flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-[10px] font-medium text-muted-foreground sm:text-xs">
              <ShieldCheck className="size-3.5 text-[#e50914]" />
              Secure SwiftCourier connection
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="mt-5 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/60 sm:text-xs">
            Swift<span className="text-[#e50914]">Courier</span>
          </p>
        </div>
      </div>
    </div>
  );
}
