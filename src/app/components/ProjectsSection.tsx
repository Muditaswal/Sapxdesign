import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";
import { api } from "../services/api";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  images?: any[];
  description: string;
  span: "normal" | "tall" | "wide";
  slug: string;
}

const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Haus am See",
    category: "Space Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080",
    description: "A lakeside residence that merges concrete minimalism with the natural landscape.",
    span: "tall",
    slug: "haus-am-see"
  },
  {
    id: "2",
    title: "Maison Lumiere",
    category: "Space Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1768488314310-3742b3c75579?q=80&w=1080",
    description: "A Parisian apartment transformed through material restraint and spatial generosity.",
    span: "normal",
    slug: "maison-lumiere"
  },
  {
    id: "3",
    title: "Forma Chair",
    category: "Product Design",
    year: "2023",
    image: "https://images.unsplash.com/photo-1551907234-fb773fb08a2a?q=80&w=1080",
    description: "A dining chair that expresses its construction.",
    span: "normal",
    slug: "forma-chair"
  }
];

function ProjectCardSlideshow({
  images,
  defaultImage,
  title
}: {
  images: any[];
  defaultImage: string;
  title: string;
}) {
  const slideshowImages = images && images.length > 0
    ? images.filter(img => img.is_featured_homepage === true || img.image_type === 'hero')
    : [];

  const finalImages = slideshowImages.length > 0 
    ? slideshowImages 
    : (images && images.length > 0 ? images : [{ id: 'default', image_url: defaultImage }]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (finalImages.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % finalImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [finalImages.length, isHovered]);

  const activeImage = finalImages[currentIndex] || finalImages[0];

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeImage.image_url || activeImage.image || defaultImage}
            alt={`${title} Project Case Study | Space and Product Studio`}
            loading="lazy"
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {finalImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
          {finalImages.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-[#FFFF00] scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const categories = ["All", "Space Design", "Product Design", "Brand Design", "Experience Design"];

export function ProjectsSection() {
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.get<any[]>("/projects")
      .then((data) => {
        if (data && data.length > 0) {
          const spans: ("normal" | "tall" | "wide")[] = ["tall", "normal", "normal", "wide", "tall", "normal"];
          const mapped: Project[] = data.map((item, index) => ({
            id: item.id,
            title: item.name,
            category: item.project_type || item.category || "Architecture",
            year: item.year ? String(item.year) : String(new Date(item.created_at).getFullYear()),
            image: item.cover_image || "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080",
            images: item.images || [],
            description: item.description || "",
            span: spans[index % spans.length],
            slug: item.slug
          }));
          setDbProjects(mapped);
        } else {
          setDbProjects(fallbackProjects);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch projects from API, using fallback projects:", err);
        setDbProjects(fallbackProjects);
      });
  }, []);

  const filteredProjects = dbProjects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="works" className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden bg-[#0A0A0B]">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[3px] bg-[#FFFF00]" />
              <p
                className="uppercase tracking-[0.3em] text-white/40 text-[12px]"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
              >
                Selected Works
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="text-[13px] tracking-[0.05em] transition-all duration-200 px-4 py-2 cursor-pointer rounded-full"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: filter === cat ? 700 : 400,
                    color: filter === cat ? "#0A0A0B" : "rgba(255,255,255,0.4)",
                    backgroundColor: filter === cat ? "#FFFF00" : "transparent",
                    border: filter === cat ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={
                project.span === "wide"
                  ? "md:col-span-2"
                  : ""
              }
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group w-full text-left cursor-pointer block"
              >
                {/* Red border on hover */}
                <div
                  className={`relative overflow-hidden rounded-3xl border-4 border-transparent group-hover:border-[#EC0606] transition-colors duration-300 ${
                    project.span === "tall"
                      ? "aspect-[3/3.5]"
                      : project.span === "wide"
                      ? "aspect-[16/7]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <ProjectCardSlideshow
                    images={project.images || []}
                    defaultImage={project.image}
                    title={project.title}
                  />
                  {/* Hover overlay */}
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
                    <h3
                      className="text-[24px] md:text-[28px] tracking-[-0.02em] text-white uppercase"
                      style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="inline-block px-3 py-1 text-[12px] uppercase tracking-[0.1em]"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 600,
                          background: "#0A0A0B",
                          color: "#FFFF00",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-[14px] text-white/35 mt-1"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    {project.year}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}