"use client";

import { ChevronDown, Mail, Scale, ScrollText } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import PublicPageNormalBg from "../Background/PublicPageNormalBg";
import {
  type OverviewCard,
  overviewCards,
  type TermsSection,
  termsMeta,
  termsSections,
} from "./terms.utils";

/* ------------------------------------------------------------------ */
/*  Helper: stable key for paragraph elements                         */
/* ------------------------------------------------------------------ */
function paragraphKey(sectionId: string, paragraph: string): string {
  return `${sectionId}-${paragraph.slice(0, 32)}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
const TermsComponents = () => {
  const [activeId, setActiveId] = useState<string>(termsSections[0].id);
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
    <main className="relative min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* ---------------- Background (matches FAQ) ---------------- */}
      <PublicPageNormalBg />

      {/* ---------------- Content ---------------- */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        {/* ---------- Hero ---------- */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#e50914] backdrop-blur-sm dark:border-[#e50914]/30 dark:bg-[#e50914]/10">
            <Scale className="h-3.5 w-3.5" />
            Terms &amp; Conditions
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Terms &amp;{" "}
            <span className="relative inline-block text-[#e50914]">
              Conditions
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#e50914]/70 to-transparent" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            These terms govern your use of SwiftCourier&apos;s courier,
            shipping, tracking, and related services. Please read them carefully
            before using our platform.
          </p>

          {/* Metadata row */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <ScrollText className="h-3 w-3" />
              Last updated:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {termsMeta.lastUpdated}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <Scale className="h-3 w-3" />
              Effective date:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {termsMeta.effectiveDate}
              </span>
            </span>
          </div>
        </header>

        {/* ---------- Overview cards ---------- */}
        <section
          aria-labelledby="terms-overview-heading"
          className="mx-auto mt-14 max-w-5xl"
        >
          <h2 id="terms-overview-heading" className="sr-only">
            Terms overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((card) => (
              <OverviewCardItem
                key={card.title}
                card={card}
                onNavigate={scrollToSection}
              />
            ))}
          </div>
        </section>

        {/* ---------- Document layout ---------- */}
        <div className="mx-auto mt-16 max-w-6xl lg:mt-20">
          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
            {/* --- Table of contents (desktop) --- */}
            <nav
              aria-label="Terms table of contents"
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  On this page
                </p>
                <ul className="space-y-0.5">
                  {termsSections.map((section, index) => {
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
                          <span className="mr-1.5 text-[11px] tabular-nums opacity-60">
                            {index + 1}.
                          </span>
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
                  aria-controls="mobile-terms-toc"
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur-sm transition hover:border-[#e50914]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-[#e50914]/40"
                >
                  <span className="flex items-center gap-2">
                    <ScrollText className="h-4 w-4 text-[#e50914]" />
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
                    id="mobile-terms-toc"
                    className="mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white/80 p-2 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                      {termsSections.map((section, index) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            onClick={(e) => scrollToSection(e, section.id)}
                            className="block rounded-md px-3 py-1.5 text-sm text-slate-600 transition hover:bg-[#e50914]/5 hover:text-[#e50914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 dark:text-slate-300 dark:hover:bg-[#e50914]/10"
                          >
                            <span className="mr-1.5 text-[11px] tabular-nums opacity-60">
                              {index + 1}.
                            </span>
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
                {termsSections.map((section, index) => (
                  <TermsSectionArticle
                    key={section.id}
                    section={section}
                    index={index}
                    total={termsSections.length}
                    refCallback={(el) => {
                      sectionRefs.current[section.id] = el;
                    }}
                  />
                ))}
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
                        Questions about these terms?
                      </h3>
                      <p className="mt-1 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Our team is here to help with any questions you may have
                        about these Terms &amp; Conditions.
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
                These terms are provided as a general template. Please review
                and customize them to reflect your organization&apos;s actual
                practices before publishing.
              </p>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function OverviewCardItem({
  card,
  onNavigate,
}: {
  card: OverviewCard;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const Icon = card.icon;
  return (
    <a
      href={`#${card.targetId}`}
      onClick={(e) => onNavigate(e, card.targetId)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e50914]/30 hover:shadow-lg hover:shadow-red-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 dark:border-slate-800/80 dark:bg-slate-900/50 dark:hover:border-[#e50914]/40 dark:hover:shadow-red-500/10"
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
    </a>
  );
}

function TermsSectionArticle({
  section,
  index,
  total,
  refCallback,
}: {
  section: TermsSection;
  index: number;
  total: number;
  refCallback: (el: HTMLElement | null) => void;
}) {
  const Icon = section.icon;
  return (
    <section id={section.id} ref={refCallback} className="scroll-mt-28">
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
            key={paragraphKey(section.id, paragraph)}
            className="text-sm leading-7 text-slate-600 dark:text-slate-400"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {index < total - 1 && (
        <div className="mt-10 h-px bg-gradient-to-r from-slate-200 via-slate-200/60 to-transparent dark:from-slate-800 dark:via-slate-800/60" />
      )}
    </section>
  );
}

export default TermsComponents;
