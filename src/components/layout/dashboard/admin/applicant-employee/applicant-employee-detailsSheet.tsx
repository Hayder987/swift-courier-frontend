"use client";

import { CheckCircle2, ChevronDown, UserRound, XCircle } from "lucide-react";

import type { FetchError } from "ofetch";
import { useState } from "react";
import ProcessSpinner from "@/components/loading/process-spinner";
import EmployeeDetailsSkeleton from "@/components/skeleton/employee-details-skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import { useUpdateEmployeeStatusApplication } from "@/hooks";
import { useGetSingleEmployee } from "@/hooks/admin.hook";
import type { IApprovedCourierPayload } from "@/validation";
import { EmployeeDetailsContent } from "./EmployeeDetailsContent";

interface ApplicantEmployeeDetailsSheetProps {
  employeeId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicantEmployeeDetailsSheet = ({
  employeeId,
  open,
  onOpenChange,
}: ApplicantEmployeeDetailsSheetProps) => {
  const [selectedStatus, setSelectedStatus] =
    useState<IApprovedCourierPayload["status"]>("APPROVED");

  const { data, isLoading, isFetching } = useGetSingleEmployee(
    employeeId ?? "",
  );

  const employee = data?.data;

  const { mutate: approvedAction, isPending } =
    useUpdateEmployeeStatusApplication(employeeId ?? "");

  const handleSubmit = (status: IApprovedCourierPayload["status"]) => {
    console.log("clicked", status);
    if (!employeeId) {
      return;
    }

    setSelectedStatus(status);

    approvedAction(
      {
        status,
      },
      {
        onSuccess: () => {
          toast.add({
            title:
              status === "APPROVED"
                ? "Courier Application Approved"
                : "Courier Application Rejected",
            description:
              status === "APPROVED"
                ? "The courier application has been approved successfully."
                : "The courier application has been rejected successfully.",
            type: "success",
          });

          onOpenChange(false);
        },

        onError: (error: FetchError) => {
          const errorMessage =
            error.data?.message ??
            error.data?.errors?.[0]?.message ??
            error.message ??
            "Unable to update the courier application. Please try again.";

          toast.add({
            title: "Something Went Wrong",
            description: errorMessage,
            type: "error",
          });
        },
      },
    );
  };

  const handleOpenChange = (value: boolean) => {
    if (isPending) {
      return;
    }

    onOpenChange(value);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-hidden border-l border-border/60 p-0 sm:max-w-xl lg:max-w-2xl"
      >
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <SheetHeader className="shrink-0 border-b border-border/60 bg-background/95 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
              <UserRound className="size-5" />
            </div>

            <div className="min-w-0">
              <SheetTitle className="text-left text-base sm:text-lg">
                Courier Application
              </SheetTitle>

              <SheetDescription className="mt-1 text-left text-xs leading-5">
                Review applicant information and decide whether to approve or
                reject this courier application.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* ---------------------------------------------------------------- */}
        {/* Body                                                             */}
        {/* ---------------------------------------------------------------- */}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {isLoading || !employee ? (
            <EmployeeDetailsSkeleton />
          ) : (
            <EmployeeDetailsContent employee={employee} />
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="shrink-0 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur-xl sm:px-6">
          {isPending ? (
            <div className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#e50914]/15 bg-[#e50914]/5 px-4">
              <ProcessSpinner />

              <div className="min-w-0">
                <p className="text-sm font-semibold">
                  {selectedStatus === "APPROVED"
                    ? "Approving courier application..."
                    : "Rejecting courier application..."}
                </p>

                <p className="text-xs text-muted-foreground">
                  Please wait. Do not close this sheet.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
              {/* Cancel */}
              <SheetClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full rounded-xl sm:w-auto sm:min-w-24"
                  >
                    Cancel
                  </Button>
                }
              ></SheetClose>

              {/* Approve / Reject */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      disabled={isLoading || isFetching || !employee?.courier}
                      className="h-11 w-full rounded-xl bg-[#e50914] font-semibold text-white shadow-lg shadow-[#e50914]/20 hover:bg-[#c90812] sm:w-auto sm:min-w-45"
                    >
                      <CheckCircle2 className="size-4" />
                      Review Application
                      <ChevronDown className="ml-auto size-4 sm:ml-1" />
                    </Button>
                  }
                ></DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  side="top"
                  className="w-60 rounded-xl p-1.5"
                >
                  {/* Approve */}
                  <DropdownMenuItem
                    disabled={isPending}
                    onClick={() => {
                      handleSubmit("APPROVED");
                    }}
                    className="cursor-pointer rounded-lg py-2.5 focus:bg-emerald-500/10 focus:text-emerald-600 dark:focus:text-emerald-400"
                  >
                    <CheckCircle2 className="mr-2 size-4 text-emerald-500" />

                    <div>
                      <p className="text-sm font-medium">Approve Application</p>

                      <p className="text-[10px] text-muted-foreground">
                        Accept this courier
                      </p>
                    </div>
                  </DropdownMenuItem>

                  {/* Reject */}
                  <DropdownMenuItem
                    disabled={isPending}
                    onClick={() => {
                      handleSubmit("REJECTED");
                    }}
                    className="cursor-pointer rounded-lg py-2.5 focus:bg-red-500/10 focus:text-red-600 dark:focus:text-red-400"
                  >
                    <XCircle className="mr-2 size-4 text-red-500" />

                    <div>
                      <p className="text-sm font-medium">Reject Application</p>

                      <p className="text-[10px] text-muted-foreground">
                        Decline this courier
                      </p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ApplicantEmployeeDetailsSheet;
