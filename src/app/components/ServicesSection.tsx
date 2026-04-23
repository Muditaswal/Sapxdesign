import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { X } from "lucide-react";

interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  image: string;
}

const services: Service[] = [
  {
    id: "architecture",
    number: "01",
    title: "Architecture",
    shortDesc: "Spatial systems for residential, commercial, industrial, and healthcare environments.",
    fullDesc:
      "We design buildings and spatial environments that respond to their context — physical, cultural, and temporal. Our architectural practice is rooted in material honesty, structural clarity, and the belief that great buildings are experienced, not just observed.",
    capabilities: [
      "Concept Design",
      "Master Planning",
      "Residential Architecture",
      "Cultural & Public Buildings",
      "Adaptive Reuse",
      "Healthcare & Hospitals",
      "Industrial & Factories",
    ],
    image: "https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTY1ODc2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "interior",
    number: "02",
    title: "Interior Design",
    shortDesc: "Human-centered environments shaped by material logic.",
    fullDesc:
      "Interior environments shape how we feel, think, and interact. We craft interiors that balance warmth with precision — spaces where every material, proportion, and detail has been considered in service of the whole.",
    capabilities: [
      "Spatial Planning",
      "Material Selection",
      "Custom Furniture",
      "Lighting Design",
      "Art Curation",
      "Rapid Development"
    ],
    image: "https://images.unsplash.com/photo-1668089677938-b52086753f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbiUyMG1pbmltYWx8ZW58MXx8fHwxNzcxNzExNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "product",
    number: "03",
    title: "Product Design",
    shortDesc: "Objects designed for usability and longevity.",
    fullDesc:
      "Our product design practice bridges the physical and conceptual. We design objects, furniture, and systems that are honest in their construction, intuitive in their use, and enduring in their appeal.",
    capabilities: [
      "Furniture Design",
      "Lighting Objects",
      "Consumer Products",
      "Prototyping",
      "Material Research",
      "IOT",
    ],
    image: "https://images.unsplash.com/photo-1766411503626-0e2f5fb8ba0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcHJvZHVjdCUyMGRlc2lnbiUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NzE3MTE2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "uiux",
    number: "04",
    title: "UI/UX Design",
    shortDesc: "Digital systems built for clarity and scale.",
    fullDesc:
      "We bring spatial and material sensibility to digital environments. Our interfaces are structured with the same care we give to buildings — clear hierarchy, considered typography, and interactions that feel intentional rather than decorative.",
    capabilities: [
      "Interface Design",
      "Design Systems",
      "User Research",
      "Prototyping",
      "Brand Digital Identity",
    ],
    image: "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc3MTcxMTYyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    const handleOpenService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const serviceId = customEvent.detail;
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setActiveService(service);
      }
    };

    window.addEventListener("open-service", handleOpenService);
    return () => window.removeEventListener("open-service", handleOpenService);
  }, []);

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
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-[#FFFF00] text-[#0A0A0B] rounded-full">
                    <span
                      className="text-[13px] uppercase tracking-[0.2em]"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                    >
                      {activeService.number} — {activeService.title}
                    </span>
                  </div>

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