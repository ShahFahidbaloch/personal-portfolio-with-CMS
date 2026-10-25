"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowUp,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "Shah Fahid ka Next.js & React experience kitna hai?",
  "Tell me about his work on L'AZURDE & BigCommerce.",
  "What is his full technical stack and skills?",
  "How can I contact or hire Shah Fahid?",
];

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-intro",
  role: "assistant",
  content:
    "Hello! I am Shah Fahid's AI Representative. Feel free to ask me anything about his production engineering experience, tech stack, open-source projects, or hiring availability.",
};

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
};

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);

  // Teaser Bubble State & Timers
  const [showTeaser, setShowTeaser] = useState(false);
  const teaserTimerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number>(7000);
  const startTimeRef = useRef<number>(0);

  const clearTeaserTimer = useCallback(() => {
    if (teaserTimerRef.current) {
      clearTimeout(teaserTimerRef.current);
      teaserTimerRef.current = null;
    }
  }, []);

  const dismissTeaser = useCallback(() => {
    clearTeaserTimer();
    setShowTeaser(false);
    try {
      sessionStorage.setItem("has_seen_chat_teaser", "true");
    } catch {
      // Ignore in private browsing / SSR
    }
  }, [clearTeaserTimer]);

  // Delayed entry: Appears 3.5 seconds after page load
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("has_seen_chat_teaser");
      if (hasSeen === "true") return;
    } catch {
      // Ignore
    }

    const entryTimer = setTimeout(() => {
      setIsOpen((currentOpen) => {
        if (!currentOpen) {
          setShowTeaser(true);
          startTimeRef.current = Date.now();
          remainingTimeRef.current = 7000;
          teaserTimerRef.current = setTimeout(() => {
            setShowTeaser(false);
            try {
              sessionStorage.setItem("has_seen_chat_teaser", "true");
            } catch {
              // Ignore
            }
          }, 7000);
        }
        return currentOpen;
      });
    }, 3500);

    return () => {
      clearTimeout(entryTimer);
      clearTeaserTimer();
    };
  }, [clearTeaserTimer]);

  // Dismiss teaser if modal opens
  useEffect(() => {
    if (isOpen && showTeaser) {
      dismissTeaser();
    }
  }, [isOpen, showTeaser, dismissTeaser]);

  // Hover pause: Pauses dismissal timer on mouse-hover or touch-hold
  const handleTeaserMouseEnter = () => {
    clearTeaserTimer();
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(1000, remainingTimeRef.current - elapsed);
  };

  // Resume dismissal timer on mouse-leave
  const handleTeaserMouseLeave = () => {
    clearTeaserTimer();
    startTimeRef.current = Date.now();
    teaserTimerRef.current = setTimeout(() => {
      dismissTeaser();
    }, remainingTimeRef.current);
  };

  // Tap/Click action: Tapping the bubble immediately dismisses it and expands full modal
  const handleTeaserClick = () => {
    dismissTeaser();
    setIsOpen(true);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input field when chat opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : input).trim();
    if (!query || isLoading) return;

    setInput("");
    setError(null);

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: query,
    };

    const assistantMsgId = "assistant-" + Date.now();
    const updatedHistory = [...messages, userMessage];

    // Optimistically append user message and placeholder assistant message
    setMessages([...updatedHistory, { id: assistantMsgId, role: "assistant", content: "" }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.error || `HTTP error ${res.status}`);
      }

      if (!res.body) {
        throw new Error("No response stream received from the AI server.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let streamText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: streamText } : msg
          )
        );
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      // Remove empty assistant placeholder if failed completely
      setMessages((prev) =>
        prev.filter((msg) => !(msg.id === assistantMsgId && msg.content === ""))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset-" + Date.now(),
        role: "assistant",
        content: "Chat reset. How can I help you learn more about Shah Fahid today?",
      },
    ]);
    setError(null);
  };

  return (
    <aside
      className="fixed bottom-6 right-4 sm:right-6 z-50 pointer-events-auto select-none"
      aria-label="Shah Fahid AI Assistant"
    >
      {/* ================= TEASER BUBBLE ================= */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            onMouseEnter={handleTeaserMouseEnter}
            onMouseLeave={handleTeaserMouseLeave}
            onTouchStart={handleTeaserMouseEnter}
            onTouchEnd={handleTeaserMouseLeave}
            onClick={handleTeaserClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleTeaserClick();
              }
            }}
            aria-label="Chat assistant preview notification"
            className="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-32px)] max-w-[240px] sm:w-[240px] p-3 rounded-2xl bg-white/95 dark:bg-[#1D1D1F]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)] cursor-pointer select-none text-left transition-colors group mb-2"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-neutral-400 dark:text-neutral-400">
                Shah Fahid AI
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissTeaser();
                }}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-0.5 -mr-0.5 -mt-0.5 rounded-full"
                aria-label="Dismiss message"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Body */}
            <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-snug font-normal">
              Hi! Ask anything about Shah&apos;s stack, projects, or availability.
            </p>

            {/* Action cue */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors font-mono">
              <span>Ask a question</span>
              <span>→</span>
            </div>

            {/* Downward pointer tail */}
            <div
              className="absolute -bottom-1 right-6 sm:right-7 w-2.5 h-2.5 rotate-45 bg-white/95 dark:bg-[#1D1D1F]/95 border-r border-b border-black/10 dark:border-white/15"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CHAT WINDOW CONTAINER ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={SPRING_CONFIG}
            className="mb-3.5 w-[calc(100vw-32px)] sm:w-[390px] h-[520px] sm:h-[560px] max-h-[82vh] rounded-[28px] bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden text-neutral-900 dark:text-white"
            role="dialog"
            aria-modal="true"
            aria-label="AI Chat Dialogue"
          >
            {/* Header */}
            <div className="h-14 px-4 bg-neutral-100/80 dark:bg-white/[0.04] border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-white/10 p-1 border border-black/10 dark:border-white/10 shadow-sm flex-shrink-0">
                  <Image
                    src="/robot.png"
                    alt="Shah Fahid AI Robot"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold tracking-tight leading-none text-neutral-900 dark:text-white flex items-center gap-1.5">
                    Shah Fahid AI
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 font-normal">
                      Gemini
                    </span>
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    <span>Online · Technical Rep</span>
                    <span>·</span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://icons8.com/icon/WC0vQTAiqiCy/robot"
                      className="hover:underline opacity-60 hover:opacity-100 transition-opacity"
                      title="Robot icon by Icons8"
                    >
                      Icons8
                    </a>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                  className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  aria-label="Close Chat"
                  className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 select-text">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start items-end gap-2"}`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-neutral-200/80 dark:bg-white/10 border border-black/5 dark:border-white/10 p-0.5 flex-shrink-0 mb-0.5 flex items-center justify-center shadow-xs">
                        <Image
                          src="/robot.png"
                          alt="Robot"
                          width={20}
                          height={20}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-[20px] px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed transition-all ${
                        isUser
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-br-sm shadow-sm"
                          : "bg-neutral-100 dark:bg-white/[0.08] text-neutral-800 dark:text-neutral-200 border border-black/[0.04] dark:border-white/[0.08] rounded-bl-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words">
                        {m.content}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing / Streaming Indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-200/80 dark:bg-white/10 border border-black/5 dark:border-white/10 p-0.5 flex-shrink-0 mb-0.5 flex items-center justify-center shadow-xs">
                    <Image
                      src="/robot.png"
                      alt="Robot"
                      width={20}
                      height={20}
                      className="w-full h-full object-contain animate-pulse"
                    />
                  </div>
                  <div className="bg-neutral-100 dark:bg-white/[0.08] border border-black/[0.04] dark:border-white/[0.08] rounded-[20px] rounded-bl-sm px-3.5 py-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}

              {/* Error Alert Banner */}
              {error && (
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/15 text-neutral-800 dark:text-neutral-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-neutral-500 dark:text-neutral-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Notice</p>
                    <p className="mt-0.5 opacity-90">{error}</p>
                  </div>
                </div>
              )}

              {/* Starter Question Chips (Shown when conversation has only initial welcome) */}
              {messages.length <= 1 && (
                <div className="pt-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                    Suggested Questions
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {STARTER_PROMPTS.map((promptText) => (
                      <button
                        key={promptText}
                        type="button"
                        onClick={() => handleSendMessage(promptText)}
                        disabled={isLoading}
                        className="text-left text-xs px-3 py-2 rounded-xl bg-neutral-100/80 hover:bg-neutral-200/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-black/[0.04] dark:border-white/[0.06] text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer select-none"
                      >
                        ⚡ {promptText}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 bg-neutral-50/80 dark:bg-black/40 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Next.js, projects, hiring..."
                disabled={isLoading}
                className="flex-1 bg-white dark:bg-white/[0.08] border border-black/10 dark:border-white/10 rounded-full px-4 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/30 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send Message"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-sm flex-shrink-0 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOATING LAUNCHER BUTTON ================= */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isOpen}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 dark:bg-[#0c0d12]/95 border border-black/10 dark:border-white/20 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.45)] hover:border-black/20 dark:hover:border-white/40 transition-all cursor-pointer group p-1.5 overflow-visible"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center w-full h-full text-neutral-800 dark:text-white"
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="robot-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center w-full h-full"
            >
              <Image
                src="/robot.png"
                alt="AI Assistant Robot"
                width={56}
                height={56}
                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </aside>
  );
}
