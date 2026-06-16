import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Briefcase, ChevronLeft, ChevronRight, Maximize2, X, ArrowUpRight, Play } from "lucide-react";
import { api } from "../../services/api";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";

interface ProjectSection {
  id: string;
  section_type: "hero" | "role" | "process" | "outcome";
  title?: string;
  content?: string;
}

interface ProjectImage {
  id: string;
  project_id?: string;
  image_url: string;
  caption?: string;
  image_type: string;
  sort_order?: number;
  image_order?: number;
  is_cover?: boolean;
  is_featured_homepage?: boolean;
}

interface ProjectData {
  id: string;
  name: string;
  slug: string;
  project_type: string;
  description?: string;
  budget?: string;
  location?: string;
  year?: number;
  cover_image?: string;
  sections?: ProjectSection[];
  images?: ProjectImage[];
  hero_video?: string;
  hero_caption?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_og_image?: string;
  studio_roles?: string;
  core_deliverables?: string;
  category?: string;
  published?: boolean;
}

const fallbackProjectDetails: Record<string, ProjectData> = {
  "haus-am-see": {
    id: "proj-1",
    name: "Haus am See",
    slug: "haus-am-see",
    project_type: "Space Design",
    description: "A lakeside residence that merges concrete minimalism with the natural landscape. The building emerges from the terrain as if carved by water and wind, creating a dialogue between built form and environment.",
    budget: "$1.5M",
    location: "Bavaria, Germany",
    year: 2024,
    cover_image: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080",
    studio_roles: "Architecture, Landscape Integration, Interior Concept",
    core_deliverables: "Spatial Design System, Technical Drawings & DDLs, Materials Selection & Prototyping",
    category: "Space Design",
    sections: [
      { id: "sec-1", section_type: "hero", title: "Overview", content: "A lakeside residence that merges concrete minimalism with the natural landscape. The building emerges from the terrain as if carved by water and wind, creating a dialogue between built form and environment." },
      { id: "sec-2", section_type: "role", title: "Our Role", content: "Architecture, Landscape Integration, Interior Concept" },
      { id: "sec-3", section_type: "process", title: "Process", content: "Beginning with extensive site analysis, we mapped seasonal light patterns and water levels over 18 months." },
      { id: "sec-4", section_type: "outcome", title: "Outcome", content: "A 320m² residence that achieved passive house certification while maintaining an uncompromising architectural vision." }
    ],
    images: [
      { id: "img-1", image_url: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080", caption: "Lakeside facade view", image_type: "hero", sort_order: 0 },
      { id: "img-2", image_url: "https://images.unsplash.com/photo-1695067440629-b5e513976100?q=80&w=1080", caption: "Interior concrete living area", image_type: "gallery", sort_order: 1 },
      { id: "img-3", image_url: "https://images.unsplash.com/photo-1668089677938-b52086753f77?q=80&w=1080", caption: "Material palette details", image_type: "process", sort_order: 2 }
    ]
  },
  "maison-lumiere": {
    id: "proj-2",
    name: "Maison Lumiere",
    slug: "maison-lumiere",
    project_type: "Space Design",
    description: "A Parisian apartment transformed through material restraint and spatial generosity.",
    budget: "$800K",
    location: "Paris, France",
    year: 2024,
    cover_image: "https://images.unsplash.com/photo-1768488314310-3742b3c75579?q=80&w=1080",
    studio_roles: "Interior Architecture, Furniture Curation, Lighting Design",
    core_deliverables: "Custom Millwork Design, Furniture Curation, Lighting Layouts",
    category: "Space Design",
    sections: [
      { id: "sec-5", section_type: "hero", title: "Overview", content: "A Parisian apartment transformed through material restraint and spatial generosity. Natural light is guided deep into the floorplan via reflective surfaces and open sightlines." },
      { id: "sec-6", section_type: "role", title: "Our Role", content: "Interior Architecture, Furniture Curation, Lighting Design" },
      { id: "sec-7", section_type: "process", title: "Process", content: "We removed non-load-bearing walls to restore the apartment's original 19th-century volume while introducing modern utilities." },
      { id: "sec-8", section_type: "outcome", title: "Outcome", content: "A serene, light-filled sanctuary in the heart of Paris that feels both historically grounded and thoroughly modern." }
    ],
    images: [
      { id: "img-4", image_url: "https://images.unsplash.com/photo-1768488314310-3742b3c75579?q=80&w=1080", caption: "Main living room view", image_type: "hero", sort_order: 0 },
      { id: "img-5", image_url: "https://images.unsplash.com/photo-1695067440629-b5e513976100?q=80&w=1080", caption: "Custom kitchen detail", image_type: "gallery", sort_order: 1 }
    ]
  },
  "forma-chair": {
    id: "proj-3",
    name: "Forma Chair",
    slug: "forma-chair",
    project_type: "Product Design",
    description: "A dining chair that expresses its construction, balancing geometric clarity with physical comfort.",
    budget: "$50K",
    location: "Milan, Italy",
    year: 2023,
    cover_image: "https://images.unsplash.com/photo-1551907234-fb773fb08a2a?q=80&w=1080",
    studio_roles: "Industrial Design, Prototyping, Manufacturing Liaison",
    core_deliverables: "3D CAD Models, Functional Prototypes, Production Specification",
    category: "Product Design",
    sections: [
      { id: "sec-9", section_type: "hero", title: "Overview", content: "A dining chair that expresses its construction. Balancing geometric clarity with ergonomic comfort, the chair is constructed from solid ash and CNC-milled joints." },
      { id: "sec-10", section_type: "role", title: "Our Role", content: "Industrial Design, Prototyping, Manufacturing Liaison" },
      { id: "sec-11", section_type: "process", title: "Process", content: "Over 20 physical scale models were built to test joint durability and seating angles for maximum comfort." },
      { id: "sec-12", section_type: "outcome", title: "Outcome", content: "Launched at Milan Design Week, the chair is now in serial production with a leading European manufacturer." }
    ],
    images: [
      { id: "img-6", image_url: "https://images.unsplash.com/photo-1551907234-fb773fb08a2a?q=80&w=1080", caption: "Forma Chair in Ash wood", image_type: "hero", sort_order: 0 },
      { id: "img-7", image_url: "https://images.unsplash.com/photo-1668089677938-b52086753f77?q=80&w=1080", image_type: "gallery", sort_order: 1 }
    ]
  }
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!slug) return;

    api.get<ProjectData>(`/projects/${slug}`)
      .then((data) => {
        if (data) {
          setProject(data);
        } else if (fallbackProjectDetails[slug]) {
          setProject(fallbackProjectDetails[slug]);
        } else {
          setProject(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load project details:", err);
        if (fallbackProjectDetails[slug]) {
          setProject(fallbackProjectDetails[slug]);
        } else {
          setProject(null);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0B] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0B] text-white px-6 text-center">
        <h2 className="text-[32px] font-extrabold uppercase mb-4 tracking-wider" style={{ fontFamily: "'Syne', sans-serif" }}>Project Not Found</h2>
        <p className="text-white/50 mb-8">The project you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-6 py-3 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest font-bold rounded-full text-xs">Back to Studio</Link>
      </div>
    );
  }

  // Filter sections by type
  const overviewSection = project.sections?.find(s => s.section_type === "hero");
  const roleSection = project.sections?.find(s => s.section_type === "role");
  const processSection = project.sections?.find(s => s.section_type === "process");
  const outcomeSection = project.sections?.find(s => s.section_type === "outcome");
  const allImages = project.images || [];
  const heroImages = allImages.filter(img => img.image_type === "hero")
    .sort((a, b) => (a.sort_order ?? a.image_order ?? 0) - (b.sort_order ?? b.image_order ?? 0));
  const baseImages = heroImages.length > 0 
    ? heroImages 
    : [{ id: 'cover', image_url: project.cover_image || "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080", caption: "Cover Image", image_type: "hero" }];
  const galleryImages = allImages.filter(img => img.image_type === "gallery" || img.image_type === "process")
    .sort((a, b) => (a.image_order ?? a.sort_order ?? 0) - (b.image_order ?? b.sort_order ?? 0));

  interface MediaItem {
    id: string;
    image_url?: string;
    video_url?: string;
    caption?: string;
    image_type?: string;
    is_video: boolean;
  }

  const displayMedia: MediaItem[] = [];
  if (project.hero_video) {
    displayMedia.push({
      id: 'video',
      video_url: project.hero_video,
      caption: project.hero_caption || "Project Video Presentation",
      is_video: true
    });
  }
  displayMedia.push(...baseImages.map(img => ({
    id: img.id,
    image_url: img.image_url,
    caption: img.caption,
    image_type: img.image_type,
    is_video: false
  })));

  let parsedRoles: string[] = [];
  if (project.studio_roles) {
    if (Array.isArray(project.studio_roles)) {
      parsedRoles = project.studio_roles;
    } else {
      try {
        const parsed = JSON.parse(project.studio_roles);
        parsedRoles = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        parsedRoles = typeof project.studio_roles === "string"
          ? project.studio_roles.split(",").map(r => r.trim())
          : [];
      }
    }
  }
  if (parsedRoles.length === 0) {
    parsedRoles = roleSection?.content ? [roleSection.content] : ["Design & Execution Supervision"];
  }

  let parsedDeliverables: string[] = [];
  if (project.core_deliverables) {
    if (Array.isArray(project.core_deliverables)) {
      parsedDeliverables = project.core_deliverables;
    } else {
      try {
        const parsed = JSON.parse(project.core_deliverables);
        parsedDeliverables = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        parsedDeliverables = typeof project.core_deliverables === "string"
          ? project.core_deliverables.split(",").map(d => d.trim())
          : [];
      }
    }
  }
  if (parsedDeliverables.length === 0) {
    parsedDeliverables = [
      "Spatial Design System",
      "Technical Drawings & DDLs",
      "Materials Selection & Prototyping"
    ];
  }

  const [relatedProjects, setRelatedProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    if (!project) return;
    
    api.get<ProjectData[]>("/projects")
      .then((allProjects) => {
        const publishedProjects = Array.isArray(allProjects)
          ? allProjects.filter(p => p.published !== false)
          : [];
        const currentCategory = project.category || project.project_type;
        
        let filtered = publishedProjects.filter(
          p => p.id !== project.id && (p.category === currentCategory || p.project_type === currentCategory)
        );
        
        filtered = filtered.sort(() => 0.5 - Math.random());
        
        if (filtered.length < 4) {
          const fillCount = 4 - filtered.length;
          const otherProjects = publishedProjects.filter(
            p => p.id !== project.id && !filtered.some(f => f.id === p.id)
          );
          const sortedOthers = otherProjects.sort((a, b) => (b.year || 0) - (a.year || 0));
          filtered = [...filtered, ...sortedOthers.slice(0, fillCount)];
        }
        
        setRelatedProjects(filtered.slice(0, 4));
      })
      .catch((err) => {
        console.error("Failed to fetch related projects:", err);
      });
  }, [project]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setGalleryIndex((prev) => (prev + 1) % displayMedia.length);
    } else if (isRightSwipe) {
      setGalleryIndex((prev) => (prev - 1 + displayMedia.length) % displayMedia.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setGalleryIndex((prev) => (prev - 1 + displayMedia.length) % displayMedia.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setGalleryIndex((prev) => (prev + 1) % displayMedia.length);
  };

  const seoTitle = project.meta_title || `${project.name} | ${project.project_type} Case Study | Space and Product Studio`;
  const seoDesc = project.meta_description || `Explore our project ${project.name}, a detailed case study in ${project.project_type}. ${project.description?.slice(0, 120)}...`;
  const seoKeywords = project.meta_keywords || undefined;
  const seoOgImage = project.meta_og_image || project.cover_image;
  
  const seoSchema = project ? [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sapxdesign.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": "https://sapxdesign.com/#works"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": project.name,
          "item": `https://sapxdesign.com/projects/${project.slug}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.name,
      "description": project.description,
      "image": project.cover_image,
      "creator": {
        "@type": "Organization",
        "name": "Space and Product Studio"
      }
    }
  ] : [];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <SEO title={seoTitle} description={seoDesc} keywords={seoKeywords} schema={seoSchema} ogImage={seoOgImage} />
      <Navbar showSplash={false} />

      {/* Hero Gallery Section */}
      <div 
        className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[70vh] xl:h-[75vh] overflow-hidden rounded-b-[40px] bg-black select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={galleryIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            {displayMedia[galleryIndex]?.is_video ? (
              <video
                src={displayMedia[galleryIndex].video_url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={displayMedia[galleryIndex]?.image_url}
                alt={displayMedia[galleryIndex]?.caption || `${project.name} - ${project.project_type} Case Study`}
                width={1200}
                height={800}
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#EC0606] z-10" />

        {/* Back Link Overlay */}
        <div className="absolute top-32 left-6 md:left-12 z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-[#FFFF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Studio
          </Link>
        </div>

        {/* Next/Prev Controls */}
        {displayMedia.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/45 border border-white/10 hover:bg-[#FFFF00] hover:text-[#0A0A0B] transition-colors z-20 text-white cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/45 border border-white/10 hover:bg-[#FFFF00] hover:text-[#0A0A0B] transition-colors z-20 text-white cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Fullscreen Maximize button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute right-4 top-32 p-3 bg-black/45 border border-white/10 hover:bg-[#FFFF00] hover:text-[#0A0A0B] rounded-full z-20 text-white transition-colors cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Project Type Badge */}
        <div className="absolute bottom-8 left-6 md:left-12 max-w-[1400px] z-10">
          <span className="inline-block px-3 py-1 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest font-extrabold text-[10px] mb-3">
            {project.project_type}
          </span>
          <h1 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-extrabold uppercase leading-none tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {project.name}
          </h1>
          {displayMedia[galleryIndex]?.caption && (
            <p className="text-white/60 text-xs mt-2 italic tracking-wide">
              {displayMedia[galleryIndex].caption}
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {displayMedia.length > 1 && (
        <div className="bg-[#0A0A0B] py-4 px-6 md:px-12 border-b border-white/10 overflow-x-auto flex justify-center gap-3 select-none">
          {displayMedia.map((media, idx) => (
            <button
              key={media.id}
              onClick={() => setGalleryIndex(idx)}
              className={`relative h-12 w-20 md:h-16 md:w-28 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 border-2 cursor-pointer ${
                idx === galleryIndex ? "border-[#FFFF00] scale-105" : "border-white/10 opacity-40 hover:opacity-100"
              }`}
            >
              {media.is_video ? (
                <div className="relative w-full h-full bg-[#141416]">
                  <img 
                    src={project.cover_image || baseImages[0]?.image_url} 
                    alt="" 
                    className="w-full h-full object-cover opacity-60" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white border border-white/10">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={media.image_url} 
                  alt={`${project.name} thumbnail selection ${idx + 1}`} 
                  loading="lazy"
                  width={112}
                  height={64}
                  className="w-full h-full object-cover" 
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Viewer Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top controls bar */}
            <div className="flex justify-between items-center w-full text-white/60 text-xs tracking-widest font-semibold uppercase">
              <span>{project.name} ({galleryIndex + 1} / {displayMedia.length})</span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="flex-grow flex items-center justify-center relative w-full h-full max-h-[80vh]">
              {displayMedia.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-6 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#FFFF00] hover:text-[#0A0A0B] transition-colors cursor-pointer z-10 hidden md:block"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {displayMedia[galleryIndex]?.is_video ? (
                <video
                  src={displayMedia[galleryIndex].video_url}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />
              ) : (
                <img
                  src={displayMedia[galleryIndex]?.image_url}
                  alt={`${project.name} fullscreen view`}
                  width={1600}
                  height={1200}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />
              )}

              {displayMedia.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-6 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#FFFF00] hover:text-[#0A0A0B] transition-colors cursor-pointer z-10 hidden md:block"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Caption bar */}
            <div className="text-center text-white/50 text-xs italic mb-4">
              {displayMedia[galleryIndex]?.caption || "Design Presentation Layout"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meta Specifications Bar */}
      <div className="border-b border-white/10 bg-[#141416]/30 py-6 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {project.location && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#EC0606]" />
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider">Location</p>
                <p className="font-medium">{project.location}</p>
              </div>
            </div>
          )}
          {project.year && (
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#EC0606]" />
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider">Year Completed</p>
                <p className="font-medium">{project.year}</p>
              </div>
            </div>
          )}
          {project.project_type && (
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#EC0606]" />
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider">Discipline</p>
                <p className="font-medium">{project.project_type}</p>
              </div>
            </div>
          )}
          {project.budget && (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-[#EC0606] font-bold text-lg">$</div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider">Project Value</p>
                <p className="font-medium">{project.budget}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Extensive Details */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#EC0606] mb-4 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Overview
              </h3>
              <p className="text-[16px] md:text-[18px] leading-[1.8] text-white/60 font-light">
                {overviewSection?.content || project.description || "Detailed overview of the studio project."}
              </p>
            </div>

            {processSection && (
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-[#EC0606] mb-4 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {processSection.title || "The Process"}
                </h3>
                <p className="text-[15px] leading-[1.7] text-white/50">
                  {processSection.content}
                </p>
              </div>
            )}

            {outcomeSection && (
              <div className="bg-[#141416]/50 p-8 rounded-3xl border border-white/5">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[#FFFF00] mb-4 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {outcomeSection.title || "Project Outcome"}
                </h3>
                <p className="text-[15px] leading-[1.7] text-white/70">
                  {outcomeSection.content}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Roles & Deliverables */}
          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-12 space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#EC0606] mb-4 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Studio Role
              </h3>
              <ul className="space-y-2 text-sm text-white/60">
                {parsedRoles.map((role, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#EC0606] rounded-full" /> {role}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Core Deliverables
              </h3>
              <ul className="space-y-3 text-sm text-white/60">
                {parsedDeliverables.map((deliv, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#FFFF00] rounded-full" /> {deliv}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Gallery Images Strip */}
        {galleryImages.length > 0 && (
          <div className="mt-20 pt-16 border-t border-white/10">
            <h3 className="text-xs uppercase tracking-[0.3em] text-[#EC0606] mb-10 font-bold text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Project Media Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {galleryImages.map((img) => (
                <div key={img.id} className="relative overflow-hidden rounded-3xl aspect-[4/3] group border border-white/5">
                  <img
                    src={img.image_url}
                    alt={img.caption || `${project.name} media gallery item`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {img.caption && (
                    <div className="absolute inset-0 bg-black/40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium tracking-wide">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* RELATED PROJECTS SECTION */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-white/10 bg-[#0A0A0B] py-20 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[3px] bg-[#FFFF00]" />
                <p className="uppercase tracking-[0.3em] text-white/40 text-[12px] font-bold animate-pulse" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Related Projects
                </p>
              </div>
              <h2 className="text-[32px] md:text-[40px] font-extrabold uppercase leading-none tracking-tight mb-2 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                Discover more work
              </h2>
              <p className="text-sm text-white/45">
                Discover more work from the same discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.slug}`}
                  className="group w-full text-left cursor-pointer block"
                >
                  <div className="relative overflow-hidden rounded-3xl border-4 border-transparent group-hover:border-[#EC0606] transition-colors duration-300 aspect-[4/3] bg-black">
                    <img
                      src={p.cover_image || "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080"}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-6 md:p-8 rounded-3xl">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#EC0606] rounded-full">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-[20px] md:text-[24px] tracking-[-0.02em] text-white uppercase font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-block px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[#FFFF00] bg-[#0A0A0B] border border-white/10 font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {p.category || p.project_type}
                        </span>
                      </div>
                    </div>
                    <p className="text-[14px] text-white/35 mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {p.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
