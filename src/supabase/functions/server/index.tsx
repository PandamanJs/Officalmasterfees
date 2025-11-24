/**
 * Master-Fees Backend Server
 * 
 * Hono-based web server running on Supabase Edge Functions
 * Handles payment processing, transaction management, and data storage
 * 
 * Technology Stack:
 * - Hono: Lightweight web framework
 * - Deno: JavaScript/TypeScript runtime
 * - Supabase: Database and authentication
 * 
 * Features:
 * - CORS enabled for cross-origin requests
 * - Request/response logging
 * - Key-value store integration
 * - Health check endpoint
 */

import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

// Initialize Hono application
const app = new Hono();

// Enable request/response logging for debugging
app.use('*', logger(console.log));

/**
 * CORS Configuration
 * Enables cross-origin requests from any domain
 * Required for frontend to communicate with the server
 */
app.use(
  "/*",
  cors({
    origin: "*",  // Allow requests from any origin (consider restricting in production)
    allowHeaders: ["Content-Type", "Authorization"],  // Permitted request headers
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Permitted HTTP methods
    exposeHeaders: ["Content-Length"],  // Headers accessible to the frontend
    maxAge: 600,  // Cache preflight requests for 10 minutes
  }),
);

/**
 * Health Check Endpoint
 * 
 * Simple endpoint to verify the server is running
 * Used for monitoring and deployment verification
 * 
 * @route GET /make-server-f6550ac6/health
 * @returns JSON object with status: "ok"
 */
app.get("/make-server-f6550ac6/health", (c) => {
  return c.json({ status: "ok" });
});

/**
 * Save Payment Transaction Endpoint
 * 
 * Saves a completed payment transaction to the key-value store
 * Each payment is stored with a unique key based on phone number and timestamp
 * 
 * @route POST /make-server-f6550ac6/payments
 * @body {
 *   userPhone: string,
 *   userName: string,
 *   studentId: string,
 *   studentName: string,
 *   services: Array<{id, description, amount, invoiceNo, studentName}>,
 *   totalAmount: number,
 *   serviceFee: number,
 *   finalAmount: number,
 *   schoolName: string,
 *   timestamp: string
 * }
 * @returns JSON object with success status and payment ID
 */
app.post("/make-server-f6550ac6/payments", async (c) => {
  try {
    const body = await c.req.json();
    const { 
      userPhone, 
      userName,
      studentId,
      studentName,
      services, 
      totalAmount, 
      serviceFee,
      finalAmount,
      schoolName,
      timestamp 
    } = body;

    // Validate required fields
    if (!userPhone || !services || !totalAmount || !timestamp) {
      return c.json({ 
        success: false, 
        error: "Missing required fields: userPhone, services, totalAmount, timestamp" 
      }, 400);
    }

    // Generate unique payment ID
    const paymentId = `payment_${userPhone}_${Date.now()}`;
    
    // Create payment record
    const paymentRecord = {
      id: paymentId,
      userPhone,
      userName: userName || "Unknown",
      studentId: studentId || "Unknown",
      studentName: studentName || "Unknown",
      services,
      totalAmount,
      serviceFee: serviceFee || 0,
      finalAmount: finalAmount || totalAmount,
      schoolName: schoolName || "Unknown School",
      timestamp,
      status: "completed",
      createdAt: new Date().toISOString()
    };

    // Save to key-value store with a key that allows querying by phone
    await kv.set(`payment:${paymentId}`, paymentRecord);
    
    // Also add to user's payment list for easy retrieval
    const userPaymentsKey = `user_payments:${userPhone}`;
    const existingPayments = await kv.get(userPaymentsKey) || [];
    const updatedPayments = [paymentId, ...existingPayments];
    await kv.set(userPaymentsKey, updatedPayments);

    console.log(`Payment saved successfully: ${paymentId} for user ${userPhone}`);

    return c.json({ 
      success: true, 
      paymentId,
      message: "Payment saved successfully" 
    });
  } catch (error) {
    console.error("Error saving payment:", error);
    return c.json({ 
      success: false, 
      error: `Failed to save payment: ${error.message}` 
    }, 500);
  }
});

/**
 * Get User Payment History Endpoint
 * 
 * Retrieves all payment transactions for a specific user
 * Returns payments sorted by most recent first
 * 
 * @route GET /make-server-f6550ac6/payments/:phone
 * @param phone - User's phone number
 * @returns JSON array of payment records
 */
app.get("/make-server-f6550ac6/payments/:phone", async (c) => {
  try {
    const phone = c.req.param("phone");
    
    if (!phone) {
      return c.json({ 
        success: false, 
        error: "Phone number is required" 
      }, 400);
    }

    // Get list of payment IDs for this user
    const userPaymentsKey = `user_payments:${phone}`;
    const paymentIds = await kv.get(userPaymentsKey) || [];

    // Fetch all payment records
    const payments = [];
    for (const paymentId of paymentIds) {
      const payment = await kv.get(`payment:${paymentId}`);
      if (payment) {
        payments.push(payment);
      }
    }

    console.log(`Retrieved ${payments.length} payments for user ${phone}`);

    return c.json({ 
      success: true, 
      payments,
      count: payments.length
    });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return c.json({ 
      success: false, 
      error: `Failed to fetch payment history: ${error.message}` 
    }, 500);
  }
});

