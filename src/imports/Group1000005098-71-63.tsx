import svgPaths from "./svg-e4ggbu3zv4";

function Group() {
  return (
    <div className="absolute left-[263px] size-[54.652px] top-[12px]">
      <div className="absolute inset-[-10.09%_-17.41%_-24.73%_-17.41%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74 74">
          <g filter="url(#filter0_d_71_71)" id="Group 15">
            <path d={svgPaths.p2b8e3500} fill="var(--fill-0, black)" id="rect84" stroke="var(--stroke-0, white)" strokeWidth="8" />
            <path d={svgPaths.p24c36700} id="path60" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="10" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="73.681" id="filter0_d_71_71" width="73.681" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_71_71" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_71_71" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function SuccessIcon() {
  return (
    <div className="absolute contents left-[263px] top-[12px]" data-name="Success Icon">
      <Group />
    </div>
  );
}

function PaymentDetail() {
  return (
    <div className="content-stretch flex gap-[26.646px] items-start leading-[29.977px] not-italic relative shrink-0 text-[21.65px] text-black w-full" data-name="Payment Detail">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow min-h-px min-w-px relative shrink-0">Ref Number</p>
      <p className="font-['Poppins:Medium',sans-serif] relative shrink-0 text-center text-nowrap whitespace-pre">000085752257</p>
    </div>
  );
}

function PaymentDetail1() {
  return (
    <div className="content-stretch flex gap-[26.646px] items-start leading-[29.977px] not-italic relative shrink-0 text-[21.65px] text-black w-full" data-name="Payment Detail">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow min-h-px min-w-px relative shrink-0">Payment Time</p>
      <p className="font-['Poppins:Medium',sans-serif] relative shrink-0 text-center text-nowrap whitespace-pre">25-02-2023, 13:22:16</p>
    </div>
  );
}

function PaymentDetail2() {
  return (
    <div className="content-stretch flex gap-[26.646px] items-start leading-[29.977px] not-italic relative shrink-0 text-[21.65px] text-black w-full" data-name="Payment Detail">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow min-h-px min-w-px relative shrink-0">Payment Method</p>
      <p className="font-['Poppins:Medium',sans-serif] relative shrink-0 text-center text-nowrap whitespace-pre">Mobile Money</p>
    </div>
  );
}

function PaymentDetail3() {
  return (
    <div className="content-stretch flex gap-[26.646px] items-start leading-[29.977px] not-italic relative shrink-0 text-[21.65px] text-black w-full" data-name="Payment Detail">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow min-h-px min-w-px relative shrink-0">Sender Name</p>
      <p className="font-['Poppins:Medium',sans-serif] relative shrink-0 text-center text-nowrap whitespace-pre">Antonio Roberto</p>
    </div>
  );
}

function DetailsRow() {
  return (
    <div className="content-stretch flex flex-col gap-[23.315px] items-start relative shrink-0 w-full" data-name="Details Row">
      <PaymentDetail />
      <PaymentDetail1 />
      <PaymentDetail2 />
      <PaymentDetail3 />
    </div>
  );
}

function PaymentDetail4() {
  return (
    <div className="content-stretch flex gap-[26.646px] items-start relative shrink-0 w-full" data-name="Payment Detail">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[29.977px] min-h-px min-w-px not-italic relative shrink-0 text-[21.65px] text-black">Schedule ID</p>
    </div>
  );
}

function PaymentDetail5() {
  return (
    <div className="content-stretch flex gap-[26.646px] items-start relative shrink-0 w-full" data-name="Payment Detail">
      <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[29.977px] min-h-px min-w-px not-italic relative shrink-0 text-[21.65px] text-black">Service Fee</p>
    </div>
  );
}

function AmountRow() {
  return (
    <div className="content-stretch flex flex-col gap-[23.315px] items-start relative shrink-0 w-full" data-name="Amount Row">
      <PaymentDetail4 />
      <PaymentDetail5 />
    </div>
  );
}

function PaymentDetails() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[26.646px] items-center justify-center left-[27px] top-[343px] w-[521.707px]" data-name="Payment Details">
      <DetailsRow />
      <AmountRow />
    </div>
  );
}

