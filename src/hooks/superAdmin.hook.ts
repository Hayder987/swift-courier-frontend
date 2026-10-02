import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createEmployee, deleteAuditLog, getAllAuditLogs } from "@/api";
import type { IAuditLogQueryParams } from "@/types/super.admin.type";

export function useCreateEmployee() {
  return useMutation({
    mutationFn: createEmployee,
  });
}

export function useGetSuspenseAuditLogs(params: IAuditLogQueryParams) {
  return useSuspenseQuery({
    queryKey: ["auditLogs", params],
    queryFn: () => getAllAuditLogs(params),
  });
}

export function useDeleteAuditLog(auditId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAuditLog(auditId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auditLogs"],
      });

      if (auditId) {
        queryClient.invalidateQueries({
          queryKey: ["auditLogs", auditId],
        });
      }
    },
  });
}
