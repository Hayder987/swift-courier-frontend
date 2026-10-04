import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FetchError } from "ofetch";
import {
  assignCourier,
  createShipment,
  getAdminShipment,
  getCourierShipment,
  getMyShipment,
  updateAdminShipment,
  updateShipmentByCourier,
} from "@/api/shipment.api";
import { toast } from "@/components/ui/toast";
import type { ShipmentQueryParams } from "@/types/shipment.type";
import type {
  IAdminShipmentStatusUpdate,
  ICourierShipmentStatusUpdate,
} from "@/validation/shipment.validation";

export function useCreateShipment() {
  return useMutation({
    mutationFn: createShipment,
  });
}

export function useGetSuspenseShipmentAdmin(params: ShipmentQueryParams) {
  return useSuspenseQuery({
    queryKey: ["adminShipments", params],
    queryFn: () => getAdminShipment(params),
  });
}

export function useGetSuspenseMyShipment(params: ShipmentQueryParams) {
  return useSuspenseQuery({
    queryKey: ["myShipments", params],
    queryFn: () => getMyShipment(params),
  });
}

export function useGetSuspenseCourierShipment(
  params: ShipmentQueryParams,
  type: "pickup" | "delivery",
) {
  return useSuspenseQuery({
    queryKey: ["courierShipments", params, type],
    queryFn: () => getCourierShipment(params, type),
  });
}

export function useUpdateShipmentStatusAdmin(
  payload: IAdminShipmentStatusUpdate,
  shipmentId: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateAdminShipment(payload, shipmentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminShipments"],
      });

      if (shipmentId) {
        queryClient.invalidateQueries({
          queryKey: ["adminShipments", shipmentId],
        });
      }
    },
  });
}

// export function useUpdateShipmentByCourier(
//   payload: ICourierShipmentStatusUpdate,
//   shipmentId: string,
// ) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => updateShipmentByCourier(shipmentId, payload),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["courierShipments"],
//       });

//       if (shipmentId) {
//         queryClient.invalidateQueries({
//           queryKey: ["courierShipments", shipmentId],
//         });
//       }
//     },
//   });
// }

export function useUpdateShipmentByCourier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: ICourierShipmentStatusUpdate;
    }) => updateShipmentByCourier(shipmentId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["courierShipments"],
      });

      if (variables.shipmentId) {
        queryClient.invalidateQueries({
          queryKey: ["courierShipments", variables.shipmentId],
        });
      }
    },
  });
}

export function useAssignCourierShipment(shipmentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => assignCourier(shipmentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminShipments"],
      });

      if (shipmentId) {
        queryClient.invalidateQueries({
          queryKey: ["adminShipments", shipmentId],
        });
      }
    },
  });
}
