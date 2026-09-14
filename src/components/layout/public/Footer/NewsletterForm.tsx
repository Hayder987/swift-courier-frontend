"use client";

import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    /**
     * TODO:
     * Connect this with your newsletter API later.
     */
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />

        <div>
          <p className="text-sm font-semibold text-foreground">
            You&apos;re subscribed!
          </p>

          <p className="text-xs text-muted-foreground">
            Thanks for joining SwiftCourier.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center rounded-2xl border border-border bg-background/70 p-1.5 shadow-sm backdrop-blur-xl transition focus-within:border-[#e50914]/50 focus-within:ring-2 focus-within:ring-[#e50914]/10">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
          <Mail className="h-4 w-4" />
        </div>

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          required
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />

        <button
          type="submit"
          aria-label="Subscribe"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914] text-white shadow-lg shadow-red-500/20 transition hover:bg-[#c70812] hover:shadow-red-500/30"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
