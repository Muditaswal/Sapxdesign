import { useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We listen, research, and immerse ourselves in your context — understanding the brief, the site, the users, and the ambition behind the project.",
    details: ["Stakeholder Interviews", "Site Analysis", "User Research", "Brief Development"],
  },
  {
    number: "02",
    title: "Define",
    description:
      "We distill insights into a clear design strategy — establishing the constraints, opportunities, and guiding principles that will shape every decision.",
    details: ["Design Strategy", "Moodboards", "Material Palette", "Concept Direction"],
  },
  {
    number: "03",
    title: "Design",
    description:
      "Ideas take form through iterative exploration — from sketches and models to detailed drawings and prototypes, refined through continuous dialogue.",
    details: ["Concept Development", "3D Visualization", "Prototyping", "Detail Design"],
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "We oversee every detail through to completion — ensuring the final result honours the original vision with uncompromising quality.",
    details: ["Technical Documentation", "Project Management", "Quality Assurance", "Handover"],
  },
];

export function ProcessSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="process"
      className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden bg-[#0A0A0B]"
    >
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row md:gap-12">
        
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2 md:pr-0 pb-10 md:pb-0">
          <div className="bg-[#FFFF00] p-10 md:p-14 h-full">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10 md:mb-14">
                <div className="w-8 h-[3px] bg-[#0A0A0B]" />
                <p
                  className="uppercase tracking-[0.3em] text-[#0A0A0B]/60 text-[12px]"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                >
                  Our Process
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                className="text-[clamp(36px,5vw,56px)] leading-[1.1] tracking-[-0.02em] mb-8 text-[#0A0A0B]"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
              >
                A clear path from{" "}
                <span className="italic text-[#EC0606]" style={{ fontWeight: 200, letterSpacing: "-0.01em" }}>vision</span>{" "}
                to reality.
              </h2>
              <p
                className="text-[16px] leading-[1.8] text-[#0A0A0B]/70 max-w-[500px]"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              >
                Our methodology strips away the superfluous to reveal the essential. Every phase is a deliberate step toward structural and functional clarity.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Right Side - Cards Grid */}
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:pl-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <motion.div
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative p-6 h-full border border-white/10 cursor-default group overflow-hidden bg-[#141416] hover:bg-[#FFFF00] transition-colors duration-500"
              >
                {/* Step number large background */}
                <div
                  className="absolute -bottom-6 -right-6 text-[100px] leading-none tracking-[-0.05em] pointer-events-none select-none transition-colors duration-500"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    color: hoveredIndex === i ? "rgba(10,10,11,0.05)" : "rgba(255,255,255,0.02)",
                  }}
                >
                  {step.number}
                </div>

                {/* Step number */}
                <span
                  className="inline-block px-3 py-1 text-[11px] uppercase tracking-[0.2em] mb-4 transition-colors duration-500"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    backgroundColor: hoveredIndex === i ? "#0A0A0B" : "rgba(255,255,255,0.1)",
                    color: hoveredIndex === i ? "#FFFF00" : "rgba(255,255,255,0.8)",
                  }}
                >
                  Phase {step.number}
                </span>

                {/* Title */}
                <h3
                  className="relative text-[22px] tracking-[-0.02em] mb-4 transition-colors duration-500"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif", 
                    fontWeight: 700,
                    color: hoveredIndex === i ? "#0A0A0B" : "white"
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="relative text-[14px] leading-[1.6] mb-6 transition-colors duration-500"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif", 
                    fontWeight: 400,
                    color: hoveredIndex === i ? "rgba(10,10,11,0.7)" : "rgba(255,255,255,0.4)"
                  }}
                >
                  {step.description}
                </p>

                {/* Detail tags */}
                <div className="relative flex flex-wrap gap-2">
                  {step.details.map((detail) => (
                    <span
                      key={detail}
                      className="text-[10px] uppercase tracking-[0.1em] px-2 py-1 transition-all duration-500"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        color: hoveredIndex === i ? "rgba(10,10,11,0.6)" : "rgba(255,255,255,0.3)",
                        border: `1px solid ${hoveredIndex === i ? "rgba(10,10,11,0.2)" : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}