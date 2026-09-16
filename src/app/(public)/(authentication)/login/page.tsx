import Link from "next/link";

import LoginForm from "@/components/layout/public/Authentication/LoginForm";
import LoginThreeScene from "@/components/layout/public/Authentication/LoginThreeScene ";

export default function LoginPage() {
  return (
    <main className="min-h-svh bg-background">
      <div className="grid min-h-svh lg:grid-cols-[minmax(420px,0.82fr)_minmax(0,1.18fr)]">
        {/* =========================
            LOGIN SECTION
        ========================== */}
        <section className="relative flex min-h-svh flex-col overflow-hidden border-r border-border/50 bg-background">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#e50914]/6 blur-3xl" />

            <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#e50914]/4 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:42px_42px]" />
          </div>

          {/* Header */}
          <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-8 lg:px-10">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="SwiftCourier home"
            >
              <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl bg-[#e50914] shadow-[0_8px_30px_rgba(229,9,20,0.22)]">
                <span className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />

                <span className="relative text-sm font-black tracking-tight text-white">
                  SC
                </span>
              </span>

              <span className="flex flex-col">
                <span className="text-[15px] font-bold tracking-[-0.02em]">
                  SwiftCourier
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Logistics Platform
                </span>
              </span>
            </Link>

            <Link
              href="/register"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Create account
            </Link>
          </header>

          {/* Form area */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
            <div className="w-full max-w-105">
              <div className="mb-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e50914]/15 bg-[#e50914]/5 px-3 py-1.5">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e50914]/50" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#e50914]" />
                  </span>

                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e50914]">
                    Secure access
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-[34px]">
                  Welcome back.
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  Sign in to manage shipments, track deliveries and keep your
                  logistics moving.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card/60 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-7">
                <LoginForm />
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-muted-foreground">
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

                <span>Your connection is protected with secure authentication.</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative z-10 flex flex-col items-center justify-between gap-2 px-6 pb-6 text-[11px] text-muted-foreground sm:flex-row sm:px-8 lg:px-10">
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

        {/* =========================
            DESKTOP 3D SECTION
        ========================== */}
        <section className="relative hidden min-h-svh overflow-hidden bg-[#050505] lg:block">
          <LoginThreeScene />

          {/* Scene overlay */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent opacity-20" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#050505] to-transparent" />

          {/* Top label */}
          <div className="pointer-events-none absolute left-8 top-8 z-10 xl:left-10 xl:top-10">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-[#e50914] shadow-[0_0_12px_#e50914]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                SwiftCourier Network
              </span>
            </div>
          </div>

          {/* Bottom content */}
          <div className="pointer-events-none absolute bottom-9 left-8 right-8 z-10 xl:bottom-12 xl:left-10 xl:right-10">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#e50914]">
                One platform. Every delivery.
              </p>

              <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-[-0.04em] text-white xl:text-4xl">
                Move every parcel with{" "}
                <span className="text-white/45">confidence.</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/45">
                Track shipments, connect couriers and keep every delivery
                moving through one intelligent logistics network.
              </p>

              <div className="mt-6 flex items-center gap-6">
                <div>
                  <p className="text-lg font-semibold text-white">24/7</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
                    Tracking
                  </p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-lg font-semibold text-white">Real-time</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
                    Visibility
                  </p>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div>
                  <p className="text-lg font-semibold text-white">Secure</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
                    Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            MOBILE 3D SECTION
        ========================== */}
        <section className="relative h-70 overflow-hidden bg-[#050505] lg:hidden">
          <LoginThreeScene />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#050505]" />

          <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-10">
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