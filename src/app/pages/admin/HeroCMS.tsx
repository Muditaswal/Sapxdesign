import { useState, useEffect } from "react";
import { 
  Sparkles, Plus, Trash2, ArrowUp, ArrowDown, Upload, 
  Check, Image as ImageIcon, Eye, EyeOff, LayoutGrid, Sliders, Type, RefreshCw
} from "lucide-react";
import { api } from "../../services/api";
import { HeroConfig, HeroSlideItem, HeroMatrixItem } from "../../types/crm";

const DEFAULT_SLIDE: HeroSlideItem = {
  id: "",
  title: "",
  category: "",
  src: "",
  description: "",
  show: true
};

const DEFAULT_MATRIX: HeroMatrixItem = {
  id: "",
  title: "",
  heading: "",
  desc: "",
  color: "#0A0A0B",
  textColor: "#FFFFFF",
  image: "",
  buttonText: "Explore Capabilities",
  show: true
};

const COLOR_PRESETS = [
  { label: "Noir / Black", bg: "#0A0A0B", text: "#FFFFFF" },
  { label: "Brutalist Red", bg: "#EC0606", text: "#FFFFFF" },
  { label: "Warning Yellow", bg: "#FFFF00", text: "#0A0A0B" },
  { label: "Pure White", bg: "#FFFFFF", text: "#0A0A0B" },
  { label: "Deep Slate", bg: "#18181B", text: "#FFFFFF" },
  { label: "Electric Cobalt", bg: "#1D4ED8", text: "#FFFFFF" },
];

