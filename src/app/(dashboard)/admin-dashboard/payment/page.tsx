import { Suspense } from "react";
import PaymentsTable from "@/components/layout/dashboard/admin/payment/payment-table";
import PaymentTableSkeleton from "@/components/skeleton/PaymentTableSkeleton";

const PaymentHistoryPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-5 sm:px-6 lg:px-8">
      <Suspense fallback={<PaymentTableSkeleton />}>
        <PaymentsTable />
      </Suspense>
    </div>
  );
};

export default PaymentHistoryPage;
