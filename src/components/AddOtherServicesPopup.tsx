import { useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../imports/svg-rwvnsqykxb";
import { getSchoolServices } from "../data/schoolData";
import type { SchoolService } from "../data/schoolData";

interface AddOtherServicesPopupProps {
  onClose: () => void;
  onDone: (services: Array<{ id: string; name: string; amount: number; category: string; term: string; route?: string }>) => void;
  schoolName: string;
}

/**
 * Bus routes available for each school
 */
const BUS_ROUTES: Record<string, string[]> = {
  "Twalumbu Educational Center": ["Route A - Central", "Route B - East", "Route C - West"],
  "Chimilute Trust Academy": ["Route 1 - Kabulonga", "Route 2 - Roma", "Route 3 - Woodlands", "Route 4 - Chelston"],
  "Julani School": ["Route A - Town Center", "Route B - Parklands", "Route C - Riverside"],
  "Crested Crane Academy": ["Route 1 - CBD", "Route 2 - Northrise", "Route 3 - Kansenshi", "Route 4 - Masala"],
  "International Maarif School": ["Route A - Embassy Area", "Route B - Kabulonga", "Route C - Roma", "Route D - Woodlands", "Route E - Mass Media"]
};

const TERM_OPTIONS = ["Term 1", "Term 2", "Term 3"];

/**
 * Premium Dropdown Component
 * Apple-inspired dropdown with glassmorphism
 */
function PremiumDropdown({ 
  label, 
  value, 
  options, 
  onChange 
}: { 
  label: string; 
  value: string; 
  options: string[]; 
  onChange: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <label className="block font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[10px] text-[#6b7280] uppercase tracking-[0.8px] mb-[6px]">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[36px] px-[12px] pr-[32px] bg-white border border-[#e5e7eb] rounded-[8px] font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#003630] appearance-none cursor-pointer hover:border-[#95e36c] focus:border-[#95e36c] focus:outline-none focus:ring-2 focus:ring-[#95e36c]/20 transition-all touch-manipulation"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Service Checkbox Item with Term and Route Selection
 */
function ServiceCheckbox({ 
  service, 
  isSelected, 
  onToggle,
  term,
  onTermChange,
  route,
  onRouteChange,
  schoolName
}: { 
  service: SchoolService; 
  isSelected: boolean; 
  onToggle: () => void;
  term: string;
  onTermChange: (term: string) => void;
  route?: string;
  onRouteChange?: (route: string) => void;
  schoolName: string;
}) {
  const isTransport = service.category === 'transport';
  const busRoutes = BUS_ROUTES[schoolName] || [];

  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className="w-full text-left px-[16px] py-[12px] hover:bg-[#f5f5f5] transition-colors touch-manipulation rounded-[6px] flex items-start gap-[12px]"
      >
        {/* Custom Checkbox */}
        <div className={`mt-[2px] flex-shrink-0 w-[18px] h-[18px] rounded-[4px] border-2 transition-all ${
          isSelected 
            ? 'bg-[#95e36c] border-[#95e36c]' 
            : 'bg-white border-[#cbd2e0]'
        }`}>
          {isSelected && (
            <svg className="w-full h-full" viewBox="0 0 18 18" fill="none">
              <path 
                d="M4 9L7.5 12.5L14 6" 
                stroke="#003630" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        
        {/* Service Details */}
        <div className="flex-1 min-w-0">
          <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[13px] text-[#003630] tracking-[-0.13px] mb-[2px]">
            {service.name}
          </p>
          <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[11px] text-[#6b7280] tracking-[-0.11px] mb-[4px]">
            {service.description}
          </p>
          <div className="flex items-center gap-[8px]">
            <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[13px] text-[#003630] tracking-[-0.13px]">
              ZMW {service.amount.toLocaleString()}
            </p>
            <span className="px-[6px] py-[2px] bg-[#e0f7d4] rounded-[4px] text-[9px] font-['IBM_Plex_Sans_Devanagari:Medium',sans-serif] text-[#003630] uppercase tracking-[0.5px]">
              {service.category}
            </span>
          </div>
        </div>
      </button>

      {/* Dropdowns (shown when selected) */}
      {isSelected && (
        <div className="px-[16px] pb-[12px] space-y-[8px]" onClick={(e) => e.stopPropagation()}>
          <div className={`grid ${isTransport ? 'grid-cols-2' : 'grid-cols-1'} gap-[8px]`}>
            {/* Term Dropdown */}
            <PremiumDropdown
              label="Select Term"
              value={term}
              options={TERM_OPTIONS}
              onChange={onTermChange}
            />
            
            {/* Route Dropdown (only for transport services) */}
            {isTransport && onRouteChange && (
              <PremiumDropdown
                label="Select Route"
                value={route || busRoutes[0]}
                options={busRoutes}
                onChange={onRouteChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Service Category Group
 * Groups services by category with a header
 */
function ServiceCategoryGroup({ 
  category, 
  services, 
  selectedIds, 
  onToggle,
  serviceTerms,
  onTermChange,
  serviceRoutes,
  onRouteChange,
  schoolName
}: { 
  category: string; 
  services: SchoolService[]; 
  selectedIds: Set<string>; 
  onToggle: (id: string) => void;
  serviceTerms: Record<string, string>;
  onTermChange: (id: string, term: string) => void;
  serviceRoutes: Record<string, string>;
  onRouteChange: (id: string, route: string) => void;
  schoolName: string;
}) {
  if (services.length === 0) return null;

  const categoryLabels: Record<string, string> = {
    tuition: "Tuition Fees",
    meals: "Meals & Catering",
    transport: "Transportation",
    activities: "Activities & Programs",
    supplies: "Supplies & Materials",
    other: "Other Services"
  };

  return (
    <div className="w-full">
      <div className="px-[16px] py-[8px] bg-[#f9fafb] border-b border-[#e5e7eb]">
        <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[11px] text-[#6b7280] uppercase tracking-[0.8px]">
          {categoryLabels[category] || category}
        </p>
      </div>
      <div className="divide-y divide-[#f3f4f6]">
        {services.map(service => (
          <ServiceCheckbox
            key={service.id}
            service={service}
            isSelected={selectedIds.has(service.id)}
            onToggle={() => onToggle(service.id)}
            term={serviceTerms[service.id] || "Term 1"}
            onTermChange={(term) => onTermChange(service.id, term)}
            route={serviceRoutes[service.id]}
            onRouteChange={(route) => onRouteChange(service.id, route)}
            schoolName={schoolName}
          />
        ))}
      </div>
    </div>
  );
}

export default function AddOtherServicesPopup({ onClose, onDone, schoolName }: AddOtherServicesPopupProps) {
  const [selectedServiceIds, setSelectedServiceIds] = useState<Set<string>>(new Set());
  const [serviceTerms, setServiceTerms] = useState<Record<string, string>>({});
  const [serviceRoutes, setServiceRoutes] = useState<Record<string, string>>({});
  
  // Get all services and filter out tuition (handled by Add School Fees)
  const allServices = getSchoolServices(schoolName).filter(service => service.category !== 'tuition');
  
  // Group services by category
  const servicesByCategory = allServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, SchoolService[]>);

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
        // Initialize with default term if not set
        if (!serviceTerms[serviceId]) {
          setServiceTerms(prev => ({ ...prev, [serviceId]: "Term 1" }));
        }
        // Initialize with default route for transport services
        const service = allServices.find(s => s.id === serviceId);
        if (service?.category === 'transport' && !serviceRoutes[serviceId]) {
          const routes = BUS_ROUTES[schoolName] || [];
          if (routes.length > 0) {
            setServiceRoutes(prev => ({ ...prev, [serviceId]: routes[0] }));
          }
        }
      }
      return newSet;
    });
  };

  const handleTermChange = (serviceId: string, term: string) => {
    setServiceTerms(prev => ({ ...prev, [serviceId]: term }));
  };

  const handleRouteChange = (serviceId: string, route: string) => {
    setServiceRoutes(prev => ({ ...prev, [serviceId]: route }));
  };

  const handleDone = () => {
    const selectedServices = allServices
      .filter(service => selectedServiceIds.has(service.id))
      .map(service => ({
        id: service.id,
        name: service.name,
        amount: service.amount,
        category: service.category,
        term: serviceTerms[service.id] || "Term 1",
        ...(service.category === 'transport' && { route: serviceRoutes[service.id] })
      }));
    
    onDone(selectedServices);
  };

  const selectedCount = selectedServiceIds.size;
  const totalAmount = allServices
    .filter(service => selectedServiceIds.has(service.id))
    .reduce((sum, service) => sum + service.amount, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-[16px]">
        <motion.div
          className="bg-white rounded-[16px] shadow-[0px_20px_60px_rgba(0,54,48,0.25)] pointer-events-auto w-full max-w-[480px] max-h-[80vh] flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="px-[20px] py-[18px] border-b border-[#e5e7eb]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[16px] text-[#003630] tracking-[-0.16px] mb-[2px]">
                  Add Services
                </p>
                <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[11px] text-[#6b7280] tracking-[-0.11px]">
                  Select services, term, and route for {schoolName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-[32px] h-[32px] rounded-full hover:bg-[#f3f4f6] transition-colors flex items-center justify-center touch-manipulation"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Services List - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <ServiceCategoryGroup
                key={category}
                category={category}
                services={services}
                selectedIds={selectedServiceIds}
                onToggle={toggleService}
                serviceTerms={serviceTerms}
                onTermChange={handleTermChange}
                serviceRoutes={serviceRoutes}
                onRouteChange={handleRouteChange}
                schoolName={schoolName}
              />
            ))}
            
            {allServices.length === 0 && (
              <div className="py-[40px] px-[20px] text-center">
                <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[13px] text-[#6b7280]">
                  No services available for this school.
                </p>
              </div>
            )}
          </div>

          {/* Footer with Summary and Done Button */}
          <div className="border-t border-[#e5e7eb] px-[20px] py-[16px] bg-[#fafbfc]">
            {selectedCount > 0 && (
              <div className="mb-[12px] flex items-center justify-between">
                <p className="font-['IBM_Plex_Sans_Devanagari:Regular',sans-serif] text-[12px] text-[#6b7280]">
                  {selectedCount} service{selectedCount !== 1 ? 's' : ''} selected
                </p>
                <p className="font-['IBM_Plex_Sans_Devanagari:Bold',sans-serif] text-[14px] text-[#003630]">
                  Total: ZMW {totalAmount.toLocaleString()}
                </p>
              </div>
            )}
            
            <button 
              onClick={handleDone}
              disabled={selectedCount === 0}
              className="bg-[#95e36c] w-full h-[48px] rounded-[12px] transition-all touch-manipulation active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0px_4px_0px_0px_rgba(149,227,108,0.3)] active:shadow-[0px_1px_0px_0px_rgba(149,227,108,0.3)] active:translate-y-[3px] disabled:active:translate-y-0"
            >
              <p className="font-['IBM_Plex_Sans_Devanagari:SemiBold',sans-serif] text-[14px] text-[#003630] tracking-[-0.14px]">
                {selectedCount > 0 ? `Add ${selectedCount} Service${selectedCount !== 1 ? 's' : ''}` : 'Select Services'}
              </p>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}