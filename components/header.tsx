"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ModeToggle from "./mode-toggle";

const links = [
  { id: "dashboard", title: "Dashboard", href: "/dashboard" },
  { id: "hub", title: "Hub", href: "/hub" },
  { id: "sheets", title: "Sheets", href: "/sheets" },
] as const;

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div ref={headerRef} className="relative w-full max-w-5xl">

        {/* Main navbar */}
        <div
          className={cn(
            "relative grid h-14 grid-cols-[1fr_auto] items-center rounded-xl border pr-2 pl-5 backdrop-blur-xl transition-all duration-300 md:grid-cols-[1fr_auto_1fr]",
            "border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]",
            "dark:border-white/10 dark:shadow-[0_8px_40px_rgb(0,0,0,0.5)]",
            scrolled || open
              ? "bg-white/90 dark:bg-neutral-900/90"
              : "bg-white/60 dark:bg-neutral-900/50",
          )}
        >
          {/* Inner highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-white/25"
          />

          {/* Brand */}
          <Link
            href="/"
            aria-label="Blypto home"
            className="group flex w-fit items-center hover:scale-105 transition-all duration-300"
          >
            <Image
              alt="Blypto Logo"
              src="/blypto_logo.png"
              width={36}
              height={36}
              priority
              className="rounded-full transition-transform duration-300 group-hover:scale-105"
            />

            <span className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-white">
              Blypto
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-0.5 md:flex"
          >
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300",
                    active
                      ? "bg-[#810419]/10 text-[#810419] dark:bg-rose-500/15 dark:text-rose-400"
                      : "text-neutral-500 hover:text-[#810419] hover:drop-shadow-[0_0_8px_rgba(129,4,25,0.65)] dark:text-neutral-400 dark:hover:text-rose-400 dark:hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]",
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          {/* Header actions */}
          <div className="flex items-center justify-end gap-1.5">
            <Link
              href="/login"
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-neutral-500 transition-all duration-300 hover:text-[#810419] hover:drop-shadow-[0_0_8px_rgba(129,4,25,0.65)] dark:text-neutral-400 dark:hover:text-rose-400 dark:hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]"
            >
              Log in
            </Link>

            <ModeToggle />

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-full text-neutral-700 transition-all duration-200 hover:bg-neutral-900/6 active:scale-90 md:hidden dark:text-neutral-200 dark:hover:bg-white/8"
            >
              <span className={cn("transition-transform duration-300", open && "rotate-90")}>
                {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile navbar panel */}
        <div
          id="mobile-menu"
          aria-hidden={!open}
          inert={!open}
          className={cn(
            "absolute inset-x-0 top-full mt-2 origin-top overflow-hidden rounded-xl border backdrop-blur-2xl md:hidden",
            "border-neutral-200/80 bg-white/95 shadow-[0_16px_50px_rgb(0,0,0,0.12)]",
            "dark:border-white/10 dark:bg-neutral-900/95 dark:shadow-[0_16px_60px_rgb(0,0,0,0.6)]",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0",
          )}
        >
          <div
            className={cn(
              "transition-all duration-300 delay-75",
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
            )}
          >
            {/* Navigation section */}
            <div className="p-3">
              <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                Navigation
              </p>

              <nav aria-label="Mobile navigation" className="space-y-1">
                {links.map((link, index) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      tabIndex={open ? 0 : -1}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      style={{
                        transitionDelay: open
                          ? `${100 + index * 55}ms`
                          : "0ms",
                      }}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3.5 py-3 text-sm font-medium",
                        "transition-all duration-300",
                        open
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0",
                        active
                          ? "bg-[#810419]/10 text-[#810419] dark:bg-rose-500/15 dark:text-rose-400"
                          : "text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/6 dark:hover:text-white",
                      )}
                    >
                      {link.title}

                      {active && (
                        <span className="size-1.5 rounded-full bg-[#810419] dark:bg-rose-400" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}