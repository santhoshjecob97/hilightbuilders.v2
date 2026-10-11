import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CtaBand } from "@/pages/Home";
import { useSeo } from "@/components/Layout";

const STEPS = [
  { n: "STEP 01", title: "Initial Enquiry", copy: "You reach out — form, WhatsApp or email. We note the basics and schedule a conversation." },
  { n: "STEP 02", title: "Requirement Discovery", copy: "A detailed discussion about how you live or work, must-haves, budget band and timeline." },
  { n: "STEP 03", title: "Site Visit & Measurements", copy: "We visit the site, take measurements and note structural and service constraints." },
  { n: "STEP 04", title: "Design Brief", copy: "Everything agreed so far, written down — the reference document for all design decisions." },
  { n: "STEP 05", title: "Concept & Layout", copy: "Spatial layouts and a design concept with mood, palette and key moves, refined with your feedback." },
  { n: "STEP 06", title: "Material Selection", copy: "Finishes, shutters, counters, hardware and lighting — selected with samples in hand." },
  { n: "STEP 07", title: "Detailed Scope & Estimate", copy: "A line-item estimate tied to the final design. You see exactly what everything costs." },
  { n: "STEP 08", title: "Proposal & Agreement", copy: "Scope, estimate, payment stages and timeline formalised before any work begins." },
  { n: "STEP 09", title: "Procurement & Scheduling", copy: "Materials ordered, trades sequenced, site plan shared with you." },
  { n: "STEP 10", title: "Execution & Quality Checks", copy: "Stage-wise execution with checks before each next trade begins, and progress updates to you." },
  { n: "STEP 11", title: "Snag-List Review", copy: "We walk the site together, list every imperfection and close each one." },
  { n: "STEP 12", title: "Handover", copy: "Cleaning, documentation and keys — your space, ready." },
];

export default function Process() {
  useSeo(
    "Our Process — Design to Handover | HILIGHT BUILDERS Chennai",
    "The twelve-step HILIGHT BUILDERS journey from first enquiry to handover: discovery, design, transparent estimation, execution and snag-list closure.",
  );

  return (
    <>
      <div className="pt-[72px]">
        <Section className="py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <SectionHead
              eyebrow="Our Process"
              title="Twelve steps. Zero surprises."
              copy="This is the full journey from first enquiry to handover. The exact stages depend on your contracted scope — smaller engagements compress several steps, and we'll tell you exactly which."
            />
            <Reveal delay={0.2}>
              <Link to="/contact#consultation" className="btn-primary lg:justify-self-end">
                Start Your Project <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-20">
            <ProcessTimeline steps={STEPS} />
          </div>
        </Section>
      </div>
      <CtaBand
        title="Step one takes two minutes."
        copy="Send an enquiry and we'll schedule your consultation — the rest of the journey follows from there."
        primary={{ to: "/contact#consultation", label: "Start Your Project" }}
      />
    </>
  );
}
