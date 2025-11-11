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

// Start the server
// Note: All routes must be prefixed with /make-server-f6550ac6
Deno.serve(app.fetch);