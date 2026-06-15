import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function CTACards() {
  return (
    <ScrollReveal delay={0.35}>
      <div className="mt-8 flex flex-col gap-4 max-w-[480px]">
        <motion.a
          href="/Resume.pdf"
          download
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex w-full items-center justify-between gap-4 rounded-full border border-[#0A0A0B]/15 bg-white px-6 py-4 text-[#0A0A0B] transition-all duration-300 hover:bg-[#FFFF00] hover:border-[#0A0A0B]/25 hover:-translate-y-1"
        >
          <div className="flex min-w-0 items-center gap-3 text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0A0A0B]/10 bg-white/80">
              <Download className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] uppercase tracking-[0.18em] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Developer
              </p>
            </div>
          </div>


        </motion.a>

        <motion.a
          href="/Portfolio.pdf"
          download
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex w-full items-center justify-between gap-4 rounded-full border border-[#0A0A0B]/15 bg-white px-6 py-4 text-[#0A0A0B] transition-all duration-300 hover:bg-[#FFFF00] hover:border-[#0A0A0B]/25 hover:-translate-y-1"
        >
          <div className="flex min-w-0 items-center gap-3 text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0A0A0B]/10 bg-white/80">
              <Download className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] uppercase tracking-[0.18em] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Client
              </p>
            </div>
          </div>


        </motion.a>
      </div>
    </ScrollReveal>
  );
}
