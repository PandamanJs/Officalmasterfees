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

const GRADE_OPTIONS = [
  { label: "Grade 1 - K1,200 (Per term)", value: "grade-1", price: 1200 },
  { label: "Grade 2 - K1,300 (Per term)", value: "grade-2", price: 1300 },
  { label: "Grade 3 - K1,500 (Per term)", value: "grade-3", price: 1500 },
  { label: "Grade 4 - K1,600 (Per term)", value: "grade-4", price: 1600 },
  { label: "Grade 5 - K1,800 (Per term)", value: "grade-5", price: 1800 },
];

const YEAR_OPTIONS = ["2023", "2024", "2025", "2026"];

const TERM_OPTIONS = ["Term 1", "Term 2", "Term 3"];

function AddSchoolFeesForm({ onDone }: { onDone: (grade: string, year: string, term: string, price: number) => void }) {
  const [selectedGrade, setSelectedGrade] = useState(GRADE_OPTIONS[2].value);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedTerm, setSelectedTerm] = useState("Term 1");
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showTermDropdown, setShowTermDropdown] = useState(false);

  const gradeOption = GRADE_OPTIONS.find(opt => opt.value === selectedGrade);

  const handleDone = () => {
    const grade = gradeOption?.label.split(" - ")[0] || "Grade 3";
    onDone(grade, selectedYear, selectedTerm, gradeOption?.price || 1500);
  };

  return (
    <div className="bg-white content-stretch flex flex-col gap-[10px] items-center overflow-clip relative rounded-[10px] w-full p-[12px] flex-1">
      {/* Header */}
      <div className="box-border content-stretch flex gap-[10px] items-start justify-center p-[6px] relative shrink-0">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#003049] text-[12px] text-nowrap tracking-[-0.12px] whitespace-pre">+ Add School Fees</p>
      </div>

      {/* Select Grade */}
      <div className="content-stretch flex gap-[5px] items-start relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
            <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[8px] tracking-[-0.08px]">Select Grade</p>
          </div>
          <div className="relative w-full mt-1">
            <button
              onClick={() => setShowGradeDropdown(!showGradeDropdown)}
              className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full touch-manipulation"
            >
              <div className="content-stretch flex flex-col h-[36px] items-start overflow-clip relative rounded-[inherit] w-full">
                <div className="h-[36px] relative shrink-0 w-full">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
                      <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[12px] tracking-[-0.12px] text-left">{gradeOption?.label}</p>
                      <DropdownIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#cbd2e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
            </button>
            
            {showGradeDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowGradeDropdown(false)}
                />
                <motion.div
                  className="absolute z-50 w-full mt-1 glass rounded-[12px] max-h-[200px] overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.6) inset'
                  }}
                >
                  {GRADE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedGrade(option.value);
                        setShowGradeDropdown(false);
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
      </div>

      {/* Enter Year of Service */}
      <div className="content-stretch flex gap-[5px] items-start relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
            <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[8px] tracking-[-0.08px]">Enter Year of Service</p>
          </div>
          <div className="relative w-full mt-1">
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full touch-manipulation"
            >
              <div className="content-stretch flex flex-col h-[36px] items-start overflow-clip relative rounded-[inherit] w-full">
                <div className="h-[36px] relative shrink-0 w-full">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
                      <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[12px] tracking-[-0.12px] text-left">{selectedYear}</p>
                      <DropdownIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#cbd2e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
            </button>

            {showYearDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowYearDropdown(false)}
                />
                <motion.div
                  className="absolute z-50 w-full mt-1 glass rounded-[12px] max-h-[200px] overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.6) inset'
                  }}
                >
                  {YEAR_OPTIONS.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setShowYearDropdown(false);
                      }}
                      className="w-full text-left px-[16px] py-[8px] hover:bg-[#f5f5f5] transition-colors"
                    >
                      <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#2d3648] tracking-[-0.12px]">
                        {year}
                      </p>
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Select the Term */}
      <div className="content-stretch flex gap-[5px] items-start relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
            <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[8px] tracking-[-0.08px]">Select the Term (You can choose to pay for more than one term)</p>
          </div>
          <div className="relative w-full mt-1">
            <button
              onClick={() => setShowTermDropdown(!showTermDropdown)}
              className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full touch-manipulation"
            >
              <div className="content-stretch flex flex-col h-[36px] items-start overflow-clip relative rounded-[inherit] w-full">
                <div className="h-[36px] relative shrink-0 w-full">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
                      <p className="basis-0 font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#2d3648] text-[12px] tracking-[-0.12px] text-left">{selectedTerm}</p>
                      <DropdownIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#cbd2e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
            </button>

            {showTermDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowTermDropdown(false)}
                />
                <motion.div
                  className="absolute z-50 w-full mt-1 glass rounded-[12px] max-h-[200px] overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.6) inset'
                  }}
                >
                  {TERM_OPTIONS.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSelectedTerm(term);
                        setShowTermDropdown(false);
                      }}
                      className="w-full text-left px-[16px] py-[8px] hover:bg-[#f5f5f5] transition-colors"
                    >
                      <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#2d3648] tracking-[-0.12px]">
                        {term}
                      </p>
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Done Button */}
      <div className="box-border content-stretch flex gap-[5px] h-[48px] items-center justify-end pl-0 pr-[24px] py-0 relative shrink-0 w-full">
        <button 
          onClick={handleDone}
          className="bg-[#95e36c] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center px-[36px] py-0 relative rounded-[8px] shrink-0 flex-1 touch-manipulation active:scale-[0.98] transition-transform"
        >
          <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#003630] text-[12px] text-nowrap whitespace-pre">Done</p>
        </button>
      </div>
    </div>
  );
}

