"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Package } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import ThemeToggle from "./ThemeToggle";
const NavbarThreeBackground = dynamic(
  () => import("./NavbarThreeBackground"),
  {
    ssr: false,
    loading: () => null,
  },
);

type NavHeaderProps = {
  isAuthenticated?: boolean;
  userName?: string;
};

export default function NavHeader({
  isAuthenticated = false,
  userName = "Profile",
}: NavHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <NavbarThreeBackground />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#e50914] text-white shadow-lg shadow-red-500/20">
              <Package className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

              <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-background" />
            </span>

            <span className="hidden text-xl font-bold tracking-tight sm:block">
              Swift<span className="text-[#e50914]">Courier</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:underline hover:text-[#e50914] duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />

            {isAuthenticated ? (
              <ProfileMenu userName={userName} />
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-[#e50914] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-[#c70812] hover:shadow-red-500/30"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}