"use client";

import { Bell } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import NotificationContent from "./NotificationContent";

export default function NotificationSheet() {
  return (
    <Sheet>
      <SheetTrigger className="relative flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted">
        <Bell className="size-4" />

        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#e50914]" />

        <span className="sr-only">Notifications</span>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        {/* Header */}
        <SheetHeader className="shrink-0 border-b border-border/60 px-5 py-5">
          <div className="flex items-center justify-between pr-6">
            <div>
              <SheetTitle className="text-base font-semibold">
                Notifications
              </SheetTitle>

              <SheetDescription className="mt-1 text-xs">
                Stay updated with your latest activity.
              </SheetDescription>
            </div>

            <div className="flex size-9 items-center justify-center rounded-xl border border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]">
              <Bell className="size-4" />
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable notification area */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NotificationContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
