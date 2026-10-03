import { useMutation } from "@tanstack/react-query";
import { createPaymentCheckout } from "@/api";

export function useCreatePaymentCheckout() {
  return useMutation({
    mutationFn: ({ shipmentId }: { shipmentId: string }) =>
      createPaymentCheckout(shipmentId),
  });
}
