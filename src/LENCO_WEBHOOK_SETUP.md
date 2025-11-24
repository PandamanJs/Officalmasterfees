# 🔔 Lenco Webhook Configuration

## Your Webhook URL

Copy this URL and paste it into your Lenco Dashboard webhook configuration:

```
https://cnqcshrhcptgchlahjsa.supabase.co/functions/v1/make-server-f6550ac6/webhooks/lenco
```

## How to Configure in Lenco Dashboard

### Step 1: Access Webhook Settings
1. Log in to your Lenco Dashboard at https://dashboard.lenco.co
2. Navigate to **Settings** → **Developers** → **Webhooks**
3. Or look for "Webhooks Configuration" section

### Step 2: Add Your Webhook URL
1. Click on **"Add Webhook"** or **"New Webhook"**
2. Paste the webhook URL above into the "Webhook URL" field:
   ```
   https://cnqcshrhcptgchlahjsa.supabase.co/functions/v1/make-server-f6550ac6/webhooks/lenco
   ```
3. Leave authentication fields empty (our endpoint handles authentication internally)

### Step 3: Select Events
Select which payment events you want to receive notifications for:
- ✅ **Payment Success** (Required)
- ✅ **Payment Failed** (Recommended)
- ✅ **Payment Pending** (Recommended)
- ✅ **Payment Cancelled** (Optional)

### Step 4: Save Configuration
1. Click **"Save"** or **"Create Webhook"**
2. Lenco may send a test webhook to verify your endpoint
3. Check that the status shows as "Active" or "Verified"

## What Happens When a Webhook is Received?

When a payment status changes, Lenco will send a notification to your webhook URL:

```
Payment Completed
    ↓
Lenco sends POST request to your webhook
    ↓
Your backend receives and processes the notification
    ↓
Payment status updated in your database
    ↓
Customer can see updated payment status
```

## Webhook Payload Example

Lenco will send data like this:

```json
{
  "reference": "MF-20241124-1732464000000-A3X9K2",
  "status": "success",
  "amount": 10200.00,
  "currency": "ZMW",
  "customer": {
    "name": "John Doe",
    "email": "0971234567@masterfees.app",
    "phone": "0971234567"
  },
  "payment_method": "mobile_money",
  "transaction_reference": "LENCO-TXN-123456",
  "metadata": {
    "school": "Twalumbu Educational Center"
  },
  "created_at": "2024-11-24T10:30:00Z",
  "updated_at": "2024-11-24T10:35:00Z"
}
```

## What Your Backend Does

Your webhook endpoint (`/webhooks/lenco`) automatically:

1. ✅ **Receives** the webhook notification
2. ✅ **Validates** the payment reference exists
3. ✅ **Stores** the webhook data for audit purposes
4. ✅ **Updates** payment status in the database
5. ✅ **Logs** all actions for debugging
6. ✅ **Acknowledges** receipt back to Lenco

## Testing Your Webhook

### Method 1: Use Lenco's Test Feature
Most payment gateways have a "Test Webhook" button in the dashboard:
1. Go to your webhook settings in Lenco
2. Click "Test Webhook" or "Send Test Event"
3. Check your backend logs to confirm receipt

### Method 2: Complete a Test Payment
1. Make a test payment in your app
2. Complete the payment in the Lenco widget
3. Lenco will automatically send a webhook
4. Check logs to confirm receipt

### Method 3: Manual Testing with cURL
```bash
curl -X POST https://cnqcshrhcptgchlahjsa.supabase.co/functions/v1/make-server-f6550ac6/webhooks/lenco \
  -H "Content-Type: application/json" \
  -d '{
    "reference": "TEST-REF-123",
    "status": "success",
    "amount": 100.00,
    "customer": {
      "name": "Test User",
      "phone": "0971234567"
    },
    "payment_method": "mobile_money"
  }'
```

## Checking Webhook Logs

### View Backend Logs in Supabase
1. Go to your Supabase Dashboard
2. Navigate to **Edge Functions** → **server**
3. Click on **"Logs"** tab
4. Look for entries starting with "📥 Received Lenco webhook"

