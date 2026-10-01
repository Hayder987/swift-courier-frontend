import { Suspense } from "react";
import AllEmployeeTable from "@/components/layout/dashboard/admin/employee/all-employee-table";
import AllEmployeeTableSkeleton from "@/components/skeleton/AllEmployeeTableSkeleton";

const AllEmployeesPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<AllEmployeeTableSkeleton />}>
        <AllEmployeeTable />
      </Suspense>
    </div>
  );
};

export default AllEmployeesPage;
