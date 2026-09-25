"use client";

import { FileText, Trash2 } from "lucide-react";

export const MAX_FILE_SIZE = 5;
export const MAX_VEHICLE_DOCUMENTS = 5;
export const MAX_NATIONAL_ID_FILES = 2;

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const isValidFile = (file: File) => {
  const maxSize = MAX_FILE_SIZE * 1024 * 1024;

  return file.size <= maxSize && ACCEPTED_FILE_TYPES.includes(file.type);
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/* -------------------------------------------------------------------------- */
/* File Upload Box                                                            */
/* -------------------------------------------------------------------------- */

type FileUploadBoxProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
};

export const FileUploadBox = ({
  icon,
  title,
  description,
  multiple = false,
  onChange,
}: FileUploadBoxProps) => {
  return (
    <label className="group flex min-h-24 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4 transition-all duration-300 hover:border-[#e50914]/30 hover:bg-[#e50914]/2 dark:border-white/8 dark:bg-white/2.5 dark:hover:border-[#e50914]/30 dark:hover:bg-[#e50914]/3">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/8 text-[#e50914] transition-all duration-300 group-hover:bg-[#e50914]/12 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.1)]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-slate-800 dark:text-white">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-slate-400 dark:text-slate-500">
          {description}
        </p>
      </div>

      <FileText className="hidden size-4 text-slate-400 sm:block" />

      <input
        type="file"
        multiple={multiple}
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        className="sr-only"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);

          onChange(files);

          event.target.value = "";
        }}
      />
    </label>
  );
};

/* -------------------------------------------------------------------------- */
/* Selected File                                                              */
/* -------------------------------------------------------------------------- */

type SelectedFileProps = {
  file: File;
  onRemove: () => void;
};

export const SelectedFile = ({ file, onRemove }: SelectedFileProps) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-white/8 dark:bg-white/2.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
        <FileText className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-slate-700 dark:text-white">
          {file.name}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          {formatFileSize(file.size)}
        </p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* File List                                                                  */
/* -------------------------------------------------------------------------- */

type FileListProps = {
  files: File[];
  onRemove: (index: number) => void;
};

export const FileList = ({ files, onRemove }: FileListProps) => {
  if (!files.length) {
    return null;
  }

  return (
    <div className="mt-2 space-y-2">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${file.lastModified}-${index}`}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/60 px-3 py-2.5 dark:border-white/8 dark:bg-white/2"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e50914]/8 text-[#e50914]">
            <FileText className="size-3.5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
              {file.name}
            </p>

            <p className="text-[10px] text-slate-400">
              {formatFileSize(file.size)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex size-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
