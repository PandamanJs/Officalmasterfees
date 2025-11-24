import { useState, useEffect } from "react";
import { motion } from "motion/react";
import svgPaths from "../imports/svg-cw21sj30t4";
import headerSvgPaths from "../imports/svg-co0ktog99f";
import { toast } from "sonner@2.0.3";
import { ChevronDown } from "lucide-react";
import imgTecLogo from "figma:asset/ec5fcf89fe0a77803b7cefd4250b03424564bb63.png";
import chimiluteLogo from "figma:asset/6d180ec5e608f311d21d72a46c32a5b15849c39d.png";
import julaniLogo from "figma:asset/5454374a39c6c82a13d2a4e8bc2ca0899c331fc5.png";
import crestedCraneLogo from "figma:asset/5da21813da6fa21128f400330102b56ec04a15f5.png";
import maarifLogo from "figma:asset/14e103bdb926a80d9f27d93b19086b97e7c47135.png";
import { getLastPhone, saveLastPhone } from "../utils/preferences";
import { PHONE_USER_MAP } from "../data/schoolData";

/**
 * Component Props Interface
 * Defines the contract for this component's API
 */
interface SchoolDetailsPageProps {
  schoolName: string;  // Name of the selected school
  onProceed: (userName: string, userPhone: string) => void;  // Callback when validation succeeds
  onBack: () => void;  // Callback for back navigation
}

/**
 * School Logo Configuration
 * Maps school names to their respective logo image paths
 * 
 * Usage: SCHOOL_LOGOS["School Name"] => image path
 * Format: "School Name": importedImagePath
 */
const SCHOOL_LOGOS: Record<string, string> = {
  "Twalumbu Educational Center": imgTecLogo,
  "Chimilute Trust Academy": chimiluteLogo,
  "Julani School": julaniLogo,
  "Crested Crane Academy": crestedCraneLogo,
  "International Maarif School": maarifLogo,
};

/**
 * Logo Component
 * Renders the Master-Fees diamond checkmark logo in the header
 * 
 * @param {object} props - Component props
 * @param {string} props.schoolName - Name of the selected school (reserved for future use)
 * @returns {JSX.Element} SVG logo with drop shadow filter
 * 
 * Visual: Black diamond with green checkmark stroke
 */
