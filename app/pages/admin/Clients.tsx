import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Calendar, Folder, MessageSquare, Clipboard, Send } from "lucide-react";
import { api } from "../../services/api";
import { Client, ClientNote, Meeting, Project } from "../../types/crm";

interface DetailedClient extends Omit<Client, 'notes'> {
  notes: ClientNote[];
  meetings: Meeting[];
  projects: Project[];
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<DetailedClient | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Modal / Form states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  
  // Note adding state
  const [newNote, setNewNote] = useState("");

  const fetchClients = () => {
    setLoading(true);
    api.get<Client[]>("/admin/clients")
      .then((data) => {
        setClients(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load clients:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const loadClientDetails = (id: string) => {
    setDetailsLoading(true);
    api.get<DetailedClient>(`/admin/clients/${id}`)
      .then((data) => {
        setSelectedClient(data);
        setDetailsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading client details:", err);
        setDetailsLoading(false);
      });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    api.post<Client>("/admin/clients", { name, email, phone, company, address, notes })
      .then(() => {
        setIsCreateOpen(false);
        resetForm();
        fetchClients();
      })
      .catch((err) => console.error("Error creating client:", err));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;
    api.put<Client>(`/admin/clients/${editingClient.id}`, { name, email, phone, company, address, notes })
      .then((updated) => {
        setIsEditOpen(false);
        resetForm();
        fetchClients();
        if (selectedClient?.id === updated.id) {
          loadClientDetails(updated.id);
        }
      })
      .catch((err) => console.error("Error updating client:", err));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    api.delete(`/admin/clients/${id}`)
      .then(() => {
        if (selectedClient?.id === id) setSelectedClient(null);
        fetchClients();
      })
      .catch((err) => console.error("Error deleting client:", err));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !newNote.trim()) return;

    api.post<ClientNote>(`/admin/clients/${selectedClient.id}/notes`, { content: newNote.trim() })
      .then(() => {
        setNewNote("");
        loadClientDetails(selectedClient.id);
      })
      .catch((err) => console.error("Error adding client note:", err));
  };

  const openEdit = (client: Client) => {
    setEditingClient(client);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone || "");
    setCompany(client.company || "");
    setAddress(client.address || "");
    setNotes(client.notes || "");
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setAddress("");
    setNotes("");
    setEditingClient(null);
  };

  // Compile meetings, projects, notes into a single chronological timeline
  const getTimelineItems = () => {
    if (!selectedClient) return [];
    
    const items: { date: Date; type: "note" | "project" | "meeting"; title: string; desc: string }[] = [];

    selectedClient.notes.forEach(note => {
      items.push({
        date: new Date(note.created_at),
        type: "note",
        title: "Client Note Added",
        desc: note.content
      });
    });

    selectedClient.projects.forEach(proj => {
      items.push({
        date: new Date(proj.created_at),
        type: "project",
        title: "Project Initialized",
        desc: `${proj.name} (${proj.project_type}) - Status: ${proj.status}`
      });
    });

    selectedClient.meetings.forEach(meet => {
      items.push({
        date: new Date(meet.meeting_date),
        type: "meeting",
        title: "Consultation Scheduled",
        desc: meet.notes || "No notes available"
      });
    });

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* ── CLIENTS DIRECTORY COLUMN ── */}
      <div className={`${selectedClient ? "lg:col-span-6" : "lg:col-span-12"} space-y-8`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Client Directory</h1>
            <p className="text-white/40 text-sm mt-1">Manage active partnerships, timeline logs, and notes.</p>
          </div>
          <button
            onClick={() => { resetForm(); setIsCreateOpen(true); }}
            className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Client
          </button>
        </div>

        <div className="bg-[#141416] rounded-3xl border border-white/5 overflow-hidden">
          {loading ? (
            <div className="flex py-20 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-20 text-white/40">No clients registered. Convert a lead to client or add one.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-white/40 uppercase tracking-widest text-[10px] font-black bg-[#141416]">
                    <th className="py-4 px-6">Client Name</th>
                    <th className="py-4 px-6">Company</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {clients.map((client) => (
                    <tr 
                      key={client.id} 
                      onClick={() => loadClientDetails(client.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedClient?.id === client.id ? "bg-[#FFFF00]/5 hover:bg-[#FFFF00]/10" : "hover:bg-white/[0.01]"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-white">{client.name}</p>
                          <p className="text-xs text-white/30 mt-0.5">{client.email} &bull; {client.phone || "No Phone"}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-white/70">{client.company || "Individual"}</td>
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openEdit(client)}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors cursor-pointer border border-blue-500/10"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(client.id)}
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
      </div>

      {/* ── CLIENT DETAILS & TIMELINE COLUMN ── */}
      {selectedClient && (
        <div className="lg:col-span-6 space-y-8 bg-[#141416] p-8 rounded-[30px] border border-white/5">
          {detailsLoading ? (
            <div className="flex py-20 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>{selectedClient.name}</h2>
                  <p className="text-[#FFFF00] text-xs font-bold uppercase tracking-wider mt-1">{selectedClient.company || "Individual Client"}</p>
                </div>
                <button 
                  onClick={() => setSelectedClient(null)} 
                  className="px-3 py-1 bg-[#0A0A0B] border border-white/10 hover:border-white/20 text-white/40 hover:text-white rounded-lg text-xs cursor-pointer"
                >
                  Close Detail
                </button>
              </div>

              {/* Contact specs */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-white/30 uppercase tracking-wider">Email Address</p>
                  <p className="font-semibold text-white/80 mt-0.5">{selectedClient.email}</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider">Phone</p>
                  <p className="font-semibold text-white/80 mt-0.5">{selectedClient.phone || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-white/30 uppercase tracking-wider">Office / Billing Address</p>
                  <p className="font-semibold text-white/80 mt-0.5">{selectedClient.address || "N/A"}</p>
                </div>
              </div>

              {/* Notes logger form */}
              <div className="border-t border-white/5 pt-6 space-y-3">
                <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Write Update / Note</p>
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type client update logs..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    required
                    className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#FFFF00] text-white"
                  />
                  <button type="submit" className="p-2.5 bg-[#FFFF00] text-[#0A0A0B] rounded-xl hover:bg-white transition-colors cursor-pointer flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Combined Timeline log */}
              <div className="border-t border-white/5 pt-8 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Syne', sans-serif" }}>Client Activity Timeline</h3>
                
                {getTimelineItems().length === 0 ? (
                  <p className="text-white/30 text-xs italic">No activity logs recorded. Add a note above.</p>
                ) : (
                  <div className="relative border-l-2 border-white/5 pl-6 space-y-6 ml-2">
                    {getTimelineItems().map((item, index) => {
                      const getIcon = () => {
                        switch (item.type) {
                          case "note": return <Clipboard className="w-3.5 h-3.5 text-blue-400" />;
                          case "project": return <Folder className="w-3.5 h-3.5 text-[#FFFF00]" />;
                          case "meeting": return <Calendar className="w-3.5 h-3.5 text-emerald-400" />;
                          default: return <MessageSquare className="w-3.5 h-3.5" />;
                        }
                      };
                      return (
                        <div key={index} className="relative">
                          {/* Circle pointer */}
                          <div className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-[#141416] border-2 border-white/5 flex items-center justify-center">
                            {getIcon()}
                          </div>
                          <div>
                            <p className="text-xs text-white/40 font-bold">{item.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                            <p className="text-sm font-bold text-white/80 mt-1">{item.title}</p>
                            <p className="text-xs text-white/50 mt-1 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-lg p-8 space-y-6 relative">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Register Client</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Client Name</label>
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
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Company / Org</label>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Lumina Co." className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Office Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Initial Notes</label>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
              </div>
              <div className="flex gap-3 pt-4 justify-end">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl">Save Client</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-lg p-8 space-y-6 relative">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Modify Client Info</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Client Name</label>
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
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Company</label>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Office Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
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
