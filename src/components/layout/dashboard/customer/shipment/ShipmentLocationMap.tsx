"use client";

import L from "leaflet";
import { Crosshair, LocateFixed, MapPin, Navigation } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLiveLocation } from "@/hooks/location.hook";

interface ShipmentLocationMapProps {
  latitude: string;
  longitude: string;
  isLocating: boolean;
  locationSource: "live" | "manual" | null;
  onLocate: () => void;
  onMapLocationChange: (latitude: string, longitude: string) => void;
}

interface MapClickHandlerProps {
  onLocationChange: (latitude: string, longitude: string) => void;
}

interface RecenterMapProps {
  latitude: number;
  longitude: number;
}

interface LocationAddress {
  city?: string;
  road?: string;
  state?: string;
  country?: string;
  district?: string;
  postcode?: string;
  fullAddress?: string;
}

const DEFAULT_LATITUDE = 24.0064;
const DEFAULT_LONGITUDE = 89.2372;

const createPickupIcon = (source: "live" | "manual") => {
  const isLive = source === "live";

  return L.divIcon({
    className: "swiftcourier-pickup-marker",

    html: `
      <div class="swiftcourier-marker-wrapper">
        ${isLive ? '<div class="swiftcourier-marker-pulse"></div>' : ""}

        <div class="swiftcourier-marker-pin ${
          isLive ? "is-live" : "is-manual"
        }">
          <div class="swiftcourier-marker-inner">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/>
              <circle cx="12" cy="10" r="2.5"/>
            </svg>
          </div>
        </div>
      </div>
    `,

    iconSize: [48, 58],
    iconAnchor: [24, 56],
    popupAnchor: [0, -52],
  });
};

const MapClickHandler = ({ onLocationChange }: MapClickHandlerProps) => {
  useMapEvents({
    click(event) {
      onLocationChange(
        event.latlng.lat.toFixed(7),
        event.latlng.lng.toFixed(7),
      );
    },
  });

  return null;
};

const RecenterMap = ({ latitude, longitude }: RecenterMapProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], Math.max(map.getZoom(), 15), {
      animate: true,
      duration: 0.8,
    });
  }, [latitude, longitude, map]);

  return null;
};

