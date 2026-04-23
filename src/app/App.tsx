import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/2d306c095ea00234c5fa5f873c0b0e0f431e1dc2.png";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ImageStrip } from "./components/ImageStrip";
import { ServicesSection } from "./components/ServicesSection";
import { MidPageCta } from "./components/MidPageCta";
import { ProjectsSection } from "./components/ProjectsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Hide splash screen after 4 seconds
    const timer = setTimeout(() => setShowSplash(false), 4000);
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white flex flex-col md:cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] bg-[#0A0A0B] flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.4 } }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8"
            >
              {/* Desktop Splash Logo */}
              <div className="hidden md:block">
                <motion.img
                  layoutId="main-logo"
                  src={logo}
                  alt="SAP × Design"
                  className="w-[200px] h-[200px] object-contain rounded-2xl"
                />
              </div>
              
              {/* Mobile Splash Logo */}
              <div className="md:hidden block">
                <motion.img
                  layoutId="main-logo-mobile"
                  src={logo}
                  alt="SAP × Design"
                  className="w-[120px] h-[120px] object-contain rounded-2xl"
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[24px] md:text-[40px] tracking-[0.2em] font-bold"
                  style={{ fontFamily: "'Nico Moji', sans-serif" }}
                >
                  SAP × DESIGN
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm md:text-base tracking-[0.3em] text-white/50 uppercase font-light"
                >
                  Space and Product studio
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar showSplash={showSplash} />
      
      {/* Content Wrapper */}
      <div className="w-full">
        <main className="relative">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ProjectsSection />
          <MidPageCta />
          <ImageStrip />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}