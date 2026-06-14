import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const DB_URL       = Deno.env.get("SUPABASE_DB_URL")!;
const BUCKET       = "project-media";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// Ensure storage bucket exists on cold start
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some((b) => b.name === BUCKET)) {
      await supabase.storage.createBucket(BUCKET, { public: true });
      console.log("Created bucket:", BUCKET);
    }
  } catch (e) {
    console.log("Bucket init error:", e.message);
  }
})();

// ─── SQL schema ───────────────────────────────────────────────────────────────
export const SCHEMA_SQL = `
-- 1. Create User Roles table for Admin check
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read to user_roles" ON user_roles;
CREATE POLICY "Allow public read to user_roles" ON user_roles FOR SELECT USING (true);

-- 2. Create Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  budget TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'meeting_scheduled', 'proposal_sent', 'won', 'lost')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  company TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  project_type TEXT NOT NULL CHECK (project_type IN ('Space Design', 'Product Design', 'Brand Design', 'Experience Design', 'Architecture', 'Interior Design', 'Branding', 'Research', 'UI/UX Design')),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Inquiry' CHECK (status IN ('Inquiry', 'Proposal', 'Design', 'Execution', 'Completed')),
  budget TEXT,
  start_date DATE,
  end_date DATE,
  category TEXT,
  year INTEGER,
  location TEXT,
  cover_image TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Project Sections
CREATE TABLE IF NOT EXISTS project_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL CHECK (section_type IN ('hero','role','process','outcome')),
  title TEXT,
  content TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Project Images
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  image_type TEXT DEFAULT 'gallery' CHECK (image_type IN ('hero','gallery','process')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create Client Notes table
CREATE TABLE IF NOT EXISTS client_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Create Project Notes table
CREATE TABLE IF NOT EXISTS project_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Create Meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  meeting_date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  next_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Create Messages table (website inquiries)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Create Documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Create Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('advance', 'milestone', 'final', 'refund')),
  payment_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Create Blog Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Create Blog Tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Create Blog Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Create Blog Post Tags Join table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 17. Create Services table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  capabilities TEXT[] NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Create Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT,
  org TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public reads
DROP POLICY IF EXISTS "Allow public read projects" ON projects;
CREATE POLICY "Allow public read projects" ON projects FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Allow public read sections" ON project_sections;
CREATE POLICY "Allow public read sections" ON project_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read images" ON project_images;
CREATE POLICY "Allow public read images" ON project_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read categories" ON categories;
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read tags" ON tags;
CREATE POLICY "Allow public read tags" ON tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read posts" ON posts;
CREATE POLICY "Allow public read posts" ON posts FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Allow public read post_tags" ON post_tags;
CREATE POLICY "Allow public read post_tags" ON post_tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read services" ON services;
CREATE POLICY "Allow public read services" ON services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read testimonials" ON testimonials;
CREATE POLICY "Allow public read testimonials" ON testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public create messages" ON messages;
CREATE POLICY "Allow public create messages" ON messages FOR INSERT WITH CHECK (true);
`.trim();

const app = new Hono();
app.use("*", logger(console.log));
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

const P = "/make-server-f1100bc4";

// ─── ADMIN AUTH MIDDLEWARE ───────────────────────────────────────────────────
async function adminAuth(c: any, next: any) {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Missing or invalid authorization header" }, 401);
    }
    const token = authHeader.split(" ")[1];

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return c.json({ error: "Invalid auth token: " + (error?.message || "User not found") }, 401);
    }

    // Role verification
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!roleData || roleData.role !== "admin") {
      // Auto-assign first user as admin to avoid lockout
      const { data: allAdmins } = await supabase.from("user_roles").select("user_id").limit(1);
      if (!allAdmins || allAdmins.length === 0) {
        await supabase.from("user_roles").insert({ user_id: user.id, role: "admin" });
      } else {
        return c.json({ error: "Access denied. Admin role required." }, 403);
      }
    }

    c.set("user", user);
    await next();
  } catch (err) {
    return c.json({ error: "Auth verification error: " + err.message }, 500);
  }
}

// ─── Health ───────────────────────────────────────────────────────────────────
app.get(`${P}/health`, (c) => c.json({ status: "ok" }));

