"use client"

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleMode = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant={"outline"}
      type="button"
      onClick={toggleMode}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  )
}