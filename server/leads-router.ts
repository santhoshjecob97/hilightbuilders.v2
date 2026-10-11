import { z } from "zod";
import { and, desc, eq, gte, like, or, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { leads, leadNotes } from "../db/schema";
import { leadSubmissionSchema, LEAD_STATUSES } from "../contracts/leads";

export const leadsRouter = createRouter({
  /** Public: submit an enquiry. Server-side validation + spam checks. */
  submit: publicQuery.input(leadSubmissionSchema).mutation(async ({ input }) => {
    // Honeypot: bots fill hidden fields; silently accept without storing.
    if (input.website) return { ok: true as const, id: 0 };

    const db = getDb();

    // Duplicate-window guard: same phone + type within 5 minutes.
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    const [dup] = await db
      .select({ id: leads.id })
      .from(leads)
      .where(
        and(
          eq(leads.phone, input.phone),
          eq(leads.type, input.type),
          gte(leads.createdAt, fiveMinAgo),
        ),
      )
      .limit(1);
    if (dup) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "We have already received your enquiry. Our team will reach out shortly.",
      });
    }

    const { website: _hp, services, email, ...rest } = input;
    const [result] = await db.insert(leads).values({
      ...rest,
      email: email || null,
      services: services?.length ? JSON.stringify(services) : null,
      source: input.source ?? "direct",
    });
    return { ok: true as const, id: Number(result.insertId) };
  }),

  /** Admin: list leads with filters + search. */
  list: adminQuery
    .input(
      z.object({
        status: z.enum(LEAD_STATUSES).optional(),
        type: z.string().optional(),
        search: z.string().trim().max(120).optional(),
        limit: z.number().min(1).max(200).default(100),
      }),
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conds = [];
      if (input.status) conds.push(eq(leads.status, input.status));
      if (input.type) conds.push(eq(leads.type, input.type as never));
      if (input.search) {
        const q = `%${input.search}%`;
        conds.push(or(like(leads.name, q), like(leads.phone, q), like(leads.email, q)));
      }
      return db
        .select()
        .from(leads)
        .where(conds.length ? and(...conds) : undefined)
        .orderBy(desc(leads.createdAt))
        .limit(input.limit);
    }),

  /** Admin: lead detail with notes/history. */
  byId: adminQuery.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const db = getDb();
    const [lead] = await db.select().from(leads).where(eq(leads.id, input.id)).limit(1);
    if (!lead) throw new TRPCError({ code: "NOT_FOUND", message: "Lead not found" });
    const notes = await db
      .select()
      .from(leadNotes)
      .where(eq(leadNotes.leadId, input.id))
      .orderBy(desc(leadNotes.createdAt));
    return { lead, notes };
  }),

  /** Admin: update pipeline status (writes history entry). */
  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(LEAD_STATUSES),
        note: z.string().trim().max(2000).optional(),
        followUpAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(leads).set({ status: input.status }).where(eq(leads.id, input.id));
      await db.insert(leadNotes).values({
        leadId: input.id,
        status: input.status,
        note: input.note || null,
        followUpAt: input.followUpAt ?? null,
      });
      return { ok: true as const };
    }),

  /** Admin: add a note / follow-up without changing status. */
  addNote: adminQuery
    .input(
      z.object({
        id: z.number(),
        note: z.string().trim().min(1).max(2000),
        followUpAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(leadNotes).values({
        leadId: input.id,
        note: input.note,
        followUpAt: input.followUpAt ?? null,
      });
      return { ok: true as const };
    }),

  /** Admin: pipeline overview numbers. */
  stats: adminQuery.query(async () => {
    const db = getDb();
    const byStatus = await db
      .select({ status: leads.status, count: sql<number>`count(*)` })
      .from(leads)
      .groupBy(leads.status);
    const byType = await db
      .select({ type: leads.type, count: sql<number>`count(*)` })
      .from(leads)
      .groupBy(leads.type);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [recent] = await db
      .select({ count: sql<number>`count(*)` })
      .from(leads)
      .where(gte(leads.createdAt, weekAgo));
    return { byStatus, byType, last7Days: Number(recent?.count ?? 0) };
  }),
});
