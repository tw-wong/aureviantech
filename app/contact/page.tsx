import { Mail, Clock, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import Card from "@/components/ui/Card";
import IconButton from "@/components/ui/IconButton";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ContactForm";

const details = [
  { icon: <Mail size={20} strokeWidth={2} />, label: "Email", value: "hello@aurevian.tech", href: "mailto:hello@aurevian.tech" },
  { icon: <Clock size={20} strokeWidth={2} />, label: "Response time", value: "Within 24 hours" },
  { icon: <MapPin size={20} strokeWidth={2} />, label: "Location", value: "Remote — GMT ±3h" },
];

export default function ContactPage() {
  return (
    <main className="bg-canvas-soft">
      <div className="max-w-container mx-auto px-6 py-20 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Info */}
        <div>
          <SectionHeading eyebrow="Contact" title="Let us build it together." titleSize={50} />
          <p className="mt-[22px] mb-8 text-lg leading-7 text-body max-w-[400px] text-pretty">
            Have a project in mind? We would love to hear about it. Send a message and we will get back to you within 24 hours.
          </p>

          <div className="flex flex-col gap-3.5 mb-7">
            {details.map((d) => {
              const inner = (
                <>
                  <span className="shrink-0 w-11 h-11 flex items-center justify-center bg-primary-pale text-ink-deep rounded-md">
                    {d.icon}
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.06em] uppercase text-mute whitespace-nowrap">{d.label}</span>
                    <span className="block text-base font-semibold text-ink mt-0.5">{d.value}</span>
                  </span>
                </>
              );
              return d.href ? (
                <a key={d.label} href={d.href} className="flex items-center gap-3.5 no-underline">{inner}</a>
              ) : (
                <div key={d.label} className="flex items-center gap-3.5">{inner}</div>
              );
            })}
          </div>

          <div className="flex gap-2.5">
            <IconButton label="GitHub"><Github size={20} /></IconButton>
            <IconButton label="LinkedIn"><Linkedin size={20} /></IconButton>
            <IconButton label="X"><Twitter size={20} /></IconButton>
          </div>
        </div>

        {/* Form */}
        <Card variant="content" padding="p-8" lifted>
          <ContactForm />
        </Card>
      </div>
    </main>
  );
}
