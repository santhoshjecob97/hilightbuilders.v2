import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  boolean,
} from "drizzle-orm/mysql-core";
import {
  LEAD_STATUSES,
  LEAD_TYPES,
  LEAD_SOURCES,
  PROJECT_STATUSES,
  PROJECT_CATEGORIES,
} from "../contracts/leads";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Enquiries captured from the public website. */
export const leads = mysqlTable("leads", {
  id: serial("id").primaryKey(),
  type: mysqlEnum("type", LEAD_TYPES).notNull(),
  status: mysqlEnum("status", LEAD_STATUSES).default("NEW").notNull(),
  source: mysqlEnum("source", LEAD_SOURCES).default("direct").notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 320 }),
  company: varchar("company", { length: 160 }),
  designation: varchar("designation", { length: 120 }),
  location: varchar("location", { length: 160 }),
  propertyType: varchar("propertyType", { length: 120 }),
  businessType: varchar("businessType", { length: 120 }),
  area: varchar("area", { length: 60 }),
  bedrooms: varchar("bedrooms", { length: 20 }),
  projectNature: varchar("projectNature", { length: 40 }),
  possessionStatus: varchar("possessionStatus", { length: 120 }),
  services: text("services"), // JSON array of strings
  budget: varchar("budget", { length: 80 }),
  timeline: varchar("timeline", { length: 120 }),
  requirements: text("requirements"),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
export type Lead = typeof leads.$inferSelect;

/** Status history + follow-up notes per lead. */
export const leadNotes = mysqlTable("lead_notes", {
  id: serial("id").primaryKey(),
  leadId: bigint("leadId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => leads.id),
  status: varchar("status", { length: 40 }),
  note: text("note"),
  followUpAt: timestamp("followUpAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type LeadNote = typeof leadNotes.$inferSelect;

/** Portfolio projects (completed, in-progress, concept visualisations). */
export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 190 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: mysqlEnum("category", PROJECT_CATEGORIES).notNull(),
  status: mysqlEnum("status", PROJECT_STATUSES).notNull().default("concept"),
  location: varchar("location", { length: 255 }),
  area: varchar("area", { length: 80 }),
  scope: text("scope"),
  concept: text("concept"),
  materials: text("materials"),
  coverImage: varchar("coverImage", { length: 500 }),
  featured: boolean("featured").notNull().default(false),
  /** Marks seeded demonstration content until replaced with real work. */
  sample: boolean("sample").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Project = typeof projects.$inferSelect;

/** Insights / blog articles. */
export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 190 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: varchar("category", { length: 80 }),
  coverImage: varchar("coverImage", { length: 500 }),
  published: boolean("published").notNull().default(false),
  /** Marks seeded demonstration content. */
  sample: boolean("sample").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
export type Post = typeof posts.$inferSelect;
