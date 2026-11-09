"use client";

import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { DashboardCard, Reveal } from "@/components/primitivies";
import { profile } from "@/lib/profile-data";

const initials = profile.name
  .split(" ")
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

const grid = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
  backgroundSize: "36px 36px",
  maskImage: "radial-gradient(ellipse at 50% 40%, black 10%, transparent 75%)",
  WebkitMaskImage:
    "radial-gradient(ellipse at 50% 40%, black 10%, transparent 75%)",
};

export default function ProfileHeader() {
  return (
    <>
      {/* Page heading */}
      <Reveal className="mb-8">
        <Link
          href="/dashboard"
          className="group mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 py-1.5 pr-3.5 pl-2.5 text-xs font-medium text-neutral-600 backdrop-blur transition-colors hover:border-rose-900/30 hover:text-[#810419] dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-rose-400/30 dark:hover:text-rose-400"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to dashboard
        </Link>

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-900/10 bg-rose-900/5 px-3 py-1.5 text-xs font-medium text-[#810419] dark:border-rose-400/15 dark:bg-rose-400/5 dark:text-rose-400">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/50 motion-reduce:hidden" />
                <span className="relative size-1.5 rounded-full bg-rose-600" />
              </span>
              Your space
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              My Profile
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500 sm:text-base dark:text-neutral-400">
              Manage your account and keep track of your learning journey.
            </p>
          </div>

          <Link
            href="/settings"
            className="group inline-flex h-11 w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-5 text-xs font-semibold text-neutral-700 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-900/30 hover:text-[#810419] dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-200 dark:hover:border-rose-400/30 dark:hover:text-rose-400"
          >
            <Settings2 className="size-4 transition-transform duration-500 group-hover:rotate-90" />
            Account settings
          </Link>
        </div>
      </Reveal>

      {/* Identity card */}
      <Reveal delay={100} className="mb-12">
        <DashboardCard className="p-0">
          {/* Banner */}
          <div className="relative -z-10 h-32 overflow-hidden bg-[#810419] sm:h-36">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(251,113,133,0.55),transparent_60%),radial-gradient(ellipse_at_50%_130%,rgba(0,0,0,0.45),transparent_60%)]"
            />
            <div aria-hidden className="absolute inset-0" style={grid} />
            <div
              aria-hidden
              className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"
            />

            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur">
              <ShieldCheck className="size-3.5" />
              Active learner
            </span>
          </div>

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex items-end gap-4 sm:-mt-14 sm:gap-5">
              {/* Avatar with brand-gradient ring */}
              <div className="shrink-0 rounded-[26px] bg-linear-to-br from-[#810419] via-rose-600 to-rose-400 p-0.5 shadow-[0_12px_30px_rgba(129,4,25,0.3)]">
                <div className="flex size-24 items-center justify-center rounded-[24px] border-4 border-white bg-neutral-50 text-3xl font-semibold text-[#810419] sm:size-28 dark:border-neutral-900 dark:bg-neutral-900 dark:text-rose-400">
                  {initials}
                </div>
              </div>

              <div className="min-w-0 pb-1.5">
                <h2 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                  {profile.name}
                </h2>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {profile.role}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-neutral-200/70 pt-5 dark:border-white/10">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50/70 px-3.5 py-1.5 text-xs text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                <Mail className="size-3.5 text-neutral-400" />
                {profile.email}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50/70 px-3.5 py-1.5 text-xs text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                <CalendarDays className="size-3.5 text-neutral-400" />
                Learning since {profile.since}
              </span>
            </div>
          </div>
        </DashboardCard>
      </Reveal>
    </>
  );
}