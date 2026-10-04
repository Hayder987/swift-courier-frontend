"use client";

import { Mail, Phone, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { IDataCourier } from "@/types/shipment.type";

interface ShipmentCourierCardProps {
  title: string;
  courier: IDataCourier | null;
  type: "pickup" | "delivery";
}

const ShipmentCourierCard = ({
  title,
  courier,
  type,
}: ShipmentCourierCardProps) => {
  const isPickup = type === "pickup";

  if (!courier) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <UserRound className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold">{title}</p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Courier assignment
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className="shrink-0 rounded-full border-amber-500/20 bg-amber-500/10 text-[10px] text-amber-600 dark:text-amber-400"
          >
            Not Assigned
          </Badge>
        </div>

        <div className="mt-4 rounded-xl border border-border/50 bg-background/60 p-3">
          <p className="text-xs leading-5 text-muted-foreground">
            No {isPickup ? "pickup" : "delivery"} courier has been assigned to
            this shipment yet.
          </p>
        </div>
      </div>
    );
  }

  const initials = courier.name
    .split(" ")
    .map((name) => name.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition-colors hover:border-[#e50914]/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="size-11 shrink-0 rounded-xl border border-border/60">
            <AvatarFallback className="rounded-xl bg-[#e50914]/10 font-semibold text-[#e50914]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-semibold">{courier.name}</p>

              <Badge
                variant="outline"
                className="rounded-full border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400"
              >
                Assigned
              </Badge>
            </div>

            <p className="mt-0.5 text-xs text-muted-foreground">{title}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5">
          <Mail className="size-3.5 shrink-0 text-muted-foreground" />

          <span className="truncate text-xs text-muted-foreground">
            {courier.email}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5">
          <Phone className="size-3.5 shrink-0 text-muted-foreground" />

          <span className="truncate text-xs text-muted-foreground">
            {courier.phone}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCourierCard;
