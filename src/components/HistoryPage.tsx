import { motion } from "motion/react";
import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-g99px4v16h";
import headerSvgPaths from "../imports/svg-co0ktog99f";
import pathSvgPaths from "../imports/svg-d7byi594ix";
import pathStrokeSvgPaths from "../imports/svg-zrcfpc6p5c";
import treeSvgPaths from "../imports/svg-e66apwwrzk";
import { getStudentsByPhone } from "../data/students";
import { generateReceiptPDF } from "../utils/pdfGenerator";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./ui/sonner";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export interface PaymentReceipt {
  date: string;
  day: string;
  receiptNo: string;
  paymentMethod: string;
  amount: string;
  balanceAfter: string;
}

export interface PaymentData {
  date: string;
  day: string;
  title: string;
  subtitle: string;
  amount: string;
  invoiceNo?: string;
  termInfo?: string;
  currentBalance?: string;
  receipts?: PaymentReceipt[];
}

interface HistoryPageProps {
  userName: string;
  userPhone: string;
  onBack: () => void;
  onViewAllReceipts?: (studentName: string, studentId: string, paymentData: Record<string, PaymentData[]>) => void;
}

function Logo() {
  return (
    <div className="size-[31px]">
      <div className="relative size-full">
        <div className="absolute bottom-[-22.63%] left-[-9.72%] right-[-9.72%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 39">
            <g id="Group 15">
              <g filter="url(#filter0_d_2_352)" id="rect84">
                <path d={headerSvgPaths.p24506700} fill="var(--fill-0, #003630)" />
                <path d={headerSvgPaths.p24506700} stroke="var(--stroke-0, white)" strokeWidth="3" />
              </g>
              <g id="path60">
                <path d={headerSvgPaths.p8fdf600} fill="var(--fill-0, #003630)" />
                <path d={headerSvgPaths.p8fdf600} stroke="var(--stroke-0, #95E36C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
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

function MenuMoreVertical({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`${className} cursor-pointer touch-manipulation active:opacity-60 transition-opacity`} 
      data-name="Menu / More_Vertical"
      aria-label="More options"
    >
      <div className="absolute inset-[20.83%_45.83%]" data-name="Vector">
        <div className="absolute inset-[-2.14%_-15%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 13">
            <g id="Vector">
              <path d={svgPaths.p1533b880} fill="var(--fill-0, #2D3648)" />
              <path d={svgPaths.p2de19e00} fill="var(--fill-0, #2D3648)" />
              <path d={svgPaths.p2b40bf80} fill="var(--fill-0, #2D3648)" />
              <path d={svgPaths.p1533b880} stroke="var(--stroke-0, #2D3648)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
              <path d={svgPaths.p2de19e00} stroke="var(--stroke-0, #2D3648)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
              <path d={svgPaths.p2b40bf80} stroke="var(--stroke-0, #2D3648)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
      </div>
    </button>
  );
}

function ChildPill({ name, id, isActive, onClick }: { name: string; id: string; isActive: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`${isActive ? 'bg-[#95e36c]' : 'bg-[#edf0f7]'} rounded-[6px] px-[24px] py-[10px] cursor-pointer touch-manipulation active:opacity-80 transition-opacity flex-shrink-0`}
    >
      <div className={`font-['Inter:${isActive ? 'Medium' : 'Extra_Light'},sans-serif] ${isActive ? 'font-medium' : 'font-extralight'} leading-[15px] text-[10px] tracking-[-0.1px] ${isActive ? 'text-[#003630]' : 'text-[#2d3648]'}`}>
        <p className="mb-0">{name}</p>
        <p>{id}</p>
      </div>
    </button>
  );
}

