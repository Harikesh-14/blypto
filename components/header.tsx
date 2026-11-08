"use client";

import { ChevronDown, LogOut, UserRound, Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ModeToggle from "./mode-toggle";
import { useClerk, useUser } from "@clerk/nextjs";

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

  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
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

  const handleLogout = async () => {
    setProfileOpen(false);

    try {
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
              className="rounded-full transition-transform duration-300 group-hover:scale-105 w-auto object-contain"
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
                      ? "text-[#810419] dark:text-rose-400"
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
            {!isLoaded ? (
              <div className="size-9 animate-pulse rounded-full bg-neutral-200 dark:bg-white/10" />
            ) : isSignedIn && user ? (
              <div ref={profileRef} className="relative">
                {/* Profile trigger */}
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                  className={cn(
                    "flex items-center gap-1.5 rounded-full p-1 transition-all duration-200",
                    "hover:bg-neutral-900/5 dark:hover:bg-white/8",
                    profileOpen && "bg-neutral-900/5 dark:bg-white/8",
                  )}
                >
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="size-8 rounded-full border border-neutral-200 object-cover dark:border-white/15"
                    />
                  ) : (
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#810419]/10 text-sm font-semibold text-[#810419] dark:bg-rose-400/15 dark:text-rose-400">
                      {user.firstName?.[0]?.toUpperCase() ||
                        user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() ||
                        "U"}
                    </div>
                  )}

                  <ChevronDown
                    className={cn(
                      "mr-1 size-3.5 text-neutral-400 transition-transform duration-200",
                      profileOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Profile dropdown */}
                <div
                  role="menu"
                  aria-hidden={!profileOpen}
                  className={cn(
                    "absolute right-0 top-full z-50 mt-3 w-72 origin-top-right",
                    "rounded-[18px] bg-linear-to-b from-neutral-200 via-neutral-200/40 to-transparent p-px",
                    "dark:from-white/20 dark:via-white/5",
                    "shadow-[0_20px_60px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.65)]",
                    "transition-all duration-300 ease-out motion-reduce:transition-none",
                    profileOpen
                      ? "translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none -translate-y-2 scale-95 opacity-0",
                  )}
                >
                  <div className="relative overflow-hidden rounded-[17px] bg-white/95 p-1.5 backdrop-blur-2xl dark:bg-neutral-900/95">
                    {/* Top highlight */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-rose-500/40 to-transparent"
                    />

                    {/* User information */}
                    <div
                      className={cn(
                        "relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3.5",
                        "transition-all duration-300 ease-out motion-reduce:transition-none",
                        profileOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                      )}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full blur-3xl"
                      />
                      {/* Avatar with brand-gradient ring */}
                      <div className="relative shrink-0 rounded-full bg-linear-to-br from-[#810419] via-rose-600 to-rose-400 p-0.5">
                        {user.imageUrl ? (
                          <img
                            src={user.imageUrl}
                            alt=""
                            className="size-10 rounded-full border-2 border-white object-cover dark:border-neutral-900"
                          />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-neutral-50 font-semibold text-[#810419] dark:border-neutral-900 dark:bg-neutral-900 dark:text-rose-400">
                            {user.firstName?.[0]?.toUpperCase() || "U"}
                          </div>
                        )}
                      </div>

                      <div className="relative min-w-0">
                        <p className="truncate text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
                          {user.fullName || "Welcome"}
                        </p>
                        <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                          {user.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>

                    <div className="mx-3 my-1.5 h-px bg-linear-to-r from-transparent via-neutral-200 to-transparent dark:via-white/10" />

                    {/* Profile */}
                    <div
                      className={cn(
                        "transition-all duration-300 ease-out motion-reduce:transition-none",
                        profileOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                      )}
                      style={{ transitionDelay: profileOpen ? "70ms" : "0ms" }}
                    >
                      <Link
                        href="/profile"
                        role="menuitem"
                        tabIndex={profileOpen ? 0 : -1}
                        onClick={() => setProfileOpen(false)}
                        className="group/item flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-rose-900/5 hover:text-[#810419] focus-visible:bg-rose-900/5 focus-visible:text-[#810419] focus-visible:outline-none dark:text-neutral-300 dark:hover:bg-rose-400/10 dark:hover:text-rose-400 dark:focus-visible:bg-rose-400/10 dark:focus-visible:text-rose-400"
                      >
                        <span className="flex size-8 items-center justify-center rounded-lg bg-neutral-900/5 transition-colors group-hover/item:bg-[#810419]/10 dark:bg-white/8 dark:group-hover/item:bg-rose-400/15">
                          <UserRound className="size-4" />
                        </span>
                        Profile
                        <ArrowUpRight className="ml-auto size-3.5 -translate-x-1 translate-y-0.5 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:translate-y-0 group-hover/item:opacity-100" />
                      </Link>
                    </div>

                    {/* Logout */}
                    <div
                      className={cn(
                        "transition-all duration-300 ease-out motion-reduce:transition-none",
                        profileOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                      )}
                      style={{ transitionDelay: profileOpen ? "120ms" : "0ms" }}
                    >
                      <button
                        type="button"
                        role="menuitem"
                        tabIndex={profileOpen ? 0 : -1}
                        onClick={handleLogout}
                        className="group/item flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-red-500/5 hover:text-red-600 focus-visible:bg-red-500/5 focus-visible:text-red-600 focus-visible:outline-none dark:text-neutral-300 dark:hover:bg-red-400/10 dark:hover:text-red-400 dark:focus-visible:bg-red-400/10 dark:focus-visible:text-red-400"
                      >
                        <span className="flex size-8 items-center justify-center rounded-lg bg-neutral-900/5 transition-colors group-hover/item:bg-red-500/10 dark:bg-white/8 dark:group-hover/item:bg-red-400/15">
                          <LogOut className="size-4 transition-transform duration-300 group-hover/item:translate-x-0.5" />
                        </span>
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full px-3 py-1.5 text-[13px] font-medium text-neutral-500 transition-all duration-300 hover:text-[#810419] hover:drop-shadow-[0_0_8px_rgba(129,4,25,0.65)] dark:text-neutral-400 dark:hover:text-rose-400 dark:hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]"
              >
                Log in
              </Link>
            )}

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