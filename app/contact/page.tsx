import { Clock, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ContactForm";

const details = [
  { icon: <Clock size={20} strokeWidth={2} />, label: "Response time", value: "Within 24 hours" },
  { icon: <MapPin size={20} strokeWidth={2} />, label: "Location", value: "Remote — GMT +8h" },
];

export default function ContactPage() {
  return (
    <div className="bg-canvas-soft">
      <div className="max-w-container mx-auto px-6 py-20 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Info */}
        <div>
          <SectionHeading eyebrow="Contact" title="Let us build it together." titleSize={50} />
          <p className="mt-[22px] mb-8 text-lg leading-7 text-body max-w-[400px] text-pretty">
            Have a project in mind? We would love to hear about it — send us a message.
          </p>

          <div className="flex flex-col gap-3.5">
            {details.map((d) => (
              <div key={d.label} className="flex items-center gap-3.5">
                <span className="shrink-0 w-11 h-11 flex items-center justify-center bg-primary-pale text-ink-deep rounded-md">
                  {d.icon}
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[0.06em] uppercase text-mute whitespace-nowrap">{d.label}</span>
                  <span className="block text-base font-semibold text-ink mt-0.5">{d.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card variant="content" padding="p-8" lifted>
          <ContactForm />
        </Card>
      </div>
    </div>
  );
}
