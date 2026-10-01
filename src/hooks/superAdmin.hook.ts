import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "@/api";

export function useCreateEmployee() {
  return useMutation({
    mutationFn: createEmployee,
  });
}
