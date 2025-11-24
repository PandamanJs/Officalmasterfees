import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import headerSvgPaths from "../imports/svg-4boykq1z8d";

interface PaymentPlan {
  id: string;
  planCode: string;
  name: string;
  description: string;
  installments: number;
  frequency: string;
  totalAmount: number;
  perInstallment: number;
  effectiveDate: string;
  dueDate: string;
  terms: string[];
}

interface ViewPaymentPlansPageProps {
  onBack: () => void;
  schoolName: string;
}

/**
 * Premium Header Component
 */
function Header({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative h-[66px] w-full border-b border-[#e6e6e6]/50 bg-white/80 backdrop-blur-xl">
      <div className="absolute left-[20px] top-[17px] flex items-center gap-[16px]">
        <button
          onClick={onBack}
          className="w-[32px] h-[32px] rounded-full hover:bg-[#f3f4f6] transition-all flex items-center justify-center touch-manipulation active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 16L6 10L12 4"
              stroke="#003630"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Logo />
        <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[20px] text-black">
          master-fees
        </p>
      </div>
    </div>
  );
}

/**
 * Logo Component
 */
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

/**
 * Professional Payment Plan Card
 */
function PaymentPlanCard({ 
  plan, 
  index
}: { 
  plan: PaymentPlan; 
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div
        className="relative overflow-hidden rounded-[16px] bg-white border border-[#e5e7eb] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 touch-manipulation"
      >
        {/* Header Section */}
        <div className="px-[20px] py-[16px] border-b border-[#f3f4f6] bg-gradient-to-b from-[#fafbfc] to-white">
          <div className="flex items-start justify-between mb-[4px]">
            <div className="flex-1">
              <div className="flex items-center gap-[8px] mb-[4px]">
                <h3 className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[16px] text-[#003630] tracking-[-0.2px]">
                  {plan.name}
                </h3>
                <span className="px-[8px] py-[2px] rounded-[6px] bg-[#f3f4f6] border border-[#e5e7eb]">
                  <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[10px] text-[#6b7280] tracking-[0.3px]">
                    {plan.planCode}
                  </p>
                </span>
              </div>
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#6b7280] leading-[1.5]">
                {plan.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-[20px] py-[16px]">
          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-[12px] mb-[16px]">
            <div className="p-[12px] rounded-[10px] bg-[#fafbfc] border border-[#f3f4f6]">
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[10px] text-[#9ca3af] mb-[4px] uppercase tracking-[0.5px]">
                Total Amount
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[18px] text-[#003630] tracking-[-0.3px]">
                K{plan.totalAmount.toLocaleString()}
              </p>
            </div>
            
            <div className="p-[12px] rounded-[10px] bg-[#fafbfc] border border-[#f3f4f6]">
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[10px] text-[#9ca3af] mb-[4px] uppercase tracking-[0.5px]">
                Per {plan.frequency}
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[18px] text-[#003630] tracking-[-0.3px]">
                K{plan.perInstallment.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Payment Schedule Info */}
          <div className="space-y-[8px] mb-[16px] p-[12px] rounded-[10px] bg-gradient-to-br from-[#f8faf9] to-[#f0f9f4] border border-[#95e36c]/10">
            <div className="flex justify-between items-center">
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#6b7280]">
                Number of Installments
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[12px] text-[#003630]">
                {plan.installments} payments
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#6b7280]">
                Payment Frequency
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[12px] text-[#003630]">
                {plan.frequency === "one-time" ? "Full Payment" : `Every ${plan.frequency}`}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#6b7280]">
                Effective Date
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[12px] text-[#003630]">
                {plan.effectiveDate}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#6b7280]">
                Final Payment Due
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[12px] text-[#003630]">
                {plan.dueDate}
              </p>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-[8px] rounded-[8px] border border-[#e5e7eb] hover:bg-[#f9fafb] transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-[6px]"
          >
            <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[12px] text-[#6b7280]">
              {isExpanded ? 'Hide Terms & Conditions' : 'View Terms & Conditions'}
            </p>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>

          {/* Expanded Terms */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-[12px] p-[12px] rounded-[10px] bg-[#fafbfc] border border-[#e5e7eb]/50">
                  <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[11px] text-[#003630] mb-[8px] uppercase tracking-[0.5px]">
                    Terms & Conditions
                  </p>
                  <div className="space-y-[6px]">
                    {plan.terms.map((term, idx) => (
                      <div key={idx} className="flex items-start gap-[8px]">
                        <div className="mt-[3px] flex-shrink-0 w-[4px] h-[4px] rounded-full bg-[#6b7280]" />
                        <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[11px] text-[#6b7280] leading-[1.6] flex-1">
                          {term}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Main Payment Plans Page
 */
export default function ViewPaymentPlansPage({ onBack, schoolName }: ViewPaymentPlansPageProps) {
  // Professional payment plans data
  const paymentPlans: PaymentPlan[] = [
    {
      id: "full",
      planCode: "FP-2025",
      name: "Full Payment Plan",
      description: "Single upfront payment for the entire academic year",
      installments: 1,
      frequency: "one-time",
      totalAmount: 12000,
      perInstallment: 12000,
      effectiveDate: "Jan 15, 2025",
      dueDate: "Jan 15, 2025",
      terms: [
        "Payment must be received by the effective date to avoid late fees",
        "5% early payment discount applied automatically",
        "Non-refundable after 14 days of enrollment confirmation",
        "Includes all standard tuition and administrative fees",
        "Additional services and materials not included"
      ]
    },
    {
      id: "termly",
      planCode: "TP-2025",
      name: "Termly Payment Plan",
      description: "Three equal installments aligned with academic terms",
      installments: 3,
      frequency: "term",
      totalAmount: 12600,
      perInstallment: 4200,
      effectiveDate: "Jan 15, 2025",
      dueDate: "Sep 30, 2025",
      terms: [
        "First payment due at start of Term 1 (January)",
        "Second payment due at start of Term 2 (May)",
        "Third payment due at start of Term 3 (September)",
        "Late fee of K150 applied for payments received after the 15th of each term month",
        "Missed payments may result in temporary suspension of services"
      ]
    },
    {
      id: "monthly",
      planCode: "MP-2025",
      name: "Monthly Payment Plan",
      description: "Ten monthly installments spread across the academic year",
      installments: 10,
      frequency: "month",
      totalAmount: 13200,
      perInstallment: 1320,
      effectiveDate: "Jan 15, 2025",
      dueDate: "Oct 31, 2025",
      terms: [
        "Payments due on the 15th of each month from January to October",
        "Automatic payment option available through authorized accounts",
        "Late fee of K80 applied for payments received after the 20th",
        "Two consecutive missed payments may result in account review",
        "Payment schedule excludes November and December"
      ]
    },
    {
      id: "custom",
      planCode: "CP-2025",
      name: "Custom Payment Arrangement",
      description: "Personalized payment schedule based on individual circumstances",
      installments: 0,
      frequency: "flexible",
      totalAmount: 0,
      perInstallment: 0,
      effectiveDate: "Upon Approval",
      dueDate: "As Agreed",
      terms: [
        "Requires formal application and financial documentation review",
        "Subject to approval by school administration and finance committee",
        "Terms and conditions negotiated on a case-by-case basis",
        "May require guarantor or additional security deposit",
        "Contact the bursar's office to initiate the application process"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#fafbfc] via-white to-[#f5f9f8] h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen mx-auto shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_8px_24px_rgba(0,0,0,0.08)] bg-white flex flex-col">
        <Header onBack={onBack} />

        {/* Hero Section */}
        <div className="px-[24px] pt-[24px] pb-[20px] bg-white border-b border-[#f3f4f6]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[24px] text-[#003630] tracking-[-0.5px] mb-[4px]">
              Payment Plans Overview
            </h1>
            <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[13px] text-[#003630] mb-[2px]">
              {schoolName}
            </p>
            <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#9ca3af] leading-[1.5]">
              Academic Year 2024-2025 • Effective January 2025
            </p>
          </motion.div>
        </div>

        {/* Payment Plans List */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
          <div className="space-y-[16px] pb-[24px]">
            {paymentPlans.map((plan, index) => (
              <PaymentPlanCard
                key={plan.id}
                plan={plan}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-[24px] py-[16px] bg-white border-t border-[#e5e7eb]">
          <div className="flex items-start gap-[10px] p-[12px] rounded-[10px] bg-[#fafbfc]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-[2px]">
              <circle cx="8" cy="8" r="7" stroke="#6b7280" strokeWidth="1.2" />
              <path d="M8 8V11" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="8" cy="5.5" r="0.5" fill="#6b7280" />
            </svg>
            <div>
              <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[11px] text-[#003630] mb-[2px]">
                Questions about payment plans?
              </p>
              <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[10px] text-[#9ca3af] leading-[1.5]">
                Contact the bursar's office at bursar@school.edu or +260 XXX XXX XXX
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}