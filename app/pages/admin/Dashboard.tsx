import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, Briefcase, Calendar, ShieldAlert, 
  TrendingUp, CreditCard, ChevronRight 
} from "lucide-react";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  Tooltip, PieChart, Pie, Cell 
} from "recharts";
import { api } from "../../services/api";

interface DashboardStats {
  totalLeads: number;
  totalClients: number;
  activeProjects: number;
  meetingsThisWeek: number;
  revenue: number;
  pendingPayments: number;
  leadFunnel: Record<string, number>;
  projectStatusBreakdown: Record<string, number>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<DashboardStats>("/admin/dashboard-stats")
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard metrics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
      </div>
    );
  }

  // Formatting chart data for Lead Funnel
  const funnelData = stats ? Object.entries(stats.leadFunnel).map(([key, val]) => ({
    name: key.toUpperCase().replace("_", " "),
    value: val
  })) : [];

  // Formatting chart data for Project Statuses
  const projectStatusData = stats ? Object.entries(stats.projectStatusBreakdown).map(([key, val]) => ({
    name: key,
    value: val
  })) : [];

  const COLORS = ["#FFFF00", "#EC0606", "#6366F1", "#10B981", "#3B82F6", "#F59E0B"];

  return (
    <div className="space-y-10">
      {/* Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>CRM Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Real-time studio health indicators, leads pipeline, and revenues.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/leads" className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors">
            Manage Leads
          </Link>
          <Link to="/admin/projects" className="px-5 py-2.5 bg-[#141416] border border-white/10 text-white uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white/5 transition-colors">
            Create Project
          </Link>
        </div>
      </div>

      {/* Metrics Widgets Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-[#141416] p-6 rounded-[24px] border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Total Revenue</p>
            <div className="w-8 h-8 rounded-lg bg-[#FFFF00]/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#FFFF00]" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif" }}>
              ${stats?.revenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || "0"}
            </h3>
            <p className="text-[10px] text-emerald-400 mt-1">&bull; Gross payments collected</p>
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-[#141416] p-6 rounded-[24px] border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Active Projects</p>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-[#EC0606]" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif" }}>
              {stats?.activeProjects || 0}
            </h3>
            <p className="text-[10px] text-white/30 mt-1">Across all design disciplines</p>
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="bg-[#141416] p-6 rounded-[24px] border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Total Inquiries</p>
            <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-[#6366F1]" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif" }}>
              {stats?.totalLeads || 0}
            </h3>
            <p className="text-[10px] text-white/30 mt-1">Leads inside sales pipeline</p>
          </div>
        </div>

        {/* Meetings Scheduled */}
        <div className="bg-[#141416] p-6 rounded-[24px] border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Consultations</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif" }}>
              {stats?.meetingsThisWeek || 0}
            </h3>
            <p className="text-[10px] text-white/30 mt-1">Scheduled client meetings</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lead Funnel Pipeline Chart (Bar) */}
        <div className="lg:col-span-7 bg-[#141416] p-6 rounded-[30px] border border-white/5">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Lead Funnel Pipeline</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#141416", borderColor: "rgba(255,255,255,0.1)", borderRadius: "10px" }}
                  labelStyle={{ fontWeight: "bold", color: "#fff" }}
                />
                <Bar dataKey="value" fill="#FFFF00" radius={[4, 4, 0, 0]}>
                  {funnelData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Breakdown Chart (Pie) */}
        <div className="lg:col-span-5 bg-[#141416] p-6 rounded-[30px] border border-white/5 flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Project Statuses</h3>
          <div className="h-[220px] w-full flex-grow relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#141416", borderColor: "rgba(255,255,255,0.1)", borderRadius: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Legends */}
          <div className="grid grid-cols-3 gap-2 text-xs pt-4 border-t border-white/5">
            {projectStatusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="truncate text-white/50">{entry.name}: <span className="font-bold text-white">{entry.value}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access List */}
      <div className="bg-[#141416] rounded-[30px] border border-white/5 p-8">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>CRM Operations Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/leads" className="flex items-center justify-between p-5 bg-[#0A0A0B] rounded-2xl border border-white/5 hover:border-[#FFFF00] transition-colors group">
            <div>
              <p className="font-bold text-sm">Leads Pipeline</p>
              <p className="text-[10px] text-white/30 mt-1">Review new and contacted inquiries</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#FFFF00] transition-colors" />
          </Link>
          <Link to="/admin/clients" className="flex items-center justify-between p-5 bg-[#0A0A0B] rounded-2xl border border-white/5 hover:border-[#FFFF00] transition-colors group">
            <div>
              <p className="font-bold text-sm">Client Directory</p>
              <p className="text-[10px] text-white/30 mt-1">Manage current clients and notes</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#FFFF00] transition-colors" />
          </Link>
          <Link to="/admin/projects" className="flex items-center justify-between p-5 bg-[#0A0A0B] rounded-2xl border border-white/5 hover:border-[#FFFF00] transition-colors group">
            <div>
              <p className="font-bold text-sm">Studio Projects</p>
              <p className="text-[10px] text-white/30 mt-1">Update lifecycles and upload galleries</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#FFFF00] transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
