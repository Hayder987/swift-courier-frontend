import apiClient from "@/lib/apiClient";
import type { IShipmentCreatePayload } from "@/types/shipment.type";

export function createShipment(payload: IShipmentCreatePayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("ItemsImage", payload.ItemsImage);

  return apiClient("/shipments", { method: "POST", body: formData });
}
