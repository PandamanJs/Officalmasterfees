# Form Validation Strategy

## Overview

Master-Fees implements **silent, real-time validation** across all form inputs. This means:
- ✅ Buttons are automatically disabled when forms are invalid
- ✅ Validation happens as you type (for some fields) or on blur (for others)
- ✅ No intrusive popups - only subtle visual feedback
- ✅ Clear error messages when needed
- ✅ Users cannot proceed without completing required fields

## Validation by Page

### 1. Search Page (School Selection)
**Required:** School must be selected

**Behavior:**
- "Continue" button is disabled until a school is selected
- Selection is tracked via radio button state
- No error messages - just disabled button state

**Code Location:** `App.tsx` - lines 655-660

### 2. Details Page (Phone Number Entry)
**Required:** Valid phone number (9 digits for Zambia)

**Behavior:**
- Input validates on blur (when you tap away)
- Real-time formatting (XXX-XXX-XXX)
- Checks if phone exists in system
- Auto-fills from localStorage if available
- "Proceed" button disabled until validation passes
- Toast notifications for errors/success

**Validation Rules:**
- Must be exactly 9 digits (Zambian format)
- Must be registered in system
- Auto-saves to localStorage on success

**Code Location:** `SchoolDetailsPage.tsx` - lines 199-247, 469-478

### 3. Services Dashboard
**Required:** No validation (just navigation)

**Behavior:**
- All actions are optional
- Can view history, pay fees, or view receipts
- No form inputs to validate

### 4. Pay Fees Page (Student Selection)
**Required:** At least one student selected

**Behavior:**
- "Continue" button disabled until at least one student is selected
- Visual feedback (checkmark appears when selected)
- Hover/active states for better UX
- Silent validation - no error messages

**Validation Rules:**
- `selectedStudents.length > 0`

**Code Location:** `PayForSchoolFees.tsx` - lines 333-347, 407

### 5. Add Services Page (Service Selection)
**Required:** At least one service selected

**Behavior:**
- "Continue" or "Checkout" button disabled until services are added
- Shows count of selected services
- Can adjust quantities for each service
- Remove individual services
- Visual feedback for each action

**Validation Rules:**
- `selectedServices.length > 0`
- `hasServices = totalServicesCount > 0`

**Code Location:** `AddServicesPage.tsx` - line 683

### 6. Checkout Page (Review)
**Required:** No additional validation (review only)

**Behavior:**
- Shows all selected items
- Can go back to modify
- "Pay" button always enabled (nothing to validate)

### 7. Payment Page (Payment Method)
**Required:** Payment method selected + valid payment details

**Behavior:**

#### Mobile Money:
- Select provider (Airtel, MTN, Zamtel)
- Enter phone number
- Validates: `mobileNumber.length >= 10`
- Button disabled until valid

#### Card Payment:
- Card number (13-19 digits, Luhn algorithm)
- Expiry date (MM/YY, not expired)
- CVV (3-4 digits)
- Real-time validation on blur
- Shows error messages under each field
- Button disabled until all fields valid

**Validation Rules:**
```typescript
// Card Number
- Required
- 13-19 digits
- Must pass Luhn algorithm checksum

// Expiry Date
- Required
- MM/YY format (exactly 4 digits)
- Month: 01-12
- Must not be expired

// CVV
- Required
- 3-4 digits
```

**Code Location:** `PaymentPage.tsx` - lines 697-729

### 8. Processing Page
**Required:** No validation (automated)

**Behavior:**
- Shows loading state
- Processes payment via Supabase
- Auto-redirects on completion

### 9. Success/Failed Pages
**Required:** No validation (result display)

**Behavior:**
- Shows result
- Options to download receipt or go home

## Validation Utilities

### Created Files

#### `/utils/validation.ts`
Centralized validation functions:
- `validatePhoneNumber()`
- `validateName()`
- `validateCardNumber()` - Luhn algorithm
- `validateExpiryDate()` - Date validation
- `validateCVV()`
- `validateEmail()`
- `validateAmount()`
- `validateSelection()` - Array validation
- Helper functions for form validation

