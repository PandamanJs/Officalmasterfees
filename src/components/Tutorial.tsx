import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

/**
 * Interface for each tutorial step
 */
interface TutorialStep {
  title: string;        // Step heading with emoji
  description: string;  // Detailed explanation
  position: "center" | "top" | "bottom";  // Vertical positioning
}

/**
 * Tutorial step content
 * Guides users through the main features of the app
 */
const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Master-Fees! 👋",
    description: "Let's take a quick tour to help you get started with managing your school fee payments.",
    position: "center"
  },
  {
    title: "Search for Students 🔍",
    description: "Use the search bar to quickly find students by name. Just start typing and we'll show you matching results.",
    position: "top"
  },
  {
    title: "Select Services 📋",
    description: "Browse and select the services you need to pay for. You can select multiple services for one or more students.",
    position: "center"
  },
  {
    title: "Review Your Selection ✓",
    description: "Check your selected items and see the total amount. You can adjust quantities or remove items before proceeding.",
    position: "center"
  },
  {
    title: "Choose Payment Method 💳",
    description: "We support Mobile Money (Airtel, MTN, Zamtel) and Card Payments (Visa, Mastercard). Pick what works best for you.",
    position: "bottom"
  },
  {
    title: "View Your Receipts 📄",
    description: "After payment, you can view and download your receipts anytime. They're organized by month for easy access.",
    position: "center"
  },
  {
    title: "You're All Set! 🎉",
    description: "That's it! You're ready to start managing your school fee payments. Tap 'Get Started' to begin.",
    position: "center"
  }
];

interface TutorialProps {
  onComplete: () => void;  // Callback when tutorial is finished
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Handle next button click
   * Advances to next step or completes the tutorial
   */
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  /**
   * Handle skip button click
   * Immediately completes the tutorial
   */
  const handleSkip = () => {
    handleComplete();
  };

  /**
   * Complete the tutorial
   * Animates out and calls the onComplete callback
   */
  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const currentStepData = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;

  /**
   * Get positioning classes based on step configuration
   * Controls where the tutorial card appears on screen
   */
  const getPositionClasses = () => {
    switch (currentStepData.position) {
      case "top":
        return "items-start pt-24";
      case "bottom":
        return "items-end pb-24";
      default:
        return "items-center justify-center";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleSkip();
            }
          }}
        >
          <div className={`w-full h-full flex px-6 ${getPositionClasses()}`}>
            <motion.div
              key={currentStep}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="mb-6">
                <h2 className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[24px] text-[#003630] mb-3">
                  {currentStepData.title}
                </h2>
                <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[16px] text-gray-700 leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              {/* Progress Indicators */}
              <div className="flex gap-2 mb-6">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                      index === currentStep
                        ? "bg-[#95e36c]"
                        : index < currentStep
                        ? "bg-[#003630]"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Step Counter */}
              <div className="flex items-center justify-between mb-4">
                <p className="font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[14px] text-gray-500">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {!isLastStep && (
                  <button
                    onClick={handleSkip}
                    className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[16px] text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Skip Tutorial
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className={`${
                    isLastStep ? "flex-1" : "flex-1"
                  } px-6 py-3 rounded-xl bg-[#003630] font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[16px] text-white hover:bg-[#004d45] transition-colors active:scale-[0.98]`}
                >
                  {isLastStep ? "Get Started" : "Next"}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Animated Background Elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-24 h-24 rounded-full bg-[#95e36c]/20 blur-2xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#003630]/20 blur-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}