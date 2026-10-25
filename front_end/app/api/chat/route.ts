import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { PORTFOLIO_KNOWLEDGE } from "@/lib/knowledge";

export const maxDuration = 30;

// Helper to detect Urdu or Roman Urdu keywords (strictly non-English tokens)
function isUrduQuery(text: string): boolean {
  const lower = text.toLowerCase();
  const urduPatterns = [
    /\b(kya|kia|kaise|kese|kahan|kidhar|kon|kaun|kyun|kab|kitna|kitni|kitne)\b/,
    /\b(hai|hain|hoon|hun|tha|thi|thay|bhi|aur|batao|bataen|batayein|bataiye)\b/,
    /\b(poocha|pucha|jawab|sawal|rabta|tajurba|shukriya|theek|teek|acha|achha)\b/,
    /\b(unka|unke|unki|mera|meri|mere|aapka|aapki|aapke|karo|karein)\b/,
    /[\u0600-\u06FF]/, // Arabic/Urdu unicode script
  ];
  return urduPatterns.some((pattern) => pattern.test(lower));
}

// Helper to detect gibberish, spam, or invalid low-effort input
function isGibberishOrInvalid(text: string): boolean {
  const trimmed = text.trim();

  // Too short
  if (trimmed.length < 2) return true;

  // Allowed short valid greetings
  const lower = trimmed.toLowerCase();
  if (["hi", "yo", "ok", "hey"].includes(lower)) return false;

  // Has no letters at all (e.g., "123456", "??????", "!@#$%")
  if (!/[a-zA-Z\u0600-\u06FF]/.test(trimmed)) return true;

  // Repeated identical character >= 4 times (e.g., "aaaaa", "zzzzz", ".....")
  if (/(.)\1{3,}/.test(trimmed)) return true;

  // Common keyboard mash patterns
  if (
    /^(asdf|qwer|zxcv|hjkl|poiuy|lkjhg|mnbvc)/i.test(trimmed) ||
    lower.includes("asdfg") ||
    lower.includes("qwerty")
  ) {
    return true;
  }

  // Single word of length > 6 with zero vowels (e.g., "sdfghjk", "qwrtyp")
  const words = trimmed.split(/\s+/);
  for (const word of words) {
    const lettersOnly = word.replace(/[^a-zA-Z]/g, "");
    if (lettersOnly.length > 6 && !/[aeiouyAEIOUY]/.test(lettersOnly)) {
      return true;
    }
  }

  return false;
}

// Helper to detect off-topic / out-of-scope questions (e.g. general trivia, geography, weather, politics, recipes)
function isOutOfScope(text: string): boolean {
  const q = text.toLowerCase().trim();

  // Explicit out-of-scope patterns:
  const outOfScopePatterns = [
    // General geography / country capitals / population / politics
    /\b(capital of|capital city|population of|currency of|flag of|continent|anthem)\b/,
    /\b(who is the president|who is the prime minister|who is pm|prime minister of|president of)\b/,

    // Public figures / Celebrities unrelated to Shah
    /\b(elon musk|donald trump|joe biden|imran khan|nawaz sharif|messi|ronaldo|taylor swift)\b/,

    // Weather & environment
    /\b(weather|temperature|forecast|is it raining|humidity|climate change)\b/,

    // Cooking & recipes
    /\b(recipe|how to cook|ingredients of|biryani recipe|bake a cake|pizza recipe)\b/,

    // Homework, general academic & unrelated algorithms
    /\b(solve this|calculate|derivative of|integral of|write an essay on|homework)\b/,
    /\b(write (python|java|c\+\+|rust|go|c) (code|script) (to|for))\b/,

    // Entertainment / jokes / stories / poetry
    /\b(tell me a joke|tell a joke|sing a song|write a poem|tell a story|movie recommendation)\b/,

    // Medical, financial, legal advice
    /\b(crypto price|bitcoin price|stock market|weight loss|cure for|symptoms of)\b/,
  ];

  for (const pattern of outOfScopePatterns) {
    if (pattern.test(q)) {
      return true;
    }
  }

  // Standalone general knowledge queries like "what is the capital of pakistan?" or "capital of france"
  if (
    (q.includes("capital") && q.includes("pakistan")) ||
    (q.includes("capital") && q.includes("city")) ||
    (q.includes("capital") && (q.includes("what is") || q.includes("which is") || q.includes("kya hai") || q.includes("kya he")))
  ) {
    return true;
  }

  // Generic country query without mentioning Shah Fahid
  const mentionsShah =
    q.includes("shah") ||
    q.includes("fahid") ||
    q.includes("portfolio") ||
    q.includes("developer") ||
    q.includes("website") ||
    q.includes("engineer") ||
    q.includes("work");

  if (
    !mentionsShah &&
    /\b(pakistan|india|america|usa|uk|canada|china|russia)\b/.test(q) &&
    /\b(what is|who is|kya hai|kya he|history|pm|president|capital|city)\b/.test(q)
  ) {
    return true;
  }

  return false;
}

