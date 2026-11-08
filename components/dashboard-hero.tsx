"use client";

import { Flame, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CountUp,
  DashboardCard,
  IconChip,
  Reveal,
  brandGradient,
} from "@/components/primitivies";

function greetingFor(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function DailyGoal() {
  const total = 3;
  const done = 2;

  return (
    <Reveal delay={120} className="mb-10">
      {(inView) => (
        <DashboardCard className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <IconChip className="size-11">
              <Target className="size-5" />
            </IconChip>
            <div>
              <h2 className="font-semibold tracking-tight">Your daily goal</h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                You&apos;re making progress. Keep it up!
              </p>
            </div>
          </div>

          <div className="w-full sm:max-w-md">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-medium">
                {done} of {total} questions completed
              </span>
              <span className="font-semibold tabular-nums text-[#810419] dark:text-rose-400">
                <CountUp to={67} active={inView} />%
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={67}
              aria-valuemin={0}
              aria-valuemax={100}
              className="flex gap-1.5"
            >
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200/70 dark:bg-white/10"
                >
                  <div
                    className={cn(
                      "h-full rounded-full bg-linear-to-r transition-[width] duration-700 ease-out motion-reduce:transition-none",
                      brandGradient,
                    )}
                    style={{
                      width: inView && i < done ? "100%" : "0%",
                      transitionDelay: `${300 + i * 250}ms`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      )}
    </Reveal>
  );
}

export default function DashboardHero() {
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    setGreeting(greetingFor(new Date().getHours()));
  }, []);

  return (
    <>
      <Reveal className="mb-8">
        {(inView) => (
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-900/10 bg-rose-900/5 px-3 py-1.5 text-xs font-medium text-[#810419] dark:border-rose-400/15 dark:bg-rose-400/5 dark:text-rose-400">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/50 motion-reduce:hidden" />
                  <span className="relative size-1.5 rounded-full bg-rose-600" />
                </span>
                Your learning space
              </div>

              <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {greeting}
                <span
                  className={cn(
                    "bg-linear-to-r bg-clip-text text-transparent",
                    brandGradient,
                  )}
                >
                  .
                </span>
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500 sm:text-base dark:text-neutral-400">
                Every problem you solve brings you one step closer to mastery.
              </p>
            </div>

            {/* Streak — the one warm accent */}
            <div className="flex items-center gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3.5 dark:bg-amber-400/5">
              <span className="relative flex size-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <span className="absolute inset-0 animate-ping rounded-xl bg-amber-500/15 motion-reduce:hidden" />
                <Flame className="relative size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">7 day streak</p>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  You&apos;re building a habit!
                </p>
                <div className="mt-2 flex gap-1" aria-hidden>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "size-1.5 rounded-full bg-amber-500 transition-all duration-500 motion-reduce:transition-none dark:bg-amber-400",
                        inView ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                      style={{ transitionDelay: `${400 + i * 90}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Reveal>

      <DailyGoal />
    </>
  );
}