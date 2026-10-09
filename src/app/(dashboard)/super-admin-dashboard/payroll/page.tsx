import { Suspense } from "react";
import PayrollTable from "@/components/layout/dashboard/admin/payroll/payroll-table";
import PayrollTableSkeleton from "@/components/skeleton/PayrollTableSkeleton";

const PayrollPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-5 sm:px-6 lg:px-8">
      <Suspense fallback={<PayrollTableSkeleton />}>
        <PayrollTable />
      </Suspense>
    </div>
  );
};

export default PayrollPage;
