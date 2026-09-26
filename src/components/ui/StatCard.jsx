export default function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <div className="rounded-xl border border-line bg-panel/90 p-5 shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
        {Icon && <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-300"><Icon size={19} /></div>}
      </div>
    </div>
  );
}