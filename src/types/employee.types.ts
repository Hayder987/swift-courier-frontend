export interface CourierApplicationData {
  permanentAddress: string;
  permanentCity: string;
  vehicleLicenseNumber: string;
  qualifications: string;
}

export interface CourierApplicationPayload {
  resume: File;
  vehicleDocuments: File[];
  nationalIdPic: File[];
  data: CourierApplicationData;
}
