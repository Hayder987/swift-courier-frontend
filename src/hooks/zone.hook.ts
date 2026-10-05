import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createZone, deleteZone, getAllZones, updateZone } from "@/api";
import type { GetAllZonesParams, IUpdateZonePayload } from "@/types/zone.type";

export function useCreateZone() {
  return useMutation({
    mutationFn: createZone,
  });
}

export function useGetSuspenseAllZones(params: GetAllZonesParams) {
  return useSuspenseQuery({
    queryKey: ["adminZones", params],
    queryFn: () => getAllZones(params),
  });
}

export function useUpdateZonesAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      zoneId,
    }: {
      payload: IUpdateZonePayload;
      zoneId: string;
    }) => updateZone(payload, zoneId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminZones"],
      });
    },
  });
}

export function useDeleteZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (zoneId: string) => deleteZone(zoneId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminZones"],
      });
    },
  });
}
