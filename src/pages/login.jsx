import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  return (
    <AuthShell title="Sign in to CaseSync AI" subtitle="Organize evidence. Verify facts. Export a structured record.">
      <form onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); }} className="space-y-4">
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Field label="Password" type="password" placeholder="••••••••" />
        <button className="mt-2 w-full rounded-lg bg-cyan-400 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Sign in</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        New here? <Link to="/signup" className="text-cyan-300 hover:text-cyan-200">Create an account</Link>
      </p>
    </AuthShell>
  );
}

function Field({ label, ...props }) {
  return <label className="block"><span className="mb-2 block text-sm text-slate-300">{label}</span><input {...props} className="w-full rounded-lg border border-line bg-black/20 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50" /></label>;
}

function AuthShell({ children, title, subtitle }) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10"><ShieldCheck className="text-cyan-300" /></div>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-6 shadow-glow">{children}</div>
        <p className="mt-5 text-center text-xs text-slate-600">AI assists with organization only. Human verification is required.</p>
      </div>
    </div>
  );
}