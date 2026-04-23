import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// --- DATA ---
const WORKS = [
  { 
    id: 1, 
    src: "https://images.unsplash.com/photo-1768268959019-13e91660e381?q=80&w=1920", 
    title: "ARCHITECTURE", 
    category: "Physical Space" 
  },
  { 
    id: 2, 
    src: "https://images.unsplash.com/photo-1663153203126-08bbadc178ad?q=80&w=1920", 
    title: "DIGITAL PLATFORMS", 
    category: "Interface" 
  },
  { 
    id: 3, 
    src: "https://images.unsplash.com/photo-1680210851164-906d2940ff34?q=80&w=1920", 
    title: "INTERIOR DESIGN", 
    category: "Environment" 
  },
  { 
    id: 4, 
    src: "https://images.unsplash.com/photo-1551907234-fb773fb08a2a?q=80&w=1920", 
    title: "INDUSTRIAL DESIGN", 
    category: "Object" 
  },
];

const AUDIENCES = [
  {
    id: "architecture",
    title: "ARCHITECTURE",
    heading: "PHYSICAL\nSPACES",
    desc: "Building structures with absolute spatial logic and raw materiality.",
    color: "#0A0A0B", // Black
    textColor: "#FFFFFF",
    image: "https://images.unsplash.com/photo-1504625709867-b4e45e3bb9dd?q=80&w=1080",
  },
  {
    id: "ui-ux",
    title: "UI/UX DESIGN",
    heading: "DIGITAL\nPLATFORMS",
    desc: "Scalable design systems and high-conversion interfaces built for modern digital products.",
    color: "#EC0606", // Brutalist Red
    textColor: "#FFFFFF",
    image: "https://images.unsplash.com/photo-1772272935464-2e90d8218987?q=80&w=1080",
  },
  {
    id: "interior",
    title: "INTERIOR DESIGN",
    heading: "ENVIRONMENTS &\nSPACES",
    desc: "Highly considered spaces and bespoke environments tailored to spatial logic.",
    color: "#FFFF00", // Warning Yellow
    textColor: "#0A0A0B",
    image: "https://images.unsplash.com/photo-1545805453-e95c05f330dc?q=80&w=1080",
  },
  {
    id: "product",
    title: "PRODUCT DESIGN",
    heading: "INDUSTRIAL\nOBJECTS",
    desc: "Physical embodiments of core identity. Industrial design that communicates quality.",
    color: "#FFFFFF", // White
    textColor: "#0A0A0B",
    image: "https://images.unsplash.com/photo-1769946797489-e99b2a5c1dfc?q=80&w=1080",
  },
];


