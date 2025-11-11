import { useState } from "react";
import svgPaths from "../imports/svg-1jclls5e96";
import headerSvgPaths from "../imports/svg-4boykq1z8d";

interface ReceiptsPageProps {
  onBack: () => void;
  onNext: () => void;
  totalAmount?: number;
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-[66px] w-full relative">
      <div aria-hidden="true" className="absolute border-[#e6e6e6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="absolute left-[94px] top-[17px] flex items-center gap-[16px]">
        <Logo />
        <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[normal] not-italic text-[20px] text-black text-nowrap whitespace-pre">master-fees</p>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="size-[31px]">
      <div className="relative size-full">
        <div className="absolute bottom-[-22.63%] left-[-9.72%] right-[-9.72%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 39">
            <g id="Group 15">
              <g filter="url(#filter0_d_2_352)" id="rect84">
                <path d={headerSvgPaths.p24506700} fill="var(--fill-0, #003630)" />
                <path d={headerSvgPaths.p24506700} stroke="var(--stroke-0, white)" strokeWidth="3" />
              </g>
              <g id="path60">
                <path d={headerSvgPaths.p8fdf600} fill="var(--fill-0, #003630)" />
                <path d={headerSvgPaths.p8fdf600} stroke="var(--stroke-0, #95E36C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
              </g>
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="37.0294" id="filter0_d_2_352" width="37.0294" x="5.96046e-08" y="0.985283">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2_352" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2_352" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function InfoBanner() {
  return (
    <div className="bg-[#e0f7d4] box-border content-stretch flex flex-col gap-[10px] h-[50px] items-start p-[10px] relative rounded-[10px] shrink-0 w-[297px]">
      <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#003630] text-[8px] tracking-[-0.08px] w-full">The receipts for all your transactions will be sent to your whatsapp as well as your email upon payment.</p>
    </div>
  );
}

function ReceiptsHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[16px] text-black tracking-[-0.16px] w-[min-content]">Receipts</p>
      <InfoBanner />
    </div>
  );
}

function WhatsAppInput({ value, onChange, error }: { value: string; onChange: (value: string) => void; error?: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-w-full not-italic relative shrink-0 text-[12px] text-black tracking-[-0.12px] w-[min-content]">Enter the WhatsApp number to receive your receipt</p>
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
        <div className="[grid-area:1_/_1] h-[56px] ml-0 mt-0 relative rounded-[10px] w-[297px]">
          <div aria-hidden="true" className={`absolute border ${error ? 'border-red-500' : 'border-[#d4d6da]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
        </div>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="xxx-xxx-xxx"
          className="[grid-area:1_/_1] font-['Inter:Medium',sans-serif] font-medium leading-[1.4] ml-[139.47px] mt-[14px] not-italic relative text-[20px] w-[131.443px] bg-transparent outline-none"
        />
        <p className="[grid-area:1_/_1] font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[1.4] ml-[12px] mt-[17px] not-italic relative text-[15px] text-[rgba(45,54,72,0.52)] w-[49px]">+260</p>
      </div>
      {error && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

function EmailInput({ value, onChange, error }: { value: string; onChange: (value: string) => void; error?: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[12px] text-black tracking-[-0.12px] w-full">Enter your email (optional)</p>
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
        <div className="[grid-area:1_/_1] h-[56px] ml-0 mt-0 relative rounded-[10px] w-[296px]">
          <div aria-hidden="true" className={`absolute border ${error ? 'border-red-500' : 'border-[#d4d6da]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
        </div>
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="your.email@example.com"
          className="[grid-area:1_/_1] font-['Inter:Regular',sans-serif] font-normal leading-[1.4] ml-[12px] mt-[17px] not-italic relative text-[14px] w-[272px] bg-transparent outline-none"
        />
      </div>
      {error && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[11px] text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

export default function ReceiptsPage({ onBack, onNext }: ReceiptsPageProps) {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappError, setWhatsappError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateWhatsAppNumber = (number: string): boolean => {
    if (number.trim() === "") {
      return false; // WhatsApp number is required
    }
    // Remove any non-digit characters for validation
    const digitsOnly = number.replace(/\D/g, "");
    // Validate that it has 9-10 digits (typical for Zambian numbers after +260)
    return digitsOnly.length >= 9 && digitsOnly.length <= 10;
  };

  const validateEmail = (email: string): boolean => {
    if (email.trim() === "") {
      return true; // Email is optional, so empty is valid
    }
    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleWhatsAppChange = (value: string) => {
    // Only allow digits, spaces, and hyphens
    const sanitized = value.replace(/[^\d\s-]/g, "");
    setWhatsappNumber(sanitized);
    // Clear error when user starts typing
    if (whatsappError) {
      setWhatsappError("");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleNext = () => {
    let hasError = false;

    // Validate WhatsApp number
    if (!validateWhatsAppNumber(whatsappNumber)) {
      setWhatsappError("Please enter a valid WhatsApp number (9-10 digits)");
      hasError = true;
    }

    // Validate email if provided
    if (email.trim() !== "" && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onNext();
  };

  return (
    <div className="bg-white h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen mx-auto shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Receipts Page">
        <Header onBack={onBack} />
        <p className="absolute font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] left-[44px] not-italic text-[18px] text-black top-[134px] tracking-[-0.18px] w-[311px]">Checkout</p>
        <div className="absolute bg-white box-border content-stretch flex flex-col gap-[16px] h-[419px] items-start left-[23px] pb-[30px] pt-[20px] px-[25px] rounded-[18px] top-[176px] w-[346px]">
          <div className="h-[19.8px] relative shrink-0 w-[18px]" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.pabc1740} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
          <ReceiptsHeader />
          <WhatsAppInput value={whatsappNumber} onChange={handleWhatsAppChange} error={whatsappError} />
          <EmailInput value={email} onChange={handleEmailChange} error={emailError} />
          <button 
            onClick={handleNext}
            className="bg-[#003630] box-border content-stretch flex gap-[8px] h-[59px] items-center justify-center overflow-clip px-[24px] py-[10px] relative rounded-[12px] shrink-0 w-[296px] touch-manipulation active:scale-[0.98] transition-transform" 
            data-name="Button"
          >
            <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[20px] text-nowrap text-white tracking-[-0.2px] whitespace-pre">Next</p>
          </button>
        </div>
      </div>
    </div>
  );
}