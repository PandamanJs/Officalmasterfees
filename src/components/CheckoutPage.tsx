import { useState } from "react";
import svgPaths from "../imports/svg-4boykq1z8d";
import checkoutSvgPaths from "../imports/svg-qndngnuysv";
import CheckoutPage2 from "./CheckoutPage2";
import ReceiptsPage from "./ReceiptsPage";

interface Service {
  id: string;
  description: string;
  amount: number;
  invoiceNo: string;
  studentName: string;
}

interface CheckoutPageProps {
  services: Service[];
  onBack: () => void;
  onProceed: (amount: number) => void;
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
                <path d={svgPaths.p24506700} fill="var(--fill-0, #003630)" />
                <path d={svgPaths.p24506700} stroke="var(--stroke-0, white)" strokeWidth="3" />
              </g>
              <g id="path60">
                <path d={svgPaths.p8fdf600} fill="var(--fill-0, #003630)" />
                <path d={svgPaths.p8fdf600} stroke="var(--stroke-0, #95E36C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
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

function Frame1() {
  return (
    <div className="h-[30px] relative rounded-[8px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[30px] items-start pl-0 pr-[10px] py-0 relative w-full">
          <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#acafac] text-[8px] tracking-[-0.08px] w-full">You can pay the complete balance at one go or you can choose to pay in part for each of the balances</p>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] h-[20px] leading-[24px] not-italic relative shrink-0 text-[16px] text-black tracking-[-0.16px] w-full">Payment</p>
      <Frame1 />
    </div>
  );
}

function IconRightWrapper() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon Right Wrapper">
      <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Icon Right">
        <div className="absolute inset-[16.667%]" data-name="Shape">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={checkoutSvgPaths.p17e0ef80} fill="var(--fill-0, white)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button({ onProceed }: { onProceed: () => void }) {
  return (
    <button 
      onClick={onProceed}
      className="basis-0 bg-[#003630] grow h-full min-h-px min-w-px relative rounded-[10px] shrink-0 touch-manipulation active:scale-[0.98] transition-transform" 
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[10px] relative size-full">
          <IconRightWrapper />
        </div>
      </div>
    </button>
  );
}

function Frame({ paymentAmount, onAmountChange }: { paymentAmount: string; onAmountChange: (value: string) => void }) {
  return (
    <div className="bg-[#f5f4f7] box-border content-stretch flex h-[56px] items-center justify-between leading-[1.4] not-italic px-[12px] py-[14px] relative rounded-[10px] shrink-0 w-[226px]">
      <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] relative shrink-0 text-[12px] text-[rgba(45,54,72,0.52)] w-[48.835px]">ZMW</p>
      <input
        type="text"
        value={paymentAmount}
        onChange={(e) => onAmountChange(e.target.value)}
        className="bg-transparent font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] relative shrink-0 text-[20px] text-black text-right w-[87px] outline-none"
      />
    </div>
  );
}

