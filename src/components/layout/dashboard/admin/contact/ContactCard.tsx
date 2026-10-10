"use client";

import { format } from "date-fns";
import {
  CalendarDays,
  Clock3,
  Mail,
  MessageSquareText,
  Trash2,
} from "lucide-react";
import type { FetchError } from "ofetch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useDeleteContactInfo } from "@/hooks/admin.hook";
import type { IContactInfo } from "@/types/contact.info.type";

import DeleteContactDialog from "./DeleteContactDialog";

const ContactCard = ({ contact }: { contact: IContactInfo }) => {
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);

  const { mutate: deleteContact, isPending: conDeletePending } =
    useDeleteContactInfo(deleteContactId);

  const handleConfirmDelete = () => {
    if (!deleteContactId) return;

    deleteContact(undefined, {
      onSuccess: () => {
        setDeleteContactId(null);

        toast.add({
          title: "Contact Deleted",
          description: "The contact message was deleted successfully.",
          type: "success",
        });
      },
      onError: (error: FetchError) => {
        const errorMessage =
          error.data?.message ??
          error.data?.errors?.[0]?.message ??
          error.message ??
          "Unable to delete this contact. Please try again.";

        toast.add({
          title: "Something Went Wrong",
          description: errorMessage,
          type: "error",
        });
      },
    });
  };

  const formattedDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Unknown date";

    return format(parsedDate, "dd MMM yyyy");
  };

  return (
    <>
      <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e50914]/40 hover:shadow-lg hover:shadow-[#e50914]/5">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#e50914] via-[#ff4651] to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#e50914]/15 bg-[#e50914]/10 text-[#e50914]">
                <MessageSquareText className="size-5" />
              </div>

              <div className="min-w-0 pt-0.5">
                <h3 className="line-clamp-2 break-words text-base font-bold leading-6 tracking-tight text-foreground sm:text-lg">
                  {contact.title}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Contact request
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full border border-[#e50914]/20 bg-[#e50914]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#e50914]">
              Message
            </span>
          </div>

          {/* Email */}
          <div className="mb-4 flex min-w-0 items-center gap-2.5 rounded-xl border border-border/60 bg-muted/40 p-3">
            <Mail className="size-4 shrink-0 text-[#e50914]" />

            <a
              href={`mailto:${contact.email}`}
              className="min-w-0 break-all text-sm font-medium text-foreground transition-colors hover:text-[#e50914]"
              title={contact.email}
            >
              {contact.email}
            </a>
          </div>

          {/* Description */}
          <div className="flex flex-1 flex-col rounded-xl border border-border/60 bg-muted/20 p-3.5">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <MessageSquareText className="size-3.5" />
              Description
            </p>

            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-foreground/80">
              {contact.description}
            </p>
          </div>

          {/* Dates */}
          <div className="mt-4 grid grid-cols-1 gap-2 border-t border-border/60 pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5 shrink-0" />
              <span>Created:</span>
              <span className="font-medium text-foreground/80">
                {formattedDate(contact.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock3 className="size-3.5 shrink-0" />
              <span>Updated:</span>
              <span className="font-medium text-foreground/80">
                {formattedDate(contact.updatedAt)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 border-t border-border/60 pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full border-destructive/20 text-destructive hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => setDeleteContactId(contact.id)}
            >
              <Trash2 className="mr-2 size-4" />
              Delete Contact
            </Button>
          </div>
        </div>
      </article>

      <DeleteContactDialog
        open={!!deleteContactId}
        onOpenChange={(open) => {
          if (!open && !conDeletePending) {
            setDeleteContactId(null);
          }
        }}
        onConfirm={handleConfirmDelete}
        isPending={conDeletePending}
      />
    </>
  );
};

export default ContactCard;
