"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  RefreshCcw,
  Route,
} from "lucide-react";
import dynamic from "next/dynamic";

import type { FetchError } from "ofetch";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DirectionMap = dynamic(() => import("./DirectionMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[42vh] min-h-[300px] w-full items-center justify-center rounded-2xl border border-border/60 bg-muted/20">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-[#e50914]/10">
          <Loader2 className="size-5 animate-spin text-[#e50914]" />
        </div>

        <div>
          <p className="text-sm font-semibold">Loading map</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Preparing courier direction...
          </p>
        </div>
      </div>
    </div>
  ),
});

interface LocationButtonProps {
  latitude: number | string;
  longitude: number | string;
  destinationLabel: string;
}

type CourierLocation = {
  latitude: number;
  longitude: number;
};

type LocationState = "idle" | "loading" | "success" | "error";

const calculateDistanceInKm = (
  first: CourierLocation,
  second: CourierLocation,
) => {
  const earthRadius = 6371;

  const latitudeDifference =
    ((second.latitude - first.latitude) * Math.PI) / 180;
  const longitudeDifference =
    ((second.longitude - first.longitude) * Math.PI) / 180;

  const firstLatitude = (first.latitude * Math.PI) / 180;
  const secondLatitude = (second.latitude * Math.PI) / 180;

  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  const centralAngle =
    2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return earthRadius * centralAngle;
};

