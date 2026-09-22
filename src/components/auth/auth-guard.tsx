"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import LoadingScreen from "../loading/LoadingScreen";
import { ReactNode, useEffect } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { data, isPending, isError } = useGetMe();

  const user = data?.data?.user;

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router]);

  if (isPending) {
    return (
      <LoadingScreen
        label="Signing you in"
        description="Securely connecting your SwiftCourier account."
      />
    );
  }

  if (isError || !user) {
    return (
      <LoadingScreen
        label="Redirecting..."
        description="Securely connecting your SwiftCourier account."
      />
    );
  }

  return <>{children}</>;
}
