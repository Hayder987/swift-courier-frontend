export interface ILocationPayload {
  latitude: string;
  longitude: string;
}

export interface ILocationAddress {
  city?: string;
  road?: string;
  state?: string;
  country?: string;
  district?: string;
  postcode?: string;
  fullAddress?: string;
}

export interface ILiveLocation {
  id: string;
  userId: string;
  userRole: string;
  latitude: string;
  longitude: string;
  address: ILocationAddress;
  status: string;
  isSharing: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface ILiveLocationResponse {
  success: boolean;
  message: string;
  data: ILiveLocation;
}
