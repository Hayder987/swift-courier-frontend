"use client";

import { useQueryClient } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FetchError } from "ofetch";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCreatePaymentCheckout } from "@/hooks/payment.hook";

interface PaymentButtonProps {
  shipmentId: string;
}

const PaymentButton = ({ shipmentId }: PaymentButtonProps) => {
  const { mutate: payment, isPending } = useCreatePaymentCheckout();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handlePayment = () => {
    payment(
      { shipmentId },
      {
        onSuccess: (data) => {
          router.push(data?.data?.checkoutUrl);
          queryClient.invalidateQueries({
            queryKey: ["adminShipments", "myShipments"],
          });
        },
        onError: (error: FetchError) => {
          const errorMessage =
            error.data?.message ??
            error.data?.errors?.[0]?.message ??
            error.message ??
            "Unable to create your Payment. Please try again.";

          toast.add({
            title: "Something Went Wrong",
            description: errorMessage,
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isPending}
      className="gap-2 rounded-lg"
    >
      <CreditCard className="size-4" />
      {isPending ? "Processing..." : "Make Payment"}
    </Button>
  );
};

export default PaymentButton;
