"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

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
import { useCreateContact } from "@/hooks/public.hooks";
import { contactSchema } from "@/validation/contact.validation";

const defaultValues = {
  title: "",
  email: "",
  description: "",
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const { mutate: createContact, isPending } = useCreateContact();

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: contactSchema,
    },

    onSubmit: async ({ value }) => {
      const contactData = {
        title: value.title.trim(),
        email: value.email.trim(),
        description: value.description.trim(),
      };

      createContact(contactData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Message Failed",
              description:
                res.message || "Unable to send your message. Please try again.",
              type: "error",
            });

            return;
          }

          setSubmitted(true);

          toast.add({
            title: "Message Sent",
            description:
              "Thanks for contacting SwiftCourier. We'll get back to you soon.",
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
                : "Unable to send your message. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  if (submitted) {
    return (
      <Card className="relative overflow-hidden border-slate-200 bg-white/90 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/8 dark:bg-slate-950/80 dark:shadow-black/30">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[#e50914]" />

        {/* Background glow */}
        <div className="pointer-events-none absolute -top-32 -right-24 size-64 rounded-full bg-[#e50914]/5 blur-3xl" />

        <CardContent className="relative flex min-h-125 flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
          <div className="relative mb-7">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/10" />

            <div className="relative flex size-20 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="size-9" />
            </div>
          </div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-emerald-500 uppercase">
            <Sparkles className="size-3" />
            Message Received
          </div>

          <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl">
            Thanks for reaching out.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your message has been successfully submitted. Our team will review
            it and get back to you as soon as possible.
          </p>

          <Button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-8 h-11 bg-[#e50914] px-6 font-semibold text-white hover:bg-[#c70812]"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-slate-200 bg-white/90 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/8 dark:bg-slate-950/80 dark:shadow-black/30">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#e50914]" />

      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-32 -right-24 size-64 rounded-full bg-[#e50914]/6 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 size-64 rounded-full bg-[#e50914]/4 blur-3xl" />

      <CardHeader className="relative px-6 pt-8 pb-4 sm:px-8 sm:pt-9">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
            <MessageSquare className="size-5" />
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-bold tracking-wide text-emerald-500 uppercase">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Online Support
          </div>
        </div>

        <h2 className="text-2xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl">
          Send us a message
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Tell us what&apos;s on your mind. We&apos;ll make sure your message
          reaches the right team.
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
        >
          {/* Subject */}

          <form.Field name="title">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Subject</FieldLabel>

                  <div className="relative">
                    <Sparkles className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="What can we help you with?"
                      aria-invalid={isInvalid}
                      className="h-12 border-slate-200 bg-slate-50/80 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  <FieldDescription>
                    Give your message a short and clear subject.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}

          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="you@example.com"
                      aria-invalid={isInvalid}
                      className="h-12 border-slate-200 bg-slate-50/80 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  <FieldDescription>
                    We&apos;ll use this email to reply to your message.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Description */}

          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Message</FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Tell us how we can help you..."
                    aria-invalid={isInvalid}
                    className="min-h-36 resize-none border-slate-200 bg-slate-50/80 px-4 py-3.5 leading-6 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <FieldDescription>
                      Please provide enough detail so we can help you better.
                    </FieldDescription>

                    <span className="shrink-0 text-[10px] font-medium text-slate-400">
                      {field.state.value.length}/1000
                    </span>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}

          <Button
            type="submit"
            disabled={isPending}
            className="group h-13 w-full rounded-xl bg-[#e50914] font-bold text-white shadow-lg shadow-[#e50914]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c70812] hover:shadow-[#e50914]/30 disabled:translate-y-0"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send Message
                <ArrowUpRight className="ml-auto size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </>
            )}
          </Button>

          {/* Privacy */}

          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 dark:border-white/6 dark:bg-white/[0.025]">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />

            <p className="text-[10px] leading-5 text-slate-500 dark:text-slate-500">
              By submitting this form, you agree that SwiftCourier may use your
              provided information to respond to your inquiry.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
