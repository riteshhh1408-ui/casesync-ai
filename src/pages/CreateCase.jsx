import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";

export default function CreateCase() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Case management" title="Create a new case" description="Create the incident workspace before uploading evidence." />
      <form onSubmit={(e) => { e.preventDefault(); navigate("/cases/CS-2026-003/upload"); }} className="rounded-xl border border-line bg-panel p-6">
        <label className="block"><span className="mb-2 block text-sm text-slate-300">Case title</span><input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Online payment incident" className="w-full rounded-lg border border-line bg-black/20 px-3 py-3 text-sm text-white outline-none focus:border-cyan-400/50"/></label>
        <label className="mt-5 block"><span className="mb-2 block text-sm text-slate-300">Incident description</span><textarea rows="5" placeholder="Describe the incident context without making conclusions." className="w-full rounded-lg border border-line bg-black/20 px-3 py-3 text-sm text-white outline-none focus:border-cyan-400/50"/></label>
        <div className="mt-5 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 text-xs leading-5 text-amber-200">CaseSync AI organizes evidence only. Avoid entering conclusions about guilt or fraud.</div>
        <button className="mt-6 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Create & upload evidence</button>
      </form>
    </div>
  );
}