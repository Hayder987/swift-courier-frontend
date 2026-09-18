import { Suspense } from "react";
import ForgotPasswordForm from "@/components/layout/public/Authentication/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left - Form */}
        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
          <div className="w-full max-w-md">
            <Suspense
              fallback={
                <div className="flex min-h-80 items-center justify-center">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span className="size-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#e50914] dark:border-slate-700 dark:border-t-[#e50914]" />
                    Loading Forgot Form...
                  </div>
                </div>
              }
            >
              <ForgotPasswordForm />
            </Suspense>
          </div>
        </section>

        {/* Right - Premium Visual */}
        <section className="relative hidden overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-slate-950 lg:block">
          {/* Top Red Glow */}
          <div className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[#e50914]/8 blur-[130px] dark:bg-[#e50914]/20]" />

          {/* Bottom Red Glow */}
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-[600px] rounded-full bg-[#e50914]/5 blur-[140px] dark:bg-[#e50914]/10]" />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14 2xl:p-20">
            {/* Top */}
            <div className="flex justify-end">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <span className="size-2 rounded-full bg-[#e50914] shadow-[0_0_12px_rgba(229,9,20,0.55)]" />

                <span className="text-xs font-semibold text-slate-600 dark:text-white/70">
                  Account Recovery
                </span>
              </div>
            </div>

            {/* Main */}
            <div className="mx-auto w-full max-w-xl">
              {/* Icon */}
              <div className="mb-8 flex size-16 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/8 shadow-[0_0_50px_rgba(229,9,20,0.08)] transition-all duration-300 dark:border-[#e50914]/30 dark:bg-[#e50914]/10 dark:shadow-[0_0_60px_rgba(229,9,20,0.15)]">
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
                    d="M16.5 10.5V7.75a4.5 4.5 0 0 0-9 0v2.75"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 10.5h10.5a1.75 1.75 0 0 1 1.75 1.75v7A1.75 1.75 0 0 1 17.25 21h-10.5A1.75 1.75 0 0 1 5 19.25v-7A1.75 1.75 0 0 1 6.75 10.5Z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14.25v2.25"
                  />
                </svg>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 transition-colors duration-300 dark:text-white xl:text-5xl 2xl:text-6xl">
                Get back to
                <span className="block text-[#e50914]">your account.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400 xl:text-lg">
                Forgot your password? No worries. Enter your registered email
                and we&apos;ll help you securely reset your SwiftCourier
                account.
              </p>

              {/* Feature Cards */}
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    title: "Secure",
                    text: "Protected recovery",
                    icon: "✓",
                  },
                  {
                    title: "Private",
                    text: "Your data stays safe",
                    icon: "◆",
                  },
                  {
                    title: "Simple",
                    text: "Quick password reset",
                    icon: "→",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/20 hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-[#e50914]/20 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
                  >
                    <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-[#e50914]/8 text-xs font-bold text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914]/15 group-hover:shadow-[0_0_18px_rgba(229,9,20,0.15)] dark:bg-[#e50914]/10 dark:group-hover:bg-[#e50914]/15">
                      {item.icon}
                    </div>

                    <p className="text-sm font-bold text-slate-800 transition-colors duration-300 dark:text-white">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400 transition-colors duration-300 dark:text-slate-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-6 transition-colors duration-300 dark:border-white/10">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Your account security matters to us.
              </p>

              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#e50914] shadow-[0_0_8px_rgba(229,9,20,0.5)]" />

                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  SwiftCourier
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