// Comprehensive Knowledge-based fallback responder with strict validation
function getFallbackAnswer(userQuestion: string): string {
  const q = userQuestion.toLowerCase().trim();
  const urdu = isUrduQuery(userQuestion);

  // 1. Validation: Gibberish, low-effort or invalid input
  if (isGibberishOrInvalid(userQuestion)) {
    if (urdu) {
      return "Barah-e-karam Shah Fahid ke portfolio, technical stack (Next.js, React, Node.js), projects (jaise L'AZURDE), ya hiring availability ke mutaliq wazeh sawal poochein.";
    }
    return "Please enter a valid, meaningful question regarding Shah Fahid's software engineering portfolio, tech stack, projects, or hiring availability.";
  }

  // 2. Validation: Out-of-scope / General Knowledge / Trivia Guardrail
  if (isOutOfScope(userQuestion)) {
    if (urdu) {
      return "Main Shah Fahid ka dedicated AI Portfolio Assistant hoon aur sirf unke software engineering career, technical stack (Next.js, React, TypeScript), production projects (jaise L'AZURDE), aur hiring availability ke baare mein jawab de sakta hoon.\n\nMain general knowledge, geography, ya out-of-scope sawalat ka jawab nahi de sakta. Barah-e-karam Shah Fahid ke kaam ya portfolio ke mutaliq sawal poochein!";
    }
    return "I am Shah Fahid's dedicated AI Representative, specialized exclusively in his software engineering portfolio, technical skills (Next.js, React, TypeScript, Node.js), production projects (such as L'AZURDE & headless e-commerce), and hiring availability.\n\nI cannot answer general trivia, geography, or out-of-scope questions (such as country capitals, weather, or politics). Please feel free to ask anything about Shah Fahid's work, experience, or how to contact and hire him!";
  }

  // 3. Modern Component Architecture (Card from About section) - Check BEFORE greetings to avoid "architecture" matching "hi"
  if (
    q.includes("modern component architecture") ||
    q.includes("component architecture") ||
    (q.includes("architecture") && (q.includes("component") || q.includes("modern") || q.includes("card")))
  ) {
    if (urdu) {
      return "Modern Component Architecture card Shah Fahid ke engineering approach ko highlight karta hai: Next.js App Router, React Server Components (RSC), TypeScript, aur Tailwind CSS ke zariye pixel-perfect web apps banana jo desktop aur mobile par bina kisi layout shift (Zero CLS) aur 100 Lighthouse performance score ke sath deliver hoti hain.";
    }
    return "The 'Modern Component Architecture' card showcases Shah Fahid's engineering standard: building pixel-perfect web applications using Next.js App Router, React Server Components (RSC), TypeScript, and Tailwind CSS with fluid responsive layouts, zero Cumulative Layout Shift (CLS), and 100 Lighthouse performance metrics.";
  }

  // 4. Headless E-Commerce / 0.2s TTFB / Apple Pay (Card from About section)
  if (
    q.includes("headless") ||
    q.includes("0.2s") ||
    q.includes("ttfb") ||
    q.includes("apple pay") ||
    q.includes("bigcommerce") ||
    (q.includes("shopify") && (q.includes("headless") || q.includes("ecommerce") || q.includes("e-commerce")))
  ) {
    if (urdu) {
      return "Headless E-Commerce showcase Shah Fahid ke enterprise storefronts (jaise L'AZURDE BigCommerce aur custom Shopify stores) par kaam ko darshata hai. Ismein Cloudflare global edge CDN ke zariye sub-second (0.2s) TTFB caching, PaymentRequest API ke zariye 1-click Apple Pay checkout, aur resilient cart-session management shamil hai.";
    }
    return "The 'Headless E-Commerce' showcase highlights Shah Fahid's production work on enterprise e-commerce platforms (such as L'AZURDE on BigCommerce and custom Shopify themes). Key achievements include achieving sub-second (0.2s) TTFB via Cloudflare global edge CDN caching, 1-click Apple Pay checkout via the PaymentRequest API, and resilient cart-session state management.";
  }

  // 5. Scalable APIs / Sanity CMS / Backend
  if (
    q.includes("scalable api") ||
    q.includes("sanity") ||
    (q.includes("api") && (q.includes("scalable") || q.includes("backend") || q.includes("rest"))) ||
    q.includes("mongodb") ||
    q.includes("express")
  ) {
    if (urdu) {
      return "Shah Fahid high-throughput backend APIs aur headless content management systems design karte hain Node.js, Express, RESTful APIs, Sanity CMS headless studio, aur MongoDB ke sath, strict type-safety aur scalable architecture ko maintain karte huay.";
    }
    return "Shah Fahid engineers scalable backend services and headless content pipelines using Node.js, Express.js, RESTful APIs, Sanity CMS studio, and MongoDB with strict type validation and optimized caching layers.";
  }

  // 6. Greetings & Pleasantries (Word boundary matching to prevent matching 'architecture' or 'which')
  if (
    /\b(salam|assalam|aoa|hello|hey|hi)\b/i.test(q) ||
    /\b(kaise ho|kese ho|haal|how are you|good morning|good evening)\b/i.test(q)
  ) {
    if (urdu) {
      return "Walaikum Assalam! Main Shah Fahid ka AI Representative hoon. Main aapko Shah Fahid ke production experience (Next.js, React, headless e-commerce), projects (L'AZURDE, Perky Pear), tech stack, aur hiring availability ke baare mein verified information de sakta hoon. Aap mujh se unke kaam ke mutaliq kuch bhi pooch sakte hain!";
    }
    return "Hello! I am Shah Fahid's AI Representative. I can provide verified details on his production web engineering experience (Next.js, React, TypeScript), live projects (L'AZURDE, Perky Pear), tech stack, and full-time or freelance availability. How can I assist you today?";
  }

  // 7. Who are you / Identity / Bot Purpose
  if (
    /\b(who are you|who is shah|who is fahid|kon ho|kaun ho|intro|taaruf|about you)\b/i.test(q) ||
    q.includes("what is your purpose") ||
    q.includes("who made you")
  ) {
    if (urdu) {
      return "Main Shah Fahid ka dedicated AI Technical Assistant hoon. Mera maqsad visitors, recruiters, aur prospective clients ko Shah Fahid ke verified credentials, production engineering track record (jaise L'AZURDE aur headless storefronts), aur direct contact channels ke baare mein quick aur accurate answers dena hai.";
    }
    return "I am the official AI Technical Assistant for Shah Fahid. My purpose is to help recruiters, engineering leads, and clients explore Shah Fahid's software engineering background, inspect his production track record (such as L'AZURDE and high-speed headless storefronts), and connect with him directly.";
  }

  // 8. Location & City (Where is Shah Fahid located?)
  if (
    q.includes("kahan") ||
    q.includes("location") ||
    q.includes("rehte") ||
    q.includes("city") ||
    q.includes("where") ||
    q.includes("multan") ||
    (q.includes("pakistan") && (q.includes("live") || q.includes("from") || q.includes("shah") || q.includes("rehta")))
  ) {
    if (urdu) {
      return "Shah Fahid Multan, Pakistan mein reside karte hain. Wo globally remote roles, freelance web engineering, aur technical consulting ke liye full-time available hain across UK, European, Middle Eastern, aur US time zone overlaps.";
    }
    return "Shah Fahid is based in Multan, Pakistan. He operates globally with full remote capability, offering comfortable overlapping working hours for UK, European, Middle Eastern, and US teams.";
  }

  // 9. Next.js, React & Experience duration
  if (
    q.includes("next") ||
    q.includes("react") ||
    q.includes("kitna") ||
    q.includes("tajurba") ||
    q.includes("kab se") ||
    q.includes("years") ||
    q.includes("experience")
  ) {
    if (urdu) {
      return "Shah Fahid ke paas 3+ saal ka extensive production web engineering experience hai, jismein React.js, Next.js (App Router), TypeScript, aur Node.js shamil hain. Superior eCommerce Ltd (via Iconic Studio) mein unhone L'AZURDE Jewelry ke multi-regional headless storefront par Apple Pay express checkout integrate kiya aur Cloudflare edge CDN caching issues fix kiye. Wo 100 Lighthouse performance metrics ke saath scalable web apps banate hain.";
    }
    return "Shah Fahid has over 3+ years of professional web engineering experience, specializing in Next.js (App Router), React, TypeScript, and Node.js. At Superior eCommerce Ltd (via Iconic Studio), he integrated Apple Pay express checkout on L'AZURDE's multi-regional headless storefront and resolved complex Cloudflare edge CDN caching conflicts, delivering sub-second load times and 100 Lighthouse scores.";
  }

  // 10. Projects (L'AZURDE, Perky Pear, Marly Dan, Dynamic Blog)
  if (
    q.includes("lazurde") ||
    q.includes("perky") ||
    q.includes("project") ||
    q.includes("marly") ||
    q.includes("portfolio website")
  ) {
    if (urdu) {
      return "Shah Fahid ke major production projects mein shamil hain: 1) L'AZURDE (lazurde.com) — Middle East ka leading luxury jewelry brand jahan Apple Pay checkout aur CDN edge caching stabilize ki; 2) Perky Pear UK (perkypear.com) — UK D2C fashion brand ka custom Shopify theme engineering; 3) Marly Dan — production Shopify theme customization; aur 4) Dynamic Blog & Portfolio — built with Next.js App Router, Sanity CMS, aur real-time AI streaming.";
    }
    return "Key production projects engineered by Shah Fahid include: 1) L'AZURDE (lazurde.com) — Luxury jewelry brand in KSA, UAE & Egypt with Apple Pay checkout and CDN edge cache stabilization; 2) Perky Pear UK (perkypear.com) — UK D2C fashion shapewear brand with custom Shopify theme development; 3) Marly Dan — Shopify theme customizations; and 4) Dynamic Blog & Portfolio — built with Next.js App Router, Sanity CMS, and real-time AI streaming.";
  }

  // 11. Contact, WhatsApp, Email, Phone, Socials
  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("whatsapp") ||
    q.includes("rabta") ||
    q.includes("number") ||
    q.includes("call") ||
    q.includes("github") ||
    q.includes("linkedin")
  ) {
    if (urdu) {
      return "Aap Shah Fahid se direct Email (shahfahidbaloch@gmail.com) ya direct WhatsApp/Phone (+92 336 8558700) par rabta kar sakte hain. Wo clients aur recruiters ko quick response dete hain. Inka verified code GitHub par bhi available hai: https://github.com/ShahFahidbaloch.";
    }
    return "You can contact Shah Fahid directly via Email at shahfahidbaloch@gmail.com or on WhatsApp/Phone at +92 336 8558700. His verified open-source work is available on GitHub: https://github.com/ShahFahidbaloch and LinkedIn: https://www.linkedin.com/in/shah-fahid-a4543027b/.";
  }

  // 12. Technical Skills & Languages
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("technolog") ||
    q.includes("tools") ||
    q.includes("languages") ||
    q.includes("language") ||
    q.includes("typescript") ||
    q.includes("tailwind")
  ) {
    if (urdu) {
      return "Shah Fahid ka verified technical stack: Frontend (React.js, Next.js App Router, TypeScript, Tailwind CSS, Zustand, SASS), Mobile (React Native, Flutter), Backend & Databases (Node.js, Express.js, MongoDB, RESTful APIs), E-Commerce & Headless CMS (Shopify Liquid, BigCommerce, Sanity CMS), aur Cloud/Edge (Cloudflare CDN, Vercel, Git).";
    }
    return "Shah Fahid's verified technical stack includes: Frontend (React.js, Next.js App Router, TypeScript, Tailwind CSS, Zustand, SASS), Mobile (React Native, Flutter), Backend & Databases (Node.js, Express.js, MongoDB, RESTful APIs), E-Commerce & Headless CMS (Shopify Liquid, BigCommerce, Sanity CMS), and Cloud/Edge (Cloudflare CDN, Vercel, Git).";
  }

  // 13. Education & Certifications
  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("certif") ||
    q.includes("university") ||
    q.includes("padhai") ||
    q.includes("parhai") ||
    q.includes("college") ||
    q.includes("meta")
  ) {
    if (urdu) {
      return "Shah Fahid Virtual University of Pakistan se Bachelor of Science in Computer Science (BSCS) kar rahe hain (2024–2028). Inke paas Meta Front-End Developer Professional Certificate (Coursera) bhi hai, jismein advanced React component architecture aur modern UX engineering verified hai.";
    }
    return "Shah Fahid is pursuing a Bachelor of Science in Computer Science (BSCS) at the Virtual University of Pakistan (2024–2028). He also holds the Meta Front-End Developer Professional Certificate from Coursera, verifying his expertise in React component architecture and modern UI engineering.";
  }

  // 14. Availability & Rates / Pricing / Hiring terms
  if (
    q.includes("available") ||
    q.includes("availability") ||
    q.includes("freelance") ||
    q.includes("remote") ||
    q.includes("role") ||
    q.includes("job") ||
    q.includes("rate") ||
    q.includes("price") ||
    q.includes("charges") ||
    q.includes("cost")
  ) {
    if (urdu) {
      return "Shah Fahid full-time engineering roles, remote contracts, freelance web development, aur technical consulting ke liye actively available hain. Unki rates project scope aur milestones ke mutabiq competitive hain. Aap direct email (shahfahidbaloch@gmail.com) ya WhatsApp (+92 336 8558700) par project details discuss kar sakte hain.";
    }
    return "Shah Fahid is actively available for full-time frontend/full-stack engineering roles, remote contracts, and freelance projects. He offers flexible remote hours across UK, EU, Middle East, and US time zones. Rates are competitive and structured per project milestones. Feel free to reach out directly at shahfahidbaloch@gmail.com or via WhatsApp at +92 336 8558700.";
  }

  // 15. CV / Resume Download
  if (q.includes("cv") || q.includes("resume") || q.includes("download")) {
    if (urdu) {
      return "Aap Shah Fahid ka verified CV is website ke Hero section mein mojood direct 'Download CV' button se fori download kar sakte hain, ya unhe direct email (shahfahidbaloch@gmail.com) par request bhej sakte hain.";
    }
    return "You can download Shah Fahid's verified CV directly via the 'Download CV' button in the Hero section of this website, or request an updated copy via email at shahfahidbaloch@gmail.com.";
  }

  // 16. Fallback if the query mentions Shah / developer / work but was not caught above
  if (
    q.includes("shah") ||
    q.includes("fahid") ||
    q.includes("developer") ||
    q.includes("engineer") ||
    q.includes("web") ||
    q.includes("portfolio") ||
    q.includes("work")
  ) {
    if (urdu) {
      return "Shah Fahid ek Frontend-Focused Full Stack Developer hain jo React.js, Next.js (App Router), TypeScript, aur headless e-commerce (Shopify & BigCommerce) mein deliver karte hain. Aap unke projects (L'AZURDE, Perky Pear), skills, experience, ya direct rabte ke baare mein mazeed pooch sakte hain (+92 336 8558700 / shahfahidbaloch@gmail.com).";
    }
    return "Shah Fahid is a Frontend-Focused Full Stack Developer specializing in React.js, Next.js (App Router), TypeScript, and headless e-commerce. Feel free to ask about his work on L'AZURDE, technical skills, production projects, or get in touch at shahfahidbaloch@gmail.com (+92 336 8558700).";
  }

  // 17. Unrecognized query without clear portfolio connection -> Prompt user for clear scope
  if (urdu) {
    return "Main Shah Fahid ka dedicated AI Portfolio Assistant hoon. Main sirf Shah Fahid ke web engineering experience, skills (Next.js, React, Node.js), projects, aur hiring availability ke baare mein maloomat de sakta hoon. Barah-e-karam apna sawal unke kaam ya portfolio ke mutaliq poochein.";
  }
  return "I am specialized only as Shah Fahid's AI Portfolio Assistant. I can only provide information regarding Shah Fahid's software engineering background, technical stack (Next.js, React, TypeScript), production projects, and availability for hire. Could you please ask a question related to his portfolio or work?";
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

    // Immediate Validation: If input is gibberish, spam, or out-of-scope, return verified guardrail response immediately
    if (isGibberishOrInvalid(userQuestion) || isOutOfScope(userQuestion)) {
      const validatedAnswer = getFallbackAnswer(userQuestion);
      return createTypewriterStream(validatedAnswer);
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
