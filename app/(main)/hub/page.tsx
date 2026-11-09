"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Clock3,
  Search,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

type Level = "Beginner" | "Intermediate" | "Advanced";

const concepts: {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  level: Level;
  readTime: number;
  tags: string[];
}[] = [
  { slug: "two-pointers", title: "Two Pointers", summary: "Scan a sequence from both ends, or at different speeds, to replace nested loops with a single pass.", topic: "Arrays", level: "Beginner", readTime: 6, tags: ["Array", "Two Pointers"] },
  { slug: "prefix-sums", title: "Prefix Sums", summary: "Precompute running totals so any range query is answered in constant time.", topic: "Arrays", level: "Beginner", readTime: 5, tags: ["Array", "Prefix Sum"] },
  { slug: "sliding-window", title: "Sliding Window", summary: "Maintain a moving range over an array or string and update it incrementally instead of recomputing.", topic: "Arrays", level: "Intermediate", readTime: 8, tags: ["Array", "String", "Sliding Window"] },
  { slug: "frequency-counting", title: "Frequency Counting", summary: "Count characters or elements once, then compare, group and match in linear time.", topic: "Strings", level: "Beginner", readTime: 5, tags: ["String", "Hash Table"] },
  { slug: "hash-maps-and-sets", title: "Hash Maps & Sets", summary: "How hashing works, why lookups are O(1) on average, and the patterns that rely on them.", topic: "Hashing", level: "Beginner", readTime: 7, tags: ["Hash Table", "Set"] },
  { slug: "binary-search-on-answer", title: "Binary Search on the Answer", summary: "Go beyond sorted arrays: search a range of possible answers using a monotonic condition.", topic: "Binary Search", level: "Intermediate", readTime: 9, tags: ["Binary Search", "Monotonic"] },
  { slug: "fast-and-slow-pointers", title: "Fast & Slow Pointers", summary: "Detect cycles, find midpoints and locate nodes with two pointers moving at different speeds.", topic: "Linked List", level: "Intermediate", readTime: 6, tags: ["Linked List", "Two Pointers"] },
  { slug: "tree-traversals", title: "Tree Traversals", summary: "Preorder, inorder, postorder and level order: what each visits first and when to use it.", topic: "Trees", level: "Beginner", readTime: 8, tags: ["Tree", "DFS", "BFS"] },
  { slug: "bfs-vs-dfs", title: "BFS vs DFS", summary: "Two ways to explore a graph, how they differ in memory and ordering, and how to choose.", topic: "Graphs", level: "Intermediate", readTime: 10, tags: ["Graph", "BFS", "DFS"] },
  { slug: "union-find", title: "Union-Find", summary: "Track connected components efficiently with path compression and union by rank.", topic: "Graphs", level: "Advanced", readTime: 11, tags: ["Graph", "Disjoint Set"] },
  { slug: "monotonic-stack", title: "Monotonic Stack", summary: "Keep a stack in sorted order to solve next-greater and range problems in linear time.", topic: "Stacks & Queues", level: "Advanced", readTime: 9, tags: ["Stack", "Monotonic"] },
  { slug: "memoization", title: "Memoization", summary: "Turn exponential recursion into polynomial time by remembering what you have already solved.", topic: "Dynamic Programming", level: "Intermediate", readTime: 8, tags: ["DP", "Recursion"] },
  { slug: "knapsack-patterns", title: "Knapsack Patterns", summary: "The family of choose-or-skip problems behind subset sum, coin change and partitioning.", topic: "Dynamic Programming", level: "Advanced", readTime: 14, tags: ["DP", "Knapsack"] },
  { slug: "backtracking-template", title: "Backtracking Template", summary: "A reusable choose, explore, undo skeleton for permutations, subsets and constraint problems.", topic: "Backtracking", level: "Intermediate", readTime: 9, tags: ["Backtracking", "Recursion"] },
];

