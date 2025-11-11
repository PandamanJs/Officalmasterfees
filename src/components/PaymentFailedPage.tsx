import { motion } from "motion/react";
import svgPaths from "../imports/svg-pr0k2pgw9k";
import { ChevronLeft } from "lucide-react";
import imgMasterFeesLogo from "../imports/Frame1707478923-18-800.tsx?url";

interface PaymentFailedPageProps {
  onTryAgain: () => void;
  onBack: () => void;
  failureReason?: string;
}

export default function PaymentFailedPage({ onTryAgain, onBack, failureReason = "Payment could not be processed. Please try again." }: PaymentFailedPageProps) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        {/* Error Icon with Animation */}
        <motion.div 
          className="relative w-[124px] h-[126px] mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          <div className="overflow-clip size-full relative">
            <div className="absolute inset-[4.167%]">
              <div className="absolute inset-0" style={{ "--fill-0": "rgba(149, 227, 108, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114 116">
                  <g>
                    <path d={svgPaths.p1e102200} fill="var(--fill-0, #95E36C)" />
                    <path clipRule="evenodd" d={svgPaths.p3f43b600} fill="var(--fill-0, #95E36C)" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Failed Text */}
        <motion.h2 
          className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[20px] text-[#003630] text-center mb-6 tracking-[-0.2px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Payment Failed
        </motion.h2>

        {/* Failure Reason */}
        <motion.p 
          className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[15px] text-black text-center max-w-[314px] mx-auto leading-[24px] tracking-[-0.15px] mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {failureReason}
        </motion.p>

        {/* Try Again Button */}
        <motion.button
          onClick={onTryAgain}
          className="bg-[#003630] w-full max-w-[308px] h-[59px] rounded-[6px] flex items-center justify-center active:scale-[0.98] transition-transform"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[18px] text-white tracking-[-0.18px] leading-[24px]">
            Try Again
          </p>
        </motion.button>
      </div>
    </div>
  );
}
