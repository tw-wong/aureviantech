export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Intro */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About Us</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          We are a small, senior engineering team passionate about building digital products
          that work. We partner with startups and established companies to deliver web
          applications, mobile apps, and the infrastructure that powers them.
        </p>
      </section>

      {/* Values */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Values</h2>
        <ul className="space-y-4">
          {[
            { title: "Quality over speed", desc: "We ship things that work and last, not things that need rewriting in six months." },
            { title: "Clear communication", desc: "No jargon, no surprises. You always know what we're building and why." },
            { title: "End-to-end ownership", desc: "We take responsibility from first commit to production deployment." },
          ].map((item) => (
            <li key={item.title} className="flex gap-4 bg-white border border-light-300 rounded-lg p-6">
              <span className="text-sky-600 font-bold mt-0.5">→</span>
              <div>
                <h3 className="text-slate-900 font-semibold mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
