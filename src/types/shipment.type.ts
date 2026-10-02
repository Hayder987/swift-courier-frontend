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
