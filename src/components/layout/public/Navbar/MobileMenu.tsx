"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetMe } from "@/hooks";
import { NAV_ITEMS } from "@/lib/constants";
import ProfileMenu from "./ProfileMenu";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetMe();

  const user = data?.data?.user;

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
        <div className="absolute left-0 right-0 top-18 border-b border-border bg-background/95 px-4 pb-4 shadow-xl backdrop-blur-xl">
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

            {/* Loading */}
            {isLoading && (
              <div className="h-10 w-20 animate-pulse rounded-xl bg-muted" />
            )}

            {/* Logged Out */}
            {!isLoading && !user && (
              <Link
                href="/login"
                className="rounded-xl bg-[#e50914] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-[#c70812] hover:shadow-red-500/30"
              >
                Login
              </Link>
            )}

            {/* Logged In */}
            {!isLoading && user && (
              <ProfileMenu userName={user.name} userRole={user.role} />
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
