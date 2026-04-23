import { motion } from "motion/react";
import { brandLogos } from "./ClientLogos";

const clients = [
  "LVMH",
  "PRADA",
  "NIKE",
  "SAMSUNG",
  "POLESTAR",
  "AESOP",
  "RIMOWA",
  "HERMÈS",
  "BALENCIAGA",
  "ACNE STUDIOS",
] as const;

// Duplicate to create seamless loop
const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

export function ClientsMarquee() {
  return (
    <section className="w-full bg-[#FFFF00] text-[#0A0A0B] py-4 md:py-5 overflow-hidden flex relative z-10">
      <div className="absolute left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#FFFF00] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#FFFF00] to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-full">
        <motion.div
          className="flex whitespace-nowrap items-center min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedClients.map((client, i) => {
            const LogoComponent = brandLogos[client];
            return (
              <div key={i} className="flex items-center">
                <div className="flex items-center gap-4 text-[#0A0A0B]">
                  <div className="h-6 md:h-10 w-auto max-w-[150px] opacity-90 mix-blend-multiply flex items-center justify-center">
                    <LogoComponent />
                  </div>
                </div>
                {/* Brutalist Red separator cross */}
                <span 
                  className="mx-8 md:mx-16 text-[#EC0606] text-[18px] md:text-[24px]"
                  style={{ fontWeight: 400 }}
                >
                  ×
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
