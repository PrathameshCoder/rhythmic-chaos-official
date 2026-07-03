"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage("Thanks for subscribing.");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#8A7DFF]/10 via-transparent to-[#1E90FF]/10 px-6 py-14 text-center md:px-14 md:py-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-[#8A7DFF]/20 blur-3xl" />

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#8A7DFF]">
          Stay Connected
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Join the Inner Circle
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/55">
          New music first, exclusive previews, behind-the-scenes, and show
          announcements — straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:max-w-lg"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name (optional)"
              autoComplete="name"
              className="w-full rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm text-white placeholder-white/35 outline-none backdrop-blur transition-colors focus:border-[#8A7DFF] sm:w-2/5"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              className="w-full rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm text-white placeholder-white/35 outline-none backdrop-blur transition-colors focus:border-[#8A7DFF]"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-8px_rgba(255,255,255,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>

        <div aria-live="polite" className="mt-4 min-h-[1.5rem] text-sm">
          {status === "success" && (
            <p className="text-emerald-400">{message}</p>
          )}
          {status === "error" && <p className="text-red-400">{message}</p>}
        </div>
      </div>
    </section>
  );
}
