"use client";

import {
  CheckCircle2,
  Crosshair,
  Loader2,
  MapPin,
  Navigation,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import LocationInfoDialog from "@/components/layout/dashboard/location/LocationInfoDialog";
import LocationMapClient from "@/components/layout/dashboard/location/LocationMapClient";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useLiveLocation } from "@/hooks";
import type { ILiveLocation } from "@/types/location.type";

const MyLocationPage = () => {
  const { resolvedTheme } = useTheme();

  const [location, setLocation] = useState<ILiveLocation | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const { mutate: generateLocation, isPending } = useLiveLocation();

  const isDark = resolvedTheme === "dark";

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.add({
        title: "Geolocation is not supported by your browser",
        description: "Geolocation is not supported by your browser.",
        type: "error",
      });
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const payload = {
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        };

        generateLocation(payload, {
          onSuccess: (response) => {
            setLocation(response.data);
            setIsLocating(false);

            toast.add({
              title: "Your location has been updated.",
              description: "Your location has been updated.",
              type: "success",
            });
          },

          onError: (error) => {
            setIsLocating(false);

            const message =
              error instanceof Error
                ? error.message
                : "Unable to generate your location.";

            toast.add({
              title: "Unable to update location.",
              description: message,
              type: "error",
            });
          },
        });
      },

      (error) => {
        setIsLocating(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.add({
              title: "Location permission denied.",
              description:
                "Please allow location access to continue using your current location.",
              type: "error",
            });
            break;

          case error.POSITION_UNAVAILABLE:
            toast.add({
              title: "Location unavailable.",
              description:
                "Your current location is unavailable. Please try again.",
              type: "error",
            });
            break;

          case error.TIMEOUT:
            toast.add({
              title: "Location request timed out.",
              description:
                "The location request took too long. Please try again.",
              type: "error",
            });
            break;

          default:
            toast.add({
              title: "Unable to get location.",
              description:
                "Unable to get your current location. Please try again.",
              type: "error",
            });
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }, [generateLocation]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const coordinates = useMemo(() => {
    if (!location) {
      return null;
    }

    return {
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
    };
  }, [location]);

  const loading = isLocating || isPending;

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 size-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute -right-32 top-32 size-96 rounded-full bg-blue-500/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-4" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Location
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              My Location
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              View your current location on the map and generate the latest
              location data for SwiftCourier.
            </p>
          </div>

          <Button
            type="button"
            onClick={requestLocation}
            disabled={loading}
            className="w-full rounded-xl shadow-lg shadow-primary/10 sm:w-auto"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Crosshair className="size-4" />
            )}

            {loading ? "Locating..." : "Locate Me"}
          </Button>
        </div>

        {/* Main card */}
        <section className="overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-2xl shadow-black/[0.04] backdrop-blur-xl dark:shadow-black/20">
          {/* Top status bar */}
          <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="relative flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Navigation className="size-5" />

                {location ? (
                  <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
                ) : null}
              </div>

              <div>
                <p className="text-sm font-semibold">Current Position</p>

                <p className="text-xs text-muted-foreground">
                  {location
                    ? "Location successfully detected"
                    : "Waiting for your location"}
                </p>
              </div>
            </div>

            {location ? (
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                Location Ready
              </div>
            ) : null}
          </div>

          {/* Map */}
          <div className="relative h-[55vh] min-h-[420px] w-full sm:h-[600px]">
            {coordinates ? (
              <LocationMapClient
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
                address={location?.address?.fullAddress}
                isDark={isDark}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted/20">
                <div className="mx-auto flex max-w-sm flex-col items-center px-6 text-center">
                  <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                    {loading ? (
                      <Loader2 className="size-7 animate-spin" />
                    ) : (
                      <MapPin className="size-7" />
                    )}
                  </div>

                  <h2 className="text-lg font-semibold">
                    {loading
                      ? "Finding your location..."
                      : "Location not available"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {loading
                      ? "Please allow location access. We are finding your current position."
                      : "Click the Locate Me button to detect your current position."}
                  </p>

                  {!loading ? (
                    <Button
                      type="button"
                      onClick={requestLocation}
                      className="mt-5 rounded-xl"
                    >
                      <Crosshair className="size-4" />
                      Locate Me
                    </Button>
                  ) : null}
                </div>
              </div>
            )}

            {/* Map floating location button */}
            {location ? (
              <div className="absolute bottom-4 left-4 z-[400] sm:bottom-6 sm:left-6">
                <Button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  className="rounded-2xl bg-background/95 text-foreground shadow-xl backdrop-blur-md hover:bg-background"
                  variant="outline"
                >
                  <MapPin className="size-4 text-blue-500" />
                  <span className="hidden sm:inline">Location Details</span>
                  <span className="sm:hidden">Details</span>
                </Button>
              </div>
            ) : null}

            {/* Map refresh control */}
            {location ? (
              <div className="absolute right-4 top-4 z-[400] sm:right-6 sm:top-6">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={requestLocation}
                  disabled={loading}
                  className="size-10 rounded-xl bg-background/95 shadow-xl backdrop-blur-md"
                  aria-label="Refresh location"
                >
                  <RefreshCw
                    className={`size-4 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            ) : null}
          </div>

          {/* Location details footer */}
          {location ? (
            <div className="grid gap-px border-t border-border/60 bg-border/50 sm:grid-cols-3">
              <div className="bg-card p-5">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  <span className="text-xs font-medium">Address</span>
                </div>

                <p className="line-clamp-2 text-sm font-medium">
                  {location.address?.fullAddress || "Address unavailable"}
                </p>
              </div>

              <div className="bg-card p-5">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Navigation className="size-4" />
                  <span className="text-xs font-medium">Coordinates</span>
                </div>

                <p className="font-mono text-xs leading-6">
                  {Number(location.latitude).toFixed(6)}
                  <br />
                  {Number(location.longitude).toFixed(6)}
                </p>
              </div>

              <div className="bg-card p-5">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="size-4" />
                  <span className="text-xs font-medium">Location Status</span>
                </div>

                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {location.status}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Last updated{" "}
                  {new Date(location.updatedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </div>

      <LocationInfoDialog
        location={location}
        open={showInfo}
        onOpenChange={setShowInfo}
      />
    </main>
  );
};

export default MyLocationPage;
