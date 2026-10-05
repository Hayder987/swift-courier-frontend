import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  ApprovedEmployeeStatus,
  applyCourier,
  getCourierApplications,
} from "@/api/employee.api";
import type { IQueryParamsCourierApplicant } from "@/types";
import type { IApprovedCourierPayload } from "@/validation";

export function useApplyCourier() {
  return useMutation({
    mutationFn: applyCourier,
  });
}

export function useSuspenseGetApplicantEmployee(
  params: IQueryParamsCourierApplicant,
) {
  return useSuspenseQuery({
    queryKey: ["applicant-employee", params],
    queryFn: () => getCourierApplications(params),
  });
}

// update employee application
export function useUpdateEmployeeStatusApplication(employeeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IApprovedCourierPayload) =>
      ApprovedEmployeeStatus(payload, employeeId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["applicant-employee"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["employee", employeeId],
        }),
      ]);
    },
  });
}
