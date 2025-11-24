# 🚀 Lenco Payment - Quick Start Guide

## ⚡ 5-Minute Complete Setup

### Step 1: Get Your Lenco API Keys (2 minutes)
1. Visit https://lenco.co
2. Sign up or login
3. Go to **Developers** section
4. Copy your **Sandbox Public Key** (looks like `pk_sandbox_abc123...`)
5. Copy your **Sandbox Secret Key** (looks like `sk_sandbox_abc123...`)

### Step 2: Add Keys to .env File (30 seconds)
Open the `.env` file in your project root and add your keys:

```bash
VITE_LENCO_PUBLIC_KEY=pk_sandbox_YOUR_KEY_HERE
VITE_TEST_MODE=true
```

**Replace `pk_sandbox_YOUR_KEY_HERE` with your actual public key!**

### Step 3: Configure Webhook (2 minutes)
1. Go to Lenco Dashboard → Settings → Developers → Webhooks
2. Click "Add Webhook"
3. **Paste this URL**:
   ```
   https://cnqcshrhcptgchlahjsa.supabase.co/functions/v1/make-server-f6550ac6/webhooks/lenco
   ```
4. Select events: Payment Success, Payment Failed, Payment Pending
5. Click Save

**Full webhook URL is also in `/WEBHOOK_URL.txt` for easy copying**

### Step 4: Start Testing (30 seconds)
```bash
npm run dev
```

Navigate to payment page in your app and click "Pay". The Lenco widget should open! 🎉

## 📋 Quick Test Checklist

- [ ] Add your Lenco public key to `.env`
- [ ] Restart dev server
- [ ] Navigate to payment page
- [ ] Select Mobile Money or Card Payment
- [ ] Click "Pay" button
- [ ] Lenco widget opens ✅
- [ ] Complete test payment
- [ ] See success page ✅

## 🐛 Not Working?

### Check These First:
1. **Did you restart the dev server?** Required after editing `.env`
2. **Is your API key correct?** Should start with `pk_sandbox_`
3. **Check browser console** (Press F12) - any red errors?

### Common Error Messages:

**"Payment system not configured"**
→ Your API key is missing or incorrect in `.env`

**"Payment system is loading"**
→ Wait a few seconds, Lenco widget is still loading

**Widget doesn't open**
→ Check browser console for errors, try disabling ad blocker

## 📖 Detailed Documentation

- **Full Testing Guide**: `/TESTING_LENCO.md`
- **Integration Details**: `/LENCO_INTEGRATION.md`

## 💡 What's Happening?

### Current Setup (Test Mode):
```
User clicks Pay 
  → Lenco widget opens
  → User completes payment in widget
  → Widget returns success
  → App shows processing animation (simulated)
  → Success page! ✅
```

**Note**: With `VITE_TEST_MODE=true`, payments are simulated and NOT verified with backend. This is perfect for testing the Lenco widget integration.

## 🎯 Next Steps

Once frontend testing works:

1. **Switch to production keys** (when ready)
2. **Enable backend verification** (set `VITE_TEST_MODE=false`)
3. **Update script URLs** to production endpoints
4. **Test with real (small) amounts**

## ❓ Need Help?

1. Check `/TESTING_LENCO.md` for detailed troubleshooting
2. Open browser console (F12) to see detailed logs
3. Contact Lenco support: support@lenco.co

---

**Pro Tip**: Keep the browser console open while testing to see all the payment flow logs! 🔍