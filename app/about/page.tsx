import Link from "next/link";
import { Gem, MessagesSquare, GitCommitHorizontal, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import ScrollLink from "@/components/ScrollLink";

const values = [
  { icon: <Gem size={26} strokeWidth={2} />, title: "Quality over speed", desc: "We ship things that work and last — not things that need rewriting in six months." },
  { icon: <MessagesSquare size={26} strokeWidth={2} />, title: "Clear communication", desc: "No jargon, no surprises. You always know what we are building and why." },
  { icon: <GitCommitHorizontal size={26} strokeWidth={2} />, title: "End-to-end ownership", desc: "We take responsibility from the first commit to production deployment." },
];

const team = [
  { name: "Arman Vasquez", role: "Principal Engineer" },
  { name: "Lena Fischer", role: "Mobile Lead" },
  { name: "Tomas Reyes", role: "Infrastructure Lead" },
  { name: "Priya Nair", role: "Product Engineer" },
];

const capabilities = ["React", "Next.js", "Node.js", "Go", "Python", "Swift", "Kotlin", "MongoDB", "AWS", "Serverless", "Terraform", "CI/CD"];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-20 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading eyebrow="About us" title="A small, senior team that builds things that last." titleSize={54} />
            <p className="mt-6 text-[19px] leading-[29px] text-body max-w-[520px] text-pretty">
              We partner with startups and established companies to deliver web applications, mobile apps and the infrastructure that powers them — taking full ownership from first commit to production deployment.
            </p>
            <div className="flex gap-3 mt-[30px] flex-wrap">
              <Link href="/contact"><Button>Work with us</Button></Link>
              <ScrollLink targetId="services"><Button variant="tertiary">Our services</Button></ScrollLink>
            </div>
          </div>
          <ImagePlaceholder height={420} icon={<Users size={48} strokeWidth={1.25} />} label="Team" />
        </div>
      </section>

      {/* Values */}
      <section className="bg-canvas">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading eyebrow="How we operate" title="Our values." />
          <div className="grid gap-6 mt-11 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {values.map((v) => (
              <Card key={v.title} variant="sage" padding="p-8" className="h-full">
                <div className="w-[52px] h-[52px] flex items-center justify-center bg-primary text-on-primary rounded-lg mb-5">
                  {v.icon}
                </div>
                <h3 className="m-0 text-xl font-bold text-ink">{v.title}</h3>
                <p className="mt-2.5 text-base leading-6 text-body text-pretty">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading align="center" maxWidth={560} eyebrow="The people" title="Who you will work with." lead="No hand-offs to juniors — the people you meet are the people who build." className="mx-auto" />
          <div className="grid gap-6 mt-12 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {team.map((m) => (
              <Card key={m.name} variant="content" padding="p-6" className="text-center h-full">
                <ImagePlaceholder height={96} shape="circle" icon={<Users size={28} strokeWidth={1.5} />} className="!w-24 mx-auto mb-4" />
                <div className="text-[17px] font-bold text-ink">{m.name}</div>
                <div className="text-sm text-body mt-1">{m.role}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The stack */}
      <section className="bg-ink">
        <div className="max-w-text mx-auto px-6 py-20 text-center">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.12em] text-primary">
              <span className="w-[18px] h-0.5 rounded-sm bg-primary" />
              The stack
            </div>
          </div>
          <h2 className="mt-4 mb-3 font-display font-extrabold leading-[1.1] tracking-[-0.4px] text-canvas-soft text-[clamp(28px,4vw,38px)]">
            The tools we reach for.
          </h2>
          <p className="mx-auto mb-7 text-base text-mute max-w-[460px]">
            A pragmatic, modern stack — chosen per project, never by default.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {capabilities.map((c) => (
              <span key={c} className="text-[15px] font-semibold text-canvas-soft bg-white/[0.08] border border-white/[0.16] px-4 py-[7px] rounded-pill">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
