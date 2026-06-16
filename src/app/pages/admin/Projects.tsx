import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Calendar, FileText, Image as ImageIcon, Clipboard, Send, ExternalLink, Globe } from "lucide-react";
import { api } from "../../services/api";
import { Project, ProjectNote, ProjectImage, DocumentFile, Payment, Client } from "../../types/crm";

interface DetailedProject extends Project {
  notes: ProjectNote[];
  images: ProjectImage[];
  documents: DocumentFile[];
  payments: Payment[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<DetailedProject | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Modals / Form States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [projectType, setProjectType] = useState<Project["project_type"]>("Space Design");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);

  // New Detailed Fields
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<Project["status"]>("Inquiry");
  const [heroVideo, setHeroVideo] = useState("");
  const [heroCaption, setHeroCaption] = useState("");

  const [overviewTitle, setOverviewTitle] = useState("Overview");
  const [overviewContent, setOverviewContent] = useState("");
  const [processTitle, setProcessTitle] = useState("Process");
  const [processContent, setProcessContent] = useState("");
  const [outcomeTitle, setOutcomeTitle] = useState("Outcome");
  const [outcomeContent, setOutcomeContent] = useState("");

  const [studioRoles, setStudioRoles] = useState<string[]>([]);
  const [newRole, setNewRole] = useState("");
  const [coreDeliverables, setCoreDeliverables] = useState<string[]>([]);
  const [newDeliverable, setNewDeliverable] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaOgImage, setMetaOgImage] = useState("");

  const [activeTab, setActiveTab] = useState<'basic' | 'hero' | 'content' | 'roles' | 'seo'>('basic');
  const [createActiveTab, setCreateActiveTab] = useState<'basic' | 'hero' | 'content' | 'roles' | 'seo'>('basic');

  // Operations fields
  const [newNote, setNewNote] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageType, setImageType] = useState<"hero" | "gallery" | "process">("gallery");
  const [imageCaption, setImageCaption] = useState("");
  
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docName, setDocName] = useState("");
  const [draggedImgId, setDraggedImgId] = useState<string | null>(null);

  const [createHeroImages, setCreateHeroImages] = useState<{ id: string, file: File, previewUrl: string }[]>([]);
  const [editHeroImages, setEditHeroImages] = useState<{ id: string, file?: File, previewUrl: string, isNew: boolean }[]>([]);
  const [deletedHeroIds, setDeletedHeroIds] = useState<string[]>([]);
  const [draggedHeroId, setDraggedHeroId] = useState<string | null>(null);

  const handleCreateHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImgs = files.map(file => ({
        id: `new-${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file)
      }));
      setCreateHeroImages(prev => [...prev, ...newImgs]);
    }
  };

  const handleEditHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImgs = files.map(file => ({
        id: `new-${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        isNew: true
      }));
      setEditHeroImages(prev => [...prev, ...newImgs]);
    }
  };

  const handleCreateHeroDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedHeroId(id);
  };

  const handleCreateHeroDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) return;

    const copy = [...createHeroImages];
    const sourceIdx = copy.findIndex(x => x.id === sourceId);
    const targetIdx = copy.findIndex(x => x.id === targetId);
    if (sourceIdx === -1 || targetIdx === -1) return;

    const [moved] = copy.splice(sourceIdx, 1);
    copy.splice(targetIdx, 0, moved);
    setCreateHeroImages(copy);
    setDraggedHeroId(null);
  };

  const handleEditHeroDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedHeroId(id);
  };

  const handleEditHeroDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) return;

    const copy = [...editHeroImages];
    const sourceIdx = copy.findIndex(x => x.id === sourceId);
    const targetIdx = copy.findIndex(x => x.id === targetId);
    if (sourceIdx === -1 || targetIdx === -1) return;

    const [moved] = copy.splice(sourceIdx, 1);
    copy.splice(targetIdx, 0, moved);
    setEditHeroImages(copy);
    setDraggedHeroId(null);
  };

  const handleCreateHeroDelete = (id: string) => {
    setCreateHeroImages(prev => prev.filter(x => x.id !== id));
  };

  const handleEditHeroDelete = (id: string) => {
    const img = editHeroImages.find(x => x.id === id);
    if (img && !img.isNew) {
      setDeletedHeroIds(prev => [...prev, id]);
    }
    setEditHeroImages(prev => prev.filter(x => x.id !== id));
  };

  const fetchProjects = () => {
    setLoading(true);
    api.get<Project[]>("/admin/projects")
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  };

  const fetchClients = () => {
    api.get<Client[]>("/admin/clients")
      .then((data) => setClients(data || []))
      .catch((err) => console.error("Failed to load clients list:", err));
  };

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const loadProjectDetails = (id: string) => {
    setDetailsLoading(true);
    api.get<any>(`/admin/projects/${id}`)
      .then((data) => {
        setSelectedProject(data.project);
        setDetailsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading project details:", err);
        setDetailsLoading(false);
      });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (clientId) formData.append("client_id", clientId);
    formData.append("project_type", projectType);
    formData.append("description", description);
    formData.append("budget", budget);
    if (startDate) formData.append("start_date", startDate);
    if (endDate) formData.append("end_date", endDate);
    formData.append("published", String(published));
    formData.append("featured", String(featured));

    // Append new creation fields
    formData.append("slug", slug || `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`);
    formData.append("category", category || projectType);
    formData.append("year", String(year || new Date().getFullYear()));
    formData.append("location", location);
    formData.append("status", status);
    formData.append("hero_video", heroVideo);
    formData.append("hero_caption", heroCaption);
    formData.append("meta_title", metaTitle);
    formData.append("meta_description", metaDescription);
    formData.append("meta_keywords", metaKeywords);
    formData.append("meta_og_image", metaOgImage);
    formData.append("studio_roles", JSON.stringify(studioRoles));
    formData.append("core_deliverables", JSON.stringify(coreDeliverables));

    formData.append("overview_title", overviewTitle);
    formData.append("overview_content", overviewContent);
    formData.append("process_title", processTitle);
    formData.append("process_content", processContent);
    formData.append("outcome_title", outcomeTitle);
    formData.append("outcome_content", outcomeContent);

    createHeroImages.forEach((img) => {
      formData.append("hero_images", img.file);
    });

    api.post<any>("/admin/projects", formData)
      .then(() => {
        setIsCreateOpen(false);
        resetForm();
        fetchProjects();
      })
      .catch((err) => console.error("Error creating project:", err));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("client_id", clientId || "null");
    formData.append("project_type", projectType);
    formData.append("description", description);
    formData.append("budget", budget);
    formData.append("start_date", startDate || "null");
    formData.append("end_date", endDate || "null");
    formData.append("published", String(published));
    formData.append("featured", String(featured));

    // Append new edit fields
    formData.append("slug", slug);
    formData.append("category", category || projectType);
    formData.append("year", String(year));
    formData.append("location", location);
    formData.append("status", status);
    formData.append("hero_video", heroVideo);
    formData.append("hero_caption", heroCaption);
    formData.append("meta_title", metaTitle);
    formData.append("meta_description", metaDescription);
    formData.append("meta_keywords", metaKeywords);
    formData.append("meta_og_image", metaOgImage);
    formData.append("studio_roles", JSON.stringify(studioRoles));
    formData.append("core_deliverables", JSON.stringify(coreDeliverables));

    formData.append("overview_title", overviewTitle);
    formData.append("overview_content", overviewContent);
    formData.append("process_title", processTitle);
    formData.append("process_content", processContent);
    formData.append("outcome_title", outcomeTitle);
    formData.append("outcome_content", outcomeContent);

    formData.append("deleted_image_ids", JSON.stringify(deletedHeroIds));

    let fileIdx = 0;
    const finalOrder = editHeroImages.map((img) => {
      if (img.isNew) {
        const placeholder = `new-${fileIdx}`;
        fileIdx++;
        return placeholder;
      }
      return img.id;
    });
    formData.append("final_order", JSON.stringify(finalOrder));

    editHeroImages.forEach((img) => {
      if (img.isNew && img.file) {
        formData.append("hero_images", img.file);
      }
    });

    api.put<any>(`/admin/projects/${editingProject.id}`, formData)
      .then((updated) => {
        setIsEditOpen(false);
        resetForm();
        fetchProjects();
        const updatedProjId = updated.project?.id || updated.id;
        if (selectedProject?.id === updatedProjId) {
          loadProjectDetails(updatedProjId);
        }
      })
      .catch((err) => console.error("Error updating project:", err));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    api.delete(`/admin/projects/${id}`)
      .then(() => {
        if (selectedProject?.id === id) setSelectedProject(null);
        fetchProjects();
      })
      .catch((err) => console.error("Error deleting project:", err));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !newNote.trim()) return;

    api.post<ProjectNote>(`/admin/projects/${selectedProject.id}/notes`, { content: newNote.trim() })
      .then(() => {
        setNewNote("");
        loadProjectDetails(selectedProject.id);
      })
      .catch((err) => console.error("Error adding project note:", err));
  };

  const handleUploadImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !imageFile) return;

    api.uploadFile<any>(`/projects/${selectedProject.id}/images`, imageFile, {
      image_type: imageType,
      caption: imageCaption
    })
      .then(() => {
        setImageFile(null);
        setImageCaption("");
        alert("Image uploaded successfully!");
        loadProjectDetails(selectedProject.id);
      })
      .catch((err) => console.error("Failed to upload image:", err));
  };

  const handleDeleteImage = (imageId: string) => {
    if (!selectedProject) return;
    if (!confirm("Are you sure you want to delete this image?")) return;

    api.delete(`/projects/${selectedProject.id}/images/${imageId}`)
      .then(() => {
        loadProjectDetails(selectedProject.id);
      })
      .catch((err) => console.error("Failed to delete image:", err));
  };

  const handleUpdateImage = (imageId: string, updates: any) => {
    if (!selectedProject) return;

    api.put<any>(`/projects/${selectedProject.id}/images/${imageId}`, updates)
      .then(() => {
        loadProjectDetails(selectedProject.id);
      })
      .catch((err) => console.error("Failed to update image:", err));
  };

  const handleSetCoverImage = (img: ProjectImage) => {
    if (!selectedProject) return;

    api.put<any>(`/projects/${selectedProject.id}/images/${img.id}`, { 
      is_cover: true, 
      image_type: 'hero' 
    })
      .then(() => {
        return api.put<any>(`/admin/projects/${selectedProject.id}`, {
          cover_image: img.image_url
        });
      })
      .then(() => {
        loadProjectDetails(selectedProject.id);
      })
      .catch((err) => console.error("Failed to set cover image:", err));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedImgId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!selectedProject || !selectedProject.images) return;
    const sourceId = e.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) return;

    const imagesCopy = [...selectedProject.images].sort(
      (a, b) => (a.image_order || a.sort_order || 0) - (b.image_order || b.sort_order || 0)
    );
    const sourceIndex = imagesCopy.findIndex(img => img.id === sourceId);
    const targetIndex = imagesCopy.findIndex(img => img.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;

    const [movedImg] = imagesCopy.splice(sourceIndex, 1);
    imagesCopy.splice(targetIndex, 0, movedImg);

    const updates = imagesCopy.map((img, index) => ({
      id: img.id,
      image_order: index,
      sort_order: index
    }));

    Promise.all(
      updates.map(u => api.put<any>(`/projects/${selectedProject.id}/images/${u.id}`, { 
        image_order: u.image_order,
        sort_order: u.sort_order
      }))
    )
      .then(() => {
        loadProjectDetails(selectedProject.id);
      })
      .catch(err => console.error("Error reordering images:", err));

    setDraggedImgId(null);
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !docFile || !docName.trim()) return;

    api.uploadFile<any>("/admin/documents", docFile, {
      project_id: selectedProject.id,
      name: docName.trim()
    })
      .then(() => {
        setDocFile(null);
        setDocName("");
        alert("Document uploaded successfully!");
        loadProjectDetails(selectedProject.id);
      })
      .catch((err) => console.error("Failed to upload document:", err));
  };

  const handleStatusChange = (status: Project["status"]) => {
    if (!selectedProject) return;
    api.put<Project>(`/admin/projects/${selectedProject.id}`, { status })
      .then(() => loadProjectDetails(selectedProject.id))
      .catch((err) => console.error("Failed to update status:", err));
  };

  const handlePublishToggle = (field: "published" | "featured", value: boolean) => {
    if (!selectedProject) return;
    api.put<Project>(`/admin/projects/${selectedProject.id}`, { [field]: value })
      .then(() => {
        fetchProjects();
        loadProjectDetails(selectedProject.id);
      })
      .catch((err) => console.error(`Failed to update ${field} flag:`, err));
  };

  const openEdit = (proj: Project) => {
    setEditingProject(proj);
    setName(proj.name);
    setClientId(proj.client_id || "");
    setProjectType(proj.project_type);
    setDescription(proj.description || "");
    setBudget(proj.budget || "");
    setStartDate(proj.start_date || "");
    setEndDate(proj.end_date || "");
    setPublished(proj.published);
    setFeatured(proj.featured);

    setSlug(proj.slug || "");
    setCategory(proj.category || "");
    setYear(proj.year || "");
    setLocation(proj.location || "");
    setStatus(proj.status || "Inquiry");
    setHeroVideo((proj as any).hero_video || "");
    setHeroCaption((proj as any).hero_caption || "");
    setMetaTitle((proj as any).meta_title || "");
    setMetaDescription((proj as any).meta_description || "");
    setMetaKeywords((proj as any).meta_keywords || "");
    setMetaOgImage((proj as any).meta_og_image || "");

    try {
      const rolesVal = (proj as any).studio_roles;
      setStudioRoles(rolesVal ? JSON.parse(rolesVal) : []);
    } catch {
      const rolesVal = (proj as any).studio_roles;
      setStudioRoles(rolesVal ? rolesVal.split(",").map((s: string) => s.trim()) : []);
    }

    try {
      const delivVal = (proj as any).core_deliverables;
      setCoreDeliverables(delivVal ? JSON.parse(delivVal) : []);
    } catch {
      const delivVal = (proj as any).core_deliverables;
      setCoreDeliverables(delivVal ? delivVal.split(",").map((s: string) => s.trim()) : []);
    }

    setEditHeroImages([]);
    setDeletedHeroIds([]);
    setOverviewTitle("Overview");
    setOverviewContent("");
    setProcessTitle("Process");
    setProcessContent("");
    setOutcomeTitle("Outcome");
    setOutcomeContent("");
    setActiveTab("basic");

    api.get<any>(`/admin/projects/${proj.id}`)
      .then((data) => {
        if (data && data.heroImages) {
          setEditHeroImages(data.heroImages.map((img: any) => ({
            id: img.id,
            previewUrl: img.image_url,
            isNew: false
          })));
        }
        if (data && data.project) {
          const sections = data.project.sections || [];
          const overview = sections.find((s: any) => s.section_type === "hero");
          const process = sections.find((s: any) => s.section_type === "process");
          const outcome = sections.find((s: any) => s.section_type === "outcome");

          setOverviewTitle(overview?.title || "Overview");
          setOverviewContent(overview?.content || "");
          setProcessTitle(process?.title || "Process");
          setProcessContent(process?.content || "");
          setOutcomeTitle(outcome?.title || "Outcome");
          setOutcomeContent(outcome?.content || "");
        }
      })
      .catch((err) => console.error("Error loading project details for editing:", err));

    setIsEditOpen(true);
  };

  const resetForm = () => {
    setName("");
    setClientId("");
    setProjectType("Space Design");
    setDescription("");
    setBudget("");
    setStartDate("");
    setEndDate("");
    setPublished(false);
    setFeatured(false);
    setEditingProject(null);
    setCreateHeroImages([]);
    setEditHeroImages([]);
    setDeletedHeroIds([]);

    setSlug("");
    setCategory("");
    setYear("");
    setLocation("");
    setStatus("Inquiry");
    setHeroVideo("");
    setHeroCaption("");
    setOverviewTitle("Overview");
    setOverviewContent("");
    setProcessTitle("Process");
    setProcessContent("");
    setOutcomeTitle("Outcome");
    setOutcomeContent("");
    setStudioRoles([]);
    setNewRole("");
    setCoreDeliverables([]);
    setNewDeliverable("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setMetaOgImage("");
    setActiveTab("basic");
    setCreateActiveTab("basic");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* ── PROJECTS DIRECTORY COLUMN ── */}
      <div className={`${selectedProject ? "lg:col-span-5" : "lg:col-span-12"} space-y-8`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Studio Projects</h1>
            <p className="text-white/40 text-sm mt-1">Lifecycle timeline, budgets, documents, and assets.</p>
          </div>
          <button
            onClick={() => { resetForm(); setIsCreateOpen(true); }}
            className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New Project
          </button>
        </div>

        <div className="bg-[#141416] rounded-3xl border border-white/5 overflow-hidden">
          {loading ? (
            <div className="flex py-20 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-white/40">No projects registered. Click create to add one.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-white/40 uppercase tracking-widest text-[10px] font-black bg-[#141416]">
                    <th className="py-4 px-6">Project Title</th>
                    <th className="py-4 px-6">Type & Client</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((proj) => (
                    <tr 
                      key={proj.id} 
                      onClick={() => loadProjectDetails(proj.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedProject?.id === proj.id ? "bg-[#FFFF00]/5 hover:bg-[#FFFF00]/10" : "hover:bg-white/[0.01]"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-white flex items-center gap-2">
                            {proj.name}
                            {proj.published && <span title="Published on site"><Globe className="w-3 h-3 text-[#FFFF00]" /></span>}
                          </p>
                          <p className="text-xs text-white/30 mt-0.5">Budget: {proj.budget || "N/A"}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-xs text-white/80">{proj.project_type}</p>
                        <p className="text-[10px] text-white/30 truncate mt-0.5">Client: {(proj as any).client?.name || "N/A"}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 text-[9px] uppercase font-bold rounded bg-white/10 text-white/80 border border-white/10">
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openEdit(proj)}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors cursor-pointer border border-blue-500/10"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(proj.id)}
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

      {/* ── PROJECT DETAILS & COLLABORATION COLUMN ── */}
      {selectedProject && (
        <div className="lg:col-span-7 space-y-8 bg-[#141416] p-8 rounded-[30px] border border-white/5 max-h-[90vh] overflow-y-auto">
          {detailsLoading ? (
            <div className="flex py-20 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
            </div>
          ) : (
            <>
              {/* Header Details */}
              <div className="flex justify-between items-start border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>{selectedProject.name}</h2>
                  <p className="text-white/40 text-xs mt-1">Type: <span className="text-white/80">{selectedProject.project_type}</span> &bull; Client: <span className="text-[#FFFF00]">{selectedProject.client?.name || "N/A"}</span></p>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="px-3 py-1 bg-[#0A0A0B] border border-white/10 hover:border-white/20 text-white/40 hover:text-white rounded-lg text-xs cursor-pointer"
                >
                  Close Detail
                </button>
              </div>

              {/* Status & Site Publish Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-[#0A0A0B]/40 rounded-2xl border border-white/5">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Lifecycle Status</p>
                  <select 
                    value={selectedProject.status} 
                    onChange={(e) => handleStatusChange(e.target.value as Project["status"])}
                    className="bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FFFF00] w-full"
                  >
                    <option value="Inquiry">Inquiry</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Design">Design</option>
                    <option value="Execution">Execution</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-white/40 font-bold">Website Settings</p>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedProject.published} 
                        onChange={(e) => handlePublishToggle("published", e.target.checked)}
                        className="rounded bg-[#0A0A0B] border border-white/10 text-[#FFFF00]" 
                      />
                      Published
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedProject.featured} 
                        onChange={(e) => handlePublishToggle("featured", e.target.checked)}
                        className="rounded bg-[#0A0A0B] border border-white/10 text-[#FFFF00]" 
                      />
                      Featured Work
                    </label>
                  </div>
                </div>
              </div>

              {/* Documents & Storage Panel */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  <FileText className="w-4 h-4 text-[#FFFF00]" /> Project Documents
                </h3>
                
                {/* Upload Doc Form */}
                <form onSubmit={handleUploadDoc} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Document Label"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white w-full"
                  />
                  <input
                    type="file"
                    required
                    onChange={(e) => { setImageFile(null); setDocFile(e.target.files?.[0] || null); }}
                    className="bg-[#0A0A0B] border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white/50 w-full"
                  />
                  <button type="submit" className="px-4 py-2 bg-white text-[#0A0A0B] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#FFFF00] transition-colors cursor-pointer w-full">
                    Upload
                  </button>
                </form>

                {/* Documents List */}
                <div className="space-y-2 mt-4">
                  {selectedProject.documents.length === 0 ? (
                    <p className="text-white/30 text-xs italic">No design attachments uploaded.</p>
                  ) : (
                    selectedProject.documents.map((doc) => (
                      <div key={doc.id} className="flex justify-between items-center bg-[#0A0A0B] p-3.5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-white/30" />
                          <p className="text-xs font-bold text-white/80">{doc.name}</p>
                        </div>
                        <a href={doc.file_url} target="_blank" rel="noreferrer" className="p-1.5 text-white/40 hover:text-white border border-white/10 rounded-lg">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Gallery Image Upload Panel */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  <ImageIcon className="w-4 h-4 text-[#FFFF00]" /> Design Media Gallery
                </h3>
                
                {/* Upload Image Form */}
                <form onSubmit={handleUploadImage} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Caption"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    className="bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white w-full"
                  />
                  <select
                    value={imageType}
                    onChange={(e) => setImageType(e.target.value as any)}
                    className="bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white w-full"
                  >
                    <option value="hero">Cover Image</option>
                    <option value="gallery">Gallery</option>
                    <option value="process">Process</option>
                  </select>
                  <input
                    type="file"
                    required
                    onChange={(e) => { setDocFile(null); setImageFile(e.target.files?.[0] || null); }}
                    className="bg-[#0A0A0B] border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white/50 w-full"
                  />
                  <button type="submit" className="px-4 py-2 bg-[#FFFF00] text-[#0A0A0B] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-colors cursor-pointer w-full">
                    Upload File
                  </button>
                </form>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {selectedProject.images.length === 0 ? (
                    <p className="text-white/30 text-xs italic col-span-3">No design layouts uploaded.</p>
                  ) : (
                    [...selectedProject.images]
                      .sort((a, b) => (a.image_order ?? a.sort_order ?? 0) - (b.image_order ?? b.sort_order ?? 0))
                      .map((img) => {
                        const isCover = img.is_cover || img.image_type === "hero";
                        const isFeatured = img.is_featured_homepage;
                        return (
                          <div 
                            key={img.id} 
                            draggable
                            onDragStart={(e) => handleDragStart(e, img.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, img.id)}
                            className={`relative rounded-xl overflow-hidden border-2 bg-[#141416] p-2 flex flex-col justify-between group cursor-grab active:cursor-grabbing ${
                              draggedImgId === img.id ? "opacity-40" : ""
                            } ${
                              isCover ? "border-[#FFFF00]" : "border-white/5"
                            }`}
                          >
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                              <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                {isCover && (
                                  <span className="px-1.5 py-0.5 bg-[#FFFF00] text-[#0A0A0B] rounded text-[8px] font-extrabold uppercase tracking-wider">Cover</span>
                                )}
                                {isFeatured && (
                                  <span className="px-1.5 py-0.5 bg-[#EC0606] text-white rounded text-[8px] font-bold uppercase tracking-wider">Slideshow</span>
                                )}
                                <span className="px-1.5 py-0.5 bg-black/60 rounded text-[8px] font-bold uppercase tracking-wider">{img.image_type}</span>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(img.id)}
                                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-[#EC0606] hover:text-white rounded-lg text-white/70 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <div className="mt-2.5 space-y-1.5 text-[11px]">
                              {img.caption && (
                                <p className="text-white/60 italic px-1 truncate">{img.caption}</p>
                              )}
                              <div className="flex flex-col gap-1 pt-1 border-t border-white/5">
                                <button
                                  type="button"
                                  disabled={isCover}
                                  onClick={() => handleSetCoverImage(img)}
                                  className={`w-full py-1 text-center font-bold uppercase tracking-wider rounded-lg text-[9px] cursor-pointer transition-colors ${
                                    isCover 
                                      ? "bg-white/5 text-white/30 cursor-default" 
                                      : "bg-white/10 hover:bg-[#FFFF00] hover:text-[#0A0A0B] text-white"
                                  }`}
                                >
                                  Set Cover
                                </button>
                                
                                <button
                                  type="button"
                                  onClick={() => handleUpdateImage(img.id, { is_featured_homepage: !isFeatured })}
                                  className={`w-full py-1 text-center font-bold uppercase tracking-wider rounded-lg text-[9px] cursor-pointer transition-colors ${
                                    isFeatured
                                      ? "bg-[#EC0606] text-white hover:bg-red-700"
                                      : "bg-white/10 hover:bg-white hover:text-[#0A0A0B] text-white"
                                  }`}
                                >
                                  {isFeatured ? "Remove Slideshow" : "Add Slideshow"}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>

              {/* Notes logger log */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  <Clipboard className="w-4 h-4 text-[#FFFF00]" /> Design Updates & Notes
                </h3>
                
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Log architectural details or client requests..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    required
                    className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#FFFF00] text-white"
                  />
                  <button type="submit" className="p-2.5 bg-[#FFFF00] text-[#0A0A0B] rounded-xl hover:bg-white transition-colors cursor-pointer">
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="space-y-3 mt-4">
                  {selectedProject.notes.length === 0 ? (
                    <p className="text-white/30 text-xs italic">No project update notes recorded.</p>
                  ) : (
                    selectedProject.notes.map((note) => (
                      <div key={note.id} className="p-4 bg-[#0A0A0B] rounded-xl border border-white/5">
                        <p className="text-[10px] text-white/30 font-bold">{new Date(note.created_at).toLocaleString()}</p>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">{note.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-2xl p-8 space-y-6 relative max-h-[95vh] overflow-y-auto">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Initialize Studio Project</h3>
            
            {/* Tabs Navigation */}
            <div className="flex border-b border-white/10 mb-6 overflow-x-auto gap-2 scrollbar-none pb-1">
              {[
                { id: 'basic', label: 'Basic Info' },
                { id: 'hero', label: 'Hero & Media' },
                { id: 'content', label: 'Project Content' },
                { id: 'roles', label: 'Roles & Deliverables' },
                { id: 'seo', label: 'SEO Section' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCreateActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded-t-xl transition-all border-b-2 cursor-pointer ${
                    createActiveTab === tab.id
                      ? "border-[#FFFF00] text-[#FFFF00]"
                      : "border-transparent text-white/40 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              {/* TAB 1: BASIC INFO */}
              {createActiveTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Project Name</label>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Project Slug (URL Path)</label>
                      <input type="text" placeholder="e.g. project-slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Project Owner (Client)</label>
                      <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                        <option value="">No Client (Inquiry)</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Discipline (Type)</label>
                      <select value={projectType} onChange={(e) => setProjectType(e.target.value as any)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                        <option value="Space Design">Space Design</option>
                        <option value="Product Design">Product Design</option>
                        <option value="Brand Design">Brand Design</option>
                        <option value="Immersive Design">Immersive Design</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Interior Design">Interior Design</option>
                        <option value="Branding">Branding</option>
                        <option value="Research">Research</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Related Category (Portfolio Filter)</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                        <option value="">Use Discipline Name</option>
                        <option value="Space Design">Space Design</option>
                        <option value="Product Design">Product Design</option>
                        <option value="Experience Design">Experience Design</option>
                        <option value="Brand Design">Brand Design</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Lifecycle Status</label>
                      <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                        <option value="Inquiry">Inquiry</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Design">Design</option>
                        <option value="Execution">Execution</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Location</label>
                      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New Delhi" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Year Completed</label>
                      <input type="number" value={year} onChange={(e) => setYear(e.target.value === "" ? "" : parseInt(e.target.value, 10))} placeholder="e.g. 2024" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Project Value (Budget)</label>
                      <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. $1.5M" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Start Date</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">End Date</label>
                      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Brief Description</label>
                    <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Publish State & Visibility</p>
                    <div className="flex gap-6 items-center">
                      <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded bg-[#0A0A0B] border border-white/10 text-[#FFFF00]" />
                        Published
                      </label>
                      <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded bg-[#0A0A0B] border border-white/10 text-[#FFFF00]" />
                        Featured on Home Slideshow
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO & MEDIA */}
              {createActiveTab === 'hero' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Hero Video URL (Optional)</label>
                      <input type="text" value={heroVideo} onChange={(e) => setHeroVideo(e.target.value)} placeholder="e.g. https://domain.com/video.mp4" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Hero Image Caption</label>
                      <input type="text" value={heroCaption} onChange={(e) => setHeroCaption(e.target.value)} placeholder="e.g. Aerial render of south wing" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-4">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Hero Gallery Images (Reorderable / Drag & Drop)</label>
                    <div className="flex flex-col gap-3">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleCreateHeroFileChange} 
                        className="bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white/60 focus:outline-none focus:border-[#FFFF00] file:mr-4 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-extrabold file:uppercase file:bg-white/10 file:text-white hover:file:bg-[#FFFF00] hover:file:text-[#0A0A0B] file:cursor-pointer"
                      />
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                        {createHeroImages.map((img, idx) => (
                          <div 
                            key={img.id}
                            draggable
                            onDragStart={(e) => handleCreateHeroDragStart(e, img.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleCreateHeroDrop(e, img.id)}
                            className={`relative rounded-xl overflow-hidden aspect-video border bg-[#0A0A0B] group cursor-grab active:cursor-grabbing ${
                              draggedHeroId === img.id ? "border-[#FFFF00] opacity-40" : "border-white/10"
                            }`}
                          >
                            <img src={img.previewUrl} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-1 left-1 bg-black/60 px-1 rounded text-[8px] font-bold text-white/70">
                              #{idx + 1}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCreateHeroDelete(img.id)}
                              className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-[#EC0606] text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        {createHeroImages.length === 0 && (
                          <p className="text-[11px] text-white/30 italic col-span-4 py-2">No hero images. Cover image fallback will be used.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PROJECT CONTENT */}
              {createActiveTab === 'content' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Overview Section Title</label>
                    <input type="text" value={overviewTitle} onChange={(e) => setOverviewTitle(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Overview Description</label>
                    <textarea rows={4} value={overviewContent} onChange={(e) => setOverviewContent(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>

                  <div className="space-y-1 border-t border-white/5 pt-4">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Process Section Title</label>
                    <input type="text" value={processTitle} onChange={(e) => setProcessTitle(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Process Description</label>
                    <textarea rows={4} value={processContent} onChange={(e) => setProcessContent(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>

                  <div className="space-y-1 border-t border-white/5 pt-4">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Outcome Section Title</label>
                    <input type="text" value={outcomeTitle} onChange={(e) => setOutcomeTitle(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Outcome Description</label>
                    <textarea rows={4} value={outcomeContent} onChange={(e) => setOutcomeContent(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>
                </div>
              )}

              {/* TAB 4: ROLES & DELIVERABLES */}
              {createActiveTab === 'roles' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Studio Roles</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g. Architecture" 
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (newRole.trim()) {
                            setStudioRoles([...studioRoles, newRole.trim()]);
                            setNewRole("");
                          }
                        }}
                        className="px-4 py-2.5 bg-white text-[#0A0A0B] font-bold text-xs uppercase rounded-xl hover:bg-[#FFFF00] transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {studioRoles.map((r, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
                          <span>{r}</span>
                          <button 
                            type="button" 
                            onClick={() => setStudioRoles(studioRoles.filter((_, i) => i !== idx))}
                            className="text-white/40 hover:text-[#EC0606] transition-colors font-bold cursor-pointer"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      {studioRoles.length === 0 && (
                        <p className="text-[11px] text-white/30 italic">No studio roles specified.</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Core Deliverables (Reorderable)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g. Spatial Design System" 
                        value={newDeliverable}
                        onChange={(e) => setNewDeliverable(e.target.value)}
                        className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (newDeliverable.trim()) {
                            setCoreDeliverables([...coreDeliverables, newDeliverable.trim()]);
                            setNewDeliverable("");
                          }
                        }}
                        className="px-4 py-2.5 bg-white text-[#0A0A0B] font-bold text-xs uppercase rounded-xl hover:bg-[#FFFF00] transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 mt-2">
                      {coreDeliverables.map((d, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs">
                          <span className="text-white/80">{d}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                const copy = [...coreDeliverables];
                                const temp = copy[idx];
                                copy[idx] = copy[idx - 1];
                                copy[idx - 1] = temp;
                                setCoreDeliverables(copy);
                              }}
                              className="text-white/40 hover:text-white disabled:opacity-20 text-[10px] font-bold cursor-pointer px-1"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={idx === coreDeliverables.length - 1}
                              onClick={() => {
                                const copy = [...coreDeliverables];
                                const temp = copy[idx];
                                copy[idx] = copy[idx + 1];
                                copy[idx + 1] = temp;
                                setCoreDeliverables(copy);
                              }}
                              className="text-white/40 hover:text-white disabled:opacity-20 text-[10px] font-bold cursor-pointer px-1"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => setCoreDeliverables(coreDeliverables.filter((_, i) => i !== idx))}
                              className="text-white/40 hover:text-[#EC0606] transition-colors ml-2 font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {coreDeliverables.length === 0 && (
                        <p className="text-[11px] text-white/30 italic">No core deliverables specified.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SEO SECTION */}
              {createActiveTab === 'seo' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Meta Title</label>
                    <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="e.g. Haus am See | Lake Side Residence" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Meta Description</label>
                    <textarea rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="e.g. Explore a Lakeside residence in Bavaria..." className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Meta Keywords</label>
                      <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="e.g. minimalism, architecture" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Open Graph Image (URL)</label>
                      <input type="text" value={metaOgImage} onChange={(e) => setMetaOgImage(e.target.value)} placeholder="e.g. https://domain.com/og-image.jpg" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 justify-end border-t border-white/5">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl cursor-pointer">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-2xl p-8 space-y-6 relative max-h-[95vh] overflow-y-auto">
            <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>Modify Project Specs</h3>
            
            {/* Tabs Navigation */}
            <div className="flex border-b border-white/10 mb-6 overflow-x-auto gap-2 scrollbar-none pb-1">
              {[
                { id: 'basic', label: 'Basic Info' },
                { id: 'hero', label: 'Hero & Media' },
                { id: 'content', label: 'Project Content' },
                { id: 'roles', label: 'Roles & Deliverables' },
                { id: 'seo', label: 'SEO Section' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded-t-xl transition-all border-b-2 cursor-pointer ${
                    activeTab === tab.id
                      ? "border-[#FFFF00] text-[#FFFF00]"
                      : "border-transparent text-white/40 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Project Name</label>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Project Slug (URL Path)</label>
                      <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Client</label>
                      <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                        <option value="">No Client (Inquiry)</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Discipline (Type)</label>
                      <select value={projectType} onChange={(e) => setProjectType(e.target.value as any)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                        <option value="Space Design">Space Design</option>
                        <option value="Product Design">Product Design</option>
                        <option value="Brand Design">Brand Design</option>
                        <option value="Immersive Design">Immersive Design</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Interior Design">Interior Design</option>
                        <option value="Branding">Branding</option>
                        <option value="Research">Research</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Related Category (Portfolio Filter)</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                        <option value="">Use Discipline Name</option>
                        <option value="Space Design">Space Design</option>
                        <option value="Product Design">Product Design</option>
                        <option value="Experience Design">Experience Design</option>
                        <option value="Brand Design">Brand Design</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Lifecycle Status</label>
                      <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                        <option value="Inquiry">Inquiry</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Design">Design</option>
                        <option value="Execution">Execution</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Location</label>
                      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New Delhi" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Year Completed</label>
                      <input type="number" value={year} onChange={(e) => setYear(e.target.value === "" ? "" : parseInt(e.target.value, 10))} placeholder="e.g. 2024" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Project Value (Budget)</label>
                      <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. $1.5M" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Start Date</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">End Date</label>
                      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Brief Description</label>
                    <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Publish State & Visibility</p>
                    <div className="flex gap-6 items-center">
                      <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded bg-[#0A0A0B] border border-white/10 text-[#FFFF00]" />
                        Published
                      </label>
                      <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded bg-[#0A0A0B] border border-white/10 text-[#FFFF00]" />
                        Featured on Home Slideshow
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO & MEDIA */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Hero Video URL (Optional)</label>
                      <input type="text" value={heroVideo} onChange={(e) => setHeroVideo(e.target.value)} placeholder="e.g. https://domain.com/video.mp4" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Hero Image Caption</label>
                      <input type="text" value={heroCaption} onChange={(e) => setHeroCaption(e.target.value)} placeholder="e.g. Aerial render of south wing" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-4">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Hero Gallery Images (Reorderable / Drag & Drop)</label>
                    <div className="flex flex-col gap-3">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleEditHeroFileChange} 
                        className="bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white/60 focus:outline-none focus:border-[#FFFF00] file:mr-4 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-extrabold file:uppercase file:bg-white/10 file:text-white hover:file:bg-[#FFFF00] hover:file:text-[#0A0A0B] file:cursor-pointer"
                      />
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                        {editHeroImages.map((img, idx) => (
                          <div 
                            key={img.id}
                            draggable
                            onDragStart={(e) => handleEditHeroDragStart(e, img.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleEditHeroDrop(e, img.id)}
                            className={`relative rounded-xl overflow-hidden aspect-video border bg-[#0A0A0B] group cursor-grab active:cursor-grabbing ${
                              draggedHeroId === img.id ? "border-[#FFFF00] opacity-40" : "border-white/10"
                            }`}
                          >
                            <img src={img.previewUrl} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-1 left-1 bg-black/60 px-1 rounded text-[8px] font-bold text-white/70">
                              #{idx + 1}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleEditHeroDelete(img.id)}
                              className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-[#EC0606] text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        {editHeroImages.length === 0 && (
                          <p className="text-[11px] text-white/30 italic col-span-4 py-2">No hero images. Cover image fallback will be used.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PROJECT CONTENT */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Overview Section Title</label>
                    <input type="text" value={overviewTitle} onChange={(e) => setOverviewTitle(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Overview Description</label>
                    <textarea rows={4} value={overviewContent} onChange={(e) => setOverviewContent(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>

                  <div className="space-y-1 border-t border-white/5 pt-4">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Process Section Title</label>
                    <input type="text" value={processTitle} onChange={(e) => setProcessTitle(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Process Description</label>
                    <textarea rows={4} value={processContent} onChange={(e) => setProcessContent(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>

                  <div className="space-y-1 border-t border-white/5 pt-4">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Outcome Section Title</label>
                    <input type="text" value={outcomeTitle} onChange={(e) => setOutcomeTitle(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Outcome Description</label>
                    <textarea rows={4} value={outcomeContent} onChange={(e) => setOutcomeContent(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>
                </div>
              )}

              {/* TAB 4: ROLES & DELIVERABLES */}
              {activeTab === 'roles' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Studio Roles</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g. Architecture" 
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (newRole.trim()) {
                            setStudioRoles([...studioRoles, newRole.trim()]);
                            setNewRole("");
                          }
                        }}
                        className="px-4 py-2.5 bg-white text-[#0A0A0B] font-bold text-xs uppercase rounded-xl hover:bg-[#FFFF00] transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {studioRoles.map((r, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
                          <span>{r}</span>
                          <button 
                            type="button" 
                            onClick={() => setStudioRoles(studioRoles.filter((_, i) => i !== idx))}
                            className="text-white/40 hover:text-[#EC0606] transition-colors font-bold cursor-pointer"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      {studioRoles.length === 0 && (
                        <p className="text-[11px] text-white/30 italic">No studio roles specified.</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Core Deliverables (Reorderable)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g. Spatial Design System" 
                        value={newDeliverable}
                        onChange={(e) => setNewDeliverable(e.target.value)}
                        className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (newDeliverable.trim()) {
                            setCoreDeliverables([...coreDeliverables, newDeliverable.trim()]);
                            setNewDeliverable("");
                          }
                        }}
                        className="px-4 py-2.5 bg-white text-[#0A0A0B] font-bold text-xs uppercase rounded-xl hover:bg-[#FFFF00] transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 mt-2">
                      {coreDeliverables.map((d, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs">
                          <span className="text-white/80">{d}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                const copy = [...coreDeliverables];
                                const temp = copy[idx];
                                copy[idx] = copy[idx - 1];
                                copy[idx - 1] = temp;
                                setCoreDeliverables(copy);
                              }}
                              className="text-white/40 hover:text-white disabled:opacity-20 text-[10px] font-bold cursor-pointer px-1"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={idx === coreDeliverables.length - 1}
                              onClick={() => {
                                const copy = [...coreDeliverables];
                                const temp = copy[idx];
                                copy[idx] = copy[idx + 1];
                                copy[idx + 1] = temp;
                                setCoreDeliverables(copy);
                              }}
                              className="text-white/40 hover:text-white disabled:opacity-20 text-[10px] font-bold cursor-pointer px-1"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => setCoreDeliverables(coreDeliverables.filter((_, i) => i !== idx))}
                              className="text-white/40 hover:text-[#EC0606] transition-colors ml-2 font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {coreDeliverables.length === 0 && (
                        <p className="text-[11px] text-white/30 italic">No core deliverables specified.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SEO SECTION */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Meta Title</label>
                    <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="e.g. Haus am See | Lake Side Residence" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Meta Description</label>
                    <textarea rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="e.g. Explore a Lakeside residence in Bavaria..." className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Meta Keywords</label>
                      <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="e.g. minimalism, architecture" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Open Graph Image (URL)</label>
                      <input type="text" value={metaOgImage} onChange={(e) => setMetaOgImage(e.target.value)} placeholder="e.g. https://domain.com/og-image.jpg" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 justify-end border-t border-white/5">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
