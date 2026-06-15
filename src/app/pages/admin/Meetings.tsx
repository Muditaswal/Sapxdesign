import { useState, useEffect } from "react";
import { Plus, Calendar, Clock, Clipboard, ArrowRight, User, Trash2 } from "lucide-react";
import { api } from "../../services/api";
import { Meeting, Client, Project } from "../../types/crm";

export default function Meetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Form / Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [notes, setNotes] = useState("");
  const [nextAction, setNextAction] = useState("");

  const fetchMeetings = () => {
    setLoading(true);
    api.get<Meeting[]>("/admin/meetings")
      .then((data) => {
        setMeetings(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load meetings:", err);
        setLoading(false);
      });
  };

  const fetchFormOptions = () => {
    api.get<Client[]>("/admin/clients").then(setClients).catch(console.error);
    api.get<Project[]>("/admin/projects").then(setProjects).catch(console.error);
  };

  useEffect(() => {
    fetchMeetings();
    fetchFormOptions();
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    api.post<Meeting>("/admin/meetings", {
      client_id: clientId || undefined,
      project_id: projectId || undefined,
      meeting_date: new Date(meetingDate).toISOString(),
      notes,
      next_action: nextAction
    })
      .then(() => {
        setIsCreateOpen(false);
        resetForm();
        fetchMeetings();
      })
      .catch((err) => console.error("Error creating meeting:", err));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to cancel / delete this meeting?")) return;
    api.delete(`/admin/meetings/${id}`)
      .then(() => fetchMeetings())
      .catch((err) => console.error("Error deleting meeting:", err));
  };

  const resetForm = () => {
    setClientId("");
    setProjectId("");
    setMeetingDate("");
    setNotes("");
    setNextAction("");
  };

  const now = new Date();
  const upcomingMeetings = meetings.filter(m => new Date(m.meeting_date) >= now);
  const pastMeetings = meetings.filter(m => new Date(m.meeting_date) < now);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Meetings Scheduler</h1>
          <p className="text-white/40 text-sm mt-1">Schedule consultations, review reviews, and log next actions.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsCreateOpen(true); }}
          className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upcoming Consultations */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#FFFF00] flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            <Clock className="w-4 h-4" /> Upcoming Consultations ({upcomingMeetings.length})
          </h2>

          {loading ? (
            <div className="flex h-32 items-center justify-center bg-[#141416] rounded-3xl border border-white/5">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
            </div>
          ) : upcomingMeetings.length === 0 ? (
            <div className="p-8 text-center text-white/30 text-xs bg-[#141416]/40 rounded-3xl border border-white/5 italic">No upcoming consultations scheduled.</div>
          ) : (
            <div className="space-y-4">
              {upcomingMeetings.map((meet) => (
                <div key={meet.id} className="bg-[#141416] p-6 rounded-[24px] border border-white/5 relative overflow-hidden space-y-4">
                  {/* Left accent line */}
                  <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#FFFF00]" />
                  
                  <div className="flex justify-between items-start pl-2">
                    <div className="space-y-1">
                      <p className="text-xs text-white/30 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FFFF00]" />
                        {new Date(meet.meeting_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2 mt-1">
                        <User className="w-4 h-4 text-white/30" />
                        {meet.client?.name || "Unassociated Client"}
                      </h4>
                      {meet.project && (
                        <p className="text-[10px] text-white/40">Project: <span className="text-white/60 font-semibold">{meet.project.name}</span></p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleDelete(meet.id)}
                      className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/15 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {meet.notes && (
                    <div className="bg-[#0A0A0B]/40 p-4 rounded-xl border border-white/5 pl-4 text-xs text-white/60">
                      <p className="font-bold text-white/40 mb-1 flex items-center gap-1.5"><Clipboard className="w-3.5 h-3.5" /> Agenda / Notes</p>
                      <p className="leading-relaxed whitespace-pre-line">{meet.notes}</p>
                    </div>
                  )}

                  {meet.next_action && (
                    <div className="flex items-center gap-2 text-xs text-[#FFFF00] pl-2 font-bold uppercase tracking-wider">
                      <ArrowRight className="w-3.5 h-3.5" /> Next Action: {meet.next_action}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Meeting History (Past Meetings) */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            <Clipboard className="w-4 h-4" /> Consultation Archive ({pastMeetings.length})
          </h2>

          {loading ? (
            <div className="flex h-32 items-center justify-center bg-[#141416] rounded-3xl border border-white/5">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
            </div>
          ) : pastMeetings.length === 0 ? (
            <div className="p-8 text-center text-white/30 text-xs bg-[#141416]/40 rounded-3xl border border-white/5 italic">No previous consultation logs.</div>
          ) : (
            <div className="space-y-4">
              {pastMeetings.map((meet) => (
                <div key={meet.id} className="bg-[#141416]/60 p-5 rounded-[24px] border border-white/5 space-y-3 opacity-70 hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                        {new Date(meet.meeting_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <h4 className="text-xs font-bold text-white/80 mt-1 flex items-center gap-1.5">
                        {meet.client?.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleDelete(meet.id)}
                      className="p-1 text-white/20 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {meet.notes && <p className="text-xs text-white/40 leading-relaxed italic">"{meet.notes}"</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SCHEDULE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-lg p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Schedule Consultation</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Select Client</label>
                  <select required value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                    <option value="">Choose Client</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Related Project</label>
                  <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                    <option value="">None / General</option>
                    {projects.filter(p => !clientId || p.client_id === clientId).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Meeting Date & Time</label>
                <input type="datetime-local" required value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Discussion Agenda / Notes</label>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Type items to discuss..." className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Next Action Item</label>
                <input type="text" value={nextAction} onChange={(e) => setNextAction(e.target.value)} placeholder="e.g. Prepare architectural proposal drafts" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>
              <div className="flex gap-3 pt-4 justify-end">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl">Save Meeting</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
