"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2, RefreshCcw } from "lucide-react";
import type { FetchError } from "ofetch";
import { useEffect } from "react";
import ProcessSpinner from "@/components/loading/process-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { useUpdateUserStatusAdmin } from "@/hooks/admin.hook";
import type { IAdminUser } from "@/types/admin.employee.types";
import {
  type IAdminUserStatusUpdate,
  UserAdminStatusValidationSchema,
} from "@/validation/admin.user.validation";

interface AdminUserStatusUpdateDialogProps {
  user: IAdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminUserStatusUpdateDialog = ({
  user,
  open,
  onOpenChange,
}: AdminUserStatusUpdateDialogProps) => {
  const userId = user?.id ?? "";

  const { mutate: updateStatus, isPending } = useUpdateUserStatusAdmin(userId);

  const initialStatus: IAdminUserStatusUpdate["status"] =
    user?.status === "SUSPENDED" ? "SUSPENDED" : "ACTIVE";

  const form = useForm({
    defaultValues: {
      status: initialStatus,
    } as IAdminUserStatusUpdate,

    validators: {
      onSubmit: UserAdminStatusValidationSchema,
    },

    onSubmit: async ({ value }: { value: IAdminUserStatusUpdate }) => {
      if (!user || !userId || user.status === "DELETED") {
        return;
      }

      updateStatus(value, {
        onSuccess: () => {
          toast.add({
            title: "Status updated",
            description: `${user.name}'s status has been updated successfully.`,
            type: "success",
          });

          onOpenChange(false);
        },

        onError: (error: FetchError) => {
          const errorMessage =
            error.data?.message ??
            error.data?.errors?.[0]?.message ??
            error.message ??
            "Unable to update user status.";

          toast.add({
            title: "Update Failed",
            description: errorMessage,
            type: "error",
          });
        },
      });
    },
  });

  const resetForm = form.reset;

  const userStatus = user?.status;

  useEffect(() => {
    if (!open || !userStatus) {
      return;
    }

    resetForm({
      status: userStatus === "SUSPENDED" ? "SUSPENDED" : "ACTIVE",
    });
  }, [open, userStatus, resetForm]);

  const currentStatus = user?.status ?? "ACTIVE";

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border-border/60 bg-background/95 p-0 shadow-2xl backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-[#e50914]/10 blur-3xl" />

        <div className="relative p-5 sm:p-6">
          <DialogHeader>
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl border border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]">
              <RefreshCcw className="size-5" />
            </div>

            <DialogTitle className="text-left text-lg">
              Update User Status
            </DialogTitle>

            <DialogDescription className="text-left">
              Change the account status for{" "}
              <span className="font-semibold text-foreground">
                {user?.name ?? "this user"}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();

              form.handleSubmit();
            }}
            className="mt-6 space-y-5"
          >
            <form.Field name="status">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="user-status"
                    className="text-xs font-semibold"
                  >
                    Account Status
                  </Label>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      if (value === "ACTIVE" || value === "SUSPENDED") {
                        field.handleChange(value);
                      }
                    }}
                    disabled={isPending || !user}
                  >
                    <SelectTrigger
                      id="user-status"
                      className="h-11 rounded-xl border-border/60 bg-background/60 focus:ring-[#e50914]/20"
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>

                      <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    </SelectContent>
                  </Select>

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <div className="rounded-xl border border-border/50 bg-muted/30 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
                  <CheckCircle2 className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold">Current Status</p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {currentStatus}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col-reverse gap-2 pt-1 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => onOpenChange(false)}
                className="h-10 w-full rounded-xl sm:w-auto"
              >
                Cancel
              </Button>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={
                      !canSubmit ||
                      isSubmitting ||
                      isPending ||
                      !user ||
                      user.status === "DELETED"
                    }
                    className="h-10 w-full gap-2 rounded-xl bg-[#e50914] text-white shadow-sm transition-all hover:bg-[#c70812] hover:shadow-md disabled:cursor-not-allowed sm:w-auto"
                  >
                    {isPending || isSubmitting ? (
                      <>
                        <ProcessSpinner />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="size-4" />
                        Update Status
                      </>
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUserStatusUpdateDialog;
