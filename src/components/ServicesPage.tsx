import { motion } from "motion/react";
import svgPaths from "../imports/svg-o96q0cdj2h";
import headerSvgPaths from "../imports/svg-co0ktog99f";
import { useState } from "react";
import ViewPaymentPlansPage from "./ViewPaymentPlansPage";

interface ServicesPageProps {
  userName: string;
  onBack: () => void;
  onSelectService: (service: string) => void;
  onViewHistory: () => void;
  onPayFees?: () => void;
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

function Header({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative size-full">
      <div aria-hidden="true" className="absolute border-[#e6e6e6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="absolute left-[94px] top-[17px] flex items-center gap-[16px]">
        <Logo />
        <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[normal] not-italic text-[20px] text-black text-nowrap whitespace-pre">master-fees</p>
      </div>
    </div>
  );
}

function DecorativeShapes() {
  return (
    <>
      <motion.div 
        className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.6322111487388611)+(var(--transform-inner-height)*0.7254649996757507)))] items-center justify-center left-[31.14px] bottom-[80px] w-[calc(1px*((var(--transform-inner-height)*0.6882590651512146)+(var(--transform-inner-width)*0.7747961282730103)))]" 
        style={{ "--transform-inner-width": "122.546875", "--transform-inner-height": "60.953125" } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 0, -12, 0],
          rotate: [0, 0, -4, 0],
          scale: [1, 1, 1.04, 1],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          scale: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        }}
      >
        <div className="flex-none rotate-[39.213deg] skew-x-[355.733deg]">
          <div className="h-[60.96px] relative w-[122.559px]" data-name="path60">
            <div className="absolute inset-[-28.71%_-14.28%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158 96">
                <motion.path 
                  d={svgPaths.p23b65fc0} 
                  id="path60" 
                  stroke="var(--stroke-0, #E0F7D4)" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="35"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.6322111487388611)+(var(--transform-inner-height)*0.7254649996757507)))] items-center justify-center left-[51.54px] bottom-[180px] w-[calc(1px*((var(--transform-inner-height)*0.6882590651512146)+(var(--transform-inner-width)*0.7747961282730103)))]" 
        style={{ "--transform-inner-width": "158.96875", "--transform-inner-height": "97.015625" } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 0, -15, 0],
          rotate: [0, 0, 5, 0],
          scale: [1, 1, 1.05, 1],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.6 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
        }}
      >
        <div className="flex-none rotate-[39.213deg] skew-x-[355.733deg]">
          <div className="h-[97.03px] relative w-[158.975px]" data-name="path60 (Stroke)">
            <div className="absolute inset-[-1.55%_-0.94%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 162 101">
                <motion.path 
                  d={svgPaths.p1abe0160} 
                  id="path60 (Stroke)" 
                  stroke="var(--stroke-0, #003630)" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.6322111487388611)+(var(--transform-inner-height)*0.7254649996757507)))] items-center justify-center left-[245.89px] bottom-[60px] w-[calc(1px*((var(--transform-inner-height)*0.6882590651512146)+(var(--transform-inner-width)*0.7747961282730103)))]" 
        style={{ "--transform-inner-width": "122.546875", "--transform-inner-height": "60.953125" } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 0, -18, 0],
          rotate: [0, 0, 6, 0],
          scale: [1, 1, 1.06, 1],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 1 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
          rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
          scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
        }}
      >
        <div className="flex-none rotate-[39.213deg] skew-x-[355.733deg]">
          <div className="h-[60.96px] relative w-[122.559px]" data-name="path60">
            <div className="absolute inset-[-28.71%_-14.28%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158 96">
                <motion.path 
                  d={svgPaths.p23b65fc0} 
                  id="path60" 
                  stroke="var(--stroke-0, #E0F7D4)" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="35"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 1 }}
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function PageGroup1({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute contents left-0 top-0">
      <p className="absolute font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] h-[46.277px] leading-[1.5] left-[51.54px] not-italic text-[12px] text-black top-[219.31px] tracking-[-0.12px] w-[317.836px]">Which one of our services would you like us to help you with today?</p>
      <DecorativeShapes />
      <div className="absolute box-border h-[66px] left-1/2 top-0 translate-x-[-50%] w-[393px]">
        <Header onBack={onBack} />
      </div>
    </div>
  );
}

