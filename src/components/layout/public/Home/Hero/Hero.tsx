"use client";

import {
  ArrowRight,
  ChevronRight,
  Clock3,
  MapPin,
  Package,
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
    <section className="relative isolate overflow-hidden pt-6 sm:pt-8 lg:pt-10">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[640px] overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-[0_25px_80px_-30px_rgba(0,0,0,0.18)] dark:shadow-[0_30px_90px_-30px_rgba(0,0,0,0.85)]">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -left-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#e50914]/[0.06] blur-[120px] dark:bg-[#e50914]/10" />
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#e50914]/[0.045] blur-[140px] dark:bg-[#e50914]/[0.09]" />

          {/* Grid texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:60px_60px]" />

          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e50914] to-transparent opacity-60 dark:opacity-80" />

          <div className="relative z-10 grid min-h-[640px] items-center lg:grid-cols-[0.95fr_1.05fr]">
            {/* ───────── LEFT ───────── */}
            <div className="relative z-20 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge className="border border-[#e50914]/20 bg-[#e50914]/[0.07] px-3 py-1.5 text-[#d90812] hover:bg-[#e50914]/10 dark:border-[#e50914]/30 dark:bg-[#e50914]/10 dark:text-[#ff5b63] dark:hover:bg-[#e50914]/15">
                  <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-[#e50914] motion-reduce:animate-none" />
                  LIVE DELIVERY NETWORK
                </Badge>

                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <ShieldCheck className="size-3.5 text-[#e50914]" />
                  SECURE
                </div>
              </div>

              <div className="max-w-2xl">
                <h1 className="text-4xl font-black tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.4rem] lg:leading-[0.98]">
                  Delivery that
                  <span className="block">
                    moves at
                    <span className="relative ml-2 inline-block text-[#e50914]">
                      your speed.
                      <span className="absolute -bottom-2 left-0 h-1 w-2/3 rounded-full bg-[#e50914] shadow-[0_0_18px_rgba(229,9,20,0.45)]" />
                    </span>
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  From pickup to doorstep, SwiftCourier gives you real-time
                  visibility, intelligent routing and lightning-fast
                  delivery—all in one powerful platform.
                </p>
              </div>

              {/* CTA — primary + secondary */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="group h-13 rounded-xl bg-[#e50914] px-7 font-bold text-white shadow-[0_0_30px_rgba(229,9,20,0.2)] transition-all hover:bg-[#f0141f] hover:shadow-[0_0_40px_rgba(229,9,20,0.35)] focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Link href="/faq">
                    Having Question
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-xl border-border bg-background/60 px-7 font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:border-[#e50914]/40 hover:bg-[#e50914]/[0.06] hover:text-[#e50914] focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-muted/40 p-4 backdrop-blur-xl">
                <div className="px-3">
                  <div className="text-xl font-black text-foreground sm:text-2xl">
                    98.7%
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    On-time
                  </div>
                </div>

                <div className="px-3">
                  <div className="text-xl font-black text-foreground sm:text-2xl">
                    24/7
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Tracking
                  </div>
                </div>

                <div className="px-3">
                  <div className="text-xl font-black text-foreground sm:text-2xl">
                    64+
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Zones
                  </div>
                </div>
              </div>
            </div>

            {/* ───────── RIGHT (3D + HUD) ───────── */}
            <div className="relative min-h-[420px] lg:min-h-[640px]">
              <div className="absolute inset-0">
                <HeroScene />
              </div>

              {/* HUDs — on mobile they stack at bottom to avoid overlap */}
              <div className="pointer-events-none absolute inset-0 z-20">
                {/* Network HUD */}
                <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
                  <Card className="w-[168px] border-border bg-background/75 p-3 text-foreground shadow-xl backdrop-blur-xl dark:bg-black/50">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Network
                      </span>
                      <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
                        ONLINE
                      </span>
                    </div>
                    <div className="mt-3 text-xl font-black">99.98%</div>
                    <div className="mt-1 text-[9px] text-muted-foreground">
                      System availability
                    </div>
                  </Card>
                </div>

                {/* Active Route HUD */}
                <div className="absolute left-5 top-5 sm:left-8 sm:top-8 lg:left-auto lg:bottom-10 lg:right-auto">
                  <Card className="w-[220px] border-border bg-background/80 p-4 text-foreground shadow-2xl backdrop-blur-xl dark:bg-black/55">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Active Route
                      </span>
                      <Zap className="size-3.5 text-[#e50914]" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-muted">
                          <MapPin className="size-3.5 text-foreground/70" />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold">
                            Pickup Hub
                          </div>
                          <div className="text-[9px] text-muted-foreground">
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
                <div className="absolute bottom-8 right-5 sm:bottom-10 sm:right-8 lg:bottom-10 lg:right-8">
                  <Card className="border-border bg-background/75 p-3 text-foreground shadow-xl backdrop-blur-xl dark:bg-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-[#e50914]/10">
                        <Clock3 className="size-4 text-[#e50914]" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                          ETA
                        </div>
                        <div className="text-sm font-black">18 min</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Decorative lines */}
              <div className="pointer-events-none absolute right-0 top-1/2 h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#e50914]/40 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 right-1/3 h-px w-32 bg-gradient-to-r from-transparent via-[#e50914]/40 to-transparent" />
            </div>
          </div>

          {/* ───────── Bottom status strip ───────── */}
          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-background/60 px-5 py-3 backdrop-blur-xl dark:bg-black/30 sm:px-8">
            <div className="flex flex-col justify-between gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <Sparkles className="size-3 text-[#e50914]" />
                Intelligent logistics infrastructure
              </div>

              <div className="flex items-center gap-4">
                <span>FAST</span>
                <span className="text-border">•</span>
                <span>SECURE</span>
                <span className="text-border">•</span>
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
