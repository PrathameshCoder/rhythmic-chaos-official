"use client";

import { useState, type FormEvent } from "react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const inquiryTypes = [
  "Booking",
  "Collaboration",
  "Label / A&R",
  "Remix",
  "Press",
  "General",
] as const;

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/35 outline-none backdrop-blur transition-colors focus:border-[#8A7DFF]";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    inquiryType: "Booking",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setFeedback("Please fill in your name, email, and message.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFeedback("Message sent. I'll get back to you soon.");
        setForm({
          name: "",
          email: "",
          subject: "",
          inquiryType: "Booking",
          message: "",
        });
      } else {
        setStatus("error");
        setFeedback(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Contact & Bookings"
            intro="Bookings, collaborations, remixes, label and playlist inquiries — or just say hi."
          />
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name *"
                autoComplete="name"
                className={inputClass}
              />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Your email *"
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <select
                value={form.inquiryType}
                onChange={(e) => update("inquiryType", e.target.value)}
                className={`${inputClass} appearance-none`}
                aria-label="Inquiry type"
              >
                {inquiryTypes.map((t) => (
                  <option key={t} value={t} className="bg-neutral-900">
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="Subject"
                className={inputClass}
              />
            </div>

            <textarea
              required
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Your message *"
              rows={6}
              className={`${inputClass} resize-y`}
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_-8px_rgba(255,255,255,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>

            <div aria-live="polite" className="min-h-[1.5rem] text-center text-sm">
              {status === "success" && (
                <p className="text-emerald-400">{feedback}</p>
              )}
              {status === "error" && <p className="text-red-400">{feedback}</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
