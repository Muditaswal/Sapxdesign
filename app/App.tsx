import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./services/supabase";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Public Views (Lazy Loaded)
const Home = lazy(() => import("./pages/public/Home"));
const ProjectDetail = lazy(() => import("./pages/public/ProjectDetail"));
const Portfolios = lazy(() => import("./pages/public/Portfolios"));
const BlogList = lazy(() => import("./pages/public/BlogList"));
const BlogPost = lazy(() => import("./pages/public/BlogPost"));
const NotFound = lazy(() => import("./pages/public/NotFound"));

// Admin Views (Lazy Loaded)
const Login = lazy(() => import("./pages/admin/Login"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Leads = lazy(() => import("./pages/admin/Leads"));
const Clients = lazy(() => import("./pages/admin/Clients"));
const Projects = lazy(() => import("./pages/admin/Projects"));
const Meetings = lazy(() => import("./pages/admin/Meetings"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const Documents = lazy(() => import("./pages/admin/Documents"));
const Payments = lazy(() => import("./pages/admin/Payments"));
const BlogCMS = lazy(() => import("./pages/admin/BlogCMS"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Services = lazy(() => import("./pages/admin/Services"));

// Route Guard Wrapper for Admin space
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isPlaceholder = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes("placeholder");
    if (isPlaceholder) {
      const mockSession = localStorage.getItem("sb-mock-session") === "true";
      setIsAuthenticated(mockSession);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0A0A0B] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-[#0A0A0B] text-white">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFFF00] border-t-transparent"></div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/portfolio/:category" element={<Portfolios />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="clients" element={<Clients />} />
              <Route path="projects" element={<Projects />} />
              <Route path="meetings" element={<Meetings />} />
              <Route path="messages" element={<Messages />} />
              <Route path="documents" element={<Documents />} />
              <Route path="payments" element={<Payments />} />
              <Route path="blog" element={<BlogCMS />} />
              <Route path="settings" element={<Settings />} />
              <Route path="services" element={<Services />} />
            </Route>

            {/* Fallback to 404 NotFound Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}