import apiClient from "@/lib/apiClient";
import type { ICreateZonePayload } from "@/validation/zone.validation";

export function createZone(payload: ICreateZonePayload) {
  return apiClient("/zones", {
    method: "POST",
    body: payload,
  });
}
