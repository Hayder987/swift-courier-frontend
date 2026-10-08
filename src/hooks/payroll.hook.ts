import { useMutation } from "@tanstack/react-query";
import { generatePayroll } from "@/api/payroll.api";

export function useGeneratePayroll() {
  return useMutation({
    mutationFn: generatePayroll,
  });
}
