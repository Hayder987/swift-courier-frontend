"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProcessSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  label?: string;
  showLabel?: boolean;
}

const sizeClasses = {
  xs: {
    spinner: "size-3",
    glow: "size-4",
    ring: "size-4",
    dot: "size-0.5",
  },
  sm: {
    spinner: "size-3.5",
    glow: "size-5",
    ring: "size-5",
    dot: "size-0.5",
  },
  md: {
    spinner: "size-4",
    glow: "size-6",
    ring: "size-6",
    dot: "size-0.5",
  },
  lg: {
    spinner: "size-5",
    glow: "size-7",
    ring: "size-7",
    dot: "size-1",
  },
};

export default function ProcessSpinner({
  size = "sm",
  className,
  label = "Processing...",
  showLabel = false,
}: ProcessSpinnerProps) {
  const sizes = sizeClasses[size];

  return (
    <output
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2",
        className,
      )}
    >
      <span className="relative flex shrink-0 items-center justify-center">
        {/* SwiftCourier red ambient glow */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute rounded-full",
            "bg-[#e50914]/25 blur-[4px]",
            sizes.glow,
          )}
        />

        {/* SwiftCourier red outer ring */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute animate-spin rounded-full",
            "border-2 border-[#e50914]/25",
            "border-t-[#e50914]",
            "border-r-[#ff3944]",
            sizes.ring,
          )}
        />

        {/* White inner spinner */}
        <Loader2
          aria-hidden="true"
          className={cn(
            "relative animate-spin",
            "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.75)]",
            sizes.spinner,
          )}
          strokeWidth={2.7}
        />

        {/* White center dot */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute rounded-full bg-white",
            "shadow-[0_0_5px_rgba(255,255,255,0.9)]",
            sizes.dot,
          )}
        />
      </span>

      {showLabel && (
        <span className="text-xs font-medium tracking-wide text-muted-foreground">
          {label}
        </span>
      )}
    </output>
  );
}
