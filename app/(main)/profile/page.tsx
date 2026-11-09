import ProfileAccount from "@/components/profile/profile-account";
import ProfileAchievements from "@/components/profile/profile-achievement";
import ProfileGoals from "@/components/profile/profile-goal";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileStats from "@/components/profile/profile-stats";

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-50/70 text-neutral-950 dark:bg-neutral-950 dark:text-white">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-128 overflow-hidden"
      >
        <div className="absolute -top-64 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-rose-700/[0.07] blur-[120px] dark:bg-rose-600/12" />
      </div>

      {/* pt-28 clears the fixed floating header */}
      <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <ProfileHeader />
        <ProfileStats />

        <div className="mb-12 grid gap-4 lg:grid-cols-5">
          <ProfileGoals className="lg:col-span-3" />
          <ProfileAchievements className="lg:col-span-2" />
        </div>

        <ProfileAccount />
      </div>
    </main>
  );
}