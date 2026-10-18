"use client";

const SUGGESTIONS = [
  { label: "Track a Shipment", value: "Track my shipment" },
  {
    label: "Estimate Shipping Cost",
    value: "How much to send a 2 kg parcel from Dhaka to Pabna?",
  },
  { label: "Delivery Services", value: "What delivery services do you offer?" },
  { label: "FAQs", value: "How can I become a courier?" },
];

export function AIChatSuggestions({
  onPick,
}: {
  onPick: (text: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 px-3 pb-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s.label}
          type="button"
          onClick={() => onPick(s.value)}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-[#e50914]/40 hover:text-[#e50914] dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
