"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import {
  CountUp,
  DashboardCard,
  IconChip,
  Reveal,
  SectionHeading,
  brandGradient,
} from "@/components/primitivies";
import { Stat, stats } from "@/lib/data";

const SPARK =
  "M0 26 C 10 24, 14 18, 24 19 S 38 10, 48 12 S 62 4, 72 6 S 86 2, 96 1";
const RING_R = 20;
const RING_C = 2 * Math.PI * RING_R;

function StatVisual({
  kind,
  value,
  inView,
}: {
  kind: Stat["visual"];
  value: number;
  inView: boolean;
}) {
  const uid = useId().replace(/:/g, "");

  if (kind === "spark") {
    return (
      <svg viewBox="0 0 96 30" className="h-7 w-16 overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={`spark-${uid}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#810419" />
            <stop offset="60%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
        <path
          d={SPARK}
          pathLength={1}
          fill="none"
          stroke={`url(#spark-${uid})`}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={inView ? 0 : 1}
          className="transition-[stroke-dashoffset] duration-1600 ease-out motion-reduce:transition-none"
          style={{ transitionDelay: "300ms" }}
        />
      </svg>
    );
  }

  if (kind === "ring") {
    return (
      <svg viewBox="0 0 48 48" className="size-10 -rotate-90" aria-hidden>
        <defs>
          <linearGradient id={`ring-${uid}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#810419" />
            <stop offset="55%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
        <circle
          cx="24"
          cy="24"
          r={RING_R}
          fill="none"
          strokeWidth={5}
          className="stroke-neutral-200/80 dark:stroke-white/10"
        />
        <circle
          cx="24"
          cy="24"
          r={RING_R}
          fill="none"
          strokeWidth={5}
          strokeLinecap="round"
          stroke={`url(#ring-${uid})`}
          strokeDasharray={RING_C}
          strokeDashoffset={inView ? RING_C * (1 - value / 100) : RING_C}
          className="transition-[stroke-dashoffset] duration-1600 ease-out motion-reduce:transition-none"
          style={{ transitionDelay: "300ms" }}
        />
      </svg>
    );
  }

  if (kind === "dots") {
    return (
      <div className="flex gap-1" aria-hidden>
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
    );
  }

  return (
    <div className="flex items-end gap-0.5" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-0.75 rounded-full bg-linear-to-t from-[#810419] to-rose-500 transition-all duration-500 motion-reduce:transition-none",
          )}
          style={{
            height: inView ? 8 + (i % 4) * 3 : 3,
            transitionDelay: `${400 + i * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function StatsOverview() {
  return (
    <section className="mb-12">
      <SectionHeading
        title="Your learning overview"
        description="A quick look at your progress so far."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.label} delay={index * 90} threshold={0.3}>
              {(inView) => (
                <DashboardCard className="h-full p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <IconChip amber={stat.amber}>
                      <Icon className="size-4.5" />
                    </IconChip>
                    <StatVisual
                      kind={stat.visual}
                      value={stat.value}
                      inView={inView}
                    />
                  </div>

                  <p className="mt-5 text-3xl font-semibold tracking-tight tabular-nums">
                    <CountUp to={stat.value} active={inView} />
                    {stat.suffix}
                    {stat.unit && (
                      <span className="ml-1.5 text-sm font-medium text-neutral-400">
                        {stat.unit}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm font-medium">{stat.label}</p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {stat.description}
                  </p>
                </DashboardCard>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}