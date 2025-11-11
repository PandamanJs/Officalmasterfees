import { motion } from "motion/react";
import svgPaths from "../imports/svg-b4tvwhugf4";
import { generateReceiptPDF } from "../utils/pdfGenerator";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./ui/sonner";

interface CheckoutService {
  id: string;
  description: string;
  amount: number;
  invoiceNo: string;
  studentName: string;
}

interface DownloadReceiptPageProps {
  totalAmount: number;
  schoolName: string;
  services?: CheckoutService[];
  onGoHome: () => void;
}

function MasterFeesLogo() {
  return (
    <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-[0]">
      <div className="[grid-area:1_/_1] relative size-[24px] ml-0 mt-[2.535px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="Group 15">
            <path d={svgPaths.p2f27c900} fill="var(--fill-0, #003630)" id="rect84" />
            <path d={svgPaths.p82a2280} id="path60" stroke="var(--stroke-0, #95E36C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
      <p className="[grid-area:1_/_1] font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[normal] ml-[32.63px] mt-0 not-italic text-[20px] text-black w-[136.486px]">master-fees</p>
    </div>
  );
}

export default function DownloadReceiptPage({ 
  totalAmount, 
  schoolName,
  services,
  onGoHome 
}: DownloadReceiptPageProps) {
  // Generate reference number
  const refNumber = `000${Math.floor(Math.random() * 100000000)}`.slice(-12);
  
  // Get current date and time
  const now = new Date();
  const dateTime = now.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  // Generate schedule ID
  const scheduleId = `#${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;

  const handleDownloadReceipt = () => {
    try {
      generateReceiptPDF({
        schoolName,
        totalAmount,
        refNumber,
        dateTime,
        scheduleId,
        services
      });
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download receipt. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="shrink-0 px-6 py-[17px] border-b border-[#e6e6e6]">
        <div className="flex items-center justify-center">
          <MasterFeesLogo />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-[368px] flex flex-col gap-4">
          {/* Success Card */}
          <motion.div 
            className="bg-[#003630] rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-6 pt-6 pb-9 flex flex-col items-center gap-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Success Icon */}
            <motion.div 
              className="overflow-clip relative size-[100px] shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2 
              }}
            >
              <div className="absolute inset-[12.5%]">
                <div className="absolute inset-[-4%]" style={{ "--stroke-0": "rgba(149, 227, 108, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 81 81">
                    <motion.path 
                      d={svgPaths.p3f23eb00} 
                      stroke="var(--stroke-0, #95E36C)" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeInOut"
                      }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            <p className="font-['Inter:Extra_Light',sans-serif] font-extralight leading-[24px] text-[16px] text-white tracking-[-0.16px]">
              Payment Success
            </p>
            <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] text-[32px] text-white tracking-[-0.32px]">
              K{totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </motion.div>

          {/* Payment Details Card */}
          <motion.div 
            className="bg-[#e0f7d4] rounded-[16px] p-6 flex flex-col gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-['Inter:Extra_Light',sans-serif] font-extralight leading-[24px] text-[#003630] text-[16px] tracking-[-0.16px] mb-2">
              Payment Details
            </p>
            
            {/* Ref Number */}
            <div className="flex gap-4 font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] text-[#003630] text-[16px] tracking-[-0.16px]">
              <p className="shrink-0">Ref Number</p>
              <p className="shrink-0">{refNumber}</p>
            </div>

            {/* Payment Status */}
            <div className="flex gap-4 font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] text-[#003630] text-[16px] tracking-[-0.16px]">
              <p className="shrink-0">Payment Status</p>
              <p className="shrink-0">Success</p>
            </div>

            {/* Date & Time */}
            <div className="flex gap-4 font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] text-[#003630] text-[16px] tracking-[-0.16px]">
              <p className="shrink-0">Date & Time</p>
              <p className="shrink-0">{dateTime}</p>
            </div>

            {/* Schedule ID */}
            <div className="flex gap-4 font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[24px] text-[#003630] text-[16px] tracking-[-0.16px]">
              <p className="shrink-0">Schedule ID</p>
              <p className="shrink-0">{scheduleId}</p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col gap-2 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Download Receipts Button */}
            <button
              onClick={handleDownloadReceipt}
              className="bg-[#003630] h-[59px] rounded-[12px] flex items-center justify-center active:scale-[0.98] transition-transform"
            >
              <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[24px] text-[20px] text-white tracking-[-0.2px]">
                Download Receipt
              </p>
            </button>

            {/* Go to Homepage Button */}
            <button
              onClick={onGoHome}
              className="h-[60px] rounded-[10px] border border-black flex items-center justify-center active:scale-[0.98] transition-transform"
            >
              <p className="font-['IBM_Plex_Sans_Devanagari:Light',sans-serif] leading-[24px] text-[16px] text-black tracking-[0px]">
                Go to homepage
              </p>
            </button>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
