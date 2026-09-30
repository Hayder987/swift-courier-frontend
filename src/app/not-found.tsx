"use client";

import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  MapPinOff,
  MoveUpRight,
} from "lucide-react";
import Link from "next/link";
import SwiftLogo from "@/components/common/SwiftLogo";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* =========================================================
          Ambient Background
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* FAQ-style grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.22)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.22)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)] dark:bg-[linear-gradient(to_right,hsl(var(--border)/0.18)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.18)_1px,transparent_1px)]" />

        {/* Main ambient red glow */}
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#e50914]/8 blur-[130px] dark:bg-[#e50914]/14" />

        {/* Bottom ambient glow */}
        <div className="absolute bottom-[-260px] left-1/2 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-[#e50914]/5 blur-[120px] dark:bg-[#e50914]/10" />

        {/* Left ambient glow */}
        <div className="absolute left-[-180px] top-1/3 h-[320px] w-[320px] rounded-full bg-[#e50914]/4 blur-[110px] dark:bg-[#e50914]/7" />

        {/* Right ambient glow */}
        <div className="absolute right-[-180px] top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#e50914]/4 blur-[120px] dark:bg-[#e50914]/7" />
      </div>

      {/* =========================================================
          Main Section
      ========================================================= */}
      <section className="relative z-10 w-full max-w-3xl">
        {/* Outer ambient frame */}
        <div className="rounded-[2rem] border border-[#e50914]/10 bg-[#e50914]/[0.02] p-1 shadow-[0_0_100px_rgba(229,9,20,0.05)] dark:bg-[#e50914]/[0.03]">
          {/* Main glass card */}
          <div className="relative overflow-hidden rounded-[1.85rem] border border-border/60 bg-background/80 px-5 py-8 shadow-2xl shadow-black/5 backdrop-blur-2xl sm:px-8 sm:py-10 md:px-12 md:py-12 dark:bg-background/70 dark:shadow-black/40">
            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e50914]/80 to-transparent" />

            {/* Inner top glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-[#e50914]/5 blur-[70px] dark:bg-[#e50914]/10" />

            {/* Corner glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#e50914]/5 blur-[80px] dark:bg-[#e50914]/10" />

            <div className="relative flex flex-col items-center text-center">
              {/* ===================================================
                  Brand
              =================================================== */}
              <div className="mb-8 flex items-center justify-center">
                <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#e50914]/20 hover:shadow-md">
                  <SwiftLogo />
                </div>
              </div>

              {/* ===================================================
                  Route Status
              =================================================== */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e50914]/15 bg-[#e50914]/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e50914] shadow-sm shadow-[#e50914]/5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e50914]/50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e50914]" />
                </span>

                <Compass className="h-3.5 w-3.5" />

                <span>Route Not Found</span>
              </div>

              {/* ===================================================
                  404 Visual
              =================================================== */}
              <div className="relative mb-7">
                {/* Outer ring */}
                <div className="absolute inset-[-22px] rounded-full border border-[#e50914]/5" />

                {/* Middle ring */}
                <div className="absolute inset-[-12px] rounded-full border border-[#e50914]/10" />

                {/* Main logo container */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-[1.7rem] border border-[#e50914]/20 bg-gradient-to-br from-[#e50914]/15 via-[#e50914]/5 to-transparent shadow-[0_0_60px_rgba(229,9,20,0.12)] sm:h-28 sm:w-28">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e50914] text-white shadow-[0_10px_35px_rgba(229,9,20,0.28)] sm:h-16 sm:w-16">
                    <MapPinOff
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>
              </div>

              {/* ===================================================
                  404 Number
              =================================================== */}
              <div className="select-none bg-gradient-to-b from-[#e50914] via-[#e50914]/90 to-[#e50914]/45 bg-clip-text text-[5.5rem] font-black leading-[0.8] tracking-[-0.08em] text-transparent drop-shadow-[0_10px_30px_rgba(229,9,20,0.12)] sm:text-[7rem] md:text-[8.5rem]">
                404
              </div>

              {/* ===================================================
                  Heading
              =================================================== */}
              <h1 className="mt-7 max-w-xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-[2.15rem]">
                We couldn&apos;t find this destination
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                This route doesn&apos;t seem to exist anymore. It may have been
                moved, removed, or the address may have been entered
                incorrectly.
              </p>

              {/* ===================================================
                  Route Indicator
              =================================================== */}
              <div className="mt-7 flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs text-muted-foreground shadow-sm backdrop-blur-sm">
                <span className="font-medium text-foreground">
                  Current route
                </span>

                <span className="text-border">/</span>

                <span className="max-w-[180px] truncate font-mono text-[11px]">
                  destination-not-found
                </span>

                <MoveUpRight className="h-3.5 w-3.5 text-[#e50914]" />
              </div>

              {/* ===================================================
                  Actions
              =================================================== */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                {/* Home */}
                <Link
                  href="/"
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#e50914] px-6 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(229,9,20,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c70812] hover:shadow-[0_12px_35px_rgba(229,9,20,0.25)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Home className="h-4 w-4" />

                  <span>Back to Home</span>

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Go Back */}
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-border bg-background/80 px-6 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e50914]/30 hover:bg-[#e50914]/5 hover:text-[#e50914] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

                  <span>Go Back</span>
                </button>
              </div>

              {/* ===================================================
                  Trust / Helper Message
              =================================================== */}
              <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e50914] shadow-[0_0_8px_rgba(229,9,20,0.7)]" />

                <span>SwiftCourier is ready to get you back on track.</span>
              </div>

              {/* ===================================================
                  Footer
              =================================================== */}
              <div className="mt-8 w-full border-t border-border/60 pt-6">
                <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-muted-foreground sm:flex-row sm:gap-2">
                  <span className="font-medium text-foreground/80">
                    SwiftCourier
                  </span>

                  <span className="hidden text-border sm:inline">•</span>

                  <span>Fast, secure & reliable delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
          <span>HTTP</span>
          <span className="font-bold text-[#e50914]">404</span>
          <span>•</span>
          <span>Page Not Found</span>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
