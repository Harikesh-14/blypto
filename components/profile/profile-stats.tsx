"use client";

import {
  CountUp,
  DashboardCard,
  IconChip,
  Reveal,
  SectionHeading,
} from "@/components/primitivies";
import { profileStats } from "@/lib/profile-data";

export default function ProfileStats() {
  return (
    <section className="mb-12">
      <SectionHeading
        title="Learning overview"
        description="A snapshot of your progress on Blypto."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {profileStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.label} delay={index * 90} threshold={0.3}>
              {(inView) => (
                <DashboardCard className="h-full p-4 sm:p-5">
                  <IconChip amber={stat.amber}>
                    <Icon className="size-4.5" />
                  </IconChip>

                  <p className="mt-5 text-3xl font-semibold tracking-tight tabular-nums">
                    <CountUp
                      to={stat.value}
                      active={inView}
                      // format={stat.format}
                    />
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