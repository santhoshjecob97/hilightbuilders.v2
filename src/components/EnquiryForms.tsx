import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { trpc } from "@/providers/trpc";
import {
  residentialLeadSchema,
  commercialLeadSchema,
  generalLeadSchema,
} from "@contracts/leads";

/* ---------------------------------- atoms --------------------------------- */

function Field({
  label,
  error,
  children,
  optional = true,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="field-label flex items-baseline justify-between">
        <span>{label}</span>
        {optional && <span className="text-[9px] tracking-[0.14em] text-ash/50">OPTIONAL</span>}
      </label>
      <div className="mt-1">{children}</div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ChipGroup({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {options.map((opt) => {
        const active = values.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() =>
              onChange(active ? values.filter((v) => v !== opt) : [...values, opt])
            }
            aria-pressed={active}
            className={`min-h-[44px] border px-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
              active
                ? "border-brand bg-brand/10 text-brand"
                : "border-white/15 text-ash hover:border-white/40 hover:text-bone"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SubmitState({ state, error }: { state: string; error?: string }) {
  if (state === "success") {
    return (
      <div className="flex items-start gap-4 border border-brand/40 bg-brand/10 p-6" role="status">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
        <div>
          <p className="font-display text-lg font-semibold text-bone">Enquiry received.</p>
          <p className="mt-1 text-[14px] leading-relaxed text-ash">
            Thank you — the HILIGHT BUILDERS team will contact you to discuss your project. For
            anything urgent, write to{" "}
            <a href="mailto:midsrini@gmail.com" className="text-brand underline">
              midsrini@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
  if (state === "error") {
    return (
      <div className="flex items-start gap-4 border border-red-500/40 bg-red-500/10 p-6" role="alert">
        <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-400" />
        <div>
          <p className="font-display text-lg font-semibold text-bone">Something went wrong.</p>
          <p className="mt-1 text-[14px] text-ash">
            {error || "Your enquiry could not be sent. Please try again, or email us directly."}
          </p>
        </div>
      </div>
    );
  }
  return null;
}

function Honeypot({ register }: { register: any }) {
  return (
    <div className="hidden" aria-hidden="true">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </label>
    </div>
  );
}

/* ------------------------------- residential ------------------------------ */

const RES_SERVICES = [
  "Complete home interiors",
  "Modular kitchen",
  "Wardrobes",
  "TV unit",
  "Pooja unit",
  "False ceiling & lighting",
  "Home office",
  "Renovation",
];

export function ResidentialForm({ source }: { source?: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>();
  const submit = trpc.leads.submit.useMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(residentialLeadSchema),
    defaultValues: { type: "residential", services: [], consent: false, website: "" },
  });
  const services: string[] = watch("services") ?? [];

  const onSubmit = handleSubmit(async (data) => {
    setState("submitting");
    setServerError(undefined);
    try {
      await submit.mutateAsync({ ...data, source: (source as never) ?? "direct" });
      setState("success");
    } catch (e: any) {
      setServerError(e?.message);
      setState("error");
    }
  });

  if (state === "success") return <SubmitState state={state} />;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <Honeypot register={register} />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full Name" optional={false} error={errors.name?.message as string}>
          <input className="field-input" placeholder="Your name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Phone" optional={false} error={errors.phone?.message as string}>
          <input
            className="field-input"
            placeholder="10-digit mobile number"
            inputMode="tel"
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message as string}>
          <input className="field-input" placeholder="you@example.com" autoComplete="email" {...register("email")} />
        </Field>
        <Field label="Location" error={errors.location?.message as string}>
          <input className="field-input" placeholder="Area / locality in Chennai" {...register("location")} />
        </Field>
        <Field label="Property Type" error={errors.propertyType?.message as string}>
          <select className="field-input bg-charcoal" {...register("propertyType")}>
            <option value="">Select…</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Independent House</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Bedrooms" error={errors.bedrooms?.message as string}>
          <select className="field-input bg-charcoal" {...register("bedrooms")}>
            <option value="">Select…</option>
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
            <option>4 BHK</option>
            <option>5+ BHK</option>
          </select>
        </Field>
        <Field label="Approximate Area" error={errors.area?.message as string}>
          <input className="field-input" placeholder="e.g. 1,200 sq.ft" {...register("area")} />
        </Field>
        <Field label="New Home or Renovation" error={errors.projectNature?.message as string}>
          <select className="field-input bg-charcoal" {...register("projectNature")}>
            <option value="">Select…</option>
            <option>New home</option>
            <option>Renovation</option>
          </select>
        </Field>
        <Field label="Indicative Budget" error={errors.budget?.message as string}>
          <select className="field-input bg-charcoal" {...register("budget")}>
            <option value="">Select…</option>
            <option>Under ₹5 lakh</option>
            <option>₹5 – 10 lakh</option>
            <option>₹10 – 25 lakh</option>
            <option>₹25 – 50 lakh</option>
            <option>Above ₹50 lakh</option>
            <option>Prefer to discuss</option>
          </select>
        </Field>
        <Field label="Expected Start" error={errors.timeline?.message as string}>
          <input className="field-input" placeholder="e.g. Within 2 months" {...register("timeline")} />
        </Field>
      </div>

      <Field label="Services Required">
        <ChipGroup
          options={RES_SERVICES}
          values={services}
          onChange={(next) => setValue("services", next, { shouldDirty: true })}
        />
      </Field>

      <Field label="Additional Requirements" error={errors.requirements?.message as string}>
        <textarea
          rows={4}
          className="field-input resize-none"
          placeholder="Tell us about your space, must-haves and anything you already have (floor plan, references…)"
          {...register("requirements")}
        />
      </Field>
      <p className="text-[13px] text-ash/70">
        Have a floor plan? Mention it above — you can share it with our team once we connect.
      </p>

      <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[14px] text-ash">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[#F39800]" {...register("consent")} />
        <span>
          I consent to HILIGHT BUILDERS contacting me about this enquiry.
          {errors.consent && <span className="field-error block">{errors.consent.message as string}</span>}
        </span>
      </label>

      <SubmitState state={state === "error" ? "error" : "idle"} error={serverError} />

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full sm:w-auto">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Discuss Your Home Interiors <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

/* ------------------------------- commercial ------------------------------- */

const COM_SERVICES = [
  "Office interiors",
  "Retail / showroom",
  "Restaurant / café",
  "Clinic / healthcare",
  "Salon / spa",
  "Gym / fitness",
  "Reception & meeting spaces",
  "Turnkey execution",
];

export function CommercialForm({ source }: { source?: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>();
  const submit = trpc.leads.submit.useMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commercialLeadSchema),
    defaultValues: { type: "commercial", services: [], consent: false, website: "" },
  });
  const services: string[] = watch("services") ?? [];

  const onSubmit = handleSubmit(async (data) => {
    if (!data.email) {
      setError("email", { message: "Business email is required for commercial enquiries" });
      return;
    }
    setState("submitting");
    setServerError(undefined);
    try {
      await submit.mutateAsync({ ...data, source: (source as never) ?? "direct" });
      setState("success");
    } catch (e: any) {
      setServerError(e?.message);
      setState("error");
    }
  });

  if (state === "success") return <SubmitState state={state} />;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <Honeypot register={register} />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full Name" optional={false} error={errors.name?.message as string}>
          <input className="field-input" placeholder="Your name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Company Name" error={errors.company?.message as string}>
          <input className="field-input" placeholder="Company / brand" autoComplete="organization" {...register("company")} />
        </Field>
        <Field label="Designation" error={errors.designation?.message as string}>
          <input className="field-input" placeholder="e.g. Founder, Facility Manager" {...register("designation")} />
        </Field>
        <Field label="Phone" optional={false} error={errors.phone?.message as string}>
          <input className="field-input" placeholder="10-digit mobile number" inputMode="tel" {...register("phone")} />
        </Field>
        <Field label="Business Email" optional={false} error={errors.email?.message as string}>
          <input className="field-input" placeholder="you@company.com" autoComplete="email" {...register("email")} />
        </Field>
        <Field label="Business Type" error={errors.businessType?.message as string}>
          <select className="field-input bg-charcoal" {...register("businessType")}>
            <option value="">Select…</option>
            <option>Corporate office</option>
            <option>Retail shop</option>
            <option>Restaurant / café</option>
            <option>Clinic / healthcare</option>
            <option>Salon / spa</option>
            <option>Gym / fitness studio</option>
            <option>Showroom</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Project Location" error={errors.location?.message as string}>
          <input className="field-input" placeholder="Area / locality" {...register("location")} />
        </Field>
        <Field label="Approximate Area" error={errors.area?.message as string}>
          <input className="field-input" placeholder="e.g. 2,400 sq.ft" {...register("area")} />
        </Field>
        <Field label="Property Possession" error={errors.possessionStatus?.message as string}>
          <select className="field-input bg-charcoal" {...register("possessionStatus")}>
            <option value="">Select…</option>
            <option>Space already in possession</option>
            <option>Finalising a space</option>
            <option>Yet to identify a space</option>
          </select>
        </Field>
        <Field label="Indicative Budget" error={errors.budget?.message as string}>
          <select className="field-input bg-charcoal" {...register("budget")}>
            <option value="">Select…</option>
            <option>Under ₹10 lakh</option>
            <option>₹10 – 25 lakh</option>
            <option>₹25 – 50 lakh</option>
            <option>₹50 lakh – 1 crore</option>
            <option>Above ₹1 crore</option>
            <option>Prefer to discuss</option>
          </select>
        </Field>
        <Field label="Desired Opening / Completion" error={errors.timeline?.message as string}>
          <input className="field-input" placeholder="e.g. Before December" {...register("timeline")} />
        </Field>
      </div>

      <Field label="Services Required">
        <ChipGroup
          options={COM_SERVICES}
          values={services}
          onChange={(next) => setValue("services", next, { shouldDirty: true })}
        />
      </Field>

      <Field label="Additional Requirements" error={errors.requirements?.message as string}>
        <textarea
          rows={4}
          className="field-input resize-none"
          placeholder="Brand, footfall, workflow, must-haves, constraints…"
          {...register("requirements")}
        />
      </Field>

      <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[14px] text-ash">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[#F39800]" {...register("consent")} />
        <span>
          I consent to HILIGHT BUILDERS contacting me about this enquiry.
          {errors.consent && <span className="field-error block">{errors.consent.message as string}</span>}
        </span>
      </label>

      <SubmitState state={state === "error" ? "error" : "idle"} error={serverError} />

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full sm:w-auto">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Discuss Your Commercial Project <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

/* --------------------------------- general -------------------------------- */

export function GeneralForm({
  defaultType = "general",
  source,
  cta = "Send Enquiry",
}: {
  defaultType?: "general" | "construction" | "renovation";
  source?: string;
  cta?: string;
}) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>();
  const submit = trpc.leads.submit.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(generalLeadSchema),
    defaultValues: { type: defaultType, consent: false, website: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setState("submitting");
    setServerError(undefined);
    try {
      await submit.mutateAsync({ ...data, source: (source as never) ?? "direct" });
      setState("success");
    } catch (e: any) {
      setServerError(e?.message);
      setState("error");
    }
  });

  if (state === "success") return <SubmitState state={state} />;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <Honeypot register={register} />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full Name" optional={false} error={errors.name?.message as string}>
          <input className="field-input" placeholder="Your name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Phone" optional={false} error={errors.phone?.message as string}>
          <input className="field-input" placeholder="10-digit mobile number" inputMode="tel" {...register("phone")} />
        </Field>
        <Field label="Email" error={errors.email?.message as string}>
          <input className="field-input" placeholder="you@example.com" autoComplete="email" {...register("email")} />
        </Field>
        <Field label="Project Type" error={errors.type?.message as string}>
          <select className="field-input bg-charcoal" {...register("type")}>
            <option value="general">General enquiry</option>
            <option value="construction">Construction</option>
            <option value="renovation">Renovation</option>
            <option value="residential">Residential interiors</option>
            <option value="commercial">Commercial interiors</option>
          </select>
        </Field>
        <Field label="Location" error={errors.location?.message as string}>
          <input className="field-input" placeholder="Area / locality" {...register("location")} />
        </Field>
        <Field label="Approximate Area" error={errors.area?.message as string}>
          <input className="field-input" placeholder="e.g. 1,800 sq.ft" {...register("area")} />
        </Field>
      </div>

      <Field label="Tell Us About Your Project" error={errors.requirements?.message as string}>
        <textarea
          rows={5}
          className="field-input resize-none"
          placeholder="What are you planning, and when would you like to start?"
          {...register("requirements")}
        />
      </Field>

      <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[14px] text-ash">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[#F39800]" {...register("consent")} />
        <span>
          I consent to HILIGHT BUILDERS contacting me about this enquiry.
          {errors.consent && <span className="field-error block">{errors.consent.message as string}</span>}
        </span>
      </label>

      <SubmitState state={state === "error" ? "error" : "idle"} error={serverError} />

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full sm:w-auto">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            {cta} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