export default function AddServicesPage({ selectedStudentIds, userPhone, onBack, onNext, onCheckout }: AddServicesPageProps) {
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

  const handleOtherServicesDone = (serviceName: string, option: string, month: string) => {
    setShowOtherServicesPopup(false);
    
    const newServices: Service[] = [];
    
    // Parse the service name and price - skip if "None" is selected
    let description = "";
    let amount = 0;
    
    if (serviceName.includes("woodlands")) {
      description = `School Bus (Woodlands) - ${month}`;
      amount = 1500;
    } else if (serviceName.includes("northmead")) {
      description = `School Bus (Northmead) - ${month}`;
      amount = 1200;
    } else if (serviceName.includes("longacres")) {
      description = `School Bus (Longacres) - ${month}`;
      amount = 1800;
    }
    
    // Add bus service if valid (not "None")
    if (description && amount > 0) {
      newServices.push({
        id: `service-${Date.now()}`,
        description,
        amount,
        invoiceNo: "202"
      });
    }
    
    // Also add canteen if selected (not "None")
    if (option.includes("lunch")) {
      newServices.push({
        id: `service-${Date.now()}-canteen`,
        description: `Canteen (Lunch) - ${month}`,
        amount: 1000,
        invoiceNo: "202"
      });
    } else if (option.includes("breakfast")) {
      newServices.push({
        id: `service-${Date.now()}-canteen`,
        description: `Canteen (Breakfast) - ${month}`,
        amount: 500,
        invoiceNo: "202"
      });
    } else if (option.includes("snacks")) {
      newServices.push({
        id: `service-${Date.now()}-canteen`,
        description: `Canteen (Snacks) - ${month}`,
        amount: 300,
        invoiceNo: "202"
      });
    }
    
    // Add all new services to the active student
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
              <AddSchoolFeesForm onDone={handleDone} />
            ) : (
              <>
                {/* Service Table */}
                {!showOtherServicesPopup && (
                  <ServiceTable services={activeStudentServices} onRemoveItem={handleRemoveService} />
                )}

                {/* Add Buttons */}
                {!showOtherServicesPopup && (
                  <div className="w-full space-y-[12px]">
                    <button 
                      onClick={handleAddSchoolFees}
                      className="bg-[#95e36c] box-border content-stretch flex gap-[8px] h-[42px] items-center justify-center overflow-clip px-[24px] py-[10px] rounded-[10px] w-full touch-manipulation active:scale-[0.98] transition-transform"
                    >
                      <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#003630] text-[12px] text-nowrap tracking-[-0.12px] whitespace-pre">
                        + Add School Fees
                      </p>
                    </button>
                    
                    <button 
                      onClick={handleAddOtherServices}
                      className="box-border content-stretch flex gap-[8px] h-[38px] items-center justify-center overflow-clip px-[24px] py-[10px] rounded-[6px] w-full touch-manipulation active:opacity-60 transition-opacity"
                    >
                      <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2d3c48] text-[12px] text-nowrap tracking-[-0.12px] whitespace-pre">
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
            onClose={() => setShowOtherServicesPopup(false)}
            onDone={handleOtherServicesDone}
          />
        )}
      </div>
    </div>
  );
}