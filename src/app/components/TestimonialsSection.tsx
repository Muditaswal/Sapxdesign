import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";

const testimonials = [
  {
    id: "1",
    quote:
      "SAP × Design doesn't just design spaces — they design the feeling of being in them. Our cultural centre has become a landmark not because of how it looks, but because of how it makes people feel.",
    author: "Dr. Elisa Wenger",
    role: "Director",
    org: "Kulturhaus München",
  },
  {
    id: "2",
    quote:
      "Their ability to translate brand identity into physical and digital space is unmatched. The showroom they designed for us became our most powerful sales tool.",
    author: "Marcus Chen",
    role: "CEO",
    org: "Lumina Furniture Co.",
  },
  {
    id: "3",
    quote:
      "Working with SAP × Design felt like a true collaboration. They challenged our assumptions, listened deeply, and delivered something far beyond what we imagined.",
    author: "Amira Okafor",
    role: "Founder",
    org: "Noire Studio",
  },
  {
    id: "4",
    quote:
      "The digital platform they created captures the precision and warmth of our physical spaces. Every interaction feels considered and intentional.",
    author: "Jonas Lindqvist",
    role: "Creative Director",
    org: "Skog Hospitality",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[activeIndex];

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
          <div className="relative min-h-[200px] md:min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
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
                  <p
                    className="text-[13px] text-white/40"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    {current.role}, {current.org}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation — bold dashes */}
          <div className="relative flex items-center justify-center gap-2 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
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
        </div>
      </div>
    </section>
  );
}