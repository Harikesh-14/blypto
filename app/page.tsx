"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DitherField } from "@/components/ui/dither-field";
import DashboardPreview from "@/components/dashboard-preview";
import FeaturesSection from "@/components/feature-section";
import FinalCta from "@/components/final-cta";

const stats = [
  { label: "Topics covered", value: "12+" },
  { label: "Structured learning", value: "01" },
  { label: "Daily consistency", value: "∞" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-64 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-rose-700/[0.07] blur-[120px] dark:bg-rose-600/12" />
        <div className="absolute -right-37.5 top-100 h-80 w-80 rounded-full bg-rose-500/4 blur-[100px]" />
      </div>

      {/* Hero */}
      <DitherField className="relative isolate overflow-hidden" dotSize={0.5} intensity={0.3}>
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-white/30 via-transparent to-white dark:from-neutral-950/30 dark:via-transparent dark:to-neutral-950" />

        <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 text-center">
          <section className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pt-34 py-10 text-center sm:pt-44">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl md:text-7xl">
              Don't just solve problems.
              <span className="mt-2 block bg-linear-to-r from-[#810419] via-rose-600 to-rose-400 bg-clip-text text-transparent">
                Build problem solvers.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8 dark:text-neutral-400">
              A more intentional way to master Data Structures and Algorithms.
              Discover what to learn, what to practice, and how to keep moving
              forward.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-[#810419] px-6 py-3 text-sm font-medium text-white shadow-[0_5px_25px_rgba(129,4,25,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#690316] hover:shadow-[0_8px_30px_rgba(129,4,25,0.35)]"
              >
                Start learning
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/hub"
                className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-all duration-300 hover:text-[#810419] hover:drop-shadow-[0_0_8px_rgba(129,4,25,0.45)] dark:border-white/10 dark:text-neutral-300 dark:hover:text-rose-400"
              >
                Explore the hub
              </Link>
            </div>

            {/* Dashboard preview */}
            <DashboardPreview />
          </section>
        </section>
      </DitherField>

      {/* Stats */}
      <section className="relative mx-auto max-w-5xl border-y border-neutral-200/70 px-5 py-10 dark:border-white/10">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold tracking-tight text-[#810419] dark:text-rose-400 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] text-neutral-500 sm:text-xs dark:text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Final CTA */}
      <FinalCta />
    </main>
  );
}