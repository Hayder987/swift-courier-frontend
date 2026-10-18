"use client";

import type { IAIToolResult } from "@/types/ai-assistant.type";

export function AIChatResultCard({ result }: { result: IAIToolResult }) {
  if (result.kind === "tracking" && result.found) {
    return (
      <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3 text-xs dark:border-white/10 dark:bg-slate-900">
        <p className="font-bold text-slate-800 dark:text-white">
          📦 {result.parcelName}
        </p>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Tracking: <span className="font-mono">{result.trackingNumber}</span>
        </p>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Status:{" "}
          <span className="font-semibold text-[#e50914]">{result.status}</span>
        </p>
        {result.pickupZone && result.deliveryZone && (
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            {result.pickupZone} → {result.deliveryZone}
          </p>
        )}
        {result.statusTimeline && result.statusTimeline.length > 0 && (
          <ul className="mt-2 space-y-1 border-t border-slate-100 pt-2 dark:border-white/10">
            {result.statusTimeline.slice(0, 4).map((t) => (
              <li
                key={`${t.at}-${t.status}`}
                className="text-slate-500 dark:text-slate-400"
              >
                <span className="font-semibold">{t.status}</span> —{" "}
                {new Date(t.at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (result.kind === "pricing" && result.success) {
    return (
      <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3 text-xs dark:border-white/10 dark:bg-slate-900">
        <p className="font-bold text-slate-800 dark:text-white">
          💰 Estimated Shipping Cost
        </p>
        {result.weightGM && (
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Weight: {(result.weightGM / 1000).toFixed(2)} kg
          </p>
        )}
        {result.distanceKm && (
          <p className="text-slate-500 dark:text-slate-400">
            Distance: {result.distanceKm} km
          </p>
        )}
        {result.serviceCharge && (
          <p className="text-slate-500 dark:text-slate-400">
            Service charge: {result.serviceCharge} BDT
          </p>
        )}
        <p className="mt-2 text-base font-black text-[#e50914]">
          {result.amountBDT} BDT
        </p>
        {result.note && (
          <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
            {result.note}
          </p>
        )}
      </div>
    );
  }

  return null;
}
