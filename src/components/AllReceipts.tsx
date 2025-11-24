import { motion } from "motion/react";
import svgPaths from "../imports/svg-4boykq1z8d";
import pathSvgPaths from "../imports/svg-d7byi594ix";
import pathStrokeSvgPaths from "../imports/svg-zrcfpc6p5c";
import { generateReceiptPDF } from "../utils/pdfGenerator";
import { toast } from "sonner@2.0.3";
import { Download } from "lucide-react";
import { Toaster } from "./ui/sonner";

export interface PaymentData {
  date: string;
  day: string;
  title: string;
  subtitle: string;
  amount: string;
}

interface AllReceiptsProps {
  onBack: () => void;
  studentName?: string;
  studentId?: string;
  paymentData?: Record<string, PaymentData[]>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="overflow-clip relative shrink-0 size-[24px] touch-manipulation active:opacity-70 transition-opacity"
      data-name="icon-x"
    >
      <div className="absolute inset-[20.833%]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p371efd00} fill="var(--fill-0, #2D3648)" id="Shape" />
        </svg>
      </div>
    </button>
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

function Header({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative size-full">
      <div aria-hidden="true" className="absolute border-[#e6e6e6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="absolute left-[94px] top-[17px] flex items-center gap-[16px]">
        <Logo />
        <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[normal] not-italic text-[20px] text-black text-nowrap whitespace-pre">master-fees</p>
      </div>
    </div>
  );
}

interface ReceiptCardProps {
  title: string;
  studentInfo: string;
  amount: string;
  date: string;
  hasTopBorder?: boolean;
  receiptNumber: string;
  schoolName: string;
}

function ReceiptCard({ title, studentInfo, amount, date, hasTopBorder, receiptNumber, schoolName }: ReceiptCardProps) {
  const handleDownload = () => {
    try {
      // Parse amount - remove "K" prefix and parse as number
      const amountValue = parseFloat(amount.replace('K', '').replace(/,/g, ''));
      
      // Generate a reference number from receipt number
      const refNumber = `000${receiptNumber}`.slice(-12);
      
      // Use the date from the card
      const dateTime = date;
      
      // Generate schedule ID
      const scheduleId = `#${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
      
      generateReceiptPDF({
        schoolName,
        totalAmount: amountValue,
        refNumber,
        dateTime,
        scheduleId,
        services: [{
          id: '1',
          description: title.split(' - ')[0],
          amount: amountValue,
          invoiceNo: receiptNumber,
          studentName: studentInfo.split(' - ')[0]
        }]
      });
      
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download receipt. Please try again.");
    }
  };

  return (
    <div className="bg-[rgba(255,255,255,0.1)] w-full border border-[#fff8f8] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] relative">
      {hasTopBorder && (
        <div className="absolute left-0 top-0 w-full h-[2px] bg-[#003630]" />
      )}
      <div className="p-[16px] relative">
        <div className="flex justify-between items-start mb-[16px]">
          <div className="flex-1">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[15px] leading-[1.4] text-[#003630] mb-[6px]">
              {title}
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[1.4] text-[#003630] mb-[6px]">
              {studentInfo}
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[1.5] text-[#003630] tracking-[-0.12px]">
              {amount}
            </p>
          </div>
          <button 
            onClick={handleDownload}
            className="box-border flex gap-[6px] items-center justify-center overflow-clip px-[12px] py-[8px] rounded-[6px] hover:bg-[#f5f4f7] active:bg-[#e5e4e7] transition-colors touch-manipulation"
          >
            <Download className="w-3 h-3 text-[#003630]" />
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[24px] text-[#003630] tracking-[-0.12px] whitespace-nowrap">
              Download
            </p>
          </button>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[1.5] text-[#003630] tracking-[-0.12px]">
          {date}
        </p>
      </div>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wavy water effect */}
      <motion.div
        className="absolute w-[200%] h-[200%] opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(149, 227, 108, 0.3) 0%, transparent 50%)",
        }}
        animate={{
          x: ["-25%", "-15%", "-25%"],
          y: ["-25%", "-15%", "-25%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[200%] h-[200%] opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0, 54, 48, 0.2) 0%, transparent 50%)",
        }}
        animate={{
          x: ["-15%", "-25%", "-15%"],
          y: ["-15%", "-25%", "-15%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating path shapes */}
      <motion.div
        className="absolute w-[120px] h-[80px]"
        style={{ top: "15%", left: "5%" }}
        animate={{
          y: [0, -60, 30, -40, 0],
          x: [0, 50, -20, 40, 0],
          rotate: [0, 25, -15, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative size-full" data-name="path60">
          <div className="absolute inset-[-30.2%_-15.09%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 151 93">
              <path d={pathSvgPaths.p36f25d00} stroke="#E0F7D4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.67" strokeWidth="35" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute w-[140px] h-[90px]"
        style={{ top: "55%", right: "5%" }}
        animate={{
          y: [0, 70, -30, 50, 0],
          x: [0, -60, 25, -45, 0],
          rotate: [0, -30, 20, -25, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative size-full" data-name="path60 (Stroke)">
          <div className="absolute inset-[-1.63%_-1%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 154 96">
              <path d={pathStrokeSvgPaths.p24f69200} stroke="#003630" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.03" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute w-[100px] h-[70px]"
        style={{ bottom: "20%", left: "10%" }}
        animate={{
          y: [0, -50, 20, -35, 0],
          x: [0, 40, -30, 35, 0],
          rotate: [0, 18, -12, 15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative size-full" data-name="path60">
          <div className="absolute inset-[-30.2%_-15.09%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 151 93">
              <path d={pathSvgPaths.p36f25d00} stroke="#E0F7D4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="35" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute w-[110px] h-[75px]"
        style={{ top: "40%", left: "60%" }}
        animate={{
          y: [0, -45, 35, -30, 0],
          x: [0, -50, 30, -40, 0],
          rotate: [0, -22, 15, -18, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative size-full" data-name="path60 (Stroke)">
          <div className="absolute inset-[-1.63%_-1%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 154 96">
              <path d={pathStrokeSvgPaths.p24f69200} stroke="#003630" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.05" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AllReceipts({ 
  onBack, 
  studentName = "Isaiah Kapambwe",
  studentId = "C20012",
  paymentData = {}
}: AllReceiptsProps) {
  const schoolName = "Twalumbu Educational Center";
  // Helper function to extract receipt number from subtitle
  const extractReceiptNumber = (subtitle: string): string => {
    const match = subtitle.match(/Receipt No\.\s*(\d+)/);
    return match ? match[1] : "0000";
  };

  // Helper function to format date from year-month key and day
  const formatDate = (monthKey: string, day: string): string => {
    const [year, month] = monthKey.split('-');
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  // Helper function to get month name
  const getMonthName = (monthKey: string): string => {
    const [year, month] = monthKey.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Sort month keys in descending order (newest first)
  const sortedMonthKeys = Object.keys(paymentData).sort((a, b) => {
    const [yearA, monthA] = a.split('-').map(Number);
    const [yearB, monthB] = b.split('-').map(Number);
    if (yearA !== yearB) return yearB - yearA;
    return monthB - monthA;
  });

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden flex items-center justify-center" data-name="All Receipts">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] min-h-screen mx-auto">
        {/* Header */}
        <div className="relative h-[60px] w-full">
          <Header onBack={onBack} />
        </div>

        {/* Content */}
        <div className="relative px-[16px] py-[24px] overflow-y-auto bg-white" style={{ height: 'calc(100vh - 60px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-[800px] mx-auto pb-[40px] relative z-10"
          >
            <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[24px] leading-[24px] text-[#003630] tracking-[-0.24px] text-center mb-[8px]">
              Payment receipts
            </h1>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[15px] leading-[1.5] text-[#003630] tracking-[-0.15px] text-center mb-[24px]">
              Download the receipts
            </p>

            {sortedMonthKeys.length === 0 ? (
              <div className="text-center py-[40px]">
                <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#003630] opacity-60">
                  No payment receipts available
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-[24px]">
                {sortedMonthKeys.map((monthKey, monthIndex) => {
                  const payments = paymentData[monthKey];
                  
                  // Skip empty months
                  if (!payments || payments.length === 0) return null;

                  return (
                    <motion.div
                      key={monthKey}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: monthIndex * 0.05 }}
                    >
                      {/* Month Header */}
                      <h2 className="font-['Inter:SemiBold',sans-serif] text-[16px] text-[#003630] mb-[12px] px-[4px]">
                        {getMonthName(monthKey)}
                      </h2>

                      {/* Receipts for this month */}
                      <div className="flex flex-col gap-0">
                        {payments.map((payment, paymentIndex) => {
                          const receiptNumber = extractReceiptNumber(payment.subtitle);
                          const formattedDate = formatDate(monthKey, payment.day);
                          
                          return (
                            <ReceiptCard
                              key={`${monthKey}-${paymentIndex}`}
                              title={`${payment.title.replace('Paid ', '')} - Receipt No. ${receiptNumber}`}
                              studentInfo={`${studentName} - ${studentId}`}
                              amount={payment.amount}
                              date={formattedDate}
                              hasTopBorder={paymentIndex === 0 && monthIndex === 0}
                              receiptNumber={receiptNumber}
                              schoolName={schoolName}
                            />
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}