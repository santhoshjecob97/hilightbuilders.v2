import { useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { ResidentialForm, CommercialForm, GeneralForm } from "@/components/EnquiryForms";
import { useSeo } from "@/components/Layout";
import { site, whatsappLink } from "@/config";

type FormTab = "general" | "residential" | "commercial";

export default function Contact() {
  useSeo(
    "Contact HILIGHT BUILDERS — Interior Designers in Vadapalani, Chennai",
    "Reach HILIGHT BUILDERS at Vadapalani, Chennai. Book a consultation for residential interiors, commercial interiors, construction or renovation.",
  );
  const [tab, setTab] = useState<FormTab>("general");
  const wa = whatsappLink("general");

  return (
    <div className="pt-[72px]">
      <Section className="py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Details */}
          <div>
            <SectionHead
              eyebrow="Contact"
              title="Start the conversation."
              copy="Call, write or send an enquiry — every message reaches the team directly."
            />
            <Reveal delay={0.15}>
              <div className="mt-12 space-y-8">
                <div className="flex gap-5">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ash">Studio</p>
                    <address className="mt-2 text-[15px] not-italic leading-relaxed text-bone">
                      HILIGHT BUILDERS
                      <br />
                      {site.address[0]}
                      <br />
                      {site.address[1]}
                    </address>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ash">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      data-track="email"
                      className="mt-2 block text-[15px] text-bone hover:text-brand"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ash">Hours</p>
                    <p className="mt-2 text-[15px] text-bone">{site.hours}</p>
                  </div>
                </div>
                {wa.startsWith("http") && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp" className="btn-ghost">
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* Enquiry selector + form */}
          <Reveal delay={0.1}>
            <div id="consultation" className="hairline bg-charcoal-deep p-7 lg:p-10">
              <p className="field-label">I want to discuss</p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3" role="tablist">
                {(
                  [
                    ["general", "A Project"],
                    ["residential", "Home Interiors"],
                    ["commercial", "Commercial"],
                  ] as [FormTab, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className={`min-h-[48px] border px-4 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      tab === key
                        ? "border-brand bg-brand text-charcoal"
                        : "border-white/15 text-ash hover:border-white/40 hover:text-bone"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-10">
                {tab === "general" && <GeneralForm cta="Book a Consultation" />}
                {tab === "residential" && <ResidentialForm />}
                {tab === "commercial" && <CommercialForm />}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
