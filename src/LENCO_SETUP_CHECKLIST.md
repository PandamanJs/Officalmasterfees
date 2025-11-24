# ✅ Lenco Payment Setup - Complete Checklist

## 🎯 Quick Setup Overview

Follow these steps in order to get Lenco payments working:

---

## Part 1: Lenco Dashboard Configuration

### ☐ Step 1: Create Lenco Account
- [ ] Go to https://lenco.co
- [ ] Sign up for a developer account
- [ ] Verify your email
- [ ] Login to dashboard

### ☐ Step 2: Get API Keys
- [ ] Navigate to **Settings** → **Developers** → **API Keys**
- [ ] Copy **Sandbox Public Key** (starts with `pk_sandbox_`)
- [ ] Copy **Sandbox Secret Key** (starts with `sk_sandbox_`)
- [ ] Keep these keys secure and don't share them

### ☐ Step 3: Configure Webhook
- [ ] Navigate to **Settings** → **Developers** → **Webhooks**
- [ ] Click **"Add Webhook"** or **"New Webhook"**
- [ ] Paste this webhook URL:
  ```
  https://cnqcshrhcptgchlahjsa.supabase.co/functions/v1/make-server-f6550ac6/webhooks/lenco
  ```
- [ ] Select these events:
  - [ ] ✅ Payment Success
  - [ ] ✅ Payment Failed  
  - [ ] ✅ Payment Pending
- [ ] Click **"Save"** or **"Create"**
- [ ] Verify status shows "Active" or "Verified"

---

## Part 2: Your App Configuration

### ☐ Step 4: Configure Environment Variables
- [ ] Open the `.env` file in your project root
- [ ] Add your Lenco public key:
  ```bash
  VITE_LENCO_PUBLIC_KEY=pk_sandbox_YOUR_ACTUAL_KEY
  ```
- [ ] Ensure test mode is enabled:
  ```bash
  VITE_TEST_MODE=true
  ```
- [ ] Save the file

### ☐ Step 5: Restart Development Server
- [ ] Stop your dev server (Ctrl+C)
- [ ] Start it again:
  ```bash
  npm run dev
  ```
- [ ] Wait for "ready" message

---

## Part 3: Testing

### ☐ Step 6: Test Payment Flow
- [ ] Open your app in browser
- [ ] Select a school (e.g., Twalumbu)
- [ ] Add school fees or services
- [ ] Proceed to checkout
- [ ] Click "Pay" to reach payment page
- [ ] Select **Mobile Money** or **Card Payment**
- [ ] Fill in required details
- [ ] Click the green **"Pay"** button

### ☐ Step 7: Verify Lenco Widget Opens
- [ ] Lenco payment widget/modal appears
- [ ] Customer details are pre-filled
- [ ] Amount is correct
- [ ] Payment options are available

### ☐ Step 8: Complete Test Payment
- [ ] Use test credentials (check Lenco docs)
- [ ] Complete the payment in widget
- [ ] Widget closes after success
- [ ] See "Processing Payment" screen
- [ ] Success page appears

### ☐ Step 9: Check Browser Console
- [ ] Open Developer Tools (F12)
- [ ] Go to Console tab
- [ ] Look for these success indicators:
  ```
  ✅ Lenco payment widget loaded successfully
  🔑 Using Lenco public key: pk_sandbox_...
  💳 Initializing Lenco payment with: ...
  🚀 Lenco payment widget opened
  ✅ Payment successful with reference: MF-...
  🧪 TEST MODE: Simulating payment verification
  ```
- [ ] No red error messages

---

## Part 4: Webhook Testing

### ☐ Step 10: Verify Webhook Works
- [ ] Go to your Supabase Dashboard
- [ ] Navigate to **Edge Functions** → **server**
- [ ] Click **"Logs"** tab
- [ ] Make a test payment
- [ ] Look for webhook logs:
  ```
  📥 Received Lenco webhook
  ✅ Payment MF-... is successful
  ```
- [ ] Verify webhook data is stored

### ☐ Step 11: Test Webhook Manually (Optional)
- [ ] Use the test cURL command from `/LENCO_WEBHOOK_SETUP.md`
- [ ] Check Supabase logs for webhook receipt
- [ ] Confirm data is stored in KV store

---

## 🎉 Setup Complete!

### You're Ready When:
✅ Lenco widget opens on clicking Pay  
✅ Test payments complete successfully  
✅ Console shows detailed logs with no errors  
✅ Success page appears after payment  
✅ Webhooks are received and logged  

---

## 🔧 Troubleshooting Quick Links

### If Something Doesn't Work:

**Payment Widget Issues**
→ Read: `/TESTING_LENCO.md` - Section "Common Issues"

**Webhook Not Working**
→ Read: `/LENCO_WEBHOOK_SETUP.md` - Section "Troubleshooting"

**API Key Problems**
→ Verify in `.env` file and restart dev server

**Console Errors**
→ Open browser console (F12) and read error messages

---

## 📚 Documentation Files

All the guides you need:

| File | Purpose |
|------|---------|
| `/LENCO_QUICK_START.md` | 5-minute setup guide |
| `/TESTING_LENCO.md` | Detailed testing instructions |
| `/LENCO_WEBHOOK_SETUP.md` | Webhook configuration guide |
| `/LENCO_INTEGRATION.md` | Complete technical docs |
| `/WEBHOOK_URL.txt` | Quick webhook URL reference |
| `/LENCO_CHANGES_SUMMARY.md` | All code changes listed |
| **This file** | Complete setup checklist |

---

## 🚀 Production Deployment Checklist

When you're ready to go live:

### ☐ Switch to Production Mode
- [ ] Get production API keys from Lenco
- [ ] Update `.env`:
  ```bash
  VITE_LENCO_PUBLIC_KEY=pk_live_YOUR_PRODUCTION_KEY
  VITE_TEST_MODE=false
  ```
- [ ] Update webhook URL to use production Lenco domain
- [ ] Update Lenco script in `/index.html` to production URL
- [ ] Add secret key to Supabase secrets:
  ```bash
  LENCO_SECRET_KEY=sk_live_YOUR_PRODUCTION_SECRET
  ```

### ☐ Test Production Setup
- [ ] Test with small real payment first
- [ ] Verify webhook is received
- [ ] Check payment is verified with Lenco API
- [ ] Confirm payment is saved to database
- [ ] Test refund flow (if applicable)

### ☐ Monitoring & Security
- [ ] Set up error monitoring
- [ ] Monitor webhook delivery success rate
- [ ] Set up payment failure alerts
- [ ] Review security best practices
- [ ] Enable webhook signature verification

---

## 🆘 Need Help?

### Lenco Support
- **Email**: support@lenco.co
- **Docs**: https://docs.lenco.co
- **Dashboard**: https://dashboard.lenco.co

### Your Setup
- **Webhook URL**: See `/WEBHOOK_URL.txt`
- **Project ID**: cnqcshrhcptgchlahjsa
- **Backend**: Supabase Edge Functions

### Quick Tests
- **Health Check**:
  ```
  https://cnqcshrhcptgchlahjsa.supabase.co/functions/v1/make-server-f6550ac6/health
  ```
- **Browser Console**: Press F12 → Console tab
- **Supabase Logs**: Dashboard → Edge Functions → server → Logs

---

**Happy Testing! 🎉**

Print this checklist and check off each item as you complete it!
