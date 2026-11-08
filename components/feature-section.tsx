"use client";

import {
  BookOpen,
  BrainCircuit,
  Bookmark,
  Check,
  Code2,
  Flame,
  Layers3,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const brandGradient = "from-[#810419] via-rose-600 to-rose-400";

function useInView<T extends Element>(threshold = 0.2) {
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
  duration = 1200,
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
      setValue(Math.round(to * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);

  return <>{String(value).padStart(pad, "0")}</>;
}

const fadeUp = (inView: boolean) =>
  cn(
    "transition-all duration-700 ease-out motion-reduce:transition-none",
    inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
  );

function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  index,
  inView,
  amber,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  index: number;
  inView: boolean;
  amber?: boolean;
  children: ReactNode;
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    // Outer wrapper owns the staggered entrance so hover stays instant
    <div
      className={cn(fadeUp(inView), className)}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div
        onMouseMove={onMove}
        className={cn(
          "group/card relative flex h-full flex-col overflow-hidden rounded-2xl border p-3 backdrop-blur",
          "border-neutral-200/80 bg-white/70 dark:border-white/10 dark:bg-neutral-900/50",
          "transition-[border-color,box-shadow] duration-300",
          "hover:border-neutral-300 hover:shadow-[0_24px_70px_rgba(0,0,0,0.07)]",
          "dark:hover:border-white/20 dark:hover:shadow-[0_24px_70px_rgba(0,0,0,0.45)]",
        )}
      >
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(190,18,60,0.07), transparent 55%)",
          }}
        />

        {/* Visual */}
        <div className="relative h-56 overflow-hidden rounded-xl border border-neutral-200/70 bg-neutral-50/80 dark:border-white/[0.07] dark:bg-white/3">
          {children}
        </div>

        {/* Copy */}
        <div className="relative px-3 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-xl transition-colors duration-300",
                amber
                  ? "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400"
                  : "bg-neutral-900/5 text-neutral-600 group-hover/card:bg-[#810419]/10 group-hover/card:text-[#810419] dark:bg-white/8 dark:text-neutral-300 dark:group-hover/card:bg-rose-400/10 dark:group-hover/card:text-rose-400",
              )}
            >
              <Icon className="size-4.5" />
            </span>
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          </div>
          <p className="mt-3 max-w-md text-sm leading-7 text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

const sheets = [
  { name: "Arrays & Hashing", count: 24, level: "Easy", done: 0.9 },
  { name: "Binary Search", count: 18, level: "Medium", done: 0.65 },
  { name: "Dynamic Programming", count: 32, level: "Hard", done: 0.3 },
  { name: "Graphs", count: 21, level: "Hard", done: 0.1 },
] as const;

const levelStyle = {
  Easy: "bg-neutral-900/5 text-neutral-600 dark:bg-white/8 dark:text-neutral-300",
  Medium:
    "bg-rose-500/10 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  Hard: "bg-[#810419]/15 text-[#810419] ring-1 ring-[#810419]/20 dark:bg-rose-500/15 dark:text-rose-400 dark:ring-rose-400/20",
} as const;

function SheetsVisual({ inView }: { inView: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      {sheets.map((s, i) => (
        <div
          key={s.name}
          className={cn(
            "flex items-center gap-3 rounded-lg border border-neutral-200/80 bg-white/90 px-3 py-2 transition-all duration-700 ease-out hover:border-neutral-300 motion-reduce:transition-none dark:border-white/8 dark:bg-neutral-900/80 dark:hover:border-white/20",
            inView ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0",
          )}
          style={{ transitionDelay: `${300 + i * 110}ms` }}
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-neutral-900/5 text-[10px] font-semibold tabular-nums text-neutral-500 dark:bg-white/8 dark:text-neutral-400">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{s.name}</p>
            <p className="text-[10px] text-neutral-400">{s.count} questions</p>
          </div>

          <div className="hidden h-1 w-14 overflow-hidden rounded-full bg-neutral-200/80 sm:block dark:bg-white/10">
            <div
              className={cn(
                "h-full rounded-full bg-linear-to-r transition-[width] duration-1000 ease-out motion-reduce:transition-none",
                brandGradient,
              )}
              style={{
                width: inView ? `${s.done * 100}%` : "0%",
                transitionDelay: `${700 + i * 110}ms`,
              }}
            />
          </div>

          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
              levelStyle[s.level],
            )}
          >
            {s.level}
          </span>
        </div>
      ))}
    </div>
  );
}

