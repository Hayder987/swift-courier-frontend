import { useMutation } from "@tanstack/react-query";
import { applyCourier } from "@/api/employee.api";

export function useApplyCourier() {
  return useMutation({
    mutationFn: applyCourier,
  });
}
