"use client";

import { useForm } from "@tanstack/react-form";
import { ChevronDown, Loader2, MapPin, Ruler, Save } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateZonesAdmin } from "@/hooks/zone.hook";
import type { ISingleZone } from "@/types/zone.type";
import { updateZoneValidationSchema } from "@/validation/zone.validation";

interface AdminZoneUpdateDialogProps {
  zone: ISingleZone | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getFieldError = (errors: readonly unknown[]): string | undefined => {
  const error = errors[0];

  if (!error) return undefined;

  if (typeof error === "string") return error;

  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }

  return undefined;
};

const AdminZoneUpdateDialog = ({
  zone,
  open,
  onOpenChange,
}: AdminZoneUpdateDialogProps) => {
  const updateMutation = useUpdateZonesAdmin();

  const form = useForm({
    defaultValues: {
      name: zone?.name ?? "",
      code: zone?.code ?? "",
      address: zone?.address ?? "",
      radiusKm: zone?.radiusKm ?? 1,
      isActive: zone?.isActive ?? true,
    },

    validators: {
      onSubmit: updateZoneValidationSchema,
    },

    onSubmit: async ({ value }) => {
      if (!zone) return;

      try {
        await updateMutation.mutateAsync({
          zoneId: zone.id,
          payload: value,
        });

        onOpenChange(false);
      } catch {
        // Global error handler/toast can handle API error.
      }
    },
  });

  useEffect(() => {
    if (!zone || !open) return;

    form.reset({
      name: zone.name,
      code: zone.code,
      address: zone.address,
      radiusKm: zone.radiusKm,
      isActive: zone.isActive,
    });
  }, [zone, open, form]);

  if (!zone) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] overflow-y-auto rounded-3xl border-border/60 p-0 sm:max-w-2xl">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[#e50914]/10 blur-3xl" />

          <DialogHeader className="relative border-b border-border/60 px-5 py-6 text-left sm:px-7">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
                <MapPin className="size-5" />
              </div>

              <div>
                <DialogTitle className="text-xl font-bold tracking-tight">
                  Update Zone
                </DialogTitle>

                <DialogDescription className="mt-1">
                  Update the delivery zone information and availability.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form
            className="relative space-y-5 px-5 py-6 sm:px-7"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <form.Field name="name">
                {(field) => {
                  const error = getFieldError(field.state.meta.errors);

                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Zone Name</Label>

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="e.g. Gazipur"
                        className="h-11 rounded-xl"
                      />

                      {error ? (
                        <p className="text-xs font-medium text-destructive">
                          {error}
                        </p>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>

              <form.Field name="code">
                {(field) => {
                  const error = getFieldError(field.state.meta.errors);

                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Zone Code</Label>

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value.toUpperCase())
                        }
                        placeholder="e.g. GAZ"
                        className="h-11 rounded-xl font-mono uppercase"
                      />

                      {error ? (
                        <p className="text-xs font-medium text-destructive">
                          {error}
                        </p>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>
            </div>

            <form.Field name="address">
              {(field) => {
                const error = getFieldError(field.state.meta.errors);

                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Address</Label>

                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Enter zone address"
                      className="min-h-25 resize-none rounded-xl"
                    />

                    {error ? (
                      <p className="text-xs font-medium text-destructive">
                        {error}
                      </p>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <form.Field name="radiusKm">
                {(field) => {
                  const error = getFieldError(field.state.meta.errors);

                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Delivery Radius</Label>

                      <div className="relative">
                        <Ruler className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                          id={field.name}
                          name={field.name}
                          type="number"
                          min={1}
                          max={500}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => {
                            const value = event.target.value;

                            field.handleChange(
                              value === "" ? 1 : Number(value),
                            );
                          }}
                          className="h-11 rounded-xl pl-10 pr-14"
                        />

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                          KM
                        </span>
                      </div>

                      {error ? (
                        <p className="text-xs font-medium text-destructive">
                          {error}
                        </p>
                      ) : null}
                    </div>
                  );
                }}
              </form.Field>

              <form.Field name="isActive">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Zone Status</Label>

                    <Select
                      value={field.state.value ? "active" : "inactive"}
                      onValueChange={(value) =>
                        field.handleChange(value === "active")
                      }
                    >
                      <SelectTrigger className="h-11 w-full rounded-xl">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500" />
                            Active
                          </div>
                        </SelectItem>

                        <SelectItem value="inactive">
                          <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-muted-foreground" />
                            Inactive
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
            </div>

            <div className="rounded-2xl border border-[#e50914]/15 bg-[#e50914]/5 p-4">
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
                  <ChevronDown className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Boundary stays unchanged
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    The existing geographic polygon and coordinates will remain
                    unchanged.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-border/60 pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                disabled={updateMutation.isPending}
                onClick={() => onOpenChange(false)}
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
                      !canSubmit || isSubmitting || updateMutation.isPending
                    }
                    className="rounded-xl bg-[#e50914] text-white hover:bg-[#c70811]"
                  >
                    {updateMutation.isPending || isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminZoneUpdateDialog;
