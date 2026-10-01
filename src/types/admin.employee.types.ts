export interface ISingleZone {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
}

export interface ISingleCourier {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  vehicleLicenseNumber: string;
  qualifications: string;
  resume: string | null;
  resumePublicId: string | null;
  applicationStatus: string;
  courierAvailability: string;
  vehicleDocuments: string[] | null;
  nationalidPic: string[] | null;
  zoneId: string | null;
  createdAt: string;
  updatedAt: string;
  zone?: ISingleZone | null;
}

export interface ISingleUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  authMethod: string;
  isEmailVerified: boolean;
  role: string;
  status: string;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ISingleEmployee {
  id: string;
  userId: string;
  employeeCode: string;
  employmentStatus: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  permanentAddress: string;
  permanentCity: string;
  joinAt: string;
  additionalFiles: string[] | null;
  leaveJobAt: string | null;
  suspendedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  onboardingTime: string | null;
  courier?: ISingleCourier | null;
  user: ISingleUser;
}
