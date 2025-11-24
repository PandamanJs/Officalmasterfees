# Testing Lenco Payment Integration (Frontend Only)

## Setup for Testing

### 1. Get Your Lenco Sandbox API Keys

1. Go to https://lenco.co and sign up/login
2. Navigate to the Developer section
3. Copy your **Sandbox Public Key** (starts with `pk_sandbox_`)

### 2. Configure Environment Variable

Edit the `.env` file in your project root:

```bash
# Lenco Payment Gateway Configuration
VITE_LENCO_PUBLIC_KEY=pk_sandbox_YOUR_ACTUAL_KEY_HERE

# Test Mode - Set to true to skip backend verification
VITE_TEST_MODE=true
```

**Important**: Replace `pk_sandbox_YOUR_ACTUAL_KEY_HERE` with your actual Lenco sandbox public key!

### 3. Start Your Development Server

```bash
npm run dev
# or
yarn dev
```

## Testing Flow

### Step 1: Navigate to Payment Page
1. Open the app in your browser
2. Select a school (e.g., Twalumbu Educational Center)
3. Add some school fees or services
4. Proceed to checkout
5. Click "Pay" to reach the payment page

### Step 2: Select Payment Method

#### Option A: Mobile Money
1. Click on "Mobile Money" to expand
2. Enter a test Zambian phone number (e.g., `0977433571`)
3. The system will auto-detect the network (Airtel/MTN/Zamtel)
4. Click the "Pay" button

#### Option B: Card Payment
1. Click on "Online Card Payment" to expand
2. Use Lenco's test card numbers (check Lenco documentation)
3. Enter expiry date (any future date, format: MMYYYY)
4. Enter CVV (any 3-4 digits for testing)
5. Click the "Pay" button

### Step 3: Lenco Widget Opens

The Lenco payment widget will pop up in a modal/iframe. You should see:
- Payment amount
- Your customer details (name, phone, email)
- School name
- Payment options (Card or Mobile Money)

### Step 4: Complete Test Payment

Follow the Lenco widget's instructions:
- For card payments: Enter test card details
- For mobile money: Enter test mobile money details
- Complete the payment flow

### Step 5: Payment Processing

After successful payment:
- The widget will close
- You'll see a "Processing Payment" screen
- Since `VITE_TEST_MODE=true`, it will simulate verification
- After ~2.5 seconds, you'll see the success page

## Console Logs to Watch

Open your browser's developer console (F12) to see detailed logs:

### When Payment Page Loads
```
✅ Lenco payment widget loaded successfully
```

### When You Click "Pay"
```
🔑 Using Lenco public key: pk_sandbox_...
💳 Initializing Lenco payment with:
   Amount: K10200.00
   Customer: John Doe
   Phone: 0971234567
   Email: 0971234567@masterfees.app
   School: Twalumbu Educational Center
   Services: 2
🚀 Lenco payment widget opened
```

### On Successful Payment
```
✅ Payment successful with reference: MF-20241124-1732464000000-A3X9K2
```

### On Processing Page (Test Mode)
```
🧪 TEST MODE: Simulating payment verification
✅ TEST MODE: Payment reference: MF-20241124-1732464000000-A3X9K2
```

## Common Issues & Solutions

### ❌ "Payment system is loading"
**Problem**: Lenco widget script hasn't loaded yet

**Solutions**:
- Check your internet connection
- Wait a few seconds and try again
- Check browser console for errors
- Ensure the script tag is in `/index.html`

### ❌ "Payment system not configured"
**Problem**: `VITE_LENCO_PUBLIC_KEY` not set or incorrect

**Solutions**:
- Check your `.env` file exists in project root
- Verify the key starts with `pk_sandbox_`
- Restart your development server after editing `.env`
- Check for typos in the environment variable name

### ❌ Lenco Widget Doesn't Open
**Problem**: JavaScript error or blocked script

**Solutions**:
- Check browser console for errors
- Disable ad blockers temporarily
- Try a different browser
- Verify internet connection
- Check if third-party cookies are enabled

### ❌ Payment Widget Shows Error
**Problem**: Invalid API key or Lenco service issue

**Solutions**:
- Verify your Lenco public key is correct
- Check if you're using the sandbox key (starts with `pk_sandbox_`)
- Contact Lenco support if issue persists
- Check Lenco's status page for service outages

## Test Scenarios

### ✅ Happy Path - Mobile Money
1. Select Mobile Money
2. Enter: `0977433571` (Airtel)
3. Click Pay
4. Complete payment in Lenco widget
5. See success page

### ✅ Happy Path - Card Payment
1. Select Card Payment
2. Enter test card number from Lenco docs
3. Enter future expiry: `122025`
4. Enter CVV: `123`
5. Click Pay
6. Complete payment in Lenco widget
7. See success page

### ✅ Validation Test
1. Select Card Payment
2. Enter invalid card: `123`
3. Try to click Pay
4. Should show validation error
5. Fix errors and try again

### ✅ Cancel Test
1. Select payment method
2. Click Pay
3. Close Lenco widget without paying
4. Should show "Payment cancelled" toast
5. You remain on payment page

## Production Readiness Checklist

Before switching to production mode:

- [ ] Test all payment methods work correctly
- [ ] Verify payment references are unique
- [ ] Check console logs are clean (no errors)
- [ ] Test on mobile devices
- [ ] Test with slow internet connection
- [ ] Verify amounts are calculated correctly
- [ ] Test the cancel flow
- [ ] Test with real (small) payments in sandbox

When ready for production:

1. Set `VITE_TEST_MODE=false` in `.env`
2. Replace sandbox keys with production keys
3. Update script URL in `/index.html`
4. Update API URL in backend (when backend is added)
5. Deploy and test thoroughly

## Important Notes

### 🧪 Test Mode (Current Setup)
- **Backend verification**: DISABLED
- **Payment storage**: DISABLED  
- **Success rate**: 100% (simulated)
- **Purpose**: Frontend testing only

### 🚀 Production Mode (Future)
- **Backend verification**: ENABLED
- **Payment storage**: ENABLED
- **Success rate**: Based on real payments
- **Purpose**: Live transactions

## Debug Checklist

If payments aren't working:

1. ✅ Check `.env` file has correct `VITE_LENCO_PUBLIC_KEY`
2. ✅ Restart dev server after editing `.env`
3. ✅ Open browser console and look for errors
4. ✅ Verify Lenco script loaded (search for "LencoPay" in console)
5. ✅ Check internet connection
6. ✅ Try incognito/private browsing mode
7. ✅ Test on different browser
8. ✅ Clear browser cache and cookies
9. ✅ Check Lenco dashboard for API key status

## Support

### Lenco Support
- Documentation: https://docs.lenco.co
- Email: support@lenco.co
- Dashboard: https://dashboard.lenco.co

### Quick Links
- Lenco API Reference: https://docs.lenco.co/api-reference
- Test Cards: Check Lenco documentation for test card numbers
- Status Page: Check Lenco's website for service status

---

**Happy Testing! 🚀**

Remember: This is test mode with simulated verification. No real payments are being processed or saved to the backend yet.
