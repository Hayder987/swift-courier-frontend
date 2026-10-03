import apiClient from "@/lib/apiClient";

export function createPaymentCheckout(shipmentId: string) {
  return apiClient("/payments/create", {
    method: "POST",
    body: { shipmentId },
  });
}
