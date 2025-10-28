import React from "react";
import "../Styles/AboutPage.scss";

// ——— Types ———
type Stat = { label: string; value: string };
type Value = { title: string; description: string; icon: React.ReactNode };
type Milestone = { year: string; title: string; description: string };
type TeamMember = { name: string; role: string; avatar: string };
type FAQ = { q: string; a: string };

// ——— Data ———
const stats: Stat[] = [
  { label: "Happy customers", value: "2k+" },
  { label: "Products curated", value: "2,000+" },
  { label: "Avg. rating", value: "4.8/5" },
  { label: "Orders delivered", value: "1.4M+" },
];

const values: Value[] = [
  {
    title: "Customer‑first",
    description: "We obsess over delight—from unboxing to support.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" className="text-body">
        <path fill="red" d="M12 21s8-4.5 8-10a8 8 0 1 0-16 0c0 5.5 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: "Quality only",
    description: "We curate durable, verified products from trusted makers.",
    icon: (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
  <path fill="red" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
</svg>

    ),
  },
  {
    title: "Fair pricing",
    description: "Transparent margins and regular price checks—no games.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
        <path fill="red" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4.18L18.09 7 12 9.82 5.91 7 12 5.18z"/>
      </svg>
    ),
  },
  {
    title: "Sustainable moves",
    description: "We ship to your location with packaging that are environmental friendly.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
        <path fill="red" d="M12 2a7 7 0 0 1 7 7h3l-4 4-4-4h3a5 5 0 1 0-5 5v3l-4-4 4-4v3a7 7 0 0 1 0-14z"/>
      </svg>
    ),
  },
];

const timeline: Milestone[] = [
  { year: "May 2025", title: "We launched", description: "Started in a tiny studio store with a big mission: better everyday essentials and consistency." },
  { year: "July 2025", title: "100k orders", description: "Scaled our logistics and delivery to various locations." },
  { year: "dec 2025", title: "Circular program", description: "Introduced trade‑in and refurbishment to reduce waste." },
  { year: "2025", title: "Formed a national community", description: "Customers in across home state and counting." },
];

const team: TeamMember[] = [
  { name: "Shimite Akejelu, Msc.", role: "CEO & Co‑founder", avatar: "https://www.shutterstock.com/image-vector/handsome-black-man-young-front-600nw-2127472937.jpg" },
  { name: "Joyce NC, Msc.", role: "Head of Merchandising", avatar: "https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg" },
  { name: "Zara Akejelu.", role: "Manager", avatar: "https://png.pngtree.com/png-vector/20240914/ourmid/pngtree-cute-black-girl-vector-png-image_12924579.png" },
];

const faqs: FAQ[] = [
  { q: "Do you ship outside Osun?", a: "Yes. We ship to 20+ states with duties shown at checkout where available." },
  { q: "What’s your return policy?", a: "Free 7‑day returns on most items in their original condition. Exclusions may apply for hygiene reasons." },
  { q: "How do you source products?", a: "We audit suppliers for quality, labor practices, and sustainability, and regularly test inventory." },
  { q: "Do you offer wholesale?", a: "Yes—email wholesale@zaraboutique.com with your company info and order estimates." },
];

