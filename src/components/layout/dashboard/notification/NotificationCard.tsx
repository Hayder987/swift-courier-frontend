"use client";

import { Clock3, Package, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { type INotification, typeConfig } from "@/types/notification.type";

type NotificationCardProps = {
  notification: INotification;
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const config = typeConfig[notification.type] ?? typeConfig.GENERAL;

  const Icon = config.icon;

  const createdDate = new Date(notification.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  const createdTime = new Date(notification.createdAt).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    },
  );

  return (
    <Card
      className={`group relative overflow-hidden border border-border/60 bg-card/90 shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-[#e50914]/25 hover:bg-muted/20 hover:shadow-md ${
        !notification.isRead ? "border-l-2 border-l-[#e50914]" : ""
      }`}
    >
      {/* Ambient glow */}
      {!notification.isRead && (
        <div className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-[#e50914]/8 blur-2xl" />
      )}

      <CardContent className="p-3 sm:p-3.5">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              notification.isRead
                ? "border-border bg-muted/70 text-muted-foreground"
                : "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]"
            }`}
          >
            <Icon className="size-4" />
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Top row */}
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate text-[13px] font-semibold leading-5 text-foreground">
                    {notification.title}
                  </h3>

                  {!notification.isRead && (
                    <span className="size-1.5 shrink-0 rounded-full bg-[#e50914]" />
                  )}
                </div>

                {/* Type */}
                <Badge
                  variant="secondary"
                  className="mt-1 h-4.5 rounded-md px-1.5 text-[9px] font-medium uppercase tracking-wide"
                >
                  {config.label}
                </Badge>
              </div>

              {/* Delete */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 rounded-lg text-muted-foreground opacity-100 transition-all hover:bg-red-500/10 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Delete notification"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>

            {/* Message */}
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
              {notification.message}
            </p>

            {/* Footer */}
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock3 className="size-3" />

                <span>
                  {createdDate} · {createdTime}
                </span>
              </div>

              {notification.shipmentId && (
                <div className="flex min-w-0 items-center gap-1">
                  <Package className="size-3 shrink-0" />

                  <span className="max-w-32 truncate">
                    {notification.shipmentId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
