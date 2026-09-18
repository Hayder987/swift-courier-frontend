import { ArrowLeft, Headphones, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import logo from "@/assets/logo/logo.png";
import ContactForm from "@/components/layout/public/Contact/contact-form";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left - Contact Information */}
        <section className="relative hidden overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-slate-950 lg:flex">
          {/* Top Red Glow */}
          <div className="pointer-events-none absolute -right-40 -top-40 size-140 rounded-full bg-[#e50914]/8 blur-[130px] dark:bg-[#e50914]/20" />

          {/* Bottom Red Glow */}
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-140 rounded-full bg-[#e50914]/5 blur-[140px] dark:bg-[#e50914]/10" />

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
            {/* Top */}
            <div className="flex justify-between">
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
                  Contact SwiftCourier
                </span>
              </div>
            </div>

            {/* Main */}
            <div className="mx-auto w-full max-w-xl">
              {/* Icon */}
              <div className="mb-8 flex size-16 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/8 shadow-[0_0_50px_rgba(229,9,20,0.08)] transition-all duration-300 dark:border-[#e50914]/30 dark:bg-[#e50914]/10 dark:shadow-[0_0_60px_rgba(229,9,20,0.15)]">
                <MessageSquare
                  className="size-8 text-[#e50914]"
                  strokeWidth={1.8}
                />
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 transition-colors duration-300 dark:text-white xl:text-5xl 2xl:text-6xl">
                Let&apos;s move
                <span className="block text-[#e50914]">things forward.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400 xl:text-lg">
                Have a question, suggestion or need help with your shipment?
                Send us a message and our team will get back to you.
              </p>

              {/* Feature Cards */}
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <div className="group rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/20 hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/4 dark:shadow-none dark:hover:border-[#e50914]/20 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                  <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-[#e50914]/8 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914]/15 group-hover:shadow-[0_0_18px_rgba(229,9,20,0.15)] dark:bg-[#e50914]/10 dark:group-hover:bg-[#e50914]/15">
                    <Headphones className="size-4" />
                  </div>

                  <p className="text-sm font-bold text-slate-800 transition-colors duration-300 dark:text-white">
                    Support
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400 transition-colors duration-300 dark:text-slate-500">
                    We&apos;re here to help.
                  </p>
                </div>

                <div className="group rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/20 hover:shadow-[0_15px_35px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/4 dark:shadow-none dark:hover:border-[#e50914]/20 dark:hover:bg-white/[0.06] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                  <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-[#e50914]/8 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914]/15 group-hover:shadow-[0_0_18px_rgba(229,9,20,0.15)] dark:bg-[#e50914]/10 dark:group-hover:bg-[#e50914]/15">
                    <MessageSquare className="size-4" />
                  </div>

                  <p className="text-sm font-bold text-slate-800 transition-colors duration-300 dark:text-white">
                    Quick Response
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400 transition-colors duration-300 dark:text-slate-500">
                    Your message matters.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-6 transition-colors duration-300 dark:border-white/10">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                © {new Date().getFullYear()} SwiftCourier. All rights reserved.
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

        {/* Right - Contact Form */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 transition-colors duration-300 sm:px-6 lg:bg-slate-50 lg:px-10 xl:px-16 dark:bg-slate-950 dark:lg:bg-slate-950">
          {/* Top Red Glow */}
          <div className="pointer-events-none absolute -right-40 -top-40 size-140 rounded-full bg-[#e50914]/6 blur-[130px] dark:bg-[#e50914]/15" />

          {/* Bottom Red Glow */}
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-140 rounded-full bg-[#e50914]/5 blur-[140px] dark:bg-[#e50914]/10" />

          {/* Subtle Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 w-full max-w-xl">
            {/* Mobile Header */}
            <div className="mb-10 flex items-center justify-between lg:hidden">
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

            {/* Mobile Header */}
            <div className="mb-8 lg:hidden">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-[#e50914] uppercase">
                <span className="size-1.5 rounded-full bg-[#e50914]" />
                Contact Us
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-5xl dark:text-white">
                How can we <span className="text-[#e50914]">help?</span>
              </h1>

              <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Send us your message and our team will get back to you.
              </p>
            </div>

            {/* Contact Form */}
            <Suspense
              fallback={
                <div className="h-125 animate-pulse rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-white/5" />
              }
            >
              <ContactForm />
            </Suspense>

            {/* Bottom Trust */}
            <div className="mt-7 flex items-center justify-center gap-2 text-center text-[10px] font-medium text-slate-400 dark:text-slate-500">
              <ShieldIcon />
              Your message is handled securely.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const ShieldIcon = () => (
  <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-3"
      aria-hidden="true"
    >
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  </span>
);

export default ContactPage;
