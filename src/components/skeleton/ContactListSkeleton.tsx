import ContactCardLoading from "../layout/dashboard/admin/contact/ContactCardLoading";

const skeletonIds = [
  "contact-skeleton-1",
  "contact-skeleton-2",
  "contact-skeleton-3",
  "contact-skeleton-4",
  "contact-skeleton-5",
  "contact-skeleton-6",
  "contact-skeleton-7",
  "contact-skeleton-8",
  "contact-skeleton-9",
  "contact-skeleton-10",
  "contact-skeleton-11",
  "contact-skeleton-12",
];

const ContactListSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="h-7 w-52 animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skeletonIds.map((id) => (
          <ContactCardLoading key={id} />
        ))}
      </div>
    </div>
  );
};

export default ContactListSkeleton;
