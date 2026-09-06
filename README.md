# SAP × Design — Space and Product Studio

> A premium, motion-led portfolio website and CRM platform for a multidisciplinary design studio, built to present services, projects, testimonials, and client trust signals with an immersive visual language.

**Live Site:** [sapxdesign.com](https://sapxdesign.com)  
**Design Reference:** [Figma Source](https://www.figma.com/design/MOBgL74DIZxwLs7ar44Y2S/Design-Agency-Portfolio-Website)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Public Website Sections](#public-website-sections)
6. [Admin CRM Panel](#admin-crm-panel)
7. [Database Schema](#database-schema)
8. [Environment Variables](#environment-variables)
9. [Getting Started](#getting-started)
10. [Build & Deployment](#build--deployment)
11. [SEO & Performance](#seo--performance)
12. [Security Headers](#security-headers)
13. [Design System](#design-system)
14. [Studio Contact](#studio-contact)
15. [Attributions & Licenses](#attributions--licenses)

---

## Project Overview

**Space and Product Studio (SAP × Design)** is a trans-disciplinary design studio based in New Delhi, operating at the intersection of architectural geometry and interface systems. This codebase contains:

- A **public-facing portfolio website** showcasing the studio's services, selected works, testimonials, and contact pipeline.
- A **full-featured admin CRM panel** for managing leads, clients, projects, meetings, payments, documents, and blog content.
- A **headless CMS layer** to manage hero content, services, projects, and site settings from the admin panel.

### Studio Services

| # | Service | Key Capabilities |
|---|---------|-----------------|
| 01 | **Space Design** | Architecture, Interior Design, Retail Design, Workspace Design, Hospitality Design, Experience Centers, Exhibition Design, Environmental Graphics, Wayfinding & Signage, 3D Visualization |
| 02 | **Product Design** | UX Research, Product Strategy, UX/UI Design, Mobile App Design, Web Design, Enterprise UX, SaaS Design, Design Systems, AI Product Design, Conversational AI Design |
| 03 | **Brand Design** | Brand Strategy, Visual Identity, Logo Design, Typography, Color Systems, Brand Guidelines, Marketing Collateral, Social Media Design |
| 04 | **Immersive Design** | Experience Design, Event Branding, Installation Design, Motion Design, Interaction Design |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18.3 + TypeScript 6 |
| **Build Tool** | Vite 6.3 |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Motion (Framer Motion) 12 |
| **Routing** | React Router DOM v7 |
| **UI Components** | Radix UI (full suite) + shadcn/ui + MUI v7 |
| **Icons** | Lucide React + React Icons |
| **Backend / Auth** | Supabase (PostgreSQL + Auth + Edge Functions) |
| **API Layer** | Hono.js (Supabase Edge Functions) |
| **Form Handling** | React Hook Form |
| **Charts** | Recharts |
| **Date Utilities** | date-fns |
| **Carousel** | Embla Carousel + React Slick |
| **Drag & Drop** | React DnD |
| **Deployment** | Vercel |
| **Fonts** | Montserrat + Syne (Google Fonts) |

---

## Project Structure

```
Sapxdesign-main/
+-- index.html                    # HTML entry with SEO meta, OG tags, Schema.org JSON-LD
+-- vite.config.ts                # Vite config: figma asset resolver, Tailwind, path aliases
+-- tsconfig.json                 # TypeScript strict config
+-- vercel.json                   # Vercel deployment + security headers + SPA rewrites
+-- postcss.config.mjs            # PostCSS config
+-- package.json                  # Dependencies & npm scripts
+-- install.cmd                   # Windows CLI installer (Antigravity CLI)
¦
+-- public/                       # Static public files (served as-is)
¦   +-- sitemap.xml               # SEO sitemap for crawlers
¦   +-- robots.txt                # Crawler access policy
¦   +-- google4e176cf1c827d06d.html  # Google Search Console verification
¦   +-- Portfolio.pdf             # Studio portfolio PDF
¦   +-- Resume.pdf                # Resume PDF
¦
+-- assets/                       # Project & client images
¦   +-- dasalon.png
¦   +-- eris.png
¦   +-- issa.png
¦   +-- matachanandevihospital.png
¦   +-- mdh.png
¦   +-- *.png                     # Additional project imagery
¦
+-- supabase/                     # Backend configuration
¦   +-- migrations/
¦   ¦   +-- 20260613000000_crm_schema.sql           # Full CRM relational schema
¦   ¦   +-- 20260615000000_seo_and_gallery_upgrade.sql
¦   ¦   +-- 20260616000000_immersive_design_check_constraint.sql
¦   +-- functions/
¦       +-- server/               # Hono.js edge function API router
¦
+-- src/
    +-- main.tsx                  # React root mount point
    +-- vite-env.d.ts             # Vite env type declarations
    +-- styles/                   # Global stylesheets
    +-- app/
        +-- App.tsx               # Root router — public + protected admin routes
        +-- types/
        ¦   +-- crm.ts            # TypeScript interfaces for all CRM entities
        +-- services/
        ¦   +-- supabase.ts       # Supabase client initialization
        ¦   +-- api.ts            # Unified API layer (REST + localStorage mock)
        +-- components/           # Shared UI components
        ¦   +-- HeroSection.tsx       # Fullscreen slideshow + audience matrix
        ¦   +-- Navbar.tsx            # Responsive nav with mobile drawer
        ¦   +-- ServicesSection.tsx   # Service cards + fullscreen detail modal
        ¦   +-- AboutSection.tsx      # Studio about section
        ¦   +-- ProcessSection.tsx    # Design process visualization
        ¦   +-- ProjectsSection.tsx   # Filterable portfolio grid
        ¦   +-- TestimonialsSection.tsx  # Client testimonials
        ¦   +-- ClientLogos.tsx       # Client logo trust bar
        ¦   +-- ClientsMarquee.tsx    # Infinite scrolling marquee
        ¦   +-- ContactSection.tsx    # Contact form (name/email/phone/type/message)
        ¦   +-- MidPageCta.tsx        # "Book a free call" mid-page CTA
        ¦   +-- CTACards.tsx          # CTA card blocks
        ¦   +-- ImageStrip.tsx        # Horizontal image strip
        ¦   +-- Footer.tsx            # Footer with social links + nav
        ¦   +-- CustomCursor.tsx      # Custom animated cursor
        ¦   +-- ScrollReveal.tsx      # Scroll-triggered reveal wrapper
        ¦   +-- SEO.tsx               # Dynamic per-page SEO meta injection
        ¦   +-- ErrorBoundary.tsx     # Global React error boundary
        ¦   +-- ui/                   # shadcn/ui component library
        +-- pages/
            +-- public/
            ¦   +-- Home.tsx          # Main landing page
            ¦   +-- ProjectDetail.tsx # Individual project case study
            ¦   +-- Portfolios.tsx    # Category-filtered portfolio
            ¦   +-- BlogList.tsx      # Blog listing page
            ¦   +-- BlogPost.tsx      # Individual blog post
            ¦   +-- NotFound.tsx      # Custom 404 page
            +-- admin/                # Auth-protected admin panel
                +-- Login.tsx         # Admin login screen
                +-- AdminLayout.tsx   # Admin sidebar + layout shell
                +-- Dashboard.tsx     # KPI stats + charts
                +-- Leads.tsx         # Lead pipeline manager
                +-- Clients.tsx       # Client profiles
                +-- Projects.tsx      # Full project CRUD + media
                +-- Meetings.tsx      # Meeting scheduler & logs
                +-- Messages.tsx      # Contact form inbox
                +-- Documents.tsx     # Project document vault
                +-- Payments.tsx      # Payment tracking
                +-- BlogCMS.tsx       # Blog post editor
                +-- Services.tsx      # Services CMS
                +-- HeroCMS.tsx       # Hero slideshow/matrix/marquee CMS
                +-- Settings.tsx      # Studio settings
```

---

## Features

### Public Website
- **Motion Hero Slideshow** — Full-screen auto-rotating carousel (6s interval) with crossfade and animated text transitions
- **Audience Matrix** — Interactive 4-panel service explorer; panels expand on hover/tap with color themes per discipline
- **Clients Marquee** — Infinite scroll client trust logos
- **Filterable Projects Grid** — Filter by All / Space / Product / Brand / Immersive Design
- **Project Case Study Pages** — Hero, studio roles, process, outcomes, and image gallery
- **Portfolio Category Pages** — At `/portfolio/:category`
- **Services Full-Screen Modal** — Premium overlay per service with capabilities list and imagery
- **Blog** — Article list and single post views
- **Custom Cursor** — Animated studio-branded pointer
- **Scroll Reveal Animations** — Staggered viewport-triggered reveals
- **Mid-Page CTA** — "Book a free call with our experts. Let's talk."
- **Contact Form** — Submits to Supabase; falls back to `mailto:` on error
- **Luxury 404 Page** — Glassmorphic design matching studio aesthetics
- **Global Error Boundary** — Styled crash handler with reload option

### Admin CRM Panel
- **Dashboard** — KPI cards (leads, revenue, projects, meetings), charts, recent activity
- **Lead Pipeline** — Full funnel: `new ? contacted ? meeting_scheduled ? proposal_sent ? won/lost`
- **Client Manager** — Profiles with notes and project associations
- **Project Manager** — Full CRUD: type, status, budget, dates, SEO fields, hero video, cover + gallery images, structured content sections, documents, payments, notes
- **Meeting Logs** — Schedule and track client meetings with next-action notes
- **Messages Inbox** — Read/manage contact form submissions; one-click upgrade to lead
- **Document Vault** — Attach proposals, contracts, deliverables per project
- **Payment Tracker** — Record advance, milestone, final, and refund payments
- **Blog CMS** — Full CRUD for posts with categories, tags, SEO, and publish control
- **Services CMS** — Edit capabilities checklist (40+ capabilities) per service
- **Hero CMS** — Manage slideshow slides, audience matrix items, and marquee client list
- **Settings** — Studio contact details and social media URLs

---

## Public Website Sections

### Home (`/`)

```
Navbar
  +-- HeroSection
        +-- WorksSlideshow (fullscreen image carousel)
        +-- ClientsMarquee (infinite scroll)
        +-- AudienceMatrix (4-panel interactive service explorer)
  +-- ServicesSection
  +-- AboutSection
  +-- ProcessSection
  +-- ImageStrip
  +-- ProjectsSection (filterable grid)
  +-- MidPageCta
  +-- TestimonialsSection
  +-- CTACards
  +-- ContactSection
  +-- Footer
```

### Other Public Pages
| Route | Page |
|-------|------|
| `/projects/:slug` | Project case study (hero, role, process, outcomes, gallery) |
| `/portfolio/:category` | Category-filtered project grid |
| `/blog` | Blog article listing |
| `/blog/:slug` | Individual blog post |
| `*` | Luxury 404 not-found page |

---

## Admin CRM Panel

**Entry:** `/admin/login`  
**Dashboard:** `/admin` (requires authentication)

### Admin Routes

| Path | Module | Description |
|------|--------|-------------|
| `/admin` | Dashboard | KPI overview, charts, activity feed |
| `/admin/leads` | Leads | Pipeline management |
| `/admin/clients` | Clients | Client relationship management |
| `/admin/projects` | Projects | Full project CRUD + media |
| `/admin/meetings` | Meetings | Meeting schedule & logs |
| `/admin/messages` | Messages | Contact form inbox |
| `/admin/documents` | Documents | Project document vault |
| `/admin/payments` | Payments | Payment tracking |
| `/admin/blog` | Blog CMS | Blog post editor |
| `/admin/services` | Services CMS | Service capabilities editor |
| `/admin/hero` | Hero CMS | Slideshow, matrix, marquee editor |
| `/admin/settings` | Settings | Studio settings |

### Authentication Modes
| Mode | Behavior |
|------|----------|
| **Production** | Supabase Auth via `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` |
| **Mock/Offline** | Set `localStorage.setItem("sb-mock-session", "true")` to bypass auth |

---

## Database Schema

Hosted on **Supabase PostgreSQL** with Row Level Security (RLS) enabled on all tables.

### Tables

| Table | Description |
|-------|-------------|
| `user_roles` | Admin role assignments |
| `leads` | Prospect lead records |
| `clients` | Client profiles |
| `projects` | Project records with SEO + portfolio metadata |
| `project_sections` | Structured content blocks per project (hero/role/process/outcome) |
| `project_images` | Gallery images per project |
| `project_notes` | Internal project notes |
| `client_notes` | Internal client notes |
| `meetings` | Meeting records linked to client/project |
| `messages` | Contact form submissions |
| `documents` | Project-attached files |
| `payments` | Payment records per project |
| `blog_categories` | Blog category taxonomy |
| `blog_tags` | Blog tag taxonomy |
| `blog_posts` | Blog articles with SEO and publish control |
| `services` | Studio services (CMS-managed) |
| `settings` | Studio contact details and social links |
| `hero_config` | Hero slideshow, matrix, marquee configuration |
| `testimonials` | Client testimonial records |

### Lead Status Pipeline
```
new ? contacted ? meeting_scheduled ? proposal_sent ? won | lost
```

### Project Status Pipeline
```
Inquiry ? Proposal ? Design ? Execution ? Completed
```

### Project Types
`Space Design` · `Product Design` · `Brand Design` · `Immersive Design` · `Experience Design` · `Architecture` · `Interior Design` · `Branding` · `Research` · `UI/UX Design`

### Payment Types
`advance` · `milestone` · `final` · `refund`

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Required for Supabase connection
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Override API base URL
VITE_API_URL=https://your-project.supabase.co/functions/v1/server/make-server-f1100bc4
```

> **Offline Mode:** If these variables are absent or contain `"placeholder"`, the app automatically runs in mock mode — all data is seeded to `localStorage`, and auth is bypassed with `sb-mock-session = true`.

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm / yarn / pnpm

### Install

```bash
git clone <repo-url>
cd Sapxdesign-main
npm install
```

### Run Dev Server

```bash
npm run dev
# App available at http://localhost:5173
```

### Access Admin Panel (Local / No Supabase)

1. Go to `http://localhost:5173/admin/login`
2. Open DevTools ? Application ? Local Storage
3. Add key: `sb-mock-session` | Value: `true`
4. Refresh — the full mock CRM is available with seeded data

---

## Build & Deployment

### Production Build

```bash
npm run build
# Output: ./dist/
```

### Deploy to Vercel

```bash
vercel --prod
```

The [`vercel.json`](./vercel.json) configures:
- **SPA rewrites** — all routes point to `index.html` for React Router
- **Security headers** — see [Security Headers](#security-headers)

### Deploy Supabase Edge Functions

```bash
supabase functions deploy server
```

---

## SEO & Performance

| Feature | Detail |
|---------|--------|
| **Title & Description** | Per-page via `<SEO />` component; base in `index.html` |
| **Open Graph** | `og:title`, `og:description`, `og:image`, `og:url` |
| **Twitter Cards** | `summary_large_image` card type |
| **Schema.org JSON-LD** | `ArchitecturalOffice` structured data — address, geo, hours, social links |
| **Google Fonts Preconnect** | `<link rel="preconnect">` for Fonts API + gstatic CDN |
| **Sitemap** | `/public/sitemap.xml` |
| **robots.txt** | `/public/robots.txt` |
| **Canonical URL** | `<link rel="canonical" href="https://sapxdesign.com/">` |
| **Code Splitting** | All routes lazy-loaded via `React.lazy` + `Suspense` |
| **Image Priority** | `fetchPriority="high"` on hero; `loading="lazy"` on gallery images |

---

## Security Headers

Applied via `vercel.json` to all routes:

| Header | Value |
|--------|-------|
| `Content-Security-Policy` | Restricts scripts, styles, fonts, images, and API connections |
| `X-Frame-Options` | `DENY` — prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disables camera, microphone, geolocation, interest-cohort |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `X-XSS-Protection` | `1; mode=block` |

---

## Design System

### Typography

| Font | Weights | Usage |
|------|---------|-------|
| **Syne** | 400–800 | Display headings, hero titles, section headers |
| **Montserrat** | 100–900 (+ italic) | Body copy, labels, UI text, captions |

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Studio Black | `#0A0A0B` | Primary background, dark panels |
| Brutalist Red | `#EC0606` | Product Design accent, category labels, CTAs |
| Warning Yellow | `#FFFF00` | Brand Design accent, next-slide button, spinners |
| Pure White | `#FFFFFF` | Immersive Design accent, text on dark |
| White Muted | `rgba(255,255,255,0.4)` | Borders, dividers, muted labels |

### Animations

| Effect | Library | Easing |
|--------|---------|--------|
| Crossfade slideshow | Framer Motion `AnimatePresence` | `[0.22, 1, 0.36, 1]` |
| Panel expand/collapse | Framer Motion `animate` flex | `[0.22, 1, 0.36, 1]` |
| Text slide-up reveals | Framer Motion `AnimatePresence` | Custom cubic-bezier |
| Scroll reveals | `ScrollReveal` wrapper (Intersection Observer) | CSS transition |
| Page load spinner | CSS `animate-spin` | — |

---

## Studio Contact

| Field | Value |
|-------|-------|
| **Studio** | Space and Product Studio |
| **Also known as** | SAP × Design |
| **Address** | 149 DDA Flat, Lado Sarai, New Delhi – 110030, India |
| **Phone** | +91 8368544334 |
| **Email** | spaceandproductstudio@gmail.com |
| **Hours** | Mon–Sat, 10:00–19:00 IST |
| **Instagram** | [@sapxdesign](https://www.instagram.com/sapxdesign) |
| **LinkedIn** | [Space and Product Studio](https://www.linkedin.com/company/space-and-product-studio/) |
| **Facebook** | [Space and Product Studio](https://www.facebook.com/people/Space-and-Product-Studio/61557185401633/) |
| **Pinterest** | [spaceandproductstudio](https://www.pinterest.com/spaceandproductstudio/) |
| **Behance** | [sapxdesign](https://www.behance.net/sapxdesign) |
| **Dribbble** | [sapxdesign](https://dribbble.com/sapxdesign) |

---

## Attributions & Licenses

- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) — [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- **Photography:** [Unsplash](https://unsplash.com) — [Unsplash License](https://unsplash.com/license)
- **Design Reference:** [Figma Design Agency Portfolio Template](https://www.figma.com/design/MOBgL74DIZxwLs7ar44Y2S/Design-Agency-Portfolio-Website)

---

## Changelog Highlights

See [`changes.md`](./changes.md) for full details. Key production milestones:

- ? TypeScript strict config + path aliasing (`@/` ? `src/`)
- ? Global `ErrorBoundary` with styled recovery UI
- ? Lazy-loaded routes with Suspense spinners
- ? Full SEO: meta, OG, Twitter, sitemap, robots.txt, Schema.org JSON-LD
- ? CRM schema: leads, clients, projects, meetings, payments, documents, blog
- ? Hono.js edge function API with lead conversion & dashboard aggregation
- ? Hero CMS for slideshow, matrix, and marquee
- ? Services CMS with 40+ capability checklist
- ? Phone field on contact form with DB persistence
- ? Client logos: Mata Chanan Devi Hospital, Dasalon, Eris, ISSA, MDH
- ? Luxury glassmorphic 404 page
- ? Vercel security headers (CSP, HSTS, XSS protection)
