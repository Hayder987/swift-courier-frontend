"use client";

import { Bell } from "lucide-react";

import NotificationSkeleton from "@/components/skeleton/notification.skeleton";
import { useGetNotifications } from "@/hooks/notifications.hook";
import type { INotification } from "@/types/notification.type";

import NotificationCard from "./NotificationCard";

const NotificationContent = () => {
  const { data, isPending } = useGetNotifications();

  const notifications = data?.data ?? [];

  if (isPending) {
    return (
      <div className="space-y-2.5 p-4">
        <NotificationSkeleton />
        <NotificationSkeleton />
        <NotificationSkeleton />
        <NotificationSkeleton />
      </div>
    );
  }

  if (!notifications.length) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center px-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914] shadow-sm">
          <Bell className="size-6" />
        </div>

        <h3 className="mt-4 text-sm font-semibold">No notifications yet</h3>

        <p className="mt-1 max-w-60 text-xs leading-5 text-muted-foreground">
          You&apos;re all caught up. New notifications will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 p-3 sm:p-4">
      {notifications.map((notification: INotification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContent;
