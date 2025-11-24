# Master-Fees Quick Reference

## 🎯 What You Have Now

### ✅ State Management (Zustand)
- Centralized store with localStorage persistence
- Clean selectors for performance
- Modular slices for organization

### ✅ Form Validation (Complete)
- All pages prevent progression without input
- Silent, real-time validation
- Beautiful visual feedback
- Touch-friendly for mobile

### ✅ Scalability Infrastructure
- Centralized types (`/types/index.ts`)
- Configuration constants (`/config/constants.ts`)
- API abstraction layer (`/lib/api/`)
- Error boundaries (`/components/ErrorBoundary.tsx`)
- Professional logging (`/utils/logger.ts`)
- Validation utilities (`/utils/validation.ts`)

### ✅ Documentation
- Scaling guide
- Migration examples
- Architecture diagrams
- Validation documentation
- Implementation summary

## 📁 File Organization

```
/master-fees
├── /components          # React components
│   ├── /ui             # Shadcn components
│   ├── ErrorBoundary.tsx
│   ├── Tutorial.tsx (Apple-styled, no emojis)
│   └── ...pages
├── /stores             # Zustand state
│   ├── /slices         # Modular state slices
│   └── useAppStore.ts
├── /lib                # Core libraries
│   └── /api           # API abstraction
├── /types              # TypeScript types
├── /config             # Constants & config
├── /utils              # Utilities
│   ├── validation.ts   # Form validation
│   └── logger.ts      # Logging system
├── /hooks              # Custom React hooks
│   └── useFormValidation.ts
└── /docs               # Documentation (these files)
```

## 🚀 Quick Start Guide

### Add New Validation

```typescript
// 1. Import utilities
import { useFormValidation } from '../hooks/useFormValidation';
import { validateName } from '../utils/validation';

// 2. Set up form
const { values, errors, handleChange, handleBlur, isValid } = 
  useFormValidation(
    { name: '' },
    { name: { validator: validateName, validateOnBlur: true } },
    ['name']
  );

// 3. Use in JSX
<input
  value={values.name}
  onChange={(e) => handleChange('name')(e.target.value)}
  onBlur={handleBlur('name')}
  className={errors.name ? 'input-error' : 'input-base'}
/>
{errors.name && <p className="error-message">{errors.name}</p>}

// 4. Disable button
<button disabled={!isValid}>Submit</button>
```

### Add New API Call

```typescript
// 1. Import client
import { api } from '../lib/api/services';
import { log } from '../utils/logger';

// 2. Make request
const { data, error } = await api.students.search(query);

// 3. Handle response
if (error) {
  log.error('Failed to search students', error);
  toast.error(error.message);
  return;
}

// 4. Use data (fully typed!)
setStudents(data); // data is Student[]
```

### Add New Constant

```typescript
// 1. Edit /config/constants.ts
export const PAYMENT_CONFIG = {
  SERVICE_FEE_PERCENTAGE: 0.02,
  // ... add new constant
  NEW_SETTING: 'value',
} as const;

// 2. Import and use
import { PAYMENT_CONFIG } from '../config/constants';

const fee = amount * PAYMENT_CONFIG.SERVICE_FEE_PERCENTAGE;
```

### Add New Type

```typescript
// 1. Edit /types/index.ts
export interface NewEntity {
  id: string;
  name: string;
  // ...
}

// 2. Import and use
import type { NewEntity } from '../types';

const entity: NewEntity = { id: '1', name: 'Test' };
```

### Add Logging

```typescript
import { log } from '../utils/logger';

// Debug (dev only)
log.debug('Component mounted', { props });

// Info
log.info('User logged in', { userId });

// Warning
log.warn('Deprecated API used', { endpoint });

// Error
log.error('Payment failed', error);

// API calls
log.api.request('POST', '/api/payment', data);
log.api.response('POST', '/api/payment', 200, response);

// Performance
const endTimer = log.perf.start('Data Processing');
// ... do work
endTimer(); // Logs: [PERF] Data Processing: 245ms
```

## 🎨 CSS Classes Available

### Buttons
```css
.btn-primary      /* Green gradient button */
.btn-dark         /* Dark green button */
.btn-ghost        /* Transparent with border */
```

### Cards
```css
.card             /* White card with shadow */
.card-interactive /* Clickable card */
```

### Glass Effects
```css
.glass            /* White frosted glass */
.glass-dark       /* Dark frosted glass */
.glass-green      /* Green tinted glass */
```

### Form Inputs
```css
.input-base       /* Normal input state */
.input-error      /* Error state (red) */
.input-success    /* Success state (green) */
.error-message    /* Error text style */
```

### Animations
```css
.animate-fade-in         /* Fade in from bottom */
.animate-scale-in        /* Scale up */
.animate-slide-in-right  /* Slide from right */
.animate-slide-in-left   /* Slide from left */
```

### Selection
```css
.selectable       /* Clickable item */
.selected         /* Selected state */
.validating       /* Pulse animation */
```

## 📊 Validation Rules Quick Reference

| Field | Min | Max | Pattern | Validation |
|-------|-----|-----|---------|------------|
| Phone | 10 | 13 | Digits only | On blur |
| Name | 2 | 100 | Letters, spaces | On blur |
| Card | 13 | 19 | Digits, Luhn | On blur |
| Expiry | 4 | 4 | MMYY, not expired | On blur |
| CVV | 3 | 4 | Digits | On blur |
| Email | - | - | email@domain.com | On blur |

## 🔧 Constants Quick Reference

