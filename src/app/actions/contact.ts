"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { contactSchema } from "@/lib/contact-schema";
import { sendSubmissionAlert } from "@/lib/mail";

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };

  const { hp_x7: trap, service, ...values } = parsed.data;
  if (trap) return { ok: true };

  const [row] = await db
    .insert(submissions)
    .values({ ...values, service: service.join(", ") })
    .returning();

  after(async () => {
    try {
      await sendSubmissionAlert(row);
    } catch (error) {
      console.error("Failed to send submission alert", error);
    }
  });

  revalidatePath("/admin", "layout");
  return { ok: true };
}
