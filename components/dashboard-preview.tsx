"use client";

import {
  ArrowRight,
  BrainCircuit,
  Check,
  Flame,
  Layers3,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

const BRAND = ["#810419", "#e11d48", "#fb7185"] as const;

const chip =
  "flex size-7 items-center justify-center rounded-lg bg-neutral-900/5 text-neutral-600 dark:bg-white/8 dark:text-neutral-300";

const statCard =
  "group/stat relative overflow-hidden rounded-xl border border-neutral-200/70 bg-neutral-50/70 p-3.5 transition-colors hover:border-neutral-300 dark:border-white/[0.07] dark:bg-white/2.5 dark:hover:border-white/15";

function useInView<T extends Element>(threshold = 0.25) {
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

function CountUp({
  to,
  active,
  pad = 0,
  duration = 1300,
}: {
  to: number;
  active: boolean;
  pad?: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);

  return <>{String(value).padStart(pad, "0")}</>;
}

const reveal = (inView: boolean, index: number) =>
  ({
    className: cn(
      "transition-all duration-700 ease-out motion-reduce:transition-none",
      inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
    ),
    style: { transitionDelay: `${index * 90}ms` },
  }) as const;

const week = [
  { day: "M", height: 45, solved: 3 },
  { day: "T", height: 75, solved: 6 },
  { day: "W", height: 55, solved: 4 },
  { day: "T", height: 95, solved: 8 },
  { day: "F", height: 65, solved: 5 },
  { day: "S", height: 85, solved: 7 },
  { day: "S", height: 35, solved: 2 },
];

const SPARK =
  "M0 26 C 10 24, 14 18, 24 19 S 38 10, 48 12 S 62 4, 72 6 S 86 2, 96 1";
const RING_R = 20;
const RING_C = 2 * Math.PI * RING_R;
const PROGRESS = 0.65;

export default function DashboardPreview() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const uid = useId().replace(/:/g, "");
  const ringGrad = `ring-${uid}`;
  const sparkGrad = `spark-${uid}`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} className="relative mt-20 w-full max-w-4xl">
      {/* Ambient glow: brand rose with a whisper of warm amber */}
      <div
        aria-hidden
        className={cn(
          "absolute -inset-12 rounded-[40px] blur-[80px] transition-opacity duration-1000",
          "bg-[radial-gradient(ellipse_at_25%_20%,rgba(225,29,72,0.14),transparent_50%),radial-gradient(ellipse_at_80%_85%,rgba(245,158,11,0.07),transparent_45%)]",
          "dark:bg-[radial-gradient(ellipse_at_25%_20%,rgba(225,29,72,0.20),transparent_50%),radial-gradient(ellipse_at_80%_85%,rgba(245,158,11,0.08),transparent_45%)]",
          inView ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Gradient edge */}
      <div className="relative rounded-[22px] bg-linear-to-b from-neutral-200 via-neutral-200/40 to-transparent p-px dark:from-white/20 dark:via-white/5">
        <div
          onMouseMove={onMove}
          className={cn(
            "group/card relative overflow-hidden rounded-[21px] bg-white/90 p-4 text-left backdrop-blur-2xl sm:p-6 dark:bg-neutral-900/90",
            "shadow-[0_30px_90px_rgba(0,0,0,0.09)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.5)]",
            "transition-all duration-1000 ease-out motion-reduce:transition-none",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          {/* Spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(190,18,60,0.08), transparent 55%)",
            }}
          />
          {/* Top highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-rose-500/40 to-transparent"
          />

          {/* Header */}
          <div
            {...reveal(inView, 0)}
            className={cn(
              reveal(inView, 0).className,
              "relative flex items-center justify-between border-b border-neutral-200/70 pb-4 dark:border-white/10",
            )}
          >
            <div>
              <p className="text-sm font-semibold tracking-tight">
                Your learning overview
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                A little progress every day.
              </p>
            </div>

            {/* The only warm accent: fire */}
            <div className="relative flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700 dark:border-amber-400/20 dark:text-amber-400">
              <span className="relative flex size-3.5 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-amber-500/30 motion-reduce:hidden" />
                <Flame className="relative size-3.5" />
              </span>
              Keep it going
            </div>
          </div>

          {/* Stat cards */}
          <div className="relative grid grid-cols-2 gap-3 py-5 sm:grid-cols-3">
            {/* Problems solved + sparkline */}
            <div
              {...reveal(inView, 1)}
              className={cn(reveal(inView, 1).className, statCard)}
            >
              <div className="flex items-center justify-between">
                <span className={chip}>
                  <Check className="size-3.5" />
                </span>
                <svg
                  viewBox="0 0 96 30"
                  className="h-7 w-16 overflow-visible"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id={sparkGrad} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor={BRAND[0]} />
                      <stop offset="60%" stopColor={BRAND[1]} />
                      <stop offset="100%" stopColor={BRAND[2]} />
                    </linearGradient>
                  </defs>
                  <path
                    d={SPARK}
                    pathLength={1}
                    fill="none"
                    stroke={`url(#${sparkGrad})`}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray={1}
                    strokeDashoffset={inView ? 0 : 1}
                    className="transition-[stroke-dashoffset] duration-1600 ease-out motion-reduce:transition-none"
                    style={{ transitionDelay: "400ms" }}
                  />
                </svg>
              </div>
              <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">
                <CountUp to={128} active={inView} />
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                Problems solved
              </p>
            </div>

            {/* Streak + 7 dots (amber) */}
            <div
              {...reveal(inView, 2)}
              className={cn(reveal(inView, 2).className, statCard)}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    chip,
                    "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
                  )}
                >
                  <Flame className="size-3.5" />
                </span>
                <div className="flex gap-1" aria-hidden>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "size-1.5 rounded-full bg-amber-500 transition-all duration-500 motion-reduce:transition-none dark:bg-amber-400",
                        inView ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                      style={{ transitionDelay: `${500 + i * 90}ms` }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">
                <CountUp to={7} active={inView} pad={2} />
                <span className="ml-1.5 text-sm font-medium text-neutral-400">
                  days
                </span>
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                Current streak
              </p>
            </div>

            {/* Topics + segmented bar */}
            <div
              {...reveal(inView, 3)}
              className={cn(
                reveal(inView, 3).className,
                statCard,
                "col-span-2 sm:col-span-1",
              )}
            >
              <div className="flex items-center justify-between">
                <span className={chip}>
                  <Layers3 className="size-3.5" />
                </span>
                <div className="flex items-end gap-0.5" aria-hidden>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "w-0.75 rounded-full transition-all duration-500 motion-reduce:transition-none",
                        i < 12
                          ? "bg-linear-to-t from-[#810419] to-rose-500"
                          : "bg-neutral-200 dark:bg-white/10",
                      )}
                      style={{
                        height: inView ? 8 + (i % 4) * 3 : 3,
                        transitionDelay: `${500 + i * 35}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">
                <CountUp to={12} active={inView} />
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                Topics explored
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="relative grid gap-4 sm:grid-cols-[1fr_0.8fr]">
            <div
              {...reveal(inView, 4)}
              className={cn(
                reveal(inView, 4).className,
                "relative overflow-hidden rounded-xl border border-rose-900/15 bg-linear-to-br from-rose-900/6 via-rose-900/2 to-transparent p-4 dark:border-rose-400/15 dark:from-rose-400/9 dark:via-rose-400/3",
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-rose-600/15 blur-3xl"
              />
              <div className="relative flex items-center justify-between">
                <p className="text-xs font-semibold">Recommended next</p>
                <Zap className="size-4 text-rose-600 dark:text-rose-400" />
              </div>

              <div className="relative mt-4 flex items-center gap-4">
                {/* Progress ring */}
                <div className="relative size-14 shrink-0">
                  <svg viewBox="0 0 48 48" className="size-14 -rotate-90">
                    <defs>
                      <linearGradient
                        id={ringGrad}
                        x1="0"
                        x2="1"
                        y1="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={BRAND[0]} />
                        <stop offset="55%" stopColor={BRAND[1]} />
                        <stop offset="100%" stopColor={BRAND[2]} />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="24"
                      cy="24"
                      r={RING_R}
                      fill="none"
                      strokeWidth={4}
                      className="stroke-neutral-200/80 dark:stroke-white/10"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r={RING_R}
                      fill="none"
                      strokeWidth={4}
                      strokeLinecap="round"
                      stroke={`url(#${ringGrad})`}
                      strokeDasharray={RING_C}
                      strokeDashoffset={
                        inView ? RING_C * (1 - PROGRESS) : RING_C
                      }
                      className="transition-[stroke-dashoffset] duration-1600 ease-out motion-reduce:transition-none"
                      style={{ transitionDelay: "500ms" }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tabular-nums">
                    <CountUp to={65} active={inView} />%
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="size-4 shrink-0 text-neutral-500 dark:text-neutral-400" />
                    <p className="truncate text-sm font-semibold">
                      Binary Search
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-400">
                    5 questions · Intermediate
                  </p>
                </div>
              </div>

              <div className="relative mt-4 flex items-center justify-between">
                <p className="text-[10px] text-neutral-400">
                  Your learning progress
                </p>
                <span
                  aria-hidden
                  className="inline-flex items-center gap-1 rounded-full bg-[#810419] px-3 py-1 text-[11px] font-medium text-white shadow-[0_3px_14px_rgba(129,4,25,0.3)]"
                >
                  Continue
                  <ArrowRight className="size-3 transition-transform duration-300 group-hover/card:translate-x-0.5" />
                </span>
              </div>
            </div>

            {/* Weekly activity */}
            <div
              {...reveal(inView, 5)}
              className={cn(
                reveal(inView, 5).className,
                "rounded-xl border border-neutral-200/70 p-4 dark:border-white/8",
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold">Weekly activity</p>
                <Trophy className="size-4 text-neutral-400" />
              </div>

              <div className="mt-5 flex h-24 items-stretch justify-between gap-2">
                {week.map((d, i) => {
                  const peak = i === 3;
                  return (
                    <div
                      key={i}
                      className="group/bar flex flex-1 flex-col items-center gap-2"
                    >
                      <div className="relative flex w-full flex-1 items-end">
                        <div
                          className={cn(
                            "relative w-full rounded-t-md transition-[height,background-color] duration-700 ease-out motion-reduce:transition-none",
                            peak
                              ? "bg-linear-to-t from-[#810419] via-rose-600 to-rose-400"
                              : "bg-neutral-900/10 group-hover/bar:bg-rose-500/40 dark:bg-white/12 dark:group-hover/bar:bg-rose-400/40",
                          )}
                          style={{
                            height: inView ? `${d.height}%` : "0%",
                            transitionDelay: `${600 + i * 70}ms`,
                          }}
                        >
                          <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-neutral-900 px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 group-hover/bar:-translate-y-0.5 group-hover/bar:opacity-100 dark:bg-white dark:text-neutral-900">
                            {d.solved} solved
                          </span>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "text-[9px]",
                          peak
                            ? "font-semibold text-[#810419] dark:text-rose-400"
                            : "text-neutral-400",
                        )}
                      >
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p
        className={cn(
          "mt-5 text-center text-[11px] text-neutral-400 transition-opacity delay-1000 duration-1000",
          inView ? "opacity-100" : "opacity-0",
        )}
      >
        A preview of your learning journey
      </p>
    </div>
  );
}