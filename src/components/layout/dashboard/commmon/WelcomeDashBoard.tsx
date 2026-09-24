"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { roleContent } from "@/lib/user.role.content";
import type { UserRole } from "@/types";

type WelcomeDashBoardProps = {
  role: UserRole;
};

const WelcomeDashBoard = ({ role }: WelcomeDashBoardProps) => {
  const content = roleContent[role];
  const RoleIcon = content.icon;

  return (
    <main className="relative min-h-[calc(100vh-2rem)] w-full overflow-hidden rounded-3xl border border-border bg-background">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full bg-[#e50914]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-112.5 w-112.5 rounded-full bg-[#e50914]/5 blur-[120px]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#e50914_1px,transparent_1px),linear-gradient(to_bottom,#e50914_1px,transparent_1px)] bg-size-[48px_48px]" />

      {/* DECORATIVE ELEMENTS */}
      <div className="pointer-events-none absolute left-[8%] top-[15%] hidden size-2 rounded-full bg-[#e50914] shadow-[0_0_18px_#e50914] sm:block" />
      <div className="pointer-events-none absolute right-[12%] top-[32%] hidden size-1.5 rounded-full bg-[#e50914]/60 shadow-[0_0_14px_#e50914] md:block" />
      <div className="pointer-events-none absolute bottom-[20%] left-[18%] hidden size-1.5 rounded-full bg-[#e50914]/50 md:block" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex min-h-[calc(100vh-2rem)] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* LEFT CONTENT */}
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#e50914] backdrop-blur-xl">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e50914]/50" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#e50914]" />
                </span>
                <span>{content.badge}</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                {content.title}
                <span className="mt-1 block">
                  <span className="bg-linear-to-r from-[#e50914] via-[#ff333d] to-[#e50914] bg-clip-text text-transparent">
                    {content.highlight}
                  </span>
                  <span className="text-foreground">.</span>
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 lg:text-lg">
                {content.description}
              </p>

              {/* Features */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {content.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-card/40 px-3.5 py-3 backdrop-blur-xl"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[#e50914]"
                      strokeWidth={2}
                    />
                    <span className="text-xs leading-5 text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom message */}
              <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
                  <Sparkles className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Everything is ready for you.
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Explore your SwiftCourier dashboard and get started.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative flex items-center justify-center">
              {/* Outer glow */}
              <div className="absolute size-65 rounded-full bg-[#e50914]/10 blur-[80px] sm:size-85" />

              {/* Main visual */}
              <div className="relative w-full max-w-107.5 overflow-hidden rounded-[2rem] border border-border bg-card/50 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
                {/* Top red line */}
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-[#e50914] to-transparent" />

                {/* Inner background */}
                <div className="absolute inset-0 bg-linear-to-br from-[#e50914]/5 via-transparent to-[#e50914]/5" />

                <div className="relative">
                  {/* Icon area */}
                  <div className="flex items-center justify-between">
                    <div className="flex size-16 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914] shadow-lg shadow-[#e50914]/10 sm:size-20">
                      <RoleIcon
                        className="size-8 sm:size-10"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
                      <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                      <span className="text-[11px] font-medium text-emerald-500">
                        Online
                      </span>
                    </div>
                  </div>

                  {/* Visual title */}
                  <div className="mt-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      SwiftCourier
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      Move smarter.
                      <br />
                      <span className="text-[#e50914]">Deliver faster.</span>
                    </h2>
                  </div>

                  {/* Decorative route */}
                  <div className="relative mt-8 h-24">
                    {/* Route line */}
                    <div className="absolute left-5 right-5 top-1/2 h-px border-t border-dashed border-[#e50914]/30" />

                    {/* Start */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                      <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background shadow-lg">
                        <div className="size-2.5 rounded-full bg-[#e50914] shadow-[0_0_12px_#e50914]" />
                      </div>
                    </div>

                    {/* Center */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex size-12 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914] shadow-lg shadow-[#e50914]/10">
                        <Truck className="size-5" />
                      </div>
                    </div>

                    {/* End */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <div className="flex size-10 items-center justify-center rounded-full border border-border bg-background shadow-lg">
                        <CheckCircle2 className="size-5 text-emerald-500" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-border bg-background/60 p-4 backdrop-blur-xl">
                      <Clock3 className="size-4 text-[#e50914]" />
                      <p className="mt-3 text-xs text-muted-foreground">
                        Experience
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        Fast & Simple
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background/60 p-4 backdrop-blur-xl">
                      <Users className="size-4 text-[#e50914]" />
                      <p className="mt-3 text-xs text-muted-foreground">
                        Platform
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        Built for Everyone
                      </p>
                    </div>
                  </div>

                  {/* Explore indicator */}
                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#e50914]/10 bg-[#e50914]/5 px-4 py-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      Your journey starts here
                    </span>
                    <ArrowRight className="size-4 text-[#e50914]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER BRAND LINE */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-border sm:w-20" />
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Package className="size-3.5 text-[#e50914]" />
              <span>SwiftCourier Logistics Platform</span>
            </div>
            <div className="h-px w-12 bg-border sm:w-20" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomeDashBoard;
