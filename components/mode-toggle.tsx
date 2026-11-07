
"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleMode}
      aria-label="Toggle theme"
      className="relative size-10 rounded-xl border border-neutral-200/70 bg-white/70 text-neutral-700 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-950 hover:shadow-md dark:border-white/10 dark:bg-white/4 dark:text-neutral-300 dark:hover:bg-white/9 dark:hover:text-white"
    >
      {theme === "light" ? (
        <Sun className="size-4.5 transition-transform duration-500 hover:rotate-45" />
      ) : (
        <Moon className="size-4.5 transition-transform duration-500 hover:-rotate-12" />
      )}
    </Button>
  );
}
