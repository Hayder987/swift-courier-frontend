"use client";

import type { ReactNode } from "react";

import GoogleAuthProvider from "./google-auth.provider";
import QueryProvider from "./query.provider";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </GoogleAuthProvider>
  );
}
