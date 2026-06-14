import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col justify-between">
      <Navbar showSplash={false} />

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center pt-32">
        <h1 className="text-[clamp(80px,15vw,180px)] font-black text-white/5 leading-none tracking-tighter" style={{ fontFamily: "'Syne', sans-serif" }}>
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white mt-4 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
          Page Not Found
        </h2>
        <p className="text-white/40 text-xs md:text-sm max-w-sm mb-10 leading-relaxed font-light">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFFF00] text-[#0A0A0B] text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return Home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
