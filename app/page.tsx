import Link from "next/link";
import { Monitor, Smartphone, Cloud, Lightbulb } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    icon: <Monitor size={40} strokeWidth={1.5} />,
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks. From landing pages to complex SaaS products.",
  },
  {
    icon: <Smartphone size={40} strokeWidth={1.5} />,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android, built to scale.",
  },
  {
    icon: <Cloud size={40} strokeWidth={1.5} />,
    title: "Server Infrastructure",
    description:
      "Cloud architecture, DevOps, CI/CD pipelines, and server management for reliable, scalable systems.",
  },
  {
    icon: <Lightbulb size={40} strokeWidth={1.5} />,
    title: "Tech Consultancy",
    description:
      "Strategic technology advice to help you make the right decisions, from architecture reviews to team coaching.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-28 px-6 border-b border-light-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            We Build{" "}
            <span className="text-sky-600">Web, Mobile</span>
            {" "}& Infrastructure
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            A tech team that delivers end-to-end digital solutions — from idea to production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/about"
              className="bg-white border border-light-300 hover:border-slate-400 text-slate-600 hover:text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-light-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">What We Do</h2>
          <p className="text-slate-500 text-center mb-12">
            Everything you need to build, launch, and scale your digital product.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-light-100 border-t border-b border-light-300 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Build Something?</h2>
          <p className="text-slate-500 mb-8">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
          <Link
            href="/contact"
            className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