const steps = [
  { label: "Arrays", state: "done" },
  { label: "Hashing", state: "done" },
  { label: "Binary Search", state: "current" },
  { label: "Graphs", state: "next" },
] as const;

function ProgressVisual({ inView }: { inView: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold">Your path</span>
        <span className="text-neutral-400">Step 3 of 4</span>
      </div>

      <div className="relative">
        {/* Track + animated fill (ends at the current node) */}
        <div className="absolute inset-x-[12.5%] top-4.25 h-0.5 rounded-full bg-neutral-200 dark:bg-white/10">
          <div
            className={cn(
              "h-full rounded-full bg-linear-to-r transition-[width] duration-1400 ease-out motion-reduce:transition-none",
              brandGradient,
            )}
            style={{
              width: inView ? "66.67%" : "0%",
              transitionDelay: "500ms",
            }}
          />
        </div>

        <div className="relative grid grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-2.5">
              <div
                className={cn(
                  "relative flex size-9 items-center justify-center rounded-full transition-all duration-500 motion-reduce:transition-none",
                  inView ? "scale-100 opacity-100" : "scale-50 opacity-0",
                  s.state === "done" &&
                    "bg-linear-to-br from-[#810419] to-rose-500 text-white shadow-[0_4px_14px_rgba(129,4,25,0.3)]",
                  s.state === "current" &&
                    "bg-white ring-2 ring-rose-500/70 dark:bg-neutral-900",
                  s.state === "next" &&
                    "border border-dashed border-neutral-300 bg-neutral-100 text-neutral-400 dark:border-white/15 dark:bg-neutral-800",
                )}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                {s.state === "done" && <Check className="size-4" />}
                {s.state === "current" && (
                  <>
                    <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/25 motion-reduce:hidden" />
                    <span
                      className={cn(
                        "relative size-2.5 rounded-full bg-linear-to-br",
                        brandGradient,
                      )}
                    />
                  </>
                )}
                {s.state === "next" && (
                  <span className="text-[11px] font-medium">{i + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  s.state === "next"
                    ? "text-neutral-400"
                    : "text-neutral-700 dark:text-neutral-200",
                )}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-rose-900/15 bg-rose-900/5 px-2.5 py-1 text-[10px] font-medium text-[#810419] dark:border-rose-400/15 dark:bg-rose-400/10 dark:text-rose-400">
        <span className="size-1.5 rounded-full bg-rose-500" />
        Up next · Binary Search
      </span>
    </div>
  );
}

const paper =
  "absolute h-28 w-40 rounded-xl border border-neutral-200/90 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out motion-reduce:transition-none dark:border-white/10 dark:bg-neutral-800 dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]";

function HubVisual({ inView }: { inView: boolean }) {
  const bar = "h-1.5 rounded-full bg-neutral-200 dark:bg-white/12";
  return (
    <div className="relative flex h-full items-center justify-center">
      {/* Left: explanation */}
      <div
        className={cn(
          paper,
          "z-0",
          inView
            ? "-translate-x-12 translate-y-2 rotate-[-9deg] group-hover/card:-translate-x-15 group-hover/card:-rotate-12"
            : "translate-x-0 translate-y-0 rotate-0",
        )}
        style={{ transitionDelay: "250ms" }}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
          <BookOpen className="size-3" /> Explanation
        </div>
        <div className="mt-3 space-y-2">
          <div className={cn(bar, "w-full")} />
          <div className={cn(bar, "w-5/6")} />
          <div className={cn(bar, "w-3/5")} />
          <div className={cn(bar, "w-4/5")} />
        </div>
      </div>

      {/* Right: resources */}
      <div
        className={cn(
          paper,
          "z-10",
          inView
            ? "translate-x-12 translate-y-2 rotate-[9deg] group-hover/card:translate-x-15 group-hover/card:rotate-12"
            : "translate-x-0 translate-y-0 rotate-0",
        )}
        style={{ transitionDelay: "350ms" }}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">
          <Bookmark className="size-3" /> Resources
        </div>
        <div className="mt-3 space-y-2.5">
          {["w-4/5", "w-3/5", "w-2/3"].map((w) => (
            <div key={w} className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-rose-500/70" />
              <div className={cn(bar, w)} />
            </div>
          ))}
        </div>
      </div>

      {/* Front: solution */}
      <div
        className={cn(
          paper,
          "z-20 border-rose-900/15 dark:border-rose-400/20",
          inView
            ? "-translate-y-2 group-hover/card:-translate-y-3"
            : "translate-y-2",
        )}
        style={{ transitionDelay: "450ms" }}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#810419] dark:text-rose-400">
          <Code2 className="size-3" /> Solution
        </div>
        <pre className="mt-2.5 font-mono text-[9px] leading-[1.7] text-neutral-500 dark:text-neutral-400">
          <span>lo, hi = 0, len(a) - 1</span>
          {"\n"}
          <span className="text-[#810419] dark:text-rose-400">while</span>
          <span> lo &lt;= hi:</span>
          {"\n"}
          <span>{"  "}mid = (lo + hi) // 2</span>
        </pre>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Visual 4 — Build consistency (heatmap)                                    */
/* -------------------------------------------------------------------------- */

const ROWS = 7;
const COLS = 18;

// Deterministic pattern (no Math.random → no hydration mismatch)
const level = (r: number, c: number) => {
  if (c === COLS - 1) return r % 2 ? 4 : 3; // current 7-day streak
  return (c * 7 + r * 13 + ((c * r) % 5)) % 5;
};

const levelClass = [
  "bg-neutral-900/6 dark:bg-white/6",
  "bg-amber-500/20 dark:bg-amber-400/20",
  "bg-amber-500/40 dark:bg-amber-400/40",
  "bg-amber-500/70 dark:bg-amber-400/70",
  "bg-amber-500 dark:bg-amber-400",
];

function ConsistencyVisual({ inView }: { inView: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold">Last 18 weeks</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:border-amber-400/20 dark:text-amber-400">
          <Flame className="size-3" />
          <span className="tabular-nums">
            <CountUp to={7} active={inView} pad={2} />
          </span>{" "}
          day streak
        </span>
      </div>

      <div
        className="mx-auto grid w-full max-w-80 gap-1"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        aria-hidden
      >
        {Array.from({ length: ROWS * COLS }).map((_, idx) => {
          const r = Math.floor(idx / COLS);
          const c = idx % COLS;
          const today = r === ROWS - 1 && c === COLS - 1;
          return (
            <span
              key={idx}
              className={cn(
                "relative aspect-square rounded-[3px] transition-all duration-500 motion-reduce:transition-none",
                levelClass[level(r, c)],
                inView ? "scale-100 opacity-100" : "scale-50 opacity-0",
              )}
              style={{ transitionDelay: `${300 + c * 28 + r * 8}ms` }}
            >
              {today && (
                <span className="absolute -inset-0.5 animate-pulse rounded-lg ring-2 ring-amber-500/60 motion-reduce:animate-none" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const [ref, inView] = useInView<HTMLElement>(0.12);

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-24 left-1/2 -z-10 h-96 w-2xl -translate-x-1/2 rounded-full bg-rose-600/[0.07] blur-[110px] transition-opacity duration-1000 dark:bg-rose-500/10",
          inView ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Heading */}
      <div className={cn("mx-auto max-w-2xl text-center", fadeUp(inView))}>
        <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-[#810419] uppercase dark:text-rose-400">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-current" />
          Everything in one place
          <span className="h-px w-8 bg-linear-to-l from-transparent to-current" />
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          A{" "}
          <span
            className={cn(
              "bg-linear-to-r bg-clip-text text-transparent",
              brandGradient,
            )}
          >
            smarter way
          </span>{" "}
          to approach DSA.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base dark:text-neutral-400">
          Less time figuring out what to do next. More time understanding,
          practicing, and improving.
        </p>
      </div>

      {/* Bento grid */}
      <div className="mt-16 grid gap-4 lg:grid-cols-12">
        <FeatureCard
          index={1}
          inView={inView}
          icon={Layers3}
          title="Structured sheets"
          description="Explore carefully organized DSA questions, grouped by topics and difficulty."
          className="lg:col-span-7"
        >
          <SheetsVisual inView={inView} />
        </FeatureCard>

        <FeatureCard
          index={2}
          inView={inView}
          icon={BrainCircuit}
          title="Learn progressively"
          description="Move forward with recommendations that reflect your learning progress."
          className="lg:col-span-5"
        >
          <ProgressVisual inView={inView} />
        </FeatureCard>

        <FeatureCard
          index={3}
          inView={inView}
          icon={Target}
          title="Knowledge hub"
          description="Keep solutions, explanations, and useful learning resources in one place."
          className="lg:col-span-5"
        >
          <HubVisual inView={inView} />
        </FeatureCard>

        <FeatureCard
          index={4}
          inView={inView}
          icon={Flame}
          amber
          title="Build consistency"
          description="Track your streaks, maintain momentum, and turn daily practice into a habit."
          className="lg:col-span-7"
        >
          <ConsistencyVisual inView={inView} />
        </FeatureCard>
      </div>
    </section>
  );
}