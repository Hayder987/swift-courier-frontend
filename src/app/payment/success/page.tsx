"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Home,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main className="relative flex min-h-[calc(100vh-1px)] items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] sm:size-96" />
        <div className="absolute bottom-0 left-0 size-64 rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute right-0 top-0 size-64 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden rounded-3xl border-border/60 bg-background/80 shadow-2xl shadow-primary/5 backdrop-blur-xl">
            <CardContent className="px-5 py-10 sm:px-10 sm:py-14">
              {/* Success Icon */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />

                  <div className="relative flex size-24 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 sm:size-28">
                    <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 sm:size-20">
                      <Check className="size-9 stroke-[2.5] sm:size-11" />
                    </div>
                  </div>

                  <Sparkles className="absolute -right-2 -top-2 size-5 text-emerald-500" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="mt-8 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  Payment Successful
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Payment completed
                  <span className="text-primary"> successfully.</span>
                </h1>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                  Your shipment payment has been received. Your parcel is now
                  ready for the next step in its delivery journey.
                </p>
              </div>

              {/* Status */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Package className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Shipment</p>
                      <p className="text-sm font-semibold">Payment confirmed</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="size-5" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Payment</p>
                      <p className="text-sm font-semibold">Secure & verified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session */}
              {sessionId && (
                <div className="mt-4 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-3">
                  <p className="truncate text-center text-[11px] text-muted-foreground">
                    Transaction session: {sessionId}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/customer-dashboard/my-shipment">
                  <Button size="lg" className="h-12 flex-1 rounded-xl gap-2">
                    <Package className="size-4" />
                    My Shipments
                    <ArrowRight className="ml-auto size-4" />
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 flex-1 rounded-xl gap-2"
                  >
                    <Home className="size-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Thank you for choosing{" "}
                <span className="font-semibold text-foreground">
                  SwiftCourier
                </span>
                .
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </main>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
