export interface ShipmentCreateData {
  parcelName: string;
  description: string;
  parcelWeightGM: string;
  pickupLat: string;
  pickupLng: string;
  deliveryAddress: string;
}

export interface IShipmentCreatePayload {
  ItemsImage: File;
  data: ShipmentCreateData;
}

// get all shipment

export type ShipmentStatus =
  | "CREATED"
  | "READY_FOR_PAYMENT"
  | "PENDING"
  | "ASSIGNED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DELIVERY_FAILED"
  | "RETURNED"
  | "CANCELLED";

export type ShipmentType = "NEW" | "OLD";

export type ShipmentQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  status?: ShipmentStatus;
  pickupZoneId?: string;
  deliveryZoneId?: string;
  dateFilter?: "today" | "yesterday" | "last_week";
  type?: ShipmentType;
};

export type ShipmentAddress = {
  city: string;
  road?: string;
  state: string;
  country: string;
  district: string;
  postcode: string | null;
  countryCode: string;
  fullAddress: string;
  latitude?: number;
  longitude?: number;
};

export type ShipmentCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type ShipmentZone = {
  id: string;
  code: string;
  name: string;
};

export type ShipmentTracking = {
  id: string;
  shipmentId: string;
  updatedById: string;
  status: ShipmentStatus;
  note: string;
  lat: string | null;
  lng: string | null;
  createdAt: string;
};

export interface IDataCourier {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type IShipment = {
  id: string;
  trackingNumber: string;
  customerId: string;
  pickupCourierId: string | null;
  deliveryCourierId: string | null;
  imageUrl: string | null;
  imagePublicId: string | null;
  parcelName: string;
  description: string;
  parcelWeightGM: string;
  deliveryFee: string | null;
  deliveryDistance: string | null;
  status: ShipmentStatus;
  type: ShipmentType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  onboardingTime: string | null;

  pickupAddress: ShipmentAddress;
  pickupLat: string;
  pickupLng: string;

  deliveryAddress: ShipmentAddress;
  deliveryLat: string;
  deliveryLng: string;

  pickupZoneId: string;
  deliveryZoneId: string;

  customer: ShipmentCustomer;
  pickupCourier: IDataCourier | null;
  deliveryCourier: IDataCourier | null;

  pickupZone: ShipmentZone;
  deliveryZone: ShipmentZone;

  tracking: ShipmentTracking[];
};

export type ShipmentPaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CourierShipmentUpdateStatus =
  | "PICKED_UP"
  | "DELIVERY_FAILED"
  | "DELIVERED";

export interface ICourierShipmentStatusUpdate {
  status: CourierShipmentUpdateStatus;
  note: string;
}
