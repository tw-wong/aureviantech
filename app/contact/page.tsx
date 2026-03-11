import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: contact info */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Have a project in mind? We&apos;d love to hear about it. Send us a message
            and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Right: form */}
        <ContactForm />
      </div>
    </div>
  );
}
