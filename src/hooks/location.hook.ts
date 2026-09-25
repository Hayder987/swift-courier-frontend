import { useMutation } from "@tanstack/react-query";
import { liveLocation } from "@/api";

export function useLiveLocation() {
  return useMutation({
    mutationFn: liveLocation,
  });
}
