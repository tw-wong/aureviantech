import Link from "next/link";
import Image from "next/image";
import {
  Monitor, Smartphone, Cloud, Lightbulb, ArrowRight, Check,
  GitCommitHorizontal, Rocket, Layers, Server, ClipboardCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollOnArrival from "@/components/ScrollOnArrival";
import Reveal from "@/components/Reveal";

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

const engagements = [
  { icon: <Rocket size={26} strokeWidth={1.75} />, title: "MVP build", desc: "Take your idea from zero to a launched, working product — scoped tight and shipped fast." },
  { icon: <Layers size={26} strokeWidth={1.75} />, title: "Platform rebuild", desc: "Replace an ageing or fragile codebase with a modern, maintainable platform — without halting the business." },
  { icon: <Server size={26} strokeWidth={1.75} />, title: "Infrastructure & migration", desc: "Move to the cloud, harden your systems and set up CI/CD for reliable, scalable infrastructure." },
  { icon: <ClipboardCheck size={26} strokeWidth={1.75} />, title: "Audit & advisory", desc: "Architecture reviews, code audits and fractional tech-lead support to steer your team." },
];

const stats = [
  { value: "10+", label: "Years shipping" },
  { value: "80+", label: "Products delivered" },
  { value: "24h", label: "Response time" },
];

export default function HomePage() {
  return (
    <>
      <ScrollOnArrival />
      {/* Hero */}
      <section className="bg-canvas-soft relative overflow-hidden">
        <div className="max-w-container mx-auto px-6 pt-[72px] pb-20 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 bg-primary-pale text-positive-deep text-sm font-semibold px-3.5 py-[5px] rounded-pill mb-6">
              <span className="relative inline-flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-positive motion-safe:animate-status-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-positive" />
              </span>
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
            <div className="relative w-full h-[460px] overflow-hidden rounded-xl">
              <Image
                src="/hero.webp"
                alt="Aurevian engineering across web, mobile and cloud infrastructure"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain"
              />
            </div>
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
          <Reveal>
            <SectionHeading align="center" maxWidth={620} eyebrow="What we do" title="The services we provide." lead="Everything you need to build, launch and scale your digital product — under one senior team." className="mx-auto" />
          </Reveal>
          <div className="grid gap-6 mt-12 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="h-full">
                <ServiceCard icon={s.icon} title={s.title} description={s.description} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={services.length * 120}>
            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                Start a project <ArrowRight size={17} strokeWidth={2.25} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section id="how-we-work" className="scroll-mt-24 bg-ink text-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-[88px] grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <div className="relative w-full h-[440px] overflow-hidden rounded-xl">
              <Image
                src="/how-we-work.webp"
                alt="Aurevian's engineering process — from discovery to launch"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain"
              />
            </div>
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
              <Link href="/contact"><Button>Work with us</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* About the studio */}
      <section id="studio" className="scroll-mt-24 bg-canvas-soft">
        <div className="max-w-container mx-auto px-6 py-[88px] grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <Image
              src="/studio.webp"
              alt="Aurevian studio — building software end to end"
              width={1000}
              height={1121}
              className="w-full h-auto"
            />
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

      {/* What we can build */}
      <section id="work" className="scroll-mt-24 bg-canvas">
        <div className="max-w-container mx-auto px-6 py-[88px]">
          <SectionHeading align="center" maxWidth={580} eyebrow="How we can help" title="What we can build." lead="From a first MVP to a full platform rebuild — the kinds of engagements we take on." className="mx-auto" />
          <div className="grid gap-6 mt-12 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {engagements.map((e) => (
              <Card key={e.title} variant="sage" padding="p-8" className="h-full">
                <div className="w-14 h-14 flex items-center justify-center bg-primary-pale text-ink-deep rounded-lg mb-5">
                  {e.icon}
                </div>
                <h3 className="m-0 text-xl font-bold text-ink">{e.title}</h3>
                <p className="mt-2.5 text-base leading-6 text-body text-pretty">{e.desc}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink">
              Start a project <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
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
