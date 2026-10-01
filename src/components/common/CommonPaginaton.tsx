"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface CommonPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const CommonPagination = ({
  page,
  totalPages,
  onPageChange,
  className,
}: CommonPaginationProps) => {
  if (totalPages <= 0) {
    return null;
  }

  const canPrevious = page > 1;
  const canNext = page < totalPages;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let current = start; current <= end; current++) {
      pages.push(current);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-3 py-4 sm:px-5",
        className,
      )}
    >
      <p className="text-xs text-muted-foreground sm:text-sm">
        Page <span className="font-semibold text-foreground">{page}</span> of{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 rounded-lg"
          disabled={!canPrevious}
          onClick={() => onPageChange(1)}
          aria-label="First page"
        >
          <ChevronsLeft className="size-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 rounded-lg"
          disabled={!canPrevious}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="hidden items-center gap-1 sm:flex">
          {getPages().map((item, index) =>
            item === "..." ? (
              <span
                key={index === 1 ? "ellipsis-start" : "ellipsis-end"}
                className="flex size-8 items-center justify-center text-xs text-muted-foreground"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <Button
                key={`page-${item}`}
                type="button"
                variant={item === page ? "default" : "outline"}
                size="icon"
                className={cn(
                  "size-8 rounded-lg text-xs",
                  item === page && "bg-[#e50914] text-white hover:bg-[#c70811]",
                )}
                onClick={() => onPageChange(item)}
                aria-label={`Go to page ${item}`}
                aria-current={item === page ? "page" : undefined}
              >
                {item}
              </Button>
            ),
          )}
        </div>

        <span className="px-2 text-xs font-medium text-muted-foreground sm:hidden">
          {page} / {totalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 rounded-lg"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 rounded-lg"
          disabled={!canNext}
          onClick={() => onPageChange(totalPages)}
          aria-label="Last page"
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default CommonPagination;