function PageGroup2({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute contents left-0 top-0">
      <PageGroup1 onBack={onBack} />
    </div>
  );
}

function Frame2({ onPayFees }: { onPayFees?: () => void }) {
  return (
    <div className="content-stretch flex gap-[15px] h-[44px] items-start relative shrink-0 w-full animate-fade-in" style={{ animationDelay: '100ms' }}>
      <button
        onClick={onPayFees}
        className="btn-dark box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[10px] relative shrink-0 w-[297px] touch-manipulation" 
        data-name="Button"
      >
        <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[15px] text-nowrap text-white tracking-[-0.15px] whitespace-pre">Pay for School Fees</p>
      </button>
    </div>
  );
}

function Frame3({ onViewHistory }: { onViewHistory: () => void }) {
  return (
    <div className="content-stretch flex gap-[15px] h-[43px] items-start relative shrink-0 w-full animate-fade-in" style={{ animationDelay: '200ms' }}>
      <button
        onClick={onViewHistory}
        className="btn-ghost basis-0 grow min-h-px min-w-px relative shrink-0 touch-manipulation" 
        data-name="Button"
      >
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative w-full">
            <p className="font-['Inter:Extra_Light',sans-serif] font-extralight leading-[24px] not-italic relative shrink-0 text-[#2d3648] text-[15px] text-nowrap tracking-[-0.15px] whitespace-pre">View my Payment History</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame4({ onSelectService }: { onSelectService: (service: string) => void }) {
  return (
    <div className="content-stretch flex gap-[15px] h-[44px] items-start relative shrink-0 w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
      <button
        onClick={() => onSelectService("payment-plans")}
        className="btn-ghost basis-0 grow min-h-px min-w-px relative shrink-0 touch-manipulation" 
        data-name="Button"
      >
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative w-full">
            <p className="font-['Inter:Extra_Light',sans-serif] font-extralight leading-[24px] not-italic relative shrink-0 text-[#2d3648] text-[15px] text-nowrap tracking-[-0.15px] whitespace-pre">View School Payment plans</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame6({ onSelectService, onViewHistory, onPayFees }: { onSelectService: (service: string) => void; onViewHistory: () => void; onPayFees?: () => void }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[171px] items-start left-[49px] top-[300px] w-[297px]">
      <Frame2 onPayFees={onPayFees} />
      <Frame3 onViewHistory={onViewHistory} />
      <Frame4 onSelectService={onSelectService} />
    </div>
  );
}

export default function ServicesPage({ userName, onBack, onSelectService, onViewHistory, onPayFees }: ServicesPageProps) {
  const [showPaymentPlans, setShowPaymentPlans] = useState(false);
  const currentHour = new Date().getHours();
  const greeting = currentHour >= 5 && currentHour < 12 ? "Good morning" : currentHour >= 12 && currentHour < 17 ? "Good Afternoon" : "Good Evening";

  const handleViewPaymentPlans = (service: string) => {
    if (service === "payment-plans") {
      setShowPaymentPlans(true);
    } else {
      onSelectService(service);
    }
  };

  const handleBackFromPaymentPlans = () => {
    setShowPaymentPlans(false);
  };

  // Show payment plans page if requested
  if (showPaymentPlans) {
    return (
      <ViewPaymentPlansPage 
        onBack={handleBackFromPaymentPlans}
        schoolName="International School" 
      />
    );
  }

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden flex items-center justify-center" data-name="Page 2">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen mx-auto">
        <PageGroup2 onBack={onBack} />
        <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[33px] leading-[0.5] left-[48px] not-italic text-[18px] text-black top-[164px] tracking-[-0.18px] w-[279px]">
          <p className="font-['IBM_Plex_Sans_Devanagari:Light',sans-serif] mb-[14px]">{greeting}, </p>
          <p className="font-['Agrandir:Grand_Heavy',sans-serif] text-[#003630]">{userName}</p>
        </div>
        <Frame6 onSelectService={handleViewPaymentPlans} onViewHistory={onViewHistory} onPayFees={onPayFees} />
      </div>
    </div>
  );
}