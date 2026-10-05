"use client";

import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteZone } from "@/hooks/zone.hook";
import type { ISingleZone } from "@/types/zone.type";

interface AdminZoneDeleteDialogProps {
  zone: ISingleZone | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminZoneDeleteDialog = ({
  zone,
  open,
  onOpenChange,
}: AdminZoneDeleteDialogProps) => {
  const deleteMutation = useDeleteZone();

  const handleDelete = async () => {
    if (!zone) return;

    try {
      await deleteMutation.mutateAsync(zone.id);
      onOpenChange(false);
    } catch {
      // Global error handler/toast can handle API error.
    }
  };

  if (!zone) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-border/60 p-0">
        <div className="p-5 sm:p-6">
          <DialogHeader className="text-left">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <AlertTriangle className="size-6" />
            </div>

            <DialogTitle className="text-xl">Delete zone?</DialogTitle>

            <DialogDescription className="pt-1 leading-6">
              This action will permanently remove this zone. Please make sure it
              is no longer required before continuing.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{zone.name}</p>

                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {zone.code}
                </p>
              </div>

              <Badge variant="outline">{zone.radiusKm} KM</Badge>
            </div>
          </div>

          <DialogFooter className="mt-6 flex-col-reverse gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl sm:w-auto"
              disabled={deleteMutation.isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              className="w-full rounded-xl sm:w-auto"
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete Zone
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminZoneDeleteDialog;
