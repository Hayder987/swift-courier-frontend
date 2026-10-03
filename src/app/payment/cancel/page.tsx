"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Home,
  Package,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <main className="relative flex min-h-[calc(100vh-1px)] items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 size-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px] sm:size-96" />
        <div className="absolute bottom-0 right-0 size-64 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden rounded-3xl border-border/60 bg-background/80 shadow-2xl shadow-primary/5 backdrop-blur-xl">
            <CardContent className="px-5 py-10 sm:px-10 sm:py-14">
              {/* Cancel Icon */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl" />

                  <div className="relative flex size-24 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 sm:size-28">
                    <div className="flex size-16 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/30 sm:size-20">
                      <CreditCard className="size-8 sm:size-10" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="mt-8 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <ShieldAlert className="size-3.5" />
                  Payment Cancelled
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Payment was
                  <span className="text-primary"> not completed.</span>
                </h1>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                  Your payment process was cancelled or interrupted. No
                  successful payment was recorded for this checkout session.
                </p>
              </div>

              {/* Info */}
              <div className="mt-8 rounded-2xl border border-border/60 bg-muted/40 p-5">
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <RotateCcw className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">You can try again</h2>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Your shipment is still available. Go to your shipments and
                      continue the payment whenever you're ready.
                    </p>
                  </div>
                </div>
              </div>

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
                Need help? You can review your shipment status from your
                dashboard.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default PaymentCancelPage;