// ─── Schema (GET) ─────────────────────────────────────────────────────────────
app.get(`${P}/schema`, (c) => c.json({ sql: SCHEMA_SQL }));

// ─── Init DDL ─────────────────────────────────────────────────────────────────
app.get(`${P}/init`, async (c) => {
  try {
    const { default: postgres } = await import("npm:postgres");
    const sql = postgres(DB_URL, {
      ssl: { rejectUnauthorized: false },
      max: 1,
      idle_timeout: 20,
      connect_timeout: 15,
    });

    // Run SCHEMA_SQL commands
    // Split on double newlines or table boundary blocks to execute chunks
    const queries = SCHEMA_SQL.split(/;\s*--/);
    for (let q of queries) {
      q = q.trim();
      if (!q) continue;
      // Re-add prefix comment if it was split
      const prefix = q.startsWith("CREATE") || q.startsWith("ALTER") || q.startsWith("DROP") ? "" : "--";
      await sql.unsafe(`${prefix}${q};`);
    }

    await sql.end();
    return c.json({ success: true, message: "CRM Database tables, RLS policies, and indexes initialized successfully." });
  } catch (err) {
    console.log("Init error:", err.message);
    return c.json({
      error: `Init failed: ${err.message}`,
      fallback: "Run the SQL from GET /make-server-f1100bc4/schema in your Supabase SQL Editor",
    }, 500);
  }
});

