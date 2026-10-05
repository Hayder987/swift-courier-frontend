"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  MapPin,
  MapPinned,
  Radius,
} from "lucide-react";
import type { FetchError } from "ofetch";

import GlobalProgressBar from "@/components/loading/global-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateZone } from "@/hooks/zone.hook";
import { createZoneZodSchema } from "@/validation/zone.validation";

const defaultValues = {
  name: "",
  code: "",
  address: "",
  radiusKm: 60,
  isActive: true,
};

const CreateZoneForm = () => {
  const { mutate: createZone, isPending, isError } = useCreateZone();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createZoneZodSchema,
    },

    onSubmit: async ({ value }) => {
      const zoneData = {
        name: value.name.trim(),
        code: value.code.trim().toUpperCase(),
        address: value.address.trim(),
        radiusKm: value.radiusKm,
        isActive: value.isActive,
      };

      createZone(zoneData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Zone Creation Failed",
              description:
                res.message || "Unable to create the zone. Please try again.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Zone Created Successfully",
            description: `${zoneData.name} has been added to your delivery zones.`,
            type: "success",
          });
          form.reset();
        },

        onError: (error: FetchError) => {
          const errorMessage =
            error.data?.message ??
            error.data?.errors?.[0]?.message ??
            error.message ??
            "Unable to create the zone. Please try again.";

          toast.add({
            title: "Something Went Wrong",
            description: errorMessage,
            type: "error",
          });
        },
      });
    },
  });

  return (
    <Card className="relative overflow-hidden border-slate-200 bg-white/90 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/8 dark:bg-slate-950/80 dark:shadow-black/30">
      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#e50914]" />

      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -top-32 -right-24 size-64 rounded-full bg-[#e50914]/6 blur-3xl dark:bg-[#e50914]/10" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 size-64 rounded-full bg-[#e50914]/4 blur-3xl dark:bg-[#e50914]/8" />

      {/* Header */}
      <CardHeader className="relative px-6 pt-8 pb-5 sm:px-8 sm:pt-9">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
            <MapPinned className="size-5" />
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-bold tracking-wide text-emerald-500 uppercase">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Delivery Zone
          </div>
        </div>

        <h2 className="text-2xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl">
          Create a delivery zone
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Define a service area for SwiftCourier deliveries by adding a zone
          name, code, address, and coverage radius.
        </p>
      </CardHeader>

      <CardContent className="relative px-6 pb-8 sm:px-8 sm:pb-9">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
          noValidate
        >
          {/* Zone Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Zone Name</FieldLabel>

                  <div className="relative">
                    <MapPinned className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Pabna"
                      aria-invalid={isInvalid}
                      className="h-12 border-slate-200 bg-slate-50/80 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  <FieldDescription>
                    Give this delivery zone a clear and recognizable name.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Zone Code */}
          <form.Field name="code">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Zone Code</FieldLabel>

                  <div className="relative">
                    <Code2 className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value.toUpperCase())
                      }
                      placeholder="PAB"
                      maxLength={20}
                      autoCapitalize="characters"
                      aria-invalid={isInvalid}
                      className="h-12 border-slate-200 bg-slate-50/80 pl-10 text-slate-900 uppercase transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  <FieldDescription>
                    Use uppercase letters, numbers, and hyphens only. Example:
                    PABNA-01.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Address */}
          <form.Field name="address">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Zone Address</FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Pabna, Bangladesh"
                    aria-invalid={isInvalid}
                    className="min-h-28 resize-none border-slate-200 bg-slate-50/80 px-4 py-3.5 leading-6 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                  />

                  <FieldDescription>
                    Enter the primary address or location represented by this
                    delivery zone.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Radius */}
          <form.Field name="radiusKm">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Coverage Radius</FieldLabel>

                  <div className="relative">
                    <Radius className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      max={500}
                      step={1}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const value = event.target.value;

                        field.handleChange(value === "" ? 0 : Number(value));
                      }}
                      placeholder="40"
                      aria-invalid={isInvalid}
                      className="h-12 border-slate-200 bg-slate-50/80 pr-16 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                    />

                    <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-semibold text-slate-400">
                      km
                    </span>
                  </div>

                  <FieldDescription>
                    Set the maximum delivery coverage radius. Maximum allowed
                    radius is 500 km.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Zone Preview */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-4 dark:border-white/6 dark:bg-white/[0.025]">
            <div className="pointer-events-none absolute -right-10 -bottom-10 size-28 rounded-full bg-[#e50914]/5 blur-2xl dark:bg-[#e50914]/10" />

            <div className="relative flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
                <MapPin className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Delivery coverage
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-500">
                  Shipments within the configured radius can be handled through
                  this delivery zone.
                </p>
              </div>
            </div>
          </div>

          {/* Security / Info */}
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 dark:border-white/6 dark:bg-white/[0.025]">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />

            <p className="text-[10px] leading-5 text-slate-500 dark:text-slate-500">
              Make sure the zone code, address, and radius accurately represent
              your intended delivery coverage area.
            </p>
          </div>

          {/* Submit */}
          {isPending ? (
            <GlobalProgressBar
              isError={isError}
              completeTitle={isError ? "UnSuccessful!!!" : "Creating Zone"}
              completeDescription={
                isError
                  ? "Unable to create the zone. Please try again."
                  : "Your delivery zone is being created."
              }
            />
          ) : (
            <Button
              type="submit"
              disabled={isPending}
              className="group h-13 w-full rounded-xl bg-[#e50914] font-bold text-white shadow-lg shadow-[#e50914]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c70812] hover:shadow-[#e50914]/30 disabled:translate-y-0"
            >
              <MapPinned className="size-4" />
              Create Delivery Zone
              <ArrowUpRight className="ml-auto size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateZoneForm;
