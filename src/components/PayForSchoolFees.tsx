import { useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../imports/svg-4boykq1z8d";
import tickSvgPaths from "../imports/svg-m9kcpl04lu";
import pathSvgPaths from "../imports/svg-d7byi594ix";
import pathStrokeSvgPaths from "../imports/svg-zrcfpc6p5c";

interface Student {
  name: string;
  id: string;
  grade: string;
  balances: number;
}

interface PayForSchoolFeesProps {
  onBack: () => void;
  onSelectServices: (selectedStudents: string[]) => void;
  students?: Student[];
  initialSelectedStudents?: string[]; // Add prop to receive initial selections
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
    <div className="h-[66px] w-full relative">
      <div aria-hidden="true" className="absolute border-[#e6e6e6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="absolute left-[94px] top-[17px] flex items-center gap-[16px]">
        <Logo />
        <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[normal] not-italic text-[20px] text-black text-nowrap whitespace-pre">master-fees</p>
      </div>
    </div>
  );
}

function Radio({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="absolute left-1/2 rounded-[9999px] size-[15px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-[#5f75a0] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      {isSelected && (
        <div className="absolute inset-[3px] rounded-full bg-[#003630]" />
      )}
    </div>
  );
}

function RadioBase({ isSelected }: { isSelected: boolean }) {
  return (
    <div 
      className="relative rounded-[3px] shrink-0 size-[15px]" 
      data-name="_Radio Base"
    >
      <Radio isSelected={isSelected} />
    </div>
  );
}

function TickCircle() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="tick-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="tick-circle">
          <path d={tickSvgPaths.p2aa26200} fill="var(--fill-0, #95E36C)" id="Vector" />
          <g id="Vector_2" opacity="0"></g>
        </g>
      </svg>
    </div>
  );
}

function Frame2({ name }: { name: string }) {
  return (
    <div className="h-[16px] relative shrink-0 w-[94px]">
      <p className="absolute font-['IBM_Plex_Sans_Condensed:SemiBold',sans-serif] leading-[normal] left-0 not-italic text-[12px] text-black text-nowrap top-0 whitespace-pre">{name}</p>
    </div>
  );
}

function Frame({ grade, id }: { grade: string; id: string }) {
  return (
    <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[8px] text-black text-center w-[40px]">{grade}</p>
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "8", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[8px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-0.5px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
                <line id="Line 49" stroke="var(--stroke-0, black)" strokeWidth="0.5" x2="8" y1="0.25" y2="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[8px] text-black text-center">{id}</p>
    </div>
  );
}

function Frame4({ student }: { student: Student }) {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[104px]">
      <Frame2 name={student.name} />
      <Frame grade={student.grade} id={student.id} />
    </div>
  );
}

function Frame6({ balances }: { balances: number }) {
  return (
    <div className="bg-[rgba(0,54,48,0.11)] h-[28px] relative rounded-[5px] shrink-0 w-[80px]">
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[normal] left-[40px] not-italic text-[#323432] text-[7px] text-center text-nowrap top-[14px] translate-x-[-50%] translate-y-[-50%] whitespace-pre">
        <p className="mb-0">{`View/Clear (${balances}) `}</p>
        <p>Balances</p>
      </div>
    </div>
  );
}

function Frame8({ balances }: { balances: number }) {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-end relative shrink-0 w-[155px]">
      <Frame6 balances={balances} />
    </div>
  );
}

function StudentCard({ 
  student, 
  isSelected, 
  onToggle, 
  top 
}: { 
  student: Student; 
  isSelected: boolean; 
  onToggle: () => void; 
  top: number;
}) {
  return (
    <button
      onClick={onToggle}
      className={`absolute bg-neutral-100 box-border content-stretch flex gap-[9px] h-[77px] items-center left-[28px] overflow-clip p-[20px] rounded-[12px] w-[333px] touch-manipulation transition-colors ${
        isSelected 
          ? 'border border-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]' 
          : 'hover:bg-neutral-200 active:bg-neutral-300'
      }`}
      style={{ top: `${top}px` }}
    >
      {isSelected ? (
        <TickCircle />
      ) : (
        <RadioBase isSelected={isSelected} />
      )}
      <Frame4 student={student} />
      <Frame8 balances={student.balances} />
    </button>
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

export default function PayForSchoolFees({ 
  onBack, 
  onSelectServices,
  students = [
    { name: "Talitha Kapambwe", id: "C20012", grade: "Grade 3A", balances: 0 },
    { name: "Isaiah Kapambwe", id: "C30013", grade: "Grade 4A", balances: 0 },
  ],
  initialSelectedStudents = []
}: PayForSchoolFeesProps) {
  // Initialize state with passed initial selections
  const [selectedStudents, setSelectedStudents] = useState<string[]>(initialSelectedStudents);

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectServices = () => {
    if (selectedStudents.length > 0) {
      onSelectServices(selectedStudents);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex items-center justify-center" data-name="Pay for school fees page 1">
      <div className="relative w-full max-w-[393px] md:max-w-[500px] lg:max-w-[600px] h-screen mx-auto bg-white flex flex-col overflow-hidden">
        {/* Header - Fixed height */}
        <div className="flex-shrink-0">
          <Header onBack={onBack} />
        </div>
        
        {/* Content - Scrollable area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Title and Instructions */}
          <div className="flex-shrink-0 px-[28px] sm:px-[40px] pt-[16px] pb-[20px]">
            <div className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] leading-[1.3] not-italic text-[18px] text-black tracking-[-0.18px] mb-[12px]">
              <p className="mb-[4px]">Choose the account(s) you want to</p>
              <p>pay for.</p>
            </div>
            <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] leading-[1.5] not-italic text-[#a7aaa7] text-[12px] tracking-[-0.12px]">
              Tap the boxes to select the children you want to make a payment for.
            </p>
          </div>

          {/* Student Cards - Scrollable */}
          <div 
            className="flex-1 overflow-y-auto px-[28px] pb-[16px] space-y-[12px]" 
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => toggleStudent(student.id)}
                className={`bg-neutral-100 box-border content-stretch flex gap-[9px] min-h-[77px] items-center w-full overflow-clip p-[20px] rounded-[12px] touch-manipulation transition-colors ${
                  selectedStudents.includes(student.id)
                    ? 'border border-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]' 
                    : 'hover:bg-neutral-200 active:bg-neutral-300'
                }`}
              >
                {selectedStudents.includes(student.id) ? (
                  <TickCircle />
                ) : (
                  <RadioBase isSelected={false} />
                )}
                <Frame4 student={student} />
                <Frame8 balances={student.balances} />
              </button>
            ))}
          </div>

          {/* Button - Fixed at bottom with safe area */}
          <div 
            className="flex-shrink-0 px-[28px] sm:px-[36px] pb-[20px] pt-[16px] bg-white border-t border-transparent" 
            style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}
          >
            <button 
              onClick={handleSelectServices}
              disabled={selectedStudents.length === 0}
              className="bg-[#003630] w-full h-[55px] rounded-[12px] touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0px_2px_8px_rgba(0,54,48,0.3)]" 
              data-name="Button"
            >
              <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] leading-[24px] not-italic text-[16px] text-nowrap text-white tracking-[-0.16px] whitespace-pre text-center">Select Services</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}