import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { supabase } from "../../services/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If session already exists, navigate to admin home
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const isPlaceholder = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes("placeholder");
    if (isPlaceholder) {
      if (email === "admin@sapxdesign.com" && password === "admin123") {
        localStorage.setItem("sb-mock-session", "true");
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 800);
        return;
      } else {
        setError("Developer Mode: Please enter 'admin@sapxdesign.com' and password 'admin123' to bypass unconfigured database credentials.");
        setLoading(false);
        return;
      }
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        navigate("/admin", { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0B] text-white px-6">
      <div className="w-full max-w-[450px] bg-[#141416] p-8 md:p-10 rounded-[30px] border border-white/5 shadow-2xl relative">
        {/* Red accent line */}
        <div className="absolute top-0 left-10 right-10 h-[3px] bg-[#EC0606] rounded-b-full" />

        <div className="text-center mb-8">
          <h2
            className="text-[28px] font-extrabold uppercase tracking-tight mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Studio CRM Login
          </h2>
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">
            Administrative Access Only
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-start gap-3">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sapxdesign.com"
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm placeholder:text-white/20 focus:border-[#FFFF00] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm placeholder:text-white/20 focus:border-[#FFFF00] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#FFFF00] text-[#0A0A0B] uppercase tracking-widest font-extrabold text-xs rounded-xl hover:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0A0A0B] border-t-transparent"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
