"use client";

import {
  Boxes,
  Clock3,
  CreditCard,
  MapPinned,
  PackageCheck,
  Route,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const services = [
  {
    icon: PackageCheck,
    title: "Parcel Delivery",
    description:
      "Send parcels safely and conveniently with a reliable delivery workflow designed for everyday shipments.",
    features: ["Fast processing", "Secure handling", "Delivery updates"],
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description:
      "Move urgent parcels faster with priority delivery support for time-sensitive shipments.",
    features: ["Priority handling", "Faster dispatch", "Live status"],
  },
  {
    icon: Route,
    title: "Real-Time Tracking",
    description:
      "Track your shipment journey from creation to delivery with clear and up-to-date parcel status.",
    features: ["Shipment tracking", "Status updates", "Delivery visibility"],
  },
  {
    icon: MapPinned,
    title: "Zone-Based Delivery",
    description:
      "Our delivery system organizes shipments by service zones to make routing and courier assignment efficient.",
    features: ["Smart routing", "Zone management", "Courier assignment"],
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Complete delivery payments through a secure payment workflow with verified transaction processing.",
    features: [
      "Secure checkout",
      "Payment verification",
      "Transaction tracking",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    description:
      "Built with secure authentication, controlled access, and reliable shipment handling throughout the journey.",
    features: ["Protected data", "Secure access", "Reliable service"],
  },
];

const stats = [
  {
    value: "24/7",
    label: "Shipment Visibility",
  },
  {
    value: "100%",
    label: "Secure Workflow",
  },
  {
    value: "Real-Time",
    label: "Status Updates",
  },
];

const ServiceContent = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-28">
      {/* Top Red Glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-140 rounded-full bg-[#e50914]/6 blur-[130px] dark:bg-[#e50914]/15" />

      {/* Bottom Red Glow */}
      <div className="pointer-events-none absolute -bottom-48 -left-48 size-140 rounded-full bg-[#e50914]/5 blur-[140px] dark:bg-[#e50914]/10" />

      {/* Center Red Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-100 -translate-x-1/2 rounded-full bg-[#e50914]/3 blur-[150px] dark:bg-[#e50914]/5" />

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

      {/* Main Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e50914] dark:border-[#e50914]/30 dark:bg-[#e50914]/10">
            <Sparkles className="size-3.5" />
            SwiftCourier Services
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-black tracking-tight text-slate-950 transition-colors duration-300 dark:text-white sm:text-4xl lg:text-5xl">
            Delivery Made{" "}
            <span className="text-[#e50914]">Simple & Reliable</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400 sm:text-base">
            From everyday parcel delivery to real-time shipment tracking,
            SwiftCourier provides a complete logistics experience built for
            speed, security, and convenience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#e50914]/20 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-[#e50914]/25 dark:hover:bg-white/6 sm:p-7"
              >
                {/* Top Accent */}
                <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#e50914]/0 to-transparent transition-all duration-500 group-hover:via-[#e50914]" />

                {/* Card Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-[#e50914]/5 blur-[70px] transition-all duration-500 group-hover:bg-[#e50914]/12 dark:bg-[#e50914]/8 dark:group-hover:bg-[#e50914]/15" />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl border border-[#e50914]/15 bg-[#e50914]/6 text-[#e50914] shadow-[0_0_35px_rgba(229,9,20,0.05)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#e50914]/30 group-hover:bg-[#e50914]/10 group-hover:shadow-[0_0_35px_rgba(229,9,20,0.12)] dark:border-[#e50914]/25 dark:bg-[#e50914]/10">
                    <Icon className="size-6" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black tracking-tight text-slate-900 transition-colors duration-300 dark:text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mt-6 space-y-2.5">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-xs font-medium text-slate-500 transition-colors duration-300 dark:text-slate-400"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e50914]/8 text-[#e50914] dark:bg-[#e50914]/10">
                          <span className="size-1.5 rounded-full bg-[#e50914]" />
                        </span>

                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          {/* Glow */}
          <div className="pointer-events-none absolute -left-20 top-1/2 size-60 -translate-y-1/2 rounded-full bg-[#e50914]/5 blur-[100px] dark:bg-[#e50914]/10" />

          {/* Red Top Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#e50914]/60 to-transparent" />

          <div className="relative grid lg:grid-cols-[1.1fr_1fr]">
            {/* Left */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#e50914]/8 text-[#e50914] dark:bg-[#e50914]/10">
                <Boxes className="size-6" strokeWidth={1.8} />
              </div>

              <h3 className="max-w-xl text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                One platform for your{" "}
                <span className="text-[#e50914]">
                  complete delivery journey.
                </span>
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                SwiftCourier connects customers, couriers, and delivery
                operations through a streamlined logistics platform. Every
                shipment can move through a clear and trackable workflow.
              </p>
            </div>

            {/* Right Stats */}
            <div className="grid border-t border-slate-200 dark:border-white/10 lg:grid-cols-3 lg:border-l lg:border-t-0">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex min-h-32 flex-col justify-center px-6 py-7 sm:px-8 ${
                    index !== 0
                      ? "border-t border-slate-200 dark:border-white/10 lg:border-l lg:border-t-0"
                      : ""
                  }`}
                >
                  <p className="text-2xl font-black tracking-tight text-[#e50914] sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Service Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <Clock3 className="size-3.5 text-[#e50914]" />
            Fast Processing
          </div>

          <span className="hidden size-1 rounded-full bg-slate-300 dark:bg-slate-700 sm:block" />

          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-[#e50914]" />
            Secure Delivery
          </div>

          <span className="hidden size-1 rounded-full bg-slate-300 dark:bg-slate-700 sm:block" />

          <div className="flex items-center gap-2">
            <Truck className="size-3.5 text-[#e50914]" />
            Reliable Logistics
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;
