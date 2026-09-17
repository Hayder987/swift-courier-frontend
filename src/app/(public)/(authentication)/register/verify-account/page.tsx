import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import logo from "@/assets/logo/logo.png";
import VerifyAccountForm from "@/components/layout/public/Authentication/verify-account-form";

export default function VerifyAccountPage() {
  return (
    <main className="min-h-svh bg-white text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white lg:grid lg:grid-cols-2">
      {/* Left - Verification */}
      <section className="relative flex min-h-svh flex-col overflow-hidden bg-white dark:bg-slate-950">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -left-32 -top-32 size-72 rounded-full bg-[#e50914]/5 blur-3xl dark:bg-[#e50914]/10" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-[#e50914]/5 blur-3xl dark:bg-[#e50914]/10" />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            aria-label="SwiftCourier Home"
          >
            <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e50914] shadow-[0_8px_25px_rgba(229,9,20,0.22)] transition-transform duration-300 group-hover:scale-105 sm:size-11">
              <Image
                src={logo}
                alt="SwiftCourier"
                fill
                sizes="44px"
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="leading-none">
              <p className="text-lg font-black tracking-tight text-slate-950 dark:text-white sm:text-xl">
                Swift<span className="text-[#e50914]">Courier</span>
              </p>

              <p className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 sm:block">
                Fast. Secure. Delivered.
              </p>
            </div>
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur transition-all duration-300 hover:border-[#e50914]/20 hover:bg-[#e50914]/5 hover:text-[#e50914] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-[#e50914]/30 dark:hover:bg-[#e50914]/10 dark:hover:text-[#ff3340] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Sign In
          </Link>
        </header>

        {/* Form area */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
          <div className="w-full max-w-md">
            <Suspense
              fallback={
                <div className="flex min-h-80 items-center justify-center">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span className="size-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#e50914] dark:border-slate-700 dark:border-t-[#e50914]" />
                    Loading verification...
                  </div>
                </div>
              }
            >
              <VerifyAccountForm />
            </Suspense>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 px-5 pb-5 text-center sm:px-8 sm:pb-7 lg:px-10">
          <p className="text-[11px] font-medium text-slate-400 dark:text-slate-600 sm:text-xs">
            © {new Date().getFullYear()} SwiftCourier. All rights reserved.
          </p>
        </footer>
      </section>

      {/* Right - Premium Visual */}
      <section
        className="
    relative hidden overflow-hidden
    bg-slate-50
    transition-colors duration-300
    dark:bg-slate-950
    lg:block
  "
      >
        {/* Red glow - Top Right */}
        <div
          className="
      pointer-events-none absolute -right-32 -top-32
      size-[500px] rounded-full
      bg-[#e50914]/8 blur-[120px]
      dark:bg-[#e50914]/20
    "
        />

        {/* Red glow - Bottom Left */}
        <div
          className="
      pointer-events-none absolute -bottom-40 -left-40
      size-[500px] rounded-full
      bg-[#e50914]/5 blur-[120px]
      dark:bg-[#e50914]/10
    "
        />

        {/* Grid */}
        <div
          className="
      pointer-events-none absolute inset-0
      opacity-[0.045]
      dark:opacity-[0.07]
    "
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14 2xl:p-20">
          {/* Status */}
          <div className="flex justify-end">
            <div
              className="
          flex items-center gap-2
          rounded-full
          border border-slate-200
          bg-white/70
          px-4 py-2
          shadow-sm
          backdrop-blur-xl
          transition-all duration-300

          dark:border-white/10
          dark:bg-white/5
          dark:shadow-none
        "
            >
              <span
                className="
            size-2 animate-pulse rounded-full
            bg-[#e50914]
            shadow-[0_0_10px_rgba(229,9,20,0.55)]
          "
              />

              <span
                className="
            text-xs font-semibold
            text-slate-600
            dark:text-white/70
          "
              >
                Secure Verification
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="mx-auto w-full max-w-xl">
            {/* Icon */}
            <div
              className="
          mb-8 flex size-16 items-center justify-center
          rounded-2xl
          border border-[#e50914]/20
          bg-[#e50914]/8
          shadow-[0_0_50px_rgba(229,9,20,0.08)]
          transition-all duration-300

          dark:border-[#e50914]/30
          dark:bg-[#e50914]/10
          dark:shadow-[0_0_60px_rgba(229,9,20,0.15)]
        "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-8 text-[#e50914]"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h1
              className="
          text-4xl font-black
          leading-[1.08]
          tracking-tight
          text-slate-950
          transition-colors duration-300

          dark:text-white

          xl:text-5xl
          2xl:text-6xl
        "
            >
              One step away from
              <span className="block text-[#e50914]">faster delivery.</span>
            </h1>

            {/* Description */}
            <p
              className="
          mt-6 max-w-lg
          text-base leading-7
          text-slate-500
          transition-colors duration-300

          dark:text-slate-400

          xl:text-lg
        "
            >
              Verify your email to activate your SwiftCourier account and start
              managing your deliveries with confidence.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Secure",
                  text: "Protected account",
                  icon: "✓",
                },
                {
                  title: "Fast",
                  text: "Instant verification",
                  icon: "⚡",
                },
                {
                  title: "Reliable",
                  text: "Trusted delivery",
                  icon: "◆",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
              group
              rounded-2xl
              border border-slate-200
              bg-white/70
              p-4
              shadow-sm
              backdrop-blur-xl
              transition-all duration-300

              hover:-translate-y-1
              hover:border-[#e50914]/20
              hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)]

              dark:border-white/10
              dark:bg-white/[0.04]
              dark:shadow-none

              dark:hover:border-[#e50914]/20
              dark:hover:bg-white/[0.06]
              dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
            "
                >
                  {/* Icon */}
                  <div
                    className="
                mb-3 flex size-8
                items-center justify-center
                rounded-lg
                bg-[#e50914]/8
                text-xs font-bold
                text-[#e50914]
                transition-all duration-300

                group-hover:bg-[#e50914]/15
                group-hover:shadow-[0_0_18px_rgba(229,9,20,0.15)]

                dark:bg-[#e50914]/10
                dark:group-hover:bg-[#e50914]/15
              "
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <p
                    className="
                text-sm font-bold
                text-slate-800
                transition-colors duration-300

                dark:text-white
              "
                  >
                    {item.title}
                  </p>

                  {/* Description */}
                  <p
                    className="
                mt-1 text-[11px]
                text-slate-400
                transition-colors duration-300

                dark:text-slate-500
              "
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div
            className="
        flex items-center justify-between
        border-t border-slate-200
        pt-6
        transition-colors duration-300

        dark:border-white/10
      "
          >
            <p
              className="
          text-xs
          text-slate-400
          dark:text-slate-500
        "
            >
              Your privacy and security matter to us.
            </p>

            <div className="flex items-center gap-2">
              <span
                className="
            size-1.5 rounded-full
            bg-[#e50914]
            shadow-[0_0_8px_rgba(229,9,20,0.5)]
          "
              />

              <span
                className="
            text-xs font-semibold
            text-slate-500
            dark:text-slate-400
          "
              >
                SwiftCourier
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