const topics = [
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

const paths = [
  {
    title: "Foundations",
    blurb: "Core patterns every problem builds on.",
    steps: ["two-pointers", "prefix-sums", "hash-maps-and-sets", "tree-traversals"],
  },
  {
    title: "Interview core",
    blurb: "The patterns that show up most in interviews.",
    steps: ["sliding-window", "binary-search-on-answer", "bfs-vs-dfs", "memoization"],
  },
  {
    title: "Advanced toolkit",
    blurb: "Sharper tools for the hardest problems.",
    steps: ["monotonic-stack", "union-find", "knapsack-patterns", "backtracking-template"],
  },
];

const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const;

const levelMeta: Record<Level, { text: string; dot: string }> = {
  Beginner: { text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
  Intermediate: { text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  Advanced: { text: "text-rose-600 dark:text-rose-400", dot: "bg-rose-500" },
};

const titleBySlug = Object.fromEntries(concepts.map((c) => [c.slug, c.title]));

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function HubPage() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [level, setLevel] = useState<string>("All");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return concepts.filter((c) => {
      const matchesSearch =
        !query ||
        c.title.toLowerCase().includes(query) ||
        c.summary.toLowerCase().includes(query) ||
        c.topic.toLowerCase().includes(query) ||
        c.tags.some((t) => t.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (topic === "All" || c.topic === topic) &&
        (level === "All" || c.level === level)
      );
    });
  }, [search, topic, level]);

  const topicCounts = useMemo(
    () =>
      Object.fromEntries(
        topics.map((t) => [t, concepts.filter((c) => c.topic === t).length])
      ),
    []
  );

  const hasActiveFilters = search !== "" || topic !== "All" || level !== "All";

  const reset = () => {
    setSearch("");
    setTopic("All");
    setLevel("All");
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl space-y-14 py-28">
      {/* ------------------------------ PAGE HEADER ----------------------------- */}
      <header className="space-y-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <BookOpen className="size-3.5" />
          <span>Learning Hub</span>
          <ChevronRight className="size-3" />
          <span className="font-medium text-foreground">Concepts</span>
        </nav>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Concept Hub
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Clear, focused explanations of the ideas behind data structures and
            algorithms. Pick a topic, or follow a path from the basics upward.
          </p>
        </div>

        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search concepts, topics or tags…"
            aria-label="Search concepts"
            className="h-12 pl-11 pr-11 text-base"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </header>

      {/* ----------------------------- LEARNING PATHS ---------------------------- */}
      <section className="space-y-6" aria-labelledby="paths-heading">
        <div className="space-y-1">
          <h2 id="paths-heading" className="text-xl font-semibold tracking-tight">
            Learning paths
          </h2>
          <p className="text-sm text-muted-foreground">
            Short, ordered reading lists so you always know what to read next.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {paths.map((path, index) => (
            <Card
              key={path.title}
              className="gap-0 overflow-hidden border-border/70 p-0 shadow-none"
            >
              <div className="space-y-1.5 border-b border-border/70 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Path {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-lg font-semibold tracking-tight">
                  {path.title}
                </h3>
                <p className="text-sm text-muted-foreground">{path.blurb}</p>
              </div>

              <ol className="divide-y divide-border/70">
                {path.steps.map((slug, i) => (
                  <li key={slug}>
                    <Link
                      href={`/hub/${slug}`}
                      className="group flex items-center gap-3 px-5 py-3 text-sm outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/40"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-medium tabular-nums text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="flex-1 truncate font-medium">
                        {titleBySlug[slug]}
                      </span>
                      <ArrowUpRight className="size-3.5 text-muted-foreground/0 transition-all group-hover:text-foreground" />
                    </Link>
                  </li>
                ))}
              </ol>
            </Card>
          ))}
        </div>
      </section>

      {/* ------------------------------ ALL CONCEPTS ----------------------------- */}
      <section className="space-y-6" aria-labelledby="concepts-heading">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-1">
            <h2
              id="concepts-heading"
              className="text-xl font-semibold tracking-tight"
            >
              All concepts
            </h2>
            <p className="text-sm text-muted-foreground">
              <span className="tabular-nums">
                {filtered.length} of {concepts.length}
              </span>{" "}
              concepts
              {hasActiveFilters && (
                <>
                  {" · "}
                  <button
                    type="button"
                    onClick={reset}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Reset filters
                  </button>
                </>
              )}
            </p>
          </div>

          <Tabs value={level} onValueChange={setLevel} className="w-full sm:w-auto">
            <TabsList className="grid h-10 w-full grid-cols-4 sm:w-96">
              {levels.map((item) => (
                <TabsTrigger key={item} value={item} className="text-xs sm:text-sm">
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
          {/* TOPIC RAIL (desktop) */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Topics"
              className="sticky top-6 space-y-1"
            >
              <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Topics
              </p>

              {["All", ...topics].map((item) => {
                const active = topic === item;
                const count =
                  item === "All" ? concepts.length : topicCounts[item];

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTopic(item)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-4 w-0.5 rounded-full transition-colors",
                          active ? "bg-rose-600" : "bg-transparent"
                        )}
                      />
                      {item === "All" ? "All topics" : item}
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0 space-y-4">
            {/* TOPIC CHIPS (mobile / tablet) */}
            <div
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:hidden [&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label="Filter by topic"
            >
              {["All", ...topics].map((item) => {
                const active = topic === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTopic(item)}
                    aria-pressed={active}
                    className={cn(
                      "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/70 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    )}
                  >
                    {item === "All" ? "All topics" : item}
                  </button>
                );
              })}
            </div>

            {/* LIST */}
            <div className="overflow-hidden rounded-xl border border-border/70">
              {filtered.length > 0 ? (
                <ul className="divide-y divide-border/70">
                  {filtered.map((concept) => (
                    <li key={concept.slug}>
                      <Link
                        href={`/hub/${concept.slug}`}
                        className="group flex flex-col gap-3 px-5 py-5 outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 sm:flex-row sm:items-start sm:gap-6"
                      >
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">{concept.topic}</span>
                          </div>

                          <h3 className="flex items-center gap-1.5 text-base font-semibold tracking-tight">
                            <span className="group-hover:underline group-hover:underline-offset-4">
                              {concept.title}
                            </span>
                            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          </h3>

                          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {concept.summary}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {concept.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-4 text-xs sm:w-32 sm:flex-col sm:items-end sm:gap-2">
                          <span
                            className={cn(
                              "inline-flex items-center gap-2 font-medium",
                              levelMeta[concept.level].text
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                levelMeta[concept.level].dot
                              )}
                            />
                            {concept.level}
                          </span>
                          <span className="inline-flex items-center gap-1.5 tabular-nums text-muted-foreground">
                            <Clock3 className="size-3.5" />
                            {concept.readTime} min read
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 px-4 py-20 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Search className="size-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">No concepts found</h3>
                    <p className="text-sm text-muted-foreground">
                      Try a different search, topic or level.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={reset}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}