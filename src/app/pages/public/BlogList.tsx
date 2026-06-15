import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { api } from "../../services/api";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  published_at?: string;
  category?: {
    name: string;
  };
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = "Blog & Insights | Space and Product Studio";
    api.get<BlogPost[]>("/posts")
      .then((data) => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blog posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
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
            <p className="uppercase tracking-[0.3em] text-[#EC0606] text-xs font-bold">Studio Insights</p>
          </div>
          <h1 className="text-[36px] md:text-[64px] font-extrabold uppercase leading-none tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            The Blog
          </h1>
          <p className="text-white/40 mt-4 max-w-[600px] text-sm md:text-base font-light leading-relaxed">
            Essays on architectural systems, material restrains, interface metaphors, and creative explorations.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 flex-grow w-full">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-[#141416]/20 rounded-[30px] border border-white/5">
            <p className="text-white/40 text-lg mb-6">No articles published yet.</p>
            <Link to="/" className="px-6 py-2.5 border border-white/20 text-white uppercase tracking-widest text-xs rounded-full hover:border-[#FFFF00] hover:text-[#FFFF00] transition-colors">
              Return Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex flex-col block text-left"
              >
                <div className="relative overflow-hidden rounded-[30px] aspect-[16/9] border border-white/5 group-hover:border-[#EC0606] transition-colors duration-300">
                  <img
                    src={post.cover_image || "https://images.unsplash.com/photo-1658232190602-be6cd5b976f1?q=80&w=1080"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end p-6">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#EC0606] rounded-full">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col gap-2 px-2">
                  <div className="flex items-center gap-3 text-xs text-white/40 uppercase tracking-widest font-semibold">
                    <span className="text-[#FFFF00]">{post.category?.name || "General"}</span>
                    <span>&bull;</span>
                    <span>
                      {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "Draft"}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl uppercase font-bold text-white group-hover:text-[#FFFF00] transition-colors mt-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-white/50 text-sm md:text-base mt-2 font-light leading-relaxed max-w-[550px]">
                      {post.excerpt}
                    </p>
                  )}
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
