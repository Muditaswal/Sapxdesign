import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { X } from "lucide-react";
import { api } from "../services/api";

interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  image: string;
}

const fallbackServices: Service[] = [
  {
    id: "space",
    number: "01",
    title: "Space Design",
    shortDesc: "Designing physical environments and built experiences.",
    fullDesc:
      "We design physical environments and built experiences where architecture, interior logic, graphics, and navigation work as one system — spaces that clarify purpose, carry brand presence, and feel intentional at every scale.",
    capabilities: [
      "Architecture",
      "Interior Design",
      "Retail Design",
      "Workspace Design",
      "Hospitality Design",
      "Experience Centers",
      "Exhibition Design",
      "Environmental Graphics",
      "Wayfinding & Signage",
      "3D Visualization",
    ],
    image: "https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTY1ODc2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "product",
    number: "02",
    title: "Product Design",
    shortDesc: "Designing digital products and intelligent systems.",
    fullDesc:
      "We shape digital products and intelligent systems from strategy through interface detail — connecting user insight, product architecture, design systems, and AI-native interaction patterns into experiences that scale with clarity.",
    capabilities: [
      "UX Research",
      "Product Strategy",
      "UX/UI Design",
      "Mobile App Design",
      "Web Design",
      "Enterprise UX",
      "SaaS Design",
      "Design Systems",
      "AI Product Design",
      "Conversational AI Design",
      "Usability Testing",
    ],
    image: "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc3MTcxMTYyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "brand",
    number: "03",
    title: "Brand Design",
    shortDesc: "Building brands and communication systems.",
    fullDesc:
      "We build brands and communication systems that are strategically grounded and visually exacting — from identity foundations to guidelines, campaigns, packaging, content, and motion-led storytelling.",
    capabilities: [
      "Brand Strategy",
      "Brand Identity",
      "Visual Identity Systems",
      "Packaging Design",
      "Marketing Collateral",
      "Social Media Design",
      "Brand Guidelines",
      "Campaign Design",
      "Motion Graphics",
      "Content Design",
    ],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "experience",
    number: "04",
    title: "Experience Design",
    shortDesc: "Designing interactions between brands and people.",
    fullDesc:
      "We design interactions between brands and people — activations, launches, installations, service journeys, and immersive AI-powered experiences that transform attention into participation.",
    capabilities: [
      "Brand Activations",
      "Experiential Marketing",
      "Event Design",
      "Interactive Installations",
      "Pop-up Experiences",
      "Product Launch Experiences",
      "Retail Activations",
      "Service Design",
      "Customer Experience Design",
      "AR/VR Experiences",
      "AI-Powered Experiences",
      "Gamification Experiences",
    ],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1080&auto=format&fit=crop",
  },
];

export function ServicesSection() {
  const [dbServices, setDbServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState<Service | null>(null);

  const servicesList = dbServices.length > 0 ? dbServices : fallbackServices;

  useEffect(() => {
    api.get<any[]>("/services")
      .then((data) => {
        if (data && data.length > 0) {
          const mapped: Service[] = data.map((item) => ({
            id: item.id,
            number: item.number,
            title: item.title,
            shortDesc: item.short_desc,
            fullDesc: item.full_desc,
            capabilities: item.capabilities || [],
            image: item.image || "https://images.unsplash.com/photo-1695067440629-b5e513976100?q=80&w=1080"
          }));
          setDbServices(mapped);
        } else {
          setDbServices(fallbackServices);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch services, using fallbacks:", err);
        setDbServices(fallbackServices);
      });
  }, []);

  useEffect(() => {
    const handleOpenService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const serviceId = customEvent.detail;
      const service = servicesList.find((s) => s.id === serviceId);
      if (service) {
        setActiveService(service);
        setTimeout(() => {
          document.getElementById('services-detail')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

    window.addEventListener("open-service", handleOpenService);
    return () => window.removeEventListener("open-service", handleOpenService);
  }, [servicesList]);

  return (
    <AnimatePresence>
      {activeService && (
        <motion.section
          id="services-detail"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-[#141416] border-b border-white/10"
        >
          <div className="py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
            <div className="flex justify-between items-start mb-16">
              <ScrollReveal>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[3px] bg-[#FFFF00]" />
                  <p
                    className="uppercase tracking-[0.3em] text-white/40 text-[12px]"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                  >
                    Service Detail
                  </p>
                </div>
              </ScrollReveal>

              <button
                onClick={() => setActiveService(null)}
                className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white hover:bg-white/5 transition-all cursor-pointer rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              <div className="flex-1">
                <ScrollReveal delay={0.1}>
                  <h3
                    className="text-[clamp(36px,5vw,72px)] tracking-[-0.02em] mb-8 text-white uppercase"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1 }}
                  >
                    {activeService.title}
                  </h3>

                  <p
                    className="text-[16px] md:text-[18px] leading-[1.8] text-white/50 mb-10 max-w-[600px]"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    {activeService.fullDesc}
                  </p>

                  <div className="border-t border-white/10 pt-8">
                    <p
                      className="text-[13px] uppercase tracking-[0.2em] text-white/30 mb-5"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                    >
                      Capabilities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeService.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="px-4 py-2 text-[14px] tracking-[0.05em] rounded-full"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            backgroundColor: "#0A0A0B",
                            color: "#FFFF00",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="w-full md:w-[500px] shrink-0">
                <ScrollReveal delay={0.2}>
                  <div className="aspect-[4/3] w-full bg-[#0A0A0B] overflow-hidden border border-white/5 rounded-3xl">
                    <img 
                      src={activeService.image} 
                      alt={activeService.title}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}