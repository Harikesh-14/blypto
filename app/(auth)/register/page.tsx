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
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { signUp } = useSignUp();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasSubmitted(true);
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    try {
      // 1. Create the Clerk sign-up attempt.
      const { error: createError } = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        username,
        password,
      });

      if (createError) {
        setErrorMessage(createError.message);
        return;
      }

      // 2. Send email verification link
      const { error: emailError } =
        await signUp.verifications.sendEmailLink({
          verificationUrl: `${window.location.origin}/register/verify-email`,
        });

      if (emailError) {
        setErrorMessage(emailError.message);
        return;
      }

      // 3. Keep the original registration page alive
      setIsVerifying(true);
      setIsSubmitting(false);

      // 4. Wait for verification
      const { error: verificationError } =
        await signUp.verifications.waitForEmailLinkVerification();

      if (verificationError) {
        setErrorMessage(verificationError.message);
        setIsVerifying(false);
        return;
      }

      // 5. Check whether sign-up is complete
      if (signUp.status !== "complete") {
        setErrorMessage(
          `Registration incomplete. Current status: ${signUp.status}`
        );
        setIsVerifying(false);
        return;
      }

      // 6. Finalize and activate the session
      const { error: finalizeError } = await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log("Pending session task:", session.currentTask);
            return;
          }

          const url = decorateUrl("/dashboard");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url);
          }
        },
      });

      if (finalizeError) {
        setErrorMessage(finalizeError.message);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setIsVerifying(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    } else if (username.trim().length < 4) {
      newErrors.username = "Username must contain at least 3 characters.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function FieldError({ message }: { message?: string }) {
    if (!message) return null;

    return (
      <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
        {message}
      </p>
    );
  }

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

              {errorMessage && (
                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {errorMessage}
                </div>
              )}

              <form
                onSubmit={handleRegister}
                className="mt-2 space-y-4 lg:mt-8"
              >

                {/* First name and last name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                      First name <span className="text-red-500">*</span>
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
                        onChange={(e) => {
                          setFirstName(e.target.value);

                          if (hasSubmitted) {
                            setErrors((prev) => ({
                              ...prev,
                              firstName: e.target.value.trim()
                                ? ""
                                : "First name is required.",
                            }));
                          }
                        }}
                        className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-10 pr-3 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                      />
                    </div>

                    <FieldError message={errors.firstName} />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                      Last name <span className="text-red-500">*</span>
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
                        onChange={(e) => {
                          setLastName(e.target.value);

                          if (hasSubmitted) {
                            setErrors((prev) => ({
                              ...prev,
                              lastName: e.target.value.trim()
                                ? ""
                                : "Last name is required.",
                            }));
                          }
                        }}
                        className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-10 pr-3 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                      />
                    </div>

                    <FieldError message={errors.lastName} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email address <span className="text-red-500">*</span>
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
                      onChange={(e) => {
                        setEmail(e.target.value);

                        if (hasSubmitted) {
                          setErrors((prev) => ({
                            ...prev,
                            email: e.target.value.trim()
                              ? ""
                              : "Email is required.",
                          }));
                        }
                      }}
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                    />
                  </div>

                  <FieldError message={errors.email} />
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-medium">
                    Username <span className="text-red-500">*</span>
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
                      onChange={(e) => {
                        setUsername(e.target.value);

                        if (hasSubmitted) {
                          setErrors((prev) => ({
                            ...prev,
                            username: e.target.value.trim()
                              ? ""
                              : "Username is required.",
                          }));
                        }
                      }}
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50/70 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-rose-800/50 focus:ring-4 focus:ring-rose-900/5 dark:border-white/10 dark:bg-white/3 dark:focus:border-rose-400/50 dark:focus:ring-rose-400/5"
                    />
                  </div>

                  <FieldError message={errors.username} />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Password <span className="text-red-500">*</span>
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
                      onChange={(e) => {
                        setPassword(e.target.value);

                        if (hasSubmitted) {
                          setErrors((prev) => ({
                            ...prev,
                            password: e.target.value.trim()
                              ? ""
                              : "Password is required.",
                          }));
                        }
                      }}
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

                  <div className="mt-2 flex items-center gap-2">
                    <Check
                      className={`size-3.5 ${password.length >= 8
                        ? "text-green-600"
                        : "text-neutral-400"
                        }`}
                    />

                    <p
                      className={`text-xs ${password.length >= 8
                        ? "text-green-600"
                        : "text-neutral-400"
                        }`}
                    >
                      At least 8 characters
                    </p>
                  </div>

                  <FieldError message={errors.password} />
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                    Confirm password <span className="text-red-500">*</span>
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
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);

                        if (hasSubmitted) {
                          setErrors((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value.trim()
                              ? ""
                              : "Confirm Password field is required.",
                          }));
                        }
                      }}
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

                  <FieldError message={errors.confirmPassword} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#810419] text-sm font-medium text-white shadow-[0_5px_25px_rgba(129,4,25,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#690316] hover:shadow-[0_8px_30px_rgba(129,4,25,0.3)]"
                  disabled={isSubmitting || isVerifying}
                >
                  {isSubmitting
                    ? "Creating account..."
                    : isVerifying
                      ? "Waiting for email verification..."
                      : "Create account"}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <div id="clerk-captcha" />
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