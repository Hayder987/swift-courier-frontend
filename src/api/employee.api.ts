import apiClient from "@/lib/apiClient";
import type { ApplyCourierPayload } from "@/types";

// apply courier
export function applyCourier(payload: ApplyCourierPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));

  formData.append("resume", payload.resume);

  for (const file of payload.vehicleDocuments) {
    formData.append("vehicleDocuments", file);
  }

  for (const file of payload.nationalIdPic) {
    formData.append("nationalIdPic", file);
  }

  return apiClient("/employee/be-courier", {
    method: "POST",
    body: formData,
  });
}
