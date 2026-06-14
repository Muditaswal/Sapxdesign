export interface UserRole {
  user_id: string;
  role: 'admin';
  created_at?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  status: 'new' | 'contacted' | 'meeting_scheduled' | 'proposal_sent' | 'won' | 'lost';
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientNote {
  id: string;
  client_id: string;
  content: string;
  created_at: string;
}

export interface ProjectNote {
  id: string;
  project_id: string;
  content: string;
  created_at: string;
}

export interface Project {
  id: string;
  client_id?: string;
  name: string;
  slug: string;
  project_type: 'Space Design' | 'Product Design' | 'Brand Design' | 'Experience Design' | 'Architecture' | 'Interior Design' | 'Branding' | 'Research' | 'UI/UX Design';
  description?: string;
  status: 'Inquiry' | 'Proposal' | 'Design' | 'Execution' | 'Completed';
  budget?: string;
  start_date?: string;
  end_date?: string;
  category?: string; // For portfolio compatibility
  year?: number;      // For portfolio year
  location?: string;
  cover_image?: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations loaded optionally
  client?: Client;
  sections?: ProjectSection[];
  images?: ProjectImage[];
  notes?: ProjectNote[];
  documents?: DocumentFile[];
  payments?: Payment[];
}

export interface ProjectSection {
  id: string;
  project_id: string;
  section_type: 'hero' | 'role' | 'process' | 'outcome';
  title?: string;
  content?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption?: string;
  image_type: 'hero' | 'gallery' | 'process';
  sort_order: number;
  created_at?: string;
}

export interface Meeting {
  id: string;
  client_id?: string;
  project_id?: string;
  meeting_date: string;
  notes?: string;
  next_action?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  client?: Client;
  project?: Project;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface DocumentFile {
  id: string;
  project_id: string;
  name: string;
  file_url: string;
  file_type?: string;
  created_at: string;
  
  // Relation
  project?: Project;
}

export interface Payment {
  id: string;
  project_id: string;
  amount: number;
  payment_type: 'advance' | 'milestone' | 'final' | 'refund';
  payment_date: string;
  notes?: string;
  created_at: string;
  
  // Relation
  project?: Project;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published: boolean;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  category_id?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  category?: BlogCategory;
  tags?: BlogTag[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  short_desc: string;
  full_desc: string;
  capabilities: string[];
  image?: string;
  created_at?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role?: string;
  org?: string;
  created_at?: string;
}
