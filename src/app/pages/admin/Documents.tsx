import { useState, useEffect } from "react";
import { Plus, FileText, Trash2, Download, ExternalLink, Link as LinkIcon, Search } from "lucide-react";
import { api } from "../../services/api";
import { DocumentFile, Project } from "../../types/crm";

export default function Documents() {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Upload Form states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = () => {
    setLoading(true);
    api.get<DocumentFile[]>("/admin/documents")
      .then((data) => {
        setDocuments(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load documents:", err);
        setLoading(false);
      });
  };

  const fetchProjects = () => {
    api.get<Project[]>("/admin/projects").then(setProjects).catch(console.error);
  };

  useEffect(() => {
    fetchDocuments();
    fetchProjects();
  }, []);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !projectId || !name.trim()) return;
    setUploading(true);

    api.uploadFile<DocumentFile>("/admin/documents", file, {
      project_id: projectId,
      name: name.trim()
    })
      .then(() => {
        setUploading(false);
        setIsUploadOpen(false);
        setName("");
        setProjectId("");
        setFile(null);
        fetchDocuments();
      })
      .catch((err) => {
        console.error("Upload error:", err);
        setUploading(false);
      });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this document? This will remove the file from storage.")) return;
    api.delete(`/admin/documents/${id}`)
      .then(() => fetchDocuments())
      .catch((err) => console.error("Error deleting document:", err));
  };

  const filteredDocs = documents.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.project?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Document Center</h1>
          <p className="text-white/40 text-sm mt-1">Upload blueprint PDFs, technical drawings, contracts, and briefs.</p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Upload File
        </button>
      </div>

      {/* Search Filter bar */}
      <div className="bg-[#141416] p-4 rounded-2xl border border-white/5 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search documents by name or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-12 pr-4 py-2 text-xs focus:border-[#FFFF00] focus:outline-none text-white"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex py-20 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="text-center py-20 bg-[#141416]/40 rounded-[30px] border border-white/5 text-white/40 italic">
          No documents found matching filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="bg-[#141416] p-6 rounded-[24px] border border-white/5 flex flex-col justify-between space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <FileText className="w-5 h-5 text-white/40" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-white text-sm truncate">{doc.name}</h4>
                  <p className="text-[10px] text-[#FFFF00] flex items-center gap-1.5 mt-1">
                    <LinkIcon className="w-3 h-3" /> Project: {doc.project?.name || "N/A"}
                  </p>
                  <p className="text-[9px] text-white/30 mt-1 uppercase font-semibold">
                    Added: {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#0A0A0B] border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Preview / Save
                </a>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 hover:border-red-500/20 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD FILE MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-md p-8 space-y-6 relative">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Upload Document</h3>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Document Name / Label</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Living Room Blueprint 1" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Select Project</label>
                <select required value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                  <option value="">Choose Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Choose File</label>
                <input type="file" required onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white/50" />
              </div>
              <div className="flex gap-3 pt-4 justify-end">
                <button type="button" onClick={() => setIsUploadOpen(false)} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5">Cancel</button>
                <button type="submit" disabled={uploading} className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl flex items-center gap-1.5">
                  {uploading ? "Uploading..." : "Start Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
