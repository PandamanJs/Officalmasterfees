import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PaymentData } from '../components/HistoryPage';

/**
 * Page types for navigation
 */
export type PageType = 
  | "search" 
  | "details" 
  | "services" 
  | "history" 
  | "receipts" 
  | "pay-fees" 
  | "add-services" 
  | "checkout" 
  | "payment" 
  | "processing" 
  | "failed" 
  | "success" 
  | "download-receipt";

/**
 * Interface for checkout service items
 * Represents a single service being purchased for a student
 */
export interface CheckoutService {
  id: string;           // Unique identifier for the service
  description: string;  // Service name/description
  amount: number;       // Cost in local currency
  invoiceNo: string;    // Invoice reference number
  studentName: string;  // Student receiving the service
}

/**
 * Application State Interface
 * Centralized state management for the Master-Fees application
 */
interface AppState {
  // Navigation State
  currentPage: PageType;
  navigationDirection: 'forward' | 'back';
  
  // User State
  selectedSchool: string | null;
  userName: string;
  userPhone: string;
  
  // Student Selection State
  selectedStudentIds: string[];
  
  // Checkout State
  checkoutServices: CheckoutService[];
  paymentAmount: number;
  paymentReference: string;
  
  // Receipt State
  receiptStudentName: string;
  receiptStudentId: string;
  receiptPaymentData: Record<string, PaymentData[]>;
  
  // Tutorial State
  showTutorial: boolean;
  hasSeenTutorial: boolean;
  
  // Navigation Actions
  navigateToPage: (page: PageType, direction?: 'forward' | 'back') => void;
  setNavigationDirection: (direction: 'forward' | 'back') => void;
  
  // User Actions
  setSelectedSchool: (school: string | null) => void;
  setUserName: (name: string) => void;
  setUserPhone: (phone: string) => void;
  setUserInfo: (name: string, phone: string) => void;
  
  // Student Selection Actions
  setSelectedStudentIds: (ids: string[]) => void;
  addSelectedStudent: (id: string) => void;
  removeSelectedStudent: (id: string) => void;
  clearSelectedStudents: () => void;
  
  // Checkout Actions
  setCheckoutServices: (services: CheckoutService[]) => void;
  addCheckoutService: (service: CheckoutService) => void;
  removeCheckoutService: (serviceId: string) => void;
  clearCheckoutServices: () => void;
  setPaymentAmount: (amount: number) => void;
  setPaymentReference: (reference: string) => void;
  
  // Receipt Actions
  setReceiptStudent: (name: string, id: string) => void;
  setReceiptPaymentData: (data: Record<string, PaymentData[]>) => void;
  
  // Tutorial Actions
  setShowTutorial: (show: boolean) => void;
  completeTutorial: () => void;
  
  // Reset Actions
  resetCheckoutFlow: () => void;
  resetAll: () => void;
}

/**
 * Main Application Store
 * Uses Zustand for state management with localStorage persistence
 */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentPage: 'search',
      navigationDirection: 'forward',
      selectedSchool: null,
      userName: '',
      userPhone: '',
      selectedStudentIds: [],
      checkoutServices: [],
      paymentAmount: 0,
      paymentReference: '',
      receiptStudentName: '',
      receiptStudentId: '',
      receiptPaymentData: {},
      showTutorial: false,
      hasSeenTutorial: false,
      
      // Navigation Actions
      navigateToPage: (page, direction = 'forward') => {
        set({ 
          currentPage: page, 
          navigationDirection: direction 
        });
        
        // Update browser history
        const state = { page };
        window.history.pushState(state, '', `#${page}`);
      },
      
      setNavigationDirection: (direction) => set({ navigationDirection: direction }),
      
      // User Actions
      setSelectedSchool: (school) => set({ selectedSchool: school }),
      
      setUserName: (name) => set({ userName: name }),
      
      setUserPhone: (phone) => set({ userPhone: phone }),
      
      setUserInfo: (name, phone) => set({ userName: name, userPhone: phone }),
      
      // Student Selection Actions
      setSelectedStudentIds: (ids) => set({ selectedStudentIds: ids }),
      
      addSelectedStudent: (id) => set((state) => ({
        selectedStudentIds: [...state.selectedStudentIds, id]
      })),
      
      removeSelectedStudent: (id) => set((state) => ({
        selectedStudentIds: state.selectedStudentIds.filter(studentId => studentId !== id)
      })),
      
      clearSelectedStudents: () => set({ selectedStudentIds: [] }),
      
      // Checkout Actions
      setCheckoutServices: (services) => set({ checkoutServices: services }),
      
      addCheckoutService: (service) => set((state) => ({
        checkoutServices: [...state.checkoutServices, service]
      })),
      
      removeCheckoutService: (serviceId) => set((state) => ({
        checkoutServices: state.checkoutServices.filter(s => s.id !== serviceId)
      })),
      
      clearCheckoutServices: () => set({ checkoutServices: [] }),
      
      setPaymentAmount: (amount) => set({ paymentAmount: amount }),
      
      setPaymentReference: (reference) => set({ paymentReference: reference }),
      
      // Receipt Actions
      setReceiptStudent: (name, id) => set({ 
        receiptStudentName: name, 
        receiptStudentId: id 
      }),
      
      setReceiptPaymentData: (data) => set({ receiptPaymentData: data }),
      
      // Tutorial Actions
      setShowTutorial: (show) => set({ showTutorial: show }),
      
      completeTutorial: () => set({ 
        showTutorial: false, 
        hasSeenTutorial: true 
      }),
      
      // Reset Actions
      resetCheckoutFlow: () => set({
        selectedStudentIds: [],
        checkoutServices: [],
        paymentAmount: 0,
        paymentReference: '',
      }),
      
      resetAll: () => set({
        currentPage: 'search',
        navigationDirection: 'forward',
        selectedSchool: null,
        userName: '',
        userPhone: '',
        selectedStudentIds: [],
        checkoutServices: [],
        paymentAmount: 0,
        paymentReference: '',
        receiptStudentName: '',
        receiptStudentId: '',
        receiptPaymentData: {},
      }),
    }),
    {
      name: 'master-fees-storage',
      storage: createJSONStorage(() => localStorage),
      // Persist only necessary user data
      partialize: (state) => ({
        selectedSchool: state.selectedSchool,
        userName: state.userName,
        userPhone: state.userPhone,
        hasSeenTutorial: state.hasSeenTutorial,
      }),
    }
  )
);

/**
 * Selector Hooks for Optimized Re-renders
 * Use these in components that only need specific slices of state
 */

// Navigation Selectors
export const useCurrentPage = () => useAppStore((state) => state.currentPage);
export const useNavigationDirection = () => useAppStore((state) => state.navigationDirection);

// User Selectors
export const useUserInfo = () => useAppStore((state) => ({
  userName: state.userName,
  userPhone: state.userPhone,
  selectedSchool: state.selectedSchool,
}));

// Checkout Selectors
export const useCheckoutData = () => useAppStore((state) => ({
  checkoutServices: state.checkoutServices,
  paymentAmount: state.paymentAmount,
  paymentReference: state.paymentReference,
  selectedStudentIds: state.selectedStudentIds,
}));

// Tutorial Selectors
export const useTutorialState = () => useAppStore((state) => ({
  showTutorial: state.showTutorial,
  hasSeenTutorial: state.hasSeenTutorial,
}));