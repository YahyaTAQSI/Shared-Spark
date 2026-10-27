"use client";

import * as React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { site, type FormFieldConfig } from "@/content/site";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { submitContact } from "@/app/actions/contact";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PillGroup } from "@/components/ui/pill-group";
import { Textarea } from "@/components/ui/textarea";

const defaultValues: ContactValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  service: [],
  message: "",
  hp_x7: "",
};

const halfWidth: FormFieldConfig["name"][] = ["firstName", "lastName", "email", "phone"];
const requiredFields: FormFieldConfig["name"][] = ["firstName", "lastName", "email", "service", "message"];

type ContactFormProps = {
  defaultServices?: string[];
  title?: string;
  text?: string;
};

export function ContactForm({ defaultServices, title: titleOverride, text: textOverride }: ContactFormProps = {}) {
  const { eyebrow, fields, submit } = site.contact;
  const title = titleOverride ?? site.contact.title;
  const text = textOverride ?? site.contact.text;
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [redirecting, setRedirecting] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { ...defaultValues, service: defaultServices ?? [] },
    mode: "onTouched",
  });

  const busy = isSubmitting || redirecting;
  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  const onSubmit = async (values: ContactValues) => {
    setServerError(null);
    try {
      const result = await submitContact(values);
      if (!result.ok) {
        setServerError(result.error);
        return;
      }
      setRedirecting(true);
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/thank-you");
    } catch {
      setServerError(submit.error);
    }
  };

  const requiredMark = (name: FormFieldConfig["name"]) =>
    requiredFields.includes(name) && (
      <span className="text-accent" aria-hidden="true">
        {" "}*
      </span>
    );

  const renderControl = (field: FormFieldConfig) => {
    const error = errors[field.name]?.message;
    const errorId = `${field.name}-error`;
    const common = {
      id: field.name,
      placeholder: field.placeholder,
      autoComplete: field.autoComplete,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
    };

    if (field.type === "pills") {
      return (
        <Controller
          control={control}
          name="service"
          render={({ field: f }) => (
            <PillGroup
              name={f.name}
              legend={
                <>
                  {field.label}
                  {requiredMark(field.name)}
                  {field.hint && <span className="ml-2 font-normal text-muted-foreground">{field.hint}</span>}
                </>
              }
              options={field.options ?? []}
              value={f.value}
              onChange={f.onChange}
              onBlur={f.onBlur}
              multiple={field.multiple}
              invalid={!!error}
              describedBy={error ? errorId : undefined}
            />
          )}
        />
      );
    }
    if (field.type === "textarea") {
      return (
        <>
          <Textarea {...common} maxLength={field.maxLength} {...register(field.name)} />
          {field.maxLength && (
            <span
              aria-live="polite"
              className={cn(
                "self-end text-xs tabular-nums",
                messageLength > field.maxLength * 0.9 ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {messageLength}/{field.maxLength}
            </span>
          )}
        </>
      );
    }
    return <Input type={field.type ?? "text"} {...common} {...register(field.name)} />;
  };

  return (
    <Section id="contact" aria-labelledby="contact-title" className="scroll-mt-16">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 id="contact-title" className="text-5xl font-bold sm:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">{text}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-primary/5 sm:p-10">
                <form
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  aria-busy={busy}
                  className={cn("grid gap-5 transition-opacity sm:grid-cols-2", busy && "pointer-events-none opacity-70")}
                >
                  <div inert className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="hp_x7">Leave this field empty</label>
                    <input id="hp_x7" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" {...register("hp_x7")} />
                  </div>
                  {fields.map((field) => {
                    const error = errors[field.name]?.message;
                    return (
                      <div key={field.name} className={cn("flex flex-col gap-2", !halfWidth.includes(field.name) && "sm:col-span-2")}>
                        {field.type !== "pills" && (
                          <Label htmlFor={field.name}>
                            {field.label}
                            {requiredMark(field.name)}
                          </Label>
                        )}
                        {renderControl(field)}
                        <AnimatePresence initial={false}>
                          {error && (
                            <motion.p
                              id={`${field.name}-error`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex items-center gap-1.5 overflow-hidden text-sm text-destructive"
                            >
                              <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                              {error}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {serverError && (
                    <p role="alert" className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive sm:col-span-2">
                      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                      {serverError}
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">
                      {busy ? (
                        <>
                          <Loader2 className="animate-spin" aria-hidden="true" />
                          {submit.loading}
                        </>
                      ) : (
                        <>
                          {submit.idle}
                          <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
