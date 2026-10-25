import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { PORTFOLIO_KNOWLEDGE } from "@/lib/knowledge";

export const maxDuration = 30;

// Comprehensive Knowledge-based fallback responder using verified PORTFOLIO_KNOWLEDGE
function getFallbackAnswer(userQuestion: string): string {
  const q = userQuestion.toLowerCase().trim();

  // Greetings & Pleasantries
  if (q.includes("salam") || q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("kaise") || q.includes("kese") || q.includes("haal")) {
    return "Walaikum Assalam! Main Shah Fahid ka AI Representative hoon. Main aapko Shah Fahid ke production experience (Next.js, React, headless e-commerce), projects (L'AZURDE, Perky Pear), tech stack, aur hiring availability ke baare mein verified information de sakta hoon. Aap mujh se unke kaam ke mutaliq kuch bhi pooch sakte hain!";
  }

  // Who are you / Identity
  if (q.includes("kon ho") || q.includes("who are you") || q.includes("intro") || q.includes("taaruf") || q.includes("about you")) {
    return "Main Shah Fahid ka dedicated AI Technical Assistant hoon. Mera maqsad visitors, recruiters, aur prospective clients ko Shah Fahid ke verified credentials, production engineering track record (jaise L'AZURDE aur headless storefronts), aur direct contact channels ke baare mein quick aur accurate answers dena hai.";
  }

  // Location & City
  if (q.includes("kahan") || q.includes("location") || q.includes("rehte") || q.includes("city") || q.includes("where") || q.includes("multan")) {
    return "Shah Fahid Multan, Pakistan mein reside karte hain. Wo globally remote roles, freelance web engineering, aur technical consulting ke liye full-time available hain across UK, European, Middle Eastern, aur US time zone overlaps.";
  }

  // Next.js & React experience / Duration
  if (q.includes("next") || q.includes("react") || q.includes("kitna") || q.includes("tajurba") || q.includes("kab se") || q.includes("years") || q.includes("experience")) {
    return "Shah Fahid ke paas 3+ saal ka extensive production web engineering experience hai, jismein React.js, Next.js (App Router), TypeScript, aur Node.js shamil hain. Superior eCommerce Ltd (via Iconic Studio) mein unhone L'AZURDE Jewelry ke multi-regional headless storefront par Apple Pay express checkout integrate kiya aur Cloudflare edge CDN caching issues fix kiye. Wo 100 Lighthouse performance metrics ke saath scalable web apps banate hain.";
  }

  // E-Commerce & Projects (L'AZURDE, Shopify, BigCommerce)
  if (q.includes("lazurde") || q.includes("ecommerce") || q.includes("e-commerce") || q.includes("shopify") || q.includes("bigcommerce") || q.includes("perky") || q.includes("project") || q.includes("marly")) {
    return "Shah Fahid ke major production projects mein shamil hain: 1) L'AZURDE (lazurde.com) — Middle East ka leading luxury jewelry brand jahan Apple Pay checkout aur CDN edge caching stabilize ki; 2) Perky Pear UK (perkypear.com) — UK D2C fashion brand ka custom Shopify theme engineering; 3) Marly Dan — production Shopify theme customization; aur 4) Dynamic Blog & Portfolio — built with Next.js App Router, Sanity CMS, aur real-time AI streaming.";
  }

  // Contact, WhatsApp, Email, Phone
  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("whatsapp") || q.includes("rabta") || q.includes("number") || q.includes("call")) {
    return "Aap Shah Fahid se direct Email (shahfahidbaloch@gmail.com) ya direct WhatsApp/Phone (+92 336 8558700) par rabta kar sakte hain. Wo clients aur recruiters ko quick response dete hain. Inka verified code GitHub par bhi available hai: https://github.com/ShahFahidbaloch.";
  }

  // Skills & Technical Stack
  if (q.includes("skill") || q.includes("stack") || q.includes("technolog") || q.includes("tools") || q.includes("languages") || q.includes("language")) {
    return "Shah Fahid ka verified technical stack: Frontend (React.js, Next.js App Router, TypeScript, Tailwind CSS, Zustand, SASS), Mobile (React Native, Flutter), Backend & Databases (Node.js, Express.js, MongoDB, RESTful APIs), E-Commerce & Headless CMS (Shopify Liquid, BigCommerce, Sanity CMS), aur Cloud/Edge (Cloudflare CDN, Vercel, Git).";
  }

  // Education & Certifications
  if (q.includes("education") || q.includes("degree") || q.includes("certif") || q.includes("university") || q.includes("padhai") || q.includes("parhai") || q.includes("college")) {
    return "Shah Fahid Virtual University of Pakistan se Bachelor of Science in Computer Science (BSCS) kar rahe hain (2024–2028). Inke paas Meta Front-End Developer Professional Certificate (Coursera) bhi hai, jismein advanced React component architecture aur modern UX engineering verified hai.";
  }

  // Availability & Work terms / Pricing
  if (q.includes("available") || q.includes("availability") || q.includes("freelance") || q.includes("remote") || q.includes("role") || q.includes("job") || q.includes("rate") || q.includes("price") || q.includes("charges")) {
    return "Shah Fahid full-time engineering roles, remote contracts, freelance web development, aur technical consulting ke liye actively available hain. Wo flexible remote time zones (UK, EU, US, Gulf) mein asynchronous aur synchronous dono communication standards ke saath deliver karte hain.";
  }

  // Default professional summary
  return "Shah Fahid ek Frontend-Focused Full Stack Developer hain jo React.js, Next.js (App Router), TypeScript, aur headless e-commerce (Shopify & BigCommerce) mein deliver karte hain. Aap unke projects (L'AZURDE, Perky Pear), skills, experience, ya direct rabte ke baare mein mazeed pooch sakte hain (+92 336 8558700 / shahfahidbaloch@gmail.com).";
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

    console.log("[USER ASKED CHATBOT]:", userQuestion);

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
