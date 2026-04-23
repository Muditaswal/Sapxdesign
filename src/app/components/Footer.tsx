import { ScrollReveal } from "./ScrollReveal";
import { motion } from "motion/react";
import logo from "figma:asset/2d306c095ea00234c5fa5f873c0b0e0f431e1dc2.png";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

export function Footer() {
  return (
    <footer className="px-6 md:px-12 pt-14 pb-6 bg-[#0A0A0B] relative">
      {/* Dual-stripe top border — yellow + red = system */}
      <div className="absolute top-0 left-0 right-0">
        <div className="h-[3px] bg-[#FFFF00]" />
        <div className="h-[2px] bg-[#EC0606]" />
      </div>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={logo}
                  alt="SAP × Design logo"
                  className="w-24 h-24 rounded-xl object-contain"
                />
                <div className="flex flex-col leading-none">
                  <span
                    className="text-[20px] tracking-[0.08em] text-white uppercase"
                    style={{ fontFamily: "'Nico Moji', sans-serif", fontWeight: 700 }}
                  >
                    SAP{" "}
                    <motion.span
                      className="inline-flex items-center justify-center"
                      style={{
                        width: "1em",
                        height: "1em",
                        lineHeight: 1,
                        transformOrigin: "center center",
                      }}
                      animate={{ rotate: [0, 0, 360, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        times: [0, 0.4, 0.6, 1],
                        ease: "easeInOut",
                      }}
                    >
                      ×
                    </motion.span>{" "}
                    Design
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-[0.2em] text-white/25 mt-[3px]"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    Space and Product
                  </span>
                </div>
              </div>
              <p
                className="text-[15px] text-white/40 leading-[1.7] max-w-[300px]"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
              >
                Designing spaces, products and digital experiences with
                architectural intention and human care.
              </p>
            </ScrollReveal>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 md:col-start-6">
            <ScrollReveal delay={0.1}>
              <p
                className="text-[13px] uppercase tracking-[0.2em] text-white/30 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
              >
                Contact
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:hello@sapstudio.design"
                  className="block text-[15px] text-white/50 hover:text-[#FFFF00] transition-colors duration-300 break-words"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  hello@sapstudio.design
                </a>
                <p
                  className="text-[15px] text-white/20"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                >
                  Brunnenstra&szlig;e 12
                </p>
                <p
                  className="text-[15px] text-white/20"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                >
                  10119 Berlin, Germany
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Social */}
          <div className="md:col-span-3 md:col-start-10">
            <ScrollReveal delay={0.2}>
              <p
                className="text-[13px] uppercase tracking-[0.2em] text-white/30 mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
              >
                Follow
              </p>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[15px] text-white/40 hover:text-[#FFFF00] transition-colors duration-300 group"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                  >
                    <span className="w-4 h-[2px] bg-white/20 transition-all duration-300 group-hover:w-6 group-hover:bg-[#FFFF00]" />
                    {link.label}
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[13px] text-white/25 tracking-[0.05em] whitespace-normal break-words text-center md:text-left"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            &copy; 2026 SAP × Design — Space and Product. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="SAP × Design"
              className="w-4 h-4 rounded-sm object-contain"
            />
            <p
              className="text-[13px] text-white/25 tracking-[0.05em]"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
            >
              Design with intention.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}