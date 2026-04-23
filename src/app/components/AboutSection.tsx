import { ScrollReveal } from "./ScrollReveal";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden bg-white">
      {/* Yellow vertical rule — system continuity from hero */}
      <div className="absolute right-[9%] top-0 bottom-0 w-[3px] bg-[#0A0A0B]/5 hidden md:block" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <div className="w-8 h-[3px] bg-[#FFFF00]" />
            <p
              className="text-[12px] uppercase tracking-[0.3em] text-[#0A0A0B]/50"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
            >
              About the Studio
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left column — large statement with typographic tension */}
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <p
                className="text-[clamp(18px,2.2vw,26px)] tracking-[-0.01em] text-[#0A0A0B]/60 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
              >
                We believe design is an act of
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2
                className="text-[clamp(64px,9vw,130px)] leading-[0.85] tracking-[-0.04em] text-[#0A0A0B] italic mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 200 }}
              >
                care.
              </h2>
              {/* Bold yellow underline */}
              <div className="w-20 h-[4px] bg-[#FFFF00] mb-8" />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p
                className="text-[clamp(20px,2.8vw,34px)] leading-[1.3] tracking-[-0.02em] text-[#0A0A0B]/70 max-w-[580px] mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
              >
                A dialogue between material, space, and human need.
              </p>
              <p
                className="text-[14px] md:text-[15px] tracking-[0.02em] text-[#0A0A0B]/50 max-w-[480px] leading-[1.7]"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
              >
                Residential, cultural, and commercial projects across Europe and the Middle East.
              </p>
            </ScrollReveal>
          </div>

          {/* Right column — body text */}
          <div className="md:col-span-4 md:col-start-9">
            <ScrollReveal delay={0.25}>
              <p
                className="text-[16px] leading-[1.8] text-[#0A0A0B]/60 mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
              >
                Space and Product Studio is a multidisciplinary practice
                working across architecture, interiors, product, and digital
                design. Residential towers, cultural institutions, brand
                systems, product lines — we approach every engagement with
                the same principle: clarity through restraint.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.35}>
              <p
                className="text-[16px] leading-[1.8] text-[#0A0A0B]/60 mb-12"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
              >
                Architecture informs our digital works. Digital
                informs our spatial logic. The practices aren't
                parallel — they're the same practice, applied at
                different scales.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.45}>
              <div className="border-t-2 border-[#0A0A0B]/10 pt-6 grid grid-cols-3 gap-6">
                <div>
                  <p
                    className="text-[48px] md:text-[56px] tracking-[-0.03em] mb-1 text-[#0A0A0B]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    12
                    <span
                      className="text-[24px] md:text-[28px] text-[#EC0606] ml-1"
                      style={{ fontWeight: 400 }}
                    >
                      yr
                    </span>
                  </p>
                  <p
                    className="text-[12px] uppercase tracking-[0.2em] text-[#0A0A0B]/40"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                  >
                    Practice
                  </p>
                </div>
                <div>
                  <p
                    className="text-[48px] md:text-[56px] tracking-[-0.03em] mb-1 text-[#0A0A0B]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    80
                    <span
                      className="text-[24px] md:text-[28px] text-[#EC0606] ml-1"
                      style={{ fontWeight: 400 }}
                    >
                      +
                    </span>
                  </p>
                  <p
                    className="text-[12px] uppercase tracking-[0.2em] text-[#0A0A0B]/40"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                  >
                    Projects
                  </p>
                </div>
                <div>
                  <p
                    className="text-[48px] md:text-[56px] tracking-[-0.03em] mb-1 text-[#0A0A0B]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    4
                  </p>
                  <p
                    className="text-[12px] uppercase tracking-[0.2em] text-[#0A0A0B]/40"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                  >
                    Disciplines
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}