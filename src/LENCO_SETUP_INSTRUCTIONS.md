# 🔧 Lenco Payment Integration Setup Instructions

## ⚠️ Important: Why Lenco Widget Is Not Loading

The Lenco payment widget needs your **PUBLIC API KEY** to work. Currently, the `.env` file has a placeholder value.

---

## 📋 Step-by-Step Setup

### 1. Get Your Lenco API Keys

1. **Go to Lenco Dashboard**: https://dashboard.lenco.co/
2. **Login** or **Create an account** if you don't have one
3. **Navigate to**: Settings → API Keys
4. **Copy your Sandbox Public Key** (starts with `pk_sandbox_`)

---

### 2. Add Your API Key to `.env` File

1. **Open** the `.env` file in your project root
2. **Replace** this line:
   ```
   VITE_LENCO_PUBLIC_KEY=pk_sandbox_your_public_key_here
   ```
   
   With your actual key:
   ```
   VITE_LENCO_PUBLIC_KEY=pk_sandbox_1234567890abcdef
   ```

3. **Also update** the backend keys:
   ```
   LENCO_PUBLIC_KEY=pk_sandbox_1234567890abcdef
   LENCO_SECRET_KEY=sk_sandbox_your_actual_secret_key
   ```

---

### 3. Restart Your Development Server

After updating the `.env` file:

```bash
# Stop the current server (Ctrl+C)

# Restart the server
npm run dev
```

**Important**: Changes to `.env` files require a server restart!

---

### 4. Test the Integration

1. **Navigate to the Payment Page**
   - Select a school
   - Add some services
   - Go to checkout
   - Proceed to payment

2. **Check the Console** (Press F12)
   - You should see: `✅ Lenco payment widget loaded successfully`
   - The yellow "Loading payment system..." banner should disappear

3. **Click the "Pay" Button**
   - The Lenco widget modal should open
   - You'll see the payment form

---

## 🐛 Troubleshooting

### Issue: "Lenco widget not loaded" warning

**Solutions:**
1. ✅ Make sure you've added your real API key to `.env`
2. ✅ Restart your dev server after changing `.env`
3. ✅ Check browser console for script loading errors
4. ✅ Disable ad blockers (they sometimes block payment scripts)
5. ✅ Try in incognito mode
6. ✅ Check if `https://pay.sandbox.lenco.co/js/v1/inline.js` is accessible in your network

### Issue: "Payment system not configured" error

**This means the API key is still the placeholder value.**

Check your `.env` file and make sure:
- The key starts with `pk_sandbox_` (not `pk_sandbox_your_public_key_here`)
- There are no spaces or quotes around the key
- You restarted the dev server

### Issue: Script blocked or not loading

**Network Tab Check:**
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for `inline.js` 
5. Check if it loaded successfully (Status: 200)

---

## 📚 Lenco Documentation

- **Dashboard**: https://dashboard.lenco.co/
- **API Documentation**: https://docs.lenco.co/
- **Test Cards**: Check Lenco docs for test card numbers

---

## ✅ What Should Work After Setup

1. **Payment Page Loads** without "Loading payment system..." banner
2. **Console shows**: `✅ Lenco payment widget loaded successfully`
3. **Clicking "Pay"** opens the Lenco modal
4. **Payment form** appears with pre-filled customer details
5. **Test payment** can be completed using Lenco test cards

---

## 🎯 Current Integration Status

✅ Frontend payment page created  
✅ Lenco script loaded in HTML  
✅ Payment utility functions created  
✅ Mobile money & card payment support  
✅ Network detection for Zambian operators  
✅ Backend webhook endpoint configured  
✅ Payment verification endpoints ready  

⚠️ **Waiting for**: Your Lenco API keys in `.env` file

---

## 📝 Next Steps After Setup

Once Lenco loads successfully:

1. **Configure Webhook URL** in Lenco Dashboard:
   - Go to: Settings → Webhooks
   - Add URL: `https://your-project.supabase.co/functions/v1/make-server-f6550ac6/webhooks/lenco`
   - This enables real-time payment notifications

2. **Test Payments**:
   - Use Lenco test cards
   - Verify payments appear in Lenco dashboard
   - Check webhook notifications are received

3. **Go Live** (when ready):
   - Replace `pk_sandbox_` with `pk_live_` key
   - Update webhook URL to production
   - Test with small real payment

---

## 🆘 Need Help?

If you're still having issues:

1. **Check Console Logs** (F12) for specific error messages
2. **Check Network Tab** to see if `inline.js` loaded
3. **Verify API Key** is correct in Lenco dashboard
4. **Try Different Browser** to rule out browser-specific issues

---

**Created**: November 24, 2024  
**Version**: 1.0  
