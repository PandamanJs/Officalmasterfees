import { motion } from "motion/react";
import svgPaths from "../imports/svg-lclw20i5rd";
import { ChevronRight } from "lucide-react";

interface PaymentSuccessPageProps {
  onViewReceipts: () => void;
}

function IconRightWrapper() {
  return (
    <div className="h-[24px] relative shrink-0 w-[16px]" data-name="Icon Right Wrapper">
      <div className="overflow-clip size-[24px]" data-name="Icon Right">
        <div className="absolute inset-[16.667%]" data-name="Shape">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p17e0ef80} fill="var(--fill-0, white)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage({ onViewReceipts }: PaymentSuccessPageProps) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Success Icon with Animation */}
        <motion.div 
          className="relative w-[147px] h-[147px] mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
        >
          <div className="overflow-clip size-full" data-name="Warning / Circle_Check">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <div className="absolute inset-[-2.721%]" style={{ "--stroke-0": "rgba(149, 227, 108, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 117 117">
                  <motion.path 
                    d={svgPaths.p3da97880} 
                    id="Vector" 
                    stroke="var(--stroke-0, #95E36C)" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.p 
          className="font-['Inter:Regular',sans-serif] leading-[24px] text-[15px] text-black text-center tracking-[-0.15px] max-w-[314px] mx-auto mb-9"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Payment Successfully made
        </motion.p>

        {/* View Receipts Button */}
        <motion.button
          onClick={onViewReceipts}
          className="bg-[#003630] flex gap-[8px] h-[59px] items-center justify-center overflow-clip px-[24px] py-[10px] rounded-[6px] w-full max-w-[308px] active:scale-[0.98] transition-transform"
          data-name="Button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-['Inter:Medium',sans-serif] leading-[24px] text-[18px] text-nowrap text-white tracking-[-0.18px]">
            View Receipt
          </p>
          <IconRightWrapper />
        </motion.button>
      </div>
    </div>
  );
}
