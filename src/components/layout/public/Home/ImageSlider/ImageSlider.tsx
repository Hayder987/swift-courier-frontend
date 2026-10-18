"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, ArrowUpRight, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { AUTOPLAY_DELAY, type SlideData, slides } from "./imageSlider.utils";

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const ImageSlider = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const prefersReducedMotion = useRef(false);
  const progressTimer = useRef<number | null>(null);

  /* ---- reduced motion ---- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ---- autoplay plugin (stable instance) ---- */
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_DELAY,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    [],
  );

  /* ---- sync embla state ---- */
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0);
    };

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  /* ---- disable autoplay when reduced motion ---- */
  useEffect(() => {
    if (!api) return;
    const autoplay = api.plugins().autoplay;
    if (!autoplay) return;

    if (prefersReducedMotion.current) {
      autoplay.stop();
    }
  }, [api]);

  /* ---- autoplay progress timer ---- */
  useEffect(() => {
    if (progressTimer.current) {
      window.clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
    if (!api || prefersReducedMotion.current) {
      setProgress(0);
      return;
    }

    const autoplay = api.plugins().autoplay;
    if (!autoplay) return;

    setProgress(0);
    const step = 50;
    progressTimer.current = window.setInterval(() => {
      if (!autoplay.isPlaying()) {
        setProgress(0);
        return;
      }
      setProgress((p) => (p >= 100 ? 0 : p + (step / AUTOPLAY_DELAY) * 100));
    }, step);

    return () => {
      if (progressTimer.current) {
        window.clearInterval(progressTimer.current);
        progressTimer.current = null;
      }
    };
  }, [api]);

  /* ---- navigation helpers ---- */
  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
    setProgress(0);
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
    setProgress(0);
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
      setProgress(0);
    },
    [api],
  );

  /* ---- keyboard support (on section wrapper) ---- */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  const formattedCurrent = String(current + 1).padStart(2, "0");
  const formattedCount = String(count || slides.length).padStart(2, "0");

  return (
    <section
      aria-label="SwiftCourier highlights carousel"
      className="relative overflow-hidden border-y border-border/60 bg-background "
      onKeyDown={handleKeyDown}
    >
      {/* Ambient background — very restrained */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-12 size-104 rounded-full bg-[#e50914]/4.5 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 size-112 rounded-full bg-[#e50914]/5 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#e50914]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ---------------- Content ---------------- */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* ---------- Header ---------- */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#e50914] backdrop-blur-sm dark:border-[#e50914]/30 dark:bg-[#e50914]/10">
            <Truck className="h-3.5 w-3.5" />
            SwiftCourier in Motion
          </div>

          <h2 className="text-balance text-3xl font-black leading-[1.1] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Every Delivery Has a{" "}
            <span className="relative inline-block text-[#e50914]">
              Story.
              <span className="absolute inset-x-0 -bottom-1 h-px bg-linear-to-r from-[#e50914]/70 to-transparent" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
            From the first pickup to the final doorstep, explore the moments
            that make SwiftCourier a trusted partner for modern logistics.
          </p>
          <div
            aria-hidden="true"
            className="mx-auto mt-7 h-0.75 w-14 rounded-full bg-linear-to-r from-[#e50914] to-[#f04452] sm:mt-8"
          />
        </div>

        {/* ---------- Carousel ---------- */}
        <fieldset
          className="mt-12 min-w-0 border-0 p-0 lg:mt-16"
          aria-roledescription="carousel"
          aria-label="SwiftCourier highlights"
        >
          <legend className="sr-only">SwiftCourier highlights carousel</legend>

          <Carousel
            setApi={setApi}
            plugins={[autoplayPlugin]}
            opts={{
              align: "start",
              loop: true,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {slides.map((slide, index) => (
                <CarouselItem
                  key={slide.id}
                  className="basis-full pl-4 md:basis-4/5 lg:basis-3/4"
                >
                  <SlideCard
                    slide={slide}
                    index={index}
                    total={slides.length}
                    isActive={index === current}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* ---------- Controls ---------- */}
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Progress + counter */}
            <div className="flex flex-1 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium tabular-nums text-slate-500 dark:text-slate-400">
                <span className="text-slate-900 dark:text-white">
                  {formattedCurrent}
                </span>
                <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" />
                <span>{formattedCount}</span>
              </div>

              <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800/80">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#e50914] transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Indicators + arrows */}
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                    aria-current={index === current}
                    className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 ${
                      index === current
                        ? "w-6 bg-[#e50914]"
                        : "w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollPrev}
                  aria-label="Previous slide"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 backdrop-blur-sm transition hover:border-[#e50914]/40 hover:bg-[#e50914] hover:text-white hover:shadow-md hover:shadow-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  aria-label="Next slide"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 backdrop-blur-sm transition hover:border-[#e50914]/40 hover:bg-[#e50914] hover:text-white hover:shadow-md hover:shadow-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/40 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Slide card                                                        */
/* ------------------------------------------------------------------ */

function SlideCard({
  slide,
  index,
  total,
  isActive,
}: {
  slide: SlideData;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const Icon = slide.icon;
  const indexLabel = `${String(index + 1).padStart(2, "0")} / ${String(
    total,
  ).padStart(2, "0")}`;

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-900 shadow-xl shadow-slate-900/10 transition-all duration-500 dark:border-slate-800/70 ${
        isActive ? "scale-100" : "scale-[0.985] opacity-90"
      }`}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${slide.title}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 75vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          quality={85}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

        {/* Corner accent */}
        <div className="absolute left-4 top-4 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-[#e50914]/70 sm:left-5 sm:top-5" />

        {/* Index badge */}
        <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-sm sm:right-5 sm:top-5">
          {indexLabel}
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e50914]/90 text-white shadow-lg shadow-red-500/30">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e50914]">
              {slide.eyebrow}
            </span>
          </div>

          <h3 className="mt-3 max-w-xl text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
            {slide.title}
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-6 text-white/75 sm:text-base">
            {slide.description}
          </p>

          {slide.cta && (
            <div className="mt-4">
              <Link
                href={slide.cta.href}
                className="group/cta inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:border-[#e50914]/50 hover:bg-[#e50914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:text-sm"
              >
                {slide.cta.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ImageSlider;
