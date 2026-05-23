import { ScrollReveal } from "./ScrollReveal";

export function CTACards() {
  return (
    <ScrollReveal delay={0.35}>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/Resume.pdf"
          download
          className="group w-full flex items-center justify-between gap-4 p-5 md:p-6 min-h-[72px] border border-[#0A0A0B]/20 rounded-2xl bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:border-[#0A0A0B]/60 hover:shadow-[0_8px_30px_rgba(255,223,0,0.12)]"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-[#0A0A0B]/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v10" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11l4 4 4-4" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="17" width="18" height="3" rx="1.5" fill="#F3F4F6" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-[#0A0A0B]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Developer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-[#0A0A0B]/60 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#0A0A0B]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12h14" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 6l6 6-6 6" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="w-5 h-5 text-[#FFFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#FFFF00" />
            </svg>
          </div>
        </a>

        <a
          href="/Portfolio.pdf"
          download
          className="group w-full flex items-center justify-between gap-4 p-5 md:p-6 min-h-[72px] border border-[#0A0A0B]/20 rounded-2xl bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:border-[#0A0A0B]/60 hover:shadow-[0_8px_30px_rgba(255,223,0,0.12)]"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-[#0A0A0B]/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v10" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11l4 4 4-4" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="17" width="18" height="3" rx="1.5" fill="#F3F4F6" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-[#0A0A0B]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Client
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-[#0A0A0B]/60 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#0A0A0B]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12h14" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 6l6 6-6 6" stroke="#0A0A0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="w-5 h-5 text-[#FFFF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#FFFF00" />
            </svg>
          </div>
        </a>
      </div>
    </ScrollReveal>
  );
}
