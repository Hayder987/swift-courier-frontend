// TrackingVisual.tsx
// Premium, lightweight courier tracking visualization.
// No Three.js / WebGL / Canvas. No "use client" needed.

import { Package, Radio } from "lucide-react";

const ACCENT = "#e50914";

export default function TrackingVisual({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={[
        "relative isolate w-full overflow-hidden rounded-2xl border border-border bg-background",
        "px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.12)]",
        "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_10px_40px_-14px_rgba(0,0,0,0.6)]",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {/* Ambient accent glow (very restrained) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 55% at 50% 55%, ${ACCENT}14, transparent 70%)`,
        }}
      />
      {/* Subtle dotted grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 0.6px, transparent 0.6px)",
          backgroundSize: "14px 14px",
          color: "var(--color-muted-foreground, rgba(120,120,120,0.35))",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 78%)",
        }}
      />

      {/* Header row */}
      <div className="relative z-10 mb-5 flex items-center justify-between gap-3 sm:mb-6">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
            Shipment Route
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm sm:text-[11px]">
          <Radio
            className="h-3 w-3"
            style={{ color: ACCENT }}
            strokeWidth={2.5}
          />
          Live Tracking
        </span>
      </div>

      {/* Route stage */}
      <div className="relative z-10">
        {/* Fixed aspect ratio, no overflow, scales across all breakpoints */}
        <div className="relative mx-auto aspect-[5/1] w-full max-w-3xl min-h-[110px] sm:aspect-[7/1] sm:min-h-[130px]">
          {/* SVG route layer */}
          <svg
            viewBox="0 0 500 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            role="presentation"
          >
            <defs>
              <linearGradient id="tv-track" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                <stop
                  offset="100%"
                  stopColor="currentColor"
                  stopOpacity="0.25"
                />
              </linearGradient>
              <linearGradient id="tv-active" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.95" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0.55" />
              </linearGradient>
            </defs>

            {/* Base track (dashed, theme-aware via currentColor) */}
            <g className="text-muted-foreground">
              <path
                d="M 20 62 C 120 20, 200 82, 260 55 S 380 24, 480 55"
                fill="none"
                stroke="url(#tv-track)"
                strokeWidth="1.25"
                strokeDasharray="2 5"
                strokeLinecap="round"
              />
            </g>

            {/* Active traveled segment (accent) */}
            <path
              d="M 20 62 C 120 20, 200 82, 260 55"
              fill="none"
              stroke="url(#tv-active)"
              strokeWidth="2.25"
              strokeLinecap="round"
            />

            {/* Checkpoint dots (in SVG coords) */}
            <circle cx="20" cy="62" r="4" className="fill-foreground" />
            <circle
              cx="20"
              cy="62"
              r="8"
              fill="none"
              stroke={ACCENT}
              strokeOpacity="0.35"
              strokeWidth="1.25"
            />
            <circle cx="260" cy="55" r="4.5" fill={ACCENT} />
            <circle cx="480" cy="55" r="4" className="fill-foreground" />
            <circle
              cx="480"
              cy="55"
              r="8"
              fill="none"
              stroke={ACCENT}
              strokeOpacity="0.35"
              strokeWidth="1.25"
            />
          </svg>

          {/* Labels row (aligned under checkpoints, scaled by container) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">
            <span className="w-16 shrink-0">Origin</span>
            <span
              className="hidden shrink-0 text-center sm:inline"
              style={{ color: ACCENT }}
            >
              In Transit
            </span>
            <span className="w-16 shrink-0 text-right">Destination</span>
          </div>

          {/* Moving parcel indicator (CSS-animated, GPU-friendly) */}
          <div className="tv-parcel pointer-events-none absolute left-0 top-0 h-full w-full">
            <div className="tv-parcel-item absolute -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background shadow-[0_4px_14px_-4px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_18px_-4px_rgba(0,0,0,0.6)]">
                <span
                  className="absolute inset-0 rounded-lg"
                  style={{ boxShadow: `inset 0 0 0 1px ${ACCENT}22` }}
                />
                <Package
                  className="h-4 w-4"
                  style={{ color: ACCENT }}
                  strokeWidth={2.25}
                />
                {/* Pulse ring for "current position" */}
                <span
                  className="tv-pulse absolute inset-0 rounded-lg"
                  style={{ boxShadow: `0 0 0 2px ${ACCENT}55` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer meta strip */}
      <div className="relative z-10 mt-4 flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:mt-5 sm:text-[11px]">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-1 w-1 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          Illustrative route
        </span>
        <span className="tabular-nums">Live · Real-time</span>
      </div>

      {/* Scoped animation styles — no JS, respects reduced motion */}
      <style>{`
        .tv-parcel-item {
          top: 55%;
          left: 5%;
          animation: tv-move 7s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .tv-pulse {
          animation: tv-pulse 2.2s ease-out infinite;
        }

        @keyframes tv-move {
          0%   { left: 5%;  top: 60%; opacity: 0; }
          6%   { opacity: 1; }
          25%  { left: 27%; top: 34%; }
          50%  { left: 52%; top: 55%; }
          75%  { left: 76%; top: 38%; }
          92%  { left: 95%; top: 55%; opacity: 1; }
          100% { left: 95%; top: 55%; opacity: 0; }
        }

        @keyframes tv-pulse {
          0%   { box-shadow: 0 0 0 0 ${ACCENT}66; opacity: 1; }
          70%  { box-shadow: 0 0 0 10px ${ACCENT}00; opacity: 0; }
          100% { box-shadow: 0 0 0 0 ${ACCENT}00; opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tv-parcel-item {
            animation: none;
            left: 50%;
            top: 50%;
            opacity: 1;
          }
          .tv-pulse { animation: none; opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