/**
 * Verify Lenco Payment Endpoint
 * 
 * Verifies a payment with Lenco's API
 * This should be called after a successful payment to confirm the status
 * 
 * @route GET /make-server-f6550ac6/verify-payment/:reference
 * @param reference - Lenco payment reference
 * @returns JSON object with payment verification data
 */
app.get("/make-server-f6550ac6/verify-payment/:reference", async (c) => {
  try {
    const reference = c.req.param("reference");
    
    if (!reference) {
      return c.json({ 
        success: false, 
        error: "Payment reference is required" 
      }, 400);
    }

    // Get Lenco secret key from environment
    const lencoSecretKey = Deno.env.get("LENCO_SECRET_KEY");
    
    if (!lencoSecretKey) {
      console.error("LENCO_SECRET_KEY not configured in environment variables");
      return c.json({ 
        success: false, 
        error: "Payment verification system not configured" 
      }, 500);
    }

    // Call Lenco API to verify payment
    const lencoApiUrl = `https://api.sandbox.lenco.co/access/v2/collections/status/${reference}`;
    
    console.log(`Verifying payment with Lenco: ${reference}`);
    
    const response = await fetch(lencoApiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${lencoSecretKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Lenco API error (${response.status}):`, errorText);
      return c.json({ 
        success: false, 
        error: `Payment verification failed: ${response.status} ${response.statusText}`,
        details: errorText
      }, response.status);
    }

    const verificationData = await response.json();
    
    console.log(`Payment verification successful for ${reference}:`, verificationData);

    // Store verification result
    if (verificationData.status && verificationData.data) {
      const verificationKey = `lenco_verification:${reference}`;
      await kv.set(verificationKey, {
        ...verificationData.data,
        verifiedAt: new Date().toISOString()
      });
    }

    return c.json({ 
      success: true, 
      data: verificationData
    });
  } catch (error) {
    console.error("Error verifying payment with Lenco:", error);
    return c.json({ 
      success: false, 
      error: `Failed to verify payment: ${error.message}` 
    }, 500);
  }
});

/**
 * Lenco Payment Webhook Endpoint
 * 
 * Receives real-time payment notifications from Lenco
 * This endpoint is called by Lenco when payment status changes
 * 
 * @route POST /make-server-f6550ac6/webhooks/lenco
 * @body Payment notification data from Lenco
 * @returns JSON object with acknowledgment
 */
app.post("/make-server-f6550ac6/webhooks/lenco", async (c) => {
  try {
    console.log("📥 Received Lenco webhook");
    
    const webhookData = await c.req.json();
    
    console.log("Webhook payload:", JSON.stringify(webhookData, null, 2));
    
    // Extract relevant information
    const {
      reference,
      status,
      amount,
      customer,
      metadata,
      transaction_reference,
      payment_method,
      created_at,
      updated_at
    } = webhookData;

    if (!reference) {
      console.error("❌ Webhook missing payment reference");
      return c.json({ 
        success: false, 
        error: "Missing payment reference" 
      }, 400);
    }

    console.log(`📝 Processing webhook for payment: ${reference}`);
    console.log(`   Status: ${status}`);
    console.log(`   Amount: ${amount}`);
    console.log(`   Method: ${payment_method}`);

    // Store webhook notification
    const webhookKey = `webhook:${reference}:${Date.now()}`;
    await kv.set(webhookKey, {
      ...webhookData,
      receivedAt: new Date().toISOString()
    });

    // Update payment status in our system
    const paymentStatusKey = `payment_status:${reference}`;
    const existingStatus = await kv.get(paymentStatusKey) || {};
    
    await kv.set(paymentStatusKey, {
      ...existingStatus,
      reference,
      status,
      amount,
      payment_method,
      transaction_reference,
      customer,
      metadata,
      lastUpdated: new Date().toISOString(),
      webhookReceived: true,
      created_at,
      updated_at
    });

    // If payment is successful, update the payment record
    if (status === "success" || status === "completed" || status === "successful") {
      console.log(`✅ Payment ${reference} is successful`);
      
      // Find and update the payment record
      const verificationKey = `lenco_verification:${reference}`;
      const verification = await kv.get(verificationKey) || {};
      
      await kv.set(verificationKey, {
        ...verification,
        status: "completed",
        webhookConfirmed: true,
        webhookConfirmedAt: new Date().toISOString()
      });
      
      console.log(`✅ Updated verification record for ${reference}`);
    } else if (status === "failed" || status === "declined") {
      console.log(`❌ Payment ${reference} failed or was declined`);
    } else {
      console.log(`⏳ Payment ${reference} status: ${status}`);
    }

    // Acknowledge receipt of webhook
    return c.json({ 
      success: true, 
      message: "Webhook received and processed",
      reference
    });
  } catch (error) {
    console.error("❌ Error processing Lenco webhook:", error);
    
    // Still return 200 OK to prevent Lenco from retrying
    // but log the error for debugging
    return c.json({ 
      success: false, 
      error: `Webhook processing error: ${error.message}`,
      message: "Acknowledged with errors"
    }, 200);
  }
});

// Start the server
// Note: All routes must be prefixed with /make-server-f6550ac6
Deno.serve(app.fetch);