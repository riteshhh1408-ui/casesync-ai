import { useParams } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";

const events = [
  ["10:30 AM", "Message received", "Chat export", "Verified"],
  ["10:35 AM", "URL identified", "Screenshot", "Needs Review"],
  ["10:45 AM", "Transaction recorded", "CSV", "Verified"],
  ["11:00 AM", "Additional payment request", "Message export", "Needs Review"],
];

export default function Timeline() {
  const { caseId } = useParams();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow={`Case ${caseId}`} title="Incident timeline" description="Chronological view of events extracted from the evidence set." />
      <div className="relative ml-3 border-l border-cyan-400/20 pl-8">
        {events.map(([time,event,source,status]) => (
          <div key={time} className="relative mb-8">
            <div className="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2 border-cyan-300 bg-ink"/>
            <div className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-cyan-300">{time}</span>
                <span className="text-xs text-slate-500">{status}</span>
              </div>
              <div className="mt-2 font-medium text-white">{event}</div>
              <div className="mt-1 text-xs text-slate-500">Source: {source}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}