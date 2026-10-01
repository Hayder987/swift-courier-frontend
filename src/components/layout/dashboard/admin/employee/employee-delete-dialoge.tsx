"use client";

import { AlertTriangle, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
}

const DeleteEmployeeDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
}: DeleteEmployeeDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md overflow-hidden rounded-2xl border-border/60 p-0">
        <div className="h-1 bg-[#e50914]" />

        <div className="p-6">
          <AlertDialogHeader>
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <AlertTriangle className="size-6" />
            </div>

            <AlertDialogTitle className="text-lg">
              Delete employee?
            </AlertDialogTitle>

            <AlertDialogDescription className="leading-6">
              This action will remove this employee from the active employee
              management system. Please make sure you are deleting the correct
              employee.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel disabled={isPending} className="rounded-xl">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={isPending}
              onClick={onConfirm}
              className="gap-2 rounded-xl bg-[#e50914] text-white hover:bg-[#c70811]"
            >
              <Trash2 className="size-4" />

              {isPending ? "Deleting..." : "Delete Employee"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEmployeeDialog;
