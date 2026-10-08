import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  generatePayroll,
  getAllPayrolls,
  paySalaries,
} from "@/api/payroll.api";
import type { IPayrollQueryParams, IPaySalaries } from "@/types/payroll.type";

export function useGeneratePayroll() {
  return useMutation({
    mutationFn: generatePayroll,
  });
}

export function useGetSuspenseAllPayroll(params: IPayrollQueryParams) {
  return useSuspenseQuery({
    queryKey: ["payrolls", params],
    queryFn: () => getAllPayrolls(params),
  });
}

export function usePaySalaries(payrollId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IPaySalaries) => paySalaries(payload, payrollId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payrolls"],
      });

      queryClient.invalidateQueries({
        queryKey: ["payroll", payrollId],
      });
    },
  });
}
