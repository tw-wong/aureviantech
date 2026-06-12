"use client";

import { useState, FormEvent } from "react";
import { Check } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email || !/.+@.+\..+/.test(email)) next.email = "Enter a valid email.";
    if (!message) next.message = "Tell us a little about your project.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
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

  if (status === "success") {
    return (
      <div className="text-center px-2 py-6">
        <div className="w-[60px] h-[60px] mx-auto mb-[18px] flex items-center justify-center bg-primary text-on-primary rounded-pill">
          <Check size={30} strokeWidth={2.5} />
        </div>
        <h3 className="m-0 font-display font-extrabold text-[27px] text-ink">Message sent</h3>
        <p className="mt-2.5 mb-6 text-base text-body">
          Thanks — we will be in touch within 24 hours.
        </p>
        <Button variant="tertiary" onClick={() => { setStatus("idle"); setErrors({}); }}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]" noValidate>
      <Input label="Name" name="name" placeholder="Your name" error={errors.name} />
      <Input label="Email" name="email" type="email" placeholder="you@example.com" error={errors.email} />
      <Textarea label="Message" name="message" rows={5} placeholder="Tell us about your project…" error={errors.message} />
      <Button type="submit" fullWidth disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
      {status === "error" && (
        <p className="text-negative-darkest text-center text-sm m-0">
          Something went wrong. Please email us directly.
        </p>
      )}
    </form>
  );
}
