import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageFileSchema = z.custom<File>(
  (value) =>
    value instanceof File &&
    value.size <= MAX_FILE_SIZE &&
    ACCEPTED_IMAGE_TYPES.includes(value.type),
  {
    message: "Please upload a valid image under 5MB.",
  },
);

export const shipmentCreateSchema = z.object({
  parcelName: z
    .string()
    .trim()
    .min(2, "Parcel name must be at least 2 characters.")
    .max(100, "Parcel name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters.")
    .max(500, "Description cannot exceed 500 characters."),

  parcelWeightGM: z
    .string()
    .trim()
    .min(1, "Parcel weight is required.")
    .refine((value) => {
      const weight = Number(value);

      return Number.isFinite(weight) && weight > 0;
    }, "Parcel weight must be a positive number."),

  pickupLat: z
    .string()
    .trim()
    .min(1, "Pickup location is required.")
    .refine((value) => {
      const latitude = Number(value);

      return Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
    }, "Invalid pickup latitude."),

  pickupLng: z
    .string()
    .trim()
    .min(1, "Pickup location is required.")
    .refine((value) => {
      const longitude = Number(value);

      return (
        Number.isFinite(longitude) && longitude >= -180 && longitude <= 180
      );
    }, "Invalid pickup longitude."),

  deliveryAddress: z
    .string()
    .trim()
    .min(10, "Delivery address must be at least 10 characters.")
    .max(300, "Delivery address cannot exceed 300 characters."),

  ItemsImage: imageFileSchema,
});
