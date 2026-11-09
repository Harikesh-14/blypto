"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Circle,
  Search,
  Target,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const sheets = [
  {
    id: "love-babbar",
    name: "Love Babbar",
    title: "450 DSA Cracker Sheet",
    description: "A comprehensive collection of questions for placement preparation.",
    questions: 450,
    completed: 0,
    level: "Beginner to Advanced",
    initials: "LB",
    color: "bg-rose-600",
    href: "/sheets/love-babbar",
  },
  {
    id: "striver",
    name: "Striver",
    title: "A2Z DSA Course Sheet",
    description: "A structured roadmap to master data structures and algorithms.",
    questions: 455,
    completed: 0,
    level: "Beginner to Advanced",
    initials: "S",
    color: "bg-zinc-800 dark:bg-zinc-700",
    href: "/sheets/striver",
  },
  {
    id: "neetcode",
    name: "NeetCode",
    title: "NeetCode 150",
    description: "150 essential LeetCode problems for interview preparation.",
    questions: 150,
    completed: 0,
    level: "Intermediate",
    initials: "N",
    color: "bg-emerald-700",
    href: "/sheets/neetcode",
  },
];

const categories = [
  "All Topics",
  "Arrays",
  "Strings",
  "Hashing",
  "Binary Search",
  "Linked List",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Stacks & Queues",
  "Backtracking",
];

