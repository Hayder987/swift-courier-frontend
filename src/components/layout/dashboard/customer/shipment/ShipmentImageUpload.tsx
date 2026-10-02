"use client";

import { CheckCircle2, ImageIcon, Trash2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";

interface ShipmentImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  invalid?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ShipmentImageUpload = ({
  value,
  onChange,
  invalid,
}: ShipmentImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      return;
    }

    onChange(file);
  };

  if (value && preview) {
    return (
      <div
        className={`overflow-hidden rounded-2xl border bg-card ${
          invalid ? "border-destructive/50" : "border-border/60"
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={preview}
            alt="Shipment item preview"
            className="size-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-4">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="size-4 text-emerald-400" />

              <span className="max-w-50 truncate text-xs font-medium">
                {value.name}
              </span>
            </div>

            <Button
              type="button"
              size="icon-sm"
              variant="destructive"
              onClick={() => onChange(null)}
              className="rounded-lg"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <label
      className={`group block cursor-pointer rounded-2xl border border-dashed p-5 transition-all duration-300 sm:p-7 ${
        invalid
          ? "border-destructive/60 bg-destructive/5"
          : "border-border/80 bg-muted/30 hover:border-[#e50914]/40 hover:bg-[#e50914]/3"
      }`}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);

          event.currentTarget.value = "";
        }}
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex size-13 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914] transition-transform duration-300 group-hover:scale-105">
          <ImageIcon className="size-6" />
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <UploadCloud className="size-4 text-[#e50914]" />
          Upload item image
        </div>

        <FieldDescription className="mt-2 max-w-sm text-center">
          JPG, PNG or WebP. Maximum file size 5MB.
        </FieldDescription>
      </div>
    </label>
  );
};

export default ShipmentImageUpload;
