import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
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
        </div>

        {/* Service Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.title}
                className="group relative overflow-hidden rounded-[1.75rem] border-border/50 bg-transparent shadow-none backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#e50914]/35 hover:shadow-[0_20px_60px_-25px_rgba(229,9,20,0.25)]"
              >
                {/* Premium Card Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-[#e50914]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Image Area */}
                <div className="relative h-57.5 overflow-hidden rounded-t-[1.75rem] border-b border-border/40 bg-muted/10">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    priority={service.title === "Parcel Delivery"}
                  />

                  {/* Image Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/85 via-background/5 to-transparent" />

                  {/* Top Accent Line */}
                  <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-[#e50914]/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-xl border border-[#e50914]/20 bg-background/65 text-[#e50914] shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 group-hover:border-[#e50914]/40 group-hover:bg-[#e50914]/10">
                    <Icon className="size-5" />
                  </div>

                  {/* Status */}
                  <div className="absolute bottom-4 left-4 rounded-full border border-[#e50914]/20 bg-background/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e50914] backdrop-blur-xl">
                    {service.meta}
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="relative p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-px w-6 bg-[#e50914]/70 transition-all duration-300 group-hover:w-10" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      SwiftCourier
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-[#e50914]">
                    {service.title}
                  </h3>

                  <p className="mt-3 min-h-18 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>

                  <Link
                    href="/services"
                    className="mt-5 inline-flex items-center text-sm font-semibold text-foreground transition-colors duration-300 hover:text-[#e50914]"
                  >
                    Explore service
                    <ArrowUpRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </CardContent>

                {/* Bottom Accent */}
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#e50914] shadow-[0_0_14px_#e50914] transition-all duration-500 group-hover:w-1/2" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
