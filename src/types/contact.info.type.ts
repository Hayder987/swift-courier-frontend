export interface IContactInfo {
  id: string;
  title: string;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAllContactParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
