"use client";

import dynamic from "next/dynamic";

import type { ComponentProps } from "react";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted/40">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Loading map...
      </div>
    </div>
  ),
});

const LocationMapClient = (props: ComponentProps<typeof LocationMap>) => {
  return <LocationMap {...props} />;
};

export default LocationMapClient;