// ——— Helpers ———
function Section({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <section className={`container py-5 ${className}`}>{children}</section>;
}

function StatItem({ label, value }: Stat) {
  return (
    <div className="card shadow-sm border-0 h-100 about-stat">
      <div className="card-body">
        <div className="h3 fw-semibold mb-1">{value}</div>
        <div className="text-secondary small">{label}</div>
      </div>
    </div>
  );
}

function ValueCard({ title, description, icon }: Value) {
  return (
    <div className="card h-100 shadow-sm ">
      <div className="card-body">
        <div className="d-inline-flex align-items-center justify-content-center rounded-3 bg-light p-2 mb-3">
          {icon}
        </div>
        <h3 className="h6 fw-semibold mb-2">{title}</h3>
        <p className="text-secondary mb-0">{description}</p>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, description }: Milestone) {
  return (
    <div className="position-relative ps-4 pb-3">
      <span className="position-absolute top-0 start-0 translate-middle-y rounded-circle bg-dark" style={{ width: 10, height: 10 }} />
      <h4 className="h6 mb-1">{year} · {title}</h4>
      <p className="text-secondary mb-0">{description}</p>
    </div>
  );
}

function TeamCard({ name, role, avatar }: TeamMember) {
  return (
    <div className="card shadow-sm h-100 team-card">
      <img src={avatar} alt={name} className="card-img-top object-fit-cover" style={{ height: 160 }} />
      <div className="card-body">
        <div className="fw-medium">{name}</div>
        <div className="text-secondary small">{role}</div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border rounded-3 p-3">
      <button
        className="btn w-100 d-flex align-items-center justify-content-between text-start p-0"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="fw-semibold">{q}</span>
        <span className="badge rounded-pill text-bg-light ms-3">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-2 mb-0 text-secondary">{a}</p>}
    </div>
  );
}

// ——— Page ———
export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <div className="py-5 border-bottom">
        <Section>
          <div className="row align-items-center g-4 g-lg-5 clothe-show">
            <div className="col-lg-6">
              <span className="badge rounded-pill text-bg-secondary text-uppercase">Our Story</span>
              <h1 className="display-5 fw-bold mt-3">We deliver better everyday products—<span className="d-block">without digging your pockets.</span></h1>
              <p className="lead text-secondary mt-2">
                From ourstore to doorstep, we focus on thoughtful materials, fair pricing, and delightful service. That’s why millions trust us with their.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <a href="/ProductList" className="btn btn-dark shop-now-btn">Shop now</a>
                <a href="#values" className="btn btn-outline-secondary">Our values</a>
              </div>
            </div>
           
            <div className="col-lg-6">
              <div className="ratio ratio-4x3 rounded-4 overflow-hidden border">
                <img
                  src="https://media.istockphoto.com/id/2188174428/photo/polo-shirts-in-store.jpg?s=1024x1024&w=is&k=20&c=FPMMi84f-CGQCVH6RxpamVPDtuQsO5QFQJbSBG2dIdA="
                  alt="Our warehouse and fulfillment center"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="row row-cols-2 row-cols-sm-4 g-3 mt-3">
                {stats.map((s) => (
                  <div className="col" key={s.label}><StatItem {...s} /></div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Values */}
      <Section className="py-5" >
        <div className="d-flex align-items-end justify-content-between mb-3">
          <div>
            <h2 className="h2 fw-bold mb-1">What we stand for</h2>
            <p className="text-secondary mb-0">Four principles guide every product, purchase, and package we ship.</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
          {values.map((v) => (
            <div className="col" key={v.title}><ValueCard {...v} /></div>
          ))}
        </div>
      </Section>

      {/* Story / Timeline */}
      <Section>
        <div className="row g-4">
          <div className="col-lg-6">
            <h2 className="h2 fw-bold">From a studio to a global storefront</h2>
            <p className="text-secondary">
              We started small—testing, speaking with customers daily. Today, our community spans continents, but our mission hasn’t changed.
            </p>
            <div className="about-timeline mt-3">
              {timeline.map((m) => (
                <TimelineItem key={m.year} {...m} />
              ))}
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="card h-100 shadow-sm mother">
              <div className="card-body">
                <h3 className="h6 fw-semibold">Built with responsibility</h3>
                <ul className="mt-3 mb-0">
                  <li>Supplier code of conduct & annual audits</li>
                  <li>Recycled or low‑impact materials where possible</li>
                  <li>Carbon‑neutral shipping and right‑size packaging</li>
                  <li>Trade‑in, repair, and refurbishment options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section>
        <div className="d-flex align-items-end justify-content-between mb-3">
          <div>
            <h2 className="h2 fw-bold mb-1">Meet the team</h2>
            <p className="text-secondary mb-0">A small crew of builders, operators, and support pros behind your favorite carts.</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
          {team.map((t) => (
            <div className="col" key={t.name}><TeamCard {...t} /></div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <figure className="p-4 p-md-5 bg-light rounded-4 border text-center mx-auto" style={{ maxWidth: 920 }}>
          <blockquote className="blockquote fs-5 mb-1">
            “Finally—quality basics that don’t break the bank. Delivery was fast, returns were seamless, and customer care felt human.”
          </blockquote>
          <figcaption className="blockquote-footer mt-1 mb-0">Aminat B. <cite title="Source">Verified Customer</cite></figcaption>
        </figure>
      </Section>

      {/* FAQs */}
      <Section>
        <h2 className="h2 fw-bold">Good to know</h2>
        <div className="row g-3 mt-2">
          {faqs.map((f, i) => (
            <div className="col-md-6" key={i}><FAQItem {...f} /></div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-5">
        <div className="text-center p-4 p-md-5 border rounded-4">
          <h3 className="h2 fw-semibold">Ready to explore the catalog?</h3>
          <p className="text-secondary mb-3">Join 20k+ customers who shop smarter with us. New drops weekly.</p>
          <div className="d-flex justify-content-center gap-2">
            <a href="/ProductList" className="btn btn-dark">Shop our collections</a>
            <a href="https://api.whatsapp.com/send?phone=2349061830593&text=Hello%2C%20I%20want%20to%20make%20payment%20for%20my%20order." className="btn btn-outline-secondary">Talk to support</a>
          </div>
        </div>
      </Section>
    </main>
  );
}

/* ======================= SCSS (add to your main.scss) =======================
// Light theming for the About page (keeps Bootstrap look & feel)
.about-stat { border-radius: 1rem; }
.about-timeline { position: relative; }
.about-timeline::before {
  content: ""; position: absolute; left: 4px; top: 4px; bottom: 0; width: 2px; background: rgba(0,0,0,.1);
}
// Utilities if you need them
.object-fit-cover { object-fit: cover; }
*/
