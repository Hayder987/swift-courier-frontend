"use client";

import { ArrowLeft, Home, Shield, ShieldAlert, Truck } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6">
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/10 blur-[100px] sm:size-[420px]" />

      <div className="pointer-events-none absolute -left-20 top-1/4 size-52 rounded-full bg-[#e50914]/5 blur-[90px]" />

      <div className="pointer-events-none absolute -right-20 bottom-1/4 size-52 rounded-full bg-[#e50914]/5 blur-[90px]" />

      {/* Card */}
      <section className="relative z-10 w-full max-w-lg">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-2xl shadow-black/5 backdrop-blur-xl dark:bg-background/65 dark:shadow-black/30">
          {/* Top Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-[#e50914]" />

          {/* Decorative Glow */}
          <div className="absolute -right-20 -top-20 size-48 rounded-full bg-[#e50914]/10 blur-3xl" />

          <div className="relative px-6 py-8 text-center sm:px-10 sm:py-10">
            {/* Icon */}
            <div className="mx-auto mb-6 w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-[#e50914]/20 blur-xl" />

                <div className="relative flex size-20 items-center justify-center rounded-3xl border border-[#e50914]/20 bg-[#e50914]/5 shadow-lg shadow-[#e50914]/10 sm:size-24">
                  <ShieldAlert
                    className="size-10 text-[#e50914] sm:size-12"
                    strokeWidth={1.7}
                  />

                  {/* Truck Badge */}
                  <div className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-full border-4 border-background bg-[#e50914] text-white shadow-lg shadow-[#e50914]/30">
                    <Truck className="size-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-1.5 text-xs font-medium text-[#e50914]">
              <span className="size-1.5 rounded-full bg-[#e50914]" />
              Access Restricted
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Access Denied
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
              You don&apos;t have permission to access this page. Please return
              to a page available to your account.
            </p>

            {/* Divider */}
            <div className="mx-auto my-7 h-px w-full max-w-xs bg-border/60" />

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl bg-[#e50914] px-5
                  text-sm font-semibold text-white
                  shadow-lg shadow-[#e50914]/20
                  transition-all duration-200
                  hover:bg-[#c90812]
                  hover:shadow-[#e50914]/30
                  active:scale-[0.98]
                "
              >
                <Home className="size-4" />
                Back to Home
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl border border-border/70
                  bg-muted/40 px-5
                  text-sm font-semibold text-foreground
                  transition-all duration-200
                  hover:bg-muted
                  active:scale-[0.98]
                "
              >
                <ArrowLeft className="size-4" />
                Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="mt-5 flex items-center justify-center gap-2 text-muted-foreground/60">
          <Shield className="size-3.5" />
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] sm:text-xs">
            Swift<span className="text-[#e50914]">Courier</span>
          </p>
        </div>
      </section>
    </main>
  );
}