const LocationButton = ({
  latitude,
  longitude,
  destinationLabel,
}: LocationButtonProps) => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<CourierLocation | null>(null);
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const targetLatitude = Number(latitude);
  const targetLongitude = Number(longitude);

  const hasValidTarget =
    Number.isFinite(targetLatitude) && Number.isFinite(targetLongitude);

  const destination = useMemo(
    () => ({
      latitude: targetLatitude,
      longitude: targetLongitude,
    }),
    [targetLatitude, targetLongitude],
  );

  const distanceInKm = useMemo(() => {
    if (!location || !hasValidTarget) {
      return null;
    }

    return calculateDistanceInKm(location, destination);
  }, [destination, hasValidTarget, location]);

  const requestBrowserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationState("error");
      setErrorMessage("Your browser does not support location services.");
      return;
    }

    setLocationState("loading");
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationState("success");
        setLastUpdated(new Date());
      },
      (error) => {
        setLocationState("error");

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage(
              "Location permission was denied. Please allow location access and try again.",
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setErrorMessage(
              "Your current location is unavailable. Please try again.",
            );
            break;

          case error.TIMEOUT:
            setErrorMessage("Location request timed out. Please try again.");
            break;

          default:
            setErrorMessage("Unable to detect your current location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  useEffect(() => {
    if (!open || !navigator.geolocation) {
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationState("success");
        setLastUpdated(new Date());
      },
      () => {
        // Keep the existing location if a background update fails.
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setLocation(null);
      setLocationState("idle");
      setErrorMessage("");
      setLastUpdated(null);

      return;
    }

    requestBrowserLocation();
  }, [open, requestBrowserLocation]);

  const formattedDistance =
    distanceInKm === null
      ? "—"
      : distanceInKm < 1
        ? `${Math.round(distanceInKm * 1000)} m`
        : `${distanceInKm.toFixed(2)} km`;

  const formattedLastUpdated = lastUpdated
    ? lastUpdated.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "Updating...";

  return (
    <>
      <Button
        type="button"
        // variant="outline"
        size="sm"
        disabled={!hasValidTarget}
        onClick={() => setOpen(true)}
        className="h-8 gap-1.5 rounded-lg border-border/60 text-xs"
      >
        <MapPin className="size-3.5" />

        <span className="hidden lg:inline">Get Direction</span>
        <span className="lg:hidden">Map</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            w-[calc(100%-1rem)]
            max-w-[96vw]
            overflow-hidden
            rounded-2xl
            border-border/60
            p-0
            sm:w-[calc(100%-2rem)]
            xl:max-w-[1500px]
            2xl:max-w-[1700px]
            max-h-[96vh]
          "
        >
          {/* Brand accent */}
          <div className="h-1 shrink-0 bg-[#e50914]" />

          <div className="flex max-h-[calc(96vh-4px)] min-h-0 flex-col overflow-y-auto p-4 sm:p-5 lg:p-6">
            {/* Header */}
            <DialogHeader className="mb-4 shrink-0 sm:mb-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10">
                      <Navigation className="size-4.5 text-[#e50914]" />
                    </div>

                    <span className="rounded-full border border-[#e50914]/20 bg-[#e50914]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e50914]">
                      Live tracking
                    </span>
                  </div>

                  <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                    Courier Direction
                  </DialogTitle>

                  <DialogDescription className="mt-1 max-w-2xl text-xs leading-relaxed sm:text-sm">
                    Track your current location and view the direction to the
                    delivery destination in real time.
                  </DialogDescription>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={requestBrowserLocation}
                  disabled={locationState === "loading"}
                  className="size-9 shrink-0 rounded-xl border-border/60"
                  aria-label="Refresh location"
                >
                  <RefreshCcw
                    className={`size-4 ${
                      locationState === "loading" ? "animate-spin" : ""
                    }`}
                  />
                </Button>
              </div>
            </DialogHeader>

            {/* Main content */}
            {locationState === "loading" && (
              <div className="flex min-h-[300px] flex-1 items-center justify-center rounded-2xl border border-border/60 bg-muted/20">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative flex size-14 items-center justify-center rounded-2xl bg-[#e50914]/10">
                    <LocateFixed className="size-6 text-[#e50914]" />

                    <span className="absolute inset-0 animate-ping rounded-2xl bg-[#e50914]/5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Detecting your location
                    </p>

                    <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
                      Please allow browser location access so we can calculate
                      the courier direction.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="size-3.5 animate-spin" />
                    Getting your coordinates...
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {locationState === "error" && (
              <div className="flex min-h-[300px] flex-1 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/[0.03]">
                <div className="flex max-w-md flex-col items-center px-5 text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
                    <AlertTriangle className="size-6 text-destructive" />
                  </div>

                  <h3 className="text-sm font-semibold">
                    Location unavailable
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {errorMessage ||
                      "We couldn't determine your current location."}
                  </p>

                  <Button
                    type="button"
                    onClick={requestBrowserLocation}
                    className="mt-5 h-9 rounded-xl bg-[#e50914] px-4 text-xs font-semibold text-white hover:bg-[#c90812]"
                  >
                    <RefreshCcw className="mr-2 size-3.5" />
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Success */}
            {locationState === "success" && location && (
              <div className="space-y-4">
                {/* Large map */}
                <DirectionMap
                  courierLocation={location}
                  destination={destination}
                  destinationLabel={destinationLabel}
                />

                {/* Stats */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Courier */}
                  <div className="group rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm transition-colors hover:border-[#e50914]/20">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                          Courier
                        </p>

                        <p className="mt-1.5 text-sm font-semibold">Live</p>
                      </div>

                      <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10">
                        <CheckCircle2 className="size-4.5 text-emerald-500" />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-500">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Location is active
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="group rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm transition-colors hover:border-[#e50914]/20">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                          Destination
                        </p>

                        <p className="mt-1.5 truncate text-sm font-semibold">
                          {destinationLabel}
                        </p>
                      </div>

                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10">
                        <MapPin className="size-4.5 text-[#e50914]" />
                      </div>
                    </div>

                    <p className="mt-3 truncate text-[11px] text-muted-foreground">
                      Delivery destination
                    </p>
                  </div>

                  {/* Distance */}
                  <div className="group rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm transition-colors hover:border-[#e50914]/20">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                          Distance
                        </p>

                        <p className="mt-1.5 text-lg font-bold tracking-tight">
                          {formattedDistance}
                        </p>
                      </div>

                      <div className="flex size-9 items-center justify-center rounded-xl bg-[#e50914]/10">
                        <Route className="size-4.5 text-[#e50914]" />
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-muted-foreground">
                      Straight-line distance
                    </p>
                  </div>
                </div>

                {/* Bottom status */}
                <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="relative flex size-2.5 shrink-0">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                    </span>

                    <p className="truncate text-xs font-medium">
                      Courier location is live
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:shrink-0">
                    <span>Last updated</span>
                    <span className="font-medium text-foreground">
                      {formattedLastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationButton;
