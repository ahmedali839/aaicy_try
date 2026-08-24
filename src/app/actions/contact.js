"use server";

import { z } from "zod";

// Create Zod Schema for strict validation
export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  phone: z.string().optional(),
  type: z.enum(["Business", "Support", "Other"]),
  concern: z.string().min(10, { message: "Message must be at least 10 characters." }),
  cfTurnstileResponse: z.string().min(1, { message: "Please complete the CAPTCHA." }),
});

// Basic in-memory rate limiter (For production, use Redis/Vercel KV)
const rateLimitMap = new Map();

export async function processContactForm(prevState, formData) {
  try {
    // Basic IP Rate Limiting Simulation (In Server Actions, headers() can provide IP if hosted on Vercel)
    // For this example, we mock a generic IP constraint to prevent spam loops from the same client origin.
    const ip = "client-ip-placeholder"; 
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    
    if (rateLimitMap.has(ip)) {
      const { count, startTime } = rateLimitMap.get(ip);
      if (now - startTime < windowMs) {
        if (count >= 3) {
          return { success: false, message: "Too many requests. Please try again later." };
        }
        rateLimitMap.set(ip, { count: count + 1, startTime });
      } else {
        rateLimitMap.set(ip, { count: 1, startTime: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, startTime: now });
    }

    // Validate on the server side
    const validatedData = contactSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      type: formData.get("type"),
      concern: formData.get("concern"),
      cfTurnstileResponse: formData.get("cf-turnstile-response"),
    });

    // Verify Cloudflare Turnstile Server-Side
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${turnstileSecret}&response=${validatedData.cfTurnstileResponse}`,
        }
      );
      const outcome = await turnstileRes.json();
      if (!outcome.success) {
        return { success: false, message: "CAPTCHA verification failed." };
      }
    }

    // 1. Send to Formspree
    // 2. Send to Discord/Slack Webhook (Optional, requires ENV var)

    const formspreeResponse = await fetch("https://formspree.io/f/mdkldary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedData),
    });

    if (!formspreeResponse.ok) {
      throw new Error("Failed to send to Formspree"); // make it more robust by logging the error or sending it to an error tracking service
      // make it more robust by logging the error or sending it to an error tracking service
    }


    // 2. Send to Discord/Slack Webhook (Optional, requires ENV var)
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `New AICY Contact: \n**Name:** ${validatedData.name}\n**Email:** ${validatedData.email}\n**Type:** ${validatedData.type}\n**Message:** ${validatedData.concern}`,
        }),
      });
    }

    return { success: true, message: "Thank you! Your message has been sent." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: "Network error, please try again later." };
  }
}
