import { supabase } from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const P = "make-server-f1100bc4";
const BASE_URL = import.meta.env.VITE_API_URL || `${supabaseUrl}/functions/v1/server/${P}`;

const isPlaceholderMode = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes("placeholder");

// ─── LOCAL STORAGE MOCK ENGINE FOR DATABASE BYPASS ───────────────────────────
const getStorageItem = <T>(key: string, defaultVal: T): T => {
  const item = localStorage.getItem(`crm-mock-${key}`);
  return item ? JSON.parse(item) : defaultVal;
};

const setStorageItem = (key: string, val: any) => {
  localStorage.setItem(`crm-mock-${key}`, JSON.stringify(val));
};

// Seed mock database on first load
const seedMockDB = () => {
  if (localStorage.getItem("crm-mock-seeded-v7") === "true") return;

  const mockServices = [
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
      image: "https://images.unsplash.com/photo-1695067440629-b5e513976100?q=80&w=1080",
      show_in_slideshow: true,
      show_in_matrix: true
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
      image: "https://images.unsplash.com/photo-1668089677938-b52086753f77?q=80&w=1080",
      show_in_slideshow: true,
      show_in_matrix: true
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
      image: "https://images.unsplash.com/photo-1766411503626-0e2f5fb8ba0b?q=80&w=1080",
      show_in_slideshow: true,
      show_in_matrix: true
    },
    { 
      id: "experience", 
      number: "04", 
      title: "Immersive Design", 
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
      image: "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?q=80&w=1080",
      show_in_slideshow: true,
      show_in_matrix: true
    }
  ];
  setStorageItem("services", mockServices);

  const mockTestimonials = [
    { id: "1", quote: "SAP × Design doesn't just design spaces — they design the feeling of being in them. Our cultural centre has become a landmark.", author: "Dr. Elisa Wenger", role: "Director", org: "Kulturhaus München" },
    { id: "2", quote: "Their ability to translate brand identity into physical and digital space is unmatched.", author: "Marcus Chen", role: "CEO", org: "Lumina Furniture Co." }
  ];
  setStorageItem("testimonials", mockTestimonials);

  const mockProjects = [
    { id: "proj-1", client_id: "c-1", name: "Haus am See", slug: "haus-am-see", project_type: "Space Design", description: "A lakeside residence that merges concrete minimalism with the natural landscape. The building emerges from the terrain as if carved by water and wind, creating a dialogue between built form and environment.", budget: "$1.5M", location: "Bavaria, Germany", cover_image: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080", featured: true, published: true, year: 2024, created_at: new Date().toISOString() }
  ];
  setStorageItem("projects", mockProjects);

  const mockProjectSections = [
    { id: "sec-1", project_id: "proj-1", section_type: "hero", title: "Overview", content: "A lakeside residence that merges concrete minimalism with the natural landscape. The building emerges from the terrain as if carved by water and wind, creating a dialogue between built form and environment." },
    { id: "sec-2", project_id: "proj-1", section_type: "role", title: "Our Role", content: "Architecture, Landscape Integration, Interior Concept" },
    { id: "sec-3", project_id: "proj-1", section_type: "process", title: "Process", content: "Beginning with extensive site analysis, we mapped seasonal light patterns and water levels over 18 months." },
    { id: "sec-4", project_id: "proj-1", section_type: "outcome", title: "Outcome", content: "A 320m² residence that achieved passive house certification while maintaining an uncompromising architectural vision." }
  ];
  setStorageItem("project_sections", mockProjectSections);

  const mockProjectImages = [
    { id: "img-1", project_id: "proj-1", image_url: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080", image_type: "hero", sort_order: 0 }
  ];
  setStorageItem("project_images", mockProjectImages);

  const mockClients = [
    { id: "c-1", name: "Elisa Wenger", email: "elisa@kulturhaus.de", phone: "+49 176 123456", company: "Kulturhaus München", address: "Munich, Germany", notes: "Loves minimalist raw concrete layouts.", created_at: new Date().toISOString() }
  ];
  setStorageItem("clients", mockClients);

  const mockLeads = [
    { id: "lead-1", name: "Amira Okafor", email: "amira@noire.studio", phone: "+1 555 987 654", service: "Interior Design", budget: "$150K - $250K", message: "Looking for a premium workspace design.", status: "new", created_at: new Date().toISOString() }
  ];
  setStorageItem("leads", mockLeads);

  const mockMessages = [
    { id: "msg-1", name: "Jonas Lindqvist", email: "jonas@skog.hospitality", phone: "", subject: "Showroom Design Brief", message: "We want to design a luxury cabin showroom.", is_read: false, created_at: new Date().toISOString() }
  ];
  setStorageItem("messages", mockMessages);

  const mockMeetings = [
    { id: "meet-1", client_id: "c-1", project_id: "proj-1", meeting_date: new Date(Date.now() + 86400000 * 2).toISOString(), notes: "Review final concrete models.", next_action: "Send milestone contract invoice", created_at: new Date().toISOString() }
  ];
  setStorageItem("meetings", mockMeetings);

  const mockPayments = [
    { id: "pay-1", project_id: "proj-1", amount: 25000, payment_type: "advance", payment_date: new Date().toISOString().split("T")[0], notes: "Initial advance deposit", created_at: new Date().toISOString() }
  ];
  setStorageItem("payments", mockPayments);

  const mockCategories = [
    { id: "cat-1", name: "Architecture", slug: "architecture" },
    { id: "cat-2", name: "Interior Design", slug: "interior-design" }
  ];
  setStorageItem("categories", mockCategories);

  const mockTags = [
    { id: "tag-1", name: "Minimalism", slug: "minimalism" }
  ];
  setStorageItem("tags", mockTags);

  const mockPosts = [
    { id: "post-1", title: "Concrete restraints in alpine designs", slug: "concrete-restraints", content: "A deep dive essay about integrating concrete geometry into natural environments.\n\nMaterial restraint leads to geometric clarity. When designing in raw terrain, we seek to reduce choices down to essential volumes.", excerpt: "A deep dive essay about concrete geometry integration.", cover_image: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080", published: true, published_at: new Date().toISOString(), category_id: "cat-1", created_at: new Date().toISOString() }
  ];
  setStorageItem("posts", mockPosts);

  setStorageItem("client_notes", []);
  setStorageItem("project_notes", []);
  setStorageItem("documents", []);

  localStorage.setItem("crm-mock-seeded-v7", "true");
};

if (isPlaceholderMode) {
  seedMockDB();
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }
  return headers;
}

export const api = {
  // Public requests
  async get<T>(path: string): Promise<T> {
    if (isPlaceholderMode) {
      return this.mockGet<T>(path);
    }
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}${path}`, { headers });
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `GET ${path} failed with status ${response.status}`);
    }
    return response.json();
  },

  async post<T>(path: string, body: any): Promise<T> {
    if (isPlaceholderMode) {
      return this.mockPost<T>(path, body);
    }
    const headers = await getAuthHeaders();
    const isFormData = body instanceof FormData;
    if (isFormData) {
      delete (headers as any)["Content-Type"];
    }
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `POST ${path} failed with status ${response.status}`);
    }
    return response.json();
  },

  async put<T>(path: string, body: any): Promise<T> {
    if (isPlaceholderMode) {
      return this.mockPut<T>(path, body);
    }
    const headers = await getAuthHeaders();
    const isFormData = body instanceof FormData;
    if (isFormData) {
      delete (headers as any)["Content-Type"];
    }
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `PUT ${path} failed with status ${response.status}`);
    }
    return response.json();
  },

  async delete(path: string): Promise<{ success: boolean }> {
    if (isPlaceholderMode) {
      return this.mockDelete(path);
    }
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers,
    });
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `DELETE ${path} failed with status ${response.status}`);
    }
    return response.json();
  },

  async uploadFile<T>(path: string, file: File, additionalFields: Record<string, string> = {}): Promise<T> {
    if (isPlaceholderMode) {
      // Mock File Upload by creating mock URL
      const mockUrl = URL.createObjectURL(file) || "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080";
      if (path.includes("images")) {
        const projectId = path.split("/")[2];
        const images = getStorageItem<any[]>("project_images", []);
        const newImg = {
          id: `img-${Date.now()}`,
          project_id: projectId,
          image_url: mockUrl,
          image_type: additionalFields.image_type || "gallery",
          caption: additionalFields.caption || "",
          sort_order: images.length
        };
        images.push(newImg);
        setStorageItem("project_images", images);

        // Update project's cover_image if image_type is "hero"
        if (additionalFields.image_type === "hero") {
          const projs = getStorageItem<any[]>("projects", []);
          const idx = projs.findIndex(p => p.id === projectId);
          if (idx !== -1) {
            projs[idx].cover_image = mockUrl;
            setStorageItem("projects", projs);
          }
        }

        return newImg as any;
      } else if (path.includes("documents")) {
        const docs = getStorageItem<any[]>("documents", []);
        const newDoc = {
          id: `doc-${Date.now()}`,
          project_id: additionalFields.project_id,
          name: additionalFields.name,
          file_url: mockUrl,
          file_type: file.type,
          created_at: new Date().toISOString()
        };
        docs.push(newDoc);
        setStorageItem("documents", docs);
        return newDoc as any;
      }
      return {} as any;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const headers: HeadersInit = {};
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }

    const formData = new FormData();
    formData.append("file", file);
    Object.entries(additionalFields).forEach(([key, val]) => {
      formData.append(key, val);
    });

    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `Upload failed with status ${response.status}`);
    }
    return response.json();
  },

  // ─── LOCAL STORAGE MOCK ENDPOINTS INTERCEPTORS ──────────────────────────────
  mockGet<T>(path: string): T {
    if (path === "/services") return getStorageItem("services", []) as any;
    if (path === "/testimonials") return getStorageItem("testimonials", []) as any;
    if (path.startsWith("/projects/")) {
      const slug = path.split("/")[2];
      const projs = getStorageItem<any[]>("projects", []);
      const p = projs.find(x => x.slug === slug);
      if (!p) throw new Error("Project not found");
      const sections = getStorageItem<any[]>("project_sections", []).filter(s => s.project_id === p.id);
      const images = getStorageItem<any[]>("project_images", []).filter(img => img.project_id === p.id);
      return { ...p, sections, images } as any;
    }
    if (path.startsWith("/projects")) {
      const projs = getStorageItem<any[]>("projects", []);
      const allImages = getStorageItem<any[]>("project_images", []);
      const featured = path.includes("featured=true");
      let filtered = projs.filter(p => p.published);
      if (featured) filtered = filtered.filter(p => p.featured);
      return filtered.map(p => ({
        ...p,
        images: allImages.filter(img => img.project_id === p.id)
      })) as any;
    }
    if (path === "/posts") {
      const posts = getStorageItem<any[]>("posts", []);
      const cats = getStorageItem<any[]>("categories", []);
      return posts.filter(p => p.published).map(p => ({
        ...p,
        category: cats.find(c => c.id === p.category_id)
      })) as any;
    }
    if (path.startsWith("/posts/")) {
      const slug = path.split("/")[2];
      const posts = getStorageItem<any[]>("posts", []);
      const cats = getStorageItem<any[]>("categories", []);
      const p = posts.find(x => x.slug === slug);
      if (!p) throw new Error("Post not found");
      return {
        ...p,
        category: cats.find(c => c.id === p.category_id),
        tags: []
      } as any;
    }
    if (path === "/categories") return getStorageItem("categories", []) as any;
    if (path === "/tags") return getStorageItem("tags", []) as any;

    // Admin endpoints
    if (path === "/admin/dashboard-stats") {
      const leads = getStorageItem<any[]>("leads", []);
      const clients = getStorageItem<any[]>("clients", []);
      const projects = getStorageItem<any[]>("projects", []);
      const meetings = getStorageItem<any[]>("meetings", []);
      const payments = getStorageItem<any[]>("payments", []);

      const revenue = payments.reduce((acc, curr) => curr.payment_type === "refund" ? acc - curr.amount : acc + curr.amount, 0);

      const funnel = leads.reduce((acc: any, curr: any) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, { new: 0, contacted: 0, meeting_scheduled: 0, proposal_sent: 0, won: 0, lost: 0 });

      const breakdown = projects.reduce((acc: any, curr: any) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, { Inquiry: 0, Proposal: 0, Design: 0, Execution: 0, Completed: 0 });

      return {
        totalLeads: leads.length,
        totalClients: clients.length,
        activeProjects: projects.filter(p => p.status !== "Completed").length,
        meetingsThisWeek: meetings.length,
        revenue,
        pendingPayments: 4500,
        leadFunnel: funnel,
        projectStatusBreakdown: breakdown
      } as any;
    }

    if (path.startsWith("/admin/leads")) {
      return getStorageItem("leads", []) as any;
    }
    if (path === "/admin/clients") {
      return getStorageItem("clients", []) as any;
    }
    if (path.startsWith("/admin/clients/")) {
      const id = path.split("/")[3];
      const clients = getStorageItem<any[]>("clients", []);
      const client = clients.find(c => c.id === id);
      const notes = getStorageItem<any[]>("client_notes", []).filter(n => n.client_id === id);
      const meetings = getStorageItem<any[]>("meetings", []).filter(m => m.client_id === id);
      const projects = getStorageItem<any[]>("projects", []).filter(p => p.client_id === id);
      return { ...client, notes, meetings, projects } as any;
    }
    if (path === "/admin/projects") {
      const projs = getStorageItem<any[]>("projects", []);
      const clients = getStorageItem<any[]>("clients", []);
      return projs.map(p => ({
        ...p,
        client: clients.find(c => c.id === p.client_id)
      })) as any;
    }
    if (path.startsWith("/admin/projects/")) {
      const id = path.split("/")[3];
      const projs = getStorageItem<any[]>("projects", []);
      const p = projs.find(x => x.id === id);
      if (!p) throw new Error("Project not found");
      const clients = getStorageItem<any[]>("clients", []);
      const client = clients.find(c => c.id === p.client_id);
      const sections = getStorageItem<any[]>("project_sections", []).filter(s => s.project_id === id);
      const images = getStorageItem<any[]>("project_images", []).filter(img => img.project_id === id);
      const notes = getStorageItem<any[]>("project_notes", []).filter(n => n.project_id === id);
      const documents = getStorageItem<any[]>("documents", []).filter(d => d.project_id === id);
      const payments = getStorageItem<any[]>("payments", []).filter(pay => pay.project_id === id);

      const projectData = { ...p, client, sections, images, notes, documents, payments };
      const heroImages = images.filter(img => img.image_type === "hero").sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

      return {
        project: projectData,
        heroImages: heroImages
      } as any;
    }
    if (path === "/admin/meetings") {
      const meets = getStorageItem<any[]>("meetings", []);
      const clients = getStorageItem<any[]>("clients", []);
      const projs = getStorageItem<any[]>("projects", []);
      return meets.map(m => ({
        ...m,
        client: clients.find(c => c.id === m.client_id),
        project: projs.find(p => p.id === m.project_id)
      })) as any;
    }
    if (path === "/admin/messages") {
      return getStorageItem("messages", []) as any;
    }
    if (path === "/admin/documents") {
      const docs = getStorageItem<any[]>("documents", []);
      const projs = getStorageItem<any[]>("projects", []);
      return docs.map(d => ({
        ...d,
        project: projs.find(p => p.id === d.project_id)
      })) as any;
    }
    if (path === "/admin/payments") {
      const payments = getStorageItem<any[]>("payments", []);
      const projs = getStorageItem<any[]>("projects", []);
      return payments.map(p => ({
        ...p,
        project: projs.find(pr => pr.id === p.project_id)
      })) as any;
    }

    return [] as any;
  },

  mockPost<T>(path: string, body: any): T {
    if (path === "/messages") {
      const msgs = getStorageItem<any[]>("messages", []);
      const newMsg = { ...body, id: `msg-${Date.now()}`, is_read: false, created_at: new Date().toISOString() };
      msgs.push(newMsg);
      setStorageItem("messages", msgs);
      return newMsg as any;
    }
    if (path === "/admin/leads") {
      const leads = getStorageItem<any[]>("leads", []);
      const newLead = { ...body, id: `lead-${Date.now()}`, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      leads.push(newLead);
      setStorageItem("leads", leads);
      return newLead as any;
    }
    if (path.startsWith("/admin/leads/") && path.endsWith("/convert")) {
      const id = path.split("/")[3];
      const leads = getStorageItem<any[]>("leads", []);
      const lead = leads.find(l => l.id === id);
      if (!lead) throw new Error("Lead not found");

      // Create Client
      const clients = getStorageItem<any[]>("clients", []);
      const newClient = {
        id: `c-${Date.now()}`,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        notes: `Converted from lead. Message: ${lead.message}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      clients.push(newClient);
      setStorageItem("clients", clients);

      // Create Project
      const projs = getStorageItem<any[]>("projects", []);
      const newProj = {
        id: `proj-${Date.now()}`,
        client_id: newClient.id,
        name: `${lead.name} Project`,
        slug: `${lead.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now().toString().slice(-4)}`,
        project_type: lead.service || "Architecture",
        status: "Inquiry",
        budget: lead.budget,
        cover_image: "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080",
        published: false,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      projs.push(newProj);
      setStorageItem("projects", projs);

      // mark lead won
      lead.status = "won";
      setStorageItem("leads", leads);

      return { success: true, client: newClient, project: newProj } as any;
    }
    if (path === "/admin/clients") {
      const clients = getStorageItem<any[]>("clients", []);
      const newC = { ...body, id: `c-${Date.now()}`, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      clients.push(newC);
      setStorageItem("clients", clients);
      return newC as any;
    }
    if (path.startsWith("/admin/clients/") && path.endsWith("/notes")) {
      const client_id = path.split("/")[3];
      const notes = getStorageItem<any[]>("client_notes", []);
      const newN = { id: `n-${Date.now()}`, client_id, content: body.content, created_at: new Date().toISOString() };
      notes.push(newN);
      setStorageItem("client_notes", notes);
      return newN as any;
    }
    if (path === "/admin/projects") {
      let name: string = "";
      let client_id: string | null = null;
      let project_type: string = "";
      let budget: string = "";
      let start_date: string = "";
      let end_date: string = "";
      let description: string = "";
      let published: boolean = false;
      let featured: boolean = false;
      let heroFiles: any[] = [];

      if (body instanceof FormData) {
        name = body.get("name") as string || "";
        client_id = body.get("client_id") as string || null;
        project_type = body.get("project_type") as string || "";
        budget = body.get("budget") as string || "";
        start_date = body.get("start_date") as string || "";
        end_date = body.get("end_date") as string || "";
        description = body.get("description") as string || "";
        published = body.get("published") === "true";
        featured = body.get("featured") === "true";
        heroFiles = body.getAll("hero_images");
      } else {
        name = body.name || "";
        client_id = body.client_id || null;
        project_type = body.project_type || "";
        budget = body.budget || "";
        start_date = body.start_date || "";
        end_date = body.end_date || "";
        description = body.description || "";
        published = body.published === true;
        featured = body.featured === true;
      }

      const projs = getStorageItem<any[]>("projects", []);
      const newP = {
        id: `proj-${Date.now()}`,
        name,
        client_id,
        project_type,
        budget,
        start_date,
        end_date,
        description,
        published,
        featured,
        slug: `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now().toString().slice(-4)}`,
        cover_image: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const uploadedImages: any[] = [];
      if (heroFiles && heroFiles.length > 0) {
        const images = getStorageItem<any[]>("project_images", []);
        heroFiles.forEach((file, index) => {
          const mockUrl = file instanceof File ? URL.createObjectURL(file) : "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080";
          const newImg = {
            id: `img-${Date.now()}-${index}`,
            project_id: newP.id,
            image_url: mockUrl,
            image_type: "hero",
            sort_order: index,
            image_order: index,
            caption: ""
          };
          images.push(newImg);
          uploadedImages.push(newImg);

          if (index === 0) {
            newP.cover_image = mockUrl;
          }
        });
        setStorageItem("project_images", images);
      } else {
        newP.cover_image = "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080";
      }

      projs.push(newP);
      setStorageItem("projects", projs);

      return {
        ...newP,
        project: newP,
        heroImages: uploadedImages
      } as any;
    }
    if (path.startsWith("/admin/projects/") && path.endsWith("/notes")) {
      const project_id = path.split("/")[3];
      const notes = getStorageItem<any[]>("project_notes", []);
      const newN = { id: `n-${Date.now()}`, project_id, content: body.content, created_at: new Date().toISOString() };
      notes.push(newN);
      setStorageItem("project_notes", notes);
      return newN as any;
    }
    if (path === "/admin/meetings") {
      const meets = getStorageItem<any[]>("meetings", []);
      const newM = { ...body, id: `meet-${Date.now()}`, created_at: new Date().toISOString() };
      meets.push(newM);
      setStorageItem("meetings", meets);
      return newM as any;
    }
    if (path.startsWith("/admin/messages/") && path.endsWith("/convert")) {
      const id = path.split("/")[3];
      const msgs = getStorageItem<any[]>("messages", []);
      const msg = msgs.find(m => m.id === id);
      if (!msg) throw new Error("Message not found");

      const leads = getStorageItem<any[]>("leads", []);
      const newLead = {
        id: `lead-${Date.now()}`,
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        service: msg.subject,
        message: msg.message,
        status: "new",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      leads.push(newLead);
      setStorageItem("leads", leads);

      msg.is_read = true;
      setStorageItem("messages", msgs);
      return { success: true, lead: newLead } as any;
    }
    if (path === "/admin/payments") {
      const payments = getStorageItem<any[]>("payments", []);
      const newP = { ...body, id: `pay-${Date.now()}`, created_at: new Date().toISOString() };
      payments.push(newP);
      setStorageItem("payments", payments);
      return newP as any;
    }
    if (path === "/admin/posts") {
      const posts = getStorageItem<any[]>("posts", []);
      const newPost = {
        ...body,
        id: `post-${Date.now()}`,
        published_at: body.published ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      posts.push(newPost);
      setStorageItem("posts", posts);
      return newPost as any;
    }
    if (path === "/admin/services") {
      const svcs = getStorageItem<any[]>("services", []);
      const newSvc = { ...body, id: body.id || `service-${Date.now()}` };
      svcs.push(newSvc);
      setStorageItem("services", svcs);
      return newSvc as any;
    }
    if (path === "/seed" || path === "/init") {
      return { success: true, message: "Database schema successfully re-initiated in developer mock sandbox." } as any;
    }

    return {} as any;
  },

  mockPut<T>(path: string, body: any): T {
    if (path.includes("/images/")) {
      const parts = path.split("/");
      const id = parts[parts.length - 1];
      // URL format is /projects/:id/images/:imageId
      const projectId = parts[2];
      const images = getStorageItem<any[]>("project_images", []);
      
      if (body.is_cover === true || body.image_type === 'hero') {
        images.forEach(img => {
          if (img.project_id === projectId && img.id !== id) {
            img.is_cover = false;
            img.image_type = 'gallery';
          }
        });
      }
      
      const idx = images.findIndex(x => x.id === id);
      if (idx !== -1) {
        images[idx] = { ...images[idx], ...body };
        setStorageItem("project_images", images);
        return images[idx] as any;
      }
    }

    if (path.startsWith("/admin/leads/")) {
      const id = path.split("/")[3];
      const leads = getStorageItem<any[]>("leads", []);
      const idx = leads.findIndex(x => x.id === id);
      if (idx !== -1) {
        leads[idx] = { ...leads[idx], ...body, updated_at: new Date().toISOString() };
        setStorageItem("leads", leads);
        return leads[idx] as any;
      }
    }
    if (path.startsWith("/admin/clients/")) {
      const id = path.split("/")[3];
      const clients = getStorageItem<any[]>("clients", []);
      const idx = clients.findIndex(x => x.id === id);
      if (idx !== -1) {
        clients[idx] = { ...clients[idx], ...body, updated_at: new Date().toISOString() };
        setStorageItem("clients", clients);
        return clients[idx] as any;
      }
    }
    if (path.startsWith("/admin/projects/")) {
      const id = path.split("/")[3];
      const projs = getStorageItem<any[]>("projects", []);
      const idx = projs.findIndex(x => x.id === id);
      if (idx === -1) throw new Error("Project not found");

      let name: string | undefined;
      let client_id: string | null | undefined;
      let project_type: string | undefined;
      let budget: string | undefined;
      let start_date: string | null | undefined;
      let end_date: string | null | undefined;
      let description: string | undefined;
      let published: boolean | undefined;
      let featured: boolean | undefined;
      let deletedImageIds: string[] = [];
      let finalOrder: string[] = [];
      let heroFiles: any[] = [];

      if (body instanceof FormData) {
        name = body.get("name") as string || undefined;
        client_id = body.get("client_id") === "null" ? null : (body.get("client_id") as string || undefined);
        project_type = body.get("project_type") as string || undefined;
        budget = body.get("budget") as string || undefined;
        start_date = body.get("start_date") === "null" ? null : (body.get("start_date") as string || undefined);
        end_date = body.get("end_date") === "null" ? null : (body.get("end_date") as string || undefined);
        description = body.get("description") as string || undefined;
        published = body.get("published") === "true" ? true : (body.get("published") === "false" ? false : undefined);
        featured = body.get("featured") === "true" ? true : (body.get("featured") === "false" ? false : undefined);

        const delStr = body.get("deleted_image_ids") as string;
        if (delStr) deletedImageIds = JSON.parse(delStr);

        const orderStr = body.get("final_order") as string;
        if (orderStr) finalOrder = JSON.parse(orderStr);

        heroFiles = body.getAll("hero_images");
      } else {
        name = body.name;
        client_id = body.client_id;
        project_type = body.project_type;
        budget = body.budget;
        start_date = body.start_date;
        end_date = body.end_date;
        description = body.description;
        published = body.published;
        featured = body.featured;
        deletedImageIds = body.deleted_image_ids || [];
        finalOrder = body.final_order || [];
      }

      const p = projs[idx];
      if (name !== undefined) p.name = name;
      if (client_id !== undefined) p.client_id = client_id;
      if (project_type !== undefined) p.project_type = project_type;
      if (budget !== undefined) p.budget = budget;
      if (start_date !== undefined) p.start_date = start_date;
      if (end_date !== undefined) p.end_date = end_date;
      if (description !== undefined) p.description = description;
      if (published !== undefined) p.published = published;
      if (featured !== undefined) p.featured = featured;
      p.updated_at = new Date().toISOString();

      let images = getStorageItem<any[]>("project_images", []);
      if (deletedImageIds.length > 0) {
        images = images.filter(img => !deletedImageIds.includes(img.id));
      }

      const newImageIds: string[] = [];
      if (heroFiles.length > 0) {
        heroFiles.forEach((file, index) => {
          const mockUrl = file instanceof File ? URL.createObjectURL(file) : "https://images.unsplash.com/photo-1693901103311-18a38b30a99e?q=80&w=1080";
          const newImg = {
            id: `img-${Date.now()}-${index}`,
            project_id: id,
            image_url: mockUrl,
            image_type: "hero",
            sort_order: 999 + index,
            image_order: 999 + index,
            caption: ""
          };
          images.push(newImg);
          newImageIds.push(newImg.id);
        });
      }

      if (finalOrder.length > 0) {
        let fileIdx = 0;
        const resolvedOrderIds: string[] = [];
        for (const item of finalOrder) {
          if (item.startsWith("new-")) {
            if (fileIdx < newImageIds.length) {
              resolvedOrderIds.push(newImageIds[fileIdx]);
              fileIdx++;
            }
          } else {
            if (!deletedImageIds.includes(item)) {
              resolvedOrderIds.push(item);
            }
          }
        }

        resolvedOrderIds.forEach((imgId, sIdx) => {
          const img = images.find(x => x.id === imgId);
          if (img) {
            img.sort_order = sIdx;
            img.image_order = sIdx;
          }
        });

        if (resolvedOrderIds.length > 0) {
          const firstImg = images.find(x => x.id === resolvedOrderIds[0]);
          if (firstImg) {
            p.cover_image = firstImg.image_url;
          }
        }
      }

      setStorageItem("project_images", images);
      setStorageItem("projects", projs);

      const finalHeroImages = images.filter(img => img.project_id === id && img.image_type === "hero").sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

      return {
        ...p,
        project: p,
        heroImages: finalHeroImages
      } as any;
    }
    if (path.startsWith("/admin/meetings/")) {
      const id = path.split("/")[3];
      const meets = getStorageItem<any[]>("meetings", []);
      const idx = meets.findIndex(x => x.id === id);
      if (idx !== -1) {
        meets[idx] = { ...meets[idx], ...body, updated_at: new Date().toISOString() };
        setStorageItem("meetings", meets);
        return meets[idx] as any;
      }
    }
    if (path.startsWith("/admin/messages/") && path.endsWith("/read")) {
      const id = path.split("/")[3];
      const msgs = getStorageItem<any[]>("messages", []);
      const idx = msgs.findIndex(x => x.id === id);
      if (idx !== -1) {
        msgs[idx].is_read = body.is_read;
        setStorageItem("messages", msgs);
        return msgs[idx] as any;
      }
    }
    if (path.startsWith("/admin/payments/")) {
      const id = path.split("/")[3];
      const payments = getStorageItem<any[]>("payments", []);
      const idx = payments.findIndex(x => x.id === id);
      if (idx !== -1) {
        payments[idx] = { ...payments[idx], ...body };
        setStorageItem("payments", payments);
        return payments[idx] as any;
      }
    }
    if (path.startsWith("/admin/posts/")) {
      const id = path.split("/")[3];
      const posts = getStorageItem<any[]>("posts", []);
      const idx = posts.findIndex(x => x.id === id);
      if (idx !== -1) {
        posts[idx] = { 
          ...posts[idx], 
          ...body, 
          published_at: body.published ? (posts[idx].published_at || new Date().toISOString()) : null,
          updated_at: new Date().toISOString() 
        };
        setStorageItem("posts", posts);
        return posts[idx] as any;
      }
    }
    if (path.startsWith("/admin/services/")) {
      const id = path.split("/")[3];
      const svcs = getStorageItem<any[]>("services", []);
      const idx = svcs.findIndex(x => x.id === id);
      if (idx !== -1) {
        svcs[idx] = { ...svcs[idx], ...body };
        setStorageItem("services", svcs);
        return svcs[idx] as any;
      }
    }

    return {} as any;
  },

  mockDelete(path: string): { success: boolean } {
    const parts = path.split("/");
    const id = parts[parts.length - 1];

    if (path.includes("/images/")) {
      const images = getStorageItem<any[]>("project_images", []);
      setStorageItem("project_images", images.filter(img => img.id !== id));
      return { success: true };
    }

    if (path.startsWith("/admin/leads/")) {
      const leads = getStorageItem<any[]>("leads", []);
      setStorageItem("leads", leads.filter(x => x.id !== id));
    }
    if (path.startsWith("/admin/clients/")) {
      const clients = getStorageItem<any[]>("clients", []);
      setStorageItem("clients", clients.filter(x => x.id !== id));
    }
    if (path.startsWith("/admin/projects/")) {
      const projs = getStorageItem<any[]>("projects", []);
      setStorageItem("projects", projs.filter(x => x.id !== id));
    }
    if (path.startsWith("/admin/meetings/")) {
      const meets = getStorageItem<any[]>("meetings", []);
      setStorageItem("meetings", meets.filter(x => x.id !== id));
    }
    if (path.startsWith("/admin/messages/")) {
      const msgs = getStorageItem<any[]>("messages", []);
      setStorageItem("messages", msgs.filter(x => x.id !== id));
    }
    if (path.startsWith("/admin/documents/")) {
      const docs = getStorageItem<any[]>("documents", []);
      setStorageItem("documents", docs.filter(x => x.id !== id));
    }
    if (path.startsWith("/admin/payments/")) {
      const payments = getStorageItem<any[]>("payments", []);
      setStorageItem("payments", payments.filter(x => x.id !== id));
    }
    if (path.startsWith("/admin/posts/")) {
      const posts = getStorageItem<any[]>("posts", []);
      setStorageItem("posts", posts.filter(x => x.id !== id));
    }
    if (path.startsWith("/admin/services/")) {
      const svcs = getStorageItem<any[]>("services", []);
      setStorageItem("services", svcs.filter(x => x.id !== id));
    }

    return { success: true };
  }
};
