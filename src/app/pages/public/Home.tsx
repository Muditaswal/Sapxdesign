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

  let seoTitle = "Space and Product Studio | Designing Spaces, Products, Brands & Experiences";
  let seoDescription = "Space and Product Studio helps businesses and organizations transform spaces, products, brands, and experiences through strategic architecture and digital UX/UI design.";
  let seoSchema: any = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://sapxdesign.com/#website",
      "name": "Space and Product Studio",
      "url": "https://sapxdesign.com/"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://sapxdesign.com/#organization",
      "name": "Space and Product Studio",
      "url": "https://sapxdesign.com/",
      "logo": "https://sapxdesign.com/og-image.jpg",
      "description": "Space and Product Studio helps businesses and organizations transform spaces, products, brands, and experiences through strategic design.",
      "sameAs": [
        "https://www.instagram.com/sapxdesign",
        "https://www.linkedin.com/company/space-and-product-studio/",
        "https://www.facebook.com/people/Space-and-Product-Studio/61557185401633/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ArchitecturalOffice",
      "@id": "https://sapxdesign.com/#localbusiness",
      "name": "Space and Product Studio",
      "image": "https://sapxdesign.com/og-image.jpg",
      "url": "https://sapxdesign.com/",
      "telephone": "+91 8368544334",
      "email": "spaceandproductstudio@gmail.com",
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
      }
    }
  ];

  if (activeSection === "services") {
    seoTitle = "Studio Design Services | Architecture, Interior & UX/UI Design Services";
    seoDescription = "Explore our trans-disciplinary design services including Space Design, Architecture Design Studio, Interior Design Consultancy, Product Design Studio, and UI UX Design Services.";
    seoSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Space and Product Studio Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Space and Product Studio"
      },
      "description": "Professional services across Architecture Design Studio, Interior Design Consultancy, Product Design Studio, UX Design Agency, UI UX Design Services, and Experience Design."
    };
  } else if (activeSection === "about") {
    seoTitle = "About Space and Product Studio | Human Centered Design & Innovation Consulting";
    seoDescription = "We are an India-based trans-disciplinary Architecture and Design Studio. We apply Design Strategy, Design Research, and Human Centered Design to create digital & physical ecosystems.";
  } else if (activeSection === "works") {
    seoTitle = "Selected Works & Case Studies | Spatial Design & Digital Product Design Portfolio";
    seoDescription = "Browse selected case studies from Space and Product Studio, demonstrating spatial architecture, enterprise UX/UI design, and brand identity projects.";
  } else if (activeSection === "contact") {
    seoTitle = "Contact Space and Product Studio | New Delhi India Design Studio";
    seoDescription = "Get in touch with Space and Product Studio. Contact us for architectural consulting, interior design services, product innovation, or enterprise UX design inquiries.";
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white flex flex-col md:cursor-none">
      <SEO title={seoTitle} description={seoDescription} schema={seoSchema} />
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
                  className="text-[24px] md:text-[40px] tracking-[0.2em] font-extrabold"
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
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
      
      <div className="w-full">
        <main className="relative">
          <h1 className="sr-only">Space and Product Studio | SAP × Design</h1>
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
