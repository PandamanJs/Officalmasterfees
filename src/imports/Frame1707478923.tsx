import { ChevronDown } from "lucide-react";
import { detectNetwork, getNetworkInfo } from "../utils/networkDetection";

interface ExpandedMobileMoneyProps {
  mobileNumber: string;
  onMobileNumberChange: (value: string) => void;
  onCollapse: () => void;
}

export default function ExpandedMobileMoney({ 
  mobileNumber, 
  onMobileNumberChange, 
  onCollapse 
}: ExpandedMobileMoneyProps) {
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
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
    onMobileNumberChange(formatted);
  };

  // Detect network from current mobile number
  const networkInfo = getNetworkInfo(mobileNumber);
  const hasNetwork = networkInfo.name !== null;

  return (
    <div className="bg-white border border-[#003630] rounded-[12px] p-[16px] w-full">
      <button
        onClick={onCollapse}
        className="w-full flex items-center justify-between mb-[12px] touch-manipulation"
      >
        <div className="flex items-center gap-[10px]">
          <div className="size-[20px] flex items-center justify-center">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
              <path d="M13.25 1.75H4.25C2.59315 1.75 1.25 3.09315 1.25 4.75V17.25C1.25 18.9069 2.59315 20.25 4.25 20.25H13.25C14.9069 20.25 16.25 18.9069 16.25 17.25V4.75C16.25 3.09315 14.9069 1.75 13.25 1.75Z" stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M10.75 4.25H6.75" stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[16px] text-black tracking-[-0.16px]">
            Mobile Money
          </p>
        </div>
        <ChevronDown className="w-5 h-5 text-black transform rotate-180" />
      </button>
      
      <div className="flex flex-col gap-[8px]">
        <label className="font-['IBM_Plex_Sans:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.64)]">
          Mobile Number
        </label>
        <div className="relative">
          <div className="flex items-center gap-[8px] bg-white border border-[#003049] rounded-[10px] p-[12px]">
            <select
              className="appearance-none bg-transparent border-none outline-none font-['IBM_Plex_Sans:Regular',sans-serif] text-[14px] text-black pr-[20px] cursor-pointer touch-manipulation"
              defaultValue="+260"
            >
              <option value="+260">+260</option>
              <option value="+254">+254</option>
              <option value="+255">+255</option>
              <option value="+256">+256</option>
            </select>
            <div className="h-[24px] w-[1px] bg-[rgba(45,54,72,0.2)]" />
            <input
              type="tel"
              value={mobileNumber}
              onChange={handleInputChange}
              placeholder="977-123-456"
              maxLength={11}
              className="flex-1 bg-transparent border-none outline-none font-['IBM_Plex_Sans:Regular',sans-serif] text-[14px] text-black placeholder:text-[rgba(45,54,72,0.44)] tracking-[-0.14px] touch-manipulation"
            />
          </div>
        </div>
        
        {/* Network Detection Badge */}
        {hasNetwork && (
          <div className="flex items-center gap-[8px] mt-[4px]">
            <div 
              className="px-[12px] py-[6px] rounded-[8px] flex items-center gap-[6px]"
              style={{ 
                backgroundColor: `${networkInfo.color}15`,
                border: `1px solid ${networkInfo.color}40`
              }}
            >
              <div 
                className="w-[8px] h-[8px] rounded-full"
                style={{ backgroundColor: networkInfo.color }}
              />
              <span 
                className="font-['IBM_Plex_Sans:Medium',sans-serif] text-[12px] tracking-[-0.12px]"
                style={{ color: networkInfo.color }}
              >
                {networkInfo.name}
              </span>
            </div>
            <span className="font-['IBM_Plex_Sans:Regular',sans-serif] text-[11px] text-[rgba(0,0,0,0.5)]">
              Network detected
            </span>
          </div>
        )}
      </div>
    </div>
  );
}