#### `/hooks/useFormValidation.ts`
React hook for form validation:
```typescript
const { 
  values, 
  errors, 
  isValid, 
  isComplete,
  handleChange, 
  handleBlur 
} = useFormValidation(
  initialValues,
  validationRules,
  requiredFields
);
```

## Visual Feedback Strategy

### Button States

**Enabled:**
```css
bg-[#003630]              /* Primary green */
active:scale-[0.98]       /* Press effect */
shadow-[...]              /* Depth */
```

**Disabled:**
```css
disabled:opacity-50                     /* Faded */
disabled:cursor-not-allowed             /* No pointer */
disabled:active:scale-100               /* No press effect */
disabled:active:shadow-[...]            /* No shadow change */
```

### Input States

**Normal:**
```css
border-[0.5px] border-solid border-[#003049]
```

**Error:**
```css
border-red-500
text-red-500              /* Error message */
```

**Success:**
```css
/* No special styling - clean is success */
```

### Error Messages

**Toast Notifications:**
- Phone validation errors
- Network errors
- System errors

**Inline Errors:**
- Card number validation
- Expiry date validation
- CVV validation

## Validation Flow Examples

### Example 1: Phone Number Entry
```
User Action                 System Response
-----------                 ---------------
1. Enter "977"              → Format: "977"
2. Enter "123"              → Format: "977-123"
3. Enter "456"              → Format: "977-123-456"
4. Tap away (blur)          → Validate
5. Invalid/Not found        → Toast error + Keep button disabled
6. Valid + Found            → Toast success + Enable button
7. Click Proceed            → Navigate to next page
```

### Example 2: Student Selection
```
User Action                 System Response
-----------                 ---------------
1. Page loads               → Button disabled
2. Click student card       → Checkmark appears
3. Button state             → Enabled
4. Click button             → Navigate with selectedStudents
```

### Example 3: Card Payment
```
User Action                 System Response
-----------                 ---------------
1. Enter card: "4111"       → Format as typing
2. Tap away                 → Validate (too short)
3. Error shown              → "Card number must be..."
4. Complete: "4111111111111111" → Validate (Luhn pass)
5. Error clears             → No message
6. Enter expiry: "12/25"    → Validate (not expired)
7. Enter CVV: "123"         → Validate (3 digits OK)
8. All valid                → Enable Pay button
9. Click Pay                → Process payment
```

## Best Practices

### 1. Validate on Blur (Not on Every Keystroke)
✅ **Do:**
```typescript
<input onBlur={validateField} />
```

❌ **Don't:**
```typescript
<input onChange={validateField} /> // Too aggressive
```

### 2. Silent Validation (No Intrusive Alerts)
✅ **Do:**
```typescript
<button disabled={!isValid}>Continue</button>
```

❌ **Don't:**
```typescript
onClick={() => alert('Please fill all fields')}
```

### 3. Progressive Disclosure
✅ **Do:**
- Show errors only after user interaction
- Use `touched` state to track
- Only validate fields user has interacted with

❌ **Don't:**
- Show all errors on page load
- Validate untouched fields

### 4. Clear Error Messages
✅ **Do:**
```typescript
"Phone number must be exactly 9 digits"
```

❌ **Don't:**
```typescript
"Invalid input"
```

### 5. Auto-format Where Possible
✅ **Do:**
```typescript
// Phone: 977123456 → 977-123-456
// Card: 4111111111111111 → 4111 1111 1111 1111
// Expiry: 1225 → 12/25
```

## Testing Checklist

For each page with validation:

- [ ] Button disabled on page load (if applicable)
- [ ] Button enabled after valid input
- [ ] Button stays disabled with invalid input
- [ ] Error messages are clear and helpful
- [ ] Validation happens at right time (blur vs change)
- [ ] Auto-formatting works correctly
- [ ] Can't bypass validation by clicking fast
- [ ] Touch-friendly on mobile (large tap targets)
- [ ] Keyboard navigation works
- [ ] Screen reader announces errors

## Summary

✅ **All pages have proper validation**
✅ **Buttons auto-disable when invalid**
✅ **Silent detection - no intrusive popups**
✅ **Clear error messages when needed**
✅ **Auto-formatting for better UX**
✅ **Touch-friendly for mobile**
✅ **Validation utilities available for future forms**

**The app prevents progression without proper input on every page!**
