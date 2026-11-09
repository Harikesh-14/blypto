"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  DashboardCard,
  IconChip,
  ProgressBar,
  Reveal,
} from "@/components/primitivies";
import { learningGoals } from "@/lib/profile-data";

export default function ProfileGoals({ className }: { className?: string }) {
  return (
    <Reveal className={className}>
      <DashboardCard className="h-full">
        <h2 className="text-lg font-semibold tracking-tight">
          My learning goals
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          The targets you&apos;ve set for your learning routine.
        </p>

        <div className="mt-7 space-y-7">
          {learningGoals.map((goal, i) => {
            const Icon = goal.icon;
            const pct = Math.round((goal.current / goal.target) * 100);
            const remaining = goal.target - goal.current;

            return (
              <div key={goal.label} className="flex items-start gap-3.5">
                <IconChip>
                  <Icon className="size-4.5" />
                </IconChip>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-medium">{goal.label}</p>
                    <p className="text-sm tabular-nums">
                      <span className="font-semibold">{goal.current}</span>
                      <span className="text-neutral-400">
                        {" "}
                        / {goal.target} {goal.unit}
                      </span>
                    </p>
                  </div>

                  <ProgressBar
                    value={pct}
                    delay={200 + i * 150}
                    className="mt-3 h-2"
                  />

                  <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
                    <span>
                      {remaining > 0
                        ? `${remaining} more ${goal.unit} to reach your goal`
                        : "Goal reached"}
                    </span>
                    <span className="font-medium tabular-nums">{pct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 border-t border-neutral-200/70 pt-5 dark:border-white/10">
          <Link
            href="/settings"
            className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-neutral-200 pr-3 pl-4 text-xs font-semibold transition-colors hover:border-rose-900/30 hover:bg-rose-900/5 hover:text-[#810419] focus-visible:outline-none dark:border-white/10 dark:hover:border-rose-400/30 dark:hover:bg-rose-400/5 dark:hover:text-rose-400"
          >
            Update learning goals
            <ChevronRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </DashboardCard>
    </Reveal>
  );
}