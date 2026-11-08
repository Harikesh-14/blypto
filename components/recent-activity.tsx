"use client";

import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { recentActivity } from "@/lib/data";
import {
  DashboardCard,
  DifficultyPill,
  Reveal,
  SectionHeading,
} from "@/components/primitivies";

export default function RecentActivity() {
  return (
    <section className="mb-6">
      <SectionHeading
        title="Recent activity"
        description="Your latest problem-solving sessions."
        href="/history"
        linkLabel="View history"
      />

      <Reveal>
        {(inView) => (
          <DashboardCard className="p-0">
            <ul className="divide-y divide-neutral-200/70 dark:divide-white/10">
              {recentActivity.map((activity, i) => {
                const revised = activity.status === "revised";
                const Icon = revised ? RotateCcw : Check;

                return (
                  <li
                    key={activity.title}
                    className={cn(
                      "group/row flex items-center gap-3 px-4 py-4 transition-all duration-500 hover:bg-neutral-900/2.5 motion-reduce:transition-none sm:px-5 dark:hover:bg-white/3",
                      inView
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0",
                    )}
                    style={{ transitionDelay: `${150 + i * 100}ms` }}
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                        revised
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          : "bg-neutral-900/5 text-neutral-600 group-hover/row:bg-[#810419]/10 group-hover/row:text-[#810419] dark:bg-white/8 dark:text-neutral-300 dark:group-hover/row:bg-rose-400/10 dark:group-hover/row:text-rose-400",
                      )}
                    >
                      <Icon className="size-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {activity.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-neutral-400">
                        {activity.topic}
                        {revised && " · Revised"}
                      </p>
                    </div>

                    <DifficultyPill
                      level={activity.difficulty}
                      className="hidden sm:inline-flex"
                    />

                    <span className="w-16 shrink-0 text-right text-[11px] text-neutral-400">
                      {activity.date}
                    </span>
                  </li>
                );
              })}
            </ul>
          </DashboardCard>
        )}
      </Reveal>
    </section>
  );
}