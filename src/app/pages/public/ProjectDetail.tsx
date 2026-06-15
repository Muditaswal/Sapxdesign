import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Briefcase, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
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
}

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
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load project details:", err);
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
  const displayImages = heroImages.length > 0 
    ? heroImages 
    : [{ id: 'cover', image_url: project.cover_image || "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080", caption: "Cover Image", image_type: "hero" }];
  const galleryImages = allImages.filter(img => img.image_type === "gallery" || img.image_type === "process")
    .sort((a, b) => (a.image_order ?? a.sort_order ?? 0) - (b.image_order ?? b.sort_order ?? 0));

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
      setGalleryIndex((prev) => (prev + 1) % displayImages.length);
    } else if (isRightSwipe) {
      setGalleryIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setGalleryIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setGalleryIndex((prev) => (prev + 1) % displayImages.length);
  };

  const seoTitle = project 
    ? `${project.name} | ${project.project_type} Case Study | Space and Product Studio`
    : "Project Case Study | Space and Product Studio";
  const seoDesc = project
    ? `Explore our project ${project.name}, a detailed case study in ${project.project_type}. ${project.description?.slice(0, 120)}...`
    : "Read trans-disciplinary spatial and digital design case studies by Space and Product Studio.";
  
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
      <SEO title={seoTitle} description={seoDesc} schema={seoSchema} ogImage={project?.cover_image} />
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
            <img
              src={displayImages[galleryIndex].image_url}
              alt={displayImages[galleryIndex].caption || `${project.name} - ${project.project_type} Case Study`}
              width={1200}
              height={800}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
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
        {displayImages.length > 1 && (
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
          {displayImages[galleryIndex]?.caption && (
            <p className="text-white/60 text-xs mt-2 italic tracking-wide">
              {displayImages[galleryIndex].caption}
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {displayImages.length > 1 && (
        <div className="bg-[#0A0A0B] py-4 px-6 md:px-12 border-b border-white/10 overflow-x-auto flex justify-center gap-3 select-none">
          {displayImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setGalleryIndex(idx)}
              className={`relative h-12 w-20 md:h-16 md:w-28 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 border-2 cursor-pointer ${
                idx === galleryIndex ? "border-[#FFFF00] scale-105" : "border-white/10 opacity-40 hover:opacity-100"
              }`}
            >
              <img 
                src={img.image_url} 
                alt={`${project.name} thumbnail selection ${idx + 1}`} 
                loading="lazy"
                width={112}
                height={64}
                className="w-full h-full object-cover" 
              />
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
              <span>{project.name} ({galleryIndex + 1} / {displayImages.length})</span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="flex-grow flex items-center justify-center relative w-full h-full max-h-[80vh]">
              {displayImages.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-6 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#FFFF00] hover:text-[#0A0A0B] transition-colors cursor-pointer z-10 hidden md:block"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <img
                src={displayImages[galleryIndex].image_url}
                alt={`${project.name} fullscreen view`}
                width={1600}
                height={1200}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />

              {displayImages.length > 1 && (
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
              {displayImages[galleryIndex]?.caption || "Design Presentation Layout"}
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
              <p className="text-sm leading-relaxed text-white/50 font-medium">
                {roleSection?.content || "Design & Execution Supervision"}
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Core Deliverables
              </h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFFF00] rounded-full" /> Spatial Design System
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFFF00] rounded-full" /> Technical Drawings & DDLs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFFF00] rounded-full" /> Materials Selection & Prototyping
                </li>
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

      <Footer />
    </div>
  );
}
