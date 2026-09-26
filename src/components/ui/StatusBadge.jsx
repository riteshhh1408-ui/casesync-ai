const styles = {
  Verified: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  "Needs Review": "border-amber-400/20 bg-amber-400/10 text-amber-300",
  Pending: "border-slate-400/20 bg-slate-400/10 text-slate-300",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
}