import type { LucideIcon } from "lucide-react";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "COURIER" | "CUSTOMER";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  authMethod: string;
  isEmailVerified: boolean;
  isEmployee: boolean;
  role: UserRole;
  status: string;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeProfile = {
  id: string;
  userId: string;
  employeeCode: string;
  employmentStatus: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  permanentAddress: string | null;
  permanentCity: string | null;
  joinAt: string | null;
  additionalFiles: unknown;
  leaveJobAt: string | null;
  suspendedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  onboardingTime: string | null;
};

export type CustomerProfile = {
  id: string;
  userId: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  timezone: string | null;
  country: string | null;
  deletionDeadline: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProfileUser = {
  user: UserProfile;
  profile: EmployeeProfile | CustomerProfile;
};

export type ProfileComponentProps = {
  user: ProfileUser;
};

export type RoleContent = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  icon: LucideIcon;
  features: string[];
};
