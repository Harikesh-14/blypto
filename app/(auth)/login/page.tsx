"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  BrainCircuit,
  Flame,
  Check,
} from "lucide-react";
import { DitherField } from "@/components/ui/dither-field";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Integrate your authentication logic here.
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">

      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-64 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-rose-700/[0.07] blur-[120px] dark:bg-rose-600/12" />
        <div className="absolute -right-37.5 top-100 h-80 w-80 rounded-full bg-rose-500/4 blur-[100px]" />
      </div>

      <DitherField
        className="relative isolate min-h-screen"
        dotSize={0.5}
        intensity={0.3}
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-white/40 via-transparent to-white dark:from-neutral-950/40 dark:via-transparent dark:to-neutral-950" />

        {/* Login content */}
        <section className="relative z-10 mx-auto grid min-h-[calc(100vh-100px)] max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:gap-24 lg:px-10">

          {/* Left: Brand introduction */}
          <div className="hidden lg:block">
            <div className="max-w-lg py-10">

              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-900/10 bg-rose-900/5 px-3 py-1.5 text-xs font-medium text-[#810419] dark:border-rose-400/15 dark:bg-rose-400/5 dark:text-rose-400">
                <span className="size-1.5 rounded-full bg-rose-600" />
                Your journey starts here
              </div>

              <h1 className="text-5xl font-semibold leading-[1.1] tracking-[-0.055em] xl:text-6xl">
                Think deeper.
                <span className="mt-2 block bg-linear-to-r from-[#810419] via-rose-600 to-rose-400 bg-clip-text text-transparent">
                  Solve smarter.
                </span>
                <span className="mt-2 block">
                  Grow every day.
                </span>
              </h1>

              <p className="mt-7 max-w-md text-base leading-8 text-neutral-500 dark:text-neutral-400">
                Pick up where you left off. Keep your progress,
                build consistency, and become a better problem solver
                one challenge at a time.
              </p>

              {/* Decorative learning card */}
              <div className="relative mt-14 max-w-md overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/70 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70">

                <div className="absolute -right-16 -top-16 size-40 rounded-full bg-rose-600/10 blur-3xl" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-rose-900/5 text-[#810419] dark:bg-rose-400/10 dark:text-rose-400">
                      <BrainCircuit className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        Your learning journey
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        Every problem makes you better.
                      </p>
                    </div>
                  </div>

                  <Flame className="size-5 text-rose-600 dark:text-rose-400" />
                </div>

                <div className="relative mt-7 space-y-4">
                  {[
                    "Master the fundamentals",
                    "Practice with intention",
                    "Build problem-solving skills",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex size-6 items-center justify-center rounded-full bg-rose-900/5 text-[#810419] dark:bg-rose-400/10 dark:text-rose-400">
                        <Check className="size-3.5" />
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="relative mt-7 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-linear-to-r from-[#810419] to-rose-500" />
                </div>

                <p className="relative mt-2 text-[10px] text-neutral-400">
                  Progress is built one step at a time.
                </p>
              </div>

            </div>
          </div>

          {/* Right: Login form */}
          <div className="mx-auto w-full max-w-md">

            {/* Mobile heading */}
            <div className="mb-10 text-center lg:hidden">
              <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-rose-900/5 text-[#810419] dark:bg-rose-400/10 dark:text-rose-400">
                <BrainCircuit className="size-6" />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome back.
              </h1>

              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                Your next breakthrough starts here.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/85 p-7 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-2xl sm:p-9 dark:border-white/10 dark:bg-neutral-900/85 dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)]">

              {/* Top accent */}
              <div className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-rose-500/50 to-transparent" />

              <div className="hidden lg:block">
                <p className="text-2xl font-semibold tracking-tight">
                  Welcome back
                </p>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Sign in to continue your learning journey.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-2 space-y-5 lg:mt-8">

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-[#810419] transition-colors hover:text-rose-600 dark:text-rose-400"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-11 pr-12 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="size-3.5 accent-[#810419]"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs text-neutral-500 dark:text-neutral-400"
                  >
                    Remember me
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#810419] text-sm font-medium text-white shadow-[0_5px_25px_rgba(129,4,25,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#690316] hover:shadow-[0_8px_30px_rgba(129,4,25,0.3)]"
                >
                  Sign in
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
                <span className="text-xs text-neutral-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
              </div>

              {/* Social login placeholder */}
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white text-sm font-medium transition-all hover:bg-neutral-50 dark:border-white/10 dark:bg-white/2 dark:hover:bg-white/5"
              >
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.28-1.93-6.15-4.53H2.16v2.84A11 11 0 0 0 12 23Z"/>
                  <path fill="#FBBC05" d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.16a11 11 0 0 0 0 9.88l3.69-2.84Z"/>
                  <path fill="#EA4335" d="M12 4.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45.99 14.97 0 12 0a11 11 0 0 0-9.84 7.06l3.69 2.84c.87-2.6 3.29-4.54 6.15-4.54Z"/>
                </svg>
                Continue with Google
              </button>

              <p className="mt-7 text-center text-xs leading-6 text-neutral-400">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-neutral-600 underline underline-offset-4 hover:text-[#810419] dark:text-neutral-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-neutral-600 underline underline-offset-4 hover:text-[#810419] dark:text-neutral-300">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <p className="mt-7 text-center text-xs text-neutral-400">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#810419] hover:text-rose-600 dark:text-rose-400"
              >
                Get started <span aria-hidden="true">→</span>
              </Link>
            </p>

          </div>
        </section>
      </DitherField>
    </main>
  );
}