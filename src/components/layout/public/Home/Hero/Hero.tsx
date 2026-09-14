"use client";

import {
  ArrowRight,
  ChevronRight,
  Clock3,
  MapPin,
  Package,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden py-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[650px] overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white shadow-[0_25px_80px_-30px_rgba(0,0,0,0.2)] dark:border-white/[0.08] dark:bg-[#080808] dark:shadow-2xl">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -left-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#e50914]/[0.06] blur-[120px] dark:bg-[#e50914]/10" />

          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#e50914]/[0.045] blur-[140px] dark:bg-[#e50914]/10" />

          {/* Light theme glow */}
          <div className="pointer-events-none absolute left-[45%] top-1/2 hidden h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-red-500/[0.025] blur-[100px] dark:block" />

          {/* Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.045] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:60px_60px]" />

          {/* Top laser line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e50914] to-transparent opacity-60 dark:opacity-80" />

          <div className="relative z-10 grid min-h-[650px] items-center lg:grid-cols-[0.95fr_1.05fr]">
            {/* LEFT CONTENT */}
            <div className="relative z-20 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge className="border border-[#e50914]/20 bg-[#e50914]/[0.07] px-3 py-1.5 text-[#d90812] hover:bg-[#e50914]/10 dark:border-[#e50914]/30 dark:bg-[#e50914]/10 dark:text-[#ff5b63] dark:hover:bg-[#e50914]/15">
                  <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-[#e50914]" />
                  LIVE DELIVERY NETWORK
                </Badge>

                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-white/50">
                  <ShieldCheck className="size-3.5 text-[#e50914]" />
                  SECURE
                </div>
              </div>

              <div className="max-w-2xl">
                <h1 className="text-4xl font-black tracking-[-0.045em] text-zinc-950 sm:text-5xl md:text-6xl lg:text-[4.4rem] lg:leading-[0.98] dark:text-white">
                  Delivery that
                  <span className="block">
                    moves at
                    <span className="relative ml-2 inline-block text-[#e50914]">
                      your speed.
                      <span className="absolute -bottom-2 left-0 h-1 w-2/3 rounded-full bg-[#e50914] shadow-[0_0_18px_rgba(229,9,20,0.55)]" />
                    </span>
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-white/60">
                  From pickup to doorstep, SwiftCourier gives you real-time
                  visibility, intelligent routing and lightning-fast
                  delivery—all in one powerful platform.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="group h-13 rounded-xl bg-[#e50914] px-7 font-bold text-white shadow-[0_0_30px_rgba(229,9,20,0.2)] transition-all hover:bg-[#f0141f] hover:shadow-[0_0_40px_rgba(229,9,20,0.35)]"
                >
                  <Link href="/send-parcel">
                    Send a Parcel
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                {/* <Button
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-xl border-zinc-200 bg-zinc-50 px-7 font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] dark:hover:text-white"
                >
                  <Link href="/track">
                    <Play className="mr-2 size-4 fill-current" />
                    Track Delivery
                  </Link>
                </Button> */}
              </div>

              {/* Stats */}
              <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 backdrop-blur-xl dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.035]">
                <div className="px-3">
                  <div className="text-xl font-black text-zinc-950 sm:text-2xl dark:text-white">
                    98.7%
                  </div>

                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-white/35">
                    On-time
                  </div>
                </div>

                <div className="px-3">
                  <div className="text-xl font-black text-zinc-950 sm:text-2xl dark:text-white">
                    24/7
                  </div>

                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-white/35">
                    Tracking
                  </div>
                </div>

                <div className="px-3">
                  <div className="text-xl font-black text-zinc-950 sm:text-2xl dark:text-white">
                    64+
                  </div>

                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-white/35">
                    Zones
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 3D AREA */}
            <div className="relative min-h-[390px] lg:min-h-[650px]">
              <div className="absolute inset-0">
                <HeroScene />
              </div>

              {/* Network HUD */}
              <div className="absolute right-5 top-5 z-20 sm:right-8 sm:top-8">
                <Card className="w-[170px] border-zinc-200 bg-white/75 p-3 text-zinc-950 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-white/40">
                      Network
                    </span>

                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500">
                      <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                      ONLINE
                    </span>
                  </div>

                  <div className="mt-3 text-xl font-black">99.98%</div>

                  <div className="mt-1 text-[9px] text-zinc-400 dark:text-white/35">
                    System availability
                  </div>
                </Card>
              </div>

              {/* Active route HUD */}
              <div className="absolute bottom-8 left-5 z-20 sm:bottom-10 sm:left-8">
                <Card className="w-[220px] border-zinc-200 bg-white/80 p-4 text-zinc-950 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/45 dark:text-white">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-white/40">
                      Active Route
                    </span>

                    <Zap className="size-3.5 text-[#e50914]" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/5">
                        <MapPin className="size-3.5 text-zinc-600 dark:text-white/70" />
                      </div>

                      <div>
                        <div className="text-[11px] font-semibold">
                          Pickup Hub
                        </div>

                        <div className="text-[9px] text-zinc-400 dark:text-white/35">
                          Dhaka Central
                        </div>
                      </div>
                    </div>

                    <div className="ml-3 h-5 border-l border-dashed border-[#e50914]/50" />

                    <div className="flex items-center gap-3">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-[#e50914]/10">
                        <Package className="size-3.5 text-[#e50914]" />
                      </div>

                      <div>
                        <div className="text-[11px] font-semibold">
                          In Transit
                        </div>

                        <div className="text-[9px] text-emerald-500">
                          Moving • 42 km/h
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* ETA HUD */}
              <div className="absolute bottom-8 right-5 z-20 sm:bottom-10 sm:right-8">
                <Card className="border-zinc-200 bg-white/75 p-3 text-zinc-950 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-[#e50914]/10">
                      <Clock3 className="size-4 text-[#e50914]" />
                    </div>

                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/35">
                        ETA
                      </div>

                      <div className="text-sm font-black">18 min</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Decorative lines */}
              <div className="absolute right-0 top-1/2 h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#e50914]/40 to-transparent" />

              <div className="absolute bottom-0 right-1/3 h-px w-32 bg-gradient-to-r from-transparent via-[#e50914]/40 to-transparent" />
            </div>
          </div>

          {/* Bottom status */}
          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-zinc-200 bg-white/50 px-5 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/20 sm:px-8">
            <div className="flex flex-col justify-between gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-white/30 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <Sparkles className="size-3 text-[#e50914]" />
                Intelligent logistics infrastructure
              </div>

              <div className="flex items-center gap-4">
                <span>FAST</span>
                <span className="text-zinc-300 dark:text-white/15">•</span>

                <span>SECURE</span>

                <span className="text-zinc-300 dark:text-white/15">•</span>

                <span>TRACKABLE</span>

                <ChevronRight className="size-3 text-[#e50914]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
