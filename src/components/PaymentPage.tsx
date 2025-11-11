import { motion } from "motion/react";
import { useState } from "react";
import svgPaths from "../imports/svg-ft8f5pz3nc";
import headerSvgPaths from "../imports/svg-4boykq1z8d";
import imgVisa from "figma:asset/a5c75a14f01268c2534d0dfb0a9182a2bf3629d2.png";
import imgMastercardLogo from "figma:asset/5f1f04717ce88a1f8a9d6faeee898c4b88ef23f0.png";
import ExpandedMobileMoney from "../imports/Frame1707478923";
import ExpandedCardPayment from "../imports/Frame1707478923-18-800";

interface PaymentPageProps {
  onBack: () => void;
  onPay: () => void;
  totalAmount: number;
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-[66px] w-full relative bg-white">
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

function Mobile() {
  return (
    <div className="absolute h-[20px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[16px]" data-name="mobile">
      <div className="absolute inset-[-3.75%_-4.69%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
          <g id="mobile">
            <path d={svgPaths.pd1b480} id="Vector" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M10.75 4.25H6.75" id="Vector_2" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p34703900} id="Vector_3" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function VuesaxLinearMobile() {
  return (
    <div className="absolute contents left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="vuesax/linear/mobile">
      <Mobile />
    </div>
  );
}

function Frame() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[22px] items-center justify-center px-[10px] py-0 relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
        <p className="leading-[24px] whitespace-pre">Mobile Money</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[8px] text-black tracking-[-0.08px]">
            <p className="leading-[12px]">Pay securely using Airtel Money, MTN, or Zamtel mobile money services.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[30px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Frame 1707478908">
          <rect fill="var(--fill-0, white)" height="29" rx="7.5" width="29" x="0.5" y="0.5" />
          <rect height="29" rx="7.5" stroke="var(--stroke-0, #D9D9D9)" width="29" x="0.5" y="0.5" />
          <path d={svgPaths.p4ee5080} fill="var(--fill-0, #FF0000)" id="path2" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-[30px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Frame 1707478910">
          <rect fill="var(--fill-0, white)" height="29" rx="7.5" width="29" x="0.5" y="0.5" />
          <rect height="29" rx="7.5" stroke="var(--stroke-0, #D9D9D9)" width="29" x="0.5" y="0.5" />
          <path d={svgPaths.pec23280} fill="var(--fill-0, #02A024)" id="path3" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[30px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Frame 1707478909">
          <rect fill="var(--fill-0, white)" height="29" rx="7.5" width="29" x="0.5" y="0.5" />
          <rect height="29" rx="7.5" stroke="var(--stroke-0, #D9D9D9)" width="29" x="0.5" y="0.5" />
          <path d={svgPaths.p116ac00} fill="var(--fill-0, black)" id="path1" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center p-[10px] relative w-full">
          <Frame2 />
          <Frame4 />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <Frame />
      <Frame8 />
      <Frame5 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 size-[41px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Frame 1707478917">
          <circle cx="20.5" cy="20.5" id="Ellipse 4" r="10" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Frame10({ onClick }: { onClick: () => void }) {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full cursor-pointer" onClick={onClick}>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[6px] items-start px-[12px] py-[16px] relative w-full">
          <div className="relative shrink-0 size-[30px]" data-name="mobile">
            <VuesaxLinearMobile />
          </div>
          <Frame9 />
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function VuesaxLinearCards() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
      <g id="vuesax/linear/cards">
        <path d="M2.5 15.7625H23.75" id="Vector" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d={svgPaths.p1c5ceb00} id="Vector_2" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p14a0380} id="Vector_3" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M6.5625 22.2625H8.71246" id="Vector_4" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <path d="M11.3875 22.2625H15.6875" id="Vector_5" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
        <g id="Vector_6" opacity="0"></g>
      </g>
    </svg>
  );
}

function Frame1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[22px] items-center justify-center px-[10px] py-0 relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.16px]">
        <p className="leading-[24px] whitespace-pre">Online Card Payment</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[8px] text-black tracking-[-0.08px]">
            <p className="leading-[12px]">Pay with your Visa or Mastercard credit or debit card.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0 size-[30px]">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="relative shrink-0 size-[20px]" data-name="Visa">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgVisa} />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[6px] relative rounded-[8px] shrink-0 size-[30px]">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="relative shrink-0 size-[18px]" data-name="Mastercard Logo">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgMastercardLogo} />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center p-[10px] relative w-full">
          <Frame6 />
          <Frame12 />
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0">
      <Frame1 />
      <Frame7 />
      <Frame13 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 size-[41px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
        <g id="Frame 1707478917">
          <circle cx="20.5" cy="20.5" id="Ellipse 4" r="10" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Frame16({ onClick }: { onClick: () => void }) {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full cursor-pointer" onClick={onClick}>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[6px] items-start px-[12px] py-[16px] relative w-full">
          <div className="relative shrink-0 size-[30px]" data-name="cards">
            <VuesaxLinearCards />
          </div>
          <Frame14 />
          <Frame15 />
        </div>
      </div>
    </div>
  );
}

function Frame19({ 
  isMobileMoneyExpanded, 
  onMobileMoneyClick, 
  isCardPaymentExpanded, 
  onCardPaymentClick,
  mobileNumber,
  onMobileNumberChange,
  cardNumber,
  expiryDate,
  cvv,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange,
  cardNumberError,
  expiryDateError,
  cvvError
}: { 
  isMobileMoneyExpanded: boolean; 
  onMobileMoneyClick: () => void; 
  isCardPaymentExpanded: boolean; 
  onCardPaymentClick: () => void;
  mobileNumber: string;
  onMobileNumberChange: (value: string) => void;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  onCardNumberChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  cardNumberError?: string;
  expiryDateError?: string;
  cvvError?: string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
      {isMobileMoneyExpanded ? (
        <div className="shrink-0 w-full">
          <ExpandedMobileMoney 
            mobileNumber={mobileNumber}
            onMobileNumberChange={onMobileNumberChange}
            onCollapse={onMobileMoneyClick}
          />
        </div>
      ) : (
        <Frame10 onClick={onMobileMoneyClick} />
      )}
      {isCardPaymentExpanded ? (
        <div className="shrink-0 w-full">
          <ExpandedCardPayment 
            cardNumber={cardNumber}
            expiryDate={expiryDate}
            cvv={cvv}
            onCardNumberChange={onCardNumberChange}
            onExpiryDateChange={onExpiryDateChange}
            onCvvChange={onCvvChange}
            onCollapse={onCardPaymentClick}
            cardNumberError={cardNumberError}
            expiryDateError={expiryDateError}
            cvvError={cvvError}
          />
        </div>
      ) : (
        <Frame16 onClick={onCardPaymentClick} />
      )}
    </div>
  );
}

function Frame18({ isMobileMoneyExpanded, isCardPaymentExpanded }: { isMobileMoneyExpanded: boolean; isCardPaymentExpanded: boolean }) {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Interface / Lock">
        <div className="absolute inset-[12.5%_16.67%]" data-name="Vector">
          <div className="absolute inset-[-6.67%_-7.5%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 17">
              <path d={svgPaths.pa48d6b0} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.64" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.64)] text-nowrap tracking-[-0.12px] whitespace-pre">Secured payments</p>
    </div>
  );
}

function Frame17({ totalAmount }: { totalAmount: number }) {
  const serviceFee = totalAmount * 0.02;
  const totalWithFee = totalAmount + serviceFee;
  
  return (
    <div className="content-stretch flex flex-col items-start not-italic w-full relative">
      <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] leading-[normal] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">Total payment</p>
      <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[normal] relative shrink-0 text-[32px] text-black">ZMW {totalWithFee.toFixed(2)}</p>
      <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] justify-center leading-[0] relative shrink-0 text-[#003630] text-[12px] tracking-[-0.12px]">
        <p className="leading-[24px] mt-4">{`+ ZMW ${serviceFee.toFixed(2)} service fee`}</p>
      </div>
      
      {/* Decorative animated paths */}
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9998781681060791)+(var(--transform-inner-height)*0.015611708164215088)))] items-center justify-center right-[20px] top-[20px] w-[calc(1px*((var(--transform-inner-height)*0.9998781681060791)+(var(--transform-inner-width)*0.015611708164215088)))]" style={{ "--transform-inner-width": "77.734375", "--transform-inner-height": "39.03125" } as React.CSSProperties}>
        <div className="flex-none rotate-[270.895deg]">
          <div className="h-[39.042px] relative w-[77.746px]" data-name="path60">
            <motion.div 
              className="absolute inset-[-32.02%_-16.08%]"
              animate={{
                x: [100, -100],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.1, 0.9, 1],
              }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103 65">
                <path d={svgPaths.p1c1f0680} id="path60" stroke="var(--stroke-0, #E0F7D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="25" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9937769770622253)+(var(--transform-inner-height)*0.11138830333948135)))] items-center justify-center right-[0px] top-0 w-[calc(1px*((var(--transform-inner-height)*0.9937769770622253)+(var(--transform-inner-width)*0.11138830333948135)))]" style={{ "--transform-inner-width": "102.734375", "--transform-inner-height": "64.03125" } as React.CSSProperties}>
        <div className="flex-none rotate-[263.605deg]">
          <div className="h-[64.042px] relative w-[102.745px]" data-name="path60 (Stroke)">
            <div 
              className="absolute inset-[-0.78%_-0.49%]"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 66">
                <path d={svgPaths.p32888500} id="path60 (Stroke)" stroke="var(--stroke-0, #003630)" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9519173502922058)+(var(--transform-inner-height)*0.3063550889492035)))] items-center justify-center right-[40px] top-0 w-[calc(1px*((var(--transform-inner-height)*0.9519173502922058)+(var(--transform-inner-width)*0.3063550889492035)))]" style={{ "--transform-inner-width": "77.734375", "--transform-inner-height": "39.03125" } as React.CSSProperties}>
        <div className="flex-none rotate-[252.16deg]">
          <div className="h-[39.042px] relative w-[77.746px]" data-name="path60">
            <motion.div 
              className="absolute inset-[-32.02%_-16.08%]"
              animate={{
                x: [100, -100],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.1, 0.9, 1],
                delay: 1,
              }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103 65">
                <path d={svgPaths.p1c1f0680} id="path60" stroke="var(--stroke-0, #E0F7D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="25" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group({ totalAmount }: { totalAmount: number }) {
  return (
    <div className="relative w-full">
      <Frame17 totalAmount={totalAmount} />
      <div className="h-0 w-full mt-[24px]">
        <div className="relative">
          <svg className="block w-full h-px" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1">
            <line id="Line 50" stroke="var(--stroke-0, #A7AAA7)" strokeDasharray="5 5" x2="392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[normal] not-italic text-[14px] text-black text-nowrap mt-[22px] whitespace-pre">Select your payment method</p>
    </div>
  );
}