function HeaderText() {
  return (
    <div className="absolute content-stretch flex flex-col font-['Poppins:Regular',sans-serif] gap-[9.992px] items-start left-[22px] not-italic text-black text-center top-[197px] w-[521.268px]" data-name="Header Text">
      <p className="leading-[46.631px] relative shrink-0 text-[24px] w-full">Payment Receipt</p>
      <p className="leading-[36.639px] relative shrink-0 text-[16px] w-full">Your payment has been successfully done.</p>
    </div>
  );
}

function ReceiptCard() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[39.969px] h-[668px] items-center justify-center left-[11.06px] pb-[53.293px] pt-[79.939px] px-[26.646px] rounded-[19.985px] top-0 w-[575px]" data-name="Receipt Card">
      <SuccessIcon />
      <PaymentDetails />
      <div className="absolute h-0 left-[41px] top-[317px] w-[494.622px]" data-name="Line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 495 1">
            <line id="Line" stroke="var(--stroke-0, #003630)" x2="494.622" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[29.977px] left-[100px] not-italic text-[24px] text-black top-[152px] w-[369px]">Twalumbu Educational Center</p>
      <HeaderText />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[29.977px] left-[289.5px] not-italic text-[24px] text-black text-center text-nowrap top-[668px] translate-x-[-50%] whitespace-pre">Services Breakdown</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col h-[53.615px] items-center left-[115.06px] top-[96px] w-[367px]">
      <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[45px] not-italic relative shrink-0 text-[48px] text-black text-center w-[390px]">Master-Fees</p>
    </div>
  );
}

function Amount() {
  return <div className="absolute h-[37px] left-[37.06px] top-[913px] w-[494.622px]" data-name="Amount" />;
}

function Receipt() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Receipt">
      <div className="absolute h-[1170px] left-0 top-0 w-[574.561px]" data-name="Subtract">
        <div className="absolute inset-[-3.42%_-9.28%_-5.69%_-9.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 682 1277">
            <g filter="url(#filter0_d_71_75)" id="Subtract">
              <path d={svgPaths.p512e00} fill="var(--fill-0, white)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1276.59" id="filter0_d_71_75" width="681.146" x="0" y="-9.53674e-07">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="13.3231" />
                <feGaussianBlur stdDeviation="26.6463" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_71_75" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_71_75" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <ReceiptCard />
      <Frame />
      <Amount />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <Receipt />
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[36.639px] left-[295.37px] not-italic text-[23.315px] text-black text-center top-[977px] translate-x-[-50%] w-[494.622px] whitespace-pre-wrap">
        <span>{`Total Payment                       `}</span>
        <span className="font-['Poppins:Bold',sans-serif]">ZMW 1,000.00</span>
      </p>
      <div className="absolute bg-black h-[36px] left-[18.06px] rounded-tl-[11px] rounded-tr-[11px] top-[713px] w-[538px]" />
      <div className="absolute h-0 left-[41.06px] top-[1014px] w-[494.622px]" data-name="Line">
        <div className="absolute bottom-0 left-0 right-0 top-[-1.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 495 2">
            <line id="Line" stroke="var(--stroke-0, #003630)" strokeDasharray="6.66 6.66" strokeWidth="1.66539" x2="494.622" y1="0.832696" y2="0.832696" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[29.977px] left-[48.06px] not-italic text-[16px] text-nowrap text-white top-[715px] whitespace-pre">Description</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[29.977px] left-[299.06px] not-italic text-[16px] text-nowrap text-white top-[716px] whitespace-pre">{`Student                            Amount`}</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[29.977px] left-[33.06px] not-italic text-[13px] text-black text-nowrap top-[768px] whitespace-pre">School Fees - Grade 3B</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[29.977px] left-[246.06px] not-italic text-[12px] text-black text-nowrap top-[768px] whitespace-pre">{`Talitha Kapambwe - C20012                        K150.00`}</p>
      <div className="absolute font-['Poppins:Regular',sans-serif] leading-[0] left-[293.56px] not-italic text-[0px] text-black text-center text-nowrap top-[1053px] translate-x-[-50%] whitespace-pre">
        <p className="font-['Poppins:Bold',sans-serif] leading-[36.639px] mb-0 text-[20px]">{`Thank you for your payment! `}</p>
        <p className="leading-[36.639px] text-[14px]">
          <span className="font-['Poppins:Bold',sans-serif] not-italic"> </span>
          <span className="text-black">This is a computer-generated receipt and does not require a signature</span>
        </p>
      </div>
    </div>
  );
}