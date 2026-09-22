"use client";

import { ChevronDown, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "@/components/auth/LogoutButton";

type ProfileMenuProps = {
  userName?: string;
};

export default function ProfileMenu({
  userName = "Profile",
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-xl border border-border bg-background/70 px-3 text-sm font-medium transition hover:bg-muted"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e50914] text-white">
          <User className="h-4 w-4" />
        </span>

        <span className="hidden max-w-24 truncate sm:block">{userName}</span>

        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-border bg-background p-2 shadow-xl">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-muted"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-muted"
          >
            <Settings className="h-4 w-4" />
            Dashboard
          </Link>

          <LogoutButton className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>
      )}
    </div>
  );
}
