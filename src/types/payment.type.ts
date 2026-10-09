export interface IPaymentQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  createdAt?: "today" | "thisWeek" | "thisMonth";
}

export interface IPayment {
  id: string;
  shipmentId: string;
  amount: string;
  method: "CARD" | "BKASH" | "BANK";
  sessionId: string | null;
  provider: "STRIPE" | "BKASH";
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  shipment: {
    id: string;
    parcelName: string;
    customerId: string;
    deliveryFee: string;
    pickupZone: {
      id: string;
      code: string;
      name: string;
    };
    deliveryZone: {
      id: string;
      code: string;
      name: string;
    };
  };
}
