"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { topics } from "@/lib/data";
import {
  CountUp,
  DashboardCard,
  ProgressBar,
  Reveal,
  SectionHeading,
} from "@/components/primitivies";

export default function TopicMastery() {
  return (
    <section className="mb-12">
      <SectionHeading
        title="Topic mastery"
        description="See how you're progressing across different DSA topics."
        href="/sheets"
      />

      <Reveal>
        {(inView) => (
          <DashboardCard>
            <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {topics.map((topic, i) => {
                const percentage = Math.round((topic.solved / topic.total) * 100);

                return (
                  <div key={topic.name}>
                    <div className="mb-3 flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-medium">
                          {topic.name}
                        </h3>
                        <p className="mt-1 text-xs text-neutral-400">
                          {topic.solved} of {topic.total} questions solved
                        </p>
                      </div>
                      <span className="text-xl font-semibold tracking-tight tabular-nums">
                        <CountUp to={percentage} active={inView} />
                        <span className="text-sm text-neutral-400">%</span>
                      </span>
                    </div>
                    <ProgressBar value={percentage} delay={200 + i * 120} />
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t border-neutral-200/70 pt-5 dark:border-white/10">
              <Link
                href="/sheets"
                className="group inline-flex items-center gap-1 text-xs font-semibold text-[#810419] focus-visible:outline-none dark:text-rose-400"
              >
                Explore all topics
                <ChevronRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </DashboardCard>
        )}
      </Reveal>
    </section>
  );
}