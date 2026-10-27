import "server-only";
import nodemailer from "nodemailer";
import type { Submission } from "@/db/schema";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function isMailConfigured() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && NOTIFY_EMAIL);
}

export async function sendSubmissionAlert(submission: Submission) {
  if (!isMailConfigured()) return;

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Name", `${submission.firstName} ${submission.lastName}`],
    ["Email", submission.email],
    ["Phone", submission.phone || "-"],
    ["Company", submission.company || "-"],
    ["Service", submission.service],
    ["Message", submission.message],
  ];

  await transporter.sendMail({
    from: `"Shared Spark website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    replyTo: submission.email,
    subject: `New enquiry from ${submission.firstName} ${submission.lastName}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<h2>New contact form submission</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("")}</table>`,
  });
}
