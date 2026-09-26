import { useNavigate } from "react-router-dom";
import { AlertTriangle, ClipboardList, FileSearch, Plus, ShieldAlert, UploadCloud } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import StatusBadge from "../components/ui/StatusBadge";

const cases = [
  { id: "CS-2026-001", title: "Online payment incident", updated: "Today, 11:00 AM", status: "Needs Review", count: 14 },
  { id: "CS-2026-002", title: "Marketplace communication", updated: "Yesterday, 4:20 PM", status: "Pending", count: 8 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Overview"
        title="Case dashboard"
        description="Track evidence intake, review status, missing information and chronological events."
        action={<button onClick={() => navigate("/cases/new")} className="flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-300"><Plus size={17}/> Create case</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total cases" value="12" hint="Across your workspace" icon={ClipboardList}/>
        <StatCard label="Evidence uploaded" value="84" hint="All file types" icon={UploadCloud}/>
        <StatCard label="Items needing review" value="17" hint="Human action required" icon={FileSearch}/>
        <StatCard label="Missing information" value="9" hint="Fields still incomplete" icon={AlertTriangle}/>
        <StatCard label="Timeline events" value="56" hint="Chronologically extracted" icon={ShieldAlert}/>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-xl border border-line bg-panel/90">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-medium text-white">Recent cases</h2>
            <span className="text-xs text-slate-500">Updated recently</span>
          </div>
          <div className="divide-y divide-line">
            {cases.map((item) => (
              <button key={item.id} onClick={() => navigate(`/cases/${item.id}/review`)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[.02]">
                <div>
                  <div className="text-sm font-medium text-slate-200">{item.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.id} · {item.count} evidence items · {item.updated}</div>
                </div>
                <StatusBadge status={item.status}/>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-line bg-panel/90 p-5">
          <h2 className="font-medium text-white">Latest timeline events</h2>
          <div className="mt-5 space-y-5">
            {["10:30 AM → Message received", "10:35 AM → URL identified", "10:45 AM → Transaction recorded", "11:00 AM → Additional payment request"].map((x) => (
              <div key={x} className="border-l border-cyan-400/30 pl-4 text-sm text-slate-300">{x}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}