```typescript
// API
API_CONFIG.BASE_URL
API_CONFIG.TIMEOUT           // 30000ms
API_CONFIG.RETRY_ATTEMPTS    // 3

// Payment
PAYMENT_CONFIG.SERVICE_FEE_PERCENTAGE  // 0.02 (2%)
PAYMENT_CONFIG.MIN_AMOUNT             // 10
PAYMENT_CONFIG.MAX_AMOUNT             // 1000000
PAYMENT_CONFIG.CURRENCY               // 'ZMW'

// Validation
VALIDATION.PHONE_MIN_LENGTH    // 10
VALIDATION.PHONE_MAX_LENGTH    // 13
VALIDATION.NAME_MIN_LENGTH     // 2
VALIDATION.DEBOUNCE_DELAY      // 300ms

// Colors
COLORS.PRIMARY        // #95e36c
COLORS.PRIMARY_DARK   // #003630
COLORS.SUCCESS        // #4abb1a
COLORS.ERROR          // #ef4444

// Animation
ANIMATION_DURATION.FAST      // 200ms
ANIMATION_DURATION.NORMAL    // 400ms
ANIMATION_DURATION.SLOW      // 600ms
```

## 🐛 Debugging

### Check Validation State
```typescript
// In component
console.log('Is valid:', isValid);
console.log('Is complete:', isComplete);
console.log('Errors:', errors);
console.log('Values:', values);
```

### Check Store State
```typescript
// In component
import { useAppStore } from '../stores/useAppStore';

const state = useAppStore.getState();
console.log('Full state:', state);
```

### Check API Response
```typescript
const { data, error } = await api.students.search(query);
console.log('Data:', data);
console.log('Error:', error);
```

### Enable Detailed Logging
```typescript
import { logger } from '../utils/logger';

// Enable all logs
logger.enable();

// Set log level
logger.configure({ level: 'debug' });
```

## 📱 Testing Checklist

### Quick Test
- [ ] App loads without errors
- [ ] Can navigate through all pages
- [ ] Buttons are disabled when they should be
- [ ] Buttons enable after valid input
- [ ] Form validation works on all pages
- [ ] Toast notifications appear
- [ ] Animations are smooth

### Validation Test
- [ ] Phone entry validates
- [ ] Student selection works
- [ ] Service selection works
- [ ] Card validation catches errors
- [ ] Expiry date validation works
- [ ] CVV validation works
- [ ] Can't bypass validation

### Mobile Test
- [ ] Touch targets are large enough
- [ ] Keyboard doesn't zoom page
- [ ] Animations are smooth
- [ ] No horizontal scroll
- [ ] All buttons work on touch

## 🎯 Common Tasks

### Disable a Feature
```typescript
// Edit /config/constants.ts
export const FEATURES = {
  ENABLE_CARD_PAYMENT: false, // Disable this
  // ...
} as const;
```

### Change Service Fee
```typescript
// Edit /config/constants.ts
export const PAYMENT_CONFIG = {
  SERVICE_FEE_PERCENTAGE: 0.03, // Change from 0.02 to 0.03
  // ...
} as const;
```

### Add Custom Validation
```typescript
// Add to /utils/validation.ts
export function validateCustomField(value: string): string {
  if (!value) return 'Field is required';
  if (value.length < 5) return 'Must be at least 5 characters';
  return ''; // Valid
}
```

### Update Error Message
```typescript
// Edit /config/constants.ts
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Custom network error message',
  // ...
} as const;
```

## 📚 Documentation Links

- `/SCALING_GUIDE.md` - Complete scaling strategy
- `/MIGRATION_EXAMPLE.md` - Code migration examples
- `/ARCHITECTURE.md` - System architecture
- `/FORM_VALIDATION.md` - Validation guide
- `/VALIDATION_SUMMARY.md` - Validation summary
- `/IMPLEMENTATION_SUMMARY.md` - What was built

## 💡 Tips

### Performance
- Use `React.memo` for expensive components
- Use `useMemo` for expensive calculations
- Use Zustand selectors for specific state
- Lazy load pages with `React.lazy`

### Type Safety
- Always import types from `/types/index.ts`
- Never use `any` - use `unknown` instead
- Use type guards for runtime checks
- Leverage TypeScript's inference

### Validation
- Validate on blur, not on every keystroke
- Show errors only after user interaction
- Auto-format inputs (phone, card, etc.)
- Disable buttons silently (no alerts)

### Error Handling
- Always check for errors from API calls
- Log errors with context
- Show user-friendly messages
- Never expose technical details to users

## 🆘 Common Issues

### Button Not Disabling
```typescript
// Make sure you're checking the right condition
<button disabled={!isValid || !isComplete}>
  {/* Not just !isValid */}
</button>
```

### Validation Not Running
```typescript
// Make sure you have the right event handler
<input
  onBlur={handleBlur('fieldName')} // Not onChange
  // ...
/>
```

### Type Errors
```typescript
// Import types properly
import type { Student } from '../types'; // With 'type'
```

### Store Not Persisting
```typescript
// Check partialize config in useAppStore.ts
partialize: (state) => ({
  // Add fields that should persist
  userName: state.userName,
})
```

## Summary

Everything you need is now organized and documented:
- ✅ Validation works on all pages
- ✅ Types are centralized
- ✅ Constants are configurable
- ✅ API layer is ready
- ✅ Error handling is robust
- ✅ Documentation is complete

**Just code and let the infrastructure handle the rest!** 🚀
