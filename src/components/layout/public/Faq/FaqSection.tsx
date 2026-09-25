"use client";

import {
  ArrowUpRight,
  ChevronDown,
  CircleHelp,
  MessageCircleQuestion,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqData } from "@/lib/faq";

const FaqSection = () => {
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

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e50914]">
            <CircleHelp className="size-3.5" />
            Help Center
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-950 transition-colors duration-300 dark:text-white sm:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-[#e50914]">Questions</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400 sm:text-base">
            Everything you need to know about shipping, tracking, payments,
            courier applications, and your SwiftCourier experience.
          </p>
        </div>

        {/* FAQ Layout */}
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          {/* Left Information Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:p-8">
              {/* Top Red Accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#e50914] to-transparent" />

              {/* Card Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-[#e50914]/5 blur-[80px] transition-all duration-500 group-hover:bg-[#e50914]/10 dark:bg-[#e50914]/10 dark:group-hover:bg-[#e50914]/15" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-7 flex size-14 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/8 text-[#e50914] shadow-[0_0_40px_rgba(229,9,20,0.06)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(229,9,20,0.1)] dark:border-[#e50914]/30 dark:bg-[#e50914]/10 dark:shadow-[0_0_50px_rgba(229,9,20,0.1)]">
                  <MessageCircleQuestion className="size-7" strokeWidth={1.8} />
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-black tracking-tight text-slate-900 transition-colors duration-300 dark:text-white sm:text-3xl">
                  Need more help?
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400">
                  Can&apos;t find the answer you&apos;re looking for? Our
                  support team is ready to help you with your shipment, account,
                  payment, or courier-related questions.
                </p>

                {/* Features */}
                <div className="mt-8 space-y-3">
                  {/* Secure */}
                  <div className="group/feature flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e50914]/20 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/4 dark:hover:border-[#e50914]/20 dark:hover:bg-white/6 dark:hover:shadow-none">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/8 text-[#e50914] transition-all duration-300 group-hover/feature:bg-[#e50914]/15 group-hover/feature:shadow-[0_0_18px_rgba(229,9,20,0.12)] dark:bg-[#e50914]/10">
                      <ShieldCheck className="size-4.5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800 transition-colors duration-300 dark:text-white">
                        Secure & Reliable
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400 transition-colors duration-300 dark:text-slate-500">
                        Your shipment information stays protected.
                      </p>
                    </div>
                  </div>

                  {/* Tracking */}
                  <div className="group/feature flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e50914]/20 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/4 dark:hover:border-[#e50914]/20 dark:hover:bg-white/6 dark:hover:shadow-none">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/8 text-[#e50914] transition-all duration-300 group-hover/feature:bg-[#e50914]/15 group-hover/feature:shadow-[0_0_18px_rgba(229,9,20,0.12)] dark:bg-[#e50914]/10">
                      <Truck className="size-4.5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800 transition-colors duration-300 dark:text-white">
                        Real-time Tracking
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400 transition-colors duration-300 dark:text-slate-500">
                        Stay updated throughout the delivery journey.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <Link href="/contact" className="block">
                  <Button className="mt-8 h-11 w-full rounded-xl bg-[#e50914] font-semibold text-white shadow-lg shadow-[#e50914]/20 transition-all duration-300 hover:bg-[#c70710] hover:shadow-[0_12px_30px_rgba(229,9,20,0.25)]">
                    Contact Support
                    <ArrowUpRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="relative">
            <Accordion defaultValue={["faq-1"]} className="space-y-3">
              {faqData.map((faq) => {
                const Icon = faq.icon;

                return (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/70 px-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[#e50914]/20 hover:shadow-[0_12px_35px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-[#e50914]/20 dark:hover:bg-white/6 sm:px-6"
                  >
                    {/* Question */}
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 group-data-[state=open]:bg-[#e50914] group-data-[state=open]:text-white group-data-[state=open]:shadow-[0_0_20px_rgba(229,9,20,0.2)] dark:bg-white/5 dark:text-slate-400 dark:group-data-[state=open]:bg-[#e50914] dark:group-data-[state=open]:text-white">
                        <Icon className="size-4.5" />
                      </div>

                      {/* Trigger */}
                      <AccordionTrigger className="flex-1 py-5 text-left hover:no-underline [&>svg]:hidden">
                        <span className="text-sm font-bold leading-6 text-slate-800 transition-colors duration-300 dark:text-white sm:text-base">
                          {faq.question}
                        </span>

                        <span className="ml-4 flex size-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:border-[#e50914]/30 group-data-[state=open]:bg-[#e50914]/10 group-data-[state=open]:text-[#e50914] dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                          <ChevronDown className="size-4" />
                        </span>
                      </AccordionTrigger>
                    </div>

                    {/* Answer */}
                    <AccordionContent className="pb-5 pl-14 pr-2">
                      <p className="max-w-2xl text-sm leading-7 text-slate-500 transition-colors duration-300 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {/* Bottom Hint */}
            <div className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] font-medium text-slate-400 dark:text-slate-500">
              <span className="size-1.5 rounded-full bg-[#e50914] shadow-[0_0_8px_rgba(229,9,20,0.5)]" />
              Select a question to learn more
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
