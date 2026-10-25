import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// Simple in-memory rate limiter: max 5 requests per 10 minutes per IP
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean expired entries periodically
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((value, key) => {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    });
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
};

// Regex for standard email format validation
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Too many messages sent. Please wait a few minutes before trying again or email directly.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body safely
    let body: Record<string, unknown> = {};
    try {
      const parsed = await req.json();
      if (parsed && typeof parsed === "object") {
        body = parsed as Record<string, unknown>;
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = body;

    // 3. Spam honeypot detection
    if (honeypot && String(honeypot).trim() !== "") {
      // Silently accept bots without persisting
      return NextResponse.json(
        { success: true, message: "Message received." },
        { status: 200 }
      );
    }

    // 4. Input validation and sanitization
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "All fields (name, email, message) are required." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Please enter a valid name (2 to 100 characters)." },
        { status: 400 }
      );
    }

    if (!trimmedEmail || trimmedEmail.length > 120 || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 2500) {
      return NextResponse.json(
        { error: "Please enter a message between 10 and 2,500 characters." },
        { status: 400 }
      );
    }

    // 5. Check write token on the server
    const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

    if (!writeToken) {
      console.warn("[Contact API] SANITY_API_WRITE_TOKEN is not configured on the server.");
      return NextResponse.json(
        {
          error: "The contact form backend is currently unconfigured. Please reach out directly at shahfahidbaloch@gmail.com.",
        },
        { status: 503 }
      );
    }

    // 6. Persist to Sanity CMS server-side with private write token
    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "k21eb9nx",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-05-07",
      useCdn: false,
      token: writeToken,
    });

    const doc = {
      _type: "contact",
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      submittedAt: new Date().toISOString(),
    };

    await writeClient.create(doc);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for getting in touch! Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Contact API Error]:", message);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while sending your message. Please try again or email directly.",
      },
      { status: 500 }
    );
  }
}
