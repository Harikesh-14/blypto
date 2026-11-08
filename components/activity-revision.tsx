"use client";

import { ArrowRight, Flame, RotateCcw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CountUp,
  DashboardCard,
  ProgressBar,
  Reveal,
  SectionHeading,
} from "@/components/primitivies";
import { activityLevels, revisionTopics } from "@/lib/data";

const WEEKS = 12;
const DAYS = 7;

// Amber ramp: consistency is the one place the warm accent is used
const levelClass = [
  "bg-neutral-900/6 dark:bg-white/6",
  "bg-amber-500/20 dark:bg-amber-400/20",
  "bg-amber-500/40 dark:bg-amber-400/40",
  "bg-amber-500/70 dark:bg-amber-400/70",
  "bg-amber-500 dark:bg-amber-400",
];

const summary = [
  { label: "Active days", value: 42 },
  { label: "Longest streak", value: 12 },
  { label: "Total attempts", value: 186 },
];

export default function ActivityRevision() {
  return (
    <section className="mb-12">
      <SectionHeading
        title="Activity & revision"
        description="Stay consistent and keep your knowledge fresh."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Activity heatmap */}
        <Reveal className="lg:col-span-3">
          {(inView) => (
            <DashboardCard className="h-full">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold tracking-tight">
                    Learning activity
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Your activity over the last 12 weeks.
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-400/20 dark:text-amber-400">
                  <Flame className="size-3.5" />
                  7 day streak
                </span>
              </div>

              <div className="mt-6 overflow-x-auto pb-2">
                <div
                  role="img"
                  aria-label="Activity heatmap for the last 12 weeks"
                  className="grid min-w-90 grid-cols-12 gap-1.5"
                >
                  {Array.from({ length: DAYS }).flatMap((_, r) =>
                    Array.from({ length: WEEKS }).map((_, c) => {
                      const level = activityLevels[c * DAYS + r];
                      const today = r === DAYS - 1 && c === WEEKS - 1;
                      return (
                        <span
                          key={`${r}-${c}`}
                          title={`Activity level ${level} of 4`}
                          className={cn(
                            "relative h-5 w-full rounded-md transition-all duration-500 hover:brightness-110 motion-reduce:transition-none",
                            levelClass[level],
                            inView ? "scale-100 opacity-100" : "scale-50 opacity-0",
                          )}
                          style={{ transitionDelay: `${250 + c * 35 + r * 10}ms` }}
                        >
                          {today && (
                            <span className="absolute -inset-0.5 animate-pulse rounded-lg ring-2 ring-amber-500/60 motion-reduce:animate-none" />
                          )}
                        </span>
                      );
                    }),
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400">
                <span>12 weeks ago</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  {levelClass.map((c, i) => (
                    <span key={i} className={cn("size-2.5 rounded-[3px]", c)} />
                  ))}
                  <span>More</span>
                </div>
                <span>Today</span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-neutral-200/70 pt-5 dark:border-white/10">
                {summary.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-semibold tracking-tight tabular-nums">
                      <CountUp to={s.value} active={inView} />
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-400">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </DashboardCard>
          )}
        </Reveal>

        {/* Revision reminder */}
        <Reveal delay={100} className="lg:col-span-2">
          {(inView) => (
            <DashboardCard className="h-full">
              <div className="flex items-center gap-2 text-[#810419] dark:text-rose-400">
                <RotateCcw className="size-4" />
                <h3 className="font-semibold tracking-tight text-neutral-950 dark:text-white">
                  Time to revise
                </h3>
              </div>

              <div className="mt-6">
                <p className="text-5xl font-semibold tracking-[-0.04em] tabular-nums">
                  <span
                    className={cn(
                      "bg-linear-to-br bg-clip-text text-transparent",
                      "from-[#810419] to-rose-500",
                    )}
                  >
                    <CountUp to={12} active={inView} />
                  </span>
                </p>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Questions are ready for revision.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {revisionTopics.map((item, i) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-neutral-600 dark:text-neutral-300">
                        {item.name}
                      </span>
                      <span className="font-medium tabular-nums">
                        {item.count} questions
                      </span>
                    </div>
                    <ProgressBar
                      value={(item.count / 5) * 100}
                      delay={300 + i * 120}
                      className="h-1"
                    />
                  </div>
                ))}
              </div>

              <Link
                href="/revision"
                className="group mt-7 flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-200 text-xs font-semibold transition-colors hover:border-rose-900/30 hover:bg-rose-900/5 hover:text-[#810419] focus-visible:outline-none dark:border-white/10 dark:hover:border-rose-400/30 dark:hover:bg-rose-400/5 dark:hover:text-rose-400"
              >
                Start revision
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </DashboardCard>
          )}
        </Reveal>
      </div>
    </section>
  );
}