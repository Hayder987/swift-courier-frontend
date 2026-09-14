"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { NAV_ITEMS } from "@/lib/constants";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/70 transition hover:bg-muted"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[72px] border-b border-border bg-background/95 px-4 pb-4 shadow-xl backdrop-blur-xl">
          <nav className="mx-auto max-w-7xl rounded-2xl border border-border bg-background p-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-xl bg-[#e50914] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c70812]"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
