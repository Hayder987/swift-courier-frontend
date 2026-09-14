"use client";

import dynamic from "next/dynamic";

const Public3DScene = dynamic(() => import("./Public3DScene"), {
  ssr: false,
  loading: () => null,
});

export default function Public3DBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      <div className="absolute left-[15%] top-[12%] h-[420px] w-[420px] rounded-full bg-[#e50914]/[0.035] blur-[120px] dark:bg-[#e50914]/[0.07]" />

      <div className="absolute bottom-[5%] right-[10%] h-[380px] w-[380px] rounded-full bg-[#e50914]/[0.025] blur-[120px] dark:bg-[#e50914]/[0.05]" />

      <div className="absolute inset-0 opacity-80 dark:opacity-100">
        <Public3DScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/45 to-background/80 dark:from-background/25 dark:via-background/10 dark:to-background/35" />

      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}
