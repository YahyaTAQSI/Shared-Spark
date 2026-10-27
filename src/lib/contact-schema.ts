import { z } from "zod";
import { site } from "@/content/site";

const { errors: messages } = site.contact;
const serviceOptions = site.contact.fields.find((f) => f.name === "service")?.options ?? [];

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, messages.required).max(100),
  lastName: z.string().trim().min(1, messages.required).max(100),
  email: z.string().trim().min(1, messages.required).max(200).pipe(z.email(messages.email)),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^\+?[\d\s()-]{7,20}$/.test(v), messages.phone),
  company: z.string().trim().max(200),
  service: z
    .array(z.string().refine((v) => serviceOptions.includes(v)))
    .min(1, messages.services)
    .max(serviceOptions.length),
  message: z.string().trim().min(1, messages.required).min(10, messages.messageMin).max(3000, messages.messageMax),
  hp_x7: z.string().max(500).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