function Group1({ 
  onPay, 
  totalAmount, 
  isMobileMoneyExpanded, 
  onMobileMoneyClick, 
  isCardPaymentExpanded, 
  onCardPaymentClick,
  mobileNumber,
  onMobileNumberChange,
  cardNumber,
  expiryDate,
  cvv,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange,
  cardNumberError,
  expiryDateError,
  cvvError,
  isPayDisabled
}: { 
  onPay: () => void; 
  totalAmount: number; 
  isMobileMoneyExpanded: boolean; 
  onMobileMoneyClick: () => void; 
  isCardPaymentExpanded: boolean; 
  onCardPaymentClick: () => void;
  mobileNumber: string;
  onMobileNumberChange: (value: string) => void;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  onCardNumberChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  cardNumberError?: string;
  expiryDateError?: string;
  cvvError?: string;
  isPayDisabled?: boolean;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Total Amount Section - Fixed at top */}
      <div className="flex-shrink-0 px-[24px] pt-[23px] pb-[20px]">
        <Group totalAmount={totalAmount} />
      </div>

      {/* Payment Options - Scrollable area */}
      <div className="flex-1 overflow-y-auto px-[24px] pb-[20px]" style={{ WebkitOverflowScrolling: 'touch' }}>
        <Frame19 
          isMobileMoneyExpanded={isMobileMoneyExpanded} 
          onMobileMoneyClick={onMobileMoneyClick} 
          isCardPaymentExpanded={isCardPaymentExpanded} 
          onCardPaymentClick={onCardPaymentClick}
          mobileNumber={mobileNumber}
          onMobileNumberChange={onMobileNumberChange}
          cardNumber={cardNumber}
          expiryDate={expiryDate}
          cvv={cvv}
          onCardNumberChange={onCardNumberChange}
          onExpiryDateChange={onExpiryDateChange}
          onCvvChange={onCvvChange}
          cardNumberError={cardNumberError}
          expiryDateError={expiryDateError}
          cvvError={cvvError}
        />
      </div>

      {/* Pay Button and Security Info - Fixed at bottom */}
      <div className="flex-shrink-0 px-[24px] pb-[20px] pt-[16px] bg-white" style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}>
        <div className="flex flex-col items-center gap-[20px]">
          <button 
            onClick={onPay}
            disabled={isPayDisabled}
            className={`box-border content-stretch flex gap-[8px] h-[59px] items-center justify-center overflow-clip px-[24px] py-[10px] rounded-[12px] w-full max-w-[296px] touch-manipulation transition-all shadow-[0px_2px_8px_rgba(0,54,48,0.3)] ${
              isPayDisabled 
                ? 'bg-gray-400 cursor-not-allowed opacity-60' 
                : 'bg-[#003630] active:scale-[0.98]'
            }`}
            data-name="Button"
          >
            <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.16px] whitespace-pre">Pay</p>
          </button>
          <Frame18 isMobileMoneyExpanded={isMobileMoneyExpanded} isCardPaymentExpanded={isCardPaymentExpanded} />
        </div>
      </div>
    </div>
  );
}

