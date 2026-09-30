"use client";

import { CheckCircle2, FileUp, LockKeyhole, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";

interface GlobalProgressBarProps {
  duration?: number;
  label?: string;
  title?: string;
  description?: string;
  completeTitle?: string;
  completeDescription?: string;
}

const processingStages = [
  "Preparing your request...",
  "Uploading your data...",
  "Securing your information...",
  "Processing your request...",
  "Finalizing your request...",
];

export default function GlobalProgressBar({
  duration = 5000,
  label,
  title = "SwiftCourier",
  description = "Secure request processing",
  completeTitle = "Process complete",
  completeDescription = "Your request has been completed",
}: GlobalProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    let frameId: number;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      const nextProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(nextProgress);

      const nextStage = Math.min(
        Math.floor(nextProgress / 20),
        processingStages.length - 1,
      );

      setStageIndex(nextStage);

      if (nextProgress < 100) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [duration]);

  const isComplete = progress >= 100;

  const currentLabel = isComplete
    ? "Request completed successfully"
    : label || processingStages[stageIndex];

  return (
    <div className="w-full max-w-lg space-y-5 rounded-2xl border border-border/60 bg-background/80 p-5 shadow-xl shadow-black/5 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        {/* Brand / Icon */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
            {isComplete ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <UploadCloud className="size-5" />
            )}

            {!isComplete && (
              <span className="absolute inset-0 animate-ping rounded-xl bg-[#e50914]/10" />
            )}
          </div>

          {/* Title */}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {isComplete ? completeTitle : title}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {isComplete ? completeDescription : description}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex shrink-0 items-center gap-2">
          {!isComplete ? (
            <>
              <span className="relative flex size-4 items-center justify-center">
                <span className="absolute size-4 animate-spin rounded-full border-2 border-[#e50914]/20 border-t-[#e50914]" />

                <span className="size-1 rounded-full bg-[#e50914]" />
              </span>

              <span className="text-xs font-medium text-muted-foreground">
                Working
              </span>
            </>
          ) : (
            <>
              <span className="flex size-4 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <CheckCircle2 className="size-3.5" />
              </span>

              <span className="text-xs font-medium text-muted-foreground">
                Done
              </span>
            </>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="relative pt-2">
        {/* Glow */}
        <div className="absolute inset-x-0 top-[18px] h-1 rounded-full bg-[#e50914]/10 blur-md" />

        <Progress
          value={progress}
          className="
            relative
            h-1.5
            overflow-visible
            rounded-full
            bg-muted/80
            [&>div]:rounded-full
            [&>div]:bg-gradient-to-r
            [&>div]:from-[#e50914]
            [&>div]:via-[#ff3944]
            [&>div]:to-[#e50914]
            [&>div]:shadow-[0_0_14px_rgba(229,9,20,0.65)]
            [&>div]:transition-[width]
            [&>div]:duration-100
            [&>div]:ease-linear
          "
        />

        {/* Moving File Indicator */}
        {!isComplete && (
          <div
            className="pointer-events-none absolute top-[4px] -translate-x-1/2 transition-[left] duration-100 ease-linear"
            style={{
              left: `${Math.max(progress, 2)}%`,
            }}
          >
            <div className="relative flex size-7 items-center justify-center rounded-full border border-[#e50914]/30 bg-background shadow-[0_0_18px_rgba(229,9,20,0.35)]">
              <FileUp className="size-3.5 text-[#e50914]" />

              <span className="absolute inset-0 animate-ping rounded-full border border-[#e50914]/20" />
            </div>
          </div>
        )}

        {/* Complete Indicator */}
        {isComplete && (
          <div className="absolute right-0 top-[4px] flex size-7 items-center justify-center rounded-full bg-[#e50914] text-white shadow-[0_0_18px_rgba(229,9,20,0.5)]">
            <CheckCircle2 className="size-4" />
          </div>
        )}
      </div>

      {/* Processing Status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`size-1.5 shrink-0 rounded-full ${
              isComplete ? "bg-green-500" : "bg-[#e50914]"
            }`}
          />

          <span className="truncate text-xs text-muted-foreground">
            {currentLabel}
          </span>
        </div>

        {/* Security */}
        <div className="flex shrink-0 items-center gap-1.5 text-[10px] text-muted-foreground">
          <LockKeyhole className="size-3" />
          Secure
        </div>
      </div>
    </div>
  );
}
