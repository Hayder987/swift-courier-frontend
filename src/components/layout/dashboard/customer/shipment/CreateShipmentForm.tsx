"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  MapPin,
  Package,
  Scale,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { FetchError } from "ofetch";
import { useState } from "react";
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
import { useLiveLocation } from "@/hooks/location.hook";
import { useCreateShipment } from "@/hooks/shipment.hook";
import { shipmentCreateSchema } from "@/validation/shipment.validation";
import ShipmentImageUpload from "./ShipmentImageUpload";
import ShipmentLocationMap from "./ShipmentLocationMap";

const defaultValues = {
  parcelName: "",
  description: "",
  parcelWeightGM: "",
  pickupLat: "",
  pickupLng: "",
  deliveryAddress: "",
  ItemsImage: null as File | null,
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type LocationSource = "live" | "manual" | null;

const CreateShipmentForm = () => {
  const { mutate: createShipment, isPending: shipmentPending } =
    useCreateShipment();

  const { mutate: generateLocation, isPending: locationPending } =
    useLiveLocation();

  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const [locationSource, setLocationSource] = useState<LocationSource>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: shipmentCreateSchema,
    },

    onSubmit: async ({ value }) => {
      if (!value.ItemsImage) {
        toast.add({
          title: "Item Image Required",
          description:
            "Please upload an image of your parcel before submitting.",
          type: "error",
        });

        return;
      }

      if (!value.pickupLat || !value.pickupLng) {
        toast.add({
          title: "Pickup Location Required",
          description:
            "Please allow your current location or select a pickup location from the map.",
          type: "error",
        });

        return;
      }

      setSubmitState("submitting");

      const shipmentData = {
        parcelName: value.parcelName.trim(),
        description: value.description.trim(),
        parcelWeightGM: value.parcelWeightGM.trim(),
        pickupLat: value.pickupLat.trim(),
        pickupLng: value.pickupLng.trim(),
        deliveryAddress: value.deliveryAddress.trim(),
      };

      createShipment(
        {
          ItemsImage: value.ItemsImage,
          data: shipmentData,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              setSubmitState("error");

              toast.add({
                title: "Shipment Creation Failed",
                description:
                  res.message ||
                  "Unable to create your shipment. Please try again.",
                type: "error",
              });

              return;
            }

            setSubmitState("success");

            toast.add({
              title: "Shipment Created",
              description: "Your shipment has been created successfully.",
              type: "success",
            });

            form.reset();
            setLocationSource(null);
            router.push("/customer-dashboard/my-shipment");
          },

          onError: (error: FetchError) => {
            setSubmitState("error");

            const errorMessage =
              error.data?.message ??
              error.data?.errors?.[0]?.message ??
              error.message ??
              "Unable to create your shipment. Please try again.";

            toast.add({
              title: "Something Went Wrong",
              description: errorMessage,
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.add({
        title: "Location Not Supported",
        description: "Your browser does not support location services.",
        type: "error",
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toString();
        const longitude = position.coords.longitude.toString();

        generateLocation(
          {
            latitude,
            longitude,
          },
          {
            onSuccess: (res) => {
              if (!res.success || !res.data) {
                toast.add({
                  title: "Location Failed",
                  description:
                    res.message || "Unable to retrieve your location.",
                  type: "error",
                });

                return;
              }

              const location = res.data;

              form.setFieldValue("pickupLat", location.latitude);

              form.setFieldValue("pickupLng", location.longitude);

              form.setFieldMeta("pickupLat", (meta) => ({
                ...meta,
                isTouched: true,
              }));

              form.setFieldMeta("pickupLng", (meta) => ({
                ...meta,
                isTouched: true,
              }));

              setLocationSource("live");

              toast.add({
                title: "Pickup Location Updated",
                description:
                  "Your current location has been selected as the pickup location.",
                type: "success",
              });
            },

            onError: (error: FetchError) => {
              const errorMessage =
                error.data?.message ??
                error.data?.errors?.[0]?.message ??
                error.message ??
                "Unable to generate your location.";

              toast.add({
                title: "Location Error",
                description: errorMessage,
                type: "error",
              });
            },
          },
        );
      },

      (error) => {
        let message = "Unable to access your current location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location permission was denied. Please allow location access from your browser.";
            break;

          case error.POSITION_UNAVAILABLE:
            message = "Your current location is unavailable.";
            break;

          case error.TIMEOUT:
            message = "Location request timed out. Please try again.";
            break;
        }

        toast.add({
          title: "Location Access Failed",
          description: message,
          type: "error",
        });
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const handleManualMapLocation = (latitude: string, longitude: string) => {
    form.setFieldValue("pickupLat", latitude);
    form.setFieldValue("pickupLng", longitude);

    form.setFieldMeta("pickupLat", (meta) => ({
      ...meta,
      isTouched: true,
    }));

    form.setFieldMeta("pickupLng", (meta) => ({
      ...meta,
      isTouched: true,
    }));

    setLocationSource("manual");

    toast.add({
      title: "Pickup Location Updated",
      description:
        "Your manually selected map location is now the pickup location.",
      type: "success",
    });
  };

  return (
    <div className="mx-auto max-w-380">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        {/* LEFT — LOCATION */}
        <div className="min-h-130 lg:sticky lg:top-6 lg:h-fit">
          <ShipmentLocationMap
            latitude={form.state.values.pickupLat}
            longitude={form.state.values.pickupLng}
            isLocating={locationPending}
            locationSource={locationSource}
            onLocate={handleUseMyLocation}
            onMapLocationChange={handleManualMapLocation}
          />
        </div>

        {/* RIGHT — FORM */}
        <Card className="relative overflow-hidden border-border/60 bg-card/85 shadow-2xl shadow-slate-950/5 backdrop-blur-xl dark:shadow-black/30">
          {/* Top Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-[#e50914]" />

          {/* Glows */}
          <div className="pointer-events-none absolute -top-32 -right-24 size-64 rounded-full bg-[#e50914]/5 blur-3xl dark:bg-[#e50914]/10" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 size-64 rounded-full bg-[#e50914]/4 blur-3xl dark:bg-[#e50914]/8" />

          <CardHeader className="relative px-6 pt-8 pb-5 sm:px-8 sm:pt-9">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
                <Package className="size-5" />
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-bold tracking-wide text-emerald-500 uppercase">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Secure Delivery
              </div>
            </div>

            <h2 className="text-2xl font-black tracking-[-0.035em] text-foreground sm:text-3xl">
              Create a shipment
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Tell us about your parcel and pickup location. We&apos;ll take
              care of the rest.
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
              {/* Parcel Name + Weight */}
              <div className="grid gap-5 sm:grid-cols-2">
                <form.Field name="parcelName">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Parcel Name
                        </FieldLabel>

                        <div className="relative">
                          <Package className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            placeholder="Electronics"
                            aria-invalid={isInvalid}
                            className="h-12 border-border/70 bg-muted/30 pl-10 transition-all focus:border-[#e50914]/40 focus:ring-[#e50914]/10"
                          />
                        </div>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="parcelWeightGM">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Weight (GM)
                        </FieldLabel>

                        <div className="relative">
                          <Scale className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id={field.name}
                            name={field.name}
                            type="number"
                            min="1"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            placeholder="1500"
                            aria-invalid={isInvalid}
                            className="h-12 border-border/70 bg-muted/30 pl-10 transition-all focus:border-[#e50914]/40 focus:ring-[#e50914]/10"
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

              {/* Description */}
              <form.Field name="description">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Parcel Description
                      </FieldLabel>

                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Describe what you are sending..."
                        aria-invalid={isInvalid}
                        className="min-h-28 resize-none border-border/70 bg-muted/30 px-4 py-3.5 leading-6 transition-all focus:border-[#e50914]/40 focus:ring-[#e50914]/10"
                      />

                      <FieldDescription>
                        Add a short description of your parcel.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Coordinates */}
              <div className="grid gap-5 sm:grid-cols-2">
                <form.Field name="pickupLat">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Pickup Latitude
                        </FieldLabel>

                        <div className="relative">
                          <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            readOnly
                            placeholder="24.006400"
                            aria-invalid={isInvalid}
                            className="h-12 border-border/70 bg-muted/30 pl-10"
                          />
                        </div>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="pickupLng">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Pickup Longitude
                        </FieldLabel>

                        <div className="relative">
                          <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            readOnly
                            placeholder="89.237200"
                            aria-invalid={isInvalid}
                            className="h-12 border-border/70 bg-muted/30 pl-10"
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

              {/* Delivery Address */}
              <form.Field name="deliveryAddress">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Delivery Address
                      </FieldLabel>

                      <div className="relative">
                        <MapPin className="pointer-events-none absolute top-4 left-3.5 size-4 text-muted-foreground" />

                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          placeholder="Manually Enter complete delivery address..."
                          aria-invalid={isInvalid}
                          className="min-h-28 resize-none border-border/70 bg-muted/30 pl-10 pt-3.5 leading-6 transition-all focus:border-[#e50914]/40 focus:ring-[#e50914]/10"
                        />
                      </div>

                      <FieldDescription>
                        Enter the complete address where your parcel should be
                        delivered.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Item Image */}
              <form.Field name="ItemsImage">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Item Image</FieldLabel>

                      <ShipmentImageUpload
                        value={field.state.value}
                        invalid={isInvalid}
                        onChange={(file) => {
                          field.handleChange(file);
                          field.handleBlur();
                        }}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Security */}
              <div className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />

                <p className="text-[10px] leading-5 text-muted-foreground">
                  Your shipment information is securely processed and your
                  pickup coordinates are used only for delivery logistics.
                </p>
              </div>

              {/* Submit Progress */}
              {(shipmentPending ||
                submitState === "success" ||
                submitState === "error") && (
                <GlobalProgressBar
                  isError={submitState === "error"}
                  completeTitle={
                    submitState === "error"
                      ? "UnSuccessful"
                      : submitState === "success"
                        ? "Successful"
                        : "Processing"
                  }
                  completeDescription={
                    submitState === "error"
                      ? "Unable to create your shipment. Please try again."
                      : submitState === "success"
                        ? "Your shipment was created successfully."
                        : "Creating your shipment..."
                  }
                />
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={shipmentPending || locationPending}
                className="group h-13 w-full rounded-xl bg-[#e50914] font-bold text-white shadow-lg shadow-[#e50914]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c70812] hover:shadow-[#e50914]/30 disabled:translate-y-0"
              >
                <Truck className="size-4" />

                {shipmentPending ? "Creating Shipment..." : "Create Shipment"}

                <ArrowUpRight className="ml-auto size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                <FileText className="size-3" />

                <span>
                  Make sure your parcel information is accurate before
                  submitting.
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateShipmentForm;
