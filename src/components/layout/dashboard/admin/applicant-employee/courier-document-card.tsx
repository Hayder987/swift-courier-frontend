"use client";

import { ExternalLink, FileText, ImageIcon, Maximize2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ICourierDocument } from "@/types";

interface CourierDocumentCardProps {
  document: ICourierDocument;
  index: number;
  label: string;
}

const getFileType = (url: string) => {
  const cleanUrl = url.split("?")[0].toLowerCase();

  if (cleanUrl.endsWith(".pdf")) {
    return "pdf";
  }

  if (
    cleanUrl.endsWith(".jpg") ||
    cleanUrl.endsWith(".jpeg") ||
    cleanUrl.endsWith(".png") ||
    cleanUrl.endsWith(".webp") ||
    cleanUrl.endsWith(".gif")
  ) {
    return "image";
  }

  return "unknown";
};

const CourierDocumentCard = ({
  document,
  index,
  label,
}: CourierDocumentCardProps) => {
  const fileType = getFileType(document.url);

  return (
    <div className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-muted/30 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
            {fileType === "image" ? (
              <ImageIcon className="size-4" />
            ) : (
              <FileText className="size-4" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">
              {label} {index + 1}
            </p>

            <Badge
              variant="outline"
              className="mt-1 rounded-full px-1.5 py-0 text-[9px] uppercase"
            >
              {fileType === "unknown" ? "File" : fileType}
            </Badge>
          </div>
        </div>

        <Button size="icon" variant="ghost" className="size-8 shrink-0">
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label} ${index + 1}`}
          >
            <ExternalLink className="size-4" />
          </a>
        </Button>
      </div>

      {/* Preview */}
      <div className="relative aspect-16/10 overflow-hidden bg-muted/20">
        {fileType === "image" ? (
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block size-full"
          >
            <Image
              src={document.url}
              alt={`${label} ${index + 1}`}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              fill
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
              <div className="flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur">
                <Maximize2 className="size-4" />
              </div>
            </div>
          </a>
        ) : fileType === "pdf" ? (
          <iframe
            src={document.url}
            title={`${label} ${index + 1}`}
            className="size-full border-0"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center">
            <FileText className="size-8 text-muted-foreground" />

            <p className="text-xs text-muted-foreground">Preview unavailable</p>

            <Button size="sm" variant="outline">
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                Open file
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourierDocumentCard;
