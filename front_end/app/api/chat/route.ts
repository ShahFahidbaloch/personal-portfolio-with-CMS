import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { PORTFOLIO_KNOWLEDGE } from "@/lib/knowledge";

export const maxDuration = 30;

// Comprehensive Knowledge-based fallback responder using verified PORTFOLIO_KNOWLEDGE
function getFallbackAnswer(userQuestion: string): string {
  const q = userQuestion.toLowerCase();

  // Next.js & React experience
  if (q.includes("next") || q.includes("react") || q.includes("kitna") || q.includes("experience") || q.includes("tajurba")) {
    return "Shah Fahid is a Frontend-Focused Full Stack Developer with extensive production experience building performant web applications using React.js and Next.js (App Router). He has engineered headless e-commerce architectures, dynamic SSR blog platforms, and AI-driven streaming applications with strict TypeScript type-safety and 100 Lighthouse performance metrics. At Superior eCommerce Ltd (via Iconic Studio), he worked on enterprise headless storefronts for L'AZURDE Jewelry across KSA, Egypt, and UAE, delivering Apple Pay integration and sub-second performance.";
  }

  // E-Commerce & Projects (L'AZURDE, Shopify, BigCommerce)
  if (q.includes("lazurde") || q.includes("ecommerce") || q.includes("e-commerce") || q.includes("shopify") || q.includes("bigcommerce") || q.includes("perky") || q.includes("project")) {
    return "Shah Fahid has shipped notable production projects including: 1) L'AZURDE (lazurde.com) — multi-regional headless BigCommerce storefront serving KSA, Egypt, and UAE, where he implemented Apple Pay express checkout via PaymentRequest API and resolved Cloudflare edge caching token conflicts; 2) Perky Pear UK (perkypear.com) — high-converting Shopify theme engineering; 3) Marly Dan — production Shopify theme customization; and 4) Dynamic Blog & AI Portfolio — built with Next.js App Router, Sanity CMS, and real-time streaming.";
  }

  // Contact & Hiring
  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("whatsapp") || q.includes("rabta") || q.includes("number")) {
    return "You can get in touch with Shah Fahid directly via Email at shahfahidbaloch@gmail.com or via WhatsApp / Phone at +92 336 8558700. He is actively available for full-time engineering roles, remote contracts, and freelance projects. You can also view his verified code on GitHub (https://github.com/ShahFahidbaloch) or connect on LinkedIn (https://www.linkedin.com/in/shah-fahid).";
  }

  // Skills & Tech Stack
  if (q.includes("skills") || q.includes("stack") || q.includes("technologies") || q.includes("tech") || q.includes("tools")) {
    return "Shah Fahid's verified technical matrix includes: Frontend (React.js, Next.js App Router, TypeScript, Tailwind CSS, Zustand, TanStack Query, SASS), Mobile (React Native, Flutter), Backend & Databases (Node.js, Express.js, MongoDB, RESTful APIs), E-Commerce & CMS (Shopify Liquid, BigCommerce Headless, Sanity CMS), and Cloud/Edge (Cloudflare, Vercel, Git).";
  }

  // Education & Certifications
  if (q.includes("education") || q.includes("degree") || q.includes("certif") || q.includes("university") || q.includes("padhai")) {
    return "Shah Fahid is pursuing a Bachelor of Science in Computer Science (BSCS) at the Virtual University of Pakistan (Oct 2024 – Expected Aug 2028). He holds the Meta Front-End Developer Professional Certificate (Coursera) with verified coursework in React component architecture, UX principles, and modern frontend engineering.";
  }

  // Availability & Work terms
  if (q.includes("available") || q.includes("availability") || q.includes("freelance") || q.includes("remote") || q.includes("role") || q.includes("job")) {
    return "Shah Fahid is currently available for full-time engineering roles, remote contracts, freelance web development, and technical consulting. He operates flexibly across remote time zones (including UK, Europe, Middle East, and US overlaps) with clear asynchronous communication.";
  }

  // Default professional summary
  return "Shah Fahid is a Frontend-Focused Full Stack Developer specializing in React.js, Next.js (App Router), TypeScript, and headless e-commerce. He builds scalable, performant web applications with clean component architecture and minimal Apple-grade aesthetics. Feel free to ask about his work on L'AZURDE, technical skills, or get in touch at shahfahidbaloch@gmail.com (+92 336 8558700).";
}

// Convert plain text into a streaming typewriter response
function createTypewriterStream(text: string): Response {
  const encoder = new TextEncoder();
  const words = text.split(" ");

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        const word = (i === 0 ? "" : " ") + words[i];
        controller.enqueue(encoder.encode(word));
        await new Promise((r) => setTimeout(r, 22)); // 22ms per word typewriter cadence
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function POST(req: Request) {
  let userQuestion = "";

  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (Array.isArray(messages) && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      userQuestion = typeof lastMsg?.content === "string" ? lastMsg.content : "";
    }

    const apiKey =
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    // 1. Try real Google Gemini streaming if API key is configured
    if (apiKey && apiKey.trim() !== "") {
      try {
        const google = createGoogleGenerativeAI({ apiKey });
        const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const result = streamText({
          model: google(modelName),
          system: PORTFOLIO_KNOWLEDGE,
          messages,
          abortSignal: controller.signal,
        });

        // Race the first chunk against a fast 3.5s timeout to prevent ECONNRESET hangs
        const reader = result.textStream.getReader();
        const firstChunk = await Promise.race([
          reader.read(),
          new Promise<{ done: true; value: undefined }>((_, reject) =>
            setTimeout(() => reject(new Error("Gemini connection timed out")), 3500)
          ),
        ]);

        clearTimeout(timeoutId);

        if (!firstChunk.done && firstChunk.value) {
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(streamCtrl) {
              streamCtrl.enqueue(encoder.encode(firstChunk.value));
              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  if (value) streamCtrl.enqueue(encoder.encode(value));
                }
                streamCtrl.close();
              } catch {
                streamCtrl.close();
              }
            },
          });

          return new Response(stream, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache, no-transform",
            },
          });
        }
      } catch (geminiError) {
        console.warn(
          "[Gemini offline or network blocked, streaming verified portfolio knowledge]:",
          geminiError instanceof Error ? geminiError.message : geminiError
        );
      }
    }

    // 2. High-performance typewriter stream from verified PORTFOLIO_KNOWLEDGE
    const answer = getFallbackAnswer(userQuestion);
    return createTypewriterStream(answer);
  } catch (error: unknown) {
    console.error("[Chat API Handler Error]:", error);
    const fallbackAnswer = getFallbackAnswer(userQuestion);
    return createTypewriterStream(fallbackAnswer);
  }
}
