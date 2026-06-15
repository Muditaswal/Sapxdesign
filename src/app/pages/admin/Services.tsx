import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Tag, X, Sparkles } from "lucide-react";
import { api } from "../../services/api";
import { ServiceItem } from "../../types/crm";

const STANDARD_CAPABILITIES = [
  // Space Design
  "Architecture",
  "Interior Design",
  "Retail Design",
  "Workspace Design",
  "Hospitality Design",
  "Experience Centers",
  "Exhibition Design",
  "Environmental Graphics",
  "Wayfinding & Signage",
  "3D Visualization",
  // Product Design
  "UX Research",
  "Product Strategy",
  "UX/UI Design",
  "Mobile App Design",
  "Web Design",
  "Enterprise UX",
  "SaaS Design",
  "Design Systems",
  "AI Product Design",
  "Conversational AI Design",
  "Usability Testing",
  // Brand Design
  "Brand Strategy",
  "Brand Identity",
  "Visual Identity Systems",
  "Packaging Design",
  "Marketing Collateral",
  "Social Media Design",
  "Brand Guidelines",
  "Campaign Design",
  "Motion Graphics",
  "Content Design",
  // Immersive Design
  "Brand Activations",
  "Experiential Marketing",
  "Event Design",
  "Interactive Installations",
  "Pop-up Experiences",
  "Product Launch Experiences",
  "Retail Activations",
  "Service Design",
  "Customer Experience Design",
  "AR/VR Experiences",
  "AI-Powered Experiences",
  "Gamification Experiences"
];

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Form Fields
  const [id, setId] = useState("");
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [image, setImage] = useState("");
  const [showInSlideshow, setShowInSlideshow] = useState(true);
  const [showInMatrix, setShowInMatrix] = useState(true);
  
  // Custom capabilities list management
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [newCapInput, setNewCapInput] = useState("");

  const allAvailableCaps = Array.from(new Set([...STANDARD_CAPABILITIES, ...capabilities]));

  const fetchServices = () => {
    setLoading(true);
    api.get<ServiceItem[]>("/services")
      .then((data) => {
        setServices(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load services:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddCapTag = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (!newCapInput.trim()) return;
    if (capabilities.includes(newCapInput.trim())) {
      setNewCapInput("");
      return;
    }
    setCapabilities([...capabilities, newCapInput.trim()]);
    setNewCapInput("");
  };

  const handleRemoveCapTag = (cap: string) => {
    setCapabilities(capabilities.filter(c => c !== cap));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !title || !number) return;

    const payload = {
      id,
      number,
      title,
      short_desc: shortDesc,
      full_desc: fullDesc,
      capabilities,
      image: image || undefined,
      show_in_slideshow: showInSlideshow,
      show_in_matrix: showInMatrix
    };

    if (selectedService) {
      // Edit
      api.put<ServiceItem>(`/admin/services/${selectedService.id}`, payload)
        .then(() => {
          setIsEditorOpen(false);
          resetForm();
          fetchServices();
        })
        .catch((err) => console.error("Failed to update service:", err));
    } else {
      // Create
      api.post<ServiceItem>("/admin/services", payload)
        .then(() => {
          setIsEditorOpen(false);
          resetForm();
          fetchServices();
        })
        .catch((err) => console.error("Failed to create service:", err));
    }
  };

  const handleDelete = (sId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    api.delete(`/admin/services/${sId}`)
      .then(() => fetchServices())
      .catch((err) => console.error("Failed to delete service:", err));
  };

  const openEditor = (service: ServiceItem | null) => {
    if (service) {
      setSelectedService(service);
      setId(service.id);
      setNumber(service.number);
      setTitle(service.title);
      setShortDesc(service.short_desc);
      setFullDesc(service.full_desc);
      setImage(service.image || "");
      setCapabilities(service.capabilities || []);
      setShowInSlideshow(service.show_in_slideshow !== false);
      setShowInMatrix(service.show_in_matrix !== false);
    } else {
      resetForm();
    }
    setIsEditorOpen(true);
  };

  const resetForm = () => {
    setId("");
    setNumber("");
    setTitle("");
    setShortDesc("");
    setFullDesc("");
    setImage("");
    setCapabilities([]);
    setNewCapInput("");
    setShowInSlideshow(true);
    setShowInMatrix(true);
    setSelectedService(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Studio Services</h1>
          <p className="text-white/40 text-sm mt-1">Configure studio offerings, service descriptions, and capabilities pills.</p>
        </div>
        <button
          onClick={() => openEditor(null)}
          className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Service
        </button>
      </div>

      {/* Services Grid list */}
      {loading ? (
        <div className="flex py-20 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 bg-[#141416]/40 rounded-[30px] border border-white/5 text-white/40 italic">
          No services registered. Add a service above or seed default data in Settings.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-[#141416] p-6 rounded-[24px] border border-white/5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#FFFF00] font-extrabold uppercase tracking-wider">Service {service.number}</span>
                  <div className="flex gap-2">
                    {service.show_in_slideshow !== false && <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-extrabold uppercase">Slideshow</span>}
                    {service.show_in_matrix !== false && <span className="text-[8px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-1.5 py-0.5 rounded font-extrabold uppercase">Matrix</span>}
                  </div>
                  <span className="text-[9px] text-white/30 font-semibold font-mono">ID: {service.id}</span>
                </div>

                <h3 className="text-xl font-bold text-white uppercase mt-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {service.title}
                </h3>
                <p className="text-xs text-white/40 mt-3 font-light leading-relaxed">
                  {service.short_desc}
                </p>

                {/* Capabilities pills list preview */}
                {service.capabilities && service.capabilities.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    <p className="text-[9px] uppercase tracking-widest text-[#EC0606] font-bold">Capabilities ({service.capabilities.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.capabilities.slice(0, 5).map(cap => (
                        <span key={cap} className="px-2 py-0.5 bg-black text-[#FFFF00] border border-white/10 rounded-full text-[9px]">
                          {cap}
                        </span>
                      ))}
                      {service.capabilities.length > 5 && (
                        <span className="text-[9px] text-white/30 mt-0.5">+{service.capabilities.length - 5} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
                <button
                  onClick={() => openEditor(service)}
                  className="px-3 py-1.5 bg-[#0A0A0B] border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit Service
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 hover:border-red-500/20 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDITOR DRAWER */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-lg p-8 space-y-6 relative max-h-[95vh] overflow-y-auto">
            <h3 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              {selectedService ? "Edit Service specs" : "Add New Studio Service"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Unique ID Slug</label>
                  <input type="text" required disabled={!!selectedService} value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. space-design" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white disabled:opacity-50" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Number Badge</label>
                  <input type="text" required value={number} onChange={(e) => setNumber(e.target.value)} placeholder="e.g. 01" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Service Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Space Design" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Cover Image URL</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Short Summary Description</label>
                <input type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Detailed Description</label>
                <textarea rows={3} value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" />
              </div>

              {/* Capabilities checklist and custom add */}
              <div className="space-y-3 border-t border-white/5 pt-4">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Service Capabilities (Explore Capabilities)</label>
                
                {/* Scrollable grid checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-h-48 overflow-y-auto border border-white/10 rounded-xl p-4 bg-[#0A0A0B]/50 custom-scrollbar">
                  {allAvailableCaps.map((cap) => {
                    const isChecked = capabilities.includes(cap);
                    return (
                      <label key={cap} className="flex items-center gap-2.5 text-xs text-white/70 hover:text-white cursor-pointer select-none py-1">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCapabilities([...capabilities, cap]);
                            } else {
                              setCapabilities(capabilities.filter(c => c !== cap));
                            }
                          }}
                          className="w-4 h-4 rounded border-white/20 text-[#FFFF00] focus:ring-0 focus:ring-offset-0 accent-[#FFFF00] bg-transparent cursor-pointer"
                        />
                        <span className="truncate">{cap}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Custom Add Capability */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Type custom capability (e.g. Virtual Reality)"
                    value={newCapInput}
                    onChange={(e) => setNewCapInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCapTag();
                      }
                    }}
                    className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddCapTag()}
                    className="px-4 py-2 bg-white text-[#0A0A0B] font-bold text-xs uppercase rounded-xl hover:bg-[#FFFF00] transition-colors cursor-pointer"
                  >
                    Add Custom
                  </button>
                </div>
              </div>

              {/* Visibility Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <label className="flex items-center gap-2.5 text-xs text-white/70 hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showInSlideshow}
                    onChange={(e) => setShowInSlideshow(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 text-[#FFFF00] focus:ring-0 focus:ring-offset-0 accent-[#FFFF00] bg-transparent cursor-pointer"
                  />
                  <span>Show in Hero Slideshow</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-white/70 hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showInMatrix}
                    onChange={(e) => setShowInMatrix(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 text-[#FFFF00] focus:ring-0 focus:ring-offset-0 accent-[#FFFF00] bg-transparent cursor-pointer"
                  />
                  <span>Show in Service Matrix</span>
                </label>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-6 justify-end">
                <button type="button" onClick={() => { setIsEditorOpen(false); resetForm(); }} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
