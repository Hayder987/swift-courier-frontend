import Link from "next/link";

import LoginThreeScene from "@/components/layout/public/Authentication/LoginThreeScene ";
import RegisterForm from "@/components/layout/public/Authentication/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-svh bg-background text-foreground transition-colors duration-300">
      <div className="grid min-h-svh lg:grid-cols-[minmax(440px,0.82fr)_minmax(0,1.18fr)]">
        {/* Left - Register */}
        <section className="relative flex min-h-svh flex-col overflow-hidden bg-background">
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 top-10 size-100 rounded-full bg-[#e50914]/5 blur-[110px]" />

            <div className="absolute -bottom-40 right-0 size-100 rounded-full bg-[#e50914]/4 blur-[120px]" />

            <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[44px_44px]" />
          </div>

          {/* Header */}
          <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-10">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="SwiftCourier home"
            >
              <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl bg-[#e50914] shadow-[0_8px_30px_rgba(229,9,20,0.2)]">
                <div className="absolute inset-0 bg-linear-to-br from-white/25 via-transparent to-black/10" />

                <span className="relative text-xs font-black tracking-[-0.08em] text-white">
                  SC
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[15px] font-bold tracking-[-0.03em]">
                  SwiftCourier
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Logistics Platform
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:block"
              >
                Sign in
              </Link>
            </div>
          </header>

          {/* Form area */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
            <div className="w-full max-w-105">
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-2xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:p-7">
                {/* Top accent */}
                <div className="absolute left-8 right-8 top-0 h-px bg-linear-to-r from-transparent via-[#e50914]/60 to-transparent" />

                {/* Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-[#e50914]/5 blur-3xl" />

                <div className="relative">
                  <RegisterForm />
                </div>
              </div>

              {/* Security */}
              <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M12 14v3" />
                </svg>

                <span>Protected by secure authentication</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative z-10 flex items-center justify-between px-5 pb-5 text-[10px] text-muted-foreground sm:px-8 lg:px-10">
            <span>© {new Date().getFullYear()} SwiftCourier</span>

            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </footer>
        </section>

        {/* Right - Three.js */}
        <section className="relative hidden min-h-svh overflow-hidden border-l border-border/40 bg-muted/30 lg:block dark:bg-[#030303]">
          <LoginThreeScene />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-background/35 via-transparent to-transparent dark:from-black/20" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-black/70 via-black/15 to-transparent dark:from-black/90" />

          {/* Network badge */}
          <div className="pointer-events-none absolute left-8 top-8 z-10 xl:left-10 xl:top-10">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-[#e50914] shadow-[0_0_12px_#e50914]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
                SwiftCourier Network
              </span>
            </div>
          </div>

          {/* Bottom content */}
          <div className="pointer-events-none absolute bottom-9 left-8 right-8 z-10 xl:bottom-12 xl:left-10 xl:right-10">
            <div className="max-w-xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#e50914]">
                Join the delivery network
              </p>

              <h2 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-tighter text-white xl:text-[42px]">
                Move faster.
                <br />
                <span className="text-white/45">Deliver smarter.</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/40">
                Create your SwiftCourier account and connect with a smarter
                logistics experience.
              </p>

              <div className="mt-7 flex items-center gap-6">
                <div>
                  <p className="text-lg font-semibold text-white">24/7</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/30">
                    Tracking
                  </p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-lg font-semibold text-white">Live</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/30">
                    Network
                  </p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-lg font-semibold text-white">Secure</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/30">
                    Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Three.js */}
        <section className="relative h-72 overflow-hidden border-t border-border/40 bg-muted/20 lg:hidden dark:bg-[#030303]">
          <LoginThreeScene />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70 dark:to-black/80" />

          <div className="pointer-events-none absolute bottom-5 left-5 z-10">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#e50914] shadow-[0_0_10px_#e50914]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Live logistics network
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
