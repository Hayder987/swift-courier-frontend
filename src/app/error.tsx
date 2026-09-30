"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error("SwiftCourier application error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.28)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.28)_1px,transparent_1px)] bg-size-[42px_42px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />

        {/* Top red glow */}
        <div className="absolute left-1/2 -top-45 h-105 w-105 -translate-x-1/2 rounded-full bg-[#e50914]/10 blur-[110px] dark:bg-[#e50914]/15" />

        {/* Bottom red glow */}
        <div className="absolute -bottom-55 left-1/2 h-90 w-90 -translate-x-1/2 rounded-full bg-[#e50914]/5 blur-[100px] dark:bg-[#e50914]/10" />

        {/* Side glow */}
        <div className="absolute -right-30 top-1/2 h-70 w-70 -translate-y-1/2 rounded-full bg-[#e50914]/5 blur-[90px] dark:bg-[#e50914]/8" />
      </div>

      {/* Main Content */}
      <section className="relative z-10 w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/75 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl sm:p-8 md:p-10 dark:bg-background/65 dark:shadow-black/30">
          {/* Inner red accent border */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#e50914] to-transparent" />

          {/* Corner glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#e50914]/8 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            {/* Error Icon Wrapper */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/8 shadow-[0_0_45px_rgba(229,9,20,0.12)] sm:h-24 sm:w-24">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e50914] text-white shadow-lg shadow-[#e50914]/25 sm:h-14 sm:w-14">
                <AlertTriangle
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Error Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e50914]/15 bg-[#e50914]/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#e50914]">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>SWIFTCOURIER ERROR</span>
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Something went wrong
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              We couldn&apos;t complete this request right now. Please try
              again, or return to the SwiftCourier home page.
            </p>

            {/* Development Error Details */}
            {process.env.NODE_ENV === "development" && error?.message && (
              <details className="mt-6 w-full max-w-xl rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-left">
                <summary className="cursor-pointer select-none text-xs font-semibold text-destructive">
                  Development error details
                </summary>
                <p className="mt-3 overflow-auto whitespace-pre-wrap wrap-break-word text-xs leading-5 text-muted-foreground">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Digest: {error.digest}
                  </p>
                )}
              </details>
            )}

            {/* Actions */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
              {/* Try Again Button */}
              <button
                type="button"
                onClick={reset}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#e50914] px-5 text-sm font-semibold text-white shadow-lg shadow-[#e50914]/20 transition-all duration-200 hover:bg-[#c70812] hover:shadow-xl hover:shadow-[#e50914]/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                Try Again
              </button>

              {/* Home Link */}
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[#e50914]/30 hover:bg-[#e50914]/5 hover:text-[#e50914] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => window.history.back()}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-[#e50914]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Go back to previous page
            </button>

            {/* Footer Divider */}
            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="text-xs text-muted-foreground">
                SwiftCourier · Fast, secure & reliable delivery
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Notice */}
        <p className="mt-5 text-center text-[11px] text-muted-foreground/70">
          If the problem continues, please try again later.
        </p>
      </section>
    </main>
  );
};

export default ErrorPage;
