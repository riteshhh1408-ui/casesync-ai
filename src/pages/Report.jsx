import { useParams } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";

export default function Report() {
  const { caseId } = useParams();
  const download = () => {
    const csv = [
      ["Case ID","Evidence Count","Verified Items","Items Needing Review","Missing Information","Timeline"],
      [caseId,"14","9","5","2","10:30 AM Message received | 10:35 AM URL identified | 10:45 AM Transaction recorded | 11:00 AM Additional payment request"]
    ].map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(",")).join("\\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], {type:"text/csv"}));
    a.download = `${caseId}-report.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow={`Case ${caseId}`} title="Case report" description="Structured incident summary prepared for CSV export." action={<button onClick={download} className="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950">Download CSV</button>} />
      <div className="grid gap-4 sm:grid-cols-4">
        <Metric label="Case ID" value={caseId}/><Metric label="Evidence count" value="14"/><Metric label="Verified items" value="9"/><Metric label="Needs review" value="5"/>
      </div>
      <section className="mt-6 rounded-xl border border-line bg-panel p-6">
        <h2 className="font-medium text-white">Missing information</h2>
        <p className="mt-2 text-sm text-slate-400">2 fields require additional source evidence or human review.</p>
        <h2 className="mt-7 font-medium text-white">Timeline</h2>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          <div>10:30 AM → Message received</div><div>10:35 AM → URL identified</div><div>10:45 AM → Transaction recorded</div><div>11:00 AM → Additional payment request</div>
        </div>
      </section>
    </div>
  );
}
function Metric({label,value}) { return <div className="rounded-xl border border-line bg-panel p-5"><div className="text-xs text-slate-500">{label}</div><div className="mt-2 font-semibold text-white">{value}</div></div>; }