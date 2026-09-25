import apiClient from "@/lib/apiClient";
import type { ILocationPayload } from "@/types/location.type";

export function liveLocation(payload: ILocationPayload) {
  return apiClient("/location/generate", { method: "POST", body: payload });
}
