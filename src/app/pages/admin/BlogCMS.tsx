import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Globe, FileText, Search, Settings, Tag, Folder } from "lucide-react";
import { api } from "../../services/api";
import { BlogPost, BlogCategory, BlogTag } from "../../types/crm";

export default function BlogCMS() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Editor states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // array of tag IDs

  const fetchCMSData = () => {
    setLoading(true);
    const p1 = api.get<BlogPost[]>("/posts");
    const p2 = api.get<BlogCategory[]>("/categories");
    const p3 = api.get<BlogTag[]>("/tags");

    Promise.all([p1, p2, p3])
      .then(([postsRes, catsRes, tagsRes]) => {
        setPosts(postsRes || []);
        setCategories(catsRes || []);
        setTags(tagsRes || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blog CMS data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCMSData();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!selectedPost && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  }, [title, selectedPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) return;

    const payload = {
      title,
      slug,
      content,
      excerpt,
      cover_image: coverImage || undefined,
      published,
      seo_title: seoTitle || undefined,
      seo_description: seoDescription || undefined,
      category_id: categoryId || undefined,
      tags: selectedTags
    };

    if (selectedPost) {
      // Edit mode
      api.put<BlogPost>(`/admin/posts/${selectedPost.id}`, payload)
        .then(() => {
          setIsEditorOpen(false);
          resetForm();
          fetchCMSData();
        })
        .catch((err) => console.error("Error updating post:", err));
    } else {
      // Create mode
      api.post<BlogPost>("/admin/posts", payload)
        .then(() => {
          setIsEditorOpen(false);
          resetForm();
          fetchCMSData();
        })
        .catch((err) => console.error("Error creating post:", err));
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    api.delete(`/admin/posts/${id}`)
      .then(() => fetchCMSData())
      .catch((err) => console.error("Error deleting post:", err));
  };

  const openEditor = (post: BlogPost | null) => {
    if (post) {
      setSelectedPost(post);
      setTitle(post.title);
      setSlug(post.slug);
      setContent(post.content);
      setExcerpt(post.excerpt || "");
      setCoverImage(post.cover_image || "");
      setPublished(post.published);
      setSeoTitle(post.seo_title || "");
      setSeoDescription(post.seo_description || "");
      setCategoryId(post.category_id || "");
      setSelectedTags(post.tags?.map(t => t.id) || []);
    } else {
      resetForm();
    }
    setIsEditorOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setContent("");
    setExcerpt("");
    setCoverImage("");
    setPublished(false);
    setSeoTitle("");
    setSeoDescription("");
    setCategoryId("");
    setSelectedTags([]);
    setSelectedPost(null);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Blog CMS Editor</h1>
          <p className="text-white/40 text-sm mt-1">Publish creative essays, press releases, and design case studies.</p>
        </div>
        <button
          onClick={() => openEditor(null)}
          className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest text-[10px] font-black rounded-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Write Article
        </button>
      </div>

      {/* Control bar */}
      <div className="bg-[#141416] p-4 rounded-2xl border border-white/5 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search articles by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-12 pr-4 py-2 text-xs focus:border-[#FFFF00] focus:outline-none text-white"
          />
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="flex py-20 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-[#141416]/40 rounded-[30px] border border-white/5 text-white/40 italic">
          No articles written yet. Write your first post above.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-[#141416] p-6 rounded-[24px] border border-white/5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <span className={`px-2 py-0.5 text-[8px] uppercase font-bold rounded border ${
                    post.published 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-white/5 text-white/40 border-white/10"
                  }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  {post.published_at && (
                    <span className="text-[9px] text-white/30 font-semibold uppercase">
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white uppercase mt-4 line-clamp-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {post.title}
                </h3>
                <p className="text-xs text-[#FFFF00] mt-1 flex items-center gap-1">
                  <Folder className="w-3 h-3" /> Category: {post.category?.name || "General"}
                </p>
                {post.excerpt && (
                  <p className="text-xs text-white/40 line-clamp-3 mt-3 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
                <button
                  onClick={() => openEditor(post)}
                  className="px-3 py-1.5 bg-[#0A0A0B] border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit Article
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 hover:border-red-500/20 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL SCREEN / LARGE EDITOR DRAWER */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#141416] border border-white/10 rounded-[30px] w-full max-w-4xl p-8 space-y-6 max-h-[95vh] overflow-y-auto relative">
            <h3 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              {selectedPost ? "Edit Publication" : "Draft New Publication"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Core Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Article Title</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Concrete restraints in alpine villas" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">URL Slug</label>
                  <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Category</label>
                  <select required value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white">
                    <option value="">Choose Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Cover Image URL</label>
                  <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>

              {/* Tag Multi-select */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Associate Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const active = selectedTags.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleTagToggle(tag.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          active
                            ? "bg-[#FFFF00] text-[#0A0A0B] border-transparent"
                            : "bg-[#0A0A0B] text-white/50 border-white/10 hover:border-white/25"
                        }`}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Excerpt / Summary Description</label>
                <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary displayed on grid lists..." className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Article Body Content (Support Markdown paragraphs)</label>
                <textarea rows={10} required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write article content using double newlines to split paragraphs..." className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-4 text-xs text-white resize-y font-mono" />
              </div>

              {/* SEO SETTINGS BLOCK */}
              <div className="p-5 bg-[#0A0A0B]/50 rounded-2xl border border-white/5 space-y-4">
                <p className="text-xs uppercase tracking-wider text-white/40 font-bold flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-[#FFFF00]" /> SEO Metadata Optimization (Public Page Head Injection)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/30 font-bold">SEO Title</label>
                    <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="If empty, matches article title" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-white/30 font-bold">SEO Meta Description</label>
                    <input type="text" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="If empty, matches summary excerpt" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white" />
                  </div>
                </div>
              </div>

              {/* Publish State Toggle */}
              <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded bg-[#0A0A0B] border border-white/10 text-[#FFFF00]"
                  />
                  Publish Article Immediately (Live on website blog)
                </label>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => { setIsEditorOpen(false); resetForm(); }} className="px-4 py-2 bg-transparent text-white/60 border border-white/10 text-xs rounded-xl hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FFFF00] text-[#0A0A0B] uppercase font-bold tracking-widest text-[10px] rounded-xl">Save Publication</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
