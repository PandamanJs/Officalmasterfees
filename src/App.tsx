import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "./imports/svg-s534f8yrof";
import SchoolDetailsPage from "./components/SchoolDetailsPage";
import ServicesPage from "./components/ServicesPage";
import HistoryPage, { type PaymentData } from "./components/HistoryPage";
import AllReceipts from "./components/AllReceipts";
import PayForSchoolFees from "./components/PayForSchoolFees";
import AddServicesPage from "./components/AddServicesPage";
import CheckoutPage from "./components/CheckoutPage";
import PaymentPage from "./components/PaymentPage";
import ProcessingPage from "./components/ProcessingPage";
import PaymentFailedPage from "./components/PaymentFailedPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import DownloadReceiptPage from "./components/DownloadReceiptPage";
import Tutorial from "./components/Tutorial";
import { Toaster } from "./components/ui/sonner";
import { getStudentsByPhone } from "./data/students";

/**
 * Interface for checkout service items
 * Represents a single service being purchased for a student
 */
interface CheckoutService {
  id: string;           // Unique identifier for the service
  description: string;  // Service name/description
  amount: number;       // Cost in local currency
  invoiceNo: string;    // Invoice reference number
  studentName: string;  // Student receiving the service
}

// Mock schools data - in a real app, this would come from an API
const SCHOOLS = [
  { 
    id: 1, 
    name: "Twalumbu Educational Center",
  },
];

/**
 * SearchNormal Component
 * SVG icon for the search functionality
 */
function SearchNormal() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g id="search-normal">
        <path d={svgPaths.p14d5dec0} id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p355f1080} id="Vector_2" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <g id="Vector_3" opacity="0"></g>
      </g>
    </svg>
  );
}

/**
 * VuesaxLinearSearchNormal Component
 * Wrapper for the search icon
 */
function VuesaxLinearSearchNormal() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/search-normal">
      <SearchNormal />
    </div>
  );
}

/**
 * TextInput Component
 * School search input with auto-suggest dropdown
 * Features:
 * - Real-time search filtering
 * - Click-outside to close suggestions
 * - Keyboard navigation support
 */
function TextInput({ onSchoolSelect, selectedSchool }: { onSchoolSelect: (school: string) => void; selectedSchool: string | null }) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter schools based on input - case insensitive search
  const filteredSchools = inputValue.trim()
    ? SCHOOLS.filter((school) =>
        school.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  // Close suggestions when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handle input changes
   * Updates input value and shows/hides suggestions
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.trim().length > 0);
    if (!value.trim()) {
      onSchoolSelect("");
    }
  };

  /**
   * Handle school selection from dropdown
   * Updates input, notifies parent, and closes dropdown
   */
  const handleSelectSchool = (schoolName: string) => {
    setInputValue(schoolName);
    onSchoolSelect(schoolName);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className="basis-0 bg-white grow h-full min-h-[50px] min-w-px relative rounded-[10px] shrink-0" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#a7aaa7] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[24px] items-center p-[16px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="search-normal">
            <VuesaxLinearSearchNormal />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => inputValue.trim().length > 0 && setShowSuggestions(true)}
            placeholder="e.g. Twalumbu"
            className="flex-1 bg-transparent border-none outline-none font-['IBM_Plex_Sans:Regular',sans-serif] text-[12px] text-black placeholder:text-[rgba(45,54,72,0.44)] tracking-[-0.12px] touch-manipulation"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSchools.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-[#a7aaa7] rounded-[10px] shadow-lg max-h-[240px] overflow-y-auto z-10">
          {filteredSchools.map((school) => (
            <button
              key={school.id}
              onClick={() => handleSelectSchool(school.name)}
              className="w-full text-left px-[16px] py-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[12px] text-black hover:bg-[#f5f4f7] active:bg-[#e5e4e7] transition-colors touch-manipulation border-b border-[#f0f0f0] last:border-b-0"
            >
              {school.name}
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && inputValue.trim() && filteredSchools.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-[#a7aaa7] rounded-[10px] shadow-lg z-10">
          <div className="px-[16px] py-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[12px] text-[rgba(45,54,72,0.44)]">
            No schools found
          </div>
        </div>
      )}
    </div>
  );
}

function TextAreaBase({ selectedSchool, onSchoolSelect }: { selectedSchool: string | null; onSchoolSelect: (school: string) => void }) {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full" data-name="_Text Area Base">
      <TextInput onSchoolSelect={onSchoolSelect} selectedSchool={selectedSchool} />
    </div>
  );
}

