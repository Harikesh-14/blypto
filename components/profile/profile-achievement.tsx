"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardCard, Reveal } from "@/components/primitivies";
import { achievements } from "@/lib/profile-data";

export default function ProfileAchievements({
  className,
}: {
  className?: string;
}) {
  return (
    <Reveal delay={100} className={className}>
      {(inView) => (
        <DashboardCard tone="brand" className="h-full">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Achievements
              </h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Milestones you&apos;ve unlocked so far.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[#810419]/10 px-2.5 py-1 text-[10px] font-semibold text-[#810419] dark:bg-rose-400/10 dark:text-rose-400">
              {achievements.length} unlocked
            </span>
          </div>

          <ul className="mt-6 space-y-3">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              return (
                <li
                  key={a.title}
                  className={cn(
                    "group/ach flex items-center gap-3.5 rounded-xl border border-neutral-200/70 bg-white/70 p-3 transition-all duration-500 hover:border-rose-900/20 motion-reduce:transition-none dark:border-white/8 dark:bg-neutral-900/60 dark:hover:border-rose-400/20",
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0",
                  )}
                  style={{ transitionDelay: `${250 + i * 120}ms` }}
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover/ach:scale-105",
                      a.amber
                        ? "bg-linear-to-br from-amber-500 to-amber-400 shadow-[0_6px_18px_rgba(245,158,11,0.35)]"
                        : "bg-linear-to-br from-[#810419] to-rose-500 shadow-[0_6px_18px_rgba(129,4,25,0.3)]",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold tracking-tight">
                      {a.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
                      {a.description}
                    </p>
                  </div>

                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-neutral-900/5 text-neutral-500 dark:bg-white/8 dark:text-neutral-300"
                    title="Unlocked"
                  >
                    <Check className="size-3.5" />
                  </span>
                </li>
              );
            })}
          </ul>
        </DashboardCard>
      )}
    </Reveal>
  );
}