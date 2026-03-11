"use client";

import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-white border border-light-300 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-white border border-light-300 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-white border border-light-300 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-center text-sm">
          Message sent! We&apos;ll get back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-center text-sm">
          Something went wrong. Please email us directly.
        </p>
      )}
    </form>
  );
}
