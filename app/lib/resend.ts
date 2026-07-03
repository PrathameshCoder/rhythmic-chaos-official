/**
 * Minimal Resend client (server-side only).
 * Uses the Resend REST API directly — no extra dependency needed.
 *
 * Required env vars (see .env.example):
 *   RESEND_API_KEY   — your Resend API key
 *   CONTACT_EMAIL    — where contact-form messages are delivered
 *   NEWSLETTER_EMAIL — where new subscriber notifications are delivered
 *   RESEND_FROM_EMAIL (optional) — verified sender; defaults to onboarding@resend.dev
 */

interface SendEmailArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to your .env.local file."
    );
  }

  const from =
    process.env.RESEND_FROM_EMAIL || "Rhythmic Chaos <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }

  return res.json();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Escape user input before embedding in HTML emails. */
export function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
