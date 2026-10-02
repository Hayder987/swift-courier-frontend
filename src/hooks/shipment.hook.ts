import { useMutation } from "@tanstack/react-query";
import { createShipment } from "@/api/shipment.api";

export function useCreateShipment() {
  return useMutation({
    mutationFn: createShipment,
  });
}
