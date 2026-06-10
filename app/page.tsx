import Link from "next/link";
import {
  Monitor, Smartphone, Cloud, Lightbulb, ArrowRight, Check,
  GitCommitHorizontal, Star, Image as ImageIcon, Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const services = [
  { icon: <Monitor size={30} strokeWidth={1.5} />, title: "Web Development", description: "Full-stack web apps built with modern frameworks — from landing pages to complex SaaS products." },
  { icon: <Smartphone size={30} strokeWidth={1.5} />, title: "Mobile Apps", description: "Native and cross-platform mobile applications for iOS and Android, built to scale." },
  { icon: <Cloud size={30} strokeWidth={1.5} />, title: "Infrastructure", description: "Cloud architecture, DevOps and CI/CD pipelines for reliable, scalable systems." },
  { icon: <Lightbulb size={30} strokeWidth={1.5} />, title: "Consultancy", description: "Strategic technology advice — architecture reviews, audits and team coaching." },
];

const steps = [
  { n: "01", title: "Discovery & scope", desc: "We map the problem, agree the scope and set a clear, honest timeline." },
  { n: "02", title: "Design & architecture", desc: "Interface, data model and infrastructure designed before a line ships." },
  { n: "03", title: "Build in the open", desc: "Short iterations with working software you can see and steer every week." },
  { n: "04", title: "Launch & support", desc: "We deploy to production and stay on to maintain, monitor and scale." },
];

const points = [
  "A small, senior team — no hand-offs to juniors.",
  "Fixed scope and honest timelines, agreed up front.",
  "You own the code, the infrastructure and the roadmap.",
];

const testimonials = [
  { quote: "Aurevian rebuilt our platform in four months and it has not missed a beat since. The most senior team we have worked with.", name: "Maya Patel", role: "CTO, Northwind" },
  { quote: "They took full ownership of our infrastructure migration. Clear communication the whole way — no jargon, no surprises.", name: "Daniel Sørensen", role: "Founder, Loftwork" },
  { quote: "From first commit to production in record time, and the code is genuinely a pleasure to maintain. Quality over speed, as promised.", name: "Élise Moreau", role: "VP Eng, Cadence" },
];

const stats = [
  { value: "10+", label: "Years shipping" },
  { value: "80+", label: "Products delivered" },
  { value: "24h", label: "Response time" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas-soft relative overflow-hidden">
        <div className="max-w-container mx-auto px-6 pt-[72px] pb-20 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 bg-primary-pale text-positive-deep text-sm font-semibold px-3.5 py-[5px] rounded-pill mb-6">
              <span className="w-2 h-2 rounded-full bg-positive" />
              Available for new projects
            </span>
            <h1 className="m-0 font-display font-extrabold leading-none tracking-[-1px] text-ink text-balance text-[clamp(40px,6vw,68px)]">
              We build the software<br />behind your <span className="text-positive-deep">business</span>.
            </h1>
            <p className="mt-6 mb-8 text-xl leading-[31px] text-body max-w-[480px] text-pretty">
              A senior engineering studio delivering web, mobile and infrastructure end-to-end — from first commit to production deployment.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/contact"><Button iconRight={<ArrowRight size={18} strokeWidth={2.25} />}>Get Started</Button></Link>
              <a href="#services"><Button variant="tertiary">Learn More</Button></a>
            </div>
            <div className="flex gap-12 mt-11 flex-wrap">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-extrabold text-3xl leading-none tracking-[-0.5px] text-ink">{s.value}</div>
                  <div className="mt-1.5 text-[13px] text-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <ImagePlaceholder height={460} icon={<Users size={48} strokeWidth={1.25} />} label="Team / workspace" />
            <div className="absolute -left-[18px] -bottom-[22px] bg-canvas rounded-lg px-5 py-4 shadow-float flex items-center gap-3.5 max-w-[260px]">
              <div className="w-11 h-11 shrink-0 flex items-center justify-center bg-primary text-on-primary rounded-md">
                <GitCommitHorizontal size={22} strokeWidth={2} />
              </div>
              <div>
                <div className="text-[15px] font-bold text-ink">End-to-end ownership</div>
                <div className="text-[13px] text-body">Idea to production</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 bg-canvas">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading align="center" maxWidth={620} eyebrow="What we do" title="The services we provide." lead="Everything you need to build, launch and scale your digital product — under one senior team." className="mx-auto" />
          <div className="grid gap-6 mt-12 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {services.map((s) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} />
            ))}
          </div>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink">
              Start a project <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section id="how-we-work" className="scroll-mt-24 bg-ink text-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-[88px] grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <ImagePlaceholder height={440} icon={<Monitor size={48} strokeWidth={1.25} />} label="Working / process" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.12em] text-primary">
              <span className="w-[18px] h-0.5 rounded-sm bg-primary" />
              How we work
            </div>
            <h2 className="mt-4 mb-8 font-display font-extrabold leading-[1.06] tracking-[-0.5px] text-canvas-soft text-[clamp(30px,4vw,42px)]">
              Four steps, no surprises.
            </h2>
            <div className="flex flex-col gap-1">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-[18px] py-[18px] border-b border-white/10">
                  <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-primary text-on-primary rounded-pill font-display font-extrabold text-base">
                    {s.n}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-canvas-soft">{s.title}</div>
                    <div className="mt-1 text-[15px] leading-[22px] text-mute">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact"><Button>Start a project</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* About the studio */}
      <section id="studio" className="scroll-mt-24 bg-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-[88px] grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <ImagePlaceholder height={420} icon={<Users size={48} strokeWidth={1.25} />} label="Agency / team" />
            <div className="absolute -right-4 -top-4 bg-primary text-on-primary rounded-lg px-[22px] py-[18px] shadow-soft text-center">
              <div className="font-display font-extrabold text-[26px] leading-none">10+</div>
              <div className="text-xs font-semibold mt-1">Years of<br />shipping</div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="About the studio" title="A senior team that ships things that last." />
            <p className="mt-5 text-[17px] leading-[27px] text-body text-pretty">
              We partner with startups and established companies to deliver the web apps, mobile apps and infrastructure that power them — taking full ownership from the first commit to production.
            </p>
            <div className="flex flex-col gap-3 my-[26px]">
              {points.map((p) => (
                <div key={p} className="flex gap-3 items-start">
                  <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-primary text-on-primary rounded-pill mt-px">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span className="text-base leading-6 text-ink">{p}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink">
              Meet the team <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-24 bg-canvas">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading align="center" maxWidth={560} eyebrow="Client stories" title="What our clients say." lead="A few words from the teams we have built with." className="mx-auto" />
          <div className="grid gap-6 mt-12 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {testimonials.map((q) => (
              <Card key={q.name} variant="sage" padding="p-8" className="h-full flex flex-col">
                <div className="flex gap-[3px] text-primary mb-4">
                  {[0, 1, 2, 3, 4].map((n) => <Star key={n} size={18} strokeWidth={1.5} fill="currentColor" />)}
                </div>
                <p className="m-0 text-[17px] leading-[27px] text-ink flex-1 text-pretty">&ldquo;{q.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6">
                  <ImagePlaceholder height={44} shape="circle" icon={<ImageIcon size={18} strokeWidth={1.5} />} className="!w-11 shrink-0" />
                  <div>
                    <div className="text-[15px] font-bold text-ink">{q.name}</div>
                    <div className="text-[13px] text-body">{q.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink">
        <div className="max-w-text mx-auto px-6 py-[88px] text-center">
          <h2 className="m-0 font-display font-extrabold leading-[1.04] tracking-[-0.5px] text-primary text-[clamp(32px,5vw,52px)]">
            Ready to build something?
          </h2>
          <p className="mx-auto mt-[18px] mb-8 text-[19px] leading-[29px] text-canvas-soft max-w-[480px]">
            Tell us about your project and we&rsquo;ll get back to you within 24 hours.
          </p>
          <Link href="/contact"><Button>Contact Us</Button></Link>
        </div>
      </section>
    </>
  );
}
