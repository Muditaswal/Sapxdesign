import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { api } from "../../services/api";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";

interface Project {
  id: string;
  name: string;
  slug: string;
  project_type: string;
  category: string;
  year: number;
  cover_image: string;
  description: string;
}

export default function Portfolios() {
  const { category } = useParams<{ category: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Format parameter key into clean DB category filter
  const getDBCategory = (param: string) => {
    switch (param.toLowerCase()) {
      case "space-design":
      case "space": return "Space Design";
      case "product-design":
      case "product": return "Product Design";
      case "brand-design":
      case "brand": return "Brand Design";
      case "experience-design":
      case "experience": return "Immersive Design";
      case "architecture": return "Architecture";
      case "interior": return "Interior Design";
      case "research": return "Research";
      default: return "Space Design";
    }
  };

  const getTitle = (param: string) => {
    switch (param.toLowerCase()) {
      case "space-design":
      case "space": return "Space Design Portfolio";
      case "product-design":
      case "product": return "Product Design Portfolio";
      case "brand-design":
      case "brand": return "Brand Design Portfolio";
      case "experience-design":
      case "experience": return "Immersive Design Portfolio";
      case "architecture": return "Architecture Portfolio";
      case "interior": return "Interior Design Portfolio";
      case "research": return "Research & Speculative Portfolio";
      default: return "Studio Portfolio";
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setLoading(true);
    const dbCat = getDBCategory(category || "");

    api.get<Project[]>(`/projects?category=${dbCat}`)
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load portfolio category:", err);
        setLoading(false);
      });
  }, [category]);

  const titleText = getTitle(category || "");
  const seoDesc = `Explore the ${titleText} by Space and Product Studio. We specialize in Architecture Design Studio, Interior Design, and Digital UX/UI Services in India.`;
  const seoSchema = {
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
        "name": titleText,
        "item": `https://sapxdesign.com/portfolio/${category}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <SEO title={`${titleText} | Space and Product Studio`} description={seoDesc} schema={seoSchema} />
      <Navbar showSplash={false} />

      {/* Header Banner */}
      <div className="pt-36 pb-16 px-6 md:px-12 border-b border-white/5 bg-[#141416]/20">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-[#FFFF00] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[3px] bg-[#FFFF00]" />
            <p className="uppercase tracking-[0.3em] text-[#EC0606] text-xs font-bold">Studio Works</p>
          </div>
          <h1 className="text-[36px] md:text-[64px] font-extrabold uppercase leading-none tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {getTitle(category || "")}
          </h1>
          <p className="text-white/40 mt-4 max-w-[600px] text-sm md:text-base font-light leading-relaxed">
            Explorations in architectural geometry, product longevity, and human interaction systems. Curated by the studio.
          </p>
        </div>
      </div>

      {/* Portfolio Grid */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 flex-grow w-full">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-[#141416]/20 rounded-[30px] border border-white/5">
            <p className="text-white/40 text-lg mb-6">No projects published in this portfolio category yet.</p>
            <Link to="/" className="px-6 py-2.5 border border-white/20 text-white uppercase tracking-widest text-xs rounded-full hover:border-[#FFFF00] hover:text-[#FFFF00] transition-colors">
              Return Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                to={`/projects/${proj.slug}`}
                className="group flex flex-col block text-left"
              >
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] border border-white/5 group-hover:border-[#EC0606] transition-colors duration-300">
                  <img
                    src={proj.cover_image || "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080"}
                    alt={proj.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-6">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#EC0606] rounded-full">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-start justify-between px-2">
                  <div>
                    <h3 className="text-xl uppercase font-bold text-white group-hover:text-[#FFFF00] transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {proj.name}
                    </h3>
                    <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">{proj.project_type}</p>
                  </div>
                  <span className="text-white/30 text-xs font-semibold mt-1">{proj.year}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
