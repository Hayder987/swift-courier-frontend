import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { deleteEmployeeById, getAllEmployee, getEmployeeById } from "@/api";
import type { IGetAllEmployeesParams } from "@/types";

export function useSuspenseGetAllEmployee(params: IGetAllEmployeesParams) {
  return useSuspenseQuery({
    queryKey: ["employees", params],
    queryFn: () => getAllEmployee(params),
  });
}

export function useGetSingleEmployee(employeeId: string) {
  return useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: !!employeeId,
  });
}

export function useDeleteEmployee(employeeId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteEmployeeById(employeeId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      if (employeeId) {
        queryClient.invalidateQueries({
          queryKey: ["employee", employeeId],
        });
      }
    },
  });
}

// export function useSuspenseGetAllEmployee (params:IGetAllEmployeesParams){
//   return useSuspenseQuery({
//     queryKey : ["employees", params],
//     queryFn : ()=> getAllEmployee(params)
//   })
// }

// export function useGetSingleEmployee (employeeId:string) {
//     return useQuery({
//         queryKey:["employee", employeeId],
//         queryFn : ()=> getEmployeeById(employeeId),
//         enabled : !!employeeId
//     })
// }

// export function useDeleteEmployee (employeeId:string | null) {
//     return useMutation({
//         mutationFn : ()=> deleteEmployeeById(employeeId),

//     })
// }
