"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  User,
  AtSign,
  BrainCircuit,
  Flame,
  Check,
} from "lucide-react";
import { DitherField } from "@/components/ui/dither-field";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Integrate your registration logic here.
    console.log({
      firstName,
      lastName,
      email,
      username,
      password,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white py-20">

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

        {/* Register content */}
        <section className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-24 lg:px-10">

          {/* Left: Brand introduction */}
          <div className="hidden lg:block">
            <div className="max-w-lg py-10">

              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-900/10 bg-rose-900/5 px-3 py-1.5 text-xs font-medium text-[#810419] dark:border-rose-400/15 dark:bg-rose-400/5 dark:text-rose-400">
                <span className="size-1.5 rounded-full bg-rose-600" />
                Start something extraordinary
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
                Every great problem solver starts somewhere.
                Create your account, explore new challenges,
                and build the skills to become better every day.
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
                        Your next chapter
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        A little progress every day.
                      </p>
                    </div>
                  </div>

                  <Flame className="size-5 text-rose-600 dark:text-rose-400" />
                </div>

                <div className="relative mt-7 space-y-4">
                  {[
                    "Explore new possibilities",
                    "Challenge your thinking",
                    "Become a better problem solver",
                  ].map((item) => (
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
                  Great things start with a single step.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Register form */}
          <div className="mx-auto w-full max-w-md">

            {/* Mobile heading */}
            <div className="mb-8 text-center lg:hidden">
              <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-rose-900/5 text-[#810419] dark:bg-rose-400/10 dark:text-rose-400">
                <BrainCircuit className="size-6" />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                Create your account.
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
                  Create an account
                </p>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Join us and start your learning journey.
                </p>
              </div>

              <form
                onSubmit={handleRegister}
                className="mt-2 space-y-4 lg:mt-8"
              >

                {/* First name and last name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                      First name
                    </label>

                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

                      <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-10 pr-3 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                      Last name
                    </label>

                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

                      <input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-10 pr-3 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
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

                {/* Username */}
                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-medium">
                    Username
                  </label>

                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      required
                      minLength={3}
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      placeholder="Create a password"
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

                {/* Confirm password */}
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-11 pr-12 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#810419] text-sm font-medium text-white shadow-[0_5px_25px_rgba(129,4,25,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#690316] hover:shadow-[0_8px_30px_rgba(129,4,25,0.3)]"
                >
                  Create account
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

              </form>

              {/* Terms */}
              <p className="mt-6 text-center text-xs leading-6 text-neutral-400">
                By creating an account, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-neutral-600 underline underline-offset-4 hover:text-[#810419] dark:text-neutral-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-neutral-600 underline underline-offset-4 hover:text-[#810419] dark:text-neutral-300"
                >
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* Login link */}
            <p className="mt-7 text-center text-xs text-neutral-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-[#810419] hover:text-rose-600 dark:text-rose-400"
              >
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </p>

          </div>
        </section>
      </DitherField>
    </main>
  );
}