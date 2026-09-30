"use client";

import { useForm } from "@tanstack/react-form";
import { ImagePlus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageUploadProgressBar from "@/components/layout/dashboard/commmon/ImageUploadProgressBar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useUpdateProfileImage } from "@/hooks";
import { profilePhotoSchema } from "@/validation/user.validation";

interface ProfilePhotoUploadFormProps {
  openChange: () => void;
}

export default function ProfilePhotoUploadForm({
  openChange,
}: ProfilePhotoUploadFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: upload, isPending } = useUpdateProfileImage();

  const form = useForm({
    defaultValues: {
      profileImage: null as File | null,
    },

    validators: {
      onSubmit: profilePhotoSchema,
    },

    onSubmit: async ({ value }) => {
      if (!value.profileImage) return;

      upload(value.profileImage, {
        onSuccess: () => {
          toast.add({
            title: "Profile Photo Updated",
            description: "Your profile photo has been updated successfully.",
            type: "success",
          });

          openChange();
        },

        onError: (error) => {
          toast.add({
            title: "Upload Failed",
            description:
              error instanceof Error
                ? error.message
                : "Unable to update your profile photo. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      noValidate
      className="w-full"
    >
      <form.Field name="profileImage">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          const file = field.state.value;

          const handleFileChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const selectedFile = event.target.files?.[0];

            if (!selectedFile) return;

            field.handleChange(selectedFile);
            field.handleBlur();

            setPreview((previous) => {
              if (previous) {
                URL.revokeObjectURL(previous);
              }

              return URL.createObjectURL(selectedFile);
            });

            event.target.value = "";
          };

          const handleRemove = () => {
            field.handleChange(null);
            field.handleBlur();

            setPreview((previous) => {
              if (previous) {
                URL.revokeObjectURL(previous);
              }

              return null;
            });
          };

          return (
            <Field data-invalid={isInvalid} className="gap-4">
              <div>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Profile Photo
                </FieldLabel>

                <FieldDescription className="mt-1">
                  Upload a PNG, JPG, or WebP image up to 5MB.
                </FieldDescription>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
                {/* Upload Area */}
                <div className="flex min-h-45 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center transition-colors hover:bg-muted/40">
                  <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-[#e50914]/10 text-[#e50914]">
                    <Upload className="size-5" />
                  </div>

                  <p className="text-sm font-medium">
                    {file ? "Profile photo selected" : "Choose a profile photo"}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    PNG, JPG or WebP · Max 5MB
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    disabled={isPending}
                    onClick={() => inputRef.current?.click()}
                  >
                    <ImagePlus className="size-4" />
                    {file ? "Change Photo" : "Choose Photo"}
                  </Button>

                  <Input
                    ref={inputRef}
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    onBlur={field.handleBlur}
                    onChange={handleFileChange}
                    aria-invalid={isInvalid}
                  />
                </div>

                {/* Image Preview */}
                <div className="relative flex min-h-45 items-center justify-center overflow-hidden rounded-xl border bg-muted/30">
                  {preview ? (
                    <>
                      <Image
                        src={preview}
                        alt="Profile photo preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 pt-10">
                        <p className="truncate text-xs font-medium text-white">
                          {file?.name}
                        </p>

                        {file && (
                          <p className="text-[11px] text-white/70">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="secondary"
                        size="icon-sm"
                        className="absolute right-2 top-2"
                        aria-label="Remove profile photo"
                        onClick={handleRemove}
                        disabled={isPending}
                      >
                        <X className="size-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 text-center">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <ImagePlus className="size-4 text-muted-foreground" />
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Image preview
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>

      {isPending ? (
        <div className="">
          <ImageUploadProgressBar />
        </div>
      ) : (
        <div className="mt-5 flex items-center justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={openChange}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={!form.state.values.profileImage || isPending}
            className="bg-[#e50914] text-white hover:bg-[#e50914]/90"
          >
            {isPending ? "Uploading..." : "Upload Photo"}
          </Button>
        </div>
      )}
    </form>
  );
}
