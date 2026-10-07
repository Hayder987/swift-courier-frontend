import { Suspense } from "react";
import AdminUsersTable from "@/components/layout/dashboard/admin/users/admin-user-table";
import AdminUsersTableSkeleton from "@/components/skeleton/admin-users-table-skeleton";

const AllUserPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<AdminUsersTableSkeleton />}>
        <AdminUsersTable />
      </Suspense>
    </div>
  );
};

export default AllUserPage;
