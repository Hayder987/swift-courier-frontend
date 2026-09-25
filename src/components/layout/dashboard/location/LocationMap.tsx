"use client";

import L from "leaflet";
import { useEffect } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface LocationMapProps {
  latitude: number;
  longitude: number;
  address?: string;
  isDark: boolean;
}

/**
 * Google Maps-style current location marker
 */
const locationIcon = L.divIcon({
  className: "swift-location-marker",
  html: `
    <div class="swift-location-dot">
      <div class="swift-location-pulse"></div>
      <div class="swift-location-core"></div>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

/**
 * Automatically move map to the current location
 */
function RecenterMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude], 16, {
      duration: 1.2,
    });
  }, [latitude, longitude, map]);

  return null;
}

const LocationMap = ({
  latitude,
  longitude,
  address,
  isDark,
}: LocationMapProps) => {
  return (
    <>
      <style jsx global>{`
        /* --------------------------------
         * Current location marker
         * -------------------------------- */

        .swift-location-marker {
          background: transparent !important;
          border: none !important;
        }

        .swift-location-dot {
          position: relative;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .swift-location-core {
          position: relative;
          z-index: 3;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #4285f4;
          border: 4px solid #ffffff;
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.28),
            0 0 0 1px rgba(66, 133, 244, 0.35);
        }

        .swift-location-pulse {
          position: absolute;
          inset: 3px;
          border-radius: 9999px;
          background: rgba(66, 133, 244, 0.2);
          animation: swift-location-pulse 2s ease-out infinite;
        }

        @keyframes swift-location-pulse {
          0% {
            transform: scale(0.7);
            opacity: 0.8;
          }

          70% {
            transform: scale(1.8);
            opacity: 0;
          }

          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        /* --------------------------------
         * Leaflet base
         * -------------------------------- */

        .swift-location-map {
          width: 100%;
          height: 100%;
          font-family: inherit;
          z-index: 0;
          overflow: hidden;
        }

        .leaflet-container {
          width: 100%;
          height: 100%;
          font-family: inherit;
          background: #e5e7eb;
        }

        /* --------------------------------
         * Zoom controls
         * -------------------------------- */

        .leaflet-control-zoom {
          border: 1px solid rgba(148, 163, 184, 0.25) !important;
          border-radius: 14px !important;
          overflow: hidden;
          box-shadow:
            0 8px 30px rgba(0, 0, 0, 0.12) !important;
        }

        .leaflet-control-zoom a {
          width: 38px !important;
          height: 38px !important;
          line-height: 38px !important;
          background: rgba(255, 255, 255, 0.95) !important;
          color: #334155 !important;
          border: none !important;
          transition:
            background-color 0.2s ease,
            color 0.2s ease;
        }

        .leaflet-control-zoom a:hover {
          background: #ffffff !important;
          color: #e50914 !important;
        }

        /* --------------------------------
         * Dark theme controls
         * -------------------------------- */

        .swift-location-map.dark-map
          .leaflet-control-zoom
          a {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #e2e8f0 !important;
        }

        .swift-location-map.dark-map
          .leaflet-control-zoom
          a:hover {
          background: rgba(30, 41, 59, 1) !important;
          color: #f87171 !important;
        }

        /* --------------------------------
         * Popup
         * -------------------------------- */

        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 18px !important;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.18) !important;
        }

        .leaflet-popup-content {
          margin: 0 !important;
        }

        .leaflet-popup-tip {
          box-shadow: none !important;
        }

        .swift-location-popup {
          min-width: 240px;
          padding: 16px;
          background: #ffffff;
          color: #0f172a;
        }

        .dark-map .swift-location-popup {
          background: #0f172a;
          color: #f8fafc;
        }

        .swift-popup-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .swift-popup-icon {
          display: flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(66, 133, 244, 0.1);
          color: #4285f4;
        }

        .swift-popup-title {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.3;
        }

        .swift-popup-subtitle {
          margin-top: 2px;
          font-size: 10px;
          color: #64748b;
        }

        .dark-map .swift-popup-subtitle {
          color: #94a3b8;
        }

        .swift-popup-address {
          margin-bottom: 14px;
          font-size: 12px;
          line-height: 1.6;
          color: #64748b;
        }

        .dark-map .swift-popup-address {
          color: #94a3b8;
        }

        .swift-popup-coordinates {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }

        .swift-popup-coordinate {
          border-radius: 10px;
          background: #f8fafc;
          padding: 9px;
        }

        .dark-map .swift-popup-coordinate {
          background: #1e293b;
        }

        .swift-popup-label {
          margin-bottom: 3px;
          font-size: 10px;
          color: #64748b;
        }

        .dark-map .swift-popup-label {
          color: #94a3b8;
        }

        .swift-popup-value {
          font-family: monospace;
          font-size: 10px;
          font-weight: 600;
        }

        /* --------------------------------
         * Map attribution
         * -------------------------------- */

        .leaflet-control-attribution {
          border-radius: 8px 0 0 0 !important;
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(8px);
          font-size: 9px !important;
        }

        .dark-map .leaflet-control-attribution {
          background: rgba(15, 23, 42, 0.8) !important;
          color: #94a3b8 !important;
        }

        .dark-map .leaflet-control-attribution a {
          color: #cbd5e1 !important;
        }

        /* --------------------------------
         * Dark map
         *
         * No CARTO / Mapbox / Google API.
         * OpenStreetMap tiles + CSS filter.
         * -------------------------------- */

        .dark-map .leaflet-tile-pane {
          filter:
            brightness(0.72)
            contrast(1.08)
            saturate(0.75)
            hue-rotate(5deg);
        }

        /* --------------------------------
         * Mobile popup
         * -------------------------------- */

        @media (max-width: 640px) {
          .swift-location-popup {
            min-width: 210px;
          }

          .leaflet-control-zoom {
            margin-right: 10px !important;
            margin-bottom: 10px !important;
          }

          .leaflet-control-zoom a {
            width: 36px !important;
            height: 36px !important;
            line-height: 36px !important;
          }
        }
      `}</style>

      <div className={`swift-location-map ${isDark ? "dark-map" : ""}`}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={16}
          minZoom={3}
          maxZoom={19}
          zoomControl
          scrollWheelZoom
          dragging
          doubleClickZoom
          touchZoom
          keyboard
          className="h-full w-full"
        >
          {/* 
            API key is NOT required.
            OpenStreetMap public tile server.
          */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />

          <RecenterMap latitude={latitude} longitude={longitude} />

          {/* Google Maps-style accuracy area */}
          <Circle
            center={[latitude, longitude]}
            radius={80}
            pathOptions={{
              color: "#4285f4",
              fillColor: "#4285f4",
              fillOpacity: 0.12,
              weight: 1.5,
            }}
          />

          {/* Current location */}
          <Marker position={[latitude, longitude]} icon={locationIcon}>
            <Popup closeButton autoPan maxWidth={300}>
              <div className="swift-location-popup">
                <div className="swift-popup-header">
                  <div className="swift-popup-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
                    </svg>
                  </div>

                  <div>
                    <div className="swift-popup-title">
                      Your Current Location
                    </div>

                    <div className="swift-popup-subtitle">
                      SwiftCourier Live Location
                    </div>
                  </div>
                </div>

                {address ? (
                  <div className="swift-popup-address">{address}</div>
                ) : null}

                <div className="swift-popup-coordinates">
                  <div className="swift-popup-coordinate">
                    <div className="swift-popup-label">Latitude</div>

                    <div className="swift-popup-value">
                      {latitude.toFixed(6)}
                    </div>
                  </div>

                  <div className="swift-popup-coordinate">
                    <div className="swift-popup-label">Longitude</div>

                    <div className="swift-popup-value">
                      {longitude.toFixed(6)}
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default LocationMap;