function Logo({ schoolName }: { schoolName: string }) {
  const logoPath = SCHOOL_LOGOS[schoolName];
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

function Header({ onBack, schoolName }: { onBack: () => void; schoolName: string }) {
  return (
    <div className="h-[66px] w-full relative">
      <div aria-hidden="true" className="absolute border-[#e6e6e6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="absolute left-[94px] top-[17px] flex items-center gap-[16px]">
        <Logo schoolName={schoolName} />
        <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[normal] not-italic text-[20px] text-black text-nowrap whitespace-pre">master-fees</p>
      </div>
    </div>
  );
}

function SchoolTitle({ schoolName }: { schoolName: string }) {
  const logoPath = SCHOOL_LOGOS[schoolName];
  
  return (
    <div className="absolute left-1/2 top-[120px] translate-x-[-50%] w-full px-[24px]">
      <div className="flex flex-col gap-[16px] items-center justify-center">
        {/* Dynamic School Logo */}
        {logoPath && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center items-center"
            data-name="School Logo"
          >
            <div className="w-[120px] h-[120px] flex items-center justify-center">
              <img 
                alt={`${schoolName} Logo`} 
                className="max-w-[160px] max-h-[160px] object-contain" 
                src={logoPath} 
              />
            </div>
          </motion.div>
        )}
        
        {/* School Name Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[0px] text-black text-center w-full max-w-[340px]"
        >
          <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] mb-0 text-[12px]">Pay School fees for</p>
          <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[24px] leading-[32px]">{schoolName}</p>
        </motion.div>
      </div>
    </div>
  );
}

const COUNTRY_CODES = [
  { code: "+260", country: "ZM", name: "Zambia" },
  { code: "+254", country: "KE", name: "Kenya" },
  { code: "+255", country: "TZ", name: "Tanzania" },
  { code: "+256", country: "UG", name: "Uganda" },
  { code: "+27", country: "ZA", name: "South Africa" },
  { code: "+234", country: "NG", name: "Nigeria" },
  { code: "+233", country: "GH", name: "Ghana" },
];

interface TextInputProps {
  onValidationChange: (isValid: boolean, phone: string, userName: string) => void;
}

function TextInput({ onValidationChange }: TextInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [countryCode, setCountryCode] = useState("+260");

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");
    
    // Format as user types: XXX-XXX-XXX (9 digits)
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setInputValue(formatted);
    // Reset validation when user types
    onValidationChange(false, formatted, "");
  };

  const validatePhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    
    // Check if phone number is empty
    if (cleaned.length === 0) {
      toast.error("Phone number required", {
        description: "Please enter a valid phone number to proceed.",
        duration: 3000,
      });
      return false;
    }
    
    // Check if phone number is exactly 9 digits
    if (cleaned.length !== 9) {
      toast.error("Invalid phone number", {
        description: "Phone number must be exactly 9 digits.",
        duration: 3000,
      });
      return false;
    }
    
    // Simulate checking if number exists in system
    // In real implementation, this would be an API call
    const userName = PHONE_USER_MAP[cleaned];
    if (!userName) {
      toast.error("Number not found", {
        description: "This phone number is not registered in our system. Please check and try again.",
        duration: 4000,
        action: {
          label: "Contact Support",
          onClick: () => console.log("Contact support clicked"),
        },
      });
      return null;
    }
    
    return userName;
  };

  const handleBlur = () => {
    if (inputValue) {
      const userName = validatePhoneNumber(inputValue);
      if (userName) {
        // Save phone number to localStorage on successful validation
        saveLastPhone(inputValue.replace(/\D/g, ""));
      }
      onValidationChange(!!userName, inputValue, userName || "");
    }
  };

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="bg-white relative rounded-[10px] w-full h-[50px]" data-name="Text Input">
        <div aria-hidden="true" className="absolute border-[#003049] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="size-full">
          <div className="box-border flex items-center gap-[8px] p-[12px] size-full">
            {/* Country Code Selector */}
            <div className="relative flex-shrink-0">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="appearance-none bg-transparent border-none outline-none font-['IBM_Plex_Sans:Regular',sans-serif] text-[14px] text-black pr-[20px] cursor-pointer touch-manipulation"
                style={{ WebkitAppearance: "none" }}
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-black opacity-60" />
            </div>
            
            {/* Separator */}
            <div className="h-[24px] w-[1px] bg-[rgba(45,54,72,0.2)] flex-shrink-0" />
            
            {/* Phone Input */}
            <input
              type="tel"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="977-123-456"
              maxLength={11}
              className="flex-1 bg-transparent border-none outline-none font-['IBM_Plex_Sans:Regular',sans-serif] text-[14px] text-black placeholder:text-[rgba(45,54,72,0.44)] tracking-[-0.14px] touch-manipulation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputSectionProps {
  onValidationChange: (isValid: boolean, phone: string, userName: string) => void;
}

function InputSection({ onValidationChange }: InputSectionProps) {
  return (
    <div className="absolute left-[48px] top-[318px] w-[297px]">
      <div className="flex flex-col gap-[12px] items-center">
        <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[normal] not-italic text-[12px] text-black text-center w-full">
          Enter your registered phone number or the Student ID number to proceed.
        </p>
        <TextInput onValidationChange={onValidationChange} />
      </div>
    </div>
  );
}

interface ProceedButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function ProceedButton({ onClick, disabled }: ProceedButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="absolute bg-[#003630] box-border flex gap-[8px] h-[48px] items-center justify-center left-[48px] overflow-clip px-[24px] py-[10px] rounded-[12px] top-[433px] w-[297px] shadow-[0px_4px_0px_0px_rgba(0,54,48,0.25)] active:shadow-[0px_1px_0px_0px_rgba(0,54,48,0.25)] active:translate-y-[3px] transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0px_4px_0px_0px_rgba(0,54,48,0.25)]" 
      data-name="Button"
    >
      <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] leading-[24px] not-italic text-[16px] text-nowrap text-white tracking-[-0.16px] whitespace-pre">Proceed</p>
    </button>
  );
}

