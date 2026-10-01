import Link from "next/link";

const AllEmployeesPage = () => {
  return (
    <div>
      <div className="">
        <Link href={"/super-admin-dashboard/create-employee"}>
          Create Employee
        </Link>
      </div>
    </div>
  );
};

export default AllEmployeesPage;