// Card validation utilities
const validateCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return '';
  if (cardNumber.length < 13) return 'Card number must be at least 13 digits';
  if (cardNumber.length > 19) return 'Card number is too long';
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) return 'Invalid card number';
  return '';
};

const validateExpiryDate = (expiryDate: string): string => {
  if (!expiryDate) return '';
  if (expiryDate.length < 6) return 'Enter MM/YYYY';
  
  const month = parseInt(expiryDate.slice(0, 2));
  const year = parseInt(expiryDate.slice(2, 6));
  
  if (month < 1 || month > 12) return 'Invalid month';
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'Card has expired';
  }
  
  return '';
};

const validateCVV = (cvv: string): string => {
  if (!cvv) return '';
  if (cvv.length < 3) return 'CVV must be 3-4 digits';
  return '';
};

export default function PaymentPage({ onBack, onPay, totalAmount }: PaymentPageProps) {
  const [isMobileMoneyExpanded, setIsMobileMoneyExpanded] = useState(false);
  const [isCardPaymentExpanded, setIsCardPaymentExpanded] = useState(false);
  
  // Mobile Money state
  const [mobileNumber, setMobileNumber] = useState('');
  
  // Card Payment state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Validation state
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [touched, setTouched] = useState({ cardNumber: false, expiryDate: false, cvv: false });

  const handleMobileMoneyClick = () => {
    setIsMobileMoneyExpanded(!isMobileMoneyExpanded);
  };

  const handleCardPaymentClick = () => {
    setIsCardPaymentExpanded(!isCardPaymentExpanded);
  };
  
  const handleCardNumberChange = (value: string) => {
    setCardNumber(value);
    if (touched.cardNumber) {
      setCardNumberError(validateCardNumber(value));
    }
  };
  
  const handleExpiryDateChange = (value: string) => {
    setExpiryDate(value);
    if (touched.expiryDate) {
      setExpiryDateError(validateExpiryDate(value));
    }
  };
  
  const handleCvvChange = (value: string) => {
    setCvv(value);
    if (touched.cvv) {
      setCvvError(validateCVV(value));
    }
  };
  
  const handleCardNumberBlur = () => {
    setTouched(prev => ({ ...prev, cardNumber: true }));
    setCardNumberError(validateCardNumber(cardNumber));
  };
  
  const handleExpiryDateBlur = () => {
    setTouched(prev => ({ ...prev, expiryDate: true }));
    setExpiryDateError(validateExpiryDate(expiryDate));
  };
  
  const handleCvvBlur = () => {
    setTouched(prev => ({ ...prev, cvv: true }));
    setCvvError(validateCVV(cvv));
  };
  
  const isCardValid = () => {
    if (!isCardPaymentExpanded) return true;
    if (!cardNumber || !expiryDate || !cvv) return false;
    return !validateCardNumber(cardNumber) && !validateExpiryDate(expiryDate) && !validateCVV(cvv);
  };
  
  const isMobileMoneyValid = () => {
    if (!isMobileMoneyExpanded) return true;
    return mobileNumber.length >= 10;
  };
  
  const canPay = () => {
    return isCardValid() && isMobileMoneyValid();
  };
  
  const handlePay = () => {
    if (isCardPaymentExpanded) {
      setTouched({ cardNumber: true, expiryDate: true, cvv: true });
      const cardErr = validateCardNumber(cardNumber);
      const expiryErr = validateExpiryDate(expiryDate);
      const cvvErr = validateCVV(cvv);
      
      setCardNumberError(cardErr);
      setExpiryDateError(expiryErr);
      setCvvError(cvvErr);
      
      if (cardErr || expiryErr || cvvErr) return;
    }
    
    if (canPay()) {
      onPay();
    }
  };



  return (
    <div className="bg-white h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen mx-auto shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden" data-name="Payment Page">
        <Header onBack={onBack} />
        
        <div className="relative bg-white flex-1 overflow-hidden">
          <div className="relative h-full">
            <Group1 
              onPay={handlePay} 
              totalAmount={totalAmount} 
              isMobileMoneyExpanded={isMobileMoneyExpanded} 
              onMobileMoneyClick={handleMobileMoneyClick} 
              isCardPaymentExpanded={isCardPaymentExpanded} 
              onCardPaymentClick={handleCardPaymentClick}
              mobileNumber={mobileNumber}
              onMobileNumberChange={setMobileNumber}
              cardNumber={cardNumber}
              expiryDate={expiryDate}
              cvv={cvv}
              onCardNumberChange={handleCardNumberChange}
              onExpiryDateChange={handleExpiryDateChange}
              onCvvChange={handleCvvChange}
              cardNumberError={cardNumberError}
              expiryDateError={expiryDateError}
              cvvError={cvvError}
              isPayDisabled={!canPay()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}