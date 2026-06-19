import { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "motion/react";
import logo from "figma:asset/2d306c095ea00234c5fa5f873c0b0e0f431e1dc2.png";
import { api } from "../services/api";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="2" x2="12" y2="22"></line>
    <path d="M12 2a10 10 0 0 0-3 19.56c.07-.63.14-1.6.28-2.29.13-.56.84-3.56.84-3.56s-.21-.43-.21-1.07c0-1 .58-1.75 1.3-1.75.61 0 .91.46.91 1 0 .62-.39 1.55-.6 2.41a1 1 0 0 0 1 1.2c1.23 0 2.18-1.3 2.18-3.17 0-1.66-1.19-2.82-2.9-2.82-1.97 0-3.13 1.48-3.13 3 0 .6.23 1.24.52 1.58a.24.24 0 0 1 .05.21c-.05.22-.17.72-.2 1-.05.18-.17.22-.39.12-1.44-.67-2.34-2.79-2.34-4.5 0-3.66 2.66-7 7.68-7 4 0 7.17 2.88 7.17 6.72 0 4-2.54 7.26-6.07 7.26-1.19 0-2.3-1.18-2.3-1.18s-.6 2.29-.74 2.85c-.27 1-.99 2.28-1.48 3.08A10 10 0 1 0 12 2z"></path>
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export function Footer() {
  const [socials, setSocials] = useState({
    instagram: "https://www.instagram.com/sapxdesign",
    linkedin: "https://www.linkedin.com/company/space-and-product-studio/",
    facebook: "https://www.facebook.com/people/Space-and-Product-Studio/61557185401633/",
    pinterest: "https://www.pinterest.com/spaceandproductstudio/",
  });

  useEffect(() => {
    api.get<any>("/settings/social")
      .then((data) => {
        if (data) {
          setSocials({
            instagram: data.instagram ?? "",
            linkedin: data.linkedin ?? "",
            facebook: data.facebook ?? "",
            pinterest: data.pinterest ?? "",
          });
        }
      })
      .catch((err) => {
        console.warn("Failed to load footer social links from API, using default fallbacks:", err);
      });
  }, []);

  const activeSocials = [
    { name: "Instagram", url: socials.instagram, icon: InstagramIcon, hoverColor: "hover:text-[#E1306C]" },
    { name: "LinkedIn", url: socials.linkedin, icon: LinkedinIcon, hoverColor: "hover:text-[#0077B5]" },
    { name: "Facebook", url: socials.facebook, icon: FacebookIcon, hoverColor: "hover:text-[#1877F2]" },
    { name: "Pinterest", url: socials.pinterest, icon: PinterestIcon, hoverColor: "hover:text-[#BD081C]" },
  ].filter(item => !!item.url);

  return (
    <footer className="px-6 md:px-12 pt-14 pb-6 bg-[#0A0A0B] relative">
      {/* Dual-stripe top border — yellow + red = system */}
      <div className="absolute top-0 left-0 right-0">
        <div className="h-[3px] bg-[#FFFF00]" />
        <div className="h-[2px] bg-[#EC0606]" />
      </div>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={logo}
                  alt="SAP × Design logo"
                  width={96}
                  height={96}
                  loading="lazy"
                  className="w-24 h-24 rounded-xl object-contain"
                />
                <div className="flex flex-col leading-none">
                  <span
                    className="text-[20px] tracking-[0.08em] text-white uppercase"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                  >
                    Space and Product
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-[0.2em] text-white/25 mt-[3px]"
                    style={{ fontFamily: "'Nico Moji', sans-serif", fontWeight: 400 }}
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
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 lg:col-start-6">
            <ScrollReveal delay={0.1}>
              <p
                className="text-[13px] uppercase tracking-[0.2em] text-white/30 mb-5 text-center lg:text-left"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
              >
                Get in Touch
              </p>
              <div className="space-y-4">
                <a
                  href="https://maps.app.goo.gl/GQHQUFPVTsveSnYA7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[15px] text-white/50 hover:text-[#FFFF00] transition-colors duration-300 text-center lg:text-left leading-relaxed max-w-[280px] mx-auto lg:mx-0"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  149 DDA Flat, Lado Sarai, New Delhi 110030, INDIA
                </a>
                <a
                  href="tel:+918368544334"
                  className="block text-[15px] text-white/50 hover:text-[#FFFF00] transition-colors duration-300 text-center lg:text-left leading-relaxed max-w-[280px] mx-auto lg:mx-0"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  +91 8368544334
                </a>
                <div className="flex justify-center lg:justify-start">
                  <motion.a
                    href="mailto:spaceandproductstudio@gmail.com"
                    aria-label="Email"
                    title="Send Email"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:text-[#FFFF00] hover:border-white/20 hover:bg-white/10 cursor-pointer"
                  >
                    <MailIcon className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Social */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 lg:col-start-10">
            <ScrollReveal delay={0.2}>
              <p
                className="text-[13px] uppercase tracking-[0.2em] text-white/30 mb-5 text-center lg:text-left"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
              >
                Follow
              </p>
              <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
                {activeSocials.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      title={link.name}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 ${link.hoverColor} hover:border-white/20 hover:bg-white/10 cursor-pointer`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
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
              width={16}
              height={16}
              loading="lazy"
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