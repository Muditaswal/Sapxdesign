import React from "react";
import { SiNike, SiSamsung, SiPolestar } from "react-icons/si";
import mdhLogo from "../../assets/mdh.png";
import erisLogo from "../../assets/eris.png";
import issaLogo from "../../assets/issa.png";
import daSalonLogo from "../../assets/dasalon.png";

export const brandLogos = {
  LVMH: () => (
    <svg viewBox="0 0 200 40" className="h-full w-auto">
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontSize="32" fontWeight="400" letterSpacing="0.05em" fill="currentColor">LVMH</text>
    </svg>
  ),
  PRADA: () => (
    <svg viewBox="0 0 200 40" className="h-full w-auto">
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="28" fontWeight="700" letterSpacing="0.15em" fill="currentColor">PRADA</text>
    </svg>
  ),
  NIKE: () => <SiNike className="h-full w-auto" style={{ minWidth: "40px" }} />,
  SAMSUNG: () => <SiSamsung className="h-full w-auto" style={{ minWidth: "100px" }} />,
  POLESTAR: () => <SiPolestar className="h-full w-auto" style={{ minWidth: "40px" }} />,
  AESOP: () => (
    <svg viewBox="0 0 200 40" className="h-full w-auto">
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Optima', 'Segoe UI', sans-serif" fontSize="28" fontWeight="400" letterSpacing="0.1em" fill="currentColor">Aēsop.</text>
    </svg>
  ),
  RIMOWA: () => (
    <svg viewBox="0 0 200 40" className="h-full w-auto">
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="400" letterSpacing="0.2em" fill="currentColor">RIMOWA</text>
    </svg>
  ),
  HERMÈS: () => (
    <svg viewBox="0 0 200 50" className="h-full w-auto">
      <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fontWeight="400" letterSpacing="0.05em" fill="currentColor">HERMÈS</text>
      <text x="50%" y="85%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="400" letterSpacing="0.3em" fill="currentColor">PARIS</text>
    </svg>
  ),
  BALENCIAGA: () => (
    <svg viewBox="0 0 200 40" className="h-full w-auto" style={{ transform: "scale(1, 1.2)" }}>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="22" fontWeight="900" letterSpacing="0.05em" fill="currentColor">BALENCIAGA</text>
    </svg>
  ),
  "ACNE STUDIOS": () => (
    <svg viewBox="0 0 200 40" className="h-full w-auto">
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="22" fontWeight="400" letterSpacing="0.05em" fill="currentColor">Acne Studios</text>
    </svg>
  ),
  MDH: () => (
    <img
      src={mdhLogo}
      alt="MDH"
      className="h-full w-auto object-contain"
      style={{ minWidth: "44px" }}
    />
  ),
  ERIS: () => (
    <img
      src={erisLogo}
      alt="ERIS"
      className="h-full w-auto object-contain"
      style={{ minWidth: "64px" }}
    />
  ),
  "ISSA FOUNDATION": () => (
    <img
      src={issaLogo}
      alt="ISSA FOUNDATION"
      className="h-full w-auto object-contain"
      style={{ minWidth: "150px" }}
    />
  ),
  "DA SALON": () => (
    <img
      src={daSalonLogo}
      alt="DA SALON"
      className="h-full w-auto object-contain"
      style={{ minWidth: "120px" }}
    />
  ),
};