function TextArea({ selectedSchool, onSchoolSelect }: { selectedSchool: string | null; onSchoolSelect: (school: string) => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] min-h-[50px] items-start relative shrink-0 w-full" data-name="Text Area">
      <TextAreaBase selectedSchool={selectedSchool} onSchoolSelect={onSchoolSelect} />
    </div>
  );
}

function Frame({ selectedSchool, onSchoolSelect }: { selectedSchool: string | null; onSchoolSelect: (school: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-center w-full">Enter Your School's Name</p>
      <TextArea selectedSchool={selectedSchool} onSchoolSelect={onSchoolSelect} />
    </div>
  );
}

function Frame3({ onProceed, hasSchool, selectedSchool, onSchoolSelect }: { onProceed: () => void; hasSchool: boolean; selectedSchool: string | null; onSchoolSelect: (school: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start w-full px-[24px] sm:px-[48px]">
      <Frame selectedSchool={selectedSchool} onSchoolSelect={onSchoolSelect} />
      <button 
        onClick={onProceed}
        disabled={!hasSchool}
        className="bg-[#003630] min-h-[55px] relative rounded-[12px] shadow-[0px_6px_0px_0px_rgba(0,54,48,0.25)] shrink-0 w-full active:shadow-[0px_2px_0px_0px_rgba(0,54,48,0.25)] active:translate-y-[4px] transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed" data-name="Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="box-border content-stretch flex gap-[8px] min-h-[55px] items-center justify-center px-[24px] py-[16px] relative w-full">
            <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.16px] whitespace-pre">Proceed</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] gap-[3px] items-center leading-[normal] not-italic text-[#bdbdbd] text-[10px] text-center w-full px-[24px] py-[20px]">
      <p className="relative shrink-0 w-full whitespace-pre-wrap">
        <span>{`view the `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">terms</span>
        <span>{` and `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">conditions</span>
        <span>{`  of service`}</span>
      </p>
      <p className="relative shrink-0 w-full">All rights reserved ©</p>
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[109.79px]">
      <div className="absolute inset-[-5.02%_-8.67%_-12.31%_-8.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 129 129">
          <g id="Group 15">
            <g filter="url(#filter0_d_2_218)" id="rect84">
              <path d={svgPaths.p3c984100} fill="var(--fill-0, #003630)" />
              <path d={svgPaths.p38a7c180} stroke="var(--stroke-0, white)" strokeWidth="8" />
            </g>
            <path d={svgPaths.p32912680} id="path60" stroke="var(--stroke-0, #95E36C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="128.819" id="filter0_d_2_218" width="128.819" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2_218" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2_218" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center not-italic relative shrink-0 text-black text-center w-full px-[24px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] w-full">
        <p className="leading-[45px]">Pay School Fees with</p>
      </div>
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] leading-[45px] relative shrink-0 text-[32px] sm:text-[48px] w-full">master-fees</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#f5f4f7] box-border content-stretch flex flex-col gap-[20px] items-center justify-end px-0 py-[24px] w-full relative min-h-[280px] sm:min-h-[323px] overflow-hidden">
      <div aria-hidden="true" className="absolute border-[#95e36c] border-[0px_0px_4px] border-solid inset-0 pointer-events-none" />
      
      {/* Animated Wave Layers - Seamless Continuous Waves */}
      <motion.div
        className="absolute bottom-0 left-0 h-[150%] pointer-events-none flex"
        style={{ opacity: 0.2, width: "200%" }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      >
        <svg className="absolute bottom-0 left-0 w-1/2 h-[80%]" viewBox="0 0 2400 200" preserveAspectRatio="none">
          <motion.path
            d="M0,100 Q150,150 300,100 T600,100 Q750,50 900,100 T1200,100 Q1350,150 1500,100 T1800,100 Q1950,50 2100,100 T2400,100 L2400,200 L0,200 Z"
            fill="#95e36c"
            opacity="0.4"
            animate={{
              d: [
                "M0,100 Q150,150 300,100 T600,100 Q750,50 900,100 T1200,100 Q1350,150 1500,100 T1800,100 Q1950,50 2100,100 T2400,100 L2400,200 L0,200 Z",
                "M0,100 Q150,60 300,100 T600,100 Q750,140 900,100 T1200,100 Q1350,60 1500,100 T1800,100 Q1950,140 2100,100 T2400,100 L2400,200 L0,200 Z",
                "M0,100 Q150,150 300,100 T600,100 Q750,50 900,100 T1200,100 Q1350,150 1500,100 T1800,100 Q1950,50 2100,100 T2400,100 L2400,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
        <svg className="absolute bottom-0 left-1/2 w-1/2 h-[80%]" viewBox="0 0 2400 200" preserveAspectRatio="none">
          <motion.path
            d="M0,100 Q150,150 300,100 T600,100 Q750,50 900,100 T1200,100 Q1350,150 1500,100 T1800,100 Q1950,50 2100,100 T2400,100 L2400,200 L0,200 Z"
            fill="#95e36c"
            opacity="0.4"
            animate={{
              d: [
                "M0,100 Q150,150 300,100 T600,100 Q750,50 900,100 T1200,100 Q1350,150 1500,100 T1800,100 Q1950,50 2100,100 T2400,100 L2400,200 L0,200 Z",
                "M0,100 Q150,60 300,100 T600,100 Q750,140 900,100 T1200,100 Q1350,60 1500,100 T1800,100 Q1950,140 2100,100 T2400,100 L2400,200 L0,200 Z",
                "M0,100 Q150,150 300,100 T600,100 Q750,50 900,100 T1200,100 Q1350,150 1500,100 T1800,100 Q1950,50 2100,100 T2400,100 L2400,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-0 left-0 h-[150%] pointer-events-none flex"
        style={{ opacity: 0.25, width: "200%" }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: { duration: 25, repeat: Infinity, ease: "linear" },
        }}
      >
        <svg className="absolute bottom-0 left-0 w-1/2 h-[70%]" viewBox="0 0 2400 200" preserveAspectRatio="none">
          <motion.path
            d="M0,120 Q200,60 400,120 T800,120 Q950,160 1100,120 T1600,120 Q1750,60 1900,120 T2400,120 L2400,200 L0,200 Z"
            fill="#003630"
            opacity="0.5"
            animate={{
              d: [
                "M0,120 Q200,60 400,120 T800,120 Q950,160 1100,120 T1600,120 Q1750,60 1900,120 T2400,120 L2400,200 L0,200 Z",
                "M0,120 Q200,170 400,120 T800,120 Q950,70 1100,120 T1600,120 Q1750,170 1900,120 T2400,120 L2400,200 L0,200 Z",
                "M0,120 Q200,60 400,120 T800,120 Q950,160 1100,120 T1600,120 Q1750,60 1900,120 T2400,120 L2400,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
        <svg className="absolute bottom-0 left-1/2 w-1/2 h-[70%]" viewBox="0 0 2400 200" preserveAspectRatio="none">
          <motion.path
            d="M0,120 Q200,60 400,120 T800,120 Q950,160 1100,120 T1600,120 Q1750,60 1900,120 T2400,120 L2400,200 L0,200 Z"
            fill="#003630"
            opacity="0.5"
            animate={{
              d: [
                "M0,120 Q200,60 400,120 T800,120 Q950,160 1100,120 T1600,120 Q1750,60 1900,120 T2400,120 L2400,200 L0,200 Z",
                "M0,120 Q200,170 400,120 T800,120 Q950,70 1100,120 T1600,120 Q1750,170 1900,120 T2400,120 L2400,200 L0,200 Z",
                "M0,120 Q200,60 400,120 T800,120 Q950,160 1100,120 T1600,120 Q1750,60 1900,120 T2400,120 L2400,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-0 left-0 h-[150%] pointer-events-none flex"
        style={{ opacity: 0.3, width: "200%" }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: "linear" },
        }}
      >
        <svg className="absolute bottom-0 left-0 w-1/2 h-[60%]" viewBox="0 0 2400 200" preserveAspectRatio="none">
          <motion.path
            d="M0,140 Q250,90 500,140 T1000,140 Q1100,110 1200,140 T1800,140 Q1900,90 2100,140 T2400,140 L2400,200 L0,200 Z"
            fill="#95e36c"
            opacity="0.3"
            animate={{
              d: [
                "M0,140 Q250,90 500,140 T1000,140 Q1100,110 1200,140 T1800,140 Q1900,90 2100,140 T2400,140 L2400,200 L0,200 Z",
                "M0,140 Q250,170 500,140 T1000,140 Q1100,160 1200,140 T1800,140 Q1900,170 2100,140 T2400,140 L2400,200 L0,200 Z",
                "M0,140 Q250,90 500,140 T1000,140 Q1100,110 1200,140 T1800,140 Q1900,90 2100,140 T2400,140 L2400,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
        <svg className="absolute bottom-0 left-1/2 w-1/2 h-[60%]" viewBox="0 0 2400 200" preserveAspectRatio="none">
          <motion.path
            d="M0,140 Q250,90 500,140 T1000,140 Q1100,110 1200,140 T1800,140 Q1900,90 2100,140 T2400,140 L2400,200 L0,200 Z"
            fill="#95e36c"
            opacity="0.3"
            animate={{
              d: [
                "M0,140 Q250,90 500,140 T1000,140 Q1100,110 1200,140 T1800,140 Q1900,90 2100,140 T2400,140 L2400,200 L0,200 Z",
                "M0,140 Q250,170 500,140 T1000,140 Q1100,160 1200,140 T1800,140 Q1900,170 2100,140 T2400,140 L2400,200 L0,200 Z",
                "M0,140 Q250,90 500,140 T1000,140 Q1100,110 1200,140 T1800,140 Q1900,90 2100,140 T2400,140 L2400,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-0 left-0 h-[150%] pointer-events-none flex"
        style={{ opacity: 0.18, width: "200%" }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: { duration: 30, repeat: Infinity, ease: "linear" },
        }}
      >
        <svg className="absolute bottom-0 left-0 w-1/2 h-[55%]" viewBox="0 0 2400 200" preserveAspectRatio="none">
          <motion.path
            d="M0,130 Q180,170 360,130 T720,130 Q900,80 1080,130 T1440,130 Q1620,170 1800,130 T2400,130 L2400,200 L0,200 Z"
            fill="#003630"
            opacity="0.35"
            animate={{
              d: [
                "M0,130 Q180,170 360,130 T720,130 Q900,80 1080,130 T1440,130 Q1620,170 1800,130 T2400,130 L2400,200 L0,200 Z",
                "M0,130 Q180,90 360,130 T720,130 Q900,165 1080,130 T1440,130 Q1620,90 1800,130 T2400,130 L2400,200 L0,200 Z",
                "M0,130 Q180,170 360,130 T720,130 Q900,80 1080,130 T1440,130 Q1620,170 1800,130 T2400,130 L2400,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
        <svg className="absolute bottom-0 left-1/2 w-1/2 h-[55%]" viewBox="0 0 2400 200" preserveAspectRatio="none">
          <motion.path
            d="M0,130 Q180,170 360,130 T720,130 Q900,80 1080,130 T1440,130 Q1620,170 1800,130 T2400,130 L2400,200 L0,200 Z"
            fill="#003630"
            opacity="0.35"
            animate={{
              d: [
                "M0,130 Q180,170 360,130 T720,130 Q900,80 1080,130 T1440,130 Q1620,170 1800,130 T2400,130 L2400,200 L0,200 Z",
                "M0,130 Q180,90 360,130 T720,130 Q900,165 1080,130 T1440,130 Q1620,90 1800,130 T2400,130 L2400,200 L0,200 Z",
                "M0,130 Q180,170 360,130 T720,130 Q900,80 1080,130 T1440,130 Q1620,170 1800,130 T2400,130 L2400,200 L0,200 Z",
              ],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
      
      <Group />
      <Frame2 />
    </div>
  );
}

function SearchPage({ onProceed, selectedSchool, onSchoolSelect }: { onProceed: () => void; selectedSchool: string | null; onSchoolSelect: (school: string) => void }) {
  return (
    <div className="bg-white min-h-screen w-full flex justify-center">
      <div className="bg-white w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] min-h-screen flex flex-col" data-name="Page 3">
        <Frame4 />
        <div className="flex-1 flex flex-col justify-between py-[24px] sm:py-[48px]">
          <Frame3 
            onProceed={onProceed} 
            hasSchool={!!selectedSchool} 
            selectedSchool={selectedSchool}
            onSchoolSelect={onSchoolSelect}
          />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"search" | "details" | "services" | "history" | "receipts" | "pay-fees" | "add-services" | "checkout" | "payment" | "processing" | "failed" | "success" | "download-receipt">("search");
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [receiptStudentName, setReceiptStudentName] = useState<string>("");
  const [receiptStudentId, setReceiptStudentId] = useState<string>("");
  const [receiptPaymentData, setReceiptPaymentData] = useState<Record<string, PaymentData[]>>({});
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [checkoutServices, setCheckoutServices] = useState<CheckoutService[]>([]);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [navigationDirection, setNavigationDirection] = useState<'forward' | 'back'>('forward');
  const [showTutorial, setShowTutorial] = useState(false);

  // Check if user has seen tutorial on mount
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setShowTutorial(false);
  };

  // Navigation helper to push to history and update page
  const navigateToPage = (page: typeof currentPage, replaceHistory = false) => {
    setNavigationDirection('forward');
    const state = { page };
    if (replaceHistory) {
      window.history.replaceState(state, '', `#${page}`);
    } else {
      window.history.pushState(state, '', `#${page}`);
    }
    setCurrentPage(page);
  };

  // Initialize history on mount
  useEffect(() => {
    // Check if there's a hash in the URL on initial load
    const hash = window.location.hash.slice(1);
    const validPages = ['search', 'details', 'services', 'history', 'receipts', 'pay-fees', 'add-services', 'checkout', 'payment', 'processing', 'failed', 'success', 'download-receipt'];
    
    if (hash && validPages.includes(hash)) {
      // If there's a valid hash, use it
      window.history.replaceState({ page: hash }, '', `#${hash}`);
      setCurrentPage(hash as typeof currentPage);
    } else {
      // Otherwise, start at search
      window.history.replaceState({ page: 'search' }, '', '#search');
    }

    // Handle browser back/forward buttons and swipe gestures
    const handlePopState = (event: PopStateEvent) => {
      setNavigationDirection('back');
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        // If there's no state, go back to search
        setCurrentPage('search');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Prevent accidental navigation away from app
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only show confirmation if user has navigated beyond search page
      if (currentPage !== 'search' && selectedSchool) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentPage, selectedSchool]);

  // Add a safety entry to history to prevent closing app on back gesture from search
  useEffect(() => {
    if (currentPage === 'search' && window.history.state?.page !== 'search') {
      window.history.pushState({ page: 'search' }, '', '#search');
    }
  }, [currentPage]);

  // Apply 12% zoom for Chrome on Android
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isChromeAndroid = /chrome/.test(userAgent) && /android/.test(userAgent);
    
    if (isChromeAndroid) {
      document.body.style.zoom = '1.12';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.zoom = '1';
    };
  }, []);

  const handleProceed = () => {
    if (selectedSchool) {
      navigateToPage("details");
    }
  };

  const handleProceedToServices = (name: string, phone: string) => {
    setUserName(name);
    setUserPhone(phone);
    navigateToPage("services");
  };

  const handleBackToDetails = () => {
    window.history.back();
  };

  const handleBackToSearch = () => {
    window.history.back();
    setSelectedSchool(null);
  };

  const handleViewHistory = () => {
    navigateToPage("history");
  };

  const handleBackToServices = () => {
    window.history.back();
  };

  const handleViewAllReceipts = (
    studentName: string,
    studentId: string,
    paymentData: Record<string, PaymentData[]>
  ) => {
    setReceiptStudentName(studentName);
    setReceiptStudentId(studentId);
    setReceiptPaymentData(paymentData);
    navigateToPage("receipts");
  };

  const handleBackToHistory = () => {
    window.history.back();
  };

  const handleServiceSelect = (service: string) => {
    console.log("Selected service:", service);
    // Future: Navigate to specific service pages
  };

  const handlePayFees = () => {
    navigateToPage("pay-fees");
  };

  const handleSelectServices = (selectedStudents: string[]) => {
    console.log("Selected students:", selectedStudents);
    setSelectedStudentIds(selectedStudents);
    navigateToPage("add-services");
  };

  const handleBackToPayFees = () => {
    window.history.back();
  };

  const handleNextFromAddServices = () => {
    console.log("Proceeding to next step...");
    window.history.back();
  };

  const handleCheckout = (services: CheckoutService[]) => {
    console.log("Proceeding to checkout with services:", services);
    setCheckoutServices(services);
    navigateToPage("checkout");
  };

  const handleBackToAddServices = () => {
    window.history.back();
  };

  const handleCheckoutProceed = (amount: number) => {
    console.log("Proceeding to payment page with amount:", amount);
    setPaymentAmount(amount);
    navigateToPage("payment");
  };

  const handleBackToCheckout = () => {
    window.history.back();
  };

  const handlePaymentComplete = () => {
    console.log("Processing payment...");
    navigateToPage("processing");
  };

  const handleProcessingComplete = (success: boolean) => {
    if (success) {
      navigateToPage("success", true); // Replace history to prevent going back to processing
    } else {
      navigateToPage("failed", true); // Replace history to prevent going back to processing
    }
  };

  const handleTryAgain = () => {
    window.history.back();
  };

  const handleViewReceiptsFromSuccess = () => {
    navigateToPage("download-receipt");
  };

  const handleDownloadReceipts = () => {
    // PDF generation will be handled in DownloadReceiptPage
    console.log("Download receipts triggered");
  };

  const handleGoHome = () => {
    // Navigate home and clear history stack
    navigateToPage("services", true);
  };

  // Page transition animation variants - direction aware
  const pageVariants = {
    initial: {
      opacity: 0,
      x: navigationDirection === 'forward' ? 100 : -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      x: navigationDirection === 'forward' ? -100 : 100,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {currentPage === "download-receipt" && (
          <motion.div
            key="download-receipt"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <DownloadReceiptPage
              totalAmount={paymentAmount}
              schoolName={selectedSchool || "Twalumbu Educational Center"}
              services={checkoutServices}
              onGoHome={handleGoHome}
            />
          </motion.div>
        )}

        {currentPage === "success" && (
          <motion.div
            key="success"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PaymentSuccessPage
              onViewReceipts={handleViewReceiptsFromSuccess}
            />
          </motion.div>
        )}

        {currentPage === "failed" && (
          <motion.div
            key="failed"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PaymentFailedPage
              onTryAgain={handleTryAgain}
              onBack={handleBackToServices}
            />
          </motion.div>
        )}

        {currentPage === "processing" && (
          <motion.div
            key="processing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ProcessingPage
              onProcessingComplete={handleProcessingComplete}
            />
          </motion.div>
        )}

        {currentPage === "payment" && (
          <motion.div
            key="payment"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PaymentPage
              onBack={handleBackToCheckout}
              onPay={handlePaymentComplete}
              totalAmount={paymentAmount}
            />
          </motion.div>
        )}

        {currentPage === "checkout" && (
          <motion.div
            key="checkout"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CheckoutPage
              services={checkoutServices}
              onBack={handleBackToAddServices}
              onProceed={handleCheckoutProceed}
            />
          </motion.div>
        )}

        {currentPage === "add-services" && (
          <motion.div
            key="add-services"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AddServicesPage
              selectedStudentIds={selectedStudentIds}
              userPhone={userPhone}
              onBack={handleBackToPayFees}
              onNext={handleNextFromAddServices}
              onCheckout={handleCheckout}
            />
          </motion.div>
        )}

        {currentPage === "pay-fees" && (
          <motion.div
            key="pay-fees"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PayForSchoolFees
              onBack={handleBackToServices}
              onSelectServices={handleSelectServices}
              students={getStudentsByPhone(userPhone)}
            />
          </motion.div>
        )}

        {currentPage === "receipts" && (
          <motion.div
            key="receipts"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AllReceipts
              onBack={handleBackToHistory}
              studentName={receiptStudentName}
              studentId={receiptStudentId}
              paymentData={receiptPaymentData}
            />
          </motion.div>
        )}

        {currentPage === "history" && (
          <motion.div
            key="history"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <HistoryPage 
              userName={userName}
              userPhone={userPhone}
              onBack={handleBackToServices}
              onViewAllReceipts={handleViewAllReceipts}
            />
          </motion.div>
        )}

        {currentPage === "services" && (
          <motion.div
            key="services"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ServicesPage 
              userName={userName}
              onBack={handleBackToDetails}
              onSelectService={handleServiceSelect}
              onViewHistory={handleViewHistory}
              onPayFees={handlePayFees}
            />
          </motion.div>
        )}

        {currentPage === "details" && selectedSchool && (
          <motion.div
            key="details"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SchoolDetailsPage 
              schoolName={selectedSchool} 
              onProceed={handleProceedToServices}
              onBack={handleBackToSearch}
            />
          </motion.div>
        )}

        {currentPage === "search" && (
          <motion.div
            key="search"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SearchPage 
              onProceed={handleProceed} 
              selectedSchool={selectedSchool}
              onSchoolSelect={setSelectedSchool}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
      {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}
    </>
  );
}