import { motion } from "motion/react";
import { useState } from "react";
import { getStudentsByPhone } from "../data/students";
import svgPaths from "../imports/svg-4boykq1z8d";
import dropdownSvgPaths from "../imports/svg-g5tpckf1cs";
import checkSvgPaths from "../imports/svg-ntb0im3s1u";
import xIconSvgPaths from "../imports/svg-zhcira9im7";
import AddOtherServicesPopup from "./AddOtherServicesPopup";

interface Student {
  name: string;
  id: string;
  grade: string;
  balances: number;
}

interface AddServicesPageProps {
  selectedStudentIds: string[];
  userPhone: string;
  schoolName: string;
  onBack: () => void;
  onNext: () => void;
  onCheckout?: (services: Array<Service & { studentName: string }>) => void;
}

interface Service {
  id: string;
  description: string;
  amount: number;
  invoiceNo: string;
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

function ChildPill({ name, id, isActive, onClick }: { name: string; id: string; isActive: boolean; onClick: () => void }) {
  return (
    <div className="content-stretch flex gap-[15px] items-start relative shrink-0 w-[105px]">
      <button
        onClick={onClick}
        className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shrink-0 cursor-pointer touch-manipulation active:opacity-80 transition-opacity"
      >
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative w-full">
            <div className={`font-['IBM_Plex_Sans_Devanagari:${isActive ? 'Bold' : 'Light'}',sans-serif] ${isActive ? 'font-bold' : 'font-light'} leading-[15px] not-italic relative shrink-0 text-[#003630] text-[10px] text-nowrap tracking-[-0.1px] whitespace-pre`}>
              <p className="mb-0">{name}</p>
              <p>{id}</p>
            </div>
          </div>
        </div>
      </button>
      {isActive && <div className="absolute bg-[#95e36c] h-[3px] left-[9px] top-[43px] w-[87px]" />}
    </div>
  );
}

function StudentInfo({ student, serviceTotal }: { student: Student; serviceTotal: number }) {
  return (
    <div className="box-border content-stretch flex items-start pr-[2px] relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col items-start mr-[-2px] relative shrink-0 flex-1">
        <div className="content-stretch flex gap-[53px] items-end relative shrink-0 w-full">
          <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[15px] text-black">
            {student.name} - {student.id}
          </p>
        </div>
        <div className="content-stretch flex items-end justify-between relative shrink-0">
          <p className="font-['IBM_Plex_Sans_Devanagari:Light',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#2d3c48] text-[10px]">
            {student.grade} - Twalumbu Education Centre
          </p>
        </div>
      </div>
      <div className="box-border content-stretch flex gap-[51px] items-center justify-end mr-[-2px] relative shrink-0 w-[80px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[15px] text-black">
          ZMW {serviceTotal}
        </p>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="overflow-clip size-[14px]" data-name="icon-check">
      <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Shape">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(149, 227, 108, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 8">
            <path clipRule="evenodd" d={checkSvgPaths.pe001b80} fill="var(--fill-0, #95E36C)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function XIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="size-[14px] cursor-pointer touch-manipulation active:opacity-60 transition-opacity"
      data-name="icon-x"
      aria-label="Remove service"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon-x">
          <path d={xIconSvgPaths.p1edcdf00} fill="var(--fill-0, #FF0000)" id="Shape" />
        </g>
      </svg>
    </button>
  );
}

function ServiceTable({ services, onRemoveItem }: { services: Service[]; onRemoveItem: (id: string) => void }) {
  const hasServices = services.length > 0;

  return (
    <div className="card card-interactive content-stretch flex flex-col flex-1 items-start overflow-clip relative shrink-0 w-full animate-scale-in" style={{ animationDelay: '100ms' }}>
      {/* Header */}
      <div className="box-border content-stretch flex h-[32px] items-center pb-0 pt-[12px] px-[12px] relative shrink-0 w-full bg-gradient-to-b from-[#fafafa] to-white">
        <div className="box-border content-stretch flex gap-[10px] h-full items-center pb-[2px] pt-[4px] px-[6px] relative shrink-0 flex-1">
          <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7a929e] text-[8px] text-nowrap tracking-[-0.08px]">
            <p className="leading-[24px] whitespace-pre">Service Description</p>
          </div>
        </div>
        <div className="h-full relative shrink-0 w-[108px]">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="box-border content-stretch flex gap-[10px] h-full items-center justify-center px-[10px] py-[4px] relative w-[108px]">
              <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] h-full justify-center leading-[0] not-italic relative shrink-0 text-[#7a929e] text-[8px] tracking-[-0.08px] w-[54px]">
                <p className="leading-[24px]">Amount (ZMW)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider w-full"></div>

      {/* Services or Empty State */}
      {!hasServices ? (
        <div className="flex-1 flex items-center justify-center w-full py-8">
          <p className="font-['Inter:Light',sans-serif] font-light leading-[15px] not-italic text-[#a7aaa7] text-[10px] text-center tracking-[-0.1px] px-4">
            Select a Pupil to View Payment History
          </p>
        </div>
      ) : (
        <div className="flex-1 w-full">
          {services.map((service, index) => (
            <motion.div 
              key={service.id} 
              className="box-border content-stretch flex h-[36px] items-start pl-[5px] pr-0 py-0 w-full relative group hover:bg-gradient-to-r hover:from-[rgba(149,227,108,0.03)] hover:to-transparent transition-all duration-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2, ease: "easeOut" }}
            >
              <div className="box-border content-stretch flex gap-[10px] h-full items-center p-[10px] relative shrink-0 flex-1">
                <div className="content-stretch flex flex-col h-[26px] items-start justify-center leading-[0] not-italic relative shrink-0">
                  <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] h-[15px] justify-center relative shrink-0 text-[12px] text-black">
                    <p className="leading-[1.4]">{service.description}</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center relative shrink-0 text-[#003049] text-[8px] tracking-[-0.08px]">
                    <p className="leading-[12px]">Invoice No. {service.invoiceNo}</p>
                  </div>
                </div>
              </div>
              <div className="box-border content-stretch flex gap-[10px] h-full items-start justify-center pb-[10px] pt-[2px] px-[10px] relative shrink-0 w-[76px]">
                <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap">
                  <p className="leading-[1.4] whitespace-pre">K{service.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="absolute right-[8px] top-[11px] opacity-60 group-hover:opacity-100 transition-opacity">
                <XIcon onClick={() => onRemoveItem(service.id)} />
              </div>
              {index < services.length - 1 && (
                <div className="absolute bottom-0 left-[10px] right-[10px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.06)] to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function DropdownIcon() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={dropdownSvgPaths.p131c6b00} fill="var(--fill-0, #2D3648)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

const YEAR_OPTIONS = ["2023", "2024", "2025", "2026"];

const TERM_OPTIONS = ["Term 1", "Term 2", "Term 3"];

/**
 * Get school-specific grade pricing
 * Different schools have different tuition structures
 */
function getSchoolGradePricing(schoolName: string) {
  const pricingBySchool: Record<string, Array<{ label: string; value: string; price: number }>> = {
    "Twalumbu Educational Center": [
      { label: "Grade 1 - K800 (Per term)", value: "grade-1", price: 800 },
      { label: "Grade 2 - K900 (Per term)", value: "grade-2", price: 900 },
      { label: "Grade 3 - K1,000 (Per term)", value: "grade-3", price: 1000 },
      { label: "Grade 4 - K1,100 (Per term)", value: "grade-4", price: 1100 },
      { label: "Grade 5 - K1,200 (Per term)", value: "grade-5", price: 1200 },
      { label: "Grade 6 - K1,300 (Per term)", value: "grade-6", price: 1300 },
      { label: "Grade 7 - K1,400 (Per term)", value: "grade-7", price: 1400 },
    ],
    "Chimilute Trust Academy": [
      { label: "Form 1 - K2,200 (Per term)", value: "form-1", price: 2200 },
      { label: "Form 2 - K2,400 (Per term)", value: "form-2", price: 2400 },
      { label: "Form 3 - K2,600 (Per term)", value: "form-3", price: 2600 },
      { label: "Form 4 - K2,800 (Per term)", value: "form-4", price: 2800 },
      { label: "Form 5 - K3,000 (Per term)", value: "form-5", price: 3000 },
    ],
    "Julani School": [
      { label: "Grade 1 - K2,800 (Per term)", value: "grade-1", price: 2800 },
      { label: "Grade 2 - K3,000 (Per term)", value: "grade-2", price: 3000 },
      { label: "Grade 3 - K3,200 (Per term)", value: "grade-3", price: 3200 },
      { label: "Grade 4 - K3,500 (Per term)", value: "grade-4", price: 3500 },
      { label: "Grade 5 - K3,800 (Per term)", value: "grade-5", price: 3800 },
      { label: "Grade 6 - K4,000 (Per term)", value: "grade-6", price: 4000 },
    ],
    "Crested Crane Academy": [
      { label: "Year 5 - K3,800 (Per term)", value: "year-5", price: 3800 },
      { label: "Year 6 - K4,000 (Per term)", value: "year-6", price: 4000 },
      { label: "Year 7 - K4,200 (Per term)", value: "year-7", price: 4200 },
      { label: "Year 8 - K4,500 (Per term)", value: "year-8", price: 4500 },
      { label: "Year 9 - K4,800 (Per term)", value: "year-9", price: 4800 },
      { label: "Year 10 - K5,000 (Per term)", value: "year-10", price: 5000 },
      { label: "Year 11 - K5,500 (Per term)", value: "year-11", price: 5500 },
    ],
    "International Maarif School": [
      { label: "Grade 6 - K4,500 (Per term)", value: "grade-6", price: 4500 },
      { label: "Grade 7 - K4,800 (Per term)", value: "grade-7", price: 4800 },
      { label: "Grade 8 - K5,000 (Per term)", value: "grade-8", price: 5000 },
      { label: "Grade 9 - K5,500 (Per term)", value: "grade-9", price: 5500 },
      { label: "Grade 10 - K6,000 (Per term)", value: "grade-10", price: 6000 },
      { label: "Grade 11 - K6,500 (Per term)", value: "grade-11", price: 6500 },
      { label: "Grade 12 - K7,000 (Per term)", value: "grade-12", price: 7000 },
    ],
  };

  return pricingBySchool[schoolName] || pricingBySchool["Twalumbu Educational Center"];
}

function AddSchoolFeesForm({ onDone, schoolName }: { onDone: (grade: string, year: string, term: string, price: number) => void; schoolName: string }) {
  const GRADE_OPTIONS = getSchoolGradePricing(schoolName);
  const [selectedGrade, setSelectedGrade] = useState(GRADE_OPTIONS[2].value);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedTerm, setSelectedTerm] = useState("Term 1");

  const handleDone = () => {
    const gradeOption = GRADE_OPTIONS.find(opt => opt.value === selectedGrade);
    if (gradeOption) {
      onDone(gradeOption.label, selectedYear, selectedTerm, gradeOption.price);
    }
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" />
      
      {/* Centered Form */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-[16px]">
        <motion.div
          className="bg-white rounded-[16px] shadow-[0px_20px_60px_rgba(0,54,48,0.25)] pointer-events-auto w-full max-w-[360px]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="p-[20px]">
            {/* Header */}
            <div className="mb-[24px]">
              <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[16px] text-[#003630] tracking-[-0.16px] mb-[4px]">
                Add School Fees
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[11px] text-[#6b7280] tracking-[-0.11px]">
                Select grade, year, and term
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-[16px]">
              <AppleDropdown
                label="Grade/Form"
                options={GRADE_OPTIONS}
                value={selectedGrade}
                onChange={setSelectedGrade}
              />
              
              <AppleDropdown
                label="Year"
                options={YEAR_OPTIONS.map(y => ({ label: y, value: y }))}
                value={selectedYear}
                onChange={setSelectedYear}
              />
              
              <AppleDropdown
                label="Term"
                options={TERM_OPTIONS.map(t => ({ label: t, value: t }))}
                value={selectedTerm}
                onChange={setSelectedTerm}
              />
            </div>

            {/* Done Button */}
            <button 
              onClick={handleDone}
              className="mt-[24px] bg-[#95e36c] w-full h-[48px] rounded-[12px] transition-all touch-manipulation active:scale-[0.98] shadow-[0px_4px_0px_0px_rgba(149,227,108,0.3)] active:shadow-[0px_1px_0px_0px_rgba(149,227,108,0.3)] active:translate-y-[3px]"
            >
              <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[14px] text-[#003630] tracking-[-0.14px]">
                Add Fee
              </p>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/**
 * Apple-style Dropdown Component
 * Premium dropdown with smooth animations
 */
function AppleDropdown({ 
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
    <div className="w-full">
      {/* Label */}
      <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[11px] text-[#6b7280] tracking-[-0.11px] mb-[8px] uppercase tracking-[0.5px]">
        {label}
      </p>
      
      {/* Dropdown Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[44px] bg-[#f5f5f7] hover:bg-[#ebebed] rounded-[10px] px-[16px] flex items-center justify-between transition-all touch-manipulation"
        >
          <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[14px] text-[#1d1d1f] tracking-[-0.14px]">
            {selectedOption?.label || "Select..."}
          </p>
          <motion.svg 
            width="12" 
            height="8" 
            viewBox="0 0 12 8" 
            fill="none"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#86868b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </button>
        
        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute z-50 w-full mt-[8px] bg-white rounded-[12px] shadow-[0px_12px_40px_rgba(0,0,0,0.15)] overflow-hidden border border-[#e5e5e7]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="max-h-[240px] overflow-y-auto">
                {options.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-[16px] py-[12px] transition-colors touch-manipulation ${
                      option.value === value 
                        ? 'bg-[#e0f7d4]' 
                        : 'hover:bg-[#f5f5f7]'
                    } ${index !== 0 ? 'border-t border-[#f5f5f7]' : ''}`}
                  >
                    <p className={`font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[14px] tracking-[-0.14px] ${
                      option.value === value ? 'text-[#003630] font-semibold' : 'text-[#1d1d1f]'
                    }`}>
                      {option.label}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AddServicesPage({ selectedStudentIds, userPhone, schoolName, onBack, onNext, onCheckout }: AddServicesPageProps) {
  const allStudents = getStudentsByPhone(userPhone);
  const selectedStudents = allStudents.filter(s => selectedStudentIds.includes(s.id));
  
  const [activeStudentId, setActiveStudentId] = useState<string>(selectedStudents[0]?.id || "");
  const activeStudent = selectedStudents.find(s => s.id === activeStudentId);
  const [showAddFeesForm, setShowAddFeesForm] = useState(false);
  const [showOtherServicesPopup, setShowOtherServicesPopup] = useState(false);
  const [studentServices, setStudentServices] = useState<Record<string, Service[]>>({});

  // Get services for the active student
  const activeStudentServices = studentServices[activeStudentId] || [];
  
  // Calculate total across all selected students
  const totalAmount = Object.entries(studentServices).reduce((sum, [studentId, services]) => {
    if (selectedStudentIds.includes(studentId)) {
      return sum + services.reduce((serviceSum, service) => serviceSum + service.amount, 0);
    }
    return sum;
  }, 0);

  const handleAddSchoolFees = () => {
    setShowAddFeesForm(true);
  };

  const handleDone = (grade: string, year: string, term: string, price: number) => {
    setShowAddFeesForm(false);
    const newService: Service = {
      id: `service-${Date.now()}`,
      description: `${grade} - ${term} ${year}`,
      amount: price,
      invoiceNo: "202"
    };
    setStudentServices(prev => ({
      ...prev,
      [activeStudentId]: [...(prev[activeStudentId] || []), newService]
    }));
  };

  const handleAddOtherServices = () => {
    setShowOtherServicesPopup(true);
  };

  const handleOtherServicesDone = (services: Array<{ id: string; name: string; amount: number; category: string; term: string; route?: string }>) => {
    setShowOtherServicesPopup(false);
    
    if (services.length === 0) return;
    
    // Get existing services for the active student
    const existingServices = studentServices[activeStudentId] || [];
    
    // Convert the school services to the Service format, filtering out duplicates
    const newServices: Service[] = services
      .filter(service => {
        // Create a signature for this service based on name, term, and route
        const newSignature = `${service.name}-${service.term}${service.route ? `-${service.route}` : ''}`;
        
        // Check if a service with this signature already exists
        const isDuplicate = existingServices.some(existing => {
          // Extract the signature from the existing service description
          return existing.description === (
            service.name + 
            (service.term ? ` - ${service.term}` : '') + 
            (service.route ? ` (${service.route})` : '')
          );
        });
        
        return !isDuplicate;
      })
      .map((service, index) => {
        // Build service description with term and route info
        let description = service.name;
        if (service.term) {
          description += ` - ${service.term}`;
        }
        if (service.route) {
          description += ` (${service.route})`;
        }
        
        // Generate a unique ID by combining the service ID with term and route info
        const uniqueId = `${service.id}-${service.term.replace(/\s+/g, '-')}-${service.route ? service.route.replace(/\s+/g, '-') : 'no-route'}-${Date.now()}-${index}`;
        
        return {
          id: uniqueId,
          description: description,
          amount: service.amount,
          invoiceNo: "202"
        };
      });
    
    // Only add if there are new services (not all duplicates)
    if (newServices.length > 0) {
      setStudentServices(prev => ({
        ...prev,
        [activeStudentId]: [...(prev[activeStudentId] || []), ...newServices]
      }));
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setStudentServices(prev => ({
      ...prev,
      [activeStudentId]: (prev[activeStudentId] || []).filter(s => s.id !== serviceId)
    }));
  };

  // Check if any services have been added
  const hasServices = Object.values(studentServices).some(services => services.length > 0);

  const handleNextOrCheckout = () => {
    if (totalAmount > 0 && onCheckout) {
      // Flatten all services with student names
      const allServicesWithStudents = Object.entries(studentServices).flatMap(([studentId, services]) => {
        const student = selectedStudents.find(s => s.id === studentId);
        return services.map(service => ({
          ...service,
          studentName: student?.name || studentId
        }));
      });
      onCheckout(allServicesWithStudents);
    } else {
      onNext();
    }
  };

  return (
    <div className="bg-white h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen mx-auto shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col">
        <Header onBack={onBack} />
        
        <div className="flex-1 flex flex-col px-[24px] pt-[12px] pb-[8px] overflow-hidden">
          <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] not-italic text-[18px] text-black tracking-[-0.18px]">
            Add Services to pay for
          </p>
          <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] leading-[1.5] not-italic text-[#a7aaa7] text-[12px] tracking-[-0.12px] mt-[2px]">
            Select the services that you would like to pay for and proceed to checkout to make payment.
          </p>

          {/* Main Card */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[14px] py-[8px] rounded-[15px] mt-[12px] shadow-sm border border-[#e5e7eb] flex-1 min-h-0">
            {/* Child Pills */}
            <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-full overflow-x-auto">
              {selectedStudents.slice(0, 2).map(student => (
                <ChildPill
                  key={student.id}
                  name={student.name}
                  id={student.id}
                  isActive={activeStudentId === student.id}
                  onClick={() => setActiveStudentId(student.id)}
                />
              ))}
            </div>

            {/* Student Info */}
            {activeStudent && (
              <StudentInfo 
                student={activeStudent} 
                serviceTotal={activeStudentServices.reduce((sum, s) => sum + s.amount, 0)} 
              />
            )}

            {/* Conditional Content */}
            {showAddFeesForm ? (
              <AddSchoolFeesForm onDone={handleDone} schoolName={schoolName} />
            ) : (
              <>
                {/* Service Table */}
                {!showOtherServicesPopup && (
                  <ServiceTable services={activeStudentServices} onRemoveItem={handleRemoveService} />
                )}

                {/* Add Buttons */}
                {!showOtherServicesPopup && (
                  <div className="w-full space-y-[12px] mt-[4px]">
                    <button 
                      onClick={handleAddSchoolFees}
                      className="bg-[#95e36c] w-full h-[50px] rounded-[12px] transition-all touch-manipulation active:scale-[0.98] shadow-[0px_4px_0px_0px_rgba(149,227,108,0.3)] active:shadow-[0px_1px_0px_0px_rgba(149,227,108,0.3)] active:translate-y-[3px] hover:shadow-[0px_6px_0px_0px_rgba(149,227,108,0.3)] flex items-center justify-center"
                    >
                      <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[14px] text-[#003630] tracking-[-0.14px]">
                        + Add School Fees
                      </p>
                    </button>
                    
                    <button 
                      onClick={handleAddOtherServices}
                      className="w-full h-[44px] bg-[#f5f5f7] hover:bg-[#ebebed] rounded-[10px] transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center border border-[#e5e5e7]"
                    >
                      <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[14px] text-[#1d1d1f] tracking-[-0.14px]">
                        Add Other Services
                      </p>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-[12px] mx-auto mb-[16px] w-[322px] shadow-lg border border-[#afbacf] shrink-0">
          <div className="box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip p-[16px] relative rounded-[inherit] w-full">
            <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 text-[#003630] w-[101px]">
              <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] h-[19px] leading-[24px] relative shrink-0 text-[17px] tracking-[-0.17px] w-full">
                ZMW {totalAmount}
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] h-[10px] leading-[12px] relative shrink-0 text-[8px] tracking-[-0.08px] w-full">
                Grand total
              </p>
            </div>
            <button 
              onClick={handleNextOrCheckout}
              disabled={!hasServices}
              className={`basis-0 bg-[#003630] grow h-[46px] min-h-px min-w-px relative rounded-[8px] shrink-0 transition-all ${
                hasServices 
                  ? 'touch-manipulation active:scale-[0.98] cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="box-border content-stretch flex gap-[8px] h-[46px] items-center justify-center px-[24px] py-[10px] relative w-full">
                  <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[15px] text-nowrap text-white tracking-[-0.15px] whitespace-pre">
                    {totalAmount > 0 ? "Checkout" : "Next"}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Add Other Services Popup */}
        {showOtherServicesPopup && (
          <AddOtherServicesPopup
            schoolName={schoolName}
            onClose={() => setShowOtherServicesPopup(false)}
            onDone={handleOtherServicesDone}
          />
        )}
      </div>
    </div>
  );
}