const ShipmentLocationMap = ({
  latitude,
  longitude,
  isLocating,
  locationSource,
  onLocate,
  onMapLocationChange,
}: ShipmentLocationMapProps) => {
  const [mapReady, setMapReady] = useState(false);

  const [address, setAddress] = useState<LocationAddress | null>(null);

  const [addressLoading, setAddressLoading] = useState(false);

  const { mutate: generateLocation } = useLiveLocation();

  const currentLatitude = Number(latitude) || DEFAULT_LATITUDE;

  const currentLongitude = Number(longitude) || DEFAULT_LONGITUDE;

  const hasLocation = Boolean(latitude && longitude);

  const pickupIcon = useMemo(
    () => createPickupIcon(locationSource ?? "manual"),
    [locationSource],
  );

  useEffect(() => {
    if (!latitude || !longitude) {
      setAddress(null);
      return;
    }

    const latitudeValue = Number(latitude);
    const longitudeValue = Number(longitude);

    if (!Number.isFinite(latitudeValue) || !Number.isFinite(longitudeValue)) {
      setAddress(null);
      return;
    }

    setAddressLoading(true);

    generateLocation(
      {
        latitude,
        longitude,
      },
      {
        onSuccess: (response) => {
          if (!response.success || !response.data) {
            setAddress(null);
            setAddressLoading(false);
            return;
          }

          setAddress(response.data.address ?? null);
          setAddressLoading(false);
        },

        onError: () => {
          setAddress(null);
          setAddressLoading(false);
        },
      },
    );
  }, [latitude, longitude, generateLocation]);

  // Manual map location change.

  const handleMapLocationChange = (
    nextLatitude: string,
    nextLongitude: string,
  ) => {
    setAddress(null);

    onMapLocationChange(nextLatitude, nextLongitude);
  };

  // Resolve the best available address text.

  const formattedAddress =
    address?.fullAddress ||
    [
      address?.road,
      address?.city,
      address?.district,
      address?.state,
      address?.postcode,
      address?.country,
    ]
      .filter(Boolean)
      .join(", ");

  return (
    <Card className="relative h-[90vh] min-h-160 overflow-hidden rounded-3xl border-border/60 bg-card shadow-2xl shadow-black/10 dark:shadow-black/30">
      {/* Map */}
      <MapContainer
        center={[currentLatitude, currentLongitude]}
        zoom={hasLocation ? 16 : 12}
        scrollWheelZoom
        zoomControl={false}
        className="absolute inset-0 z-0 size-full"
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onLocationChange={handleMapLocationChange} />

        {hasLocation && (
          <>
            <Marker
              position={[currentLatitude, currentLongitude]}
              icon={pickupIcon}
            >
              {/* Pin Tooltip */}
              <Tooltip
                direction="top"
                offset={[0, -48]}
                opacity={1}
                permanent={false}
                className="swiftcourier-location-tooltip"
              >
                <div className="min-w-52">
                  <p className="mb-1 text-xs font-bold">Pickup Location</p>

                  <p className="text-[10px] opacity-70">
                    {locationSource === "live"
                      ? "Current live location"
                      : "Manually selected"}
                  </p>

                  <div className="mt-2 space-y-1.5 text-[10px]">
                    <div className="grid grid-cols-[65px_1fr] gap-2">
                      <span className="opacity-60">Latitude</span>

                      <strong>{currentLatitude.toFixed(6)}</strong>
                    </div>

                    <div className="grid grid-cols-[65px_1fr] gap-2">
                      <span className="opacity-60">Longitude</span>

                      <strong>{currentLongitude.toFixed(6)}</strong>
                    </div>

                    <div className="border-t border-border/50 pt-1.5">
                      <span className="block opacity-60">Address</span>

                      <strong className="mt-0.5 block leading-4">
                        {addressLoading
                          ? "Loading address..."
                          : formattedAddress || "Address unavailable"}
                      </strong>
                    </div>
                  </div>
                </div>
              </Tooltip>

              {/* Popup */}
              <Popup>
                <div className="min-w-55">
                  <p className="text-sm font-bold">Pickup location</p>

                  <p className="mt-1 text-xs text-gray-500">
                    {locationSource === "live"
                      ? "Detected from your live location"
                      : "Selected manually from the map"}
                  </p>

                  <div className="mt-3 space-y-1.5 text-xs">
                    <p>
                      <strong>Lat:</strong> {currentLatitude.toFixed(7)}
                    </p>

                    <p>
                      <strong>Lng:</strong> {currentLongitude.toFixed(7)}
                    </p>

                    <div className="border-t border-gray-200 pt-2">
                      <p className="font-semibold">Address</p>

                      <p className="mt-1 leading-4 text-gray-500">
                        {addressLoading
                          ? "Loading address..."
                          : formattedAddress || "Address unavailable"}
                      </p>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Live location circle */}
            {locationSource === "live" && (
              <CircleMarker
                center={[currentLatitude, currentLongitude]}
                radius={20}
                pathOptions={{
                  color: "#2563eb",
                  fillColor: "#3b82f6",
                  fillOpacity: 0.08,
                  weight: 1,
                  opacity: 0.35,
                }}
              />
            )}
          </>
        )}

        {hasLocation && (
          <RecenterMap
            latitude={currentLatitude}
            longitude={currentLongitude}
          />
        )}
      </MapContainer>

      {/* Top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-black/45 via-black/10 to-transparent" />

      {/* Header */}
      <div className="absolute top-4 right-4 left-4 z-20 flex items-start justify-between gap-3">
        <div className="rounded-2xl border border-white/15 bg-black/65 px-4 py-3 text-white shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#e50914] shadow-lg shadow-[#e50914]/30">
              <MapPin className="size-4" />
            </div>

            <div>
              <p className="text-xs font-black tracking-tight">
                Pickup location
              </p>

              <p className="mt-0.5 text-[10px] text-white/60">
                Click anywhere on the map to change
              </p>
            </div>
          </div>
        </div>

        {/* Animated live location button */}
        <Button
          type="button"
          onClick={onLocate}
          disabled={isLocating}
          className="relative h-11 overflow-hidden rounded-xl border border-white/20 bg-blue-600 px-4 font-bold text-white shadow-xl shadow-blue-950/30 transition-all hover:bg-blue-700"
        >
          {!isLocating && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="size-9 animate-ping rounded-full bg-blue-400/30" />
            </span>
          )}

          <span className="relative flex items-center gap-2">
            {isLocating ? (
              <LocateFixed className="size-4 animate-spin" />
            ) : (
              <Navigation className="size-4" />
            )}

            <span className="hidden sm:inline">
              {isLocating ? "Locating..." : "Use my location"}
            </span>
          </span>
        </Button>
      </div>

      {/* Instruction */}
      <div className="absolute top-24 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[10px] font-semibold text-white shadow-xl backdrop-blur-xl">
          <Crosshair className="size-3.5 text-blue-400" />

          <span>
            {hasLocation
              ? "Click the map to change pickup point"
              : "Getting your location..."}
          </span>
        </div>
      </div>

      {/* Bottom live-location panel */}
      <div className="absolute right-4 bottom-4 left-4 z-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-black/70 px-4 py-3 text-white shadow-2xl backdrop-blur-2xl sm:px-5">
          <div className="flex items-start gap-3">
            {/* Location icon */}
            <div className="relative mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
              <span className="absolute size-5 animate-ping rounded-full bg-blue-400/20" />

              <LocateFixed className="relative size-4" />
            </div>

            {/* Location information */}
            <div className="min-w-0 flex-1">
              {/* Title */}
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold">
                  {locationSource === "live"
                    ? "Live location"
                    : locationSource === "manual"
                      ? "Manual pickup point"
                      : "Pickup location"}
                </p>

                {locationSource === "live" && (
                  <span className="flex items-center gap-1 text-[8px] font-bold tracking-wider text-emerald-400 uppercase">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>
                )}

                {locationSource === "manual" && (
                  <span className="rounded-full bg-[#e50914]/15 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-[#ff5962] uppercase">
                    Manual
                  </span>
                )}
              </div>

              {/* Coordinates */}
              {hasLocation ? (
                <div className="mt-2 grid gap-1.5 text-[10px] sm:grid-cols-2 sm:gap-x-6">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">Latitude</span>

                    <span className="font-semibold text-white/80">
                      {currentLatitude.toFixed(6)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-white/40">Longitude</span>

                    <span className="font-semibold text-white/80">
                      {currentLongitude.toFixed(6)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-[10px] text-white/50">
                  No pickup location selected
                </p>
              )}

              {/* Address */}
              {hasLocation && (
                <div className="mt-2 border-t border-white/10 pt-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-3 shrink-0 text-[#e50914]" />

                    <div className="min-w-0">
                      <p className="text-[8px] font-semibold tracking-wider text-white/40 uppercase">
                        Address
                      </p>

                      <p className="mt-0.5 text-[10px] leading-4 text-white/75">
                        {addressLoading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="size-2 animate-pulse rounded-full bg-blue-400" />
                            Getting address...
                          </span>
                        ) : (
                          formattedAddress || "Address unavailable"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right status */}
            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-[9px] font-semibold text-white/40">
                Pickup coordinates
              </p>

              <p className="mt-0.5 text-[10px] text-white/70">
                {locationSource === "manual"
                  ? "Manually selected"
                  : locationSource === "live"
                    ? "GPS detected"
                    : "Waiting"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map loading overlay */}
      {!mapReady && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="size-10 animate-spin rounded-full border-2 border-muted border-t-[#e50914]" />

            <p className="text-xs font-semibold text-muted-foreground">
              Loading map...
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ShipmentLocationMap;
