import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, CheckCircle2, UserCheck } from "lucide-react";
import { api } from "../../services/api";
import { Lead } from "../../types/crm";

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Lead["status"]>("new");

  const fetchLeads = () => {
    setLoading(true);
    let path = "/admin/leads";
    const params: string[] = [];
    if (search) params.push(`search=${search}`);
    if (filterStatus) params.push(`status=${filterStatus}`);
    if (params.length) path += `?${params.join("&")}`;

    api.get<Lead[]>(path)
      .then((data) => {
        setLeads(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leads:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeads();
  }, [filterStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    api.post<Lead>("/admin/leads", { name, email, phone, service, budget, message, status: "new" })
      .then(() => {
        setIsCreateOpen(false);
        resetForm();
        fetchLeads();
      })
      .catch((err) => console.error("Error creating lead:", err));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    api.put<Lead>(`/admin/leads/${selectedLead.id}`, { name, email, phone, service, budget, message, status })
      .then(() => {
        setIsEditOpen(false);
        resetForm();
        fetchLeads();
      })
      .catch((err) => console.error("Error editing lead:", err));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    api.delete(`/admin/leads/${id}`)
      .then(() => fetchLeads())
      .catch((err) => console.error("Error deleting lead:", err));
  };

  const handleConvert = (lead: Lead) => {
    if (!confirm(`Convert ${lead.name} to a Client? This will create a Client record and a related Project.`)) return;
    api.post(`/admin/leads/${lead.id}/convert`, {})
      .then(() => {
        alert("Lead converted successfully! Check the Clients and Projects dashboards.");
        fetchLeads();
      })
      .catch((err) => console.error("Error converting lead:", err));
  };

  const openEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone || "");
    setService(lead.service || "");
    setBudget(lead.budget || "");
    setMessage(lead.message || "");
    setStatus(lead.status);
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setService("");
    setBudget("");
    setMessage("");
    setStatus("new");
    setSelectedLead(null);
  };

  const getStatusBadge = (s: Lead["status"]) => {
    const base = "px-2.5 py-1 text-[10px] uppercase font-bold rounded-full ";
    switch (s) {
      case "new": return base + "bg-blue-500/15 text-blue-400 border border-blue-500/20";
      case "contacted": return base + "bg-purple-500/15 text-purple-400 border border-purple-500/20";
      case "meeting_scheduled": return base + "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20";
      case "proposal_sent": return base + "bg-orange-500/15 text-orange-400 border border-orange-500/20";
      case "won": return base + "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20";
      case "lost": return base + "bg-red-500/15 text-red-400 border border-red-500/20";
      default: return base + "bg-white/10 text-white/50";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Leads Management</h1>
          <p className="text-white/40 text-sm mt-1">Acquire and convert incoming project leads and inquiries.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsCreateOpen(true); }}
          className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Create Lead
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#141416] p-4 rounded-2xl border border-white/5">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search leads name, email, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-12 pr-4 py-2 text-xs focus:border-[#FFFF00] focus:outline-none text-white"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-[#141416] border border-white/10 text-white rounded-xl text-xs hover:bg-white/5 transition-colors cursor-pointer">
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-white/30" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FFFF00]"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="meeting_scheduled">Meeting Scheduled</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="won">Won (Won)</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#141416] rounded-3xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex py-20 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-white/40">No leads match the filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/5 text-white/40 uppercase tracking-widest text-[10px] font-black bg-[#141416]">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Service</th>
                  <th className="py-4 px-6">Budget</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Inquiry Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-white">{lead.name}</p>
                        <p className="text-xs text-white/30 mt-0.5">{lead.email} &bull; {lead.phone || "No Phone"}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/70">{lead.service || "General"}</td>
                    <td className="py-4 px-6 font-medium text-[#FFFF00]">{lead.budget || "N/A"}</td>
                    <td className="py-4 px-6">
                      <span className={getStatusBadge(lead.status)}>{lead.status.replace("_", " ")}</span>
                    </td>
                    <td className="py-4 px-6 text-white/40 text-xs">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex gap-2 justify-end">
                        {lead.status !== "won" && (
                          <button
                            onClick={() => handleConvert(lead)}
                            title="Convert to Client"
                            className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors cursor-pointer border border-emerald-500/10"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => openEdit(lead)}
                          className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors cursor-pointer border border-blue-500/10"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer border border-red-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-lg p-8 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Create New Lead</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Full Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Service Type</label>
                  <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="e.g. Architecture, Interior" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Budget Estimation</label>
                <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. $100K - $250K" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Inquiry Message</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
              </div>
              <div className="flex gap-3 pt-4 justify-end">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-lg p-8 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Modify Lead Details</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Full Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Phone</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Service Type</label>
                  <input type="text" value={service} onChange={(e) => setService(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Budget</label>
                  <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Pipeline Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as Lead["status"])} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="meeting_scheduled">Meeting Scheduled</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="won">Won (Converted)</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Inquiry Message</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
              </div>
              <div className="flex gap-3 pt-4 justify-end">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
