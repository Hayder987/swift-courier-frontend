import { Suspense } from "react";
import CreateEmployeeForm from "@/components/layout/dashboard/super-admin/create-employee-form";
import DashBoardFormSkeleton from "@/components/skeleton/DashboardFormSkeleton";

const CreateEmployee = () => {
  return (
    <div className="py-6">
      <Suspense fallback={<DashBoardFormSkeleton />}>
        <CreateEmployeeForm />
      </Suspense>
    </div>
  );
};

export default CreateEmployee;
