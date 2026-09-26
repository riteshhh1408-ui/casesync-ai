import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadCloud, FileText, Image, FileSpreadsheet } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";

export default function EvidenceUpload() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const addFiles = (list) => setFiles(Array.from(list));
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow={`Case ${caseId}`} title="Evidence upload" description="Upload source material. Extracted fields will remain subject to human verification." />
      <label className="block cursor-pointer rounded-2xl border border-dashed border-cyan-400/30 bg-panel/80 p-10 text-center hover:border-cyan-400/60">
        <input type="file" multiple accept=".png,.jpg,.jpeg,.webp,.pdf,.txt,.csv" className="hidden" onChange={e => addFiles(e.target.files)} />
        <UploadCloud className="mx-auto text-cyan-300" size={42}/>
        <div className="mt-4 font-medium text-white">Drop evidence here or browse files</div>
        <div className="mt-2 text-sm text-slate-500">Images, PDF, TXT and CSV supported</div>
      </label>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {files.map(file => <div key={file.name} className="flex items-center gap-3 rounded-lg border border-line bg-panel p-4"><FileIcon name={file.name}/><div className="min-w-0"><div className="truncate text-sm text-slate-200">{file.name}</div><div className="text-xs text-slate-500">{Math.round(file.size/1024)} KB</div></div></div>)}
      </div>

      <div className="mt-7 flex justify-end gap-3">
        <button onClick={() => navigate(`/cases/${caseId}/review`)} className="rounded-lg border border-line px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[.03]">Skip to review</button>
        <button onClick={() => navigate(`/cases/${caseId}/review`)} className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950">Process evidence</button>
      </div>
    </div>
  );
}
function FileIcon({ name }) {
  const ext = name.split(".").pop()?.toLowerCase();
  const I = ["png","jpg","jpeg","webp"].includes(ext) ? Image : ext === "csv" ? FileSpreadsheet : FileText;
  return <I size={20} className="text-cyan-300"/>;
}