"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

const columns = [
  {
    title: "Product",
    links: [
      { title: "Dashboard", href: "/dashboard" },
      { title: "Sheets", href: "/sheets" },
      { title: "Hub", href: "/hub" },
    ],
  },
  {
    title: "Account",
    links: [{ title: "Profile", href: "/profile" }],
  },
] as const;

function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

const rise = (inView: boolean, delay: number) => ({
  className: cn(
    "transition-all duration-700 ease-out motion-reduce:transition-none",
    inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
  ),
  style: { transitionDelay: `${delay}ms` },
});

const wordmark =
  "block select-none text-center font-semibold leading-[0.8] tracking-[-0.07em] text-[clamp(5.5rem,24vw,18rem)]";

export default function Footer() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer
      ref={ref}
      className="relative isolate overflow-hidden border-t border-neutral-200/70 bg-white dark:border-white/10 dark:bg-neutral-950"
    >
      {/* Ambient glow rising from the bottom */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-112 bg-[radial-gradient(ellipse_at_50%_100%,rgba(190,18,60,0.16),transparent_65%)] transition-opacity duration-1000 dark:bg-[radial-gradient(ellipse_at_50%_100%,rgba(225,29,72,0.22),transparent_65%)]",
          inView ? "opacity-100" : "opacity-0",
        )}
      />
      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rose-500/40 to-transparent"
      />

      {/* Top: brand + links */}
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-14 sm:pt-20 md:grid-cols-[1.4fr_1fr]">
        <div {...rise(inView, 0)} className={rise(inView, 0).className}>
          <Link
            href="/"
            aria-label="Blypto home"
            className="group inline-flex items-center gap-2.5"
          >
            <Image
              alt="Blypto Logo"
              src="/blypto_logo.png"
              width={30}
              height={30}
              className="rounded-lg transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105"
            />
            <span className="text-lg font-semibold tracking-tight">Blypto</span>
          </Link>

          <p className="mt-6 max-w-sm text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
            Don&apos;t just solve problems.
            <span className="block bg-linear-to-r from-[#810419] via-rose-600 to-rose-400 bg-clip-text text-transparent">
              Build problem solvers.
            </span>
          </p>

          <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-500 dark:text-neutral-400">
            A more intentional way to master Data Structures and Algorithms.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-8 sm:max-w-sm md:justify-self-end"
        >
          {columns.map((col, c) => (
            <div
              key={col.title}
              {...rise(inView, 120 + c * 100)}
              className={rise(inView, 120 + c * 100).className}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-neutral-400 uppercase">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group/link inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-[#810419] dark:text-neutral-300 dark:hover:text-rose-400"
                    >
                      <span className="relative">
                        {link.title}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/link:scale-x-100" />
                      </span>
                      <ArrowUpRight className="size-3.5 -translate-x-1 translate-y-0.5 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-6xl px-5">
        <div
          {...rise(inView, 300)}
          className={cn(
            rise(inView, 300).className,
            "flex items-center justify-between border-t border-neutral-200/70 py-5 dark:border-white/10",
          )}
        >
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Blypto. All rights reserved.
          </p>

          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 py-1.5 pr-1.5 pl-3.5 text-xs font-medium text-neutral-600 transition-colors hover:border-rose-900/30 hover:text-[#810419] dark:border-white/10 dark:text-neutral-300 dark:hover:border-rose-400/30 dark:hover:text-rose-400"
          >
            Back to top
            <span className="flex size-6 items-center justify-center rounded-full bg-neutral-900/5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#810419] group-hover:text-white dark:bg-white/8">
              <ArrowUp className="size-3.5" />
            </span>
          </button>
        </div>
      </div>

      {/* Giant wordmark */}
      <div
        onMouseMove={onMove}
        aria-hidden
        className={cn(
          "group/mark relative mx-auto mb-[-0.06em] max-w-7xl overflow-hidden px-2 transition-all duration-1000 ease-out motion-reduce:transition-none",
          inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        )}
        style={{ transitionDelay: "400ms" }}
      >
        {/* Base: faint, fades out downward */}
        <span
          className={cn(
            wordmark,
            "bg-linear-to-b from-neutral-900/[0.14] via-neutral-900/5 to-transparent bg-clip-text text-transparent dark:from-white/16 dark:via-white/5",
          )}
        >
          Blypto
        </span>

        {/* Crimson layer revealed around the cursor */}
        <span
          className={cn(
            wordmark,
            "pointer-events-none absolute inset-x-2 top-0 bg-linear-to-b from-[#810419] via-rose-600 to-rose-400/10 bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover/mark:opacity-100",
          )}
          style={{
            maskImage:
              "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
          }}
        >
          Blypto
        </span>
      </div>
    </footer>
  );
}