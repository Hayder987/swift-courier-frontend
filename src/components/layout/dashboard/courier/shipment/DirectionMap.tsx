"use client";

import L from "leaflet";
import { useTheme } from "next-themes";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LocationPoint {
  latitude: number;
  longitude: number;
}

interface DirectionMapProps {
  courierLocation: LocationPoint;
  destination: LocationPoint;
  destinationLabel: string;
}

/* -------------------------------------------------------------------------- */
/*                                Map Icons                                   */
/* -------------------------------------------------------------------------- */

const courierIcon = L.divIcon({
  className: "swiftcourier-courier-marker",
  html: `
    <div class="relative flex size-12 items-center justify-center">
      <div
        class="absolute size-12 animate-ping rounded-full bg-blue-500/20"
      ></div>

      <div
        class="absolute size-10 rounded-full border border-blue-500/30 bg-blue-500/10"
      ></div>

      <div
        class="absolute size-8 rounded-full border-[3px] border-white bg-blue-600 shadow-[0_4px_24px_rgba(37,99,235,0.60)]"
      ></div>

      <div
        class="relative z-10 size-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
      ></div>
    </div>
  `,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
});

const destinationIcon = L.divIcon({
  className: "swiftcourier-destination-marker",
  html: `
    <div
      class="relative flex size-11 items-center justify-center"
    >
      <div
        class="absolute size-11 rounded-full bg-[#e50914]/10 ring-1 ring-[#e50914]/20"
      ></div>

      <div
        class="relative flex size-9 items-center justify-center rounded-full border-[3px] border-white bg-[#181818] shadow-[0_6px_22px_rgba(0,0,0,0.45)]"
      >
        <div
          class="size-3.5 rounded-full bg-[#e50914] shadow-[0_0_14px_rgba(229,9,20,0.9)]"
        ></div>
      </div>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -22],
});

/* -------------------------------------------------------------------------- */
/*                              Map Controller                                */
/* -------------------------------------------------------------------------- */

function FitMapBounds({
  courierLocation,
  destination,
}: {
  courierLocation: LocationPoint;
  destination: LocationPoint;
}) {
  const map = useMap();

  useEffect(() => {
    const courier = L.latLng(
      courierLocation.latitude,
      courierLocation.longitude,
    );

    const target = L.latLng(destination.latitude, destination.longitude);

    const bounds = L.latLngBounds(courier, target);

    map.fitBounds(bounds, {
      paddingTopLeft: [80, 80],
      paddingBottomRight: [80, 90],
      maxZoom: 15,
      animate: true,
      duration: 0.8,
    });

    const timer = window.setTimeout(() => {
      map.invalidateSize({
        animate: true,
      });
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [courierLocation, destination, map]);

  return null;
}

/* -------------------------------------------------------------------------- */
/*                            Map Controls                                    */
/* -------------------------------------------------------------------------- */

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    const container = map.getContainer();

    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}

/* -------------------------------------------------------------------------- */
/*                              Main Map                                      */
/* -------------------------------------------------------------------------- */

const DirectionMap = ({
  courierLocation,
  destination,
  destinationLabel,
}: DirectionMapProps) => {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const courierPosition: [number, number] = useMemo(
    () => [courierLocation.latitude, courierLocation.longitude],
    [courierLocation.latitude, courierLocation.longitude],
  );

  const destinationPosition: [number, number] = useMemo(
    () => [destination.latitude, destination.longitude],
    [destination.latitude, destination.longitude],
  );

  return (
    <div className="group relative isolate w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-[0_18px_60px_rgba(0,0,0,0.14)]">
      {/* ------------------------------------------------------------------ */}
      {/* Map                                                                */}
      {/* ------------------------------------------------------------------ */}

      <MapContainer
        center={courierPosition}
        zoom={13}
        scrollWheelZoom
        zoomControl
        attributionControl
        preferCanvas
        className={`
          swiftcourier-map
          h-[42vh]
          min-h-80
          max-h-145
          w-full

          sm:h-[46vh]
          sm:min-h-87.5

          lg:h-[52vh]
          lg:min-h-100

          xl:h-[55vh]
          xl:max-h-150

          ${isDark ? "swiftcourier-dark-map" : ""}
        `}
      >
        {/* -------------------------------------------------------------- */}
        {/* OpenStreetMap Tiles                                            */}
        {/* -------------------------------------------------------------- */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          detectRetina
        />

        <FitMapBounds
          courierLocation={courierLocation}
          destination={destination}
        />

        <MapResizeHandler />

        {/* -------------------------------------------------------------- */}
        {/* Route Glow                                                     */}
        {/* -------------------------------------------------------------- */}

        <Polyline
          positions={[courierPosition, destinationPosition]}
          pathOptions={{
            color: "#e50914",
            weight: 14,
            opacity: isDark ? 0.16 : 0.1,
            lineCap: "round",
            lineJoin: "round",
          }}
        />

        {/* -------------------------------------------------------------- */}
        {/* Main Route                                                     */}
        {/* -------------------------------------------------------------- */}

        <Polyline
          positions={[courierPosition, destinationPosition]}
          pathOptions={{
            color: "#e50914",
            weight: 5,
            opacity: 0.92,
            dashArray: "10 10",
            lineCap: "round",
            lineJoin: "round",
          }}
        />

        {/* -------------------------------------------------------------- */}
        {/* Courier Marker                                                 */}
        {/* -------------------------------------------------------------- */}

        <Marker
          position={courierPosition}
          icon={courierIcon}
          zIndexOffset={1000}
        >
          <Tooltip direction="top" offset={[0, -22]} opacity={1}>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#e50914]" />
              <span className="font-medium">Courier Live Location</span>
            </div>
          </Tooltip>
        </Marker>

        {/* -------------------------------------------------------------- */}
        {/* Destination Marker                                             */}
        {/* -------------------------------------------------------------- */}

        <Marker
          position={destinationPosition}
          icon={destinationIcon}
          zIndexOffset={900}
        >
          <Tooltip direction="top" offset={[0, -20]} opacity={1}>
            <div className="flex max-w-55 items-center gap-2">
              <span className="size-2 rounded-full bg-[#e50914]" />
              <span className="font-medium">{destinationLabel}</span>
            </div>
          </Tooltip>
        </Marker>
      </MapContainer>

      {/* ------------------------------------------------------------------ */}
      {/* Top Left Live Badge                                               */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute left-3 top-3 z-[500] sm:left-4 sm:top-4">
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </span>

          <span>Live tracking</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Top Right Status                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute right-3 top-3 z-[500] sm:right-4 sm:top-4">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-medium text-white/90 shadow-lg backdrop-blur-xl">
          <span className="size-1.5 rounded-full bg-[#e50914]" />
          <span className="hidden sm:inline">Real-time direction</span>
          <span className="sm:hidden">Live</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom Legend                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] sm:bottom-4 sm:left-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/70 px-3 py-2 text-[10px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:gap-4 sm:px-4">
          {/* Courier */}

          <div className="flex items-center gap-1.5">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#e50914]/50" />
              <span className="relative size-2.5 rounded-full bg-[#e50914]" />
            </span>

            <span>Courier</span>
          </div>

          <div className="h-3 w-px bg-white/20" />

          {/* Destination */}

          <div className="flex items-center gap-1.5">
            <span className="flex size-2.5 items-center justify-center rounded-full border border-white bg-[#e50914]">
              <span className="size-1 rounded-full bg-white" />
            </span>

            <span>Destination</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom Right Route Badge                                          */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute bottom-3 right-3 z-[500] sm:bottom-4 sm:right-4">
        <div className="hidden items-center gap-2 rounded-xl border border-white/15 bg-black/65 px-3 py-2 text-[10px] font-medium text-white shadow-lg backdrop-blur-xl sm:flex">
          <span className="h-0.5 w-5 rounded-full bg-[#e50914]" />
          Route
        </div>
      </div>
    </div>
  );
};

export default DirectionMap;
