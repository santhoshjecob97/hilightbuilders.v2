import { z } from "zod";

/** Lead pipeline statuses (CRM funnel). */
export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONSULTATION",
  "SITE_VISIT",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_TYPES = [
  "residential",
  "commercial",
  "construction",
  "renovation",
  "general",
] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

export const LEAD_SOURCES = [
  "organic_search",
  "google_ads",
  "meta_ads",
  "instagram",
  "linkedin",
  "whatsapp",
  "referral",
  "direct",
  "other",
] as const;

/** Indian mobile numbers: 10 digits starting 6-9, optional +91 / 0 prefix. */
const indianPhone = z
  .string()
  .transform((v) => v.replace(/[\s-]/g, "").replace(/^\+?91/, "").replace(/^0/, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"));

const baseFields = {
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: indianPhone,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address")]).optional(),
  location: z.string().trim().max(160).optional(),
  area: z.string().trim().max(60).optional(),
  budget: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(120).optional(),
  services: z.array(z.string().max(80)).max(20).optional(),
  requirements: z.string().trim().max(4000).optional(),
  consent: z.boolean().refine((v) => v === true, "Please consent to be contacted"),
  /** Honeypot — must remain empty (spam trap, hidden from humans). */
  website: z.string().max(0).optional(),
  source: z.enum(LEAD_SOURCES).optional(),
};

export const residentialLeadSchema = z.object({
  ...baseFields,
  type: z.literal("residential"),
  propertyType: z.string().trim().max(120).optional(),
  bedrooms: z.string().trim().max(20).optional(),
  projectNature: z.string().trim().max(40).optional(),
});

export const commercialLeadSchema = z.object({
  ...baseFields,
  type: z.literal("commercial"),
  company: z.string().trim().max(160).optional(),
  designation: z.string().trim().max(120).optional(),
  businessType: z.string().trim().max(120).optional(),
  possessionStatus: z.string().trim().max(120).optional(),
});

export const generalLeadSchema = z.object({
  ...baseFields,
  type: z.enum(["general", "construction", "renovation"]),
  company: z.string().trim().max(160).optional(),
});

export const leadSubmissionSchema = z.discriminatedUnion("type", [
  residentialLeadSchema,
  commercialLeadSchema,
  generalLeadSchema,
]);
export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

export const PROJECT_STATUSES = ["completed", "in_progress", "concept"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_CATEGORIES = [
  "residential",
  "commercial",
  "kitchens",
  "living-rooms",
  "bedrooms",
  "offices",
  "retail",
  "renovation",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const projectInputSchema = z.object({
  id: z.number().optional(),
  slug: z.string().trim().min(2).max(190).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, hyphens"),
  title: z.string().trim().min(2).max(255),
  category: z.enum(PROJECT_CATEGORIES),
  status: z.enum(PROJECT_STATUSES),
  location: z.string().trim().max(255).optional(),
  area: z.string().trim().max(80).optional(),
  scope: z.string().trim().max(4000).optional(),
  concept: z.string().trim().max(4000).optional(),
  materials: z.string().trim().max(2000).optional(),
  coverImage: z.string().trim().max(500).optional(),
  featured: z.boolean().optional(),
});

export const postInputSchema = z.object({
  id: z.number().optional(),
  slug: z.string().trim().min(2).max(190).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, hyphens"),
  title: z.string().trim().min(2).max(255),
  excerpt: z.string().trim().max(500).optional(),
  content: z.string().trim().max(50000).optional(),
  category: z.string().trim().max(80).optional(),
  coverImage: z.string().trim().max(500).optional(),
  published: z.boolean().optional(),
});
