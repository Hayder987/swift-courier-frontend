import apiClient from "@/lib/apiClient";
import type { IApiResponse } from "@/types/api.type";
import type {
  GetAllZonesParams,
  ISingleZone,
  IUpdateZonePayload,
} from "@/types/zone.type";
import type { ICreateZonePayload } from "@/validation/zone.validation";

export function createZone(payload: ICreateZonePayload) {
  return apiClient("/zones", {
    method: "POST",
    body: payload,
  });
}

export function getAllZones(params: GetAllZonesParams) {
  return apiClient<IApiResponse<ISingleZone[]>>("zones", {
    params,
  });
}

export function updateZone(payload: IUpdateZonePayload, zoneId: string) {
  return apiClient<IApiResponse<ISingleZone>>(`/zones/${zoneId}`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteZone(zoneId: string) {
  return apiClient<IApiResponse<null>>(`/zones/${zoneId}`, {
    method: "DELETE",
  });
}
