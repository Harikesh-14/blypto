"use client";

import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export default function ModeToggle() {
  return (
    <AnimatedThemeToggler
      className="flex items-center justify-center relative size-10 rounded-xl border border-neutral-200/70 bg-white/70 text-neutral-700 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-950 hover:shadow-md dark:border-white/10 dark:bg-white/4 dark:text-neutral-300 dark:hover:bg-white/9 dark:hover:text-white"
    />
  );
}
