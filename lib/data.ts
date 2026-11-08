import { Code2, Flame, RotateCcw, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  unit?: string;
  description: string;
  icon: LucideIcon;
  amber?: boolean;
  visual: "spark" | "ring" | "dots" | "ticks";
}

export const stats: Stat[] = [
  {
    label: "Questions solved",
    value: 124,
    description: "Across all topics",
    icon: Code2,
    visual: "spark",
  },
  {
    label: "Overall progress",
    value: 68,
    suffix: "%",
    description: "Keep moving forward",
    icon: Target,
    visual: "ring",
  },
  {
    label: "Current streak",
    value: 7,
    unit: "days",
    description: "Your best is 12 days",
    icon: Flame,
    amber: true,
    visual: "dots",
  },
  {
    label: "Pending revision",
    value: 12,
    description: "Questions to revisit",
    icon: RotateCcw,
    visual: "ticks",
  },
];

export const topics = [
  { name: "Arrays & Hashing", solved: 22, total: 24 },
  { name: "Binary Search", solved: 12, total: 18 },
  { name: "Dynamic Programming", solved: 10, total: 32 },
  { name: "Graphs", solved: 4, total: 21 },
];

export const recentActivity: {
  title: string;
  topic: string;
  difficulty: Difficulty;
  date: string;
  status: "solved" | "revised";
}[] = [
  {
    title: "Two Sum",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    date: "Today",
    status: "solved",
  },
  {
    title: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    date: "Yesterday",
    status: "solved",
  },
  {
    title: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window",
    difficulty: "Medium",
    date: "Yesterday",
    status: "solved",
  },
  {
    title: "Contains Duplicate",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    date: "Nov 5",
    status: "revised",
  },
];

export const revisionTopics = [
  { name: "Arrays & Hashing", count: 5 },
  { name: "Binary Search", count: 4 },
  { name: "Sliding Window", count: 3 },
];

/**
 * 12 weeks × 7 days, stored column-major (week by week).
 * The final week is the current 7-day streak.
 */
const rawActivity = [
  0, 1, 2, 0, 3, 1, 0, 2, 4, 1, 0, 3, 2, 1, 0, 4, 2, 3, 1, 0, 2, 3, 1, 4, 0, 2,
  1, 3, 0, 4, 2, 1, 3, 0, 2, 4, 1, 2, 0, 3, 4, 1, 2, 0, 3, 1, 4, 2, 0, 3, 1, 2,
  4, 0, 2, 1, 3, 0, 4, 2, 1, 3, 0, 2, 4, 1, 3, 2, 0, 4, 1, 3, 2,
];

export const activityLevels: number[] = [
  ...rawActivity.slice(0, 77),
  3, 4, 3, 4, 3, 4, 4,
];