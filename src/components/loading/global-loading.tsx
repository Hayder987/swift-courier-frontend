"use client";

import { useEffect, useState } from "react";

export default function GlobalLoading() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let value = 0;

    const progressInterval = window.setInterval(() => {
      value += Math.random() * 7;

      if (value >= 95) {
        value = 95;
        window.clearInterval(progressInterval);
      }

      setProgress(value);
    }, 120);

    const finishTimer = window.setTimeout(() => {
      setProgress(100);

      const hideTimer = window.setTimeout(() => {
        setIsVisible(false);
      }, 450);

      return () => {
        window.clearTimeout(hideTimer);
      };
    }, 1700);

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(finishTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <main
      aria-label="Loading SwiftCourier"
      className={`fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground transition-opacity duration-500 ${
        progress >= 100 ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient red glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/[0.035] blur-[100px] dark:bg-[#e50914]/[0.07]" />

        <div className="absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-[#e50914]/[0.025] blur-[90px] dark:bg-[#e50914]/[0.04]" />

        <div className="absolute -right-40 bottom-1/3 h-72 w-72 rounded-full bg-[#e50914]/[0.025] blur-[90px] dark:bg-[#e50914]/[0.04]" />
      </div>

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <section className="relative flex w-full max-w-md flex-col items-center px-6">
        {/* Globe */}
        <div className="relative flex h-52 w-52 items-center justify-center">
          {/* Outer glow */}
          <div className="absolute h-40 w-40 rounded-full bg-[#e50914]/[0.04] blur-2xl dark:bg-[#e50914]/[0.08]" />

          {/* Globe */}
          <div className="loading-globe relative h-36 w-36 rounded-full border border-[#e50914]/30">
            {/* Latitude */}
            <span className="absolute left-1/2 top-1/2 h-[72%] w-full -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#e50914]/20" />

            <span className="absolute left-1/2 top-1/2 h-[40%] w-full -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#e50914]/15" />

            {/* Longitude */}
            <span className="absolute left-1/2 top-1/2 h-full w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#e50914]/20" />

            <span className="absolute left-1/2 top-1/2 h-full w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#e50914]/15" />

            {/* Center */}
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914] shadow-[0_0_18px_rgba(229,9,20,0.75)]" />

            {/* Orbit */}
            <span className="loading-orbit absolute -inset-5 rounded-full border border-[#e50914]/20" />

            {/* Moving signal */}
            <span className="loading-signal absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#e50914] shadow-[0_0_12px_rgba(229,9,20,0.8)]" />
          </div>

          {/* Connection points */}
          <span className="absolute left-[18%] top-[34%] h-1.5 w-1.5 rounded-full bg-[#e50914]/60" />

          <span className="absolute right-[18%] top-[42%] h-1.5 w-1.5 rounded-full bg-[#e50914]/60" />

          <span className="absolute bottom-[27%] left-[30%] h-1.5 w-1.5 rounded-full bg-[#e50914]/50" />
        </div>

        {/* Brand */}
        <div className="mt-1 flex flex-col items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e50914] shadow-[0_0_28px_rgba(229,9,20,0.22)]">
              <span className="text-lg font-black text-white">S</span>
            </div>

            <h1 className="text-[22px] font-bold tracking-tight">
              Swift
              <span className="text-[#e50914]">Courier</span>
            </h1>
          </div>

          <p className="mt-3 text-center text-xs font-medium tracking-wide text-muted-foreground sm:text-sm">
            Connecting every destination, one delivery at a time.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-7 w-full max-w-[230px]">
          <div className="h-[3px] overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[#e50914] transition-[width] duration-200 ease-out"
              style={{
                width: `${Math.max(progress, 8)}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e50914] opacity-50" />

                <span className="relative h-2 w-2 rounded-full bg-[#e50914]" />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Loading
              </span>
            </div>

            <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </section>

      <style>{`
        .loading-globe {
          animation: globe-float 4s ease-in-out infinite;
        }

        .loading-orbit {
          animation: orbit-spin 5s linear infinite;
        }

        .loading-signal {
          transform-origin: 0 -68px;
          animation: signal-spin 2.8s linear infinite;
        }

        @keyframes globe-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes signal-spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg)
              translateY(-68px);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg)
              translateY(-68px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-globe,
          .loading-orbit,
          .loading-signal {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
