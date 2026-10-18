"use client";

import { Check, Circle, Clock3, MapPin, Package, Truck } from "lucide-react";
import type { TrackingEvent } from "@/types/tracking.types";

interface TrackingTimelineProps {
  events: TrackingEvent[];
  title?: string;
}

export default function TrackingTimeline({
  events,
  title = "Shipment journey",
}: TrackingTimelineProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/70 p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-foreground sm:text-base">
            {title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Shipment progress and delivery milestones
          </p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
          <Package className="size-5" />
        </div>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-center">
          <Clock3 className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">
            No tracking events yet
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Shipment updates will appear here when available.
          </p>
        </div>
      ) : (
        <ol className="space-y-0">
          {events.map((event, index) => {
            const Icon =
              event.status === "DELIVERED"
                ? Check
                : event.status === "IN_TRANSIT" ||
                    event.status === "OUT_FOR_DELIVERY"
                  ? Truck
                  : event.status === "PICKED_UP"
                    ? MapPin
                    : Package;

            const last = index === events.length - 1;

            return (
              <li
                key={event.id}
                className="relative flex gap-3 pb-5 last:pb-0 sm:gap-4"
              >
                {!last && (
                  <span
                    className={[
                      "absolute left-[15px] top-9 h-[calc(100%-20px)] w-px",
                      event.completed ? "bg-[#e50914]/50" : "bg-border",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                )}

                <div
                  className={[
                    "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border",
                    event.completed || event.current
                      ? "border-[#e50914]/30 bg-[#e50914]/10 text-[#e50914]"
                      : "border-border bg-muted/50 text-muted-foreground",
                    event.current ? "ring-4 ring-[#e50914]/10" : "",
                  ].join(" ")}
                >
                  {event.completed ? (
                    <Icon className="size-4" />
                  ) : event.current ? (
                    <Circle className="size-3 fill-current" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-current" />
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {event.title}
                    </p>

                    {event.current && (
                      <span className="rounded-full bg-[#e50914]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#e50914]">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {event.description}
                  </p>

                  {event.location && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />
                      {event.location}
                    </p>
                  )}

                  {event.timestamp && (
                    <time
                      className="mt-2 block text-[11px] text-muted-foreground"
                      dateTime={event.timestamp}
                    >
                      {event.timestamp}
                    </time>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
