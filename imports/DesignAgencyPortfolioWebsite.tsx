import svgPaths from "./svg-zw2wju04hn";
import imgHeroSection from "figma:asset/889b7646974d2899e98a45957ead91c27bc7c20c.png";
import imgImageWithFallback from "figma:asset/26ba014f1f2470b5931d1ba4724e1fcac2380bf0.png";
import imgImageWithFallback1 from "figma:asset/4276ce2f6ea85fee64b1c4c4e6878d64d4170407.png";
import imgImageWithFallback2 from "figma:asset/a1076f54e43feb095dd39c9b033a4a0d2f185381.png";
import imgImageWithFallback3 from "figma:asset/c62f2b6b6c75370dbfc2a340d0f7e72d5e6ed1fa.png";
import imgImageWithFallback4 from "figma:asset/5c64505d327c0d05be493ed237568c2e6d30a87c.png";
import imgImageDramaticArchitecturalSpace from "figma:asset/57f5e6553f4980493413a663fbee87430edbdec1.png";
import imgImageSapDesignLogo from "figma:asset/2d306c095ea00234c5fa5f873c0b0e0f431e1dc2.png";

function Container1() {
  return <div className="absolute bg-[rgba(255,255,255,0.03)] h-[997px] left-[362.88px] top-0 w-px" data-name="Container" />;
}

function Container2() {
  return <div className="absolute bg-[rgba(255,255,255,0.03)] h-[997px] left-[725.75px] top-0 w-px" data-name="Container" />;
}

function Container() {
  return (
    <div className="absolute bg-[#0a0a0b] h-[997px] left-0 top-0 w-[1209.594px]" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function HeroSection1() {
  return (
    <div className="absolute h-[18px] left-[334.81px] top-[419.5px] w-[111.016px]" data-name="HeroSection">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(10,10,11,0.45)] top-[0.5px] tracking-[4.2px] uppercase whitespace-nowrap">We Design</p>
    </div>
  );
}

function Container5() {
  return <div className="bg-[#ec0606] rounded-[16777200px] shrink-0 size-[5px]" data-name="Container" />;
}

function Container6() {
  return <div className="bg-[#ec0606] h-[2px] shrink-0 w-[73.433px]" data-name="Container" />;
}

function HeroSection2() {
  return (
    <div className="absolute content-stretch flex gap-[18.567px] h-[5px] items-center justify-end left-0 top-[545.5px] w-[445.828px]" data-name="HeroSection">
      <Container5 />
      <Container6 />
    </div>
  );
}

function HeroSection3() {
  return (
    <div className="absolute h-[15px] left-[390.15px] top-[562.5px] w-[55.68px]" data-name="HeroSection">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-0 text-[10px] text-[rgba(10,10,11,0.3)] top-[0.5px] tracking-[3px] uppercase whitespace-nowrap">03 / 06</p>
    </div>
  );
}

function HeroSection5() {
  return (
    <div className="h-[60px] relative shrink-0 w-[430.219px]" data-name="HeroSection">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Montserrat:ExtraBold',sans-serif] font-extrabold leading-[60px] left-[431px] text-[#0a0a0b] text-[60px] text-right top-[-0.5px] tracking-[-1.2px] uppercase whitespace-nowrap">Experiences</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[72px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <HeroSection5 />
    </div>
  );
}

function HeroSection4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[72px] items-start left-0 overflow-clip pl-[15.609px] top-[453.5px] w-[445.828px]" data-name="HeroSection">
      <Container7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[997px] left-0 top-0 w-[518.398px]" data-name="Container">
      <HeroSection1 />
      <HeroSection2 />
      <HeroSection3 />
      <HeroSection4 />
    </div>
  );
}

function HeroSection6() {
  return (
    <div className="absolute h-[19.5px] left-0 top-0 w-[77.797px]" data-name="HeroSection">
      <p className="absolute font-['Montserrat:ExtraBold',sans-serif] font-extrabold leading-[19.5px] left-0 text-[#0a0a0b] text-[13px] top-[0.5px] tracking-[3.9px] uppercase whitespace-nowrap">Scroll</p>
    </div>
  );
}

function Container9() {
  return <div className="bg-[#ec0606] rounded-[16777200px] shrink-0 size-[6px]" data-name="Container" />;
}

function Container10() {
  return <div className="bg-[rgba(10,10,11,0.6)] h-[48px] opacity-62 shrink-0 w-[2px]" data-name="Container" />;
}

function HeroSection7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16.248px] h-[62px] items-center left-[35.9px] top-[31.5px] w-[6px]" data-name="HeroSection">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[93.5px] left-[220.3px] top-[855.5px] w-[77.797px]" data-name="Container">
      <HeroSection6 />
      <HeroSection7 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-[yellow] h-[997px] left-[1209.6px] overflow-clip top-0 w-[518.398px]" data-name="Container">
      <Container4 />
      <Container8 />
    </div>
  );
}

function HeroSection8() {
  return (
    <div className="h-[280px] relative shrink-0 w-full" data-name="HeroSection">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeroSection} />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[280px] items-start opacity-85 overflow-clip relative shadow-[0px_8px_32px_0px_rgba(0,0,0,0.5)] shrink-0 w-full" data-name="Container">
      <HeroSection8 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[997px] items-start left-0 overflow-clip pl-[987px] pr-[521px] pt-[62.015px] top-0 w-[1728px]" data-name="Container">
      <Container12 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[18px] left-[120.95px] top-0 w-[1088.641px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.6)] top-[0.5px] tracking-[4.2px] uppercase whitespace-nowrap">One Practice. Multiple Scales.</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[426.391px] leading-[213.2px] left-[120.95px] text-[260px] top-[38px] tracking-[-13px] w-[1219.273px] whitespace-nowrap" data-name="Heading 1">
      <p className="absolute font-['Montserrat:ExtraBold',sans-serif] font-extrabold left-0 text-white top-0">across</p>
      <p className="absolute font-['Montserrat:Light_Italic',sans-serif] font-light italic left-0 text-[#ec0606] top-[213.2px]">scale.</p>
    </div>
  );
}

