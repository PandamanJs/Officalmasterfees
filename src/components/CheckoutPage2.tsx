import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-f4rs0uzy0h";
import headerSvgPaths from "../imports/svg-4boykq1z8d";
import ReceiptsPage from "./ReceiptsPage";

interface Service {
  id: string;
  description: string;
  amount: number;
  invoiceNo: string;
  studentName: string;
}

interface CheckoutPage2Props {
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

function ServiceItem({ description, amount }: { description: string; amount: number }) {
  return (
    <div className="flex items-center justify-between w-full py-2">
      <div className="flex flex-col gap-1">
        <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[13px] text-black leading-tight">{description}</p>
        <p className="font-['IBM_Plex_Sans_Devanagari:Light',sans-serif] text-[10px] text-gray-500">Term 1 2025</p>
      </div>
      <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[13px] text-black">K{amount.toLocaleString()}</p>
    </div>
  );
}

function AmountInput({ serviceId, value, onChange }: { serviceId: string; value: number; onChange: (serviceId: string, value: number) => void }) {
  const [inputValue, setInputValue] = useState(value.toFixed(2));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Parse the value and update parent state
    const parsed = parseFloat(newValue.replace(/,/g, ''));
    if (!isNaN(parsed)) {
      onChange(serviceId, parsed);
    } else if (newValue === '' || newValue === '0') {
      onChange(serviceId, 0);
    }
  };

  return (
    <div className="relative w-full h-[48px] mt-2">
      <div className="box-border flex items-center gap-2 h-full px-3 rounded-lg border border-[#d4d6da]">
        <span className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[11px] text-[rgba(45,54,72,0.52)] shrink-0">ZMW</span>
        <input 
          type="text" 
          value={inputValue}
          onChange={handleChange}
          className="flex-1 min-w-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[15px] text-right text-[#8d919c] bg-transparent outline-none pr-1"
        />
      </div>
    </div>
  );
}

function StudentServiceGroup({ 
  studentName, 
  services, 
  inputAmounts, 
  onAmountChange 
}: { 
  studentName: string; 
  services: Service[]; 
  inputAmounts: Record<string, number>;
  onAmountChange: (serviceId: string, value: number) => void;
}) {
  return (
    <div className="w-full animate-fade-in" style={{ animationDelay: '100ms' }}>
      <div className="mb-3 flex items-center gap-2">
        <div className="h-[2px] w-[8px] bg-gradient-to-r from-[#95e36c] to-transparent rounded-full"></div>
        <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[10px] text-[#003630] tracking-wide uppercase">
          {studentName}
        </p>
      </div>
      <div className="glass-light rounded-[12px] p-3 flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-thin" 
        style={{
          background: 'linear-gradient(135deg, rgba(248, 249, 250, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          border: '1px solid rgba(149, 227, 108, 0.1)'
        }}>
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className="card card-interactive rounded-[10px] p-3 animate-fade-in group flex-shrink-0 w-[280px] snap-center"
            style={{ 
              animationDelay: `${150 + index * 50}ms`,
              background: 'white'
            }}
          >
            <ServiceItem 
              description={service.description}
              amount={service.amount}
            />
            <div className="mt-2 pt-2 border-t border-gradient">
              <AmountInput 
                serviceId={service.id}
                value={inputAmounts[service.id] || 0}
                onChange={onAmountChange}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Group({ total }: { total: number }) {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[12px] text-black">Total</p>
      <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[24px] text-black">{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    </div>
  );
}

function Frame20({ total }: { total: number }) {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] rounded-[18px] w-full max-w-[327px] mx-auto">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip pb-[20px] pt-[15px] px-[15px] relative rounded-[inherit]">
        <div className="h-[25px] overflow-clip relative shrink-0 w-[24px]" data-name="Interface / Shopping_Bag_01">
          <div className="absolute inset-[16.67%_12.5%]" data-name="Vector">
            <div className="absolute inset-[-6%_-5.56%]" style={{ "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
                <path d={svgPaths.p2be3f780} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[16px] text-black tracking-[-0.16px] w-[min-content]">Credit Payment</p>
        <Group total={total} />
        <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9998781681060791)+(var(--transform-inner-height)*0.015611708164215088)))] items-center justify-center left-[190px] top-[-16px] w-[calc(1px*((var(--transform-inner-height)*0.9998781681060791)+(var(--transform-inner-width)*0.015611708164215088)))]" style={{ "--transform-inner-width": "77.734375", "--transform-inner-height": "39.03125" } as React.CSSProperties}>
          <div className="flex-none rotate-[270.895deg]">
            <div className="h-[39.042px] relative w-[77.746px]" data-name="path60">
              <div className="absolute inset-[-32.02%_-16.08%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103 65">
                  <path d={svgPaths.p1c1f0680} id="path60" stroke="var(--stroke-0, #E0F7D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="25" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9937769770622253)+(var(--transform-inner-height)*0.11138830333948135)))] items-center justify-center left-[227.19px] top-[-34.81px] w-[calc(1px*((var(--transform-inner-height)*0.9937769770622253)+(var(--transform-inner-width)*0.11138830333948135)))]" style={{ "--transform-inner-width": "102.734375", "--transform-inner-height": "64.03125" } as React.CSSProperties}>
          <div className="flex-none rotate-[263.605deg]">
            <div className="h-[64.042px] relative w-[102.745px]" data-name="path60 (Stroke)">
              <div className="absolute inset-[-0.78%_-0.49%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 66">
                  <path d={svgPaths.p32888500} id="path60 (Stroke)" stroke="var(--stroke-0, #003630)" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9519173502922058)+(var(--transform-inner-height)*0.3063550889492035)))] items-center justify-center left-[290px] top-[-35px] w-[calc(1px*((var(--transform-inner-height)*0.9519173502922058)+(var(--transform-inner-width)*0.3063550889492035)))]" style={{ "--transform-inner-width": "77.734375", "--transform-inner-height": "39.03125" } as React.CSSProperties}>
          <div className="flex-none rotate-[252.16deg]">
            <div className="h-[39.042px] relative w-[77.746px]" data-name="path60">
              <div className="absolute inset-[-32.02%_-16.08%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103 65">
                  <path d={svgPaths.p1c1f0680} id="path60" stroke="var(--stroke-0, #003630)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="25" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none rounded-[18px]" />
    </div>
  );
}

