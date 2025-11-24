# Lenco Payment Integration Documentation

## Overview
Master-Fees now integrates with Lenco payment gateway to process school fee payments in Zambia. The integration supports both **card payments** (Visa/Mastercard) and **mobile money** (Airtel, MTN, Zamtel).

## Architecture

### Frontend (Client-Side)
- **Payment Widget**: Lenco's JavaScript widget loaded from CDN
- **Payment Initialization**: `utils/lencoPayment.ts` handles payment setup
- **User Interface**: PaymentPage.tsx provides payment method selection

### Backend (Server-Side)
- **Payment Verification**: `/make-server-f6550ac6/verify-payment/:reference` endpoint
- **Lenco API Integration**: Verifies payments with Lenco's REST API
- **Payment Storage**: Stores verified payments in KV store

## Setup Instructions

### 1. Get Lenco API Keys

1. Sign up at [https://lenco.co](https://lenco.co)
2. Navigate to the Developer Dashboard
3. Copy your API keys:
   - **Public Key**: Used by the frontend widget
   - **Secret Key**: Used by the backend for verification

### 2. Configure Environment Variables

#### Frontend (.env file)
Create a `.env` file in the project root:

```bash
VITE_LENCO_PUBLIC_KEY=pk_sandbox_your_public_key_here
```

#### Backend (Supabase Secrets)
The secret keys are already configured through the tool:
- ✅ `LENCO_PUBLIC_KEY` - Added via Supabase secrets
- ✅ `LENCO_SECRET_KEY` - Added via Supabase secrets

### 3. Switch to Production

When ready for production, update:

1. **index.html**: Change script source from sandbox to production
```html
<!-- FROM: -->
<script src="https://pay.sandbox.lenco.co/js/v1/inline.js"></script>

<!-- TO: -->
<script src="https://pay.lenco.co/js/v1/inline.js"></script>
```

2. **Backend API URL** in `/supabase/functions/server/index.tsx`:
```typescript
// FROM:
const lencoApiUrl = `https://api.sandbox.lenco.co/access/v2/collections/status/${reference}`;

// TO:
const lencoApiUrl = `https://api.lenco.co/access/v2/collections/status/${reference}`;
```

3. **Update API Keys**: Replace sandbox keys with production keys

## Payment Flow

### 1. User Initiates Payment
```
User selects payment method (Card or Mobile Money)
↓
User clicks "Pay" button
↓
Frontend validates form inputs
```

### 2. Lenco Widget Opens
```typescript
// PaymentPage.tsx calls initializeLencoPayment()
initializeLencoPayment(
  paymentData,      // User and payment details
  publicKey,        // Lenco public key
  onSuccess,        // Success callback
  onClose,          // Close callback
  onPending         // Pending callback
);
```

### 3. Payment Processing
```
Lenco Widget Opens (popup/modal)
↓
User enters payment details
  - Card: Number, Expiry, CVV
  - Mobile Money: Phone, Network, PIN
↓
Lenco processes payment
↓
Widget closes with response
```

### 4. Payment Verification
```
Frontend receives reference
↓
Navigates to ProcessingPage
↓
Backend verifies with Lenco API
↓
Payment saved to database
↓
User sees success/failure page
```

## Key Files

### Frontend
- `/index.html` - Lenco widget script
- `/utils/lencoPayment.ts` - Payment utilities
- `/components/PaymentPage.tsx` - Payment UI
- `/components/ProcessingPage.tsx` - Verification logic

### Backend
- `/supabase/functions/server/index.tsx` - Verification endpoint
- Server route: `GET /make-server-f6550ac6/verify-payment/:reference`

## Payment Reference Format

References are generated automatically:
```
Format: MF-YYYYMMDD-TIMESTAMP-RANDOM
Example: MF-20241124-1732464000000-A3X9K2
```

- `MF`: Master-Fees prefix
- `YYYYMMDD`: Date
- `TIMESTAMP`: Unix timestamp
- `RANDOM`: 6-character random string

## API Endpoints

### Verify Payment
```
GET /make-server-f6550ac6/verify-payment/:reference
Authorization: Bearer {LENCO_SECRET_KEY}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "status": "successful",
    "amount": "10200.00",
    "currency": "ZMW",
    "reference": "MF-20241124-1732464000000-A3X9K2",
    "lencoReference": "240720004",
    "mobileMoneyDetails": {
      "phone": "0977433571",
      "operator": "airtel",
      "accountName": "John Doe"
    }
  }
}
```

## Testing

### Sandbox Mode
Currently configured for sandbox testing:
- Use test card numbers from Lenco documentation
- Mobile money payments are simulated
- No real money is charged

### Test Cards (Sandbox)
Refer to Lenco documentation for test card numbers:
- Success: Use specific test numbers
- Failure: Use specific test numbers
- Insufficient funds: Use specific test numbers

## Error Handling

### Common Errors

1. **"Payment system is loading"**
   - Lenco widget hasn't loaded yet
   - Wait a few seconds and try again

2. **"Payment system not configured"**
   - `VITE_LENCO_PUBLIC_KEY` not set in .env
   - Check environment variable configuration

3. **"Payment verification failed"**
   - Network issue connecting to Lenco API
   - Invalid payment reference
   - Payment was declined

4. **"LENCO_SECRET_KEY not configured"**
   - Backend environment variable not set
   - Check Supabase secrets configuration

## Security Considerations

### ✅ Implemented
- Secret key only on server-side
- Payment verification through backend
- Public key safely used in frontend
- Reference validation before verification

### ⚠️ Best Practices
- Never expose `LENCO_SECRET_KEY` in frontend code
- Always verify payments on backend before confirming
- Store payment references for audit trail
- Implement webhook handler for payment updates

## Features

### Supported Payment Methods
- ✅ Visa Cards
- ✅ Mastercard Cards  
- ✅ Airtel Money
- ✅ MTN Mobile Money
- ✅ Zamtel Mobile Money

### Payment Information
- Customer name and phone
- Service itemization
- School name
- Payment amount with fees
- Unique reference number

### Network Detection
- Automatic detection of mobile networks
- Visual indicators (colored badges)
- 97/77 → Airtel (Red)
- 96/76 → MTN (Yellow)
- 95 → Zamtel (Green)

## Monitoring & Debugging

### Frontend Logs
```javascript
// Enable console logging
console.log('Lenco payment widget loaded');
console.log('Payment successful with reference:', reference);
console.log('Payment verification result:', result);
```

### Backend Logs
```typescript
// Server logs payment verification
console.log(`Verifying payment with Lenco: ${reference}`);
console.log(`Payment verification successful for ${reference}`);
```

### Stored Data
All payments are stored with:
- User information
- Payment details
- Lenco reference
- Lenco verification data
- Timestamp

## Support

### Lenco Support
- Documentation: https://lenco.co/developers
- Support: support@lenco.co

### Integration Issues
Check:
1. Environment variables are set correctly
2. API keys are valid and not expired
3. Backend server is running
4. Network connectivity to Lenco APIs
5. Browser console for error messages

## Future Enhancements

### Planned Features
- [ ] Webhook integration for real-time updates
- [ ] Recurring payment support
- [ ] Payment plan integration
- [ ] Multi-currency support
- [ ] Payment analytics dashboard

### Webhook Setup (Future)
```typescript
// Endpoint to receive Lenco webhooks
app.post("/make-server-f6550ac6/lenco-webhook", async (c) => {
  const signature = c.req.header("x-lenco-signature");
  const payload = await c.req.json();
  
  // Verify webhook signature
  // Process payment update
  // Update payment status in database
  
  return c.json({ received: true });
});
```

## Troubleshooting

### Widget Not Loading
1. Check script tag in `/index.html`
2. Verify internet connection
3. Check browser console for errors
4. Ensure no ad blockers are interfering

### Payment Verification Fails
1. Check `LENCO_SECRET_KEY` is set in Supabase
2. Verify backend endpoint is accessible
3. Check payment reference format
4. Review server logs for detailed errors

### User Can't Complete Payment
1. Verify payment amount is valid
2. Check user's payment method details
3. Ensure sufficient funds (for real transactions)
4. Contact Lenco support for gateway issues

## Production Checklist

Before going live:
- [ ] Replace sandbox keys with production keys
- [ ] Update widget script URL to production
- [ ] Update API URLs to production
- [ ] Test all payment methods
- [ ] Implement webhook handler
- [ ] Set up payment monitoring
- [ ] Configure error notifications
- [ ] Document incident response procedures
- [ ] Test refund process
- [ ] Configure customer support flow

---

**Last Updated**: November 24, 2024
**Version**: 1.0.0
**Status**: Sandbox Testing
