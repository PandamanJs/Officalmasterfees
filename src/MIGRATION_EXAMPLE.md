# Migration Example

This guide shows how to migrate existing code to use the new scalable architecture.

## Example 1: Update Store to Use Centralized Types

### Before
```typescript
// stores/useAppStore.ts
export type PageType = "search" | "details" | ...;

export interface CheckoutService {
  id: string;
  description: string;
  amount: number;
}
```

### After
```typescript
// stores/useAppStore.ts
import type { PageType, CheckoutService } from '../types';
// Types are now centralized - no duplication!
```

## Example 2: Replace Magic Numbers with Constants

### Before
```typescript
// ProcessingPage.tsx
const serviceFee = paymentAmount * 0.02; // What is 0.02?
const MIN_PHONE_LENGTH = 10; // Defined in multiple places
```

### After
```typescript
// ProcessingPage.tsx
import { PAYMENT_CONFIG, VALIDATION } from '../config/constants';

const serviceFee = paymentAmount * PAYMENT_CONFIG.SERVICE_FEE_PERCENTAGE;
if (phone.length < VALIDATION.PHONE_MIN_LENGTH) {
  // ...
}
```

## Example 3: Replace Direct Fetch with API Client

### Before
```typescript
// Component.tsx
try {
  const response = await fetch('/api/students/search?query=' + query);
  const data = await response.json();
  setStudents(data);
} catch (error) {
  console.error(error);
  // No retry, no proper error handling
}
```

### After
```typescript
// Component.tsx
import { api } from '../lib/api/services';
import { log } from '../utils/logger';

const { data, error } = await api.students.search(query);

if (error) {
  log.error('Failed to search students', error);
  toast.error('Failed to load students. Please try again.');
  return;
}

// data is typed as Student[]
setStudents(data);
```

## Example 4: Add Error Boundary

### Before
```typescript
// main.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### After
```typescript
// main.tsx
import { ErrorBoundary } from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

## Example 5: Add Logging for Debugging

### Before
```typescript
// PaymentPage.tsx
const handleSubmit = async () => {
  console.log('Processing payment...');
  // ...
  console.log('Payment complete');
};
```

### After
```typescript
// PaymentPage.tsx
import { log } from '../utils/logger';

const handleSubmit = async () => {
  const endTimer = log.perf.start('Payment Processing');
  
  log.info('Starting payment process', { amount, method });
  
  const { data, error } = await api.payment.process(paymentData);
  
  if (error) {
    log.error('Payment failed', error);
    endTimer();
    return;
  }
  
  log.info('Payment successful', data);
  endTimer(); // Logs: [PERF] Payment Processing: 1250ms
};
```

## Example 6: Use Modular Store Slices

### Before (Large monolithic store)
```typescript
// useAppStore.ts - 300+ lines
export const useAppStore = create<AppState>()(
  persist((set, get) => ({
    // 50+ state properties
    // 50+ actions
  }))
);
```

### After (Modular slices)
```typescript
// stores/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createNavigationSlice } from './slices/navigationSlice';
import { createUserSlice } from './slices/userSlice';
import { createCheckoutSlice } from './slices/checkoutSlice';

// Combine slices (Future improvement)
export const useAppStore = create<
  NavigationSlice & UserSlice & CheckoutSlice
>()(
  persist(
    (...a) => ({
      ...createNavigationSlice(...a),
      ...createUserSlice(...a),
      ...createCheckoutSlice(...a),
    }),
    {
      name: 'master-fees-storage',
      partialize: (state) => ({
        selectedSchool: state.selectedSchool,
        userName: state.userName,
        userPhone: state.userPhone,
      }),
    }
  )
);
```

## Example 7: Add Loading States

### Before
```typescript
const [students, setStudents] = useState([]);

useEffect(() => {
  fetchStudents().then(setStudents);
}, []);

return <StudentList students={students} />;
```

### After
```typescript
const [students, setStudents] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const loadStudents = async () => {
    setIsLoading(true);
    setError(null);
    
    const { data, error: apiError } = await api.students.getAll();
    
    if (apiError) {
      setError(apiError.message);
      setIsLoading(false);
      return;
    }
    
    setStudents(data);
    setIsLoading(false);
  };
  
  loadStudents();
}, []);

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;

return <StudentList students={students} />;
```

## Example 8: Feature Flags

### Before
```typescript
// Always show card payment
<CardPaymentOption />
```

### After
```typescript
import { FEATURES } from '../config/constants';

{FEATURES.ENABLE_CARD_PAYMENT && <CardPaymentOption />}
{FEATURES.ENABLE_MOBILE_MONEY && <MobileMoneyOption />}
```

## Example 9: Type-Safe Constants

### Before
```typescript
if (paymentMethod === 'airtel') { // Typo-prone
  // ...
}
```

### After
```typescript
import type { PaymentMethod } from '../types';

const method: PaymentMethod = 'airtel-money'; // Type-safe!

// TypeScript will catch typos at compile time
if (method === 'airtel') { // ❌ Error: Type '"airtel"' is not assignable
  // ...
}
```

## Example 10: Better Error Messages

### Before
```typescript
catch (error) {
  toast.error('Error');
}
```

### After
```typescript
import { ERROR_MESSAGES } from '../config/constants';

if (error.code === 'NETWORK_ERROR') {
  toast.error(ERROR_MESSAGES.NETWORK_ERROR);
} else if (error.statusCode === 500) {
  toast.error(ERROR_MESSAGES.SERVER_ERROR);
} else {
  toast.error(error.message || ERROR_MESSAGES.VALIDATION_ERROR);
}
```

## Migration Checklist

### Phase 1: Types & Constants (1-2 hours)

- [ ] Import types from `/types/index.ts` in all files
- [ ] Replace magic numbers with constants from `/config/constants.ts`
- [ ] Update store to import types instead of defining them

### Phase 2: Error Handling (2-3 hours)

- [ ] Wrap app with `ErrorBoundary`
- [ ] Add loading states to async operations
- [ ] Add error states and user feedback

### Phase 3: API Layer (3-4 hours)

- [ ] Replace fetch calls with `api` client
- [ ] Add proper error handling to all API calls
- [ ] Add logging for debugging

### Phase 4: Performance (Ongoing)

- [ ] Add `React.memo` to expensive components
- [ ] Implement code splitting for large pages
- [ ] Add performance monitoring

## Quick Wins (Do These First!)

1. **Add ErrorBoundary** (5 minutes)
   - Prevents app crashes
   - Better user experience

2. **Import Types** (30 minutes)
   - Delete duplicate type definitions
   - Import from `/types/index.ts`

3. **Use Constants** (1 hour)
   - Replace magic numbers
   - Easier to maintain

4. **Add Logging** (30 minutes)
   - Better debugging
   - Track user flows

## Testing Your Changes

After migration, test:

1. ✅ App loads without errors
2. ✅ All pages navigate correctly
3. ✅ Payment flow works end-to-end
4. ✅ Error states display properly
5. ✅ Loading states appear
6. ✅ Browser console shows clean logs

## Need Help?

- Check `/SCALING_GUIDE.md` for detailed explanations
- Review `/types/index.ts` for all available types
- Look at `/config/constants.ts` for all constants
- Check `/lib/api/services.ts` for API methods

## Summary

These changes will:

✅ Reduce bugs through type safety
✅ Make code easier to maintain
✅ Improve error handling
✅ Better developer experience
✅ Prepare for scale

Start with Phase 1 (Types & Constants) - it's the easiest and highest impact!
