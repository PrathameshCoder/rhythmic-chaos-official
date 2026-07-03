import { NextResponse } from "next/server";
import { sendEmail, isValidEmail, escapeHtml } from "../../lib/resend";

const allowedInquiryTypes = [
  "Booking",
  "Collaboration",
  "Label / A&R",
  "Remix",
  "Press",
  "General",
];

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request." },
        { status: 400 }
      );
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();
    const inquiryType = allowedInquiryTypes.includes(body.inquiryType)
      ? body.inquiryType
      : "General";

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (message.length > 5000 || name.length > 200 || subject.length > 300) {
      return NextResponse.json(
        { success: false, message: "Message is too long." },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error("CONTACT_EMAIL env var is not set.");
      return NextResponse.json(
        { success: false, message: "Contact form is not configured yet." },
        { status: 500 }
      );
    }

    await sendEmail({
      to: contactEmail,
      replyTo: email,
      subject: `[${inquiryType}] ${subject || "New message"} — from ${name}`,
      html: `
        <h2>New inquiry via rhythmicchaos website</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Inquiry type:</strong> ${escapeHtml(inquiryType)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || "—")}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
