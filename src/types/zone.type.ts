// export interface IZoneBoundary {
// 	type: "Polygon";
// 	coordinates: [number, number][][][];
// }

export interface IZoneBoundary {
  type: "Polygon";
  coordinates: [number, number][][];
}

export interface ISingleZone {
  id: string;
  name: string;
  code: string;
  address: string;
  latitude: string;
  longitude: string;
  radiusKm: number;
  boundary: IZoneBoundary;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IZoneMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAllZonesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IUpdateZonePayload {
  name?: string;
  code?: string;
  address?: string;
  radiusKm?: number;
  isActive?: boolean;
}
