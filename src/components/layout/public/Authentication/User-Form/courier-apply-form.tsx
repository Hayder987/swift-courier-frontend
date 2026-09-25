"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowUpRight,
  BadgeCheck,
  Bike,
  CheckCircle2,
  FileUp,
  GraduationCap,
  IdCard,
  Loader2,
  MapPin,
  UploadCloud,
} from "lucide-react";

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
import { useApplyCourier } from "@/hooks/employee.hook";
import { courierApplicationSchema } from "@/validation/courier-application-validation";

import {
  FileList,
  FileUploadBox,
  isValidFile,
  MAX_FILE_SIZE,
  MAX_NATIONAL_ID_FILES,
  MAX_VEHICLE_DOCUMENTS,
  SelectedFile,
} from "./CourierFileUpload";

const defaultValues = {
  permanentAddress: "",
  permanentCity: "",
  vehicleLicenseNumber: "",
  qualifications: "",
  resume: null as File | null,
  vehicleDocuments: [] as File[],
  nationalIdPic: [] as File[],
};

const CourierApplyForm = () => {
  const { mutate: applyCourier, isPending } = useApplyCourier();

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: courierApplicationSchema,
    },

    onSubmit: async ({ value }) => {
      const courierData = {
        permanentAddress: value.permanentAddress.trim(),
        permanentCity: value.permanentCity.trim(),
        vehicleLicenseNumber: value.vehicleLicenseNumber.trim(),
        qualifications: value.qualifications.trim(),
      };

      applyCourier(
        {
          data: courierData,
          resume: value.resume as File,
          vehicleDocuments: value.vehicleDocuments,
          nationalIdPic: value.nationalIdPic,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Application Failed",
                description:
                  res.message ||
                  "Unable to submit your application. Please try again.",
                type: "error",
              });

              return;
            }

            toast.add({
              title: "Application Submitted",
              description:
                "Your courier application has been submitted successfully.",
              type: "success",
            });

            form.reset();
          },

          onError: (error) => {
            toast.add({
              title: "Something Went Wrong",
              description:
                error instanceof Error
                  ? error.message
                  : "Unable to submit your application. Please try again.",
              type: "error",
            });
          },
        },
      );
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
            <Bike className="size-5" />
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-bold tracking-wide text-emerald-500 uppercase">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Join Our Network
          </div>
        </div>

        <h2 className="text-2xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl">
          Become a courier
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Complete your application and become part of the SwiftCourier delivery
          network.
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
          {/* Permanent City */}
          <form.Field name="permanentCity">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Permanent City</FieldLabel>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

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
                    Enter your permanent city.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Permanent Address */}
          <form.Field name="permanentAddress">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Permanent Address
                  </FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Enter your complete permanent address..."
                    aria-invalid={isInvalid}
                    className="min-h-28 resize-none border-slate-200 bg-slate-50/80 px-4 py-3.5 leading-6 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                  />

                  <FieldDescription>
                    Provide your complete permanent residential address.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Vehicle + Qualification */}
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="vehicleLicenseNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Vehicle License
                    </FieldLabel>

                    <div className="relative">
                      <BadgeCheck className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="58698774585"
                        aria-invalid={isInvalid}
                        className="h-12 border-slate-200 bg-slate-50/80 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="qualifications">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Qualifications</FieldLabel>

                    <div className="relative">
                      <GraduationCap className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="BBA"
                        aria-invalid={isInvalid}
                        className="h-12 border-slate-200 bg-slate-50/80 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* Resume */}
          <form.Field name="resume">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const file = field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Resume / CV</FieldLabel>

                  {!file ? (
                    <FileUploadBox
                      icon={<FileUp className="size-5" />}
                      title="Upload your resume"
                      description={`PDF or image • Maximum ${MAX_FILE_SIZE}MB`}
                      onChange={(files) => {
                        const file = files[0];

                        if (!file) return;

                        if (!isValidFile(file)) {
                          field.handleBlur();
                          return;
                        }

                        field.handleChange(file);
                        field.handleBlur();
                      }}
                    />
                  ) : (
                    <SelectedFile
                      file={file}
                      onRemove={() => {
                        field.handleChange(null);
                        field.handleBlur();
                      }}
                    />
                  )}

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Vehicle Documents */}
          <form.Field name="vehicleDocuments">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const files = field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <FieldLabel>Vehicle Documents</FieldLabel>

                    <span className="text-[10px] font-semibold text-slate-400">
                      {files.length}/{MAX_VEHICLE_DOCUMENTS}
                    </span>
                  </div>

                  {files.length < MAX_VEHICLE_DOCUMENTS && (
                    <FileUploadBox
                      icon={<Bike className="size-5" />}
                      title="Add vehicle documents"
                      description="Registration, ownership or supporting documents"
                      multiple
                      onChange={(incoming) => {
                        const validFiles = incoming.filter(isValidFile);
                        const remaining = MAX_VEHICLE_DOCUMENTS - files.length;

                        field.handleChange([
                          ...files,
                          ...validFiles.slice(0, remaining),
                        ]);

                        field.handleBlur();
                      }}
                    />
                  )}

                  <FileList
                    files={files}
                    onRemove={(index) => {
                      field.handleChange(files.filter((_, i) => i !== index));
                      field.handleBlur();
                    }}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* National ID */}
          <form.Field name="nationalIdPic">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const files = field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <FieldLabel>National ID</FieldLabel>

                    <span className="text-[10px] font-semibold text-slate-400">
                      {files.length}/{MAX_NATIONAL_ID_FILES}
                    </span>
                  </div>

                  {files.length < MAX_NATIONAL_ID_FILES && (
                    <FileUploadBox
                      icon={<IdCard className="size-5" />}
                      title="Upload NID documents"
                      description="Front and back copies of your NID"
                      multiple
                      onChange={(incoming) => {
                        const validFiles = incoming.filter(isValidFile);
                        const remaining = MAX_NATIONAL_ID_FILES - files.length;

                        field.handleChange([
                          ...files,
                          ...validFiles.slice(0, remaining),
                        ]);

                        field.handleBlur();
                      }}
                    />
                  )}

                  <FileList
                    files={files}
                    onRemove={(index) => {
                      field.handleChange(files.filter((_, i) => i !== index));
                      field.handleBlur();
                    }}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Security */}
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 dark:border-white/6 dark:bg-white/2.5">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />

            <p className="text-[10px] leading-5 text-slate-500 dark:text-slate-500">
              Your information and documents are handled securely and are used
              only for courier verification.
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="group h-13 w-full rounded-xl bg-[#e50914] font-bold text-white shadow-lg shadow-[#e50914]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c70812] hover:shadow-[#e50914]/30 disabled:translate-y-0"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <UploadCloud className="size-4" />
                Submit Application
                <ArrowUpRight className="ml-auto size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourierApplyForm;
