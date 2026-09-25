"use client";

import {
  ArrowRight,
  Boxes,
  Globe2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { aboutFeatures, aboutStats } from "@/lib/about";

import AboutThreeScene from "./about-3d-scene";

interface AboutContentProps {
  dark: boolean;
  mounted: boolean;
}

const AboutContent = ({ dark, mounted }: AboutContentProps) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* ==================== BACKGROUND ==================== */}

      {/* Top Red Glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-140 rounded-full bg-[#e50914]/6 blur-[130px] dark:bg-[#e50914]/15" />

      {/* Bottom Red Glow */}
      <div className="pointer-events-none absolute -bottom-48 -left-48 size-140 rounded-full bg-[#e50914]/5 blur-[140px] dark:bg-[#e50914]/10" />

      {/* Center Red Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[35%] size-100 -translate-x-1/2 rounded-full bg-[#e50914]/3 blur-[150px] dark:bg-[#e50914]/5" />

      {/* Subtle Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ==================== HERO ==================== */}

      <section className="relative min-h-[calc(100svh-5rem)] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-6">
          {/* Left */}
          <div className="relative z-10 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-4 py-2 text-xs font-semibold tracking-wide text-[#e50914] backdrop-blur-xl">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e50914] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#e50914]" />
              </span>
              THE FUTURE OF DELIVERY
            </div>

            <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              Moving the
              <br />
              <span className="relative inline-block text-[#e50914]">
                world
                <span className="absolute -right-4 bottom-1 size-2 rounded-full bg-[#e50914] shadow-[0_0_20px_#e50914]" />
              </span>{" "}
              forward.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400 sm:text-lg sm:leading-8">
              SwiftCourier is a modern courier and logistics platform built to
              make shipping faster, smarter and more transparent — connecting
              customers, couriers and operations through one intelligent
              ecosystem.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/track"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[#e50914] px-6 text-sm font-bold text-white shadow-xl shadow-[#e50914]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c70812] hover:shadow-[#e50914]/35"
              >
                Track a Shipment
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-6 text-sm font-bold text-slate-900 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e50914]/30 hover:text-[#e50914] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-500">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#e50914]" />
                Secure Platform
              </span>

              <span className="flex items-center gap-2">
                <Zap className="size-4 text-[#e50914]" />
                Real-Time Operations
              </span>

              <span className="flex items-center gap-2">
                <Globe2 className="size-4 text-[#e50914]" />
                Built to Scale
              </span>
            </div>
          </div>

          {/* 3D */}
          <div className="relative">
            <AboutThreeScene dark={dark} mounted={mounted} />

            {/* Floating Status Card */}
            <div className="absolute left-0 top-[14%] hidden w-45 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-2xl shadow-slate-900/5 backdrop-blur-2xl sm:block dark:border-white/10 dark:bg-white/5 dark:shadow-none">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
                  <Truck className="size-4" />
                </div>

                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  LIVE
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active Shipments
              </p>

              <p className="mt-1 text-xl font-black">2,481</p>
            </div>

            {/* Network Card */}
            <div className="absolute bottom-[13%] right-0 hidden w-48 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-2xl shadow-slate-900/5 backdrop-blur-2xl sm:block dark:border-white/10 dark:bg-white/5 dark:shadow-none">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
                  <MapPin className="size-4" />
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Network Status
                  </p>

                  <p className="text-sm font-bold">All Systems Go</p>
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-full w-[94%] rounded-full bg-[#e50914]" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:flex">
          <span>Scroll to explore</span>
          <span className="h-8 w-px bg-linear-to-b from-[#e50914] to-transparent" />
        </div>
      </section>

      {/* ==================== STATS ==================== */}

      <section className="relative border-y border-slate-200/80 bg-white/40 px-4 py-8 backdrop-blur-sm dark:border-white/6 dark:bg-white/2 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200/80 dark:divide-white/8 lg:grid-cols-4">
          {aboutStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group px-4 py-5 text-center sm:px-6 lg:px-8"
              >
                <Icon className="mx-auto mb-3 size-5 text-[#e50914] transition-transform duration-300 group-hover:scale-110" />

                <p className="text-2xl font-black tracking-tight sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[10px] font-medium text-slate-500 sm:text-xs dark:text-slate-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== STORY / MISSION ==================== */}

      <section className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#e50914]">
              <span className="h-px w-8 bg-[#e50914]" />
              Why SwiftCourier
            </div>

            <h2 className="max-w-lg text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Logistics should feel{" "}
              <span className="text-[#e50914]">simple.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-500 dark:text-slate-400">
              We believe shipping should not require complexity. SwiftCourier
              brings the entire delivery journey into one connected platform,
              giving every participant clearer information and better control.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["SC", "24", "AI"].map((item) => (
                  <div
                    key={item}
                    className="flex size-9 items-center justify-center rounded-full border-2 border-slate-50 bg-slate-900 text-[9px] font-bold text-white dark:border-slate-950"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                One platform. Every delivery.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Feature Card */}
            <div className="group rounded-3xl border border-slate-200 bg-white/70 p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#e50914]/20 hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)] dark:border-white/8 dark:bg-white/5 dark:shadow-none">
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914] group-hover:text-white">
                <Sparkles className="size-5" />
              </div>

              <h3 className="text-xl font-bold">Built for modern commerce</h3>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Designed for businesses and individuals who expect speed,
                visibility and dependable delivery operations.
              </p>
            </div>

            {/* Ecosystem Card */}
            <div className="group mt-0 rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-xl transition-all duration-500 hover:-translate-y-1 dark:border-white/8 dark:bg-white/5 sm:mt-10">
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-[#e50914] text-white shadow-lg shadow-[#e50914]/20">
                <Boxes className="size-5" />
              </div>

              <h3 className="text-xl font-bold">One connected ecosystem</h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Customers, couriers and administrators work together through a
                unified logistics workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}

      <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/50 shadow-sm backdrop-blur-xl dark:border-white/7 dark:bg-white/2.5 dark:shadow-none">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Intro */}
            <div className="border-b border-slate-200 p-8 dark:border-white/7 sm:p-12 lg:border-b-0 lg:border-r lg:p-16">
              <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#e50914]">
                <span className="size-2 rounded-full bg-[#e50914]" />
                The Platform
              </div>

              <h2 className="text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                Technology behind every{" "}
                <span className="text-[#e50914]">mile.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                Every part of SwiftCourier is designed around a simple goal:
                make the movement of packages more intelligent and predictable.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2">
              {aboutFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className={`group p-8 transition-colors duration-300 hover:bg-white dark:hover:bg-white/2.5 ${
                      index < 2
                        ? "border-b border-slate-200 dark:border-white/7"
                        : ""
                    } ${
                      index % 2 === 0
                        ? "sm:border-r sm:border-slate-200 sm:dark:border-white/7"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914] group-hover:text-white">
                        <Icon className="size-5" />
                      </div>

                      <span className="text-xs font-bold text-slate-300 dark:text-white/15">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-7 text-lg font-bold">{feature.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}

      <section className="relative px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#e50914] px-7 py-14 text-center sm:px-12 sm:py-18">
          {/* Decorative Circles */}
          <div className="pointer-events-none absolute -left-32 -top-32 size-72 rounded-full border border-white/15" />

          <div className="pointer-events-none absolute -bottom-32 -right-32 size-72 rounded-full border border-white/15" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-xl">
              <Truck className="size-5" />
            </div>

            <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Ready to move something?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              Experience a smarter way to manage your deliveries with
              SwiftCourier.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#e50914] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-white/15"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutContent;
