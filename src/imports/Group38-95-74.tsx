import svgPaths from "./svg-zhcira9im7";

function Frame9() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center leading-[0] not-italic relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] h-[15px] justify-center relative shrink-0 text-[12px] text-black w-[124px]">
        <p className="leading-[1.4]">Grade 3 - Term 1 2025</p>
      </div>
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center relative shrink-0 text-[#003049] text-[8px] tracking-[-0.08px] w-[226px]">
        <p className="leading-[12px]">Invoice No. 202</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-center p-[10px] relative shrink-0 w-[183px]">
      <Frame9 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-start justify-center pb-[10px] pt-[2px] px-[10px] relative shrink-0 w-[76px]">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap">
        <p className="leading-[1.4] whitespace-pre">K1,500</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute box-border content-stretch flex h-[36px] items-start left-0 pl-[5px] pr-0 py-0 top-[53px] w-[278px]">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center leading-[0] not-italic relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] h-[15px] justify-center relative shrink-0 text-[12px] text-black w-[132px]">
        <p className="leading-[1.4]">Canteen - August 2025</p>
      </div>
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center relative shrink-0 text-[#003049] text-[8px] tracking-[-0.08px] w-[226px]">
        <p className="leading-[12px]">Invoice No. 202</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-center p-[10px] relative shrink-0 w-[183px]">
      <Frame10 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-start justify-center pb-[10px] pt-[2px] px-[10px] relative shrink-0 w-[76px]">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap">
        <p className="leading-[1.4] whitespace-pre">K1,000</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute box-border content-stretch flex h-[36px] items-start left-0 pl-[5px] pr-0 py-0 top-[98px] w-[278px]">
      <Frame3 />
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-full items-center pb-[2px] pt-[4px] px-[10px] relative shrink-0 w-[186px]">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a929e] text-[8px] text-nowrap tracking-[-0.08px]">
        <p className="leading-[24px] whitespace-pre">Service Description</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-full relative shrink-0 w-[108px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center p-[10px] relative w-[108px]">
          <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#7a929e] text-[8px] tracking-[-0.08px] w-[54px]">
            <p className="leading-[24px]">Amount (ZMW)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute box-border content-stretch flex h-[20px] items-center left-0 pb-0 pt-[7px] px-0 top-[8px] w-[278px]">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] h-[294px] left-1/2 rounded-[15px] top-0 translate-x-[-50%] w-[278px]">
      <div className="content-stretch flex flex-col h-[294px] items-start overflow-clip relative rounded-[inherit] w-[278px]">
        <Frame8 />
        <Frame11 />
        <Frame2 />
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function IconX() {
  return (
    <div className="absolute left-[256px] size-[14px] top-[56px]" data-name="icon-x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon-x">
          <path d={svgPaths.p1edcdf00} fill="var(--fill-0, #FF0000)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function IconX1() {
  return (
    <div className="absolute left-[255px] size-[14px] top-[100px]" data-name="icon-x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon-x">
          <path d={svgPaths.p1edcdf00} fill="var(--fill-0, #FF0000)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Frame4 />
      <IconX />
      <IconX1 />
    </div>
  );
}