export default function HeroCMS() {
  const [activeTab, setActiveTab] = useState<"slideshow" | "matrix" | "marquee">("slideshow");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Hero Configuration State
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    slideshow: [],
    matrix: [],
    marquee: []
  });

  // Modal / Editing states for Slideshow
  const [editingSlide, setEditingSlide] = useState<{ item: HeroSlideItem; index: number } | null>(null);
  const [slideForm, setSlideForm] = useState<HeroSlideItem>(DEFAULT_SLIDE);
  const [slideUrlInputMode, setSlideUrlInputMode] = useState(false);

  // Modal / Editing states for Matrix
  const [editingMatrix, setEditingMatrix] = useState<{ item: HeroMatrixItem; index: number } | null>(null);
  const [matrixForm, setMatrixForm] = useState<HeroMatrixItem>(DEFAULT_MATRIX);
  const [matrixUrlInputMode, setMatrixUrlInputMode] = useState(false);

  // Marquee state
  const [newMarqueeInput, setNewMarqueeInput] = useState("");

  const fetchHeroConfig = () => {
    setLoading(true);
    api.get<HeroConfig>("/admin/hero")
      .then((data) => {
        if (data && (data.slideshow || data.matrix)) {
          setHeroConfig({
            slideshow: data.slideshow || [],
            matrix: data.matrix || [],
            marquee: data.marquee || []
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load hero configuration:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHeroConfig();
  }, []);

  const handleSaveHero = () => {
    setSaving(true);
    api.put<HeroConfig>("/admin/hero", heroConfig)
      .then(() => {
        setSaving(false);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to save hero configuration:", err);
        setSaving(false);
      });
  };

  // ─── SLIDESHOW HANDLERS ───
  const openSlideModal = (item?: HeroSlideItem, index?: number) => {
    if (item !== undefined && index !== undefined) {
      setEditingSlide({ item, index });
      setSlideForm({ ...item });
    } else {
      const newId = `slide-${Date.now()}`;
      setEditingSlide(null);
      setSlideForm({
        ...DEFAULT_SLIDE,
        id: newId,
        title: "NEW HERO SLIDE",
        category: "Studio Specialization"
      });
    }
  };

  const handleSlideImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSlideForm(prev => ({ ...prev, src: e.target!.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const saveSlideModal = () => {
    if (!slideForm.title.trim()) return;
    const updatedSlides = [...heroConfig.slideshow];

    if (editingSlide !== null) {
      updatedSlides[editingSlide.index] = slideForm;
    } else {
      updatedSlides.push(slideForm);
    }

    setHeroConfig({ ...heroConfig, slideshow: updatedSlides });
    setEditingSlide(null);
  };

  const deleteSlide = (index: number) => {
    if (!confirm("Are you sure you want to remove this slide?")) return;
    const updatedSlides = heroConfig.slideshow.filter((_, i) => i !== index);
    setHeroConfig({ ...heroConfig, slideshow: updatedSlides });
  };

  const toggleSlideShow = (index: number) => {
    const updatedSlides = [...heroConfig.slideshow];
    updatedSlides[index].show = updatedSlides[index].show === false ? true : false;
    setHeroConfig({ ...heroConfig, slideshow: updatedSlides });
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= heroConfig.slideshow.length) return;
    const copy = [...heroConfig.slideshow];
    const [moved] = copy.splice(index, 1);
    copy.splice(newIndex, 0, moved);
    setHeroConfig({ ...heroConfig, slideshow: copy });
  };

  // ─── MATRIX HANDLERS ───
  const openMatrixModal = (item?: HeroMatrixItem, index?: number) => {
    if (item !== undefined && index !== undefined) {
      setEditingMatrix({ item, index });
      setMatrixForm({ ...item });
    } else {
      const newId = `matrix-${Date.now()}`;
      setEditingMatrix(null);
      setMatrixForm({
        ...DEFAULT_MATRIX,
        id: newId,
        title: "NEW CAPABILITY",
        heading: "NEW\nCAPABILITY",
        desc: "Interactive capability description."
      });
    }
  };

  const handleMatrixImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setMatrixForm(prev => ({ ...prev, image: e.target!.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const saveMatrixModal = () => {
    if (!matrixForm.title.trim()) return;
    const updatedMatrix = [...heroConfig.matrix];

    if (editingMatrix !== null) {
      updatedMatrix[editingMatrix.index] = matrixForm;
    } else {
      updatedMatrix.push(matrixForm);
    }

    setHeroConfig({ ...heroConfig, matrix: updatedMatrix });
    setEditingMatrix(null);
  };

  const deleteMatrix = (index: number) => {
    if (!confirm("Are you sure you want to remove this matrix card?")) return;
    const updatedMatrix = heroConfig.matrix.filter((_, i) => i !== index);
    setHeroConfig({ ...heroConfig, matrix: updatedMatrix });
  };

  const toggleMatrixShow = (index: number) => {
    const updatedMatrix = [...heroConfig.matrix];
    updatedMatrix[index].show = updatedMatrix[index].show === false ? true : false;
    setHeroConfig({ ...heroConfig, matrix: updatedMatrix });
  };

  const moveMatrix = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= heroConfig.matrix.length) return;
    const copy = [...heroConfig.matrix];
    const [moved] = copy.splice(index, 1);
    copy.splice(newIndex, 0, moved);
    setHeroConfig({ ...heroConfig, matrix: copy });
  };

  // ─── MARQUEE HANDLERS ───
  const addMarqueeItem = () => {
    if (!newMarqueeInput.trim()) return;
    setHeroConfig({
      ...heroConfig,
      marquee: [...(heroConfig.marquee || []), newMarqueeInput.trim()]
    });
    setNewMarqueeInput("");
  };

  const removeMarqueeItem = (index: number) => {
    setHeroConfig({
      ...heroConfig,
      marquee: (heroConfig.marquee || []).filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141416] p-6 rounded-[24px] border border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[#FFFF00]" />
            <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Hero Section CMS
            </h1>
          </div>
          <p className="text-white/40 text-xs md:text-sm">
            Customize homepage Hero slideshow slides, capability matrix cards, uploaded media, and marquee clients.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs text-green-400 font-bold flex items-center gap-1 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20 animate-fade-in">
              <Check className="w-4 h-4" /> Changes Saved!
            </span>
          )}
          <button
            onClick={handleSaveHero}
            disabled={saving}
            className="px-6 py-3 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[11px] font-black rounded-xl hover:bg-white transition-all shadow-lg shadow-[#FFFF00]/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? "Saving Changes..." : "Save All Hero Settings"}
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-white/10 gap-2">
        <button
          onClick={() => setActiveTab("slideshow")}
          className={`px-5 py-3 text-xs uppercase font-extrabold tracking-wider rounded-t-xl transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === "slideshow" 
              ? "bg-[#141416] text-[#FFFF00] border-t-2 border-[#FFFF00]" 
              : "text-white/40 hover:text-white"
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Hero Slideshow ({heroConfig.slideshow.length})
        </button>
        <button
          onClick={() => setActiveTab("matrix")}
          className={`px-5 py-3 text-xs uppercase font-extrabold tracking-wider rounded-t-xl transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === "matrix" 
              ? "bg-[#141416] text-[#FFFF00] border-t-2 border-[#FFFF00]" 
              : "text-white/40 hover:text-white"
          }`}
        >
          <LayoutGrid className="w-4 h-4" /> Audience Matrix ({heroConfig.matrix.length})
        </button>
        <button
          onClick={() => setActiveTab("marquee")}
          className={`px-5 py-3 text-xs uppercase font-extrabold tracking-wider rounded-t-xl transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === "marquee" 
              ? "bg-[#141416] text-[#FFFF00] border-t-2 border-[#FFFF00]" 
              : "text-white/40 hover:text-white"
          }`}
        >
          <Type className="w-4 h-4" /> Client Marquee ({(heroConfig.marquee || []).length})
        </button>
      </div>

      {loading ? (
        <div className="flex py-20 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* ────────────────── TAB 1: SLIDESHOW EDITOR ────────────────── */}
          {activeTab === "slideshow" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-[#141416]/50 p-4 rounded-xl border border-white/5">
                <div>
                  <h3 className="text-sm font-bold uppercase text-white">Full-Bleed Background Slides</h3>
                  <p className="text-xs text-white/40">These slides rotate dynamically on the main Hero header banner.</p>
                </div>
                <button
                  onClick={() => openSlideModal()}
                  className="px-4 py-2 bg-white text-[#0A0A0B] uppercase text-[10px] font-black rounded-lg hover:bg-[#FFFF00] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Hero Slide
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {heroConfig.slideshow.map((slide, idx) => {
                  const isVisible = slide.show !== false;
                  return (
                    <div 
                      key={slide.id || idx} 
                      className={`bg-[#141416] rounded-[24px] border transition-all overflow-hidden flex flex-col justify-between ${
                        isVisible ? "border-white/10 hover:border-white/20" : "border-red-500/20 opacity-60"
                      }`}
                    >
                      {/* Image Preview Banner */}
                      <div className="relative h-48 w-full bg-[#0A0A0B] overflow-hidden group">
                        {slide.src ? (
                          <img 
                            src={slide.src} 
                            alt={slide.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white/30 text-xs">
                            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                            No image uploaded
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/40" />

                        {/* Category & Visibility Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-extrabold uppercase text-[#EC0606]">
                            {slide.category || "Category"}
                          </span>
                          {!isVisible && (
                            <span className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-[9px] font-extrabold uppercase">
                              Hidden
                            </span>
                          )}
                        </div>

                        {/* Reorder Buttons */}
                        <div className="absolute top-3 right-3 flex gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/10">
                          <button
                            onClick={() => moveSlide(idx, "up")}
                            disabled={idx === 0}
                            className="p-1 hover:text-[#FFFF00] disabled:opacity-20 text-white/70"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveSlide(idx, "down")}
                            disabled={idx === heroConfig.slideshow.length - 1}
                            className="p-1 hover:text-[#FFFF00] disabled:opacity-20 text-white/70"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                            {slide.title}
                          </h4>
                          {slide.description && (
                            <p className="text-xs text-white/50 mt-2 font-light line-clamp-2">
                              {slide.description}
                            </p>
                          )}
                        </div>

                        {/* Slide Card Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <button
                            onClick={() => toggleSlideShow(idx)}
                            className="text-xs text-white/40 hover:text-white flex items-center gap-1.5 cursor-pointer"
                          >
                            {isVisible ? <Eye className="w-3.5 h-3.5 text-green-400" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
                            <span>{isVisible ? "Active on Hero" : "Hidden"}</span>
                          </button>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openSlideModal(slide, idx)}
                              className="px-3 py-1.5 bg-black border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                            >
                              Edit Slide
                            </button>
                            <button
                              onClick={() => deleteSlide(idx)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ────────────────── TAB 2: AUDIENCE MATRIX EDITOR ────────────────── */}
          {activeTab === "matrix" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-[#141416]/50 p-4 rounded-xl border border-white/5">
                <div>
                  <h3 className="text-sm font-bold uppercase text-white">Interactive Capability Columns</h3>
                  <p className="text-xs text-white/40">These expanding columns form the interactive capability showcase below the main banner.</p>
                </div>
                <button
                  onClick={() => openMatrixModal()}
                  className="px-4 py-2 bg-white text-[#0A0A0B] uppercase text-[10px] font-black rounded-lg hover:bg-[#FFFF00] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Matrix Column
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {heroConfig.matrix.map((card, idx) => {
                  const isVisible = card.show !== false;
                  return (
                    <div 
                      key={card.id || idx} 
                      className="bg-[#141416] rounded-[24px] border border-white/10 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden"
                      style={{ borderLeftColor: card.color, borderLeftWidth: "6px" }}
                    >
                      {/* Background Media Thumbnail */}
                      <div className="flex gap-4 items-start">
                        <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 shrink-0 overflow-hidden relative">
                          {card.image ? (
                            <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        <div className="flex-grow space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                              Column #{idx + 1}
                            </span>
                            
                            {/* Colors Indicator Swatches */}
                            <div className="flex items-center gap-1.5 border border-white/10 bg-black/40 px-2 py-1 rounded-full">
                              <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: card.color }} title={`BG: ${card.color}`} />
                              <span className="text-[9px] text-white/40 uppercase font-mono">{card.color}</span>
                            </div>
                          </div>

                          <h4 className="text-xl font-bold uppercase text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                            {card.title}
                          </h4>

                          <p className="text-xs text-white/50 font-light line-clamp-2">
                            {card.desc}
                          </p>
                        </div>
                      </div>

                      {/* Header Display Preview Box */}
                      <div 
                        className="p-4 rounded-xl border border-white/10 font-bold text-xs uppercase whitespace-pre-line tracking-tight flex justify-between items-center"
                        style={{ backgroundColor: card.color, color: card.textColor }}
                      >
                        <span>{card.heading || card.title}</span>
                        <span className="text-[10px] border border-current px-2 py-0.5 rounded-full opacity-80">{card.buttonText || "Explore Capabilities"}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleMatrixShow(idx)}
                            className="text-xs text-white/40 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            {isVisible ? <Eye className="w-3.5 h-3.5 text-green-400" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
                            <span>{isVisible ? "Active" : "Hidden"}</span>
                          </button>

                          <div className="flex gap-1 border-l border-white/10 pl-2">
                            <button
                              onClick={() => moveMatrix(idx, "up")}
                              disabled={idx === 0}
                              className="p-1 hover:text-[#FFFF00] disabled:opacity-20 text-white/60"
                              title="Move Left/Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveMatrix(idx, "down")}
                              disabled={idx === heroConfig.matrix.length - 1}
                              className="p-1 hover:text-[#FFFF00] disabled:opacity-20 text-white/60"
                              title="Move Right/Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => openMatrixModal(card, idx)}
                            className="px-3 py-1.5 bg-black border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                          >
                            Edit Card
                          </button>
                          <button
                            onClick={() => deleteMatrix(idx)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ────────────────── TAB 3: CLIENT MARQUEE EDITOR ────────────────── */}
          {activeTab === "marquee" && (
            <div className="bg-[#141416] p-8 rounded-[24px] border border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold uppercase text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Client Marquee Ticker Items
                </h3>
                <p className="text-xs text-white/40 mt-1">
                  Manage client names and partners scrolling in the infinite marquee strip below the hero slides.
                </p>
              </div>

              {/* Add New Item */}
              <div className="flex gap-3 max-w-xl">
                <input
                  type="text"
                  placeholder="Enter client name (e.g. Aurelia Durand Group)"
                  value={newMarqueeInput}
                  onChange={(e) => setNewMarqueeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addMarqueeItem();
                    }
                  }}
                  className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={addMarqueeItem}
                  className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] font-extrabold text-xs uppercase rounded-xl hover:bg-white transition-colors cursor-pointer"
                >
                  Add Client
                </button>
              </div>

              {/* Items List Pills */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                {(heroConfig.marquee || []).map((clientName, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 bg-[#0A0A0B] border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-white group hover:border-[#FFFF00]/50"
                  >
                    <span>{clientName}</span>
                    <button
                      type="button"
                      onClick={() => removeMarqueeItem(idx)}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ────────────────── SLIDESHOW EDIT MODAL ────────────────── */}
      {editingSlide !== null || (slideForm.id && activeTab === "slideshow" && editingSlide === null && slideForm.title === "NEW HERO SLIDE") ? (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              {editingSlide !== null ? "Edit Hero Slide" : "Add New Hero Slide"}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Slide Title</label>
                  <input 
                    type="text" 
                    value={slideForm.title} 
                    onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })} 
                    placeholder="e.g. SPACE DESIGN" 
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-bold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Category Badge</label>
                  <input 
                    type="text" 
                    value={slideForm.category} 
                    onChange={(e) => setSlideForm({ ...slideForm, category: e.target.value })} 
                    placeholder="e.g. Physical Space" 
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" 
                  />
                </div>
              </div>

              {/* IMAGE UPLOADER FOR SLIDE */}
              <div className="space-y-2 border-t border-b border-white/5 py-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#FFFF00]" /> Hero Slide Background Image
                  </label>
                  <button
                    type="button"
                    onClick={() => setSlideUrlInputMode(!slideUrlInputMode)}
                    className="text-[10px] text-[#FFFF00] hover:underline cursor-pointer"
                  >
                    {slideUrlInputMode ? "Use File Upload" : "Paste Image URL"}
                  </button>
                </div>

                {slideUrlInputMode ? (
                  <input 
                    type="text" 
                    value={slideForm.src} 
                    onChange={(e) => setSlideForm({ ...slideForm, src: e.target.value })} 
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" 
                  />
                ) : (
                  <div className="space-y-3">
                    {/* Drag and Drop Box */}
                    <label className="border-2 border-dashed border-white/15 hover:border-[#FFFF00]/50 bg-[#0A0A0B] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleSlideImageUpload(e.target.files[0]);
                          }
                        }} 
                        className="hidden" 
                      />
                      <Upload className="w-8 h-8 text-white/40 group-hover:text-[#FFFF00] transition-colors mb-2" />
                      <p className="text-xs text-white font-semibold">Click to upload image file from computer</p>
                      <p className="text-[10px] text-white/30 mt-1">PNG, JPG, WEBP, or SVG formats supported</p>
                    </label>
                  </div>
                )}

                {/* Thumbnail Preview */}
                {slideForm.src && (
                  <div className="relative h-32 w-full rounded-xl overflow-hidden border border-white/10 mt-3 bg-black">
                    <img src={slideForm.src} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSlideForm({ ...slideForm, src: "" })}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-500 text-white rounded-lg text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Subtitle / Description</label>
                <textarea 
                  rows={2} 
                  value={slideForm.description || ""} 
                  onChange={(e) => setSlideForm({ ...slideForm, description: e.target.value })} 
                  placeholder="Optional slide overview text" 
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" 
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={slideForm.show !== false} 
                  onChange={(e) => setSlideForm({ ...slideForm, show: e.target.checked })} 
                  className="w-4 h-4 rounded accent-[#FFFF00]" 
                />
                <span>Active and visible on Hero Slideshow</span>
              </label>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
              <button 
                type="button" 
                onClick={() => setEditingSlide(null)} 
                className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={saveSlideModal} 
                className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl"
              >
                Save Slide
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ────────────────── MATRIX EDIT MODAL ────────────────── */}
      {editingMatrix !== null || (matrixForm.id && activeTab === "matrix" && editingMatrix === null && matrixForm.title === "NEW CAPABILITY") ? (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              {editingMatrix !== null ? "Edit Matrix Column" : "Add Matrix Column"}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Column Title</label>
                  <input 
                    type="text" 
                    value={matrixForm.title} 
                    onChange={(e) => setMatrixForm({ ...matrixForm, title: e.target.value })} 
                    placeholder="e.g. SPACE DESIGN" 
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-bold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Button Label</label>
                  <input 
                    type="text" 
                    value={matrixForm.buttonText || "Explore Capabilities"} 
                    onChange={(e) => setMatrixForm({ ...matrixForm, buttonText: e.target.value })} 
                    placeholder="e.g. Explore Capabilities" 
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Display Heading (Line breaks allowed)</label>
                <textarea 
                  rows={2} 
                  value={matrixForm.heading} 
                  onChange={(e) => setMatrixForm({ ...matrixForm, heading: e.target.value })} 
                  placeholder={"SPACE\nDESIGN"} 
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Description Paragraph</label>
                <textarea 
                  rows={2} 
                  value={matrixForm.desc} 
                  onChange={(e) => setMatrixForm({ ...matrixForm, desc: e.target.value })} 
                  placeholder="We design physical environments..." 
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none" 
                />
              </div>

              {/* COLOR SELECTION */}
              <div className="space-y-2 border-t border-b border-white/5 py-4">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Card Background Color Presets</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.bg}
                      type="button"
                      onClick={() => setMatrixForm({ ...matrixForm, color: p.bg, textColor: p.text })}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                        matrixForm.color === p.bg ? "border-[#FFFF00] bg-white/10" : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: p.bg }} />
                      <span className="text-[10px] text-white/80 font-bold truncate">{p.label}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold">Custom BG Color</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={matrixForm.color} 
                        onChange={(e) => setMatrixForm({ ...matrixForm, color: e.target.value })} 
                        className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        value={matrixForm.color} 
                        onChange={(e) => setMatrixForm({ ...matrixForm, color: e.target.value })} 
                        className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-lg px-3 py-1 text-xs text-white uppercase font-mono" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-bold">Custom Text Color</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={matrixForm.textColor} 
                        onChange={(e) => setMatrixForm({ ...matrixForm, textColor: e.target.value })} 
                        className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        value={matrixForm.textColor} 
                        onChange={(e) => setMatrixForm({ ...matrixForm, textColor: e.target.value })} 
                        className="flex-grow bg-[#0A0A0B] border border-white/10 rounded-lg px-3 py-1 text-xs text-white uppercase font-mono" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* IMAGE UPLOADER FOR MATRIX */}
              <div className="space-y-2 pb-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#FFFF00]" /> Column Image Attachment
                  </label>
                  <button
                    type="button"
                    onClick={() => setMatrixUrlInputMode(!matrixUrlInputMode)}
                    className="text-[10px] text-[#FFFF00] hover:underline cursor-pointer"
                  >
                    {matrixUrlInputMode ? "Use File Upload" : "Paste Image URL"}
                  </button>
                </div>

                {matrixUrlInputMode ? (
                  <input 
                    type="text" 
                    value={matrixForm.image} 
                    onChange={(e) => setMatrixForm({ ...matrixForm, image: e.target.value })} 
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" 
                  />
                ) : (
                  <label className="border-2 border-dashed border-white/15 hover:border-[#FFFF00]/50 bg-[#0A0A0B] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleMatrixImageUpload(e.target.files[0]);
                        }
                      }} 
                      className="hidden" 
                    />
                    <Upload className="w-8 h-8 text-white/40 group-hover:text-[#FFFF00] transition-colors mb-2" />
                    <p className="text-xs text-white font-semibold">Click to upload column image file</p>
                  </label>
                )}

                {/* Image Preview */}
                {matrixForm.image && (
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-white/10 mt-3 bg-black">
                    <img src={matrixForm.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setMatrixForm({ ...matrixForm, image: "" })}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-500 text-white rounded-lg text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
              <button 
                type="button" 
                onClick={() => setEditingMatrix(null)} 
                className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={saveMatrixModal} 
                className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl"
              >
                Save Column
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
