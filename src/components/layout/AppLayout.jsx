import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FileCheck2, FileSpreadsheet, LayoutDashboard, LogOut,
  Plus, ShieldCheck, UploadCloud, Clock3, UserCheck
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/cases/demo/upload", label: "Evidence Upload", icon: UploadCloud },
  { to: "/cases/demo/review", label: "Evidence Review", icon: FileCheck2 },
  { to: "/cases/demo/timeline", label: "Timeline", icon: Clock3 },
  { to: "/cases/demo/verification", label: "Verification", icon: UserCheck },
  { to: "/cases/demo/report", label: "Report / CSV", icon: FileSpreadsheet },
];

export default function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-panel/95 lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-line px-6 py-5">
            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                <ShieldCheck className="text-cyan-300" size={22} />
              </div>
              <div className="text-left">
                <div className="font-semibold tracking-wide">CaseSync AI</div>
                <div className="text-xs text-slate-500">Evidence workspace</div>
              </div>
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                      : "text-slate-400 hover:bg-white/[.03] hover:text-slate-200"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-line p-4">
            <button
              onClick={() => navigate("/login")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/[.03] hover:text-white"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-ink/85 px-4 backdrop-blur-xl sm:px-8">
          <div>
            <div className="text-sm font-medium text-slate-300">Digital Evidence Workspace</div>
            <div className="text-xs text-slate-500">Human verification required before finalization</div>
          </div>
          <button
            onClick={() => navigate("/cases/new")}
            className="flex items-center gap-2 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            <Plus size={17} /> New Case
          </button>
        </header>
        <div className="grid-bg min-h-[calc(100vh-4rem)] p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}