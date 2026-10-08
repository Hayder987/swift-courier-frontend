import { Suspense } from "react";
import OverViewComponent from "@/components/layout/dashboard/super-admin/overview/OverViewComponent";
import OverViewSkeleton from "@/components/skeleton/OverViewSkeleton";

const OverViewPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-5 sm:px-6 lg:px-8">
      <Suspense fallback={<OverViewSkeleton />}>
        <OverViewComponent />
      </Suspense>
    </div>
  );
};

export default OverViewPage;