### Expected Log Output
```
📥 Received Lenco webhook
Webhook payload: { "reference": "MF-...", ... }
📝 Processing webhook for payment: MF-20241124-1732464000000-A3X9K2
   Status: success
   Amount: 10200.00
   Method: mobile_money
✅ Payment MF-20241124-1732464000000-A3X9K2 is successful
✅ Updated verification record for MF-20241124-1732464000000-A3X9K2
```

## Troubleshooting

### ❌ Webhook Returns 404 Error
**Problem**: URL is incorrect or endpoint not deployed

**Solutions**:
- Verify the webhook URL is exactly:
  ```
  https://cnqcshrhcptgchlahjsa.supabase.co/functions/v1/make-server-f6550ac6/webhooks/lenco
  ```
- Check that your Supabase edge function is deployed
- Try the health check endpoint first:
  ```
  https://cnqcshrhcptgchlahjsa.supabase.co/functions/v1/make-server-f6550ac6/health
  ```

### ❌ Webhook Returns 500 Error
**Problem**: Backend error processing webhook

**Solutions**:
- Check Supabase function logs for error details
- Verify your KV store is accessible
- Check that the webhook payload matches expected format

### ❌ Lenco Says "Webhook Failed"
**Problem**: Your endpoint didn't respond with 200 OK

**Solutions**:
- Ensure your endpoint is accessible from the internet
- Check for CORS issues
- Verify no firewall blocking Lenco's IP addresses
- Test with cURL to confirm endpoint works

### ❌ Webhooks Not Being Received
**Problem**: Configuration issue or Lenco not sending

**Solutions**:
- Verify webhook is enabled in Lenco dashboard
- Check webhook URL is saved correctly
- Ensure selected events include "Payment Success"
- Contact Lenco support to verify webhook sending

## Security Best Practices

### Current Setup
- ✅ Webhook endpoint is public (as required)
- ✅ All webhook data is logged for audit
- ✅ Payment status validated before updating
- ✅ Errors handled gracefully

### Future Enhancements (Optional)
For additional security, you could add:
- **Webhook Signature Verification**: Verify requests come from Lenco
- **IP Whitelisting**: Only accept webhooks from Lenco's IPs
- **Rate Limiting**: Prevent webhook flooding
- **Secret Token**: Add authentication header

Check Lenco's documentation for webhook signature details if available.

## Webhook Data Storage

Your backend stores:

1. **Webhook Notification**
   - Key: `webhook:{reference}:{timestamp}`
   - Contains: Full webhook payload + received timestamp

2. **Payment Status**
   - Key: `payment_status:{reference}`
   - Contains: Current payment status, updated with each webhook

3. **Verification Record**
   - Key: `lenco_verification:{reference}`
   - Contains: Verification data with webhook confirmation

## Important Notes

### 🔄 Webhook Retries
If your endpoint fails to respond, Lenco may retry:
- Typical retry schedule: 1m, 5m, 15m, 1h, 6h
- Your endpoint handles duplicates gracefully
- Each webhook is stored with unique timestamp

### 📊 Multiple Webhooks
You may receive multiple webhooks for one payment:
- Payment initiated → "pending" webhook
- Payment processing → "processing" webhook
- Payment completed → "success" webhook

Your backend updates status with each webhook, keeping the latest state.

### ⏱️ Webhook Timing
- Usually received within 1-5 seconds of payment completion
- Some payment methods may take longer (e.g., bank transfers)
- Mobile money: Usually instant
- Card payments: Usually within seconds

## Next Steps

1. ✅ Add webhook URL to Lenco Dashboard
2. ✅ Select payment events to monitor
3. ✅ Save webhook configuration
4. ✅ Test with a small payment
5. ✅ Check backend logs to confirm receipt
6. ✅ Monitor webhook deliveries regularly

## Support

### Lenco Support
- **Documentation**: https://docs.lenco.co/webhooks
- **Email**: support@lenco.co
- **Dashboard**: https://dashboard.lenco.co

### Debugging Resources
- **Supabase Logs**: Check Edge Function logs in your Supabase dashboard
- **Test Endpoint**: Use cURL to manually test webhook
- **Webhook History**: Check Lenco dashboard for webhook delivery status

---

**Your webhook endpoint is ready! 🎉**

Add the URL to your Lenco Dashboard and start receiving real-time payment notifications.
