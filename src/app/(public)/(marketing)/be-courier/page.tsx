import {
  ArrowLeft,
  BadgeCheck,
  Bike,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo/logo.png";
import CourierApplyForm from "@/components/layout/public/Authentication/User-Form/courier-apply-form";

const BeACourierPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ============================================================ */}
        {/* LEFT — COURIER BANNER                                       */}
        {/* ============================================================ */}

        <section className="relative hidden overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-slate-950 lg:flex">
          {/* Top Red Glow */}
          <div className="pointer-events-none absolute -top-40 -right-40 size-140 rounded-full bg-[#e50914]/8 blur-[130px] dark:bg-[#e50914]/20" />

          {/* Bottom Red Glow */}
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-140 rounded-full bg-[#e50914]/5 blur-[140px] dark:bg-[#e50914]/10" />

          {/* Center Glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/3 blur-[130px] dark:bg-[#e50914]/5" />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 xl:p-14 2xl:p-20">
            {/* ======================================================== */}
            {/* Top                                                       */}
            {/* ======================================================== */}

            <div className="flex items-center justify-between">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src={logo}
                  alt="SwiftCourier"
                  width={150}
                  height={42}
                  className="h-auto w-35 object-contain"
                  priority
                />
              </Link>

              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <span className="size-2 rounded-full bg-[#e50914] shadow-[0_0_12px_rgba(229,9,20,0.55)]" />

                <span className="text-xs font-semibold text-slate-600 dark:text-white/70">
                  Courier Partner
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* Main                                                      */}
            {/* ======================================================== */}

            <div className="mx-auto w-full max-w-xl">
              {/* Icon */}
              <div className="mb-8 flex size-16 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/8 shadow-[0_0_50px_rgba(229,9,20,0.08)] transition-all duration-300 dark:border-[#e50914]/30 dark:bg-[#e50914]/10 dark:shadow-[0_0_60px_rgba(229,9,20,0.15)]">
                <Bike className="size-8 text-[#e50914]" strokeWidth={1.8} />
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 transition-colors duration-300 dark:text-white xl:text-5xl 2xl:text-6xl">
                Deliver with
                <span className="block text-[#e50914]">SwiftCourier.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400 xl:text-lg">
                Join our courier network, deliver parcels with confidence and
                build your journey with SwiftCourier.
              </p>

              {/* Feature Cards */}
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <FeatureCard
                  icon={<Zap className="size-4" />}
                  title="Work Flexibly"
                  description="Choose your own delivery schedule."
                />

                <FeatureCard
                  icon={<BadgeCheck className="size-4" />}
                  title="Verified Network"
                  description="Become a trusted courier partner."
                />

                <FeatureCard
                  icon={<MapPin className="size-4" />}
                  title="Smart Delivery"
                  description="Deliver across your service area."
                />

                <FeatureCard
                  icon={<ShieldCheck className="size-4" />}
                  title="Secure Process"
                  description="Your documents stay protected."
                />
              </div>

              {/* Application Flow */}
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#e50914]/10 text-[8px] text-[#e50914]">
                    01
                  </span>
                  Apply
                </div>

                <span className="hidden text-slate-300 sm:block dark:text-white/10">
                  —
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#e50914]/10 text-[8px] text-[#e50914]">
                    02
                  </span>
                  Verify
                </div>

                <span className="hidden text-slate-300 sm:block dark:text-white/10">
                  —
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#e50914]/10 text-[8px] text-[#e50914]">
                    03
                  </span>
                  Deliver
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* Bottom                                                     */}
            {/* ======================================================== */}

            <div className="flex items-center justify-between border-t border-slate-200 pt-6 transition-colors duration-300 dark:border-white/10">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                © {new Date().getFullYear()} SwiftCourier. All rights reserved.
              </p>

              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#e50914] shadow-[0_0_8px_rgba(229,9,20,0.5)]" />

                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Move faster.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* RIGHT — APPLY FORM                                           */}
        {/* ============================================================ */}

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-10 xl:px-16 dark:bg-slate-950">
          {/* Top Red Glow */}
          <div className="pointer-events-none absolute -top-40 -right-40 size-140 rounded-full bg-[#e50914]/6 blur-[130px] dark:bg-[#e50914]/15" />

          {/* Bottom Red Glow */}
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-140 rounded-full bg-[#e50914]/5 blur-[140px] dark:bg-[#e50914]/10" />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 w-full max-w-xl">
            {/* ======================================================== */}
            {/* Mobile Header                                             */}
            {/* ======================================================== */}

            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src={logo}
                  alt="SwiftCourier"
                  width={135}
                  height={38}
                  className="h-auto w-32 object-contain"
                  priority
                />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-[#e50914] dark:text-slate-400"
              >
                <ArrowLeft className="size-3.5" />
                Home
              </Link>
            </div>

            {/* Mobile Intro */}
            <div className="mb-7 lg:hidden">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-[#e50914] uppercase">
                <span className="size-1.5 rounded-full bg-[#e50914]" />
                Become a Courier
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-5xl dark:text-white">
                Start your
                <span className="text-[#e50914]"> journey.</span>
              </h1>

              <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Complete the form below and apply to become a SwiftCourier
                partner.
              </p>
            </div>

            {/* Form */}
            <CourierApplyForm />

            {/* Trust */}
            <div className="mt-7 flex items-center justify-center gap-2 text-center text-[10px] font-medium text-slate-400 dark:text-slate-500">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="size-3" />
              </span>
              Your application is handled securely.
            </div>

            {/* Back Home */}
            <div className="mt-5 text-center">
              <Link
                href="/"
                className="text-xs font-medium text-slate-400 transition-colors hover:text-[#e50914] dark:text-slate-500"
              >
                Return to SwiftCourier
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

/* ========================================================================== */
/* Feature Card                                                               */
/* ========================================================================== */

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/20 hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/4 dark:shadow-none dark:hover:border-[#e50914]/20 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
      <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-[#e50914]/8 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914]/15 group-hover:shadow-[0_0_18px_rgba(229,9,20,0.15)] dark:bg-[#e50914]/10 dark:group-hover:bg-[#e50914]/15">
        {icon}
      </div>

      <p className="text-sm font-bold text-slate-800 transition-colors duration-300 dark:text-white">
        {title}
      </p>

      <p className="mt-1 text-[11px] text-slate-400 transition-colors duration-300 dark:text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default BeACourierPage;
