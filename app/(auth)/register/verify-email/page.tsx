"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function VerifyEmailPage() {
  const { signUp } = useSignUp();

  const verification = signUp.verifications.emailLinkVerification;

  if (!verification) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <h1 className="text-xl font-semibold">
          Waiting for verification
        </h1>
        <p className="text-sm text-neutral-500">
          Clerk has not returned a verification result yet.
        </p>
        <p className="text-xs text-neutral-400">
          Make sure you opened the link in the same browser
          where you started registration.
        </p>
        <Link href="/register">Return to registration</Link>
      </div>
    );
  }

  switch (verification.status) {
    case "verified":
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-semibold text-green-600">
            Email verified!
          </h1>
          <p>
            Return to your original registration tab.
          </p>
        </div>
      );

    case "expired":
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">
            Verification link expired
          </h1>
          <Link href="/register">Try again</Link>
        </div>
      );

    case "failed":
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">
            Verification failed
          </h1>
          <Link href="/register">Try again</Link>
        </div>
      );

    case "client_mismatch":
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">
            Browser mismatch
          </h1>
          <p>
            Open the link in the same browser where you started registration.
          </p>
        </div>
      );

    default:
      return <p>Processing verification...</p>;
  }
}