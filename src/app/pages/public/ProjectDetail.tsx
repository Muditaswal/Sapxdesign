import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Briefcase } from "lucide-react";
import { api } from "../../services/api";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

interface ProjectSection {
  id: string;
  section_type: "hero" | "role" | "process" | "outcome";
  title?: string;
  content?: string;
}

interface ProjectImage {
  id: string;
  image_url: string;
  caption?: string;
  image_type: string;
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
  const galleryImages = project.images?.filter(img => img.image_type === "gallery" || img.image_type === "process") || [];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <Navbar showSplash={false} />

      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-b-[40px]">
        <img
          src={project.cover_image || "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080"}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#EC0606]" />

        {/* Back Link Overlay */}
        <div className="absolute top-32 left-6 md:left-12 z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-[#FFFF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Studio
          </Link>
        </div>

        {/* Project Type Badge */}
        <div className="absolute bottom-8 left-6 md:left-12 max-w-[1400px]">
          <span className="inline-block px-3 py-1 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest font-extrabold text-[10px] mb-3">
            {project.project_type}
          </span>
          <h1 className="text-[36px] md:text-[64px] font-extrabold uppercase leading-none tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {project.name}
          </h1>
        </div>
      </div>

      {/* Meta Specifications Bar */}
      <div className="border-b border-white/10 bg-[#141416]/30 py-6 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((img) => (
                <div key={img.id} className="relative overflow-hidden rounded-3xl aspect-[4/3] group border border-white/5">
                  <img
                    src={img.image_url}
                    alt={img.caption || project.name}
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
