import { Suspense } from "react";
import CreateShipmentForm from "@/components/layout/dashboard/customer/shipment/CreateShipmentForm";
import ShipmentFormSkeleton from "@/components/skeleton/CreateShipmentFormSkeleton";

const CreateShipmentPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<ShipmentFormSkeleton />}>
        <CreateShipmentForm />
      </Suspense>
    </div>
  );
};

export default CreateShipmentPage;
