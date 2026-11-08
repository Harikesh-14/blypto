import {
  BookOpen,
  CalendarDays,
  Clock3,
  Flame,
  GitBranch,
  GraduationCap,
  Target,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const profile = {
  name: "Your Name",
  role: "DSA Enthusiast",
  email: "you@example.com",
  since: "2026",
};

export const profileStats: {
  label: string;
  value: number;
  unit?: string;
  format?: boolean;
  description: string;
  icon: LucideIcon;
  amber?: boolean;
}[] = [
  {
    label: "Questions solved",
    value: 128,
    icon: BookOpen,
    description: "Across all topics",
  },
  {
    label: "Current streak",
    value: 12,
    unit: "days",
    icon: Flame,
    amber: true,
    description: "Keep it going!",
  },
  {
    label: "Topics mastered",
    value: 8,
    icon: GraduationCap,
    description: "Out of 24 topics",
  },
  {
    label: "Total XP earned",
    value: 2450,
    format: true,
    icon: Zap,
    description: "You're making progress",
  },
];

export const learningGoals: {
  label: string;
  icon: LucideIcon;
  current: number;
  target: number;
  unit: string;
}[] = [
  {
    label: "Daily questions",
    icon: Target,
    current: 4,
    target: 5,
    unit: "questions",
  },
  {
    label: "Daily study time",
    icon: Clock3,
    current: 39,
    target: 60,
    unit: "minutes",
  },
  {
    label: "Weekly target",
    icon: CalendarDays,
    current: 18,
    target: 25,
    unit: "questions",
  },
];

export const achievements: {
  title: string;
  description: string;
  icon: LucideIcon;
  amber?: boolean;
}[] = [
  {
    title: "First Steps",
    description: "Solved your first question",
    icon: GraduationCap,
  },
  {
    title: "Consistency",
    description: "Maintained a 7-day streak",
    icon: Flame,
    amber: true,
  },
  {
    title: "Problem Solver",
    description: "Solved 100 questions",
    icon: Trophy,
  },
];

export const accountLinks: {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}[] = [
  {
    title: "Personal information",
    description: "Your name, email and profile details",
    icon: UserRound,
    href: "/settings",
  },
  {
    title: "Learning preferences",
    description: "Daily goals and learning preferences",
    icon: Target,
    href: "/settings",
  },
  {
    title: "Connected accounts",
    description: "Manage your connected services",
    icon: GitBranch,
    href: "/settings",
  },
];