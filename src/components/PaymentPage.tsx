import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { initializeLencoPayment, isLencoReady } from "../utils/lencoPayment";
import { useAppStore } from "../stores/useAppStore";
import { toast } from "sonner@2.0.3";
import ExpandedMobileMoney from "../imports/Frame1707478923";
import ExpandedCardPayment from "../imports/Frame1707478923-18-800";
import imgVisa from "figma:asset/1f8bb25a1b5f5bd54da90c9c6ed22e37e8ea0e08.png";
import imgMastercardLogo from "figma:asset/b4ecaef28ab74a96d96cfaf9b70d374fa01fed41.png";

// SVG Path Data
const headerSvgPaths = {
  p24506700: "M6 5.98528H28.0294C30.2268 5.98528 32.0094 7.76793 32.0094 9.96528V27.0147C32.0094 29.212 30.2268 30.9947 28.0294 30.9947H6C3.80264 30.9947 2.02 29.212 2.02 27.0147V9.96528C2.02 7.76793 3.80264 5.98528 6 5.98528Z",
  p8fdf600: "M10 15L17 8L24 15"
};

const svgPaths = {
  pd1b480: "M1 4.75C1 2.67893 2.67893 1 4.75 1H12.25C14.3211 1 16 2.67893 16 4.75V17.25C16 19.3211 14.3211 21 12.25 21H4.75C2.67893 21 1 19.3211 1 17.25V4.75Z",
  p34703900: "M6.75 17.5H10.25",
  p4ee5080: "M21.0039 13.7539C20.0039 11.2539 17.5039 11.2539 16.5039 13.7539L14.5039 18.5039C13.5039 21.0039 14.7539 22.2539 17.2539 21.2539L20.2539 20.0039C20.7539 19.7539 21.2539 19.5039 21.7539 19.2539C22.2539 19.0039 22.7539 18.7539 23.2539 18.5039L25.2539 17.7539C27.7539 16.7539 27.7539 14.2539 25.2539 13.2539L21.0039 11.2539V13.7539Z",
  pec23280: "M6.00195 10.002C6.00195 9.44971 6.44967 9.00195 7.00195 9.00195H13.002C13.5542 9.00195 14.002 9.44971 14.002 10.002V16.002C14.002 16.5542 13.5542 17.002 13.002 17.002H7.00195C6.44967 17.002 6.00195 16.5542 6.00195 16.002V10.002Z M10.002 11.502L10.502 11.002L13.502 14.002L13.002 14.502L10.002 11.502Z M10.002 13.002C9.44967 13.002 9.00195 13.4497 9.00195 14.002C9.00195 14.5542 9.44967 15.002 10.002 15.002C10.5542 15.002 11.002 14.5542 11.002 14.002C11.002 13.4497 10.5542 13.002 10.002 13.002Z",
  p116ac00: "M7.16113 10.0039V16.0039H13.1611M7.16113 10.0039L10.1611 13.0039M7.16113 10.0039L10.1611 7.00391M21.1611 16.0039L18.1611 13.0039M21.1611 16.0039L18.1611 19.0039M21.1611 16.0039V10.0039H15.1611",
  p1c5ceb00: "M2.5 11.1625V15.7625C2.5 21.7625 5 23.5125 10 23.5125H16.25C21.25 23.5125 23.75 21.7625 23.75 15.7625V11.1625",
  p14a0380: "M6.25 2.5125H20C25 2.5125 26.25 3.7625 26.25 8.7625V10.5125C26.25 15.5125 25 16.7625 20 16.7625H6.25C1.25 16.7625 0 15.5125 0 10.5125V8.7625C0 3.7625 1.25 2.5125 6.25 2.5125Z",
  pa48d6b0: "M11 6V7C11 8.10457 10.1046 9 9 9H7C5.89543 9 5 8.10457 5 7V6M3 6H13M12 6V12C12 13.1046 11.1046 14 10 14H6C4.89543 14 4 13.1046 4 12V6",
  p1c1f0680: "M12.5 12.5L51.5 51.5",
  p32888500: "M12.5 12.5L51.5 51.5"
};

interface PaymentPageProps {
  onBack: () => void;
  onPay: (reference: string) => void;
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
  const [isLencoLoaded, setIsLencoLoaded] = useState(false);
  
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
  
  // Store state
  const { userName, userPhone, selectedSchool, checkoutServices } = useAppStore();

  // Check if Lenco is loaded with retry mechanism
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50; // Try for 5 seconds (50 * 100ms)
    
    const checkLenco = setInterval(() => {
      attempts++;
      
      if (isLencoReady()) {
        console.log('✅ Lenco payment widget loaded successfully');
        setIsLencoLoaded(true);
        clearInterval(checkLenco);
      } else if (attempts >= maxAttempts) {
        console.error('❌ Lenco widget failed to load after 5 seconds');
        console.log('🔍 Troubleshooting:');
        console.log('   1. Check if https://pay.sandbox.lenco.co/js/v1/inline.js is accessible');
        console.log('   2. Check browser console for script loading errors');
        console.log('   3. Check if ad blockers are blocking the script');
        console.log('   4. Try disabling browser extensions');
        clearInterval(checkLenco);
      }
    }, 100);
    
    return () => clearInterval(checkLenco);
  }, []);

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
    // At least one payment method must be expanded and valid
    const hasMobileMoneyExpanded = isMobileMoneyExpanded && isMobileMoneyValid();
    const hasCardExpanded = isCardPaymentExpanded && isCardValid();
    
    return hasMobileMoneyExpanded || hasCardExpanded;
  };
  
  const handlePay = () => {
    // Validate all inputs
    if (isCardPaymentExpanded) {
      setTouched({ cardNumber: true, expiryDate: true, cvv: true });
      const cardErr = validateCardNumber(cardNumber);
      const expiryErr = validateExpiryDate(expiryDate);
      const cvvErr = validateCVV(cvv);
      
      setCardNumberError(cardErr);
      setExpiryDateError(expiryErr);
      setCvvError(cvvErr);
      
      if (cardErr || expiryErr || cvvErr) {
        toast.error('Please fix the errors in your card details');
        return;
      }
    }
    
    if (!canPay()) {
      toast.error('Please select a payment method and fill in all required fields');
      return;
    }

    // Check if Lenco is ready
    if (!isLencoReady()) {
      console.warn('⚠️ Lenco widget not loaded - check if script is blocked or loading');
      toast.error('Payment system is loading. Please try again in a moment.');
      return;
    }

    // Get Lenco public key from environment
    const lencoPublicKey = import.meta.env.VITE_LENCO_PUBLIC_KEY;
    
    if (!lencoPublicKey || lencoPublicKey === 'pk_sandbox_your_public_key_here') {
      console.error('❌ LENCO_PUBLIC_KEY not configured in .env file');
      console.log('📝 Please add your Lenco public key to the .env file:');
      console.log('   VITE_LENCO_PUBLIC_KEY=pk_sandbox_your_actual_key');
      toast.error('Payment system not configured. Please add your Lenco API key to .env file.');
      return;
    }

    console.log('🔑 Using Lenco public key:', lencoPublicKey.substring(0, 20) + '...');

    // Generate user email from phone if not available
    const userEmail = `${userPhone}@masterfees.app`;

    // Prepare services for payment data
    const services = checkoutServices.map(service => ({
      name: service.description,
      amount: service.amount,
    }));

    console.log('💳 Initializing Lenco payment with:');
    console.log('   Amount: K' + (totalAmount + (totalAmount * 0.02)).toFixed(2));
    console.log('   Customer:', userName || 'Guest User');
    console.log('   Phone:', userPhone || mobileNumber);
    console.log('   Email:', userEmail);
    console.log('   School:', selectedSchool || 'School');
    console.log('   Services:', services.length);

    // Initialize Lenco payment
    try {
      initializeLencoPayment(
        {
          userName: userName || 'Guest User',
          userPhone: userPhone || mobileNumber,
          userEmail: userEmail,
          amount: totalAmount + (totalAmount * 0.02), // Including service fee
          schoolName: selectedSchool || 'School',
          services: services,
        },
        lencoPublicKey,
        (reference) => {
          // Payment successful callback
          console.log('✅ Payment successful with reference:', reference);
          toast.success('Payment initiated successfully!');
          onPay(reference);
        },
        () => {
          // Payment closed callback
          console.log('❌ Payment window closed by user');
          toast.info('Payment cancelled');
        },
        () => {
          // Payment confirmation pending callback
          console.log('⏳ Payment confirmation pending');
          toast.info('Your payment is being confirmed. Please wait...');
          // Still proceed to processing page
          onPay('PENDING');
        }
      );
      
      console.log('🚀 Lenco payment widget opened');
    } catch (error) {
      console.error('💥 Error initializing payment:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to initialize payment');
    }
  };

  return (
    <div className="bg-white h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen mx-auto shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden" data-name="Payment Page">
        <Header onBack={onBack} />
        
        {/* Lenco Loading Indicator */}
        {!isLencoLoaded && (
          <div className="hidden absolute top-[66px] left-0 right-0 bg-yellow-50 border-b border-yellow-200 px-4 py-2 z-50">
            <div className="flex items-center gap-2 text-yellow-800 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-600 border-t-transparent"></div>
              <span>Loading payment system...</span>
            </div>
          </div>
        )}
        
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