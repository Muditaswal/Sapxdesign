import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "figma:asset/2d306c095ea00234c5fa5f873c0b0e0f431e1dc2.png";
import { Navbar } from "../../components/Navbar";
import { HeroSection } from "../../components/HeroSection";
import { AboutSection } from "../../components/AboutSection";
import { ServicesSection } from "../../components/ServicesSection";
import { ImageStrip } from "../../components/ImageStrip";

import { MidPageCta } from "../../components/MidPageCta";
import { ProjectsSection } from "../../components/ProjectsSection";
import { TestimonialsSection } from "../../components/TestimonialsSection";
import { ContactSection } from "../../components/ContactSection";
import { Footer } from "../../components/Footer";
import { CustomCursor } from "../../components/CustomCursor";

import { SEO } from "../../components/SEO";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const timer = setTimeout(() => setShowSplash(false), 4000);
    
    const handleScroll = () => {
      const sections = ["services", "about", "works", "contact"];
      let currentSection = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 300) {
          currentSection = sections[i];
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const seoTitle = "Space and Product Studio | SAP × Design | Architecture & Product Studio New Delhi";
  const seoDescription = "Space and Product Studio (SAP × Design) is a premier trans-disciplinary architecture, spatial design, and digital product studio based in Lado Sarai, New Delhi. Delivering turnkey residential, commercial, and industrial product design.";
  const seoKeywords = "Space and Product Studio, SAP Design, SAP x Design, Architecture New Delhi, Space Design India, Interior Design Studio Delhi, Luxury Residence Architecture, Industrial Product Design, Digital Product Design, Brand Design Studio Lado Sarai";

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://sapxdesign.com/#organization",
      "name": "Space and Product Studio",
      "alternateName": ["SAP × Design", "SAP Design", "Space & Product Studio"],
      "url": "https://sapxdesign.com/",
      "logo": "https://sapxdesign.com/og-image.jpg",
      "description": "Space and Product Studio helps businesses and organizations transform spaces, products, brands, and experiences through strategic design.",
      "disambiguatingDescription": "Space and Product Studio is an architectural and design studio in New Delhi, India, not associated with SAP SE enterprise software.",
      "sameAs": [
        "https://www.instagram.com/sapxdesign",
        "https://www.linkedin.com/company/space-and-product-studio/",
        "https://www.facebook.com/people/Space-and-Product-Studio/61557185401633/",
        "https://www.pinterest.com/spaceandproductstudio/",
        "https://www.behance.net/sapxdesign",
        "https://dribbble.com/sapxdesign"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ArchitecturalOffice",
      "@id": "https://sapxdesign.com/#localbusiness",
      "name": "Space and Product Studio",
      "alternateName": "SAP × Design",
      "image": "https://sapxdesign.com/og-image.jpg",
      "url": "https://sapxdesign.com/",
      "telephone": "+91 8368544334",
      "email": "spaceandproductstudio@gmail.com",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "149 DDA Flat, Lado Sarai",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110030",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.5265384,
        "longitude": 77.1953846
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "19:00"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Space and Product Studio provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Space and Product Studio delivers turnkey architectural and space design, physical industrial product design, brand identity systems, and interactive experience design."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Space and Product Studio located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The studio is located at 149 DDA Flat, Lado Sarai, New Delhi, Delhi 110030, India. Operating hours are Monday through Saturday, 10:00 to 19:00 IST."
          }
        },
        {
          "@type": "Question",
          "name": "Is SAP × Design affiliated with SAP SE software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Space and Product Studio (commercially known as SAP × Design) is an independent trans-disciplinary architecture and design studio in New Delhi, India."
          }
        },
        {
          "@type": "Question",
          "name": "How can I consult or hire Space and Product Studio for a project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach out via email at spaceandproductstudio@gmail.com, call or WhatsApp +91 8368544334, or submit an inquiry through the contact section on sapxdesign.com."
          }
        }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white flex flex-col md:cursor-none">
      <SEO title={seoTitle} description={seoDescription} keywords={seoKeywords} schema={seoSchema} />
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
              <div className="hidden md:block">
                <motion.img
                  layoutId="main-logo"
                  src={logo}
                  alt="SAP × Design"
                  className="w-[200px] h-[200px] object-contain rounded-2xl"
                />
              </div>
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
                  className="text-[24px] md:text-[40px] tracking-[0.2em] font-extrabold text-white uppercase text-center"
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                >
                  Space and Product studio
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm md:text-base tracking-[0.3em] text-white/50 uppercase font-light text-center mt-[3px]"
                  style={{ fontFamily: "'Nico Moji', sans-serif", fontWeight: 400 }}
                >
                  SAP{" "}
                  <motion.span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: "1em",
                      height: "1em",
                      lineHeight: 1,
                      transformOrigin: "center center",
                    }}
                    animate={{ rotate: [0, 0, 360, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      times: [0, 0.4, 0.6, 1],
                      ease: "easeInOut",
                    }}
                  >
                    ×
                  </motion.span>{" "}
                  DESIGN
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar showSplash={showSplash} />
      
      <div className="w-full">
        <main className="relative">
          <h1 className="sr-only">Space and Product Studio (SAP × Design) — Architecture, Spatial Design & Product Studio New Delhi</h1>
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
