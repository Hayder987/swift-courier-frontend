import { Suspense } from "react";
import ContactList from "@/components/layout/dashboard/admin/contact/ContactList";
import ContactListSkeleton from "@/components/skeleton/ContactListSkeleton";

const ContactInfoPage = () => {
  return (
    <div className="mx-auto w-full max-w-380 px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<ContactListSkeleton />}>
        <ContactList />
      </Suspense>
    </div>
  );
};

export default ContactInfoPage;
