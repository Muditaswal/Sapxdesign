import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/2d306c095ea00234c5fa5f873c0b0e0f431e1dc2.png";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ showSplash }: { showSplash?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const mobileOpenRef = useRef(mobileOpen);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetHideTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.scrollY > 10 && !mobileOpenRef.current) {
          setNavVisible(false);
        }
      }, 6000);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      
      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let found = false;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 300) {
          setActiveSection(sections[i]);
          found = true;
          break;
        }
      }
      if (!found) setActiveSection("");

      // Navbar visibility logic
      if (currentY < 10) {
        setNavVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 50) {
        // Scrolling down
        if (!mobileOpenRef.current) setNavVisible(false);
      } else if (currentY < lastScrollY.current) {
        // Scrolling up
        setNavVisible(true);
      }
      lastScrollY.current = currentY;

      resetHideTimer();
    };

    const handleMouseMove = () => {
      resetHideTimer();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    
    resetHideTimer();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    
    // Open detailed service view when navigating to services
    if (href === "#services") {
      window.dispatchEvent(new CustomEvent('open-service', { detail: 'architecture' }));
    }
    
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      {/* ── DESKTOP: Fixed Top Navbar (Glass Pill) ── */}
      <motion.nav 
        initial={{ backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0)", backdropFilter: "blur(0px)", y: 0 }}
        animate={{ 
          backgroundColor: showSplash ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.1)",
          borderColor: showSplash ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.2)",
          backdropFilter: showSplash ? "blur(0px)" : "blur(40px)",
          boxShadow: showSplash ? "none" : "0 8px 32px 0 rgba(0,0,0,0.4)",
          y: navVisible ? 0 : -150
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ pointerEvents: showSplash ? "none" : "auto" }}
        className="hidden md:flex flex-row items-center justify-between fixed top-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[72px] rounded-[36px] z-[101] px-8 border"
      >
        
        {/* Left: Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer h-[44px] flex flex-row items-center gap-4 relative"
        >
          {!showSplash && (
            <motion.img
              layoutId="main-logo"
              src={logo}
              alt="SAP × Design logo"
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-[44px] h-[44px] object-contain rounded-lg border border-white/5"
            />
          )}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: showSplash ? 0 : 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white tracking-[0.1em] text-[16px] hidden lg:block uppercase"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            SAP × DESIGN
          </motion.span>
        </button>

        {/* Middle: Links */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: showSplash ? 0 : 1 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-row gap-8 items-center justify-center"
        >
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative cursor-pointer group"
              >
                <div 
                  className="flex flex-col items-center whitespace-nowrap transition-colors duration-300 relative"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: isActive ? "#FFFF00" : "rgba(255,255,255,0.4)",
                  }}
                >
                  <span className="group-hover:text-white transition-colors duration-300 py-2">
                    {link.label}
                  </span>
                  
                  {/* Indicator Dot */}
                  <motion.div
                    animate={{ scale: isActive ? 1 : 0 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#EC0606]"
                  />
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Right: Year */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: showSplash ? 0 : 1 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-row items-center gap-4"
        >
          <div className="w-12 h-[1px] bg-white/10 hidden lg:block" />
          <p 
            className="text-white/30 tracking-[0.2em] text-[12px]"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            2026
          </p>
        </motion.div>
      </motion.nav>

      {/* ── MOBILE: Top Bar (Glass Pill) ── */}
      <motion.nav 
        initial={{ backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0)", backdropFilter: "blur(0px)", y: 0 }}
        animate={{ 
          backgroundColor: showSplash ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.1)",
          borderColor: showSplash ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.2)",
          backdropFilter: showSplash ? "blur(0px)" : "blur(40px)",
          boxShadow: showSplash ? "none" : "0 8px 32px 0 rgba(0,0,0,0.4)",
          y: navVisible ? 0 : -150
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ pointerEvents: showSplash ? "none" : "auto" }}
        className="md:hidden fixed top-4 left-4 right-4 h-[60px] rounded-[24px] z-[101] flex items-center justify-between px-5 border"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer h-[28px]"
        >
          <div className="w-[28px] h-[28px] relative flex items-center justify-center">
            {!showSplash && (
              <motion.img
                layoutId="main-logo-mobile"
                src={logo}
                alt="SAP × Design"
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[28px] h-[28px] object-contain rounded"
              />
            )}
          </div>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: showSplash ? 0 : 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white tracking-[0.05em] text-[14px] uppercase"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            SAP × DESIGN
          </motion.span>
        </button>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: showSplash ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white/80 p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 top-[80px] z-40 rounded-[32px] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex flex-col items-start p-8 gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className="text-[24px] uppercase tracking-[0.1em] text-white/80 hover:text-[#FFFF00] transition-colors"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
              >
                {link.label}
              </motion.button>
            ))}
            
            <div className="mt-auto w-full pt-8 border-t border-white/10 flex justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Space and Product Studio</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#EC0606] font-bold">2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}