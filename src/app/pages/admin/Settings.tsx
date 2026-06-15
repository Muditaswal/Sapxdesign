import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Database, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import { api } from "../../services/api";

export default function Settings() {
  const [initLoading, setInitLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);

  const [socials, setSocials] = useState({
    instagram: "",
    linkedin: "",
    facebook: "",
    pinterest: "",
  });
  const [socialLoading, setSocialLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    setSocialLoading(true);
    api.get<any>("/admin/settings/social")
      .then((data) => {
        if (data) {
          setSocials({
            instagram: data.instagram || "",
            linkedin: data.linkedin || "",
            facebook: data.facebook || "",
            pinterest: data.pinterest || "",
          });
        }
        setSocialLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch social links:", err);
        setSocialLoading(false);
      });
  }, []);

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    api.post<any>("/admin/settings/social", socials)
      .then((res) => {
        setSaveLoading(false);
        alert("Social media links updated successfully!");
      })
      .catch((err) => {
        setSaveLoading(false);
        alert(`Failed to save social links: ${err.message || err}`);
      });
  };

  const handleInitDB = () => {
    if (!confirm("Re-run database initialization schema? This will attempt to create all required tables, RLS policies, and indexes if they do not exist.")) return;
    setInitLoading(true);

    api.get<{ success: boolean; message: string }>("/init")
      .then((res) => {
        setInitLoading(false);
        alert(res.message || "Database initialized successfully!");
      })
      .catch((err) => {
        setInitLoading(false);
        alert(`Database initialization failed: ${err.message || err}. Ensure DB_URL is set on Deno edge function secrets.`);
      });
  };

  const handleSeedDB = () => {
    if (!confirm("Seed default studio services, testimonials, categories, tags, and projects into the database?")) return;
    setSeedLoading(true);

    api.post<{ success: boolean; message: string }>("/seed", {})
      .then((res) => {
        setSeedLoading(false);
        alert(res.message || "Database seeded successfully!");
      })
      .catch((err) => {
        setSeedLoading(false);
        alert(`Database seeding failed: ${err.message || err}`);
      });
  };

  return (
    <div className="space-y-10 max-w-[800px]">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Platform Settings</h1>
        <p className="text-white/40 text-sm mt-1">Configure platform options, initialize schemas, and seed demo records.</p>
      </div>

      {/* Social Media Links CMS Section */}
      <div className="bg-[#141416] p-8 rounded-[30px] border border-white/5 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          <SettingsIcon className="w-4 h-4 text-[#FFFF00]" /> Social Media links (CMS)
        </h3>
        <p className="text-xs text-white/50 leading-relaxed max-w-[600px]">
          Configure social media URLs displayed in the public footer. Leave empty to automatically hide the respective icon.
        </p>

        {socialLoading ? (
          <div className="flex py-10 justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#FFFF00] border-t-transparent"></div>
          </div>
        ) : (
          <form onSubmit={handleSaveSocials} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Instagram URL</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/yourprofile"
                  value={socials.instagram}
                  onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#FFFF00] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/company/yourprofile"
                  value={socials.linkedin}
                  onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#FFFF00] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Facebook URL</label>
                <input
                  type="url"
                  placeholder="https://facebook.com/yourprofile"
                  value={socials.facebook}
                  onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#FFFF00] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Pinterest URL</label>
                <input
                  type="url"
                  placeholder="https://pinterest.com/yourprofile"
                  value={socials.pinterest}
                  onChange={(e) => setSocials({ ...socials, pinterest: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#FFFF00] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saveLoading}
                className="px-5 py-2.5 bg-[#FFFF00] text-[#0A0A0B] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 animate-all duration-300"
              >
                {saveLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  "Save Social Links"
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Database utilities card */}
      <div className="bg-[#141416] p-8 rounded-[30px] border border-white/5 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          <Database className="w-4 h-4 text-[#FFFF00]" /> Database Operations
        </h3>
        <p className="text-xs text-white/50 leading-relaxed max-w-[600px]">
          These utility tools allow you to configure and populate your Supabase database schema directly from the Hono edge server using raw DDL. Use seed tools to instantiate core records.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          {/* Init schema button */}
          <div className="bg-[#0A0A0B]/40 p-5 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-between">
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-white/95 flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-[#EC0606]" /> Run Init DDL</h4>
              <p className="text-[10px] text-white/40 leading-relaxed">Creates user_roles, leads, clients, projects, meetings, payments, messages, documents, kv_store, and blog posts tables.</p>
            </div>
            <button
              onClick={handleInitDB}
              disabled={initLoading}
              className="w-full py-3 bg-[#141416] border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {initLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Initialize Schema"
              )}
            </button>
          </div>

          {/* Seed demo records button */}
          <div className="bg-[#0A0A0B]/40 p-5 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-between">
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-white/95 flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#FFFF00]" /> Seed Demo Data</h4>
              <p className="text-[10px] text-white/40 leading-relaxed">Populates categories, tags, default projects (Haus am See), dynamic testimonials, and studio expertise services.</p>
            </div>
            <button
              onClick={handleSeedDB}
              disabled={seedLoading}
              className="w-full py-3 bg-[#FFFF00] text-[#0A0A0B] font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {seedLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Seed Database"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Information metadata */}
      <div className="bg-[#141416] p-6 rounded-[24px] border border-white/5 text-xs text-white/40 space-y-2">
        <p className="font-bold text-white/55">Platform Status Info</p>
        <p>&bull; Edge Functions: active on /functions/v1/server</p>
        <p>&bull; Auth Provider: Supabase GoNative auth</p>
        <p>&bull; Design System: Tailored HSL premium UI components</p>
      </div>
    </div>
  );
}