const problems = [
  { id: 1, name: "Two Sum", difficulty: "Easy", topic: "Arrays", tags: ["Array", "Hash Table"], slug: "two-sum", status: "todo" },
  { id: 2, name: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", tags: ["Array", "Dynamic Programming"], slug: "best-time-to-buy-and-sell-stock", status: "todo" },
  { id: 3, name: "Contains Duplicate", difficulty: "Easy", topic: "Hashing", tags: ["Array", "Hash Table"], slug: "contains-duplicate", status: "completed" },
  { id: 4, name: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays", tags: ["Array", "Prefix Sum"], slug: "product-of-array-except-self", status: "todo" },
  { id: 5, name: "Maximum Subarray", difficulty: "Medium", topic: "Arrays", tags: ["Array", "Dynamic Programming"], slug: "maximum-subarray", status: "todo" },
  { id: 6, name: "3Sum", difficulty: "Medium", topic: "Arrays", tags: ["Array", "Two Pointers"], slug: "3sum", status: "todo" },
  { id: 7, name: "Valid Anagram", difficulty: "Easy", topic: "Strings", tags: ["String", "Hash Table"], slug: "valid-anagram", status: "completed" },
  { id: 8, name: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings", tags: ["String", "Sliding Window"], slug: "longest-substring-without-repeating-characters", status: "todo" },
  { id: 9, name: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search", tags: ["Array", "Binary Search"], slug: "search-in-rotated-sorted-array", status: "todo" },
  { id: 10, name: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", tags: ["Linked List", "Recursion"], slug: "reverse-linked-list", status: "todo" },
  { id: 11, name: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List", tags: ["Linked List", "Recursion"], slug: "merge-two-sorted-lists", status: "todo" },
  { id: 12, name: "Maximum Depth of Binary Tree", difficulty: "Easy", topic: "Trees", tags: ["Tree", "DFS"], slug: "maximum-depth-of-binary-tree", status: "completed" },
  { id: 13, name: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", tags: ["Tree", "BFS"], slug: "binary-tree-level-order-traversal", status: "todo" },
  { id: 14, name: "Number of Islands", difficulty: "Medium", topic: "Graphs", tags: ["Graph", "DFS", "BFS"], slug: "number-of-islands", status: "todo" },
  { id: 15, name: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming", tags: ["DP", "Memoization"], slug: "climbing-stairs", status: "todo" },
  { id: 16, name: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming", tags: ["DP", "Array"], slug: "coin-change", status: "todo" },
];

const difficulties = ["All", "Easy", "Medium", "Hard"] as const;

const difficultyMeta: Record<
  string,
  { text: string; dot: string; bar: string }
> = {
  Easy: {
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  Medium: {
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  Hard: {
    text: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
    bar: "bg-rose-500",
  },
};

const gridCols = "md:grid-cols-[2.5rem_minmax(0,1fr)_6.5rem_9rem_5.5rem]";

const statusTabClass =
  "rounded-none border-b-2 border-transparent bg-transparent px-3 pb-2.5 pt-2 text-sm text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:border-rose-600 data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-foreground data-[state=active]:shadow-none";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function SheetsPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [category, setCategory] = useState("All Topics");
  const [status, setStatus] = useState("all");

  const filteredProblems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return problems.filter((problem) => {
      const matchesSearch =
        !query ||
        problem.name.toLowerCase().includes(query) ||
        problem.topic.toLowerCase().includes(query) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesDifficulty =
        difficulty === "All" || problem.difficulty === difficulty;
      const matchesCategory =
        category === "All Topics" || problem.topic === category;
      const matchesStatus = status === "all" || problem.status === status;

      return (
        matchesSearch && matchesDifficulty && matchesCategory && matchesStatus
      );
    });
  }, [search, difficulty, category, status]);

  const total = problems.length;
  const completedCount = problems.filter((p) => p.status === "completed").length;
  const remainingCount = total - completedCount;
  const completionRate = Math.round((completedCount / total) * 100);

  const breakdown = ["Easy", "Medium", "Hard"].map((level) => {
    const items = problems.filter((p) => p.difficulty === level);
    return {
      level,
      total: items.length,
      solved: items.filter((p) => p.status === "completed").length,
    };
  });

  const hasActiveFilters =
    search !== "" ||
    difficulty !== "All" ||
    category !== "All Topics" ||
    status !== "all";

  const resetFilters = () => {
    setSearch("");
    setDifficulty("All");
    setCategory("All Topics");
    setStatus("all");
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl space-y-14 py-28 px-6">
      {/* ------------------------------ PAGE HEADER ----------------------------- */}
      <header className="space-y-5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <BookOpen className="size-3.5" />
          <span>Learning Hub</span>
          <ChevronRight className="size-3" />
          <span className="font-medium text-foreground">DSA Sheets</span>
        </nav>

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              DSA Sheets
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Follow curated roadmaps and practice the problems that matter for
              coding interviews, one step at a time.
            </p>
          </div>

          <Button variant="outline" className="w-fit gap-2">
            <Target className="size-4" />
            My Progress
          </Button>
        </div>
      </header>

      {/* ----------------------------- CURATED SHEETS ---------------------------- */}
      <section className="space-y-6" aria-labelledby="curated-heading">
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1">
            <h2
              id="curated-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Curated sheets
            </h2>
            <p className="text-sm text-muted-foreground">
              Structured roadmaps from popular educators.
            </p>
          </div>

          <Link
            href="/sheets/collections"
            className="group/link inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Explore all
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sheets.map((sheet) => {
            const pct = Math.round((sheet.completed / sheet.questions) * 100);

            return (
              <Link
                key={sheet.id}
                href={sheet.href}
                className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Card className="relative h-full gap-0 overflow-hidden border-border/70 p-0 shadow-none transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:shadow-lg group-hover:shadow-black/5">
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "flex size-12 items-center justify-center rounded-xl text-base font-semibold tracking-tight text-white shadow-sm",
                          sheet.color
                        )}
                      >
                        {sheet.initials}
                      </div>
                      <ArrowUpRight className="size-5 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {sheet.name}
                      </p>
                      <h3 className="text-lg font-semibold leading-snug tracking-tight">
                        {sheet.title}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {sheet.description}
                      </p>
                    </div>

                    <div className="mt-auto space-y-2">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="tabular-nums text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {sheet.completed}
                          </span>{" "}
                          / {sheet.questions} · {pct}%
                        </span>
                      </div>
                      <Progress
                        value={(sheet.completed / sheet.questions) * 100}
                        className="h-1.5"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t bg-muted/30 px-6 py-3 text-xs text-muted-foreground">
                    <span>{sheet.level}</span>
                    <span className="font-medium tabular-nums text-foreground">
                      {sheet.questions} questions
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ----------------------------- PROBLEM LIBRARY --------------------------- */}
      <section
        className="space-y-6"
        id="problem-library"
        aria-labelledby="library-heading"
      >
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div className="space-y-1">
            <h2
              id="library-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Problem library
            </h2>
            <p className="text-sm text-muted-foreground">
              Your central library of essential LeetCode problems.
            </p>
          </div>
        </div>

        {/* OVERVIEW */}
        <Card className="gap-0 overflow-hidden border-border/70 p-0 shadow-none">
          <dl className="grid grid-cols-2 divide-x divide-y divide-border/70 lg:grid-cols-4 lg:divide-y-0">
            {[
              { label: "Total problems", value: total },
              { label: "Solved", value: completedCount, accent: "text-emerald-600 dark:text-emerald-400" },
              { label: "Remaining", value: remainingCount },
              { label: "Completion", value: `${completionRate}%`, accent: "text-rose-600 dark:text-rose-400" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1 px-5 py-4 lg:px-6 lg:py-5">
                <dt className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </dt>
                <dd
                  className={cn(
                    "text-2xl font-semibold tabular-nums tracking-tight",
                    stat.accent
                  )}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="space-y-3 border-t border-border/70 bg-muted/30 px-5 py-4 lg:px-6">
            <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full">
              {breakdown
                .filter((b) => b.total > 0)
                .map((b) => (
                  <div
                    key={b.level}
                    className="relative h-full overflow-hidden rounded-full bg-muted-foreground/15"
                    style={{ flexGrow: b.total, flexBasis: 0 }}
                  >
                    <div
                      className={cn("absolute inset-y-0 left-0", difficultyMeta[b.level].bar)}
                      style={{ width: `${(b.solved / b.total) * 100}%` }}
                    />
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              {breakdown.map((b) => (
                <span key={b.level} className="inline-flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", difficultyMeta[b.level].dot)} />
                  {b.level}
                  <span className="tabular-nums text-foreground">
                    {b.solved}/{b.total}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* SEARCH + FILTERS */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search problems, topics or tags…"
                aria-label="Search problems"
                className="h-11 pl-10 pr-10"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <Tabs
              value={difficulty}
              onValueChange={setDifficulty}
              className="w-full lg:w-auto"
            >
              <TabsList className="grid h-11 w-full grid-cols-4 lg:w-72">
                {difficulties.map((item) => (
                  <TabsTrigger key={item} value={item} className="text-sm">
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* TOPICS */}
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter by topic"
          >
            {categories.map((item) => {
              const active = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={active}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/70 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b">
            <Tabs value={status} onValueChange={setStatus}>
              <TabsList className="h-auto gap-1 bg-transparent p-0">
                <TabsTrigger value="all" className={statusTabClass}>
                  All
                </TabsTrigger>
                <TabsTrigger value="todo" className={statusTabClass}>
                  To do
                </TabsTrigger>
                <TabsTrigger value="completed" className={statusTabClass}>
                  Solved
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-3 pb-2 text-xs text-muted-foreground">
              <span className="tabular-nums">
                {filteredProblems.length} of {total} problems
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/70">
            <div
              className={cn(
                "hidden gap-4 border-b border-border/70 bg-muted/40 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:grid",
                gridCols
              )}
            >
              <span>#</span>
              <span>Problem</span>
              <span>Difficulty</span>
              <span>Topic</span>
              <span className="text-right">Status</span>
            </div>

            {filteredProblems.length > 0 ? (
              <ul className="divide-y divide-border/70">
                {filteredProblems.map((problem) => {
                  const solved = problem.status === "completed";

                  return (
                    <li
                      key={problem.id}
                      className={cn(
                        "group relative grid grid-cols-1 gap-2 px-4 py-4 transition-colors hover:bg-muted/40 md:items-center md:gap-4 md:px-5",
                        gridCols
                      )}
                    >
                      <span className="hidden text-xs tabular-nums text-muted-foreground md:block">
                        {String(problem.id).padStart(2, "0")}
                      </span>

                      <div className="flex min-w-0 items-start gap-3 md:block">
                        <span className="mt-0.5 md:hidden">
                          {solved ? (
                            <Check className="size-4 text-emerald-600" />
                          ) : (
                            <Circle className="size-4 text-muted-foreground/40" />
                          )}
                        </span>

                        <div className="min-w-0 space-y-1.5">
                          <a
                            href={`https://leetcode.com/problems/${problem.slug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-fit max-w-full items-center gap-1.5 text-sm font-medium outline-none after:absolute after:inset-0 focus-visible:underline"
                          >
                            <span className="truncate group-hover:underline group-hover:underline-offset-4">
                              {problem.name}
                            </span>
                            <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          </a>

                          <div className="flex flex-wrap gap-1.5">
                            {problem.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "flex items-center gap-2 pl-7 text-xs font-medium md:pl-0",
                          difficultyMeta[problem.difficulty].text
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            difficultyMeta[problem.difficulty].dot
                          )}
                        />
                        {problem.difficulty}
                        <span className="font-normal text-muted-foreground md:hidden">
                          · {problem.topic}
                        </span>
                      </div>

                      <span className="hidden text-xs text-muted-foreground md:block">
                        {problem.topic}
                      </span>

                      <div className="hidden justify-end md:flex">
                        {solved ? (
                          <Badge
                            variant="outline"
                            className="gap-1 border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          >
                            <Check className="size-3" />
                            Solved
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="font-normal text-muted-foreground"
                          >
                            To do
                          </Badge>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 px-4 py-20 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Search className="size-5 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">No problems found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try changing your search or filters.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}