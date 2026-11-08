import { Zap } from "lucide-react";
import ActivityRevision from "@/components/activity-revision";
import DashboardHero from "@/components/dashboard-hero";
import LearningJourney from "@/components/learning-journey";
import RecentActivity from "@/components/recent-activity";
import TopicMastery from "@/components/topic-mastery";
import StatsOverview from "@/components/stats-overview";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-50/70 text-neutral-950 dark:bg-neutral-950 dark:text-white">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-128 overflow-hidden"
      >
        <div className="absolute -top-64 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-rose-700/[0.07] blur-[120px] dark:bg-rose-600/12" />
      </div>

      {/* pt-28 clears the fixed floating header */}
      <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <DashboardHero />
        <StatsOverview />
        <LearningJourney />
        <ActivityRevision />
        <TopicMastery />
        <RecentActivity />

        <div className="mt-14 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <Zap className="size-3.5" />
          Consistency beats intensity. Keep showing up.
        </div>
      </div>
    </main>
  );
}