function Footer() {
  return (
    <div className="absolute flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] gap-[3px] items-center leading-[normal] left-[105px] not-italic text-[#bdbdbd] text-[10px] text-center top-[502px] w-[183px]">
      <p className="w-full whitespace-pre-wrap">
        <span>{`view the `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">terms</span>
        <span>{` and `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">conditions</span>
        <span>{`  of service`}</span>
      </p>
      <p className="w-full">All rights reserved ©</p>
    </div>
  );
}

function DecorativeShapes() {
  return (
    <>
      <motion.div 
        className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.6466665863990784)+(var(--transform-inner-height)*0.7384596467018127)))] items-center justify-center left-[11px] top-[683.17px] w-[calc(1px*((var(--transform-inner-height)*0.6742976903915405)+(var(--transform-inner-width)*0.762772798538208)))]" 
        style={{ "--transform-inner-width": "115.9375", "--transform-inner-height": "57.9375" } as React.CSSProperties}
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
        <div className="flex-none rotate-[40.291deg] skew-x-[357.893deg]">
          <div className="h-[57.948px] relative w-[115.938px]" data-name="path60">
            <div className="absolute inset-[-30.2%_-15.09%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 151 93">
                <motion.path 
                  d={svgPaths.p36f25d00} 
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
        className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.6466665863990784)+(var(--transform-inner-height)*0.7384596467018127)))] items-center justify-center left-[49px] top-[587.77px] w-[calc(1px*((var(--transform-inner-height)*0.6742976903915405)+(var(--transform-inner-width)*0.762772798538208)))]" 
        style={{ "--transform-inner-width": "150.375", "--transform-inner-height": "92.234375" } as React.CSSProperties}
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
        <div className="flex-none rotate-[40.291deg] skew-x-[357.893deg]">
          <div className="h-[92.235px] relative w-[150.386px]" data-name="path60 (Stroke)">
            <div className="absolute inset-[-1.63%_-1%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 154 96">
                <motion.path 
                  d={svgPaths.p24f69200} 
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
        className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.6466665863990784)+(var(--transform-inner-height)*0.7384596467018127)))] items-center justify-center left-[144px] top-[734.24px] w-[calc(1px*((var(--transform-inner-height)*0.6742976903915405)+(var(--transform-inner-width)*0.762772798538208)))]" 
        style={{ "--transform-inner-width": "115.9375", "--transform-inner-height": "57.9375" } as React.CSSProperties}
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
        <div className="flex-none rotate-[40.291deg] skew-x-[357.893deg]">
          <div className="h-[57.948px] relative w-[115.938px]" data-name="path60">
            <div className="absolute inset-[-30.2%_-15.09%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 151 93">
                <motion.path 
                  d={svgPaths.p36f25d00} 
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

export default function SchoolDetailsPage({ schoolName, onProceed, onBack }: SchoolDetailsPageProps) {
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");

  const handleValidationChange = (isValid: boolean, phone: string, name: string) => {
    setIsPhoneValid(isValid);
    setPhoneNumber(phone);
    setUserName(name);
  };

  const handleProceedClick = () => {
    if (isPhoneValid && userName) {
      onProceed(userName, phoneNumber);
    } else {
      toast.error("Validation required", {
        description: "Please enter and validate your phone number first.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex justify-center">
      <div className="bg-white relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen overflow-hidden" data-name="Page 1">
        <Header onBack={onBack} schoolName={schoolName} />
        <SchoolTitle schoolName={schoolName} />
        <InputSection onValidationChange={handleValidationChange} />
        <ProceedButton onClick={handleProceedClick} disabled={!isPhoneValid} />
        <Footer />
        <DecorativeShapes />
      </div>
    </div>
  );
}