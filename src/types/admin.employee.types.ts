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

// user management type
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "COURIER" | "CUSTOMER";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export type AuthMethod = "CREDENTIALS" | "GOOGLE";

export type EmploymentStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "INACTIVE"
  | "ON_LEAVE"
  | "RESIGNED"
  | "TERMINATED"
  | "APPLIED";

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  password: string | null;
  phone: string | null;
  googleId: string | null;
  role: UserRole;
  authMethod: AuthMethod;
  status: UserStatus;
  isEmailVerified: boolean;
  isEmployee: boolean;
  isDeleted: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminEmployeeProfile {
  id: string;
  userId: string;
  employeeCode: string;
  employmentStatus: EmploymentStatus;
  imageUrl: string | null;
  imagePublicId: string | null;
  permanentAddress: string;
  permanentCity: string;
  joinAt: string | null;
  additionalFiles: string[] | null;
  leaveJobAt: string | null;
  suspendedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  onboardingTime: string | null;
}

export interface IAdminCustomerProfile {
  id: string;
  userId: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  timezone: string;
  country: string;
  deletionDeadline: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminUserQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  role?: UserRole;
  searchTerm?: string;
  authMethod?: AuthMethod;
  userId?: string;
  status?: UserStatus;
  isEmployee?: boolean;
}

export interface IAdminSingleUser {
  user: IAdminUser;
  profile: IAdminEmployeeProfile | IAdminCustomerProfile | null;
}
