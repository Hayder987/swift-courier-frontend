import apiClient from "@/lib/apiClient";
import type { IApiResponse } from "@/types/api.type";
import type { IPayment, IPaymentQuery } from "@/types/payment.type";

export function createPaymentCheckout(shipmentId: string) {
  return apiClient("/payments/create", {
    method: "POST",
    body: { shipmentId },
  });
}

export function getAllPayments(params: IPaymentQuery) {
  return apiClient<IApiResponse<IPayment[]>>("/payments/all-payments", {
    params,
  });
}
