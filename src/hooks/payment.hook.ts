import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createPaymentCheckout, getAllPayments } from "@/api";
import type { IPaymentQuery } from "@/types/payment.type";

export function useCreatePaymentCheckout() {
  return useMutation({
    mutationFn: ({ shipmentId }: { shipmentId: string }) =>
      createPaymentCheckout(shipmentId),
  });
}

export function useGetSuspenseAllPayments(params: IPaymentQuery) {
  return useSuspenseQuery({
    queryKey: ["payments", params],
    queryFn: () => getAllPayments(params),
  });
}
