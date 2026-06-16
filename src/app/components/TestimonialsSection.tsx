import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { api } from "../services/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  org: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Space & Product Studio translated our vision into a physical experience that feels timeless, intentional, and deeply human.",
    author: "Aurelia Durand",
    role: "Head of Brand Experience",
    org: "Luxury Retail Group"
  },
  {
    id: "2",
    quote: "They brought strategic thinking and design excellence together in a way that transformed both our space and customer journey.",
    author: "Dr. Vikram Mehta",
    role: "Innovation Director",
    org: "Eris Lifesciences"
  },
  {
    id: "3",
    quote: "The team understood not only what we wanted to build, but why it mattered. The result exceeded expectations.",
    author: "Ananya Roy",
    role: "Founder",
    org: "Issa Foundation"
  },
  {
    id: "4",
    quote: "From concept to execution, every detail reflected clarity, craftsmanship, and a strong point of view.",
    author: "Lucas Thorne",
    role: "Director",
    org: "Contemporary Lifestyle Brand"
  },
  {
    id: "5",
    quote: "The studio approached the project as a complete system rather than a collection of deliverables. That perspective made all the difference.",
    author: "Clara von Preussen",
    role: "Managing Partner",
    org: "Design-Led Enterprise"
  },
  {
    id: "6",
    quote: "The outcome feels effortless, but behind it is an exceptional depth of research, strategy, and design thinking.",
    author: "Elodie Mercer",
    role: "Brand Lead",
    org: "Premium Consumer Brand"
  },
  {
    id: "7",
    quote: "In reinterpreting our heritage for a global audience, they honored our roots while creating a bold, contemporary vernacular.",
    author: "Rajeev Gulati",
    role: "Trustee",
    org: "Heritage Food & Spice Legacy"
  },
  {
    id: "8",
    quote: "They designed an ecosystem that is as rigorous in its function as it is poetic in its form, bridging the physical and digital seamlessly.",
    author: "Siddharth Sen",
    role: "Chief Product Officer",
    org: "Healthcare & Digital Therapeutics"
  }
];

export function TestimonialsSection() {
  const [dbTestimonials, setDbTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    api.get<any[]>("/testimonials")
      .then((data) => {
        if (data && data.length > 0) {
          const mapped: Testimonial[] = data.map((t) => ({
            id: t.id,
            quote: t.quote,
            author: t.author,
            role: t.role || "",
            org: t.org || ""
          }));
          setDbTestimonials(mapped);
        } else {
          setDbTestimonials(fallbackTestimonials);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch testimonials, using fallback:", err);
        setDbTestimonials(fallbackTestimonials);
      });
  }, []);

  const items = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 8000); // 8 seconds autoplays slightly slower for a premium reading feel
    return () => clearInterval(interval);
  }, [items]);

  if (items.length === 0) return null;
  const current = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0B] relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-16 md:mb-20">
            <div className="w-8 h-[1px] bg-white/20" />
            <p
              className="uppercase tracking-[0.3em] text-white/40 text-[11px]"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
            >
              Reflections
            </p>
            <div className="w-8 h-[1px] bg-white/20" />
          </div>
        </ScrollReveal>

        <div className="max-w-[1000px] mx-auto text-center relative px-4 md:px-12">
          {/* Testimonial content */}
          <div className="relative min-h-[280px] sm:min-h-[220px] md:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="flex flex-col items-center"
                >
                  <blockquote
                    className="text-[clamp(18px,2.2vw,28px)] leading-[1.6] text-white/90 font-light mb-10 tracking-tight max-w-[850px]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    "{current.quote}"
                  </blockquote>

                  <div className="flex flex-col items-center gap-1.5">
                    <cite
                      className="text-[13px] text-white tracking-[0.15em] uppercase not-italic font-semibold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {current.author}
                    </cite>
                    {(current.role || current.org) && (
                      <span
                        className="text-[10px] text-white/40 tracking-[0.1em] uppercase font-normal"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {current.role} {current.role && current.org ? "— " : ""}{current.org}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-16">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="text-white/30 text-[11px] tracking-[0.25em] font-mono select-none">
                {String(activeIndex + 1).padStart(2, '0')} <span className="text-white/10">/</span> {String(items.length).padStart(2, '0')}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}