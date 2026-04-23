import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const manifestoImage =
  "https://images.unsplash.com/photo-1760927660667-17c8256a5f9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29uY3JldGUlMjBhcmNoaXRlY3R1cmUlMjBkcmFtYXRpYyUyMHNoYWRvdyUyMG1vb2R5fGVufDF8fHx8MTc3MTg3NTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function ImageStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [60, 0, 0, -40]);
  const lineScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative h-[75vh] overflow-hidden bg-[#0A0A0B]"
    >
      {/* Full-bleed image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imgY }}
      >
        <img
          src={manifestoImage}
          alt="Dramatic architectural space"
          className="w-full h-[120%] object-cover"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-[#0A0A0B]/65" />
      </motion.div>

      {/* Bold red horizontal line — brand stripe */}
      <motion.div
        style={{ scaleX: lineScale }}
        className="absolute top-1/2 left-0 right-0 h-[4px] bg-[#EC0606] z-[8] origin-left"
      />

      {/* The manifesto — centered, enormous */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="text-center max-w-[1200px]"
        >
          {/* The bold statement */}
          <h2
            className="text-[clamp(48px,13vw,200px)] leading-[0.85] tracking-[-0.05em] text-white"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
          >
            From cities
            <br />
            <span className="italic" style={{ fontWeight: 200, letterSpacing: "-0.02em" }}>
              to screens.
            </span>
          </h2>

          {/* Yellow structural dash */}
          <div className="w-16 md:w-24 h-[3px] bg-[#FFFF00] mx-auto mt-6 md:mt-8 mb-4 md:mb-6" />

          {/* Subtitle */}
          <p
            className="text-[13px] md:text-[15px] uppercase tracking-[0.3em] text-white/35"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            One practice. Every scale.
          </p>
        </motion.div>
      </div>

      {/* Top and bottom fade to black */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0B] to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent z-[5] pointer-events-none" />
    </div>
  );
}