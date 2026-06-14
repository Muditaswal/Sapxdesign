import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, Users, FolderKanban, CalendarRange, 
  Mail, FileText, CreditCard, Newspaper, Settings, 
  LogOut, Menu, X, ShieldAlert, Sparkles 
} from "lucide-react";
import { supabase } from "../../services/supabase";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: ShieldAlert },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Meetings", href: "/admin/meetings", icon: CalendarRange },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Blog CMS", href: "/admin/blog", icon: Newspaper },
  { label: "Services", href: "/admin/services", icon: Sparkles },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isPlaceholder = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes("placeholder");
    if (isPlaceholder) {
      setUserEmail("admin@sapstudio.design");
      return;
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || "");
      }
    });
  }, []);

  const handleSignOut = async () => {
    localStorage.removeItem("sb-mock-session");
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0B] text-white">
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[#141416] border-r border-white/5 flex-shrink-0 h-screen sticky top-0">
        {/* Brand Logo Header */}
        <div className="h-[80px] px-8 flex items-center border-b border-white/5">
          <Link to="/" className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-[#FFFF00] flex items-center justify-center text-[#0A0A0B] font-black text-sm">S</span>
            <span className="font-extrabold text-sm uppercase tracking-[0.2em] font-serif" style={{ fontFamily: "'Syne', sans-serif" }}>SAP × CRM</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow py-8 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  active 
                    ? "bg-[#FFFF00] text-[#0A0A0B] font-bold shadow-lg shadow-[#FFFF00]/10" 
                    : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-[#0A0A0B]" : "text-white/40"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-[#EC0606] flex items-center justify-center font-bold text-xs uppercase text-white">
              {userEmail.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-grow">
              <p className="text-xs font-bold truncate">{userEmail.split("@")[0]}</p>
              <p className="text-[10px] text-white/30 truncate">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer border border-red-500/10"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MOBILE NAVBAR HEADER ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[64px] bg-[#141416] border-b border-white/5 flex items-center justify-between px-6 z-40">
        <Link to="/" className="flex items-center gap-3">
          <span className="w-6 h-6 rounded bg-[#FFFF00] flex items-center justify-center text-[#0A0A0B] font-black text-xs">S</span>
          <span className="font-extrabold text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "'Syne', sans-serif" }}>SAP × CRM</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-[#0A0A0B]/90 backdrop-blur-md pt-20 px-6 flex flex-col justify-between pb-8">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold ${
                    active 
                      ? "bg-[#FFFF00] text-[#0A0A0B] font-bold" 
                      : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-[#0A0A0B]" : "text-white/40"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="space-y-4 border-t border-white/5 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EC0606] flex items-center justify-center font-bold text-xs uppercase text-white">
                {userEmail.slice(0, 2)}
              </div>
              <p className="text-xs font-bold truncate">{userEmail}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT WORKSPACE ── */}
      <div className="flex-grow flex flex-col min-w-0 pt-[64px] lg:pt-0">
        <main className="flex-grow p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
