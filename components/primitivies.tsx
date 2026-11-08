"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Difficulty } from "@/lib/data";

/* -------------------------------------------------------------------------- */
/*  Colour system (shared with the landing page)                              */
/*  - Neutrals: surfaces, chips, labels                                       */
/*  - Brand gradient (crimson → rose): progress & data                        */
/*  - Amber: streak / consistency only                                        */
/* -------------------------------------------------------------------------- */

export const brandGradient = "from-[#810419] via-rose-600 to-rose-400";

/* -------------------------------------------------------------------------- */
/*  Hooks & motion                                                            */
/* -------------------------------------------------------------------------- */

export function useInView<T extends Element>(threshold = 0.2) {
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

export function CountUp({
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

/** Fade/slide-in on scroll. Children may be a render function receiving `inView`. */
export function Reveal({
  children,
  delay = 0,
  className,
  threshold = 0.12,
}: {
  children: ReactNode | ((inView: boolean) => ReactNode);
  delay?: number;
  className?: string;
  threshold?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(threshold);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {typeof children === "function" ? children(inView) : children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                           */
/* -------------------------------------------------------------------------- */

export function DashboardCard({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "brand";
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "group/card relative isolate overflow-hidden rounded-2xl border p-5 backdrop-blur",
        "transition-[border-color,box-shadow] duration-300",
        tone === "brand"
          ? "border-rose-900/15 bg-linear-to-br from-rose-900/6 via-rose-900/2 to-white/70 dark:border-rose-400/15 dark:from-rose-400/9 dark:via-rose-400/3 dark:to-neutral-900/60"
          : "border-neutral-200/80 bg-white/80 dark:border-white/10 dark:bg-neutral-900/60",
        "hover:border-neutral-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]",
        "dark:hover:border-white/20 dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      {/* Cursor spotlight (sits behind content) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(190,18,60,0.07), transparent 55%)",
        }}
      />
      {tone === "brand" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-12 -z-10 size-40 rounded-full bg-rose-600/15 blur-3xl"
        />
      )}
      {children}
    </div>
  );
}

export function IconChip({
  children,
  amber,
  className,
}: {
  children: ReactNode;
  amber?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
        amber
          ? "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400"
          : "bg-neutral-900/5 text-neutral-600 group-hover/card:bg-[#810419]/10 group-hover/card:text-[#810419] dark:bg-white/8 dark:text-neutral-300 dark:group-hover/card:bg-rose-400/10 dark:group-hover/card:text-rose-400",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  description,
  href,
  linkLabel = "View all",
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <Reveal className="mb-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-rose-900/30 hover:text-[#810419] dark:border-white/10 dark:text-neutral-300 dark:hover:border-rose-400/30 dark:hover:text-rose-400"
          >
            {linkLabel}
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

export function ProgressBar({
  value,
  delay = 0,
  className,
}: {
  value: number;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.5);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-neutral-200/70 dark:bg-white/10",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-linear-to-r transition-[width] duration-1000 ease-out motion-reduce:transition-none",
          brandGradient,
        )}
        style={{
          width: inView ? `${value}%` : "0%",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

const levelStyle: Record<Difficulty, string> = {
  Easy: "bg-neutral-900/5 text-neutral-600 dark:bg-white/8 dark:text-neutral-300",
  Medium: "bg-rose-500/10 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  Hard: "bg-[#810419]/15 text-[#810419] ring-1 ring-[#810419]/20 dark:bg-rose-500/15 dark:text-rose-400 dark:ring-rose-400/20",
};

export function DifficultyPill({
  level,
  className,
}: {
  level: Difficulty;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium",
        levelStyle[level],
        className,
      )}
    >
      {level}
    </span>
  );
}