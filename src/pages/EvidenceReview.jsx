import { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import StatusBadge from "../components/ui/StatusBadge";

const initial = [
  ["Message received", "26 Sep 2026", "10:30 AM", "₹2,500", "98******10", "ab***@upi", "TXN****6451", "—", "Chat export", "94%", "Needs Review"],
  ["URL identified", "26 Sep 2026", "10:35 AM", "—", "98******10", "—", "—", "https://example.invalid/****", "Screenshot", "89%", "Pending"],
  ["Transaction recorded", "26 Sep 2026", "10:45 AM", "₹8,000", "98******10", "ab***@upi", "TXN****8821", "—", "CSV", "97%", "Verified"],
];

const headers = ["Event","Date","Time","Amount","Mobile","UPI","Reference Number","URL","Source","Confidence","Verification Status"];

export default function EvidenceReview() {
  const { caseId } = useParams();
  const [rows, setRows] = useState(initial);
  const setStatus = (i, status) => setRows(r => r.map((row, idx) => idx === i ? [...row.slice(0,10), status] : row));
  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader eyebrow={`Case ${caseId}`} title="Evidence review" description="AI-extracted fields are suggestions. Verify each item against the original evidence." />
      <div className="mb-5 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-amber-200">Sensitive information is masked by default. Potential inconsistencies are presented for review, not as conclusions.</div>
      <div className="overflow-x-auto rounded-xl border border-line bg-panel">
        <table className="min-w-[1250px] w-full text-left text-sm">
          <thead className="border-b border-line bg-black/10 text-xs uppercase tracking-wide text-slate-500">
            <tr>{headers.map(h => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}<th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-white/[.015]">
                {row.map((v,j) => <td key={j} className="px-4 py-4 text-slate-300">{j === 9 ? <span className="text-cyan-300">{v}</span> : j === 10 ? <StatusBadge status={v}/> : v}</td>)}
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => setStatus(i,"Verified")} className="rounded-md border border-emerald-400/20 px-2.5 py-1.5 text-xs text-emerald-300 hover:bg-emerald-400/10">Verify</button>
                    <button onClick={() => setStatus(i,"Needs Review")} className="rounded-md border border-amber-400/20 px-2.5 py-1.5 text-xs text-amber-300 hover:bg-amber-400/10">Needs Review</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-5">
        <div className="text-sm font-medium text-amber-200">Potential inconsistency detected</div>
        <div className="mt-1 text-xs leading-5 text-slate-400">A source contains a timestamp that differs from another extracted record. Compare the original evidence before verifying.</div>
      </div>
    </div>
  );
}