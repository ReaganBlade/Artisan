"use client";

import { useState } from "react";
import { Button } from "./button";
import { Field } from "./field";
import { Stamp } from "./stamp";
import { ApiError } from "@/lib/api";
import { signIn } from "@/lib/auth";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ email: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "An email is required.";
    else if (!emailRe.test(email)) errs.email = "That email won't reach you. Check it.";
    if (!password) errs.password = "A password is required.";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const result = await signIn(email, password);
      setDone({ email: result.user.email });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 422) {
          setErrors({ form: "That combination didn't pass. Check the fields and try again." });
        } else {
          setErrors({ form: error.message });
        }
      } else {
        setErrors({
          form: "Couldn't reach the sign-in service. Is the backend running on port 8001?",
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border-2 border-ink bg-acid p-6 shadow-hard sm:p-8">
        <Stamp tone="ink" rotate={-3}>
          Session started
        </Stamp>
        <p className="mt-4 font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl">
          Welcome back.
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed sm:text-base">
          Signed in as <span className="font-bold">{done.email}</span>. Your
          session is stored locally — the wall is waiting.
        </p>
        <Button href="/" variant="ink" size="lg" className="mt-6">
          Go to the wall
        </Button>
      </div>
    );
  }

  return (
    <div className="border-2 border-ink bg-paper shadow-hard">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-ink px-5 py-3 sm:px-6">
        <h2 className="font-display text-2xl uppercase leading-none tracking-tight text-paper sm:text-3xl">
          Sign in
        </h2>
        <Stamp tone="electric" rotate={3}>
          Back again
        </Stamp>
      </div>

      <form onSubmit={onSubmit} noValidate className="grid gap-5 p-5 sm:p-6">
        <Field
          id="signin-email"
          label="Email"
          type="email"
          required
          error={errors.email}
          placeholder="you@somewhere.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined, form: undefined }));
          }}
          autoComplete="email"
        />
        <Field
          id="signin-password"
          label="Password"
          type="password"
          required
          error={errors.password}
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined, form: undefined }));
          }}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-4">
          <a
            href="#"
            className="font-mono text-xs font-bold uppercase tracking-wider text-electric underline-offset-4 hover:underline hover:decoration-2"
          >
            Forgot password?
          </a>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>

        {errors.form && (
          <p className="font-mono text-xs font-bold text-signal">{errors.form}</p>
        )}

        <div className="flex items-center gap-3">
          <span className="h-0.5 flex-1 bg-ink/20" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
            or
          </span>
          <span className="h-0.5 flex-1 bg-ink/20" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm transition-[transform,box-shadow,background-color] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-acid hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span aria-hidden="true">◉</span> Google
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm transition-[transform,box-shadow,background-color] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-acid hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span aria-hidden="true"> </span> Apple
          </button>
        </div>

        <p className="text-center font-mono text-xs uppercase tracking-wider">
          New here?{" "}
          <a
            href="/signup"
            className="font-bold text-electric underline-offset-4 hover:underline hover:decoration-2"
          >
            Join the wall →
          </a>
        </p>
      </form>
    </div>
  );
}
