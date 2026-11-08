"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  DashboardCard,
  IconChip,
  Reveal,
  SectionHeading,
} from "@/components/primitivies";
import { accountLinks } from "@/lib/profile-data";

export default function ProfileAccount() {
  return (
    <section className="mb-6">
      <SectionHeading
        title="Account information"
        description="Your personal details and account preferences."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {accountLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={i * 90}>
              {/* The whole card is the tap target */}
              <Link
                href={item.href}
                aria-label={item.title}
                className="group block h-full rounded-2xl focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-950"
              >
                <DashboardCard className="h-full">
                  <div className="flex items-start justify-between">
                    <IconChip className="size-10">
                      <Icon className="size-5" />
                    </IconChip>
                    <span className="flex size-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-all duration-300 group-hover:border-[#810419] group-hover:bg-[#810419] group-hover:text-white dark:border-white/10 dark:group-hover:border-rose-500 dark:group-hover:bg-rose-500">
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <h3 className="mt-6 text-sm font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                    {item.description}
                  </p>
                </DashboardCard>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}