function IconRightWrapper() {
  return (
    <div className="h-[24px] relative shrink-0 w-[16px]" data-name="Icon Right Wrapper">
      <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Icon Right" />
    </div>
  );
}

function Group1({ 
  services, 
  inputAmounts, 
  onAmountChange, 
  onProceed 
}: { 
  services: Service[]; 
  inputAmounts: Record<string, number>;
  onAmountChange: (serviceId: string, value: number) => void;
  onProceed: () => void;
}) {
  // Calculate total from input amounts
  const total = Object.values(inputAmounts).reduce((sum, amount) => sum + amount, 0);
  
  return (
    <div className="flex flex-col h-full px-4 pt-6 pb-4">
      <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] not-italic text-[18px] text-black tracking-[-0.18px] mb-4">Checkout</p>
      
      <div className="mb-4">
        <Frame20 total={total} />
      </div>
      
      <div className="flex-1 min-h-0 mb-4">
        <div className="bg-white box-border flex flex-col gap-4 h-full overflow-y-auto pb-6 pt-5 px-4 rounded-[18px] w-full max-w-[327px] mx-auto">
          <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[12px] text-black">Enter the amount you want to pay.</p>
          <div className="flex flex-col gap-5">
            {(() => {
              const servicesByStudent = services.reduce((acc, service) => {
                if (!acc[service.studentName]) {
                  acc[service.studentName] = [];
                }
                acc[service.studentName].push(service);
                return acc;
              }, {} as Record<string, Service[]>);
              
              return Object.entries(servicesByStudent).map(([studentName, studentServices]) => (
                <StudentServiceGroup 
                  key={studentName}
                  studentName={studentName}
                  services={studentServices}
                  inputAmounts={inputAmounts}
                  onAmountChange={onAmountChange}
                />
              ));
            })()}
          </div>
        </div>
      </div>
      
      <button 
        onClick={onProceed}
        className="bg-[#003630] box-border content-stretch flex gap-[8px] h-[59px] items-center justify-center overflow-clip px-[24px] py-[10px] rounded-[12px] w-full max-w-[327px] mx-auto touch-manipulation active:scale-[0.98] transition-transform" 
        data-name="Button"
      >
        <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-nowrap text-white tracking-[-0.18px] whitespace-pre">Proceed</p>
        <IconRightWrapper />
      </button>
    </div>
  );
}

export default function CheckoutPage2({ services, onBack, onProceed }: CheckoutPage2Props) {
  const [showReceipts, setShowReceipts] = useState(false);
  
  // Initialize input amounts with service amounts
  const [inputAmounts, setInputAmounts] = useState<Record<string, number>>(() => {
    const amounts: Record<string, number> = {};
    services.forEach(service => {
      amounts[service.id] = service.amount;
    });
    return amounts;
  });

  const handleAmountChange = (serviceId: string, value: number) => {
    setInputAmounts(prev => ({
      ...prev,
      [serviceId]: value
    }));
  };

  // Calculate total from input amounts
  const totalAmount = Object.values(inputAmounts).reduce((sum, amount) => sum + amount, 0);

  if (showReceipts) {
    return (
      <ReceiptsPage 
        onBack={() => setShowReceipts(false)}
        onNext={() => onProceed(totalAmount)}
        totalAmount={totalAmount}
      />
    );
  }

  return (
    <div className="bg-white h-screen w-full overflow-hidden flex justify-center">
      <div className="flex flex-col w-full max-w-[393px] h-screen shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Checkout page 2">
        <Header onBack={onBack} />
        <div className="flex-1 min-h-0">
          <Group1 
            services={services} 
            inputAmounts={inputAmounts}
            onAmountChange={handleAmountChange}
            onProceed={() => setShowReceipts(true)} 
          />
        </div>
      </div>
    </div>
  );
}