import { Link } from "react-router";
import { Wordmark } from "./Logo";
import { site } from "@/config";

const columns = [
  {
    title: "Services",
    links: [
      { to: "/residential-interiors", label: "Residential Interiors" },
      { to: "/commercial-interiors", label: "Commercial Interiors" },
      { to: "/construction", label: "Construction & Turnkey" },
      { to: "/portfolio", label: "Project Portfolio" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/process", label: "Our Process" },
      { to: "/insights", label: "Insights" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Use" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-0 bg-[#111316]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <Wordmark />
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-brand">
              {site.tagline}
            </p>
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-ash">
              Residential interiors, commercial interiors, construction and turnkey solutions —
              designed and delivered with transparent scope.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-ash">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-[14px] text-bone/75 transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 py-8 hairline-t md:flex-row md:items-center md:justify-between">
          <address className="font-mono text-[11px] not-italic leading-relaxed tracking-[0.08em] text-ash">
            {site.address[0]} {site.address[1]}
            <br />
            <a href={`mailto:${site.email}`} className="text-bone/70 hover:text-brand">
              {site.email}
            </a>
            {"  ·  "}GSTIN: {site.gstin}
          </address>
          <p className="font-mono text-[11px] tracking-[0.08em] text-ash/70">
            © {new Date().getFullYear()} HILIGHT BUILDERS · {site.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
