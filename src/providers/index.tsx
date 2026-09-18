"use client";

import type { ReactNode } from "react";

import GoogleAuthProvider from "./google-auth.provider";
import QueryProvider from "./query.provider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </GoogleAuthProvider>
  );
}
