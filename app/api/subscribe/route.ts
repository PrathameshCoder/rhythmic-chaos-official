import { NextResponse } from "next/server";
import { sendEmail, isValidEmail, escapeHtml } from "../../lib/resend";

/**
 * Newsletter signup.
 *
 * Current behavior: notifies NEWSLETTER_EMAIL of each new subscriber via Resend.
 *
 * To upgrade later, replace (or extend) `handleSubscriber` with:
 *  - Resend Audiences: POST https://api.resend.com/audiences/{id}/contacts
 *  - A database insert (e.g. Vercel Postgres, Supabase)
 *  - Mailchimp / ConvertKit API call
 */

async function handleSubscriber(email: string, name: string) {
  const newsletterEmail = process.env.NEWSLETTER_EMAIL;
  if (!newsletterEmail) {
    throw new Error("NEWSLETTER_EMAIL env var is not set.");
  }

  await sendEmail({
    to: newsletterEmail,
    subject: `New subscriber: ${email}`,
    html: `
      <h2>New mailing list subscriber</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name || "—")}</p>
      <p style="color:#888;font-size:12px;">via rhythmicchaos website newsletter form</p>
    `,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request." },
        { status: 400 }
      );
    }

    const email = String(body.email ?? "").trim();
    const name = String(body.name ?? "").trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (name.length > 200) {
      return NextResponse.json(
        { success: false, message: "Name is too long." },
        { status: 400 }
      );
    }

    await handleSubscriber(email, name);

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing.",
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
