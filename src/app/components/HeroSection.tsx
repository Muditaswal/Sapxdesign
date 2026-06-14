import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../services/api";

// --- FALLBACK DEFAULT DATA ---
const WORKS_DEFAULT = [
  { 
    id: "space", 
    src: "https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTY1ODc2MHww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral", 
    title: "SPACE DESIGN", 
    category: "Physical Space" 
  },
  { 
    id: "product", 
    src: "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc3MTcxMTYyNnww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral", 
    title: "PRODUCT DESIGN", 
    category: "Interface" 
  },
  { 
    id: "brand", 
    src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1920&auto=format&fit=crop", 
    title: "BRAND DESIGN", 
    category: "Brand Identity" 
  },
  { 
    id: "experience", 
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1920&auto=format&fit=crop", 
    title: "EXPERIENCE DESIGN", 
    category: "Interaction & Experience" 
  },
];

const AUDIENCES_DEFAULT = [
  {
    id: "space",
    title: "SPACE DESIGN",
    heading: "SPACE\nDESIGN",
    desc: "We design physical environments and built experiences.",
    color: "#0A0A0B", // Black
    textColor: "#FFFFFF",
    image: "https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTY1ODc2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "product",
    title: "PRODUCT DESIGN",
    heading: "PRODUCT\nDESIGN",
    desc: "We shape digital products and intelligent systems.",
    color: "#EC0606", // Brutalist Red
    textColor: "#FFFFFF",
    image: "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc3MTcxMTYyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "brand",
    title: "BRAND DESIGN",
    heading: "BRAND\nDESIGN",
    desc: "We build brands and communication systems.",
    color: "#FFFF00", // Warning Yellow
    textColor: "#0A0A0B",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "experience",
    title: "EXPERIENCE DESIGN",
    heading: "EXPERIENCE\nDESIGN",
    desc: "We design interactions between brands and people.",
    color: "#FFFFFF", // White
    textColor: "#0A0A0B",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1080&auto=format&fit=crop",
  },
];

interface ServiceProp {
  services: any[];
}

// --- SLIDESHOW COMPONENT ---
function WorksSlideshow({ services }: ServiceProp) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Map backend services dynamically to slideshow slides
  const slides = services.length > 0 
    ? services.filter(s => s.show_in_slideshow !== false).map((s, index) => {
        let category = "Studio Capability";
        if (s.id === "space") category = "Physical Space";
        else if (s.id === "product") category = "Interface";
        else if (s.id === "brand") category = "Brand Identity";
        else if (s.id === "experience") category = "Interaction & Experience";

        const fallbackSlide = WORKS_DEFAULT[index % WORKS_DEFAULT.length];

        return {
          id: s.id,
          src: s.image || fallbackSlide.src,
          title: s.title.toUpperCase(),
          category
        };
      })
    : WORKS_DEFAULT;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const activeIndex = currentIndex >= slides.length ? 0 : currentIndex;
  const activeSlide = slides[activeIndex];
  if (!activeSlide) return null;

  return (
    <section className="relative w-full h-auto min-h-[calc(100vh-60px)] md:min-h-screen bg-[#0A0A0B] overflow-hidden group border-b border-white/10">
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img 
            src={activeSlide.src} 
            alt={activeSlide.title} 
            className="w-full h-full object-cover opacity-60 mix-blend-lighten" 
          />
          {/* Dark gradients to preserve text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>



      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-14 z-10 pointer-events-none">
        
        {/* Top Header Spacer */}
        <div className="h-6" />

        {/* Bottom Content & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
          <div className="overflow-hidden w-full max-w-[1200px] min-w-0 pr-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
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
                  {activeSlide.category}
                </span>
                <h2 
                  className="text-[clamp(32px,7vw,48px)] md:text-[clamp(48px,6.5vw,72px)] lg:text-[clamp(60px,8vw,100px)] leading-[0.9] tracking-[-0.03em] text-white font-black uppercase whitespace-pre-line break-words" 
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                >
                  {activeSlide.title}
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
function AudienceMatrix({ services }: ServiceProp) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Map backend services dynamically to matrix items
  const audiencesList = services.length > 0
    ? services.filter(s => s.show_in_matrix !== false).map((s, index) => {
        const fallbackAud = AUDIENCES_DEFAULT[index % AUDIENCES_DEFAULT.length];

        let color = "#0A0A0B";
        let textColor = "#FFFFFF";
        if (s.id === "space") {
          color = "#0A0A0B";
          textColor = "#FFFFFF";
        } else if (s.id === "product") {
          color = "#EC0606";
          textColor = "#FFFFFF";
        } else if (s.id === "brand") {
          color = "#FFFF00";
          textColor = "#0A0A0B";
        } else if (s.id === "experience") {
          color = "#FFFFFF";
          textColor = "#0A0A0B";
        }

        return {
          id: s.id,
          title: s.title.toUpperCase(),
          heading: s.title.toUpperCase().replace(" DESIGN", "\nDESIGN"),
          desc: s.short_desc || fallbackAud.desc,
          color,
          textColor,
          image: s.image || fallbackAud.image
        };
      })
    : AUDIENCES_DEFAULT;

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
      {audiencesList.map((aud) => {
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
            className="relative flex flex-col justify-between min-h-[180px] md:min-h-0 p-6 md:p-6 lg:p-8 xl:p-10 rounded-[32px] group overflow-hidden cursor-pointer"
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
                  className={`leading-[0.9] tracking-[-0.02em] whitespace-pre-line break-words transition-all duration-500 uppercase ${
                    isMuted 
                      ? "text-[11px] md:text-[12px] lg:text-[14px]" 
                      : isActive 
                        ? "text-[clamp(20px,3.2vw,40px)] md:text-[clamp(24px,3.6vw,52px)]" 
                        : "text-[clamp(18px,3vw,28px)] md:text-[clamp(14px,1.6vw,24px)] lg:text-[clamp(18px,2vw,28px)]"
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
                      window.dispatchEvent(new CustomEvent('open-service', { detail: aud.id }));
                      setTimeout(() => {
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
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
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    api.get<any[]>("/services")
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch services in HeroSection:", err);
      });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <WorksSlideshow services={services} />
      <ClientsMarquee />
      <AudienceMatrix services={services} />
    </div>
  );
}
