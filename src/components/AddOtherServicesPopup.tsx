import { useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../imports/svg-rwvnsqykxb";

interface AddOtherServicesPopupProps {
  onClose: () => void;
  onDone: (service: string, option: string, month: string) => void;
}

const BUS_OPTIONS = [
  { label: "woodlands - K1,500 (Per month)", value: "woodlands-1500" },
  { label: "northmead - K1,200 (Per month)", value: "northmead-1200" },
  { label: "longacres - K1,800 (Per month)", value: "longacres-1800" },
];

const CANTEEN_OPTIONS = [
  { label: "Lunch - K1000 (Per month)", value: "lunch-1000" },
  { label: "Breakfast - K500 (Per month)", value: "breakfast-500" },
  { label: "Snacks - K300 (Per month)", value: "snacks-300" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Dropdown({ 
  label, 
  options, 
  value, 
  onChange 
}: { 
  label: string; 
  options: { label: string; value: string }[]; 
  value: string; 
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[250px]">
      <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
        <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[8px] tracking-[-0.08px]">{label}</p>
      </div>
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white h-[36px] relative rounded-[6px] w-full touch-manipulation"
        >
          <div className="content-stretch flex flex-col h-[36px] items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="h-[36px] relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
                  <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[12px] tracking-[-0.12px] text-left">
                    {selectedOption?.label || "Select..."}
                  </p>
                  <div className="relative shrink-0 size-[15px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                      <g id="Icon">
                        <path d={svgPaths.p131c6b00} fill="var(--fill-0, #2D3648)" id="Shape" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#cbd2e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute z-50 w-full mt-1 bg-white border border-[#cbd2e0] rounded-[6px] shadow-lg max-h-[200px] overflow-y-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-[16px] py-[8px] hover:bg-[#f5f5f5] transition-colors"
                >
                  <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#2d3648] tracking-[-0.12px]">
                    {option.label}
                  </p>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

function MonthDropdown({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[250px]">
      <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
        <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[8px] tracking-[-0.08px]">Month</p>
      </div>
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white h-[36px] relative rounded-[6px] w-full touch-manipulation"
        >
          <div className="content-stretch flex flex-col h-[36px] items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="h-[36px] relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
                  <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[12px] tracking-[-0.12px] text-left">
                    {value}
                  </p>
                  <div className="relative shrink-0 size-[15px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                      <g id="Icon">
                        <path d={svgPaths.p131c6b00} fill="var(--fill-0, #2D3648)" id="Shape" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#cbd2e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute z-50 w-full mt-1 bg-white border border-[#cbd2e0] rounded-[6px] shadow-lg max-h-[200px] overflow-y-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {MONTHS.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    onChange(month);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-[16px] py-[8px] hover:bg-[#f5f5f5] transition-colors"
                >
                  <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#2d3648] tracking-[-0.12px]">
                    {month}
                  </p>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AddOtherServicesPopup({ onClose, onDone }: AddOtherServicesPopupProps) {
  const [busService, setBusService] = useState(BUS_OPTIONS[0].value);
  const [canteenService, setCanteenService] = useState(CANTEEN_OPTIONS[0].value);
  const [month, setMonth] = useState("January");

  const handleDone = () => {
    // For now, we'll just pass the bus service info
    const selectedBus = BUS_OPTIONS.find(opt => opt.value === busService);
    onDone(selectedBus?.label || "", canteenService, month);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <motion.div
          className="bg-white rounded-[10px] shadow-xl pointer-events-auto w-[296px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
        <div className="content-stretch flex flex-col gap-[12px] items-center overflow-clip relative rounded-[10px] p-[12px]">
          {/* Header */}
          <div className="box-border content-stretch flex gap-[10px] items-start justify-center p-[10px] relative shrink-0">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#003049] text-[12px] text-nowrap tracking-[-0.12px] whitespace-pre">+ Add Other Services</p>
          </div>

          {/* Dropdowns */}
          <Dropdown
            label="School Bus prices"
            options={BUS_OPTIONS}
            value={busService}
            onChange={setBusService}
          />
          
          <Dropdown
            label="Canteen Prices"
            options={CANTEEN_OPTIONS}
            value={canteenService}
            onChange={setCanteenService}
          />
          
          <MonthDropdown
            value={month}
            onChange={setMonth}
          />

          {/* Done Button */}
          <div className="box-border content-stretch flex gap-[5px] h-[48px] items-center justify-end pl-0 pr-[12px] py-0 relative shrink-0 w-full">
            <button 
              onClick={handleDone}
              className="bg-[#95e36c] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center px-[36px] py-0 relative rounded-[8px] flex-1 touch-manipulation active:scale-[0.98] transition-transform"
            >
              <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#003630] text-[12px] text-nowrap whitespace-pre">Done</p>
            </button>
          </div>
        </div>
        </motion.div>
      </div>
    </>
  );
}
