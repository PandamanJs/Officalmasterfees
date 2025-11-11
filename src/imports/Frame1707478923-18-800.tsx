import { ChevronDown } from "lucide-react";

interface ExpandedCardPaymentProps {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  onCardNumberChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onCollapse: () => void;
  cardNumberError?: string;
  expiryDateError?: string;
  cvvError?: string;
}

export default function ExpandedCardPayment({ 
  cardNumber,
  expiryDate,
  cvv,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange,
  onCollapse,
  cardNumberError,
  expiryDateError,
  cvvError
}: ExpandedCardPaymentProps) {
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      onCardNumberChange(formatted);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.replace(/\//g, "").length <= 4) {
      onExpiryDateChange(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "");
    if (cleaned.length <= 3) {
      onCvvChange(cleaned);
    }
  };

  return (
    <div className="bg-white border border-[#003630] rounded-[12px] p-[16px] w-full">
      <button
        onClick={onCollapse}
        className="w-full flex items-center justify-between mb-[12px] touch-manipulation"
      >
        <div className="flex items-center gap-[10px]">
          <div className="size-[20px] flex items-center justify-center">
            <svg className="block size-full" fill="none" viewBox="0 0 20 20">
              <path d="M17.5 5.83333H2.5C1.57952 5.83333 0.833333 6.57952 0.833333 7.5V15.8333C0.833333 16.7538 1.57952 17.5 2.5 17.5H17.5C18.4205 17.5 19.1667 16.7538 19.1667 15.8333V7.5C19.1667 6.57952 18.4205 5.83333 17.5 5.83333Z" stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M0.833333 9.16667H19.1667" stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[16px] text-black tracking-[-0.16px]">
            Card Payment
          </p>
        </div>
        <ChevronDown className="w-5 h-5 text-black transform rotate-180" />
      </button>
      
      <div className="flex flex-col gap-[12px]">
        {/* Card Number */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-['IBM_Plex_Sans:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.64)]">
            Card Number
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            className={`bg-white border ${cardNumberError ? 'border-red-500' : 'border-[#003049]'} rounded-[10px] p-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[14px] text-black placeholder:text-[rgba(45,54,72,0.44)] tracking-[-0.14px] outline-none touch-manipulation`}
          />
          {cardNumberError && (
            <p className="font-['IBM_Plex_Sans:Regular',sans-serif] text-[10px] text-red-500">
              {cardNumberError}
            </p>
          )}
        </div>

        {/* Expiry Date and CVV */}
        <div className="flex gap-[12px]">
          <div className="flex-1 flex flex-col gap-[8px]">
            <label className="font-['IBM_Plex_Sans:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.64)]">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              className={`bg-white border ${expiryDateError ? 'border-red-500' : 'border-[#003049]'} rounded-[10px] p-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[14px] text-black placeholder:text-[rgba(45,54,72,0.44)] tracking-[-0.14px] outline-none touch-manipulation`}
            />
            {expiryDateError && (
              <p className="font-['IBM_Plex_Sans:Regular',sans-serif] text-[10px] text-red-500">
                {expiryDateError}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-[8px]">
            <label className="font-['IBM_Plex_Sans:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.64)]">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="123"
              className={`bg-white border ${cvvError ? 'border-red-500' : 'border-[#003049]'} rounded-[10px] p-[8px] w-[80px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[14px] text-black placeholder:text-[rgba(45,54,72,0.44)] tracking-[-0.14px] outline-none touch-manipulation`}
            />
            {cvvError && (
              <p className="font-['IBM_Plex_Sans:Regular',sans-serif] text-[10px] text-red-500">
                {cvvError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}