import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { Check, ArrowRight } from "lucide-react";

const projectTypes = [
  "Architecture",
  "Interior Design",
  "Product Design",
  "UI/UX Design",
  "Multi-Discipline",
  "Other",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `New Inquiry: ${formData.projectType || "General"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
    );
    window.open(
      `mailto:hello@sapstudio.design?subject=${subject}&body=${body}`,
      "_self"
    );

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", projectType: "", message: "" });
    }, 4000);
  };

  const getFieldColor = (field: string) => {
    return focusedField === field ? "#0A0A0B" : "rgba(0,0,0,0.15)";
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden bg-[#0A0A0B]">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          {/* Left column (Yellow Card) */}
          <div className="md:col-span-5 md:pr-0 pb-10 md:pb-0">
            <div className="bg-[#FFFF00] p-10 md:p-14 h-full rounded-[40px]">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-8 h-[3px] bg-[#0A0A0B]" />
                  <p
                    className="uppercase tracking-[0.3em] text-[#0A0A0B]/50 text-[12px]"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                  >
                    Get in Touch
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2
                  className="text-[clamp(36px,4.5vw,56px)] leading-[1.1] tracking-[-0.02em] mb-2 text-[#0A0A0B]"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                >
                  Tell us what
                  <br />
                  <span className="italic" style={{ fontWeight: 300 }}>you're building.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.13}>
                <p
                  className="text-[15px] md:text-[17px] text-[#0A0A0B]/50 italic mb-10"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                >
                  We'll tell you honestly if we can help.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p
                  className="text-[11px] uppercase tracking-[0.2em] text-[#0A0A0B]/40 mb-10"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                >
                  Limited collaborations each quarter.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p
                  className="text-[16px] leading-[1.8] text-[#0A0A0B]/60 max-w-[400px] mb-12"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                >
                  Whether you have a defined brief or an early idea, we'd love
                  to hear from you. Every great project begins with a simple
                  conversation.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@sapstudio.design"
                    className="inline-flex items-center gap-2 text-[15px] text-[#0A0A0B]/80 hover:text-[#EC0606] transition-colors duration-300 break-words"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                  >
                    <div className="w-4 h-[2px] bg-[#0A0A0B]/40" />
                    hello@sapstudio.design
                  </a>
                  <p
                    className="text-[15px] text-[#0A0A0B]/40 pl-4"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    Berlin, Germany
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right column — form (Black Background Side) */}
          <div className="md:col-span-6 md:col-start-7 md:pl-8">
            <ScrollReveal delay={0.2}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-16 h-16 flex items-center justify-center mb-6 bg-[#FFFF00] rounded-full"
                    >
                      <Check className="w-7 h-7 text-[#0A0A0B]" />
                    </motion.div>
                    <h3
                      className="text-[24px] tracking-[-0.01em] mb-3 text-white"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Message Sent
                    </h3>
                    <p
                      className="text-[13px] text-white/50"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      We'll be in touch within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-1"
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-transparent py-5 text-[16px] text-white placeholder:text-white/30 focus:outline-none transition-colors duration-300"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 400,
                          borderBottom: `2px solid ${focusedField === "name" ? "#FFFF00" : "rgba(255,255,255,0.15)"}`,
                        }}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-transparent py-5 text-[16px] text-white placeholder:text-white/30 focus:outline-none transition-colors duration-300"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 400,
                          borderBottom: `2px solid ${focusedField === "email" ? "#FFFF00" : "rgba(255,255,255,0.15)"}`,
                        }}
                      />
                    </div>

                    {/* Custom dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(!isDropdownOpen);
                          setFocusedField("projectType");
                        }}
                        onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                        className="w-full bg-transparent py-5 text-[16px] text-left flex items-center justify-between cursor-pointer focus:outline-none transition-colors duration-300"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 400,
                          borderBottom: `2px solid ${focusedField === "projectType" ? "#FFFF00" : "rgba(255,255,255,0.15)"}`,
                        }}
                      >
                        <span
                          className={
                            formData.projectType
                              ? "text-white"
                              : "text-white/30"
                          }
                        >
                          {formData.projectType || "Project Type"}
                        </span>
                        <svg
                          className={`w-4 h-4 text-white/30 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 top-full z-10 bg-[#141416] border-2 border-[#FFFF00] shadow-2xl shadow-black/40 overflow-hidden"
                          >
                            {projectTypes.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    projectType: type,
                                  });
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full text-left px-5 py-3 text-[15px] text-white/60 hover:text-[#0A0A0B] hover:bg-[#FFFF00] transition-colors cursor-pointer"
                                style={{
                                  fontFamily: "'Montserrat', sans-serif",
                                  fontWeight: 400,
                                }}
                              >
                                {type}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <textarea
                        placeholder="Tell us about your project..."
                        required
                        rows={4}
                        value={formData.message}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full bg-transparent py-5 text-[16px] text-white placeholder:text-white/30 focus:outline-none resize-none transition-colors duration-300"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 400,
                          borderBottom: `2px solid ${focusedField === "message" ? "#FFFF00" : "rgba(255,255,255,0.15)"}`,
                        }}
                      />
                    </div>

                    <div className="pt-8">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 px-8 py-4 text-[#0A0A0B] text-[12px] uppercase tracking-[0.2em] bg-[#FFFF00] transition-all duration-300 cursor-pointer hover:bg-white rounded-full"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        Discuss Your Project
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
