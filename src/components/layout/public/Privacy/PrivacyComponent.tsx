"use client";

import {
  ChevronDown,
  FileText,
  Mail,
  RefreshCw,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { overviewCards, policySections } from "./privacy.utils";

const PrivacyComponent = () => {
  const [activeId, setActiveId] = useState<string>(policySections[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* IntersectionObserver for active TOC highlight */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setMobileNavOpen(false);
      const el = sectionRefs.current[id];
      if (el) {
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [],
  );

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      {/* ---------------- Background (matches FAQ) ---------------- */}
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

      {/* ---------------- Content ---------------- */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        {/* ---------- Hero ---------- */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#e50914] backdrop-blur-sm dark:border-[#e50914]/30 dark:bg-[#e50914]/10">
            <ShieldCheck className="h-3.5 w-3.5" />
            Privacy &amp; Security
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Privacy{" "}
            <span className="relative inline-block text-[#e50914]">
              Policy
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#e50914]/70 to-transparent" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            SwiftCourier respects your privacy and handles personal information
            responsibly. This policy explains what we collect, how we use it,
            and the choices available to you.
          </p>

          {/* Metadata row */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <RefreshCw className="h-3 w-3" />
              Last updated:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                [Add date before publishing]
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <FileText className="h-3 w-3" />
              {policySections.length} policy sections
            </span>
          </div>
        </header>

        {/* ---------- Overview cards ---------- */}
        <section
          aria-labelledby="overview-heading"
          className="mx-auto mt-14 max-w-5xl"
        >
          <h2 id="overview-heading" className="sr-only">
            Policy overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e50914]/30 hover:shadow-lg hover:shadow-red-500/5 dark:border-slate-800/80 dark:bg-slate-900/50 dark:hover:border-[#e50914]/40 dark:hover:shadow-red-500/10"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 text-[#e50914] transition-colors group-hover:border-[#e50914]/30 group-hover:bg-[#e50914]/5 dark:border-slate-800 dark:bg-slate-950/50">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- Document layout ---------- */}
        <div className="mx-auto mt-16 max-w-6xl lg:mt-20">
          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
            {/* --- Table of contents (desktop) --- */}
            <nav
              aria-label="Policy table of contents"
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  On this page
                </p>
                <ul className="space-y-0.5">
                  {policySections.map((section) => {
                    const isActive = activeId === section.id;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => scrollToSection(e, section.id)}
                          className={`block rounded-md border-l-2 px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 ${
                            isActive
                              ? "border-[#e50914] bg-[#e50914]/5 font-medium text-[#e50914] dark:bg-[#e50914]/10"
                              : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200"
                          }`}
                        >
                          {section.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            {/* --- Main document --- */}
            <article className="min-w-0">
              {/* Mobile TOC */}
              <div className="mb-8 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen((v) => !v)}
                  aria-expanded={mobileNavOpen}
                  aria-controls="mobile-toc"
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur-sm transition hover:border-[#e50914]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-[#e50914]/40"
                >
                  <span className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-[#e50914]" />
                    Table of contents
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      mobileNavOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileNavOpen && (
                  <div
                    id="mobile-toc"
                    className="mt-2 rounded-xl border border-slate-200 bg-white/80 p-2 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                      {policySections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            onClick={(e) => scrollToSection(e, section.id)}
                            className="block rounded-md px-3 py-1.5 text-sm text-slate-600 transition hover:bg-[#e50914]/5 hover:text-[#e50914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 dark:text-slate-300 dark:hover:bg-[#e50914]/10"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sections */}
              <div className="space-y-10">
                {policySections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      ref={(el) => {
                        sectionRefs.current[section.id] = el;
                      }}
                      className="scroll-mt-28"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-[#e50914] shadow-sm dark:border-slate-800 dark:bg-slate-900">
                          <Icon className="h-4 w-4" />
                        </span>
                        <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl dark:text-white">
                          {index + 1}. {section.title}
                        </h2>
                      </div>

                      <div className="mt-4 space-y-3.5 pl-0 sm:pl-11">
                        {section.content.map((paragraph) => (
                          <p
                            key={`${section.id}-${paragraph.slice(0, 32)}`}
                            className="text-sm leading-7 text-slate-600 dark:text-slate-400"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {index < policySections.length - 1 && (
                        <div className="mt-10 h-px bg-gradient-to-r from-slate-200 via-slate-200/60 to-transparent dark:from-slate-800 dark:via-slate-800/60" />
                      )}
                    </section>
                  );
                })}
              </div>

              {/* ---------- Contact panel ---------- */}
              <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-slate-800/80 dark:bg-slate-900/50">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        Questions about your privacy?
                      </h3>
                      <p className="mt-1 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Our team is here to help with any privacy-related
                        questions or requests you may have.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#e50914] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-[#c10712] hover:shadow-red-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="mt-8 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
                This policy is provided as a general template. Please review and
                customize it to reflect your organization&apos;s actual
                practices before publishing.
              </p>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyComponent;
