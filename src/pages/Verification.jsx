import { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import StatusBadge from "../components/ui/StatusBadge";

const initial = [
  { event: "Message received", source: "Chat export", status: "Needs Review" },
  { event: "URL identified", source: "Screenshot", status: "Pending" },
  { event: "Transaction recorded", source: "CSV", status: "Needs Review" },
];

export default function Verification() {
  const { caseId } = useParams();
  const [items,setItems] = useState(initial);
  const update = (i,status) => setItems(items.map((x,idx)=>idx===i?{...x,status}:x));
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow={`Case ${caseId}`} title="Human verification" description="Review AI-assisted extraction and record the human verification decision." />
      <div className="space-y-3">
        {items.map((item,i)=>(
          <div key={item.event} className="rounded-xl border border-line bg-panel p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div><div className="font-medium text-white">{item.event}</div><div className="mt-1 text-xs text-slate-500">Source: {item.source}</div></div>
              <div className="flex items-center gap-3"><StatusBadge status={item.status}/><button onClick={()=>update(i,"Verified")} className="rounded-md bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300">Verify</button><button onClick={()=>update(i,"Needs Review")} className="rounded-md bg-amber-400/10 px-3 py-2 text-xs text-amber-300">Needs Review</button></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-line bg-panel p-5 text-sm text-slate-400">Verification records who reviewed an extracted item. They do not establish guilt, fraud, or criminal responsibility.</div>
    </div>
  );
}