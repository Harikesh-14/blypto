"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

const grid = (alpha: number) => ({
  backgroundImage: `linear-gradient(to right, rgba(255,255,255,${alpha}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,${alpha}) 1px, transparent 1px)`,
  backgroundSize: "44px 44px",
});

const rise = (inView: boolean, delay: number) => ({
  className: cn(
    "transition-all duration-700 ease-out motion-reduce:transition-none",
    inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
  ),
  style: { transitionDelay: `${delay}ms` },
});

export default function FinalCta() {
  const [ref, inView] = useInView<HTMLElement>(0.3);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section ref={ref} className="relative mx-auto max-w-5xl px-5 pb-28">
      {/* Outer glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-10 top-10 bottom-20 -z-10 rounded-[48px] bg-rose-700/25 blur-[80px] transition-opacity duration-1000 dark:bg-rose-600/20",
          inView ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        onMouseMove={onMove}
        className={cn(
          "group/cta relative isolate overflow-hidden rounded-[28px] px-6 py-16 text-center ring-1 ring-white/10 sm:px-12 sm:py-24",
          "bg-[#810419] shadow-[0_30px_90px_rgba(129,4,25,0.35)]",
          "transition-all duration-1000 ease-out motion-reduce:transition-none",
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        )}
      >
        {/* Colour depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(251,113,133,0.55),transparent_60%),radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.45),transparent_60%)]"
        />

        {/* Base grid, faded toward the edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            ...grid(0.07),
            maskImage:
              "radial-gradient(ellipse at 50% 40%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 40%, black 10%, transparent 70%)",
          }}
        />

        {/* Brighter grid revealed around the cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100"
          style={{
            ...grid(0.28),
            maskImage:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          }}
        />

        {/* Cursor glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), transparent 60%)",
          }}
        />

        {/* Top highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-16 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"
        />

        <div className="relative">
          {/* Seven-day streak: one bar per day, the last one amber */}
          <div
            {...rise(inView, 200)}
            className={cn(rise(inView, 200).className, "flex justify-center gap-1.5")}
            aria-hidden
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="relative h-1.5 w-7 overflow-hidden rounded-full bg-white/15"
              >
                <span
                  className={cn(
                    "absolute inset-0 origin-left rounded-full transition-transform duration-500 ease-out motion-reduce:transition-none",
                    i === 6 ? "bg-amber-400" : "bg-white/90",
                    inView ? "scale-x-100" : "scale-x-0",
                  )}
                  style={{ transitionDelay: `${500 + i * 130}ms` }}
                />
              </span>
            ))}
          </div>

          <p
            {...rise(inView, 300)}
            className={cn(
              rise(inView, 300).className,
              "mt-7 text-xs font-semibold tracking-[0.2em] text-rose-200/90 uppercase",
            )}
          >
            Your journey starts here
          </p>

          <h2
            {...rise(inView, 400)}
            className={cn(
              rise(inView, 400).className,
              "mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl",
            )}
          >
            Consistency beats intensity.
            <span className="mt-1 block text-white/60">
              Start building yours.
            </span>
          </h2>

          <p
            {...rise(inView, 500)}
            className={cn(
              rise(inView, 500).className,
              "mx-auto mt-6 max-w-lg text-sm leading-7 text-rose-100/75 sm:text-base",
            )}
          >
            Take the first step towards becoming a better problem solver. One
            question at a time.
          </p>

          <div {...rise(inView, 600)} className={cn(rise(inView, 600).className, "mt-10")}>
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white py-2 pr-2 pl-7 text-sm font-semibold text-[#810419] shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#810419] focus-visible:outline-none"
            >
              {/* Shimmer sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-rose-200/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative">Get started</span>
              <span className="relative flex size-9 items-center justify-center rounded-full bg-[#810419] text-white transition-transform duration-300 group-hover:scale-105">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}