function Frame4({ paymentAmount, onAmountChange, onProceed }: { paymentAmount: string; onAmountChange: (value: string) => void; onProceed: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame paymentAmount={paymentAmount} onAmountChange={onAmountChange} />
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Button onProceed={onProceed} />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[15px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Frame 58">
          <rect fill="var(--fill-0, #95E36C)" height="15" rx="7.5" width="15" />
          <path d={checkoutSvgPaths.p5c65b80} id="Vector" stroke="var(--stroke-0, #003630)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ServiceItem({ studentName, description, amount }: { studentName: string; description: string; amount: number }) {
  return (
    <div className="box-border content-stretch flex items-center justify-between pl-[5px] pr-0 py-0 relative shrink-0 w-full">
      <Frame8 />
      <p className="font-['IBM_Plex_Sans_Devanagari:Light',sans-serif] h-[23px] leading-[24px] not-italic relative shrink-0 text-[12px] text-black tracking-[-0.12px] flex-1 px-2">
        {studentName}'s {description}
      </p>
      <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[12px] text-black text-right tracking-[-0.12px]">
        K{amount.toLocaleString()}
      </p>
    </div>
  );
}

function Frame7({ total }: { total: number }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex items-start justify-between leading-[24px] not-italic pl-[41px] pr-0 py-0 relative text-[12px] text-black tracking-[-0.12px] w-full">
          <p className="font-['IBM_Plex_Sans_Devanagari:Light',sans-serif] h-[23px] relative shrink-0 w-[86px]">Total</p>
          <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-nowrap text-right whitespace-pre">K{total.toLocaleString()} </p>
        </div>
      </div>
    </div>
  );
}

function Frame12({ services }: { services: Service[] }) {
  const total = services.reduce((sum, service) => sum + service.amount, 0);
  
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full overflow-y-auto max-h-[180px] scrollbar-thin animate-fade-in pr-[4px]" 
      style={{ 
        animationDelay: '100ms',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(149, 227, 108, 0.3) transparent'
      }}>
      {/* Scroll fade indicator - top */}
      <div className="sticky top-0 left-0 right-0 h-[12px] pointer-events-none z-10 bg-gradient-to-b from-white to-transparent"></div>
      
      {services.map((service, index) => (
        <div
          key={service.id}
          className="animate-fade-in w-full"
          style={{ animationDelay: `${150 + index * 50}ms` }}
        >
          <ServiceItem 
            studentName={service.studentName}
            description={service.description}
            amount={service.amount}
          />
        </div>
      ))}
      
      <div className="animate-fade-in w-full" style={{ animationDelay: `${150 + services.length * 50}ms` }}>
        <Frame7 total={total} />
      </div>
      
      {/* Scroll fade indicator - bottom */}
      <div className="sticky bottom-0 left-0 right-0 h-[12px] pointer-events-none z-10 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}

function Frame3({ onPayInPart }: { onPayInPart: () => void }) {
  return (
    <div className="content-stretch flex gap-[15px] items-start w-full shrink-0">
      <button 
        onClick={onPayInPart}
        className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shrink-0 touch-manipulation active:opacity-80 transition-opacity" 
        data-name="Button"
      >
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative w-full">
            <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#003630] text-[16px] text-nowrap tracking-[-0.16px] whitespace-pre">Pay in part</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#003630] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </button>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center w-full shrink-0">
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99 1">
            <line id="Line 19" stroke="var(--stroke-0, black)" x2="98.6667" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-black text-center tracking-[-0.16px]">or</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99 1">
            <line id="Line 18" stroke="var(--stroke-0, black)" x2="98.6667" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame2({ services, paymentAmount, onAmountChange, onProceed, onPayInPart }: { services: Service[]; paymentAmount: string; onAmountChange: (value: string) => void; onProceed: () => void; onPayInPart: () => void }) {
  return (
    <div className="absolute glass box-border content-stretch flex flex-col gap-[16px] h-[444px] items-start left-[calc(50%+0.5px)] pb-[30px] pt-[20px] px-[25px] rounded-[20px] top-[157px] translate-x-[-50%] w-[346px]"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.6) inset'
      }}
    >
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Interface / Shopping_Bag_01">
        <div className="absolute inset-[16.67%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-6.25%_-5.56%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
              <path d={checkoutSvgPaths.p34bf2e00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame11 />
      <Frame4 paymentAmount={paymentAmount} onAmountChange={onAmountChange} onProceed={onProceed} />
      <Frame12 services={services} />
      <Frame5 />
      <Frame3 onPayInPart={onPayInPart} />
    </div>
  );
}

export default function CheckoutPage({ services, onBack, onProceed }: CheckoutPageProps) {
  const total = services.reduce((sum, service) => sum + service.amount, 0);
  const [paymentAmount, setPaymentAmount] = useState(total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  const [showPayInPart, setShowPayInPart] = useState(false);
  const [showReceipts, setShowReceipts] = useState(false);

  if (showReceipts) {
    // Parse the payment amount entered by user
    const parsedAmount = parseFloat(paymentAmount.replace(/,/g, ''));
    const finalAmount = !isNaN(parsedAmount) ? parsedAmount : total;
    
    return (
      <ReceiptsPage 
        onBack={() => setShowReceipts(false)}
        onNext={() => onProceed(finalAmount)}
        totalAmount={finalAmount}
      />
    );
  }

  if (showPayInPart) {
    return (
      <CheckoutPage2 
        services={services}
        onBack={() => setShowPayInPart(false)}
        onProceed={onProceed}
      />
    );
  }

  return (
    <div className="bg-white h-screen w-full overflow-hidden flex justify-center">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Checkout page 1">
        <Header onBack={onBack} />
        <p className="absolute font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] left-[44px] not-italic text-[18px] text-black top-[118px] tracking-[-0.18px] w-[311px]">Checkout</p>
        <Frame2 services={services} paymentAmount={paymentAmount} onAmountChange={setPaymentAmount} onProceed={() => setShowReceipts(true)} onPayInPart={() => setShowPayInPart(true)} />
      </div>
    </div>
  );
}