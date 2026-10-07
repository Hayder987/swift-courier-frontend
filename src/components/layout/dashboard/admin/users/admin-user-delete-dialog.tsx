"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

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
import { toast } from "@/components/ui/toast";
import { useDeleteUser } from "@/hooks/admin.hook";
import type { IAdminUser } from "@/types/admin.employee.types";

interface AdminUserDeleteDialogProps {
  user: IAdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminUserDeleteDialog = ({
  user,
  open,
  onOpenChange,
}: AdminUserDeleteDialogProps) => {
  const [deleting, setDeleting] = useState(false);

  const userId = user?.id ?? "";

  const { mutate: deleteUser } = useDeleteUser(userId);

  const handleDelete = () => {
    if (!user || !userId || user.status === "DELETED") {
      return;
    }

    setDeleting(true);

    deleteUser(undefined, {
      onSuccess: () => {
        toast.add({
          title: "User deleted",
          description: `${user.name} has been soft deleted successfully.`,
          type: "success",
        });

        setDeleting(false);
        onOpenChange(false);
      },

      onError: (error: any) => {
        toast.add({
          title: "Delete failed",
          description:
            error?.data?.message ??
            error?.message ??
            "Unable to delete this user.",
          type: "error",
        });

        setDeleting(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!deleting) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-border/60 p-0">
        <div className="p-5 sm:p-6">
          <DialogHeader>
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <AlertTriangle className="size-5" />
            </div>

            <DialogTitle className="text-left">Delete User?</DialogTitle>

            <DialogDescription className="text-left">
              You are about to soft delete{" "}
              <span className="font-semibold text-foreground">
                {user?.name}
              </span>
              . The user will no longer be active in the system.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 rounded-xl border border-destructive/15 bg-destructive/5 p-3">
            <p className="text-xs leading-5 text-muted-foreground">
              This action changes the user status to{" "}
              <span className="font-semibold text-destructive">DELETED</span>.
              It does not permanently remove the record.
            </p>
          </div>

          <DialogFooter className="mt-6 flex-col-reverse gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              disabled={deleting}
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={deleting || !user || user.status === "DELETED"}
              onClick={handleDelete}
              className="gap-2 rounded-xl"
            >
              {deleting ? (
                <>
                  <ProcessSpinner />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete User
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUserDeleteDialog;