function PaymentPopup({ 
  onClose, 
  onViewReceipt,
  paymentData
}: { 
  onClose: () => void; 
  onViewReceipt: () => void;
  paymentData?: {
    title: string;
    subtitle: string;
    amount: string;
    studentName: string;
    studentId: string;
  };
}) {
  const handleDownloadReceipt = () => {
    if (!paymentData) {
      toast.error("Payment data not available");
      return;
    }

    try {
      // Extract receipt number from subtitle
      const receiptNumberMatch = paymentData.subtitle.match(/Receipt No\\.\\s*(\d+)/);
      const receiptNumber = receiptNumberMatch ? receiptNumberMatch[1] : "0000";
      
      // Parse amount - remove "K" prefix and parse as number
      const amountValue = parseFloat(paymentData.amount.replace('K', '').replace(/,/g, ''));
      
      // Generate a reference number from receipt number
      const refNumber = `000${receiptNumber}`.slice(-12);
      
      // Generate current date and time
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
      
      generateReceiptPDF({
        schoolName: "Twalumbu Educational Center",
        totalAmount: amountValue,
        refNumber,
        dateTime,
        scheduleId,
        services: [{
          id: '1',
          description: paymentData.title.replace('Paid ', ''),
          amount: amountValue,
          invoiceNo: receiptNumber,
          studentName: `${paymentData.studentName} - ${paymentData.studentId}`
        }]
      });
      
      toast.success("Receipt downloaded successfully!");
      onClose();
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download receipt. Please try again.");
    }
  };
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Popup */}
      <motion.div 
        className="fixed z-50 w-[200px]"
        style={{ 
          right: '40px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-white relative rounded-[10px] w-full">
          <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(139,144,154,0.37)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
          <div className="w-full">
            <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[10px] relative w-full">
              <button 
                onClick={onViewReceipt}
                className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative w-full hover:bg-[#f5f5f5] active:bg-[#e5e5e5] transition-colors cursor-pointer touch-manipulation rounded-[6px]"
              >
                <div className="basis-0 flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#23272e] text-[12px]">
                  <p className="leading-[22px]">View payment Receipt</p>
                </div>
              </button>
              
              <button
                onClick={handleDownloadReceipt}
                className="relative rounded-[6px] shrink-0 w-full hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
              >
                <div className="flex flex-row items-center w-full">
                  <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative w-full">
                    <div className="basis-0 flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#23272e] text-[12px]">
                      <p className="leading-[22px]">Download Receipt</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function PaymentItem({ 
  date, 
  day, 
  title, 
  subtitle, 
  amount,
  onMenuClick,
  termInfo,
  currentBalance,
}: { 
  date: string; 
  day: string; 
  title: string; 
  subtitle: string; 
  amount: string;
  onMenuClick?: () => void;
  termInfo?: string;
  currentBalance?: string;
}) {
  return (
    <div className="flex items-center justify-between w-full px-[12px] py-[10px]">
      <div className="flex flex-col gap-[2px] items-center size-[18px] shrink-0">
        <div className="font-['Inter:Light',sans-serif] h-[8px] text-[8px] tracking-[-0.08px] text-black leading-[15px]">
          {date}
        </div>
        <div className="font-['Inter:Medium',sans-serif] h-[8px] text-[12px] tracking-[-0.12px] text-black leading-[15px]">
          {day}
        </div>
      </div>
      <div className="flex gap-[20px] items-start flex-1 ml-[12px]">
        <div className="flex flex-col gap-[2px] flex-1">
          <div className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[14px] text-black tracking-[-0.14px] leading-[15px]">
            {title}
          </div>
          {termInfo && currentBalance ? (
            <div className="flex gap-[10px] font-['Inter:Medium',sans-serif] text-[8px] text-neutral-900 tracking-[-0.08px] leading-[15px]">
              <span>{termInfo}</span>
              <span>{currentBalance}</span>
            </div>
          ) : (
            <div className="font-['Inter:Medium',sans-serif] text-[8px] text-[#a7aaa7] tracking-[-0.08px] leading-[15px]">
              {subtitle}
            </div>
          )}
        </div>
        <div className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[14px] text-black tracking-[-0.14px] leading-[15px] whitespace-nowrap">
          {amount}
        </div>
        <MenuMoreVertical className="overflow-clip relative shrink-0 size-[20px]" onClick={onMenuClick} />
      </div>
    </div>
  );
}

function PaymentReceiptItem({
  date,
  day,
  receiptNo,
  paymentMethod,
  amount,
  balanceAfter,
  onMenuClick,
}: {
  date: string;
  day: string;
  receiptNo: string;
  paymentMethod: string;
  amount: string;
  balanceAfter: string;
  onMenuClick?: () => void;
}) {
  return (
    <div className="flex gap-[4px] items-end w-full">
      {/* Tree connector line */}
      <div className="h-[57px] relative shrink-0 w-[42px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 57">
          <g id="Frame 1707478934">
            <path d="M10 12V45H32" id="Vector 1" stroke="var(--stroke-0, black)" />
          </g>
        </svg>
      </div>

      {/* Receipt content */}
      <div className="flex gap-[19px] items-center flex-1">
        <div className="flex flex-col gap-[2px] items-center size-[18px] shrink-0">
          <div className="font-['Inter:Light',sans-serif] h-[8px] text-[8px] tracking-[-0.08px] text-black leading-[15px]">
            {date}
          </div>
          <div className="font-['Inter:Medium',sans-serif] h-[8px] text-[12px] tracking-[-0.12px] text-black leading-[15px]">
            {day}
          </div>
        </div>

        <div className="flex gap-[23px] items-start flex-1">
          <div className="flex flex-col gap-[2px] flex-1">
            <div className="font-['IBM_Plex_Sans_Devanagari:Light',sans-serif] text-[10px] text-black tracking-[-0.1px] leading-[15px]">
              {receiptNo} - {paymentMethod}
            </div>
            <div className="font-['Inter:Light',sans-serif] text-[8px] text-neutral-900 tracking-[-0.08px] leading-[15px]">
              Balance after payment: {balanceAfter}
            </div>
          </div>
          <div className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[12px] text-black tracking-[-0.12px] leading-[15px] whitespace-nowrap">
            {amount}
          </div>
          <MenuMoreVertical className="overflow-clip relative shrink-0 size-[20px]" onClick={onMenuClick} />
        </div>
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

export default function HistoryPage({ userName, userPhone, onBack, onViewAllReceipts }: HistoryPageProps) {
  // Get students for the logged-in parent based on their phone number
  const studentData = getStudentsByPhone(userPhone);
  const students = studentData.map(s => ({ name: s.name, id: s.id }));
  
  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || "C20012");
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);
  const [allPaymentData, setAllPaymentData] = useState<Record<string, Record<string, PaymentData[]>>>({});
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch payment history from backend
   * Transforms backend data into UI-friendly format
   */
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!userPhone) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f6550ac6/payments/${userPhone}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${publicAnonKey}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          console.error("Failed to fetch payment history:", result);
          // Load demo data if backend fails
          setAllPaymentData(getDemoPaymentData());
          setIsLoading(false);
          return;
        }

        // Transform backend payment data to UI format
        const groupedData: Record<string, Record<string, PaymentData[]>> = {};

        result.payments.forEach((payment: any) => {
          const date = new Date(payment.timestamp);
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayOfMonth = date.getDate().toString();
          const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

          // Group services by student ID
          payment.services.forEach((service: any) => {
            // Extract student ID from service (assuming format "StudentName - StudentID")
            const studentId = payment.studentId || "Unknown";
            
            if (!groupedData[studentId]) {
              groupedData[studentId] = {};
            }
            
            if (!groupedData[studentId][monthKey]) {
              groupedData[studentId][monthKey] = [];
            }

            // Create payment entry
            const paymentEntry: PaymentData = {
              date: dayOfWeek,
              day: dayOfMonth,
              title: `Paid ${service.description}`,
              subtitle: `Receipt No. ${service.invoiceNo}`,
              amount: `K${service.amount.toLocaleString()}`,
            };

            groupedData[studentId][monthKey].push(paymentEntry);
          });
        });

        // Merge with demo data to show examples
        const mergedData = { ...getDemoPaymentData(), ...groupedData };
        setAllPaymentData(mergedData);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        // Load demo data on error
        setAllPaymentData(getDemoPaymentData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [userPhone]);

  const handleViewReceipt = () => {
    setOpenPopupId(null);
    if (onViewAllReceipts) {
      const currentStudent = students.find(s => s.id === selectedStudentId);
      const studentName = currentStudent?.name || "Student";
      const studentPayments = allPaymentData[selectedStudentId] || {};
      onViewAllReceipts(studentName, selectedStudentId, studentPayments);
    }
  };

  // Get current date and calculate last 3 months
  const getLastThreeMonths = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });
      const year = date.getFullYear();
      const isCurrentMonth = i === 0;
      
      months.push({
        key: `${year}-${date.getMonth()}`,
        label: isCurrentMonth ? 'This Month' : `${monthName} ${year}`,
        month: date.getMonth(),
        year: year,
      });
    }
    
    return months;
  };

  const paymentsByMonth = allPaymentData[selectedStudentId] || {};

  const lastThreeMonths = getLastThreeMonths();

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] min-h-screen mx-auto">
        
        {/* Header */}
        <div className="relative h-[60px] w-full">
          <Header onBack={onBack} />
        </div>

        {/* Content */}
        <div className="relative px-[21px] pt-[53px]">
          {/* Title */}
          <h1 className="font-['Inter:Regular',sans-serif] text-[18px] text-black tracking-[-0.18px] leading-[0.5] mb-[35px]">
            Payment History
          </h1>

          {/* Child Pills */}
          <div className="flex gap-[15px] mb-[25px] overflow-x-auto overflow-y-hidden scrollbar-hide -mx-[21px] px-[21px] pb-[5px] touch-pan-x">
            {students.map((student) => (
              <ChildPill 
                key={student.id}
                name={student.name} 
                id={student.id} 
                isActive={selectedStudentId === student.id}
                onClick={() => setSelectedStudentId(student.id)}
              />
            ))}
          </div>

          {/* Dynamic Month Sections */}
          {lastThreeMonths.map((month) => {
            const payments = paymentsByMonth[month.key] || [];
            const hasPayments = payments.length > 0;

            return (
              <div key={month.key} className="mb-[15px]">
                <div className="bg-[#f5f4f7] h-[25px] flex items-center px-[22px] mb-[10px] -mx-[21px]">
                  <p className="font-['Inter:Medium',sans-serif] text-[10px] text-black tracking-[-0.1px] leading-[15px]">
                    {month.label}
                  </p>
                </div>
                
                {hasPayments ? (
                  <>
                    {payments.map((payment, index) => {
                      const paymentId = `${month.key}-${index}`;
                      const hasReceipts = payment.receipts && payment.receipts.length > 0;
                      
                      return (
                        <div key={index}>
                          {/* Main Invoice/Payment Item */}
                          <PaymentItem
                            date={payment.date}
                            day={payment.day}
                            title={payment.title}
                            subtitle={payment.subtitle}
                            amount={payment.amount}
                            termInfo={payment.termInfo}
                            currentBalance={payment.currentBalance}
                            onMenuClick={() => {
                              setOpenPopupId(paymentId);
                              setSelectedPayment(payment);
                            }}
                          />
                          
                          {/* Receipt Sub-items with Tree Lines */}
                          {hasReceipts && payment.receipts!.map((receipt, receiptIndex) => (
                            <PaymentReceiptItem
                              key={receiptIndex}
                              date={receipt.date}
                              day={receipt.day}
                              receiptNo={receipt.receiptNo}
                              paymentMethod={receipt.paymentMethod}
                              amount={receipt.amount}
                              balanceAfter={receipt.balanceAfter}
                              onMenuClick={() => {
                                setOpenPopupId(`${paymentId}-receipt-${receiptIndex}`);
                                setSelectedPayment({
                                  ...payment,
                                  title: receipt.receiptNo,
                                  subtitle: receipt.paymentMethod,
                                  amount: receipt.amount,
                                });
                              }}
                            />
                          ))}
                          
                          {index < payments.length - 1 && (
                            <div className="h-[1px] bg-[#f5f4f7] mx-[22px]" />
                          )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="flex justify-center py-[20px]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] text-[10px] text-[rgba(45,54,72,0.52)] tracking-[-0.1px] leading-[15px]">
                      No Payments in {month.label === 'This Month' ? 'This Month' : month.label.split(' ')[0]}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Popup */}
        {openPopupId && (
          <PaymentPopup 
            onClose={() => setOpenPopupId(null)} 
            onViewReceipt={handleViewReceipt}
            paymentData={selectedPayment ? {
              title: selectedPayment.title,
              subtitle: selectedPayment.subtitle,
              amount: selectedPayment.amount,
              studentName: students.find(s => s.id === selectedStudentId)?.name || "Student",
              studentId: selectedStudentId
            } : undefined}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}

/**
 * Demo payment data showcasing hierarchical structure
 * Shows invoices with multiple receipt payments
 */
const getDemoPaymentData = (): Record<string, Record<string, PaymentData[]>> => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  return {
    'C20012': {
      [`${currentYear}-${currentMonth}`]: [
        {
          date: 'Wed',
          day: '19',
          title: 'School Fees - Grade 3B',
          subtitle: 'Invoice No. INV-001',
          amount: 'K1,500',
          invoiceNo: 'INV-001',
          termInfo: 'Term 1 2025',
          currentBalance: 'K500',
          receipts: [
            {
              date: 'Wed',
              day: '19',
              receiptNo: 'Receipt No. 00352',
              paymentMethod: 'Airtel Money',
              amount: 'K500',
              balanceAfter: 'K1,000',
            },
            {
              date: 'Fri',
              day: '21',
              receiptNo: 'Receipt No. 00355',
              paymentMethod: 'MTN Mobile Money',
              amount: 'K500',
              balanceAfter: 'K500',
            },
          ],
        },
        {
          date: 'Mon',
          day: '17',
          title: 'Lab Fees - Science Department',
          subtitle: 'Invoice No. INV-002',
          amount: 'K300',
          invoiceNo: 'INV-002',
          termInfo: 'Term 1 2025',
          currentBalance: 'K0',
          receipts: [
            {
              date: 'Mon',
              day: '17',
              receiptNo: 'Receipt No. 00348',
              paymentMethod: 'Airtel Money',
              amount: 'K300',
              balanceAfter: 'K0',
            },
          ],
        },
      ],
      [`${currentYear}-${currentMonth - 1}`]: [
        {
          date: 'Thu',
          day: '12',
          title: 'School Fees - Grade 3B',
          subtitle: 'Invoice No. INV-003',
          amount: 'K1,800',
          invoiceNo: 'INV-003',
          termInfo: 'Term 4 2024',
          currentBalance: 'K0',
          receipts: [
            {
              date: 'Thu',
              day: '12',
              receiptNo: 'Receipt No. 00290',
              paymentMethod: 'Bank Transfer',
              amount: 'K900',
              balanceAfter: 'K900',
            },
            {
              date: 'Fri',
              day: '20',
              receiptNo: 'Receipt No. 00295',
              paymentMethod: 'Airtel Money',
              amount: 'K900',
              balanceAfter: 'K0',
            },
          ],
        },
      ],
      [`${currentYear}-${currentMonth - 2}`]: [],
    },
    'C30013': {
      [`${currentYear}-${currentMonth}`]: [
        {
          date: 'Fri',
          day: '22',
          title: 'School Fees - Grade 4A',
          subtitle: 'Invoice No. INV-004',
          amount: 'K2,000',
          invoiceNo: 'INV-004',
          termInfo: 'Term 1 2025',
          currentBalance: 'K800',
          receipts: [
            {
              date: 'Fri',
              day: '22',
              receiptNo: 'Receipt No. 00360',
              paymentMethod: 'MTN Mobile Money',
              amount: 'K600',
              balanceAfter: 'K1,400',
            },
            {
              date: 'Mon',
              day: '25',
              receiptNo: 'Receipt No. 00362',
              paymentMethod: 'Airtel Money',
              amount: 'K600',
              balanceAfter: 'K800',
            },
          ],
        },
      ],
      [`${currentYear}-${currentMonth - 1}`]: [
        {
          date: 'Wed',
          day: '18',
          title: 'Sports Fees - Athletics',
          subtitle: 'Invoice No. INV-005',
          amount: 'K150',
          invoiceNo: 'INV-005',
          termInfo: 'Term 4 2024',
          currentBalance: 'K0',
          receipts: [
            {
              date: 'Wed',
              day: '18',
              receiptNo: 'Receipt No. 00285',
              paymentMethod: 'Airtel Money',
              amount: 'K150',
              balanceAfter: 'K0',
            },
          ],
        },
      ],
      [`${currentYear}-${currentMonth - 2}`]: [],
    },
    'C20013': {
      [`${currentYear}-${currentMonth}`]: [
        {
          date: 'Mon',
          day: '17',
          title: 'School Fees - Grade 5A',
          subtitle: 'Invoice No. INV-006',
          amount: 'K1,200',
          invoiceNo: 'INV-006',
          termInfo: 'Term 1 2025',
          currentBalance: 'K400',
          receipts: [
            {
              date: 'Mon',
              day: '17',
              receiptNo: 'Receipt No. 00350',
              paymentMethod: 'Bank Transfer',
              amount: 'K400',
              balanceAfter: 'K800',
            },
            {
              date: 'Wed',
              day: '19',
              receiptNo: 'Receipt No. 00353',
              paymentMethod: 'MTN Mobile Money',
              amount: 'K400',
              balanceAfter: 'K400',
            },
          ],
        },
      ],
      [`${currentYear}-${currentMonth - 1}`]: [
        {
          date: 'Tue',
          day: '15',
          title: 'Library Fees',
          subtitle: 'Invoice No. INV-007',
          amount: 'K80',
          invoiceNo: 'INV-007',
          termInfo: 'Term 4 2024',
          currentBalance: 'K0',
          receipts: [
            {
              date: 'Tue',
              day: '15',
              receiptNo: 'Receipt No. 00280',
              paymentMethod: 'Airtel Money',
              amount: 'K80',
              balanceAfter: 'K0',
            },
          ],
        },
      ],
      [`${currentYear}-${currentMonth - 2}`]: [],
    },
    'C20014': {
      [`${currentYear}-${currentMonth}`]: [],
      [`${currentYear}-${currentMonth - 1}`]: [],
      [`${currentYear}-${currentMonth - 2}`]: [
        {
          date: 'Tue',
          day: '05',
          title: 'School Fees - Grade 6B',
          subtitle: 'Invoice No. INV-008',
          amount: 'K1,000',
          invoiceNo: 'INV-008',
          termInfo: 'Term 3 2024',
          currentBalance: 'K0',
          receipts: [
            {
              date: 'Tue',
              day: '05',
              receiptNo: 'Receipt No. 00180',
              paymentMethod: 'Bank Transfer',
              amount: 'K500',
              balanceAfter: 'K500',
            },
            {
              date: 'Thu',
              day: '14',
              receiptNo: 'Receipt No. 00185',
              paymentMethod: 'Airtel Money',
              amount: 'K500',
              balanceAfter: 'K0',
            },
          ],
        },
      ],
    },
  };
};