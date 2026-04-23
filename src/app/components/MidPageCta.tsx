import { motion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

export function MidPageCta() {
  return (
    <section className="py-14 md:py-20 px-6 md:px-12 bg-[#0A0A0B] relative overflow-hidden border-t border-white/10 border-b">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <p
                className="text-[clamp(20px,3vw,32px)] tracking-[-0.01em] text-white/60"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              >
                Book a free call with our experts.{" "}
                <span
                  className="text-white italic"
                  style={{ fontWeight: 200, letterSpacing: "-0.02em" }}
                >
                  Let's talk.
                </span>
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 text-[12px] uppercase tracking-[0.18em] bg-white text-[#0A0A0B] transition-all duration-300 cursor-pointer shrink-0 hover:bg-[#FFFF00] rounded-full"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
              }}
            >
              Book now
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}