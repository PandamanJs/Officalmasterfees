import { useEffect, useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../imports/svg-hdxmv7xpz6";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { useAppStore } from "../stores/useAppStore";

interface CheckoutService {
  id: string;
  description: string;
  amount: number;
  invoiceNo: string;
  studentName: string;
}

interface ProcessingPageProps {
  onProcessingComplete: (success: boolean) => void;
  paymentData?: {
    userPhone: string;
    userName: string;
    services: CheckoutService[];
    totalAmount: number;
    serviceFee: number;
    finalAmount: number;
    schoolName: string;
  };
}

/**
 * Verify payment with Lenco API through our backend
 */
async function verifyLencoPayment(reference: string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-f6550ac6/verify-payment/${reference}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${publicAnonKey}`,
        },
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.error("Payment verification failed:", result);
      return { success: false, error: result.error || "Payment verification failed" };
    }

    console.log("Payment verification result:", result);
    
    // Check if payment status is successful
    if (result.success && result.data?.data?.status === "successful") {
      return { success: true, data: result.data.data };
    }
    
    return { 
      success: false, 
      error: `Payment status: ${result.data?.data?.status || "unknown"}` 
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}

/**
 * Save payment to backend
 * Sends payment information to the server for storage
 */
async function savePaymentToBackend(
  paymentData: ProcessingPageProps['paymentData'],
  lencoReference: string,
  lencoData?: any
) {
  if (!paymentData) {
    console.error("No payment data to save");
    return { success: false, error: "No payment data provided" };
  }

  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-f6550ac6/payments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          ...paymentData,
          timestamp: new Date().toISOString(),
          // Extract student info from first service (all services are for same student in current flow)
          studentId: paymentData.services[0]?.id || "Unknown",
          studentName: paymentData.services[0]?.studentName || "Unknown",
          // Add Lenco payment details
          lencoReference: lencoReference,
          lencoData: lencoData,
        }),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.error("Failed to save payment:", result);
      return { success: false, error: result.error || "Failed to save payment" };
    }

    return result;
  } catch (error) {
    console.error("Error saving payment to backend:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}

export default function ProcessingPage({ onProcessingComplete, paymentData }: ProcessingPageProps) {
  const paymentReference = useAppStore((state) => state.paymentReference);
  const [verificationStatus, setVerificationStatus] = useState<string>("Verifying payment...");
  
  // Check if in test mode (no backend)
  const isTestMode = import.meta.env.VITE_TEST_MODE === 'true';

  // Process payment with Lenco verification
  useEffect(() => {
    const processPayment = async () => {
      try {
        // TEST MODE: Skip backend verification
        if (isTestMode) {
          console.log('🧪 TEST MODE: Simulating payment verification');
          setVerificationStatus("Processing payment...");
          await new Promise(resolve => setTimeout(resolve, 2500));
          
          // Simulate successful payment for testing
          setVerificationStatus("Payment successful!");
          console.log('✅ TEST MODE: Payment reference:', paymentReference || 'MOCK_' + Date.now());
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          onProcessingComplete(true);
          return;
        }
        
        // PRODUCTION MODE: Full backend verification
        // If no reference, it's a test/mock payment
        if (!paymentReference || paymentReference === "PENDING") {
          setVerificationStatus("Processing payment...");
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // For demo purposes, simulate success
          // In production, this should always verify with Lenco
          const isSuccess = Math.random() > 0.2; // 80% success rate for testing
          
          if (isSuccess && paymentData) {
            // Save mock payment to backend
            await savePaymentToBackend(paymentData, "MOCK_" + Date.now(), null);
          }
          
          onProcessingComplete(isSuccess);
          return;
        }

        // Verify payment with Lenco
        setVerificationStatus("Verifying with Lenco...");
        
        // Wait a bit for payment to be processed by Lenco
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verify the payment
        const verificationResult = await verifyLencoPayment(paymentReference);
        
        if (verificationResult.success) {
          setVerificationStatus("Payment verified successfully!");
          
          // Save verified payment to backend
          if (paymentData) {
            const saveResult = await savePaymentToBackend(
              paymentData, 
              paymentReference, 
              verificationResult.data
            );
            
            if (!saveResult.success) {
              console.warn("Payment verified but failed to save to history:", saveResult.error);
              // We still consider the payment successful even if history save fails
            }
          }
          
          onProcessingComplete(true);
        } else {
          setVerificationStatus("Payment verification failed");
          console.error("Payment verification failed:", verificationResult.error);
          
          // Wait a bit before showing failure
          await new Promise(resolve => setTimeout(resolve, 1000));
          onProcessingComplete(false);
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        setVerificationStatus("An error occurred");
        await new Promise(resolve => setTimeout(resolve, 1000));
        onProcessingComplete(false);
      }
    };

    processPayment();
  }, [onProcessingComplete, paymentData, paymentReference, isTestMode]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Animated Icon */}
        <motion.div 
          className="relative w-[127px] h-[127px] mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: 1,
          }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 0.5
            }
          }}
        >
          <div className="rounded-full size-full relative overflow-clip">
            <div className="absolute inset-[23.62%_24.41%_11.81%_14.96%]">
              <div className="absolute inset-[-4.88%_-5.19%]" style={{ "--stroke-0": "rgba(149, 227, 108, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 90">
                  <motion.path 
                    d={svgPaths.p39438780} 
                    stroke="var(--stroke-0, #95E36C)" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#95e36c] border-[6px] border-solid inset-0 pointer-events-none rounded-full" />
        </motion.div>

        {/* Processing Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[20px] text-[#003630] mb-4">
            Processing Payment
          </h2>
          
          <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[15px] text-[#003630] tracking-[-0.15px] max-w-[314px] mx-auto px-4 leading-[24px]">
            Confirm the Payment by entering your Pin in the pop up that will appear on your phone.
          </p>
        </motion.div>

        {/* Animated dots */}
        <motion.div 
          className="flex gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#95e36c] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}