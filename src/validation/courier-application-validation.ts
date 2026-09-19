import z from "zod";

export const MAX_FILE_SIZE = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;
export const MAX_ADDITIONAL_FILES = 5;
export const MAX_VEHICLE_DOCUMENTS = 5;
export const MAX_NATIONAL_ID_FILES = 2;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

export const getCustomFileSchema = <T>(message: string) =>
  z.custom<T>(
    (value) =>
      value === null ||
      (value instanceof File &&
        isAcceptedFileSize(value.size) &&
        isAcceptedFileType(value.type)),
    {
      message,
    },
  );

export const courierApplicationSchema = z.object({
  permanentAddress: z
    .string()
    .trim()
    .min(10, "Permanent address must be at least 10 characters long"),

  permanentCity: z.string().trim().min(2, "Permanent city is required"),

  vehicleLicenseNumber: z
    .string()
    .trim()
    .min(5, "Vehicle license number is required")
    .max(30, "Vehicle license number cannot exceed 30 characters"),

  qualifications: z
    .string()
    .trim()
    .min(2, "Qualifications are required")
    .max(150, "Qualifications cannot exceed 150 characters"),

  resume: getCustomFileSchema<File | null>(
    `Resume must be a PDF or image file under ${MAX_FILE_SIZE}MB`,
  ).refine((value) => value instanceof File, {
    message: "A resume or CV is required",
  }),

  vehicleDocuments: z
    .array(z.custom<File>((value) => value instanceof File))
    .min(1, "At least one vehicle document is required")
    .max(
      MAX_VEHICLE_DOCUMENTS,
      `You can attach at most ${MAX_VEHICLE_DOCUMENTS} vehicle documents`,
    )
    .refine(
      (files) =>
        files.every(
          (file) =>
            isAcceptedFileSize(file.size) && isAcceptedFileType(file.type),
        ),
      {
        message: `Each vehicle document must be a PDF or image file under ${MAX_FILE_SIZE}MB`,
      },
    ),

  nationalIdPic: z
    .array(z.custom<File>((value) => value instanceof File))
    .min(1, "At least one NID document is required")
    .max(
      MAX_NATIONAL_ID_FILES,
      `You can attach at most ${MAX_NATIONAL_ID_FILES} NID files`,
    )
    .refine(
      (files) =>
        files.every(
          (file) =>
            isAcceptedFileSize(file.size) && isAcceptedFileType(file.type),
        ),
      {
        message: `Each NID file must be a PDF or image file under ${MAX_FILE_SIZE}MB`,
      },
    ),
});
