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

export interface ApplyCourierPayload {
  data: CourierApplicationData;
  resume: File;
  vehicleDocuments: File[];
  nationalIdPic: File[];
}

// ---------------------------------------------
// Employee List
// ---------------------------------------------

export type EmploymentStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "INACTIVE"
  | "ON_LEAVE"
  | "RESIGNED"
  | "TERMINATED"
  | "APPLIED";

export type EmployeeRole = "ADMIN" | "SUPER_ADMIN" | "COURIER";

export interface IEmployee {
  id: string;
  userId: string;
  employeeCode: string | null;
  employmentStatus: EmploymentStatus;
  imageUrl: string | null;
  joinAt: string | null;
  permanentCity: string | null;
  createdAt: string;
  updatedAt: string;
  courier: ICourier | null;
  user: IEmployeeUser;
}

export interface IEmployeeUser {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole | "CUSTOMER";
  phone: string | null;
  status: "ACTIVE" | "SUSPENDED" | "INACTIVE" | "DELETED";
  lastLoginAt: string | null;
}

export interface ICourier {
  id: string;
  employeeId: string;
  qualifications: string | null;
  applicationStatus: "APPLIED" | "APPROVED";
  zoneId: string | null;
  zone: IZone | null;
}

export interface IZone {
  name: string;
  code: string;
  latitude: string;
  longitude: string;
}

// ---------------------------------------------
// Employee Details
// ---------------------------------------------

export interface ICourierDocument {
  url: string;
  publicId: string;
}

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
  vehicleDocuments: ICourierDocument[] | null;
  nationalIdPic: ICourierDocument[] | null;
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
  employeeCode: string | null;
  employmentStatus: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  permanentAddress: string | null;
  permanentCity: string | null;
  joinAt: string | null;
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

// ---------------------------------------------
// Filters
// ---------------------------------------------

export interface IGetAllEmployeesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  employeeStatus?: EmploymentStatus;
  role?: EmployeeRole;
  zoneCode?: string;
}

export interface IQueryParamsCourierApplicant {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
