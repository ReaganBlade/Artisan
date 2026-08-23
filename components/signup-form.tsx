"use client";

import { useState } from "react";
import { Button } from "./button";
import { Field } from "./field";
import { Stamp } from "./stamp";
import { cn } from "./cn";
import { ApiError } from "@/lib/api";
import { signUp } from "@/lib/auth";

type Role = "collector" | "artist";
type Errors = Partial<Record<"name" | "email" | "password" | "form", string>>;

const mediums = [
  "Painting",
  "Print",
  "Photography",
  "Digital",
  "Sculpture",
  "Ceramics",
  "Textiles",
  "Mixed media",
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SocialButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm transition-[transform,box-shadow,background-color] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-acid hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
      >
        <span aria-hidden="true" className="text-base">◉</span>
        Continue with Google
      </button>
      <button
        type="button"
        className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm transition-[transform,box-shadow,background-color] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-acid hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
      >
        <span aria-hidden="true" className="text-base"> </span>
        Continue with Apple
      </button>
    </div>
  );
}

function RoleTiles({
  role,
  onSelect,
}: {
  role: Role;
  onSelect: (role: Role) => void;
}) {
  const tiles: Array<{ role: Role; title: string; copy: string; tone: string }> = [
    {
      role: "collector",
      title: "Join as a Collector",
      copy: "Browse the wall, follow artists, build a collection that's actually yours.",
      tone: "bg-paper",
    },
    {
      role: "artist",
      title: "Join as an Artist",
      copy: "Sell direct. Keep 85%. No CV, no gallery history, no waiting for permission.",
      tone: "bg-acid",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tiles.map((tile) => {
        const selected = role === tile.role;
        return (
          <button
            key={tile.role}
            type="button"
            onClick={() => onSelect(tile.role)}
            aria-pressed={selected}
            className={cn(
              "card-hover relative flex min-h-40 flex-col items-start gap-3 border-2 border-ink p-5 text-left shadow-hard",
              tile.tone,
              !selected && "opacity-80",
            )}
          >
            <span className="font-display text-2xl uppercase leading-none tracking-tight sm:text-3xl">
              {tile.title}
            </span>
            <span className="text-sm leading-relaxed">{tile.copy}</span>
            {selected && (
              <Stamp tone="riot" rotate={4} className="absolute right-3 top-3">
                Chosen
              </Stamp>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function SignUpForm() {
  const [role, setRole] = useState<Role>("collector");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [about, setAbout] = useState("");
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ email: string } | null>(null);

  function toggleMedium(medium: string) {
    setSelectedMediums((current) =>
      current.includes(medium)
        ? current.filter((m) => m !== medium)
        : [...current, medium],
    );
  }

  function validate(): Errors {
    const errs: Errors = {};
    if (!name.trim()) errs.name = "We need a name. Even a stage name.";
    if (!email.trim()) errs.email = "An email is required. We're not psychic.";
    else if (!emailRe.test(email)) errs.email = "That email won't reach you. Check it.";
    if (!password) errs.password = "A password is required.";
    else if (password.length < 8) errs.password = "Eight characters minimum. No excuses.";
    return errs;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      // The Auth Service only accepts email + password for now; the role tiles
      // and artist application fields (portfolio, mediums, bio) stay client-side
      // until the artist-onboarding flow lands in the backend.
      const result = await signUp(email, password);
      setDone({ email: result.user.email });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          setErrors({ email: error.message });
        } else if (error.status === 422) {
          setErrors({ form: "That didn't pass validation. Check the fields and try again." });
        } else {
          setErrors({ form: error.message });
        }
      } else {
        setErrors({
          form: "Couldn't reach the sign-up service. Is the backend running on port 8001?",
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mt-10 border-2 border-ink bg-acid p-6 shadow-hard sm:p-8">
        <Stamp tone="ink" rotate={-3}>
          Account created
        </Stamp>
        <p className="mt-4 font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl">
          {role === "artist" ? "Welcome to the wall." : "Your wall is ready."}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed sm:text-base">
          You&apos;re signed in as <span className="font-bold">{done.email}</span>.
          Artist verification is on the roadmap — for now everyone starts as a
          collector.
        </p>
        <Button href="/" variant="ink" size="lg" className="mt-6">
          Back to the wall
        </Button>
      </div>
    );
  }

  const isArtist = role === "artist";

  return (
    <div className="mt-10">
      <RoleTiles role={role} onSelect={setRole} />

      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-6 border-2 border-ink bg-paper shadow-hard"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-ink px-5 py-3 sm:px-6">
          <h2 className="font-display text-2xl uppercase leading-none tracking-tight text-paper sm:text-3xl">
            {isArtist ? "Join as an artist" : "Join as a collector"}
          </h2>
          <Stamp tone="acid" rotate={-3}>
            {isArtist ? "Keep 85%" : "Free to browse"}
          </Stamp>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <Field
            id="name"
            label="Name"
            required
            error={errors.name}
            placeholder="Your name or stage name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined, form: undefined }));
            }}
            autoComplete="name"
          />
          <Field
            id="email"
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
            id="password"
            label="Password"
            type="password"
            required
            error={errors.password}
            hint="8 characters minimum. No excuses."
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined, form: undefined }));
            }}
            autoComplete="new-password"
            className="sm:col-span-2"
          />

          {isArtist ? (
            <>
              <Field
                id="portfolio"
                label="Portfolio or Instagram"
                hint="Optional — link us to your work."
                placeholder="instagram.com/yourhandle"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                autoComplete="url"
              />
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <p className="font-mono text-xs uppercase tracking-[0.15em]">
                  Mediums you work in
                  <span className="ml-1 text-ink/50">(optional, pick a few)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {mediums.map((medium) => {
                    const active = selectedMediums.includes(medium);
                    return (
                      <button
                        key={medium}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleMedium(medium)}
                        className={cn(
                          "border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-100",
                          active
                            ? "bg-electric text-paper shadow-hard-sm"
                            : "bg-paper hover:bg-acid",
                        )}
                      >
                        {medium}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label
                  htmlFor="about"
                  className="font-mono text-xs uppercase tracking-[0.15em]"
                >
                  Tell us about your work
                  <span className="ml-1 text-ink/50">(optional)</span>
                </label>
                <textarea
                  id="about"
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Two sentences. What you make, and why someone should hang it."
                  className="w-full resize-y border-2 border-ink bg-paper px-3 py-2.5 text-sm outline-none shadow-hard-sm transition-colors duration-100 placeholder:text-ink/40 focus:border-electric focus:shadow-[2px_2px_0_0_var(--electric)]"
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <p className="font-mono text-xs uppercase tracking-[0.15em]">
                Favorite mediums
                <span className="ml-1 text-ink/50">(optional — shapes your feed)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {mediums.map((medium) => {
                  const active = selectedMediums.includes(medium);
                  return (
                    <button
                      key={medium}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleMedium(medium)}
                      className={cn(
                        "border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-100",
                        active
                          ? "bg-electric text-paper shadow-hard-sm"
                          : "bg-paper hover:bg-acid",
                        )}
                    >
                      {medium}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:col-span-2">
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting
                ? "Creating account…"
                : isArtist
                  ? "Apply to the wall"
                  : "Create my account"}
            </Button>
            {errors.form && (
              <p className="text-center font-mono text-xs font-bold text-signal">
                {errors.form}
              </p>
            )}
            <p className="text-center font-mono text-[11px] uppercase tracking-wider text-ink/60">
              By joining you agree to the rules. They&apos;re short and fair.
            </p>
          </div>
        </div>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <span className="h-0.5 flex-1 bg-ink/20" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
          or
        </span>
        <span className="h-0.5 flex-1 bg-ink/20" aria-hidden="true" />
      </div>

      <div className="mt-6">
        <SocialButtons />
      </div>

      <p className="mt-6 text-center font-mono text-xs uppercase tracking-wider">
        Already on the wall?{" "}
        <a
          href="/user/sign-in"
          className="font-bold text-electric underline-offset-4 hover:underline hover:decoration-2"
        >
          Sign in →
        </a>
      </p>
    </div>
  );
}
