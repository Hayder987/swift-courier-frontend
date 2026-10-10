"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Inbox,
  LoaderCircle,
  MessageSquareText,
  RotateCcw,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import { Button } from "@/components/ui/button";
import { useSuspenseGetAllContacts } from "@/hooks/admin.hook";
import type {
  IAllContactParams,
  IContactInfo,
} from "@/types/contact.info.type";

import ContactCard from "./ContactCard";
import ContactCardLoading from "./ContactCardLoading";

const PAGE_SIZE = 12;
const SCROLL_THRESHOLD = 400;

const DEFAULT_FILTER: IAllContactParams = {
  limit: PAGE_SIZE,
  sortBy: "createdAt",
  sortOrder: "desc",
};

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

const ContactList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [page, setPage] = useState(() => {
    const urlPage = Number(searchParams.get("page"));
    return Number.isInteger(urlPage) && urlPage > 0 ? urlPage : 1;
  });

  const [filters, setFilters] = useState<IAllContactParams>(() => ({
    ...DEFAULT_FILTER,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") === "asc" ? "asc" : "desc",
  }));

  const [contacts, setContacts] = useState<IContactInfo[]>([]);

  // Show the scroll-to-top button only after scrolling down.
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Sync pagination and sorting with URL.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    if (filters.sortBy && filters.sortBy !== "createdAt") {
      params.set("sortBy", filters.sortBy);
    } else {
      params.delete("sortBy");
    }

    if (filters.sortOrder && filters.sortOrder !== "desc") {
      params.set("sortOrder", filters.sortOrder);
    } else {
      params.delete("sortOrder");
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    const currentQuery = searchParams.toString();
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [pathname, router, page, filters.sortBy, filters.sortOrder, searchParams]);

  const queryParams: IAllContactParams = useMemo(
    () => ({
      ...filters,
      page,
      limit: PAGE_SIZE,
    }),
    [filters, page],
  );

  const { data } = useSuspenseGetAllContacts(queryParams);

  const responsePage = data?.meta?.page ?? page;
  const totalPages = data?.meta?.totalPages ?? 0;
  const totalContacts = data?.meta?.total ?? 0;

  useEffect(() => {
    if (responsePage !== page) return;

    const currentPageContacts: IContactInfo[] = data?.data ?? [];
    const startIndex = (responsePage - 1) * PAGE_SIZE;

    setContacts((previous) => {
      // A directly opened URL may start on a later page.
      if (startIndex > previous.length) {
        return currentPageContacts;
      }

      const updated = [...previous];
      updated.splice(startIndex, PAGE_SIZE, ...currentPageContacts);

      return updated;
    });
  }, [data, page, responsePage]);

  const handlePageChange = useCallback(() => {
    if (isPending || responsePage >= totalPages) return;

    startTransition(() => {
      setPage((previous) => previous + 1);
    });
  }, [isPending, responsePage, totalPages]);

  const handleSortChange = (
    sortBy: NonNullable<IAllContactParams["sortBy"]>,
    sortOrder: NonNullable<IAllContactParams["sortOrder"]>,
  ) => {
    startTransition(() => {
      setContacts([]);
      setPage(1);
      setFilters((previous) => ({
        ...previous,
        sortBy,
        sortOrder,
      }));
    });
  };

  const handleReset = () => {
    startTransition(() => {
      setContacts([]);
      setPage(1);
      setFilters({ ...DEFAULT_FILTER });
    });
  };

  const isPaginationEnd =
    !isPending && totalPages > 0 && responsePage >= totalPages;

  const isEmpty = contacts.length === 0 && !isPending;

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Page heading */}
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-[#e50914]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/3 size-40 rounded-full bg-[#e50914]/5 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e50914]/20 bg-[#e50914]/10 px-3 py-1.5 text-xs font-semibold text-[#e50914]">
              <MessageSquareText className="size-3.5" />
              SwiftCourier Support
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Contact Management
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Manage customer inquiries, review messages, and keep support
              requests organized in one place.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-3.5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
              <Inbox className="size-5" />
            </div>

            <div>
              <p className="text-2xl font-bold tabular-nums text-foreground">
                {totalContacts}
              </p>
              <p className="text-xs text-muted-foreground">Total contacts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            All Messages
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Showing {contacts.length} of {totalContacts} contacts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              handleSortChange(
                "createdAt",
                filters.sortOrder === "desc" ? "asc" : "desc",
              )
            }
            disabled={isPending}
            className="gap-2"
          >
            <ArrowUpDown className="size-4" />
            <span>
              {filters.sortOrder === "desc" ? "Newest first" : "Oldest first"}
            </span>
            {filters.sortOrder === "asc" ? (
              <ArrowDown className="size-3.5 rotate-180" />
            ) : (
              <ArrowDown className="size-3.5" />
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={isPending}
            className="gap-2 text-muted-foreground"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* Contact cards */}
      {isEmpty ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-5 py-12 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
            <Inbox className="size-8" />
          </div>

          <h3 className="text-lg font-semibold text-foreground">
            No contacts found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            There are no contact messages to display right now. New customer
            inquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}

          {/* Inline loading skeletons */}
          {isPending &&
            skeletonIds.map((id) => <ContactCardLoading key={id} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col items-center gap-4 border-t border-border/60 pt-6">
          {!isPaginationEnd && (
            <Button
              type="button"
              onClick={handlePageChange}
              disabled={isPending}
              className="h-11 min-w-48 gap-2 bg-[#e50914] px-7 font-semibold text-white shadow-md shadow-[#e50914]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c90812] hover:shadow-lg hover:shadow-[#e50914]/25 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Loading contacts...
                </>
              ) : (
                <>
                  <ArrowDown className="size-4" />
                  See More Contacts
                </>
              )}
            </Button>
          )}

          {isPaginationEnd && contacts.length > 0 && (
            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-4 py-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4 text-emerald-500" />
              You&apos;ve reached the end of the contact list.
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground">
            {contacts.length} of {totalContacts} contacts loaded
          </p>
        </div>
      )}

      {/* Premium Scroll to Top */}
      <div
        className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ease-out sm:bottom-8 sm:right-8 ${
          showScrollTop
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-5 scale-90 opacity-0"
        }`}
      >
        <Button
          type="button"
          size="icon"
          aria-label="Scroll to top"
          title="Scroll to top"
          tabIndex={showScrollTop ? 0 : -1}
          onClick={handleScrollToTop}
          className="group relative size-12 overflow-hidden rounded-2xl border border-white/20 bg-linear-to-br from-[#ff303a] via-[#e50914] to-[#a80710] text-white shadow-[0_8px_30px_rgba(229,9,20,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_36px_rgba(229,9,20,0.5)] active:translate-y-0 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 sm:size-14"
        >
          <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-white/20 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="pointer-events-none absolute -inset-full rotate-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <ArrowUp className="relative z-10 size-5 transition-transform duration-300 group-hover:-translate-y-1 sm:size-6" />
        </Button>
      </div>
    </section>
  );
};

export default ContactList;