function Container14() {
  return <div className="absolute bg-[yellow] h-[3px] left-[120.95px] top-[484.39px] w-[96px]" data-name="Container" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[57.797px] left-[120.95px] top-[507.39px] w-[440px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[28.9px] left-0 text-[17px] text-[rgba(255,255,255,0.55)] top-[-0.5px] w-[440px]">We move between buildings, objects and interfaces — without changing mindset.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[249.04px] size-[14px] top-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p33b0c200} id="Vector" stroke="var(--stroke-0, #EC0606)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p22ad4980} id="Vector_2" stroke="var(--stroke-0, #EC0606)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function HeroSection10() {
  return (
    <div className="bg-[yellow] h-[50px] relative shrink-0 w-[295.039px]" data-name="HeroSection">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[18px] left-[135px] text-[#0a0a0b] text-[12px] text-center top-[16.5px] tracking-[2.4px] uppercase whitespace-nowrap">Start a conversation</p>
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[166.73px] size-[14px] top-[18.75px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p33b0c200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.16667" />
          <path d={svgPaths.p22ad4980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function HeroSection11() {
  return (
    <div className="h-[51.5px] relative shrink-0 w-[180.727px]" data-name="HeroSection">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[19.5px] left-[79px] text-[13px] text-[rgba(255,255,255,0.5)] text-center top-[16.5px] tracking-[1.3px] whitespace-nowrap">View selected works</p>
        <Icon1 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[51.5px] items-start left-[120.95px] top-[597.19px] w-[1088.641px]" data-name="Container">
      <HeroSection10 />
      <HeroSection11 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[16.5px] left-[120.95px] top-[680.69px] w-[1088.641px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[16.5px] left-0 text-[11px] text-[rgba(255,255,255,0.3)] top-[-0.5px] tracking-[2.75px] uppercase whitespace-nowrap">Accepting select projects for 2026</p>
    </div>
  );
}

function HeroSection9() {
  return (
    <div className="h-[697.188px] relative shrink-0 w-[1209.594px]" data-name="HeroSection">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph />
        <Heading />
        <Container14 />
        <Paragraph1 />
        <Container15 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col h-[997px] items-start justify-end left-0 pb-[80px] top-0 w-[1209.594px]" data-name="Container">
      <HeroSection9 />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="h-[997px] overflow-clip relative shrink-0 w-full" data-name="HeroSection">
      <Container />
      <Container3 />
      <Container11 />
      <Container13 />
    </div>
  );
}

function Container18() {
  return <div className="bg-[yellow] h-[3px] shrink-0 w-[32px]" data-name="Container" />;
}

function Paragraph3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[146.438px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.4)] top-[0.5px] tracking-[3.6px] uppercase whitespace-nowrap">Our Expertise</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Paragraph3 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[22.5px] left-[24px] top-[39.5px] w-[19.008px]" data-name="Text">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.25)] top-[-1px] tracking-[1.5px] whitespace-nowrap">01</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[72.797px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[72.8px] left-0 text-[56px] text-[rgba(255,255,255,0.9)] top-0 tracking-[-1.12px] whitespace-nowrap">Architecture</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.35)] top-[-1px] whitespace-nowrap">Spatial systems for residential, commercial, industrial, and healthcare environments.</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[99.297px] items-start left-[83.01px] top-0 w-[630.031px]" data-name="Container">
      <Heading2 />
      <Paragraph4 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[99.297px] relative shrink-0 w-[737.039px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text />
        <Container21 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p154e6c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.33333" />
          <path d={svgPaths.p22879fc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[260px] p-[2px] rounded-[16777200px] size-[40px] top-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Icon2 />
    </div>
  );
}

function Container24() {
  return <div className="absolute h-[160px] left-0 top-0 w-[240px]" data-name="Container" />;
}

function Container22() {
  return (
    <div className="h-[160px] relative shrink-0 w-[324px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex h-[226px] items-center justify-between pt-[2px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t-2 inset-0 pointer-events-none" />
      <Container20 />
      <Container22 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[22.5px] left-[24px] top-[39.5px] w-[21.977px]" data-name="Text">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.25)] top-[-1px] tracking-[1.5px] whitespace-nowrap">02</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[72.797px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[72.8px] left-0 text-[56px] text-[rgba(255,255,255,0.9)] top-0 tracking-[-1.12px] whitespace-nowrap">Interior Design</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.35)] top-[-1px] whitespace-nowrap">Human-centered environments shaped by material logic.</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[99.297px] items-start left-[85.98px] top-0 w-[431.281px]" data-name="Container">
      <Heading3 />
      <Paragraph5 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[99.297px] relative shrink-0 w-[541.258px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text1 />
        <Container26 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p154e6c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.33333" />
          <path d={svgPaths.p22879fc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[260px] p-[2px] rounded-[16777200px] size-[40px] top-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Icon3 />
    </div>
  );
}

function Container29() {
  return <div className="absolute h-[160px] left-0 top-0 w-[240px]" data-name="Container" />;
}

function Container27() {
  return (
    <div className="h-[160px] relative shrink-0 w-[324px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex h-[226px] items-center justify-between pt-[2px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t-2 inset-0 pointer-events-none" />
      <Container25 />
      <Container27 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[22.5px] left-[24px] top-[39.5px] w-[21.906px]" data-name="Text">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.25)] top-[-1px] tracking-[1.5px] whitespace-nowrap">03</p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[72.797px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[72.8px] left-0 text-[56px] text-[rgba(255,255,255,0.9)] top-0 tracking-[-1.12px] whitespace-nowrap">Product Design</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.35)] top-[-1px] whitespace-nowrap">Objects designed for usability and longevity.</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[99.297px] items-start left-[85.91px] top-0 w-[442.094px]" data-name="Container">
      <Heading4 />
      <Paragraph6 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[99.297px] relative shrink-0 w-[552px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text2 />
        <Container31 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p154e6c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.33333" />
          <path d={svgPaths.p22879fc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[260px] p-[2px] rounded-[16777200px] size-[40px] top-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Icon4 />
    </div>
  );
}

function Container34() {
  return <div className="absolute h-[160px] left-0 top-0 w-[240px]" data-name="Container" />;
}

function Container32() {
  return (
    <div className="h-[160px] relative shrink-0 w-[324px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex h-[226px] items-center justify-between pt-[2px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t-2 inset-0 pointer-events-none" />
      <Container30 />
      <Container32 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[22.5px] left-[24px] top-[39.5px] w-[23.523px]" data-name="Text">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.25)] top-[-1px] tracking-[1.5px] whitespace-nowrap">04</p>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[72.797px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[72.8px] left-0 text-[56px] text-[rgba(255,255,255,0.9)] top-0 tracking-[-1.12px] whitespace-nowrap">UI/UX Design</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.35)] top-[-1px] whitespace-nowrap">Digital systems built for clarity and scale.</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[99.297px] items-start left-[87.52px] top-0 w-[376.43px]" data-name="Container">
      <Heading5 />
      <Paragraph7 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[99.297px] relative shrink-0 w-[487.953px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text3 />
        <Container36 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p154e6c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.33333" />
          <path d={svgPaths.p22879fc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[260px] p-[2px] rounded-[16777200px] size-[40px] top-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <Icon5 />
    </div>
  );
}

function Container39() {
  return <div className="absolute h-[160px] left-0 top-0 w-[240px]" data-name="Container" />;
}

function Container37() {
  return (
    <div className="h-[160px] relative shrink-0 w-[324px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex h-[226px] items-center justify-between pt-[2px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t-2 inset-0 pointer-events-none" />
      <Container35 />
      <Container37 />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[2px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t-2 inset-0 pointer-events-none" />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col h-[906px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Container40 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[56px] h-[980px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container19 />
    </div>
  );
}

function Section() {
  return (
    <div className="bg-[#0a0a0b] content-stretch flex flex-col h-[1204px] items-start overflow-clip pt-[112px] px-[164px] relative shrink-0 w-[1728px]" data-name="Section">
      <Container16 />
    </div>
  );
}

function Container41() {
  return <div className="absolute bg-[rgba(10,10,11,0.05)] h-[769.172px] left-[1569.48px] top-0 w-[3px]" data-name="Container" />;
}

function Container44() {
  return <div className="bg-[yellow] h-[3px] shrink-0 w-[32px]" data-name="Container" />;
}

function Paragraph8() {
  return (
    <div className="h-[18px] relative shrink-0 w-[181.758px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(10,10,11,0.5)] top-[0.5px] tracking-[3.6px] uppercase whitespace-nowrap">About the Studio</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Paragraph8 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[39px] left-0 top-0 w-[803.328px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[39px] left-0 text-[26px] text-[rgba(10,10,11,0.6)] top-[-0.5px] tracking-[-0.26px] whitespace-nowrap">We believe design is an act of</p>
    </div>
  );
}

function AboutSection1() {
  return (
    <div className="absolute h-[110.5px] left-0 top-0 w-[803.328px]" data-name="AboutSection">
      <p className="absolute font-['Montserrat:ExtraLight_Italic',sans-serif] font-extralight italic leading-[110.5px] left-0 text-[#0a0a0b] text-[130px] top-0 tracking-[-5.2px] whitespace-nowrap">care.</p>
    </div>
  );
}

function AboutSection2() {
  return <div className="absolute bg-[yellow] h-[4px] left-0 top-[118.5px] w-[80px]" data-name="AboutSection" />;
}

function Container47() {
  return (
    <div className="absolute h-[122.5px] left-0 top-[55px] w-[803.328px]" data-name="Container">
      <AboutSection1 />
      <AboutSection2 />
    </div>
  );
}

function AboutSection3() {
  return (
    <div className="absolute h-[88.391px] left-0 top-0 w-[580px]" data-name="AboutSection">
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[44.2px] left-0 text-[34px] text-[rgba(10,10,11,0.7)] top-0 tracking-[-0.68px] w-[489px]">A dialogue between material, space, and human need.</p>
    </div>
  );
}

function AboutSection4() {
  return (
    <div className="absolute h-[51px] left-0 top-[108.39px] w-[480px]" data-name="AboutSection">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[25.5px] left-0 text-[15px] text-[rgba(10,10,11,0.5)] top-[-0.5px] tracking-[0.3px] w-[470px]">Residential, cultural, and commercial projects across Europe and the Middle East.</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[159.391px] left-0 top-[209.5px] w-[803.328px]" data-name="Container">
      <AboutSection3 />
      <AboutSection4 />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[471.172px] left-0 top-0 w-[803.328px]" data-name="Container">
      <Paragraph9 />
      <Container47 />
      <Container48 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[172.781px] left-0 top-0 w-[445.336px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[28.8px] left-0 text-[16px] text-[rgba(10,10,11,0.6)] top-[0.5px] w-[440px]">Space and Product Studio is a multidisciplinary practice working across architecture, interiors, product, and digital design. Residential towers, cultural institutions, brand systems, product lines — we approach every engagement with the same principle: clarity through restraint.</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[86.391px] left-0 top-[204.78px] w-[445.336px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[28.8px] left-0 text-[16px] text-[rgba(10,10,11,0.6)] top-[0.5px] w-[433px]">{`Architecture informs our digital works. Digital informs our spatial logic. The practices aren't parallel — they're the same practice, applied at different scales.`}</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:ExtraBold',sans-serif] font-extrabold leading-[0] left-0 text-[#0a0a0b] text-[0px] top-0 tracking-[-1.68px] whitespace-nowrap">
        <span className="leading-[84px] text-[56px]">12</span>
        <span className="font-['Montserrat:Regular',sans-serif] font-normal leading-[42px] text-[#ec0606] text-[28px]">yr</span>
      </p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(10,10,11,0.4)] top-[0.5px] tracking-[2.4px] uppercase whitespace-nowrap">Practice</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[106px] items-start left-0 top-[24px] w-[132.445px]" data-name="Container">
      <Paragraph12 />
      <Paragraph13 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:ExtraBold',sans-serif] font-extrabold leading-[0] left-0 text-[#0a0a0b] text-[0px] top-0 tracking-[-1.68px] whitespace-nowrap">
        <span className="leading-[84px] text-[56px]">80</span>
        <span className="font-['Montserrat:Regular',sans-serif] font-normal leading-[42px] text-[#ec0606] text-[28px]">+</span>
      </p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(10,10,11,0.4)] top-[0.5px] tracking-[2.4px] uppercase whitespace-nowrap">Projects</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[106px] items-start left-[156.45px] top-[24px] w-[132.445px]" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:ExtraBold',sans-serif] font-extrabold leading-[84px] left-0 text-[#0a0a0b] text-[56px] top-0 tracking-[-1.68px] whitespace-nowrap">4</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(10,10,11,0.4)] top-[0.5px] tracking-[2.4px] uppercase whitespace-nowrap">Disciplines</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[106px] items-start left-[312.89px] top-[24px] w-[132.445px]" data-name="Container">
      <Paragraph16 />
      <Paragraph17 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute border-[rgba(10,10,11,0.1)] border-solid border-t-2 h-[132px] left-0 top-[339.17px] w-[445.336px]" data-name="Container">
      <Container51 />
      <Container52 />
      <Container53 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[471.172px] left-[954.66px] top-0 w-[445.336px]" data-name="Container">
      <Paragraph10 />
      <Paragraph11 />
      <Container50 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[471.172px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container49 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[56px] h-[545.172px] items-start left-[164px] top-[112px] w-[1400px]" data-name="Container">
      <Container43 />
      <Container45 />
    </div>
  );
}

function AboutSection() {
  return (
    <div className="h-[769.172px] overflow-clip relative shrink-0 w-full" data-name="AboutSection" style={{ backgroundImage: "linear-gradient(90deg, rgba(10, 10, 11, 0.05) 0%, rgba(0, 0, 0, 0) 0%), linear-gradient(rgba(10, 10, 11, 0.05) 0.13001%, rgba(0, 0, 0, 0) 0.13001%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Container41 />
      <Container42 />
    </div>
  );
}

function Container57() {
  return <div className="bg-[yellow] h-[3px] shrink-0 w-[32px]" data-name="Container" />;
}

function Paragraph18() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.4)] top-[0.5px] tracking-[3.6px] uppercase whitespace-nowrap">Selected Works</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[18px] relative shrink-0 w-[210.586px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container57 />
        <Paragraph18 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[yellow] h-[37.5px] left-0 top-0 w-[51.734px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[19.5px] left-[26px] text-[#0a0a0b] text-[13px] text-center top-[9.5px] tracking-[0.65px] whitespace-nowrap">All</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[37.5px] left-[59.73px] top-0 w-[122.766px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[19.5px] left-[60.5px] text-[13px] text-[rgba(255,255,255,0.4)] text-center top-[8.5px] tracking-[0.65px] whitespace-nowrap">Architecture</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[37.5px] left-[190.5px] top-0 w-[140.891px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[19.5px] left-[69.5px] text-[13px] text-[rgba(255,255,255,0.4)] text-center top-[8.5px] tracking-[0.65px] whitespace-nowrap">Interior Design</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[37.5px] left-[339.39px] top-0 w-[145.125px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[19.5px] left-[72.5px] text-[13px] text-[rgba(255,255,255,0.4)] text-center top-[8.5px] tracking-[0.65px] whitespace-nowrap">Product Design</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[37.5px] left-[492.52px] top-0 w-[128.625px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[19.5px] left-[63px] text-[13px] text-[rgba(255,255,255,0.4)] text-center top-[8.5px] tracking-[0.65px] whitespace-nowrap">UI/UX Design</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[37.5px] relative shrink-0 w-[621.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex h-[37.5px] items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Container58 />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[904px] left-[4px] top-[4px] w-[676px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container61() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[904px] left-[4px] top-[4px] w-[676px]" data-name="Container" />;
}

function Container60() {
  return (
    <div className="h-[912px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback />
        <Container61 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[36.398px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[36.4px] left-0 text-[28px] text-white top-0 tracking-[-0.56px] whitespace-nowrap">Haus am See</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="bg-[#0a0a0b] h-[28px] relative shrink-0 w-[137.352px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-[13px] text-[12px] text-[yellow] top-[5.5px] tracking-[1.2px] uppercase whitespace-nowrap">Architecture</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Text4 />
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72.398px] items-start left-0 top-0 w-[183.523px]" data-name="Container">
      <Heading6 />
      <Container64 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[21px] left-[649.91px] top-[4px] w-[34.086px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">2024</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[72.398px] relative shrink-0 w-full" data-name="Container">
      <Container63 />
      <Paragraph19 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[1000.398px] items-start left-0 top-0 w-[684px]" data-name="Button">
      <Container60 />
      <Container62 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute h-[904px] left-[4px] top-[4px] w-[676px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container66() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[904px] left-[4px] top-[4px] w-[676px]" data-name="Container" />;
}

function Container65() {
  return (
    <div className="h-[912px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback1 />
        <Container66 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[36.398px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[36.4px] left-0 text-[28px] text-white top-0 tracking-[-0.56px] whitespace-nowrap">Atelier Workspace</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="bg-[#0a0a0b] h-[28px] relative shrink-0 w-[127.438px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-[13px] text-[12px] text-[yellow] top-[5.5px] tracking-[1.2px] uppercase whitespace-nowrap">UI/UX Design</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Text5 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72.398px] items-start left-0 top-0 w-[260.234px]" data-name="Container">
      <Heading7 />
      <Container69 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[21px] left-[649.91px] top-[4px] w-[34.086px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">2024</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[72.398px] relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Paragraph20 />
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[1000.398px] items-start left-[716px] top-0 w-[684px]" data-name="Button">
      <Container65 />
      <Container67 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="absolute h-[505px] left-[4px] top-[4px] w-[676px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container71() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[505px] left-[4px] top-[4px] w-[676px]" data-name="Container" />;
}

function Container70() {
  return (
    <div className="h-[513px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback2 />
        <Container71 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[36.398px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[36.4px] left-0 text-[28px] text-white top-0 tracking-[-0.56px] whitespace-nowrap">Maison Lumiere</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="bg-[#0a0a0b] h-[28px] relative shrink-0 w-[155.906px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-[13px] text-[12px] text-[yellow] top-[5.5px] tracking-[1.2px] uppercase whitespace-nowrap">Interior Design</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Text6 />
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72.398px] items-start left-0 top-0 w-[226.063px]" data-name="Container">
      <Heading8 />
      <Container74 />
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[21px] left-[649.91px] top-[4px] w-[34.086px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">2024</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[72.398px] relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <Paragraph21 />
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[601.398px] items-start left-0 top-[1032.4px] w-[684px]" data-name="Button">
      <Container70 />
      <Container72 />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="absolute h-[505px] left-[4px] top-[4px] w-[676px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHeroSection} />
    </div>
  );
}

function Container76() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[505px] left-[4px] top-[4px] w-[676px]" data-name="Container" />;
}

function Container75() {
  return (
    <div className="h-[513px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback3 />
        <Container76 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[36.398px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[36.4px] left-0 text-[28px] text-white top-0 tracking-[-0.56px] whitespace-nowrap">Forma Chair</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#0a0a0b] h-[28px] relative shrink-0 w-[156.914px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-[13px] text-[12px] text-[yellow] top-[5.5px] tracking-[1.2px] uppercase whitespace-nowrap">Product Design</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Text7 />
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72.398px] items-start left-0 top-0 w-[173.602px]" data-name="Container">
      <Heading9 />
      <Container79 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[21px] left-[650.95px] top-[4px] w-[33.055px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">2023</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[72.398px] relative shrink-0 w-full" data-name="Container">
      <Container78 />
      <Paragraph22 />
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[601.398px] items-start left-[716px] top-[1032.4px] w-[684px]" data-name="Button">
      <Container75 />
      <Container77 />
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="absolute h-[604.5px] left-[4px] top-[4px] w-[1392px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container81() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[604.5px] left-[4px] top-[4px] w-[1392px]" data-name="Container" />;
}

function Container80() {
  return (
    <div className="h-[612.5px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback4 />
        <Container81 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[36.398px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[36.4px] left-0 text-[28px] text-white top-0 tracking-[-0.56px] whitespace-nowrap">Kulturhaus Wien</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="bg-[#0a0a0b] h-[28px] relative shrink-0 w-[137.352px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-[13px] text-[12px] text-[yellow] top-[5.5px] tracking-[1.2px] uppercase whitespace-nowrap">Architecture</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Text8 />
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72.398px] items-start left-0 top-0 w-[239.344px]" data-name="Container">
      <Heading10 />
      <Container84 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[21px] left-[1366.95px] top-[4px] w-[33.055px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">2023</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[72.398px] relative shrink-0 w-full" data-name="Container">
      <Container83 />
      <Paragraph23 />
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[700.898px] items-start left-0 top-[1665.8px] w-[1400px]" data-name="Button">
      <Container80 />
      <Container82 />
    </div>
  );
}

function ImageWithFallback5() {
  return (
    <div className="absolute h-[505px] left-[4px] top-[4px] w-[676px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container86() {
  return <div className="absolute bg-[rgba(0,0,0,0)] h-[505px] left-[4px] top-[4px] w-[676px]" data-name="Container" />;
}

function Container85() {
  return (
    <div className="h-[513px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback5 />
        <Container86 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[36.398px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[36.4px] left-0 text-[28px] text-white top-0 tracking-[-0.56px] whitespace-nowrap">Stille Wohnen</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-[#0a0a0b] h-[28px] relative shrink-0 w-[155.906px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-[13px] text-[12px] text-[yellow] top-[5.5px] tracking-[1.2px] uppercase whitespace-nowrap">Interior Design</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Text9 />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72.398px] items-start left-0 top-0 w-[198.789px]" data-name="Container">
      <Heading11 />
      <Container89 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[21px] left-[650.95px] top-[4px] w-[33.055px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">2023</p>
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[72.398px] relative shrink-0 w-full" data-name="Container">
      <Container88 />
      <Paragraph24 />
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[601.398px] items-start left-0 top-[2398.7px] w-[684px]" data-name="Button">
      <Container85 />
      <Container87 />
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[3000.094px] relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] h-[3101.594px] items-start relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container59 />
    </div>
  );
}

function ProjectsSection() {
  return (
    <div className="h-[3325.594px] relative shrink-0 w-full" data-name="ProjectsSection" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0) 0%), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0) 0%), linear-gradient(90deg, rgb(10, 10, 11) 0%, rgb(10, 10, 11) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[112px] px-[164px] relative size-full">
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function Container90() {
  return <div className="absolute bg-[rgba(255,255,255,0.1)] h-[2px] left-0 top-0 w-[1728px]" data-name="Container" />;
}

function Container91() {
  return <div className="absolute bg-[rgba(255,255,255,0.1)] h-[2px] left-0 top-[206px] w-[1728px]" data-name="Container" />;
}

function Paragraph25() {
  return (
    <div className="h-[48px] relative shrink-0 w-[544.68px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[0] left-0 text-[0px] text-[32px] text-[rgba(255,255,255,0.6)] top-[0.5px] tracking-[-0.32px] whitespace-nowrap">
          <span className="leading-[48px]">{`Have a project in mind? `}</span>
          <span className="font-['Montserrat:Bold_Italic',sans-serif] font-bold italic leading-[48px] text-white">{`Let's talk.`}</span>
        </p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[156.33px] size-[14px] top-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M2.91667 7H11.0833" id="Vector" stroke="var(--stroke-0, #0A0A0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pf23dd00} id="Vector_2" stroke="var(--stroke-0, #0A0A0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-white h-[46px] relative shrink-0 w-[198.328px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[18px] left-[86.5px] text-[#0a0a0b] text-[12px] text-center top-[14.5px] tracking-[2.16px] uppercase whitespace-nowrap">Get in touch</p>
        <Icon6 />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-center justify-between left-[164px] top-[80px] w-[1400px]" data-name="Container">
      <Paragraph25 />
      <Button15 />
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-[#0a0a0b] h-[208px] overflow-clip relative shrink-0 w-full" data-name="Section">
      <Container90 />
      <Container91 />
      <Container92 />
    </div>
  );
}

function Container94() {
  return <div className="bg-[yellow] h-[967.172px] shrink-0 w-[864px]" data-name="Container" />;
}

function Container95() {
  return (
    <div className="bg-[#0a0a0b] flex-[1_0_0] h-[967.172px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[yellow] border-l-4 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute content-stretch flex h-[967.172px] items-start left-0 top-0 w-[1728px]" data-name="Container">
      <Container94 />
      <Container95 />
    </div>
  );
}

function Container99() {
  return <div className="bg-[#0a0a0b] h-[3px] shrink-0 w-[32px]" data-name="Container" />;
}

function Paragraph26() {
  return (
    <div className="h-[18px] relative shrink-0 w-[130.492px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(10,10,11,0.5)] top-[0.5px] tracking-[3.6px] uppercase whitespace-nowrap">Our Process</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Container99 />
      <Paragraph26 />
    </div>
  );
}

function ProcessSection1() {
  return (
    <div className="absolute h-[140.797px] left-0 top-0 w-[628.438px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[0] left-0 text-[#0a0a0b] text-[0px] text-[64px] top-0 tracking-[-1.28px] w-[561px]">
        <span className="leading-[70.4px]">{`A clear path from `}</span>
        <span className="font-['Montserrat:Bold_Italic',sans-serif] italic leading-[70.4px] text-[#ec0606]">vision</span>
        <span className="leading-[70.4px]">{` to reality.`}</span>
      </p>
    </div>
  );
}

function ProcessSection2() {
  return (
    <div className="absolute h-[86.391px] left-0 top-[227.8px] w-[500px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[28.8px] left-0 text-[16px] text-[rgba(10,10,11,0.7)] top-[0.5px] w-[479px]">Our methodology strips away the superfluous to reveal the essential. Every phase is a deliberate step toward structural and functional clarity.</p>
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[314px] relative shrink-0 w-full" data-name="Container">
      <ProcessSection1 />
      <ProcessSection2 />
    </div>
  );
}

function Container97() {
  return (
    <div className="flex-[1_0_0] h-[743.172px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[56px] items-start pr-[48px] relative size-full">
        <Container98 />
        <Container100 />
      </div>
    </div>
  );
}

function ProcessSection3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] h-[24.5px] left-[24px] top-[25.5px] w-[96.109px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[16.5px] left-[12px] text-[11px] text-[rgba(255,255,255,0.8)] top-[3.5px] tracking-[2.2px] uppercase whitespace-nowrap">Phase 01</p>
    </div>
  );
}

function ProcessSection4() {
  return (
    <div className="absolute left-[239.78px] size-[100px] top-[285.59px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Black',sans-serif] font-black leading-[100px] left-0 text-[100px] text-[rgba(255,255,255,0.02)] top-0 tracking-[-5px] whitespace-nowrap">01</p>
    </div>
  );
}

function ProcessSection5() {
  return (
    <div className="absolute h-[28.594px] left-[24px] top-[66px] w-[267.781px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[28.6px] left-0 text-[22px] text-white top-[-0.5px] tracking-[-0.44px] whitespace-nowrap">Discover</p>
    </div>
  );
}

function ProcessSection6() {
  return (
    <div className="absolute h-[111.992px] left-[24px] top-[110.59px] w-[267.781px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.4px] left-0 text-[14px] text-[rgba(255,255,255,0.4)] top-[0.5px] w-[257px]">We listen, research, and immerse ourselves in your context — understanding the brief, the site, the users, and the ambition behind the project.</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-0 w-[186.711px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Stakeholder Interviews</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-[33px] w-[106.523px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Site Analysis</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-[114.52px] top-[33px] w-[119.047px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">User Research</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-[66px] w-[149.461px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Brief Development</p>
    </div>
  );
}

function ProcessSection7() {
  return (
    <div className="absolute h-[91px] left-[24px] top-[246.59px] w-[267.781px]" data-name="ProcessSection">
      <Text10 />
      <Text11 />
      <Text12 />
      <Text13 />
    </div>
  );
}

function Container102() {
  return (
    <div className="absolute bg-[#141416] border border-[rgba(255,255,255,0.1)] border-solid h-[363.586px] left-[24px] overflow-clip top-0 w-[317.781px]" data-name="Container">
      <ProcessSection3 />
      <ProcessSection4 />
      <ProcessSection5 />
      <ProcessSection6 />
      <ProcessSection7 />
    </div>
  );
}

function ProcessSection8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] h-[24.5px] left-[24px] top-[25.5px] w-[98.281px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[16.5px] left-[12px] text-[11px] text-[rgba(255,255,255,0.8)] top-[3.5px] tracking-[2.2px] uppercase whitespace-nowrap">Phase 02</p>
    </div>
  );
}

function ProcessSection9() {
  return (
    <div className="absolute h-[100px] left-[220.78px] top-[285.59px] w-[119px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Black',sans-serif] font-black leading-[100px] left-0 text-[100px] text-[rgba(255,255,255,0.02)] top-0 tracking-[-5px] whitespace-nowrap">02</p>
    </div>
  );
}

function ProcessSection10() {
  return (
    <div className="absolute h-[28.594px] left-[24px] top-[66px] w-[267.781px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[28.6px] left-0 text-[22px] text-white top-[-0.5px] tracking-[-0.44px] whitespace-nowrap">Define</p>
    </div>
  );
}

function ProcessSection11() {
  return (
    <div className="absolute h-[111.992px] left-[24px] top-[110.59px] w-[267.781px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.4px] left-0 text-[14px] text-[rgba(255,255,255,0.4)] top-[0.5px] w-[255px]">We distill insights into a clear design strategy — establishing the constraints, opportunities, and guiding principles that will shape every decision.</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-0 w-[129.727px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Design Strategy</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-[137.73px] top-0 w-[107.922px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Moodboards</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-[33px] w-[135.969px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Material Palette</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-[66px] w-[146.086px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Concept Direction</p>
    </div>
  );
}

function ProcessSection12() {
  return (
    <div className="absolute h-[91px] left-[24px] top-[246.59px] w-[267.781px]" data-name="ProcessSection">
      <Text14 />
      <Text15 />
      <Text16 />
      <Text17 />
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute bg-[#141416] border border-[rgba(255,255,255,0.1)] border-solid h-[363.586px] left-[357.78px] overflow-clip top-0 w-[317.781px]" data-name="Container">
      <ProcessSection8 />
      <ProcessSection9 />
      <ProcessSection10 />
      <ProcessSection11 />
      <ProcessSection12 />
    </div>
  );
}

function ProcessSection13() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] h-[24.5px] left-[24px] top-[25.5px] w-[98.234px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[16.5px] left-[12px] text-[11px] text-[rgba(255,255,255,0.8)] top-[3.5px] tracking-[2.2px] uppercase whitespace-nowrap">Phase 03</p>
    </div>
  );
}

function ProcessSection14() {
  return (
    <div className="absolute h-[100px] left-[220.18px] top-[285.59px] w-[119.602px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Black',sans-serif] font-black leading-[100px] left-0 text-[100px] text-[rgba(255,255,255,0.02)] top-0 tracking-[-5px] whitespace-nowrap">03</p>
    </div>
  );
}

function ProcessSection15() {
  return (
    <div className="absolute h-[28.594px] left-[24px] top-[66px] w-[267.781px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[28.6px] left-0 text-[22px] text-white top-[-0.5px] tracking-[-0.44px] whitespace-nowrap">Design</p>
    </div>
  );
}

function ProcessSection16() {
  return (
    <div className="absolute h-[111.992px] left-[24px] top-[110.59px] w-[267.781px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.4px] left-0 text-[14px] text-[rgba(255,255,255,0.4)] top-[0.5px] w-[231px]">Ideas take form through iterative exploration — from sketches and models to detailed drawings and prototypes, refined through continuous dialogue.</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-0 w-[170.406px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Concept Development</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-[33px] w-[131.344px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">3D Visualization</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-[139.34px] top-[33px] w-[104.594px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Prototyping</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-[66px] w-[111.313px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Detail Design</p>
    </div>
  );
}

function ProcessSection17() {
  return (
    <div className="absolute h-[91px] left-[24px] top-[246.59px] w-[267.781px]" data-name="ProcessSection">
      <Text18 />
      <Text19 />
      <Text20 />
      <Text21 />
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute bg-[#141416] border border-[rgba(255,255,255,0.1)] border-solid h-[363.586px] left-[24px] overflow-clip top-[379.59px] w-[317.781px]" data-name="Container">
      <ProcessSection13 />
      <ProcessSection14 />
      <ProcessSection15 />
      <ProcessSection16 />
      <ProcessSection17 />
    </div>
  );
}

function ProcessSection18() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] h-[24.5px] left-[24px] top-[25.5px] w-[99.422px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[16.5px] left-[12px] text-[11px] text-[rgba(255,255,255,0.8)] top-[3.5px] tracking-[2.2px] uppercase whitespace-nowrap">Phase 04</p>
    </div>
  );
}

function ProcessSection19() {
  return (
    <div className="absolute h-[100px] left-[209.38px] top-[285.59px] w-[130.406px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Black',sans-serif] font-black leading-[100px] left-0 text-[100px] text-[rgba(255,255,255,0.02)] top-0 tracking-[-5px] whitespace-nowrap">04</p>
    </div>
  );
}

function ProcessSection20() {
  return (
    <div className="absolute h-[28.594px] left-[24px] top-[66px] w-[267.781px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[28.6px] left-0 text-[22px] text-white top-[-0.5px] tracking-[-0.44px] whitespace-nowrap">Deliver</p>
    </div>
  );
}

function ProcessSection21() {
  return (
    <div className="absolute h-[89.594px] left-[24px] top-[110.59px] w-[267.781px]" data-name="ProcessSection">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.4px] left-0 text-[14px] text-[rgba(255,255,255,0.4)] top-[0.5px] w-[265px]">We oversee every detail through to completion — ensuring the final result honours the original vision with uncompromising quality.</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-0 w-[198.164px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Technical Documentation</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-[33px] w-[163.82px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Project Management</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-0 top-[66px] w-[147.844px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Quality Assurance</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute border border-[rgba(255,255,255,0.1)] border-solid h-[25px] left-[155.84px] top-[66px] w-[87.297px]" data-name="Text">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[15px] left-[8px] text-[10px] text-[rgba(255,255,255,0.3)] top-[4.5px] tracking-[1px] uppercase whitespace-nowrap">Handover</p>
    </div>
  );
}

function ProcessSection22() {
  return (
    <div className="absolute h-[91px] left-[24px] top-[224.19px] w-[267.781px]" data-name="ProcessSection">
      <Text22 />
      <Text23 />
      <Text24 />
      <Text25 />
    </div>
  );
}

function Container105() {
  return (
    <div className="absolute bg-[#141416] border border-[rgba(255,255,255,0.1)] border-solid h-[363.586px] left-[357.78px] overflow-clip top-[379.59px] w-[317.781px]" data-name="Container">
      <ProcessSection18 />
      <ProcessSection19 />
      <ProcessSection20 />
      <ProcessSection21 />
      <ProcessSection22 />
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[743.172px] relative shrink-0 w-[675.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container102 />
        <Container103 />
        <Container104 />
        <Container105 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute content-stretch flex gap-[48px] h-[743.172px] items-start left-[164px] top-[112px] w-[1400px]" data-name="Container">
      <Container97 />
      <Container101 />
    </div>
  );
}

function ProcessSection() {
  return (
    <div className="h-[967.172px] overflow-clip relative shrink-0 w-full" data-name="ProcessSection">
      <Container93 />
      <Container96 />
    </div>
  );
}

function ImageDramaticArchitecturalSpace() {
  return (
    <div className="absolute h-[897.297px] left-0 top-0 w-[1728px]" data-name="Image (Dramatic architectural space)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageDramaticArchitecturalSpace} />
    </div>
  );
}

function Container108() {
  return <div className="absolute bg-[rgba(10,10,11,0.65)] h-[747.75px] left-0 top-0 w-[1728px]" data-name="Container" />;
}

function Container107() {
  return (
    <div className="absolute h-[748px] left-0 top-[4.33px] w-[1728px]" data-name="Container">
      <ImageDramaticArchitecturalSpace />
      <Container108 />
    </div>
  );
}

function Container109() {
  return <div className="absolute bg-gradient-to-b from-[#0a0a0b] h-[128px] left-0 to-[rgba(0,0,0,0)] top-0 w-[1728px]" data-name="Container" />;
}

function Container110() {
  return <div className="absolute bg-gradient-to-b from-[#0a0a0b] h-[128px] left-0 to-[rgba(0,0,0,0)] top-[619.75px] w-[1728px]" data-name="Container" />;
}

function Container111() {
  return <div className="absolute bg-[#ec0606] h-[4px] left-0 top-[373.88px] w-[1728px]" data-name="Container" />;
}

function Heading1() {
  return (
    <div className="absolute h-[340px] leading-[170px] left-0 text-[200px] text-center text-white top-0 tracking-[-10px] w-[1076.703px] whitespace-nowrap" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Montserrat:ExtraBold',sans-serif] font-extrabold left-[538.5px] top-0">From Spaces</p>
      <p className="-translate-x-1/2 absolute font-['Montserrat:ExtraLight_Italic',sans-serif] font-extralight italic left-[538.16px] top-[170px]">to screens.</p>
    </div>
  );
}

function Container114() {
  return <div className="absolute bg-[yellow] h-[3px] left-[490.35px] top-[372px] w-[96px]" data-name="Container" />;
}

function Paragraph27() {
  return (
    <div className="absolute h-[22.5px] left-0 top-[399px] w-[1076.703px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[22.5px] left-[538.55px] text-[15px] text-[rgba(255,255,255,0.35)] text-center top-[-1px] tracking-[4.5px] uppercase whitespace-nowrap">One practice. Every scale.</p>
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[421.5px] relative shrink-0 w-[1076.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading1 />
        <Container114 />
        <Paragraph27 />
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute content-stretch flex flex-col h-[747.75px] items-center justify-center left-0 top-0 w-[1728px]" data-name="Container">
      <Container113 />
    </div>
  );
}

function Container106() {
  return (
    <div className="bg-[#0a0a0b] h-[747.75px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container107 />
      <Container109 />
      <Container110 />
      <Container111 />
      <Container112 />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[400px] relative shrink-0 w-[195.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Black',sans-serif] font-black leading-[400px] left-[98px] text-[400px] text-[rgba(255,255,0,0.06)] text-center top-0 whitespace-nowrap">{`"`}</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute content-stretch flex h-[263.391px] items-center justify-center left-0 pr-[0.008px] top-0 w-[900px]" data-name="Container">
      <Text26 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[900px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Italic',sans-serif] font-normal italic leading-[44.8px] left-[450.45px] text-[28px] text-[rgba(255,255,255,0.6)] text-center top-0 w-[862px]">Working with SAP × Design felt like a true collaboration. They challenged our assumptions, listened deeply, and delivered something far beyond what we imagined.</p>
      </div>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[113.703px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[22.5px] left-[57px] text-[15px] text-[rgba(255,255,255,0.8)] text-center top-[-1px] tracking-[0.75px] whitespace-nowrap">Amira Okafor</p>
      </div>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[142.633px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[19.5px] left-[71.5px] text-[13px] text-[rgba(255,255,255,0.3)] text-center top-[0.5px] whitespace-nowrap">Founder, Noire Studio</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="h-[46px] relative shrink-0 w-[142.633px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Paragraph29 />
        <Paragraph30 />
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="h-[220.391px] relative shrink-0 w-[900px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[40px] items-center relative size-full">
        <Paragraph28 />
        <Container119 />
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute content-stretch flex h-[220.391px] items-center justify-center left-0 top-0 w-[900px]" data-name="Container">
      <Container118 />
    </div>
  );
}

function Container121() {
  return <div className="bg-[rgba(255,255,255,0.15)] h-[3px] shrink-0 w-full" data-name="Container" />;
}

function Button16() {
  return (
    <div className="h-[11px] relative shrink-0 w-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Container121 />
      </div>
    </div>
  );
}

function Container122() {
  return <div className="bg-[rgba(255,255,255,0.15)] h-[3px] shrink-0 w-full" data-name="Container" />;
}

function Button17() {
  return (
    <div className="h-[11px] relative shrink-0 w-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Container122 />
      </div>
    </div>
  );
}

function Container123() {
  return <div className="bg-[yellow] h-[3px] shrink-0 w-full" data-name="Container" />;
}

function Button18() {
  return (
    <div className="h-[11px] relative shrink-0 w-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Container123 />
      </div>
    </div>
  );
}

function Container124() {
  return <div className="bg-[rgba(255,255,255,0.15)] h-[3px] shrink-0 w-full" data-name="Container" />;
}

function Button19() {
  return (
    <div className="h-[11px] relative shrink-0 w-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Container124 />
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[11px] items-center justify-center left-0 top-[252.39px] w-[900px]" data-name="Container">
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
    </div>
  );
}

function Container115() {
  return (
    <div className="h-[263.391px] relative shrink-0 w-full" data-name="Container">
      <Container116 />
      <Container117 />
      <Container120 />
    </div>
  );
}

function Section2() {
  return (
    <div className="bg-[#0a0a0b] h-[561.391px] relative shrink-0 w-full" data-name="Section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[186px] px-[414px] relative size-full">
          <Container115 />
        </div>
      </div>
    </div>
  );
}

function Container126() {
  return <div className="bg-[yellow] h-[753.438px] shrink-0 w-[777.594px]" data-name="Container" />;
}

function Container127() {
  return <div className="bg-[#0a0a0b] h-[753.438px] shrink-0 w-[950.398px]" data-name="Container" />;
}

function Container125() {
  return (
    <div className="absolute content-stretch flex h-[753.438px] items-start left-0 top-0 w-[1728px]" data-name="Container">
      <Container126 />
      <Container127 />
    </div>
  );
}

function Container131() {
  return <div className="bg-[#0a0a0b] h-[3px] shrink-0 w-[32px]" data-name="Container" />;
}

function Paragraph31() {
  return (
    <div className="h-[18px] relative shrink-0 w-[132.898px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[18px] left-0 text-[12px] text-[rgba(10,10,11,0.5)] top-[0.5px] tracking-[3.6px] uppercase whitespace-nowrap">Get in Touch</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[18px] items-center left-0 top-0 w-[516.664px]" data-name="Container">
      <Container131 />
      <Paragraph31 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute h-[140.797px] leading-[70.4px] left-0 text-[#0a0a0b] text-[64px] top-[58px] tracking-[-1.28px] w-[516.664px] whitespace-nowrap" data-name="Heading 2">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold left-0 top-0">Tell us what</p>
      <p className="absolute font-['Montserrat:Light_Italic',sans-serif] font-light italic left-0 top-[70.4px]">{`you're building.`}</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[206.8px] w-[516.664px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Italic',sans-serif] font-normal italic leading-[25.5px] left-0 text-[17px] text-[rgba(10,10,11,0.5)] top-0 whitespace-nowrap">{`We'll tell you honestly if we can help.`}</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[16.5px] left-0 top-[272.3px] w-[516.664px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16.5px] left-0 text-[11px] text-[rgba(10,10,11,0.4)] top-[-0.5px] tracking-[2.2px] uppercase whitespace-nowrap">Limited collaborations each quarter.</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[86.391px] left-0 top-[328.8px] w-[400px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[28.8px] left-0 text-[16px] text-[rgba(10,10,11,0.6)] top-[0.5px] w-[397px]">{`Whether you have a defined brief or an early idea, we'd love to hear from you. Every great project begins with a simple conversation.`}</p>
    </div>
  );
}

function Container133() {
  return <div className="absolute bg-[rgba(10,10,11,0.4)] h-[2px] left-0 top-[10.25px] w-[16px]" data-name="Container" />;
}

function Link() {
  return (
    <div className="absolute h-[22.5px] left-0 top-[5.25px] w-[212.242px]" data-name="Link">
      <Container133 />
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[22.5px] left-[24px] text-[15px] text-[rgba(10,10,11,0.8)] top-[-1px] whitespace-nowrap">hello@sapstudio.design</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute h-[22.5px] left-0 top-[43.75px] w-[516.664px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[22.5px] left-[16px] text-[15px] text-[rgba(10,10,11,0.4)] top-[-1px] whitespace-nowrap">Berlin, Germany</p>
    </div>
  );
}

function Container132() {
  return (
    <div className="absolute h-[66.25px] left-0 top-[463.19px] w-[516.664px]" data-name="Container">
      <Link />
      <Paragraph35 />
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute h-[529.438px] left-0 top-0 w-[564.664px]" data-name="Container">
      <Container130 />
      <Heading12 />
      <Paragraph32 />
      <Paragraph33 />
      <Paragraph34 />
      <Container132 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[66px] left-0 top-0 w-[652px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip py-[20px] relative rounded-[inherit] size-full">
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.3)] whitespace-nowrap">Your Name</p>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.15)] border-b-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function EmailInput() {
  return (
    <div className="absolute h-[66px] left-0 top-[70px] w-[652px]" data-name="Email Input">
      <div className="content-stretch flex items-center overflow-clip py-[20px] relative rounded-[inherit] size-full">
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.3)] whitespace-nowrap">Email Address</p>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.15)] border-b-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextArea() {
  return (
    <div className="absolute h-[138px] left-0 top-[210px] w-[652px]" data-name="Text Area">
      <div className="content-stretch flex items-start overflow-clip py-[20px] relative rounded-[inherit] size-full">
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.3)] whitespace-nowrap">Tell us about your project...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.15)] border-b-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[247.77px] size-[14px] top-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M2.91667 7H11.0833" id="Vector" stroke="var(--stroke-0, #0A0A0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pf23dd00} id="Vector_2" stroke="var(--stroke-0, #0A0A0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute bg-[yellow] h-[50px] left-0 top-[390.5px] w-[293.773px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[18px] left-[134px] text-[#0a0a0b] text-[12px] text-center top-[16.5px] tracking-[2.4px] uppercase whitespace-nowrap">Discuss Your Project</p>
      <Icon7 />
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[24px] relative shrink-0 w-[99.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[rgba(255,255,255,0.3)] top-0 whitespace-nowrap">Project Type</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pb7adf00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute content-stretch flex h-[66px] items-center justify-between left-0 pb-[2px] top-[140px] w-[652px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.15)] border-b-2 border-solid inset-0 pointer-events-none" />
      <Text27 />
      <Icon8 />
    </div>
  );
}

function Form() {
  return (
    <div className="absolute h-[440.5px] left-[748px] top-0 w-[652px]" data-name="Form">
      <TextInput />
      <EmailInput />
      <TextArea />
      <Button20 />
      <Button21 />
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute h-[529.438px] left-[164px] top-[112px] w-[1400px]" data-name="Container">
      <Container129 />
      <Form />
    </div>
  );
}

function ContactSection() {
  return (
    <div className="h-[753.438px] overflow-clip relative shrink-0 w-full" data-name="ContactSection">
      <Container125 />
      <Container128 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col h-[10167.117px] items-start relative shrink-0 w-full" data-name="Main Content">
      <HeroSection />
      <Section />
      <AboutSection />
      <ProjectsSection />
      <Section1 />
      <ProcessSection />
      <Container106 />
      <Section2 />
      <ContactSection />
    </div>
  );
}

function ImageSapDesignLogo() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[96px]" data-name="Image (SAP × Design logo)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none rounded-[8px] size-full" src={imgImageSapDesignLogo} />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute left-[52.73px] size-[20px] top-0" data-name="Text">
      <p className="absolute font-['Nico_Moji:Regular','Noto_Sans:Regular',sans-serif] leading-[20px] left-[3.36px] text-[20px] text-white top-[-1.5px] tracking-[1.6px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        ×
      </p>
    </div>
  );
}

function Text28() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[166.18px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nico_Moji:Regular',sans-serif] leading-[20px] left-0 not-italic text-[20px] text-white top-[-1.5px] tracking-[1.6px] uppercase whitespace-nowrap">{`SAP `}</p>
        <Text29 />
        <p className="absolute font-['Nico_Moji:Regular',sans-serif] leading-[20px] left-[72.73px] not-italic text-[20px] text-white top-[-1.5px] tracking-[1.6px] uppercase whitespace-nowrap">{` Design`}</p>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[11px] relative shrink-0 w-[166.18px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[11px] left-0 text-[11px] text-[rgba(255,255,255,0.25)] top-[-0.5px] tracking-[2.2px] uppercase whitespace-nowrap">Space and Product</p>
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[34px] relative shrink-0 w-[166.18px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3px] items-start relative size-full">
        <Text28 />
        <Text30 />
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[96px] items-center left-0 top-0 w-[445.328px]" data-name="Container">
      <ImageSapDesignLogo />
      <Container138 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="absolute h-[76.5px] left-0 top-[120px] w-[300px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[25.5px] left-0 text-[15px] text-[rgba(255,255,255,0.4)] top-[-0.5px] w-[299px]">Designing spaces, products and digital experiences with architectural intention and human care.</p>
    </div>
  );
}

function Container136() {
  return (
    <div className="absolute h-[196.5px] left-0 top-0 w-[445.328px]" data-name="Container">
      <Container137 />
      <Paragraph36 />
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[19.5px] left-0 text-[13px] text-[rgba(255,255,255,0.3)] top-[0.5px] tracking-[2.6px] uppercase whitespace-nowrap">Contact</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Link">
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.5)] top-[-1px] whitespace-nowrap">hello@sapstudio.design</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Light',sans-serif] font-light leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.2)] top-[-1px] whitespace-nowrap">Brunnenstraße 12</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Light',sans-serif] font-light leading-[22.5px] left-0 text-[15px] text-[rgba(255,255,255,0.2)] top-[-1px] whitespace-nowrap">10119 Berlin, Germany</p>
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[91.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Link1 />
      <Paragraph38 />
      <Paragraph39 />
    </div>
  );
}

function Container139() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[131px] items-start left-[596.66px] top-0 w-[326px]" data-name="Container">
      <Paragraph37 />
      <Container140 />
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[19.5px] left-0 text-[13px] text-[rgba(255,255,255,0.3)] top-[0.5px] tracking-[2.6px] uppercase whitespace-nowrap">Follow</p>
    </div>
  );
}

function Text31() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[2px] left-0 top-[10.25px] w-[16px]" data-name="Text" />;
}

function Link2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Link">
      <Text31 />
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[22.5px] left-[24px] text-[15px] text-[rgba(255,255,255,0.4)] top-[-1px] whitespace-nowrap">Instagram</p>
    </div>
  );
}

function Text32() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[2px] left-0 top-[10.25px] w-[16px]" data-name="Text" />;
}

function Link3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Link">
      <Text32 />
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[22.5px] left-[24px] text-[15px] text-[rgba(255,255,255,0.4)] top-[-1px] whitespace-nowrap">LinkedIn</p>
    </div>
  );
}

function Text33() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[2px] left-0 top-[10.25px] w-[16px]" data-name="Text" />;
}

function Link4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Link">
      <Text33 />
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[22.5px] left-[24px] text-[15px] text-[rgba(255,255,255,0.4)] top-[-1px] whitespace-nowrap">Behance</p>
    </div>
  );
}

function Text34() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[2px] left-0 top-[10.25px] w-[16px]" data-name="Text" />;
}

function Link5() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Link">
      <Text34 />
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[22.5px] left-[24px] text-[15px] text-[rgba(255,255,255,0.4)] top-[-1px] whitespace-nowrap">Pinterest</p>
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[126px] items-start relative shrink-0 w-full" data-name="Container">
      <Link2 />
      <Link3 />
      <Link4 />
      <Link5 />
    </div>
  );
}

function Container141() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[165.5px] items-start left-[1074px] top-0 w-[326px]" data-name="Container">
      <Paragraph40 />
      <Container142 />
    </div>
  );
}

function Container135() {
  return (
    <div className="h-[196.5px] relative shrink-0 w-full" data-name="Container">
      <Container136 />
      <Container139 />
      <Container141 />
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[445.391px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[13px] text-[rgba(255,255,255,0.25)] top-[0.5px] tracking-[0.65px] whitespace-nowrap">© 2026 SAP × Design — Space and Product. All rights reserved.</p>
      </div>
    </div>
  );
}

function ImageSapDesign() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Image (SAP × Design)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageSapDesignLogo} />
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[13px] text-[rgba(255,255,255,0.25)] top-[0.5px] tracking-[0.65px] whitespace-nowrap">Design with intention.</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[182.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <ImageSapDesign />
        <Paragraph42 />
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex h-[45.5px] items-center justify-between pt-[2px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-solid border-t-2 inset-0 pointer-events-none" />
      <Paragraph41 />
      <Container144 />
    </div>
  );
}

function Container134() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[290px] items-start left-[164px] top-[56px] w-[1400px]" data-name="Container">
      <Container135 />
      <Container143 />
    </div>
  );
}

function Container146() {
  return <div className="bg-[yellow] h-[3px] shrink-0 w-full" data-name="Container" />;
}

function Container147() {
  return <div className="bg-[#ec0606] h-[2px] shrink-0 w-full" data-name="Container" />;
}

function Container145() {
  return (
    <div className="absolute content-stretch flex flex-col h-[5px] items-start left-0 top-0 w-[1728px]" data-name="Container">
      <Container146 />
      <Container147 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#0a0a0b] h-[370px] relative shrink-0 w-full" data-name="Footer">
      <Container134 />
      <Container145 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-[#0a0a0b] content-stretch flex flex-col h-[10537.117px] items-start left-0 top-0 w-[1728px]" data-name="App">
      <MainContent />
      <Footer />
    </div>
  );
}

function ImageSapDesignLogo1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[64px]" data-name="Image (SAP × Design logo)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none rounded-[4px] size-full" src={imgImageSapDesignLogo} />
    </div>
  );
}

function Text36() {
  return (
    <div className="absolute left-[73.82px] size-[28px] top-0" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Nico_Moji:Regular','Noto_Sans:Regular',sans-serif] leading-[28px] left-[14.2px] text-[28px] text-center text-white top-[-2px] tracking-[2.24px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        ×
      </p>
    </div>
  );
}

function Text35() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[232.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Nico_Moji:Regular',sans-serif] leading-[28px] left-[37.5px] not-italic text-[28px] text-center text-white top-[-2px] tracking-[2.24px] uppercase whitespace-nowrap">{`SAP `}</p>
        <Text36 />
        <p className="-translate-x-1/2 absolute font-['Nico_Moji:Regular',sans-serif] leading-[28px] left-[167.32px] not-italic text-[28px] text-center text-white top-[-2px] tracking-[2.24px] uppercase whitespace-nowrap">{` Design`}</p>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[10px] relative shrink-0 w-[217.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[10px] left-[109.5px] text-[10px] text-[rgba(255,255,255,0.4)] text-center top-0 tracking-[2.5px] uppercase whitespace-nowrap">Space and Product Studio</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Text35 />
        <Text37 />
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="h-[64px] relative shrink-0 w-[308.641px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <ImageSapDesignLogo1 />
        <Container148 />
      </div>
    </div>
  );
}

function Text38() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Text39() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Button23() {
  return (
    <div className="absolute h-[27.5px] left-0 top-0 w-[54.164px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[19.5px] left-[27px] text-[13px] text-[rgba(255,255,255,0.85)] text-center top-[4.5px] tracking-[1.04px] uppercase whitespace-nowrap">About</p>
      <Text38 />
      <Text39 />
    </div>
  );
}

function Text40() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Text41() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Button24() {
  return (
    <div className="absolute h-[27.5px] left-[94.16px] top-0 w-[75.094px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[19.5px] left-[38.5px] text-[13px] text-[rgba(255,255,255,0.85)] text-center top-[4.5px] tracking-[1.04px] uppercase whitespace-nowrap">Services</p>
      <Text40 />
      <Text41 />
    </div>
  );
}

function Text42() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Text43() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Button25() {
  return (
    <div className="absolute h-[27.5px] left-[209.26px] top-0 w-[71.906px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[19.5px] left-[36.5px] text-[13px] text-[rgba(255,255,255,0.85)] text-center top-[4.5px] tracking-[1.04px] uppercase whitespace-nowrap">Process</p>
      <Text42 />
      <Text43 />
    </div>
  );
}

function Text44() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Text45() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Button26() {
  return (
    <div className="absolute h-[27.5px] left-[321.16px] top-0 w-[58.273px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[19.5px] left-[29px] text-[13px] text-[rgba(255,255,255,0.85)] text-center top-[4.5px] tracking-[1.04px] uppercase whitespace-nowrap">Works</p>
      <Text44 />
      <Text45 />
    </div>
  );
}

function Text46() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Text47() {
  return <div className="absolute bg-[#ec0606] h-[3px] left-0 top-[28.5px] w-0" data-name="Text" />;
}

function Button27() {
  return (
    <div className="absolute h-[27.5px] left-[419.44px] top-0 w-[72.445px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[19.5px] left-[36px] text-[13px] text-[rgba(255,255,255,0.85)] text-center top-[4.5px] tracking-[1.04px] uppercase whitespace-nowrap">Contact</p>
      <Text46 />
      <Text47 />
    </div>
  );
}

function Container149() {
  return (
    <div className="h-[27.5px] relative shrink-0 w-[491.883px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button23 />
        <Button24 />
        <Button25 />
        <Button26 />
        <Button27 />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="absolute bg-[#0a0a0b] content-stretch flex h-[96px] items-center justify-between left-0 px-[120.953px] top-0 w-[1728px]" data-name="Navbar">
      <Button22 />
      <Container149 />
    </div>
  );
}

export default function DesignAgencyPortfolioWebsite() {
  return (
    <div className="bg-[#0a0a0b] relative size-full" data-name="Design Agency Portfolio Website">
      <App />
      <Navbar />
    </div>
  );
}