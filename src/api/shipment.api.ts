import apiClient from "@/lib/apiClient";
import type { IApiResponse } from "@/types/api.type";
import type {
  IShipment,
  IShipmentCreatePayload,
  ShipmentQueryParams,
} from "@/types/shipment.type";
import type { IAdminShipmentStatusUpdate } from "@/validation/shipment.validation";

export function createShipment(payload: IShipmentCreatePayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("ItemsImage", payload.ItemsImage);

  return apiClient("/shipments", { method: "POST", body: formData });
}

export function getAdminShipment(params: ShipmentQueryParams) {
  return apiClient<IApiResponse<IShipment[]>>("/shipments", {
    params,
  });
}

export function getMyShipment(params: ShipmentQueryParams) {
  return apiClient<IApiResponse<IShipment[]>>("/shipments/my-shipments", {
    params,
  });
}

export function updateAdminShipment(
  payload: IAdminShipmentStatusUpdate,
  shipmentId: string,
) {
  return apiClient(`/shipments/admin-status/${shipmentId}`, {
    method: "PATCH",
    body: payload,
  });
}

export function assignCourier(shipmentId: string) {
  return apiClient(`/shipments/assign/${shipmentId}`, {
    method: "PATCH",
  });
}
