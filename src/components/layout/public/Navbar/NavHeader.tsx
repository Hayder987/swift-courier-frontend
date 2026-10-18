"use client";

import { ChevronDown, Package } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import SwiftLogo from "@/components/common/SwiftLogo";
import ProcessSpinner from "@/components/loading/process-spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMe } from "@/hooks";
import { NAV_ITEMS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import ThemeToggle from "./ThemeToggle";

const NavbarThreeBackground = dynamic(() => import("./NavbarThreeBackground"), {
  ssr: false,
  loading: () => null,
});

const DROPDOWN_ITEMS = NAV_ITEMS.filter(
  (item) =>
    item.href === "/faq" || item.href === "/terms" || item.href === "/privacy",
);

const MAIN_NAV_ITEMS = NAV_ITEMS.filter(
  (item) =>
    item.href !== "/faq" && item.href !== "/terms" && item.href !== "/privacy",
);

export default function NavHeader() {
  const { data, isLoading } = useGetMe();
  const user = data?.data?.user;
  const profileImg = data?.data?.profile?.imageUrl;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <NavbarThreeBackground />

      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <SwiftLogo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition duration-300 hover:text-[#e50914] hover:underline"
              >
                {item.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition duration-300 hover:text-[#e50914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]/50">
                More
                <ChevronDown className="size-4 transition-transform duration-200" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="min-w-52 rounded-xl border border-border/70 bg-background/95 p-1.5 shadow-xl backdrop-blur-xl"
              >
                {DROPDOWN_ITEMS.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    render={<Link href={item.href} />}
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors focus:bg-[#e50914]/10 focus:text-[#e50914]"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />

            {/* Loading */}
            {isLoading && (
              <div className="flex h-10 w-20 animate-pulse items-center justify-center rounded-xl bg-muted">
                <ProcessSpinner />
              </div>
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
              <ProfileMenu
                userName={user?.name}
                userRole={user?.role}
                image={profileImg}
              />
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
