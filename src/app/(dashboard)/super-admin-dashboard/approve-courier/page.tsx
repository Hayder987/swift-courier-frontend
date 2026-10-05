import { Suspense } from "react";
import ApplicantEmployeeTable from "@/components/layout/dashboard/admin/applicant-employee/applicant-employee-table";
import AllEmployeeTableSkeleton from "@/components/skeleton/AllEmployeeTableSkeleton";

const ApproveCourier = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<AllEmployeeTableSkeleton />}>
        <ApplicantEmployeeTable />
      </Suspense>
    </div>
  );
};

export default ApproveCourier;
