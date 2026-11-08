"use client";

import { ArrowRight, BookOpen, BrainCircuit, Clock3 } from "lucide-react";
import Link from "next/link";
import {
  DashboardCard,
  DifficultyPill,
  ProgressBar,
  Reveal,
  SectionHeading,
} from "@/components/primitivies";

export default function LearningJourney() {
  return (
    <section className="mb-12">
      <SectionHeading
        title="Your learning journey"
        description="Pick up where you left off or explore your next challenge."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Continue learning */}
        <Reveal className="lg:col-span-3">
          <DashboardCard className="h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-neutral-500 uppercase dark:text-neutral-400">
                <BookOpen className="size-4" />
                Continue learning
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-1 text-[10px] font-medium text-rose-700 dark:text-rose-300">
                <span className="size-1.5 animate-pulse rounded-full bg-rose-500 motion-reduce:animate-none" />
                In progress
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs text-neutral-400">Current topic</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                Arrays &amp; Hashing
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Master the fundamentals of arrays, hash maps, and efficient data
                lookup.
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-neutral-500 dark:text-neutral-400">
                  Topic progress
                </span>
                <span className="font-medium tabular-nums">18 / 24</span>
              </div>
              <ProgressBar value={75} delay={200} />
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-neutral-200/70 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <Clock3 className="size-4" />6 questions remaining
              </div>

              <Link
                href="/sheets"
                className="group inline-flex h-11 items-center gap-3 self-start rounded-full bg-[#810419] pr-1.5 pl-5 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(129,4,25,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#690316] hover:shadow-[0_12px_30px_rgba(129,4,25,0.38)] focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:self-auto dark:focus-visible:ring-offset-neutral-900"
              >
                Continue learning
                <span className="flex size-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:scale-105">
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </DashboardCard>
        </Reveal>

        {/* Recommended question — the focal card */}
        <Reveal delay={100} className="lg:col-span-2">
          <DashboardCard tone="brand" className="h-full">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-[#810419] uppercase dark:text-rose-400">
              <BrainCircuit className="size-4" />
              Recommended for you
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                <DifficultyPill level="Medium" />
                <span className="text-xs text-neutral-400">Binary Search</span>
              </div>

              <h3 className="mt-3 text-xl leading-snug font-semibold tracking-tight">
                Find Minimum in Rotated Sorted Array
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                A good next challenge to strengthen your binary search
                understanding.
              </p>
            </div>

            <div className="mt-6 border-t border-rose-900/10 pt-4 dark:border-rose-400/10">
              <Link
                href="/sheets"
                className="group inline-flex items-center gap-2.5 text-xs font-semibold text-[#810419] focus-visible:outline-none dark:text-rose-400"
              >
                Solve this question
                <span className="flex size-7 items-center justify-center rounded-full bg-[#810419]/10 transition-all duration-300 group-hover:bg-[#810419] group-hover:text-white dark:bg-rose-400/10 dark:group-hover:bg-rose-500">
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </DashboardCard>
        </Reveal>
      </div>
    </section>
  );
}