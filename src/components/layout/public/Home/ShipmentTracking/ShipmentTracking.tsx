"use client";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  MoveUpRight,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import TrackingVisual from "./tracking-visual";

const FEATURES = [
  {
    number: "01",
    icon: Zap,
    title: "Speed that matters",
    description:
      "A streamlined delivery experience designed to keep your business and parcels moving.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Care at every step",
    description:
      "Thoughtful parcel handling with a service experience you can feel confident about.",
  },
  {
    number: "03",
    icon: Globe2,
    title: "Connected logistics",
    description:
      "A more organized way to bring senders, delivery teams, and destinations together.",
  },
];

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Collection",
    description: "The journey begins.",
    icon: Package,
  },
  {
    number: "02",
    title: "On the move",
    description: "Moving toward its destination.",
    icon: Truck,
  },
  {
    number: "03",
    title: "Arrival",
    description: "Reaching the right hands.",
    icon: Check,
  },
];

export default function ShipmentTracking() {
  return (
    <section
      id="delivery-experience"
      aria-labelledby="delivery-experience-title"
      className="relative isolate overflow-hidden border-y border-border/60 bg-background py-20 sm:py-24 lg:py-28"
    >
      {/* Ambient background — very restrained */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-12 size-[26rem] rounded-full bg-[#e50914]/[0.045] blur-[130px]" />
        <div className="absolute -right-40 bottom-0 size-[28rem] rounded-full bg-[#e50914]/[0.05] blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e50914]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ───────── Section Header ───────── */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <Badge
            variant="outline"
            className="mb-6 gap-2 rounded-full border-[#e50914]/25 bg-[#e50914]/[0.06] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e50914] sm:text-[11px]"
          >
            <Sparkles aria-hidden="true" className="size-3.5" />
            The SwiftCourier Experience
          </Badge>

          <h2
            id="delivery-experience-title"
            className="text-balance text-3xl font-black leading-[1.1] tracking-[-0.045em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Logistics, reimagined.
            <span className="mt-2 block text-[#e50914]">
              Delivered with purpose.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
            Every delivery connects people, businesses, and possibilities.
            We&rsquo;re building a smoother, smarter logistics experience for
            every step of the journey.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-7 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#e50914] to-[#f04452] sm:mt-8"
          />
        </div>

        {/* ───────── Main Grid ───────── */}
        <div className="grid items-stretch gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
          {/* LEFT — Features + CTA */}
          <div className="flex min-w-0 flex-col rounded-[1.75rem] border border-border/70 bg-card p-5 shadow-sm sm:p-7 lg:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e50914]">
                  Why SwiftCourier
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem]">
                  A better way to deliver.
                </h3>

                <p className="mt-2.5 max-w-md text-sm leading-6 text-muted-foreground">
                  Practical logistics with a focus on speed, care, and a
                  dependable customer experience.
                </p>
              </div>

              <div className="hidden size-11 shrink-0 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/[0.06] text-[#e50914] sm:flex">
                <MoveUpRight aria-hidden="true" className="size-[18px]" />
              </div>
            </div>

            <div>
              {FEATURES.map(({ number, icon: Icon, title, description }) => (
                <article
                  key={number}
                  className="group relative border-t border-border/60 py-5 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors duration-300 group-hover:border-[#e50914]/25 group-hover:bg-[#e50914]/[0.06] group-hover:text-[#e50914]">
                      <Icon
                        aria-hidden="true"
                        className="size-[19px] transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold tracking-tight text-foreground">
                          {title}
                        </h4>
                        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/60">
                          / {number}
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">
                        {description}
                      </p>
                    </div>

                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e50914]"
                    />
                  </div>
                </article>
              ))}
            </div>

            {/* CTA panel */}
            <div className="mt-7 rounded-2xl border border-[#e50914]/15 bg-gradient-to-br from-[#e50914]/[0.07] via-[#e50914]/[0.025] to-transparent p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914] text-white shadow-md shadow-[#e50914]/20">
                  <ArrowDownRight aria-hidden="true" className="size-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-foreground">
                    Let&rsquo;s move your business forward.
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Discover delivery services that fit your needs.
                  </p>
                </div>
              </div>

              <Link
                href="/services"
                className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#e50914] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#e50914]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c70812] hover:shadow-lg hover:shadow-[#e50914]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore our services
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT — Tracking visual + journey */}
          <div className="flex min-w-0 flex-col gap-5">
            <div className="relative isolate min-w-0 flex-1 overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-md shadow-black/[0.04] dark:shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)]">
              {/* Top accent */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#e50914]/60 to-transparent"
              />

              {/* Header */}
              <div className="relative z-10 flex items-start justify-between gap-4 px-5 pt-6 sm:px-7 sm:pt-7">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full rounded-full bg-[#e50914]/40 motion-safe:animate-ping motion-reduce:animate-none" />
                      <span className="relative inline-flex size-2 rounded-full bg-[#e50914]" />
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px]">
                      The delivery ecosystem
                    </p>
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    From here to there.
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Every parcel has a destination.
                  </p>
                </div>

                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#e50914]/15 bg-[#e50914]/[0.06] text-[#e50914]">
                  <Truck aria-hidden="true" className="size-5" />
                </div>
              </div>

              {/* Tracking visualization */}
              <div className="relative mt-4 min-w-0 px-3 pb-2 sm:px-4">
                <TrackingVisual className="border-0 bg-transparent shadow-none" />
              </div>

              {/* Journey stages */}
              <div className="relative z-10 mt-2 border-t border-border/60 bg-background/40 p-5 backdrop-blur-md sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground sm:text-[15px]">
                      The journey, simplified.
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Three steps. One connected experience.
                    </p>
                  </div>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <Package aria-hidden="true" className="size-4" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {JOURNEY_STEPS.map(
                    ({ number, title, description, icon: Icon }, index) => (
                      <div key={number} className="relative min-w-0">
                        <div className="mb-2.5 flex items-center gap-2">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors duration-300 hover:border-[#e50914]/30 hover:text-[#e50914] sm:size-10">
                            <Icon aria-hidden="true" className="size-[17px]" />
                          </div>
                          <span className="hidden text-[10px] font-bold tracking-widest text-muted-foreground/60 sm:inline">
                            {number}
                          </span>
                        </div>

                        <h5 className="truncate text-xs font-bold text-foreground sm:text-sm">
                          {title}
                        </h5>
                        <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs sm:leading-5">
                          {description}
                        </p>

                        {index < JOURNEY_STEPS.length - 1 && (
                          <div
                            aria-hidden="true"
                            className="absolute right-0 top-5 hidden h-px w-5 translate-x-1/2 bg-border sm:block lg:w-7"
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Bottom reassurance card */}
            <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card/70 p-4 sm:p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e50914]/[0.07] text-[#e50914]">
                <ShieldCheck aria-hidden="true" className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-foreground">
                  Service with care.
                </h4>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Designed around a smoother, more reassuring delivery
                  experience.
                </p>
              </div>
              <Sparkles
                aria-hidden="true"
                className="size-5 shrink-0 text-[#e50914]/70"
              />
            </div>
          </div>
        </div>

        {/* ───────── Bottom statement ───────── */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Better connections start with a better delivery experience.
          </p>

          <Link
            href="/contact"
            className="inline-flex min-h-10 w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-[#e50914] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Connect with SwiftCourier
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
