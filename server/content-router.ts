import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { posts, projects, users } from "../db/schema";
import {
  projectInputSchema,
  postInputSchema,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "../contracts/leads";

export const contentRouter = createRouter({
  // ---------- Projects (portfolio) ----------
  projects: createRouter({
    list: publicQuery
      .input(
        z
          .object({
            category: z.enum(PROJECT_CATEGORIES).optional(),
            status: z.enum(PROJECT_STATUSES).optional(),
            featured: z.boolean().optional(),
          })
          .optional(),
      )
      .query(async ({ input }) => {
        const db = getDb();
        const conds = [];
        if (input?.category) conds.push(eq(projects.category, input.category));
        if (input?.status) conds.push(eq(projects.status, input.status));
        if (input?.featured) conds.push(eq(projects.featured, true));
        return db
          .select()
          .from(projects)
          .where(conds.length ? and(...conds) : undefined)
          .orderBy(desc(projects.featured), desc(projects.createdAt));
      }),

    bySlug: publicQuery.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      const db = getDb();
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.slug, input.slug))
        .limit(1);
      if (!project) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
      return project;
    }),

    listAdmin: adminQuery.query(async () => {
      const db = getDb();
      return db.select().from(projects).orderBy(desc(projects.createdAt));
    }),

    upsert: adminQuery.input(projectInputSchema).mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      if (id) {
        await db.update(projects).set(data).where(eq(projects.id, id));
        return { ok: true as const, id };
      }
      const [result] = await db.insert(projects).values({ ...data, sample: false });
      return { ok: true as const, id: Number(result.insertId) };
    }),

    remove: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(projects).where(eq(projects.id, input.id));
      return { ok: true as const };
    }),
  }),

  // ---------- Blog posts ----------
  posts: createRouter({
    list: publicQuery.query(async () => {
      const db = getDb();
      return db
        .select()
        .from(posts)
        .where(eq(posts.published, true))
        .orderBy(desc(posts.createdAt));
    }),

    bySlug: publicQuery.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      const db = getDb();
      const [post] = await db.select().from(posts).where(eq(posts.slug, input.slug)).limit(1);
      if (!post || !post.published)
        throw new TRPCError({ code: "NOT_FOUND", message: "Article not found" });
      return post;
    }),

    listAdmin: adminQuery.query(async () => {
      const db = getDb();
      return db.select().from(posts).orderBy(desc(posts.createdAt));
    }),

    upsert: adminQuery.input(postInputSchema).mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      if (id) {
        await db.update(posts).set(data).where(eq(posts.id, id));
        return { ok: true as const, id };
      }
      const [result] = await db.insert(posts).values({ ...data, sample: false });
      return { ok: true as const, id: Number(result.insertId) };
    }),

    remove: adminQuery.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(posts).where(eq(posts.id, input.id));
      return { ok: true as const };
    }),
  }),

  /** Authenticated user can self-promote to admin if their email is allow-listed
   *  in the ADMIN_EMAILS environment variable (comma-separated). */
  promoteSelf: authedQuery.mutation(async ({ ctx }) => {
    const allowed = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const email = ctx.user.email?.toLowerCase();
    if (!email || !allowed.includes(email)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "This account is not on the admin allow-list.",
      });
    }
    const db = getDb();
    await db.update(users).set({ role: "admin" }).where(eq(users.id, ctx.user.id));
    return { ok: true as const };
  }),
});