// --- SLIDESHOW COMPONENT ---
function WorksSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % WORKS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % WORKS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + WORKS.length) % WORKS.length);

  return (
    <section className="relative w-full h-auto min-h-[calc(100vh-60px)] md:min-h-screen bg-[#0A0A0B] overflow-hidden group border-b border-white/10">
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img 
            src={WORKS[currentIndex].src} 
            alt={WORKS[currentIndex].title} 
            className="w-full h-full object-cover opacity-60 mix-blend-lighten" 
          />
          {/* Dark gradients to preserve text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none border-x border-white/5 w-[calc(100%-48px)] md:w-[calc(100%-160px)] mx-auto" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-14 z-10 pointer-events-none">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <div className="hidden"></div>
          <div 
            className="text-white text-[12px] md:text-[14px] uppercase tracking-[0.2em] font-bold" 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {String(currentIndex + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}
          </div>
        </div>

        {/* Bottom Content & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
          <div className="overflow-hidden w-full max-w-[1200px] min-w-0 pr-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-50%", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <span 
                  className="text-[12px] md:text-[15px] text-[#EC0606] uppercase tracking-[0.3em] font-bold mb-3 md:mb-5 block" 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {WORKS[currentIndex].category}
                </span>
                <h2 
                  className="text-[clamp(14px,5.2vw,64px)] leading-[0.92] md:leading-[0.85] tracking-[-0.03em] text-white font-black uppercase drop-shadow-2xl whitespace-nowrap" 
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                >
                  {WORKS[currentIndex].title}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 pointer-events-auto shrink-0 mb-2 md:mb-0">
            <button 
              onClick={prevSlide} 
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/20 hover:bg-white hover:text-[#0A0A0B] transition-colors text-white rounded-full cursor-pointer backdrop-blur-md bg-[#0A0A0B]/40"
            >
              <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
            </button>
            <button 
              onClick={nextSlide} 
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/20 hover:bg-[#FFFF00] hover:text-[#0A0A0B] hover:border-[#FFFF00] transition-colors text-white rounded-full cursor-pointer backdrop-blur-md bg-[#0A0A0B]/40"
            >
              <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


// --- AUDIENCE MATRIX COMPONENT ---
function AudienceMatrix() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleInteraction = (id: string, type: "hover" | "click") => {
    if (type === "hover" && !isTouch) setActiveId(id);
    if (type === "click" && isTouch) {
      setActiveId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <section id="services" className="relative w-full h-auto min-h-[calc(100vh-60px)] md:min-h-screen flex flex-col md:flex-row bg-[#0A0A0B] overflow-hidden gap-2 p-2">
      {AUDIENCES.map((aud) => {
        const isActive = activeId === aud.id;
        const isMuted = activeId !== null && activeId !== aud.id;
        
        const flexValue = isActive ? 3 : isMuted ? 0.5 : 1;

        return (
          <motion.div
            key={aud.id}
            onMouseEnter={() => handleInteraction(aud.id, "hover")}
            onMouseLeave={() => !isTouch && setActiveId(null)}
            onClick={() => handleInteraction(aud.id, "click")}
            animate={{
              flex: flexValue,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between min-h-[180px] md:min-h-0 p-6 md:p-10 rounded-[32px] group overflow-hidden cursor-pointer"
            style={{
              backgroundColor: isActive ? aud.color : "#0A0A0B",
              color: isActive ? aud.textColor : "#FFFFFF",
            }}
          >
            {/* Background Image Reveal */}
            <motion.div
              animate={{
                opacity: isActive ? 0.8 : 0.4,
                scale: isActive ? 1 : 1.1,
                filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
              }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <img
                src={aud.image}
                alt={aud.title}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </motion.div>

            {isActive && (
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay z-0 pointer-events-none" />
            )}

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              
              {/* Top */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-4 h-[2px] transition-colors duration-500"
                      style={{ backgroundColor: isActive ? aud.textColor : "rgba(255,255,255,0.4)" }} 
                    />
                    <h2
                      className="text-[11px] md:text-[13px] uppercase tracking-[0.2em] transition-opacity duration-500"
                      style={{ 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontWeight: 700,
                        opacity: isActive ? 0.8 : 0.4
                      }}
                    >
                      {aud.title}
                    </h2>
                  </div>
                </div>
                
                <motion.div
                  animate={{ 
                    rotate: isActive ? 0 : 45,
                    opacity: isActive ? 1 : 0.2
                  }}
                  className="shrink-0"
                >
                  <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8" />
                </motion.div>
              </div>

              {/* Bottom */}
              <div className="flex flex-col justify-end h-full">
                <h3
                  className={`leading-[0.85] tracking-[-0.03em] whitespace-pre-line transition-all duration-500 uppercase ${
                    isMuted ? "text-[10px] md:text-[12px] lg:text-[14px]" : "text-[clamp(20px,4vw,72px)]"
                  }`}
                  style={{ 
                    fontFamily: "'Syne', sans-serif", 
                    fontWeight: 800,
                    opacity: isMuted ? 0.3 : 1
                  }}
                >
                  {aud.heading}
                </h3>

                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? 24 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className="text-[13px] md:text-[16px] leading-[1.6] max-w-[420px]"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                  >
                    {aud.desc}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent('open-service', { detail: aud.id === "ui-ux" ? "uiux" : aud.id }));
                      setTimeout(() => {
                        document.getElementById('services-detail')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="mt-6 md:mt-8 px-6 py-3 text-[11px] uppercase tracking-[0.15em] border border-current rounded-full pointer-events-auto transition-colors duration-300"
                    style={{ 
                      fontFamily: "'Montserrat', sans-serif", 
                      fontWeight: 700,
                      backgroundColor: "transparent",
                      color: "inherit"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = aud.textColor;
                      e.currentTarget.style.color = aud.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "inherit";
                    }}
                  >
                    Explore Capabilities
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

import { ClientsMarquee } from "./ClientsMarquee";

// --- MAIN EXPORT ---
export function HeroSection() {
  return (
    <div className="flex flex-col w-full">
      <WorksSlideshow />
      <ClientsMarquee />
      <AudienceMatrix />
    </div>
  );
}
