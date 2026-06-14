import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Folder } from "lucide-react";
import { api } from "../../services/api";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  category?: {
    name: string;
  };
  tags?: BlogTag[];
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!slug) return;

    api.get<BlogPostData>(`/posts/${slug}`)
      .then((data) => {
        setPost(data);
        setLoading(false);

        // SEO Optimization
        if (data) {
          document.title = data.seo_title || `${data.title} | SAP × DESIGN`;
          
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement("meta");
            metaDesc.setAttribute("name", "description");
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute("content", data.seo_description || data.excerpt || "");
          
          // Open Graph (OG) tags injection
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement("meta");
            ogTitle.setAttribute("property", "og:title");
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute("content", data.seo_title || data.title);

          let ogImage = document.querySelector('meta[property="og:image"]');
          if (!ogImage) {
            ogImage = document.createElement("meta");
            ogImage.setAttribute("property", "og:image");
            document.head.appendChild(ogImage);
          }
          ogImage.setAttribute("content", data.cover_image || "");
        }
      })
      .catch((err) => {
        console.error("Failed to load blog post details:", err);
        setLoading(false);
      });

    return () => {
      document.title = "SAP × Design | Space and Product Studio";
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0B] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0B] text-white px-6 text-center">
        <h2 className="text-[32px] font-extrabold uppercase mb-4 tracking-wider" style={{ fontFamily: "'Syne', sans-serif" }}>Article Not Found</h2>
        <p className="text-white/50 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="px-6 py-3 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest font-bold rounded-full text-xs">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <Navbar showSplash={false} />

      {/* Main Container */}
      <main className="max-w-[800px] mx-auto px-6 py-36 flex-grow w-full">
        {/* Back navigation */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-[#FFFF00] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Article Meta Header */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 uppercase tracking-widest font-semibold mb-6">
          {post.category && (
            <span className="flex items-center gap-1.5 text-[#FFFF00]">
              <Folder className="w-3.5 h-3.5" /> {post.category.name}
            </span>
          )}
          {post.category && <span>&bull;</span>}
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }) : "Draft"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[36px] md:text-[52px] font-extrabold uppercase leading-tight tracking-tight mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
          {post.title}
        </h1>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative overflow-hidden rounded-[30px] border border-white/5 aspect-[16/9] mb-12">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#EC0606]" />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert max-w-none text-white/70 leading-[1.8] text-[16px] md:text-[17px] font-light space-y-6">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="whitespace-pre-line">{para}</p>
          ))}
        </article>

        {/* Tags Block */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-white/30 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-[#141416] text-white/60 border border-white/5 text-[11px] rounded-full uppercase tracking-wider font-semibold"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
