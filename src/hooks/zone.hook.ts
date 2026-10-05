import { useMutation } from "@tanstack/react-query";
import { createZone } from "@/api";

export function useCreateZone() {
  return useMutation({
    mutationFn: createZone,
  });
}
