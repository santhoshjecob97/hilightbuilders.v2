import type { ReactNode } from "react";
import { Section, SectionHead } from "@/components/Reveal";
import { useSeo } from "@/components/Layout";
import { site } from "@/config";

function LegalShell({
  title,
  eyebrow,
  updated,
  children,
}: {
  title: string;
  eyebrow: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="pt-[72px]">
      <Section className="py-20 lg:py-28">
        <SectionHead eyebrow={eyebrow} title={title} />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Last updated: {updated} · Draft for review by {site.brand} before publication
        </p>
        <div className="prose-invert mt-12 max-w-3xl space-y-8 text-[15px] leading-relaxed text-bone/80">
          {children}
        </div>
      </Section>
    </div>
  );
}

function H({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 font-display text-[19px] font-semibold text-bone">{children}</h2>;
}

export function PrivacyPolicy() {
  useSeo(
    "Privacy Policy | HILIGHT BUILDERS",
    "How HILIGHT BUILDERS collects, uses and protects information submitted through this website.",
  );
  return (
    <LegalShell title="Privacy Policy" eyebrow="Legal" updated="October 2026">
      <p>
        This Privacy Policy explains what information {site.brand} ("we", "us") collects through
        this website and how it is used.
      </p>
      <H>Information we collect</H>
      <p>
        When you submit an enquiry form, we collect the details you provide — such as your name,
        phone number, email address, project location and project requirements — solely to respond
        to your enquiry. With your consent, our team may contact you by phone, email or WhatsApp
        regarding that enquiry.
      </p>
      <H>How we use it</H>
      <p>
        Enquiry details are used to understand your requirements, schedule consultations and prepare
        estimates. We do not sell your personal information or share it with third parties for their
        marketing. Access to enquiry records is restricted to authorised team members through a
        secure, password-protected dashboard.
      </p>
      <H>Analytics</H>
      <p>
        If analytics or advertising measurement tools are enabled on this website, they are
        configured to measure page visits and conversion actions without intentionally collecting
        personal details such as your name or phone number.
      </p>
      <H>Your choices</H>
      <p>
        You may ask us to correct or delete your enquiry details at any time by writing to{" "}
        <a href={`mailto:${site.email}`} className="text-brand underline">
          {site.email}
        </a>
        .
      </p>
      <H>Contact</H>
      <p>
        {site.brand}, {site.address.join(" ")} — {site.email}.
      </p>
    </LegalShell>
  );
}

export function Terms() {
  useSeo(
    "Terms of Use | HILIGHT BUILDERS",
    "Terms governing the use of the HILIGHT BUILDERS website.",
  );
  return (
    <LegalShell title="Terms of Use" eyebrow="Legal" updated="October 2026">
      <p>
        By using this website you agree to these terms. The website provides information about the
        services of {site.brand} and a means to submit project enquiries.
      </p>
      <H>Information, not offers</H>
      <p>
        Content on this website is general information, not a quotation or contractual offer. Project
        scope, pricing and timelines are confirmed only in a written proposal and agreement signed
        by both parties.
      </p>
      <H>Concept visualisations</H>
      <p>
        Images labelled "Concept Visualisation" are design illustrations. They do not depict
        completed {site.brand} projects. Completed projects are published only after handover and
        client approval.
      </p>
      <H>Enquiry submissions</H>
      <p>
        You agree to provide accurate contact details and to submit enquiry forms only for genuine
        project discussions. Submitting a form does not create a contractual relationship.
      </p>
      <H>Intellectual property</H>
      <p>
        Design concepts, text and imagery on this website belong to {site.brand} unless otherwise
        credited, and may not be reproduced without written permission.
      </p>
      <H>Contact</H>
      <p>
        {site.brand}, {site.address.join(" ")} — {site.email} · GSTIN: {site.gstin}.
      </p>
    </LegalShell>
  );
}