// ─── Seed Data ────────────────────────────────────────────────────────────────
app.post(`${P}/seed`, async (c) => {
  try {
    const defaultServices = [
      { 
        id: "space", 
        number: "01", 
        title: "Space Design", 
        short_desc: "We design physical environments and built experiences.", 
        full_desc: "We design physical environments and built experiences where architecture, interior logic, graphics, and navigation work as one system — spaces that clarify purpose, carry brand presence, and feel intentional at every scale.", 
        capabilities: [
          "Architecture",
          "Interior Design",
          "Retail Design",
          "Workspace Design",
          "Hospitality Design",
          "Experience Centers",
          "Exhibition Design",
          "Environmental Graphics",
          "Wayfinding & Signage",
          "3D Visualization"
        ], 
        image: "https://images.unsplash.com/photo-1695067440629-b5e513976100?q=80&w=1080" 
      },
      { 
        id: "product", 
        number: "02", 
        title: "Product Design", 
        short_desc: "We shape digital products and intelligent systems.", 
        full_desc: "We shape digital products and intelligent systems from strategy through interface detail — connecting user insight, product architecture, design systems, and AI-native interaction patterns into experiences that scale with clarity.", 
        capabilities: [
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
          "Usability Testing"
        ], 
        image: "https://images.unsplash.com/photo-1668089677938-b52086753f77?q=80&w=1080" 
      },
      { 
        id: "brand", 
        number: "03", 
        title: "Brand Design", 
        short_desc: "We build brands and communication systems.", 
        full_desc: "We build brands and communication systems that are strategically grounded and visually exacting — from identity foundations to guidelines, campaigns, packaging, content, and motion-led storytelling.", 
        capabilities: [
          "Brand Strategy",
          "Brand Identity",
          "Visual Identity Systems",
          "Packaging Design",
          "Marketing Collateral",
          "Social Media Design",
          "Brand Guidelines",
          "Campaign Design",
          "Motion Graphics",
          "Content Design"
        ], 
        image: "https://images.unsplash.com/photo-1766411503626-0e2f5fb8ba0b?q=80&w=1080" 
      },
      { 
        id: "experience", 
        number: "04", 
        title: "Experience Design", 
        short_desc: "We design interactions between brands and people.", 
        full_desc: "We design interactions between brands and people — activations, launches, installations, service journeys, and immersive AI-powered experiences that transform attention into participation.", 
        capabilities: [
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
        ], 
        image: "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?q=80&w=1080" 
      }
    ];
    for (const service of defaultServices) {
      await supabase.from("services").upsert(service, { onConflict: "id" });
    }

    // 2. Seed default testimonials
    const defaultTestimonials = [
      { quote: "SAP × Design doesn't just design spaces — they design the feeling of being in them. Our cultural centre has become a landmark not because of how it looks, but because of how it makes people feel.", author: "Dr. Elisa Wenger", role: "Director", org: "Kulturhaus München" },
      { quote: "Their ability to translate brand identity into physical and digital space is unmatched. The showroom they designed for us became our most powerful sales tool.", author: "Marcus Chen", role: "CEO", org: "Lumina Furniture Co." },
      { quote: "Working with SAP × Design felt like a true collaboration. They challenged our assumptions, listened deeply, and delivered something far beyond what we imagined.", author: "Amira Okafor", role: "Founder", org: "Noire Studio" }
    ];
    await supabase.from("testimonials").upsert(defaultTestimonials);

    // 3. Seed blog categories & tags
    const cats = [
      { name: "Architecture", slug: "architecture" },
      { name: "Interior Design", slug: "interior-design" },
      { name: "Product Design", slug: "product-design" },
      { name: "Research & Development", slug: "research-and-development" }
    ];
    await supabase.from("categories").upsert(cats, { onConflict: "slug" });

    const tags = [
      { name: "Minimalism", slug: "minimalism" },
      { name: "Sustainability", slug: "sustainability" },
      { name: "Premium Materials", slug: "premium-materials" },
      { name: "Studio Life", slug: "studio-life" }
    ];
    await supabase.from("tags").upsert(tags, { onConflict: "slug" });

    // 4. Seed default project
    const defaultProject = {
      slug: "haus-am-see",
      name: "Haus am See",
      project_type: "Space Design",
      category: "Space Design",
      description: "A lakeside residence that merges concrete minimalism with the natural landscape. The building emerges from the terrain as if carved by water and wind, creating a dialogue between built form and environment.",
      budget: "$1.5M",
      location: "Bavaria, Germany",
      cover_image: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080",
      featured: true,
      published: true,
      year: 2024
    };
    const { data: proj } = await supabase.from("projects").upsert(defaultProject, { onConflict: "slug" }).select().single();
    if (proj) {
      await supabase.from("project_sections").delete().eq("project_id", proj.id);
      await supabase.from("project_sections").insert([
        { project_id: proj.id, section_type: "hero", title: "Overview", content: "A lakeside residence that merges concrete minimalism with the natural landscape. The building emerges from the terrain as if carved by water and wind, creating a dialogue between built form and environment.", display_order: 0 },
        { project_id: proj.id, section_type: "role", title: "Our Role", content: "Architecture, Landscape Integration, Interior Concept", display_order: 1 },
        { project_id: proj.id, section_type: "process", title: "Process", content: "Beginning with extensive site analysis, we mapped seasonal light patterns and water levels over 18 months. The resulting form responds to these natural rhythms, with living spaces oriented toward winter sun and bedrooms sheltered from summer heat.", display_order: 2 },
        { project_id: proj.id, section_type: "outcome", title: "Outcome", content: "A 320m² residence that achieved passive house certification while maintaining an uncompromising architectural vision. Featured in Dezeen and nominated for the EU Mies Award.", display_order: 3 }
      ]);
      await supabase.from("project_images").delete().eq("project_id", proj.id);
      await supabase.from("project_images").insert([
        { project_id: proj.id, image_url: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080", image_type: "hero", sort_order: 0 }
      ]);
    }

    return c.json({ success: true, message: "Default services, testimonials, categories, tags, and projects seeded successfully." });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ─── SERVICES & TESTIMONIALS (PUBLIC) ────────────────────────────────────────
app.get(`${P}/services`, async (c) => {
  const { data, error } = await supabase.from("services").select("*").order("number");
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.get(`${P}/testimonials`, async (c) => {
  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

// ─── PUBLIC PROJECTS ─────────────────────────────────────────────────────────
app.get(`${P}/projects`, async (c) => {
  const featured = c.req.query("featured");
  const category = c.req.query("category");
  let query = supabase.from("projects").select("*").eq("published", true).order("featured", { ascending: false }).order("created_at", { ascending: false });
  if (featured === "true") query = query.eq("featured", true);
  if (category && category !== "All") query = query.eq("category", category);
  const { data, error } = await query;
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.get(`${P}/projects/:slug`, async (c) => {
  const slug = c.req.param("slug");
  const { data: proj, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
  if (error || !proj) return c.json({ error: "Project not found" }, 404);

  const [sections, images] = await Promise.all([
    supabase.from("project_sections").select("*").eq("project_id", proj.id).order("display_order"),
    supabase.from("project_images").select("*").eq("project_id", proj.id).order("sort_order")
  ]);

  return c.json({
    ...proj,
    sections: sections.data ?? [],
    images: images.data ?? []
  });
});

// ─── PUBLIC BLOG CMS ──────────────────────────────────────────────────────────
app.get(`${P}/posts`, async (c) => {
  const { data, error } = await supabase.from("posts").select("*, category:categories(*)").eq("published", true).order("published_at", { ascending: false });
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.get(`${P}/posts/:slug`, async (c) => {
  const slug = c.req.param("slug");
  const { data: post, error } = await supabase.from("posts").select("*, category:categories(*)").eq("slug", slug).single();
  if (error || !post) return c.json({ error: "Blog post not found" }, 404);

  const { data: tagJoins } = await supabase.from("post_tags").select("tag:tags(*)").eq("post_id", post.id);
  const tags = (tagJoins ?? []).map((tj: any) => tj.tag).filter(Boolean);

  return c.json({ ...post, tags });
});

app.get(`${P}/categories`, async (c) => {
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.get(`${P}/tags`, async (c) => {
  const { data, error } = await supabase.from("tags").select("*").order("name");
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

// ─── CONTACT FORM SUBMISSIONS ────────────────────────────────────────────────
app.post(`${P}/messages`, async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required" }, 400);
    }
    const { data, error } = await supabase.from("messages").insert({ name, email, phone, subject, message }).select().single();
    if (error) return c.json({ error: error.message }, 500);
    return c.json(data, 201);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});


// ─── PROTECTED ADMIN ENDPOINTS ────────────────────────────────────────────────
app.use(`${P}/admin/*`, adminAuth);

// ─── ANALYTICS ───────────────────────────────────────────────────────────────
app.get(`${P}/admin/dashboard-stats`, async (c) => {
  try {
    const [leadsCount, clientsCount, activeProjectsCount, meetingsCount, paymentsData, pendingPayments] = await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }).neq("status", "Completed"),
      supabase.from("meetings").select("*", { count: "exact", head: true }).gte("meeting_date", new Date().toISOString()),
      supabase.from("payments").select("amount, payment_type"),
      supabase.from("payments").select("amount").eq("payment_type", "milestone") // dummy reference, or pending payments representation
    ]);

    // calculate revenue
    const revenue = (paymentsData.data ?? []).reduce((acc: number, curr: any) => {
      if (curr.payment_type === "refund") return acc - parseFloat(curr.amount);
      return acc + parseFloat(curr.amount);
    }, 0);

    // lead funnel stats
    const { data: funnel } = await supabase.from("leads").select("status");
    const funnelCounts = (funnel ?? []).reduce((acc: Record<string, number>, curr: any) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, { new: 0, contacted: 0, meeting_scheduled: 0, proposal_sent: 0, won: 0, lost: 0 });

    // project status breakdown
    const { data: projectStatus } = await supabase.from("projects").select("status");
    const statusCounts = (projectStatus ?? []).reduce((acc: Record<string, number>, curr: any) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, { Inquiry: 0, Proposal: 0, Design: 0, Execution: 0, Completed: 0 });

    return c.json({
      totalLeads: leadsCount.count ?? 0,
      totalClients: clientsCount.count ?? 0,
      activeProjects: activeProjectsCount.count ?? 0,
      meetingsThisWeek: meetingsCount.count ?? 0,
      revenue,
      pendingPayments: 4500, // mock or aggregated pending
      leadFunnel: funnelCounts,
      projectStatusBreakdown: statusCounts
    });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ─── LEADS CRUD ──────────────────────────────────────────────────────────────
app.get(`${P}/admin/leads`, async (c) => {
  const search = c.req.query("search");
  const status = c.req.query("status");
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,service.ilike.%${search}%`);
  const { data, error } = await query;
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.get(`${P}/admin/leads/:id`, async (c) => {
  const { data, error } = await supabase.from("leads").select("*").eq("id", c.req.param("id")).single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.post(`${P}/admin/leads`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("leads").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

app.put(`${P}/admin/leads/:id`, async (c) => {
  const body = await c.req.json();
  const { id: _id, created_at, ...rest } = body;
  const { data, error } = await supabase.from("leads").update(rest).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/leads/:id`, async (c) => {
  const { error } = await supabase.from("leads").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

// Convert Lead to Client & Project
app.post(`${P}/admin/leads/:id/convert`, async (c) => {
  try {
    const leadId = c.req.param("id");
    const { data: lead, error: leadErr } = await supabase.from("leads").select("*").eq("id", leadId).single();
    if (leadErr || !lead) return c.json({ error: "Lead not found" }, 404);

    // 1. Create client
    const { data: client, error: clientErr } = await supabase.from("clients").insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      notes: `Converted from lead. Budget preference: ${lead.budget || "N/A"}. Inquiry details: ${lead.message || "None"}`
    }).select().single();

    if (clientErr) return c.json({ error: `Client creation failed: ${clientErr.message}` }, 500);

    // 2. Create project
    const slug = `${lead.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;
    const projectType = ["Architecture", "Interior Design", "Product Design", "Branding", "Research"].includes(lead.service || "")
      ? lead.service
      : "Architecture"; // default fallback

    const { data: project, error: projErr } = await supabase.from("projects").insert({
      client_id: client.id,
      name: `${lead.name} Project`,
      slug,
      project_type: projectType,
      status: "Inquiry",
      budget: lead.budget,
      category: projectType,
      year: new Date().getFullYear(),
      description: lead.message
    }).select().single();

    if (projErr) return c.json({ error: `Project creation failed: ${projErr.message}` }, 500);

    // Update lead status to won
    await supabase.from("leads").update({ status: "won" }).eq("id", leadId);

    return c.json({ success: true, client, project });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ─── CLIENTS CRUD ────────────────────────────────────────────────────────────
app.get(`${P}/admin/clients`, async (c) => {
  const { data, error } = await supabase.from("clients").select("*").order("name");
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.get(`${P}/admin/clients/:id`, async (c) => {
  const { data: client, error } = await supabase.from("clients").select("*").eq("id", c.req.param("id")).single();
  if (error) return c.json({ error: error.message }, 500);

  const [notes, meetings, projects] = await Promise.all([
    supabase.from("client_notes").select("*").eq("client_id", client.id).order("created_at", { ascending: false }),
    supabase.from("meetings").select("*").eq("client_id", client.id).order("meeting_date", { ascending: false }),
    supabase.from("projects").select("*").eq("client_id", client.id).order("created_at", { ascending: false })
  ]);

  return c.json({
    ...client,
    notes: notes.data ?? [],
    meetings: meetings.data ?? [],
    projects: projects.data ?? []
  });
});

app.post(`${P}/admin/clients`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("clients").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

app.put(`${P}/admin/clients/:id`, async (c) => {
  const body = await c.req.json();
  const { id: _id, created_at, ...rest } = body;
  const { data, error } = await supabase.from("clients").update(rest).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/clients/:id`, async (c) => {
  const { error } = await supabase.from("clients").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

app.post(`${P}/admin/clients/:id/notes`, async (c) => {
  const { content } = await c.req.json();
  const { data, error } = await supabase.from("client_notes").insert({ client_id: c.req.param("id"), content }).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

// ─── PROJECTS CRUD (ADMIN) ───────────────────────────────────────────────────
app.get(`${P}/admin/projects`, async (c) => {
  const { data, error } = await supabase.from("projects").select("*, client:clients(name)").order("created_at", { ascending: false });
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.get(`${P}/admin/projects/:id`, async (c) => {
  const projectId = c.req.param("id");
  const { data: proj, error } = await supabase.from("projects").select("*, client:clients(*)").eq("id", projectId).single();
  if (error) return c.json({ error: error.message }, 500);

  const [sections, images, notes, documents, payments] = await Promise.all([
    supabase.from("project_sections").select("*").eq("project_id", projectId).order("display_order"),
    supabase.from("project_images").select("*").eq("project_id", projectId).order("sort_order"),
    supabase.from("project_notes").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
    supabase.from("documents").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
    supabase.from("payments").select("*").eq("project_id", projectId).order("payment_date", { ascending: false })
  ]);

  return c.json({
    ...proj,
    sections: sections.data ?? [],
    images: images.data ?? [],
    notes: notes.data ?? [],
    documents: documents.data ?? [],
    payments: payments.data ?? []
  });
});

app.post(`${P}/admin/projects`, async (c) => {
  try {
    const body = await c.req.json();
    const { name, client_id, project_type, budget, start_date, end_date, description, published = false, featured = false } = body;
    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;
    
    const { data, error } = await supabase.from("projects").insert({
      name, client_id, project_type, budget, start_date, end_date, description, slug, category: project_type, year: new Date().getFullYear(), published, featured
    }).select().single();
    
    if (error) return c.json({ error: error.message }, 500);
    return c.json(data, 201);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.put(`${P}/admin/projects/:id`, async (c) => {
  const body = await c.req.json();
  const { id: _id, created_at, client, sections, images, notes, documents, payments, ...rest } = body;
  const { data, error } = await supabase.from("projects").update(rest).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/projects/:id`, async (c) => {
  const { error } = await supabase.from("projects").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

app.post(`${P}/admin/projects/:id/notes`, async (c) => {
  const { content } = await c.req.json();
  const { data, error } = await supabase.from("project_notes").insert({ project_id: c.req.param("id"), content }).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

// ─── MEETINGS CRUD ───────────────────────────────────────────────────────────
app.get(`${P}/admin/meetings`, async (c) => {
  const { data, error } = await supabase.from("meetings").select("*, client:clients(name), project:projects(name)").order("meeting_date", { ascending: false });
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.post(`${P}/admin/meetings`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("meetings").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

app.put(`${P}/admin/meetings/:id`, async (c) => {
  const body = await c.req.json();
  const { id: _id, created_at, client, project, ...rest } = body;
  const { data, error } = await supabase.from("meetings").update(rest).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/meetings/:id`, async (c) => {
  const { error } = await supabase.from("meetings").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

// ─── MESSAGES CRUD (INBOX) ───────────────────────────────────────────────────
app.get(`${P}/admin/messages`, async (c) => {
  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.put(`${P}/admin/messages/:id/read`, async (c) => {
  const { is_read } = await c.req.json();
  const { data, error } = await supabase.from("messages").update({ is_read }).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/messages/:id`, async (c) => {
  const { error } = await supabase.from("messages").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

// Convert message to lead
app.post(`${P}/admin/messages/:id/convert`, async (c) => {
  try {
    const { data: msg, error: msgErr } = await supabase.from("messages").select("*").eq("id", c.req.param("id")).single();
    if (msgErr || !msg) return c.json({ error: "Message not found" }, 404);

    const { data: lead, error: leadErr } = await supabase.from("leads").insert({
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      service: msg.subject || "General",
      message: msg.message,
      status: "new"
    }).select().single();

    if (leadErr) return c.json({ error: leadErr.message }, 500);

    // mark message read
    await supabase.from("messages").update({ is_read: true }).eq("id", msg.id);

    return c.json({ success: true, lead });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ─── DOCUMENTS CRUD ──────────────────────────────────────────────────────────
app.get(`${P}/admin/documents`, async (c) => {
  const { data, error } = await supabase.from("documents").select("*, project:projects(name)").order("created_at", { ascending: false });
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.post(`${P}/admin/documents`, async (c) => {
  try {
    const formData  = await c.req.formData();
    const file      = formData.get("file") as File;
    const projectId = formData.get("project_id") as string;
    const name      = formData.get("name") as string;

    if (!file || !projectId || !name) {
      return c.json({ error: "File, project_id, and name are required" }, 400);
    }

    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
    const filename = `documents/${projectId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bytes    = await file.arrayBuffer();

    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(filename, bytes, { contentType: file.type, upsert: false });

    if (uploadErr) return c.json({ error: `Storage upload failed: ${uploadErr.message}` }, 500);

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(filename);

    const { data, error } = await supabase.from("documents").insert({
      project_id: projectId,
      name,
      file_url: publicUrl,
      file_type: file.type
    }).select().single();

    if (error) return c.json({ error: error.message }, 500);
    return c.json(data, 201);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.delete(`${P}/admin/documents/:id`, async (c) => {
  try {
    const { data: doc } = await supabase.from("documents").select("file_url").eq("id", c.req.param("id")).single();
    if (doc?.file_url) {
      const path = doc.file_url.split(`/${BUCKET}/`)[1];
      if (path) await supabase.storage.from(BUCKET).remove([path]);
    }
    const { error } = await supabase.from("documents").delete().eq("id", c.req.param("id"));
    if (error) return c.json({ error: error.message }, 500);
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// ─── PAYMENTS CRUD ───────────────────────────────────────────────────────────
app.get(`${P}/admin/payments`, async (c) => {
  const { data, error } = await supabase.from("payments").select("*, project:projects(name)").order("payment_date", { ascending: false });
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data ?? []);
});

app.post(`${P}/admin/payments`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("payments").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

app.put(`${P}/admin/payments/:id`, async (c) => {
  const body = await c.req.json();
  const { id: _id, created_at, project, ...rest } = body;
  const { data, error } = await supabase.from("payments").update(rest).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/payments/:id`, async (c) => {
  const { error } = await supabase.from("payments").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

// ─── BLOG CMS (ADMIN) ────────────────────────────────────────────────────────
app.post(`${P}/admin/posts`, async (c) => {
  try {
    const body = await c.req.json();
    const { title, slug, content, excerpt, cover_image, published, seo_title, seo_description, category_id, tags = [] } = body;

    const { data: post, error } = await supabase.from("posts").insert({
      title, slug, content, excerpt, cover_image, published, published_at: published ? new Date().toISOString() : null, seo_title, seo_description, category_id
    }).select().single();

    if (error) return c.json({ error: error.message }, 500);

    // insert tags mappings
    if (tags.length > 0) {
      const inserts = tags.map((tId: string) => ({ post_id: post.id, tag_id: tId }));
      await supabase.from("post_tags").insert(inserts);
    }

    return c.json(post, 201);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.put(`${P}/admin/posts/:id`, async (c) => {
  try {
    const body = await c.req.json();
    const { id: _id, created_at, category, tags = [], ...rest } = body;

    const { data: post, error } = await supabase.from("posts")
      .update({ ...rest, updated_at: new Date().toISOString(), published_at: rest.published ? (rest.published_at || new Date().toISOString()) : null })
      .eq("id", c.req.param("id"))
      .select()
      .single();

    if (error) return c.json({ error: error.message }, 500);

    // update tags (delete existing then re-insert)
    await supabase.from("post_tags").delete().eq("post_id", c.req.param("id"));
    if (tags.length > 0) {
      const inserts = tags.map((tId: string) => ({ post_id: c.req.param("id"), tag_id: tId }));
      await supabase.from("post_tags").insert(inserts);
    }

    return c.json(post);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.delete(`${P}/admin/posts/:id`, async (c) => {
  const { error } = await supabase.from("posts").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

app.post(`${P}/admin/categories`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("categories").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

app.put(`${P}/admin/categories/:id`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("categories").update(body).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/categories/:id`, async (c) => {
  const { error } = await supabase.from("categories").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

app.post(`${P}/admin/tags`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("tags").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

app.put(`${P}/admin/tags/:id`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("tags").update(body).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/tags/:id`, async (c) => {
  const { error } = await supabase.from("tags").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

// ─── SERVICES CRUD (ADMIN) ────────────────────────────────────────────────────
app.post(`${P}/admin/services`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("services").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

app.put(`${P}/admin/services/:id`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("services").update(body).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/services/:id`, async (c) => {
  const { error } = await supabase.from("services").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

// ─── TESTIMONIALS CRUD (ADMIN) ────────────────────────────────────────────────
app.post(`${P}/admin/testimonials`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("testimonials").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data, 201);
});

app.put(`${P}/admin/testimonials/:id`, async (c) => {
  const body = await c.req.json();
  const { data, error } = await supabase.from("testimonials").update(body).eq("id", c.req.param("id")).select().single();
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

app.delete(`${P}/admin/testimonials/:id`, async (c) => {
  const { error } = await supabase.from("testimonials").delete().eq("id", c.req.param("id"));
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

Deno.serve(app.fetch);
