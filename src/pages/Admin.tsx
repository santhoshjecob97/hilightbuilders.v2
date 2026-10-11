import { useState } from "react";
import {
  Loader2, LogOut, RefreshCw, Search, ShieldAlert, Plus, Trash2, X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { Wordmark } from "@/components/Logo";
import { useSeo } from "@/components/Layout";
import { LEAD_STATUSES, LEAD_TYPES } from "@contracts/leads";

type Tab = "overview" | "leads" | "projects" | "posts";

/* ------------------------------- small atoms ------------------------------- */

const inputCls =
  "w-full border border-white/15 bg-charcoal px-3 py-2.5 text-[14px] text-bone placeholder:text-ash/50 focus:border-brand focus:outline-none";
const labelCls = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-ash";

function Badge({ children, tone = "grey" }: { children: React.ReactNode; tone?: "grey" | "orange" | "green" }) {
  const tones = {
    grey: "border-white/15 text-ash",
    orange: "border-brand/50 text-brand",
    green: "border-emerald-500/50 text-emerald-400",
  };
  return (
    <span className={`inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* --------------------------------- overview -------------------------------- */

function Overview() {
  const { data, isLoading } = trpc.leads.stats.useQuery();
  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin text-brand" />;
  if (!data) return null;
  const total = data.byStatus.reduce((a, s) => a + Number(s.count), 0);
  return (
    <div className="space-y-8">
      <div className="grid gap-px bg-white/[0.07] hairline sm:grid-cols-3">
        {[
          ["Total Enquiries", total],
          ["New (7 days)", data.last7Days],
          ["In Pipeline", total - Number(data.byStatus.find((s) => s.status === "LOST")?.count ?? 0) - Number(data.byStatus.find((s) => s.status === "WON")?.count ?? 0)],
        ].map(([k, v]) => (
          <div key={k as string} className="bg-charcoal-deep p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">{k}</p>
            <p className="mt-2 font-display text-4xl font-bold text-bone">{v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ash">By Status</h3>
          <div className="space-y-2">
            {LEAD_STATUSES.map((s) => {
              const count = Number(data.byStatus.find((x) => x.status === s)?.count ?? 0);
              return (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-32 font-mono text-[11px] tracking-[0.1em] text-ash">{s}</span>
                  <div className="h-2 flex-1 bg-white/5">
                    <div className="h-full bg-brand" style={{ width: total ? `${(count / total) * 100}%` : 0 }} />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px] text-bone">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ash">By Type</h3>
          <div className="space-y-2">
            {data.byType.map((t) => (
              <div key={t.type} className="flex items-center justify-between border-b border-white/5 py-2">
                <span className="font-mono text-[12px] capitalize tracking-[0.1em] text-bone">{t.type}</span>
                <Badge tone="orange">{t.count}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- leads --------------------------------- */

function LeadDetail({ id, onClose }: { id: number; onClose: () => void }) {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.leads.byId.useQuery({ id });
  const [status, setStatus] = useState<string>("");
  const [note, setNote] = useState("");
  const update = trpc.leads.updateStatus.useMutation({
    onSuccess: () => {
      setNote("");
      utils.leads.byId.invalidate({ id });
      utils.leads.list.invalidate();
      utils.leads.stats.invalidate();
    },
  });
  const addNote = trpc.leads.addNote.useMutation({
    onSuccess: () => {
      setNote("");
      utils.leads.byId.invalidate({ id });
    },
  });

  if (isLoading || !data) return <div className="p-6"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>;
  const { lead, notes } = data;
  const services: string[] = lead.services ? JSON.parse(lead.services) : [];

  return (
    <div className="hairline bg-charcoal-deep">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <h3 className="font-display text-[18px] font-semibold text-bone">{lead.name}</h3>
        <button onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center border border-white/15 text-ash hover:text-bone">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-x-8 gap-y-4 p-6 sm:grid-cols-2">
        {[
          ["Phone", lead.phone],
          ["Email", lead.email],
          ["Type", lead.type],
          ["Source", lead.source],
          ["Company", lead.company],
          ["Designation", lead.designation],
          ["Location", lead.location],
          ["Property", lead.propertyType],
          ["Business", lead.businessType],
          ["Area", lead.area],
          ["Bedrooms", lead.bedrooms],
          ["Nature", lead.projectNature],
          ["Possession", lead.possessionStatus],
          ["Budget", lead.budget],
          ["Timeline", lead.timeline],
          ["Received", new Date(lead.createdAt).toLocaleString("en-IN")],
        ]
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k as string}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">{k}</p>
              <p className="mt-1 text-[14px] capitalize text-bone">{String(v)}</p>
            </div>
          ))}
        {services.length > 0 && (
          <div className="sm:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">Services</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {services.map((s) => <Badge key={s} tone="orange">{s}</Badge>)}
            </div>
          </div>
        )}
        {lead.requirements && (
          <div className="sm:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">Requirements</p>
            <p className="mt-1 whitespace-pre-wrap text-[14px] leading-relaxed text-bone/85">{lead.requirements}</p>
          </div>
        )}
      </div>

      {/* Status update */}
      <div className="border-t border-white/10 p-6">
        <p className={labelCls}>Update Status</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            className={inputCls}
            value={status || lead.status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button
            onClick={() => update.mutate({ id, status: (status || lead.status) as never, note: note || undefined })}
            disabled={update.isPending}
            className="btn-primary !min-h-[42px] whitespace-nowrap !px-5"
          >
            {update.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Status"}
          </button>
        </div>
        <p className={`${labelCls} mt-5`}>Add Note</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input className={inputCls} placeholder="Follow-up note…" value={note} onChange={(e) => setNote(e.target.value)} />
          <button
            onClick={() => note && addNote.mutate({ id, note })}
            disabled={addNote.isPending || !note}
            className="btn-ghost !min-h-[42px] whitespace-nowrap !px-5"
          >
            Add Note
          </button>
        </div>
      </div>

      {/* History */}
      <div className="border-t border-white/10 p-6">
        <p className={labelCls}>History</p>
        {notes.length === 0 ? (
          <p className="text-[13px] text-ash/60">No activity yet.</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((n) => (
              <li key={n.id} className="flex flex-wrap items-baseline gap-3 text-[13px]">
                <span className="font-mono text-[10px] text-ash/60">
                  {new Date(n.createdAt).toLocaleString("en-IN")}
                </span>
                {n.status && <Badge tone="green">{n.status}</Badge>}
                {n.note && <span className="text-bone/80">{n.note}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Leads() {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const { data, isLoading, refetch, isFetching } = trpc.leads.list.useQuery({
    ...(status ? { status: status as never } : {}),
    ...(type ? { type } : {}),
    ...(search ? { search } : {}),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className={labelCls}>Status</label>
          <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Type</label>
          <select className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            {LEAD_TYPES.map((t) => <option key={t} className="capitalize">{t}</option>)}
          </select>
        </div>
        <div className="min-w-[200px] flex-1">
          <label className={labelCls}>Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ash/50" />
            <input
              className={`${inputCls} pl-9`}
              placeholder="Name, phone or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button onClick={() => refetch()} aria-label="Refresh" className="flex h-[42px] w-[42px] items-center justify-center border border-white/15 text-ash hover:text-bone">
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
        </button>
      </div>

      {selected !== null ? (
        <LeadDetail id={selected} onClose={() => setSelected(null)} />
      ) : isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      ) : (
        <div className="overflow-x-auto hairline">
          <table className="w-full min-w-[720px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelected(lead.id)}
                  className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3 font-mono text-[11px] text-ash">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-semibold text-bone">{lead.name}</td>
                  <td className="px-4 py-3 capitalize text-ash">{lead.type}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-ash">{lead.phone}</td>
                  <td className="px-4 py-3 text-ash">{lead.location ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Badge tone={lead.status === "NEW" ? "orange" : lead.status === "WON" ? "green" : "grey"}>
                      {lead.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {(data ?? []).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ash/60">
                    No enquiries match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- projects & posts ---------------------------- */

function ProjectsAdmin() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.content.projects.listAdmin.useQuery();
  const [editing, setEditing] = useState<any | null>(null);
  const upsert = trpc.content.projects.upsert.useMutation({
    onSuccess: () => { setEditing(null); utils.content.projects.listAdmin.invalidate(); utils.content.projects.list.invalidate(); },
  });
  const remove = trpc.content.projects.remove.useMutation({
    onSuccess: () => utils.content.projects.listAdmin.invalidate(),
  });
  const [form, setForm] = useState<any>({});

  const startEdit = (p?: any) => {
    const v = p ?? { slug: "", title: "", category: "residential", status: "concept", location: "", area: "", scope: "", concept: "", materials: "", coverImage: "", featured: false };
    setForm(v);
    setEditing(v);
  };
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  if (editing) {
    return (
      <div className="hairline bg-charcoal-deep p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-[18px] font-semibold text-bone">{form.id ? "Edit Project" : "New Project"}</h3>
          <button onClick={() => setEditing(null)} className="btn-ghost !min-h-[40px] !px-4">Cancel</button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} /></div>
          <div><label className={labelCls}>Slug *</label><input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="my-project-slug" /></div>
          <div>
            <label className={labelCls}>Category *</label>
            <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
              {["residential", "commercial", "kitchens", "living-rooms", "bedrooms", "offices", "retail", "renovation"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Status *</label>
            <select className={inputCls} value={form.status} onChange={(e) => set("status", e.target.value)}>
              {["completed", "in_progress", "concept"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Location</label><input className={inputCls} value={form.location ?? ""} onChange={(e) => set("location", e.target.value)} /></div>
          <div><label className={labelCls}>Area</label><input className={inputCls} value={form.area ?? ""} onChange={(e) => set("area", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelCls}>Cover Image Path</label><input className={inputCls} value={form.coverImage ?? ""} onChange={(e) => set("coverImage", e.target.value)} placeholder="/images/….jpg" /></div>
          <div className="sm:col-span-2"><label className={labelCls}>Scope</label><textarea rows={2} className={inputCls} value={form.scope ?? ""} onChange={(e) => set("scope", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelCls}>Design Concept</label><textarea rows={3} className={inputCls} value={form.concept ?? ""} onChange={(e) => set("concept", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelCls}>Material Direction</label><textarea rows={2} className={inputCls} value={form.materials ?? ""} onChange={(e) => set("materials", e.target.value)} /></div>
          <label className="flex items-center gap-3 text-[14px] text-ash">
            <input type="checkbox" className="h-4 w-4 accent-[#F39800]" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} />
            Featured on homepage
          </label>
        </div>
        {upsert.error && <p className="field-error mt-4">{upsert.error.message}</p>}
        <button
          onClick={() => upsert.mutate({ ...form, id: form.id })}
          disabled={upsert.isPending}
          className="btn-primary mt-6"
        >
          {upsert.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Project"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => startEdit()} className="btn-primary"><Plus className="h-4 w-4" /> New Project</button>
      {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-brand" /> : (
        <div className="hairline divide-y divide-white/5">
          {(data ?? []).map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 px-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-display font-semibold text-bone">{p.title}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ash">
                  {p.category} · {p.status}{p.sample ? " · sample" : ""}{p.featured ? " · featured" : ""}
                </p>
              </div>
              <button onClick={() => startEdit(p)} className="btn-ghost !min-h-[40px] !px-4">Edit</button>
              <button
                onClick={() => confirm(`Delete "${p.title}"?`) && remove.mutate({ id: p.id })}
                aria-label="Delete"
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-ash hover:border-red-500 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PostsAdmin() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.content.posts.listAdmin.useQuery();
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const upsert = trpc.content.posts.upsert.useMutation({
    onSuccess: () => { setEditing(null); utils.content.posts.listAdmin.invalidate(); utils.content.posts.list.invalidate(); },
  });
  const remove = trpc.content.posts.remove.useMutation({
    onSuccess: () => utils.content.posts.listAdmin.invalidate(),
  });

  const startEdit = (p?: any) => {
    const v = p ?? { slug: "", title: "", excerpt: "", content: "", category: "", coverImage: "", published: false };
    setForm(v);
    setEditing(v);
  };
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  if (editing) {
    return (
      <div className="hairline bg-charcoal-deep p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-[18px] font-semibold text-bone">{form.id ? "Edit Article" : "New Article"}</h3>
          <button onClick={() => setEditing(null)} className="btn-ghost !min-h-[40px] !px-4">Cancel</button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} /></div>
          <div><label className={labelCls}>Slug *</label><input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} /></div>
          <div><label className={labelCls}>Category</label><input className={inputCls} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} /></div>
          <div><label className={labelCls}>Cover Image Path</label><input className={inputCls} value={form.coverImage ?? ""} onChange={(e) => set("coverImage", e.target.value)} placeholder="/images/….jpg" /></div>
          <div className="sm:col-span-2"><label className={labelCls}>Excerpt</label><textarea rows={2} className={inputCls} value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelCls}>Content (paragraphs separated by blank lines)</label><textarea rows={10} className={inputCls} value={form.content ?? ""} onChange={(e) => set("content", e.target.value)} /></div>
          <label className="flex items-center gap-3 text-[14px] text-ash">
            <input type="checkbox" className="h-4 w-4 accent-[#F39800]" checked={!!form.published} onChange={(e) => set("published", e.target.checked)} />
            Published
          </label>
        </div>
        {upsert.error && <p className="field-error mt-4">{upsert.error.message}</p>}
        <button onClick={() => upsert.mutate({ ...form, id: form.id })} disabled={upsert.isPending} className="btn-primary mt-6">
          {upsert.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Article"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => startEdit()} className="btn-primary"><Plus className="h-4 w-4" /> New Article</button>
      {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-brand" /> : (
        <div className="hairline divide-y divide-white/5">
          {(data ?? []).map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 px-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-display font-semibold text-bone">{p.title}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ash">
                  {p.category ?? "uncategorised"} · {p.published ? "published" : "draft"}{p.sample ? " · sample" : ""}
                </p>
              </div>
              <button onClick={() => startEdit(p)} className="btn-ghost !min-h-[40px] !px-4">Edit</button>
              <button
                onClick={() => confirm(`Delete "${p.title}"?`) && remove.mutate({ id: p.id })}
                aria-label="Delete"
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-ash hover:border-red-500 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- shell ---------------------------------- */

export default function Admin() {
  useSeo("Admin | HILIGHT BUILDERS", "Secure administration area.");
  const { user, isLoading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const [tab, setTab] = useState<Tab>("overview");
  const promote = trpc.content.promoteSelf.useMutation();

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal">
        <Loader2 className="h-7 w-7 animate-spin text-brand" />
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-charcoal px-6 text-center">
        <ShieldAlert className="h-10 w-10 text-brand" />
        <h1 className="display-3 text-bone">Admin access required.</h1>
        <p className="max-w-md text-[14px] leading-relaxed text-ash">
          Signed in as {user.name ?? user.email ?? "unknown"} ({user.email ?? "no email"}), but this
          account does not have the admin role. If your email is on the ADMIN_EMAILS allow-list,
          you can activate admin access below.
        </p>
        <button onClick={() => promote.mutate()} disabled={promote.isPending} className="btn-primary">
          {promote.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Activate Admin Access"}
        </button>
        {promote.error && <p className="field-error">{promote.error.message}</p>}
        {promote.isSuccess && <p className="text-emerald-400">Admin activated — refresh the page.</p>}
        <button onClick={logout} className="btn-ghost"><LogOut className="h-4 w-4" /> Sign Out</button>
      </div>
    );
  }

  const tabs: [Tab, string][] = [
    ["overview", "Overview"],
    ["leads", "Leads"],
    ["projects", "Projects"],
    ["posts", "Articles"],
  ];

  return (
    <div className="min-h-screen bg-charcoal">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <Wordmark compact />
            <Badge tone="orange">Admin</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[11px] tracking-[0.1em] text-ash sm:block">{user.email}</span>
            <button onClick={logout} aria-label="Sign out" className="flex h-10 w-10 items-center justify-center border border-white/15 text-ash hover:text-bone">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`min-h-[44px] border px-5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                tab === key ? "border-brand bg-brand text-charcoal" : "border-white/15 text-ash hover:text-bone"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === "overview" && <Overview />}
        {tab === "leads" && <Leads />}
        {tab === "projects" && <ProjectsAdmin />}
        {tab === "posts" && <PostsAdmin />}
      </div>
    </div>
  );
}
