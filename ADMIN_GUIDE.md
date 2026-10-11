# HILIGHT BUILDERS — Website Guide

Premium full-stack website for HILIGHT BUILDERS, Chennai.
React + TypeScript + Vite frontend · tRPC + Hono backend · MySQL (Drizzle ORM).

## What is where

| Area | Location |
|---|---|
| Business configuration (address, email, hours, WhatsApp) | `src/config.ts` |
| Brand tokens & typography | `src/index.css`, `tailwind.config.js` |
| Pages | `src/pages/` |
| Enquiry forms | `src/components/EnquiryForms.tsx` |
| Shared validation schemas | `contracts/leads.ts` |
| Database tables | `db/schema.ts` |
| API routers | `api/leads-router.ts`, `api/content-router.ts` |
| Seed (sample projects/articles) | `db/seed.ts` |

## Lead pipeline

Enquiries from all forms land in the `leads` table with type, source and
status `NEW`. Pipeline: NEW → CONTACTED → QUALIFIED → CONSULTATION →
SITE_VISIT → PROPOSAL → NEGOTIATION → WON / LOST.

Server-side protections: Zod validation, Indian mobile-number format check,
honeypot spam field, 5-minute duplicate guard, 50 MB body limit.

## Admin dashboard (`/admin`)

1. Sign in with Kimi at `/login`.
2. Grant admin: set the environment variable `ADMIN_EMAILS` to a
   comma-separated list of allowed emails, sign in, open `/admin` and click
   "Activate Admin Access".
3. Dashboard includes: pipeline overview, lead inbox (search/filter/status
   updates/notes/follow-up history), project management and article management.

Sample projects and articles are flagged `sample` and labelled in the UI.
Replace them with real, approved work from the admin dashboard.

## Before launch checklist

- [ ] Add the verified WhatsApp number in `src/config.ts` (`whatsappNumber`) —
      until then WhatsApp CTAs route to the contact page.
- [ ] Optionally add the click-to-call number (`phone`) and adjust `hours`.
- [ ] Set `ADMIN_EMAILS` in the server environment.
- [ ] Replace sample projects/articles with approved content.
- [ ] Replace generated imagery with real project photography as projects
      are handed over (keep the "Concept Visualisation" labelling honest).
- [ ] Have the company review the draft Privacy Policy and Terms of Use.
- [ ] Verify the address, then embed a map on the contact page if desired.
- [ ] Configure analytics (GA4 / Meta Pixel) with consent requirements —
      CTA elements carry `data-track` attributes (whatsapp, email).
- [ ] Acknowledgement emails: not configured — wire an email provider in the
      `leads.submit` handler when credentials are available.

## Commands

```bash
npm run dev       # develop
npm run build     # production build
npm start         # production server
npm run db:push   # sync database schema
npx tsx db/seed.ts  # seed sample content
```
