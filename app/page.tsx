"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Flame,
  Layers3,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const stats = [
  { label: "Topics covered", value: "12+" },
  { label: "Structured learning", value: "01" },
  { label: "Daily consistency", value: "∞" },
];

const features = [
  {
    icon: Layers3,
    title: "Structured sheets",
    description:
      "Explore carefully organized DSA questions, grouped by topics and difficulty.",
  },
  {
    icon: BrainCircuit,
    title: "Learn progressively",
    description:
      "Move forward with recommendations that reflect your learning progress.",
  },
  {
    icon: Target,
    title: "Knowledge hub",
    description:
      "Keep solutions, explanations, and useful learning resources in one place.",
  },
  {
    icon: Flame,
    title: "Build consistency",
    description:
      "Track your streaks, maintain momentum, and turn daily practice into a habit.",
  },
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
      <section className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-24 pt-36 text-center sm:pt-44">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-900/10 bg-rose-900/[0.035] px-3.5 py-1.5 text-xs font-medium text-[#810419] dark:border-rose-400/15 dark:bg-rose-400/6 dark:text-rose-300">
          <span className="size-1.5 rounded-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.7)]" />
          Your DSA journey, better organized
          <ArrowUpRight className="size-3.5" />
        </div>

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
        <div className="relative mt-20 w-full max-w-4xl">
          <div className="absolute -inset-8 rounded-[40px] bg-rose-700/6 blur-[70px] dark:bg-rose-500/8" />

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/80 p-4 text-left shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:p-6 dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-neutral-200/70 pb-4 dark:border-white/10">
              <div>
                <p className="text-sm font-semibold">Your learning overview</p>
                <p className="mt-1 text-xs text-neutral-400">
                  A little progress every day.
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-[#810419] dark:text-rose-400">
                <Flame className="size-3.5" />
                Keep it going
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-3">
              {[
                { label: "Problems solved", value: "128", icon: Check },
                { label: "Current streak", value: "07 days", icon: Flame },
                { label: "Topics explored", value: "12", icon: Layers3 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-neutral-200/70 bg-neutral-50/70 p-3.5 dark:border-white/[0.07] dark:bg-white/2.5"
                >
                  <item.icon className="size-4 text-[#810419] dark:text-rose-400" />
                  <p className="mt-3 text-xl font-semibold tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr]">
              {/* Today's recommendation */}
              <div className="rounded-xl border border-neutral-200/70 p-4 dark:border-white/8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Recommended next</p>
                  <Zap className="size-4 text-rose-600 dark:text-rose-400" />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10 text-[#810419] dark:text-rose-400">
                    <BrainCircuit className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Binary Search</p>
                    <p className="mt-1 text-[11px] text-neutral-400">
                      5 questions · Intermediate
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                  <div className="h-full w-[65%] rounded-full bg-[#810419]" />
                </div>
                <p className="mt-2 text-[10px] text-neutral-400">
                  Your learning progress
                </p>
              </div>

              {/* Weekly activity */}
              <div className="rounded-xl border border-neutral-200/70 p-4 dark:border-white/8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Weekly activity</p>
                  <Trophy className="size-4 text-rose-500" />
                </div>

                <div className="mt-5 flex h-16 items-end justify-between gap-2">
                  {[45, 75, 55, 95, 65, 85, 35].map((height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div
                        style={{ height: `${height}%` }}
                        className={`w-full rounded-t-md ${
                          index === 3
                            ? "bg-[#810419]"
                            : "bg-rose-500/20 dark:bg-rose-400/20"
                        }`}
                      />
                      <span className="text-[9px] text-neutral-400">
                        {["M", "T", "W", "T", "F", "S", "S"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] text-neutral-400">
            A preview of your learning journey
          </p>
        </div>
      </section>

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
      <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#810419] dark:text-rose-400">
            Everything in one place
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            A smarter way to approach DSA.
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-500 dark:text-neutral-400">
            Less time figuring out what to do next. More time understanding,
            practicing, and improving.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-neutral-200/80 bg-white/60 p-6 transition-all duration-300 hover:border-rose-900/20 hover:shadow-[0_10px_35px_rgba(129,4,25,0.07)] dark:border-white/10 dark:bg-neutral-900/40 dark:hover:border-rose-400/20 dark:hover:shadow-[0_10px_35px_rgba(244,63,94,0.07)]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-rose-900/6 text-[#810419] transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(129,4,25,0.2)] dark:bg-rose-400/10 dark:text-rose-400">
                <feature.icon className="size-5" />
              </div>

              <h3 className="mt-6 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-7 text-neutral-500 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-auto max-w-5xl px-5 pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-rose-900/10 bg-rose-900/[0.035] px-6 py-16 text-center dark:border-rose-400/10 dark:bg-rose-400/[0.035] sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-rose-600/10 blur-[80px]"
          />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#810419] dark:text-rose-400">
              Your journey starts here
            </p>

            <h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Consistency beats intensity. Start building yours.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-neutral-500 dark:text-neutral-400">
              Take the first step towards becoming a better problem solver.
              One question at a time.
            </p>

            <Link
              href="/dashboard"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#810419] px-6 py-3 text-sm font-medium text-white shadow-[0_5px_25px_rgba(129,4,25,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(129,4,25,0.35)]"
            >
              Get started
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}