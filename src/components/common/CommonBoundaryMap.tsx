"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Polygon,
  TileLayer,
  useMap,
} from "react-leaflet";

interface CommonBoundaryMapProps {
  boundary: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
  latitude: string | number;
  longitude: string | number;
  className?: string;
}

const MapAutoFit = ({ positions }: { positions: [number, number][] }) => {
  const map = useMap();

  useEffect(() => {
    if (!positions.length) return;

    const bounds = L.latLngBounds(positions);

    map.fitBounds(bounds, {
      padding: [30, 30],
      maxZoom: 13,
    });
  }, [map, positions]);

  return null;
};

const CommonBoundaryMap = ({
  boundary,
  latitude,
  longitude,
  className,
}: CommonBoundaryMapProps) => {
  const polygon = boundary.coordinates?.[0] ?? [];

  // GeoJSON: [longitude, latitude]
  // Leaflet: [latitude, longitude]
  const positions: [number, number][] = polygon.map(([lng, lat]) => [lat, lng]);

  const center: [number, number] = [Number(latitude), Number(longitude)];

  if (!positions.length) {
    return (
      <div
        className={`flex min-h-80 items-center justify-center rounded-2xl border border-border/60 bg-muted/20 ${className ?? ""}`}
      >
        <p className="text-sm text-muted-foreground">
          Boundary coordinates are not available.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-80 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 ${className ?? ""}`}
    >
      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom
        className="z-0 h-full min-h-80 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapAutoFit positions={positions} />

        <Polygon
          positions={positions}
          pathOptions={{
            color: "#e50914",
            fillColor: "#e50914",
            fillOpacity: 0.16,
            weight: 2.5,
          }}
        />

        <CircleMarker
          center={center}
          radius={7}
          pathOptions={{
            color: "#ffffff",
            weight: 3,
            fillColor: "#e50914",
            fillOpacity: 1,
          }}
        />
      </MapContainer>

      <div className="pointer-events-none absolute left-3 top-3 z-10">
        <div className="rounded-xl border border-white/20 bg-background/85 px-3 py-2 shadow-lg backdrop-blur-xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Zone Boundary
          </p>

          <p className="mt-0.5 text-xs font-semibold">
            {positions.length} boundary points
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommonBoundaryMap;
