import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section className="relative ">
      <div className="mx-auto w-full max-w-380 px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <Badge
            variant="outline"
            className="mb-5 rounded-full border-[#e50914]/25 bg-[#e50914]/5 px-3 py-1.5 text-[#e50914]"
          >
            <ShieldCheck className="mr-1.5 size-3.5" />
            OUR SERVICES
          </Badge>

          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            Everything You Need to{" "}
            <span className="text-[#e50914]">Move Anything.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            From a single parcel to recurring business deliveries, SwiftCourier
            gives you a faster, smarter, and more visible way to move what
            matters.
          </p>

          <div className="mt-7 flex justify-center">
            <Button
              variant="outline"
              className="rounded-full  border-border/70 bg-background/40 px-5 backdrop-blur-md transition-all hover:border-[#e50914]/40 hover:bg-[#e50914]/5"
            >
              <Link href="/services">
                <span className="flex justify-center items-center">
                  View all services
                  <ArrowUpRight className="ml-2 size-4" />
                </span>
              </Link>
            </Button>
          </div>
          <div
            aria-hidden="true"
            className="mx-auto mt-7 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#e50914] to-[#f04452] sm:mt-8"
          />
        </div>

        {/* Service Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.title}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#e50914]/35 hover:shadow-[0_24px_60px_-28px_rgba(229,9,20,0.28)]"
              >
                {/* Card top accent */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-[#e50914]/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Image / Illustration Area */}
                <div className="relative aspect-4/3 overflow-hidden border-b border-border/40 bg-muted/20">
                  {/* Soft radial vignette behind illustration (theme-aware) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.06),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.10),transparent_65%)]"
                  />

                  {/* Subtle dot grid texture */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.10] dark:opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "radial-gradient(currentColor 0.6px, transparent 0.6px)",
                      backgroundSize: "16px 16px",
                      color: "var(--color-muted-foreground, #6b7280)",
                      maskImage:
                        "radial-gradient(ellipse at center, black 30%, transparent 80%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse at center, black 30%, transparent 80%)",
                    }}
                  />

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="relative object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    priority={service.title === "Parcel Delivery"}
                  />

                  {/* Bottom fade */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card via-card/40 to-transparent"
                  />

                  {/* Icon */}
                  <div className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-xl border border-[#e50914]/20 bg-background/75 text-[#e50914] shadow-sm shadow-black/5 backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.05] group-hover:border-[#e50914]/40 group-hover:bg-[#e50914]/10">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>

                  {/* Meta badge */}
                  <div className="absolute bottom-3.5 left-4 rounded-full border border-[#e50914]/20 bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e50914] backdrop-blur-xl">
                    {service.meta}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="relative flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-px w-6 bg-[#e50914]/70 transition-all duration-300 group-hover:w-10"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      SwiftCourier
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-[#e50914] sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 flex-1 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>

                  <Link
                    href="/services"
                    className="mt-5 inline-flex items-center text-sm font-semibold text-foreground transition-colors duration-300 hover:text-[#e50914] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]"
                  >
                    Explore service
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-1.5 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </CardContent>

                {/* Bottom accent */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#e50914] shadow-[0_0_14px_#e50914] transition-all duration-500 group-hover:w-1/2"
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
