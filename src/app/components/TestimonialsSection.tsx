import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { api } from "../services/api";

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
    quote: "SAP × Design doesn't just design spaces — they design the feeling of being in them. Our cultural centre has become a landmark.",
    author: "Dr. Elisa Wenger",
    role: "Director",
    org: "Kulturhaus München",
  },
  {
    id: "2",
    quote: "Their ability to translate brand identity into physical and digital space is unmatched.",
    author: "Marcus Chen",
    role: "CEO",
    org: "Lumina Furniture Co.",
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
    }, 6000);
    return () => clearInterval(interval);
  }, [items]);

  if (items.length === 0) return null;
  const current = items[activeIndex];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#0A0A0B] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-10 md:mb-14">
            <div className="w-8 h-[3px] bg-[#FFFF00]" />
            <p
              className="uppercase tracking-[0.3em] text-white/40 text-[12px]"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
            >
              Testimonials
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-[900px] mx-auto text-center relative">
          {/* Testimonial content */}
          <div className="relative min-h-[300px] sm:min-h-[200px] md:min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  <p
                    className="text-[clamp(18px,2.5vw,28px)] leading-[1.6] text-white/80 italic mb-10"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    "{current.quote}"
                  </p>

                  <div className="flex flex-col items-center gap-1">
                    <p
                      className="text-[15px] text-white tracking-[0.05em]"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                    >
                      {current.author}
                    </p>
                    {(current.role || current.org) && (
                      <p
                        className="text-[13px] text-white/40"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                      >
                        {current.role}{current.role && current.org ? ", " : ""}{current.org}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {items.length > 1 && (
            <div className="relative flex items-center justify-center gap-2 mt-8">
              {items.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="cursor-pointer p-1"
                >
                  <motion.div
                    animate={{
                      width: i === activeIndex ? 32 : 12,
                      backgroundColor:
                        i === activeIndex ? "#FFFF00" : "rgba(255,255,255,0.15)",
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[4px] rounded-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}