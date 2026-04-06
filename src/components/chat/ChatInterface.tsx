"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import QuickReplies from "./QuickReplies";
import ChatInput from "./ChatInput";
import type { RecommendationData } from "./RecommendationCard";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  recommendation?: RecommendationData;
}

// Conversation history format for the API
interface ChatHistoryEntry {
  role: "user" | "model";
  content: string;
}

// Dummy initial conversation
const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hey! 👋 I'm your Financial Dost. I can help you save smarter and reach your goals faster. What are you saving for?",
    sender: "ai",
    timestamp: new Date(Date.now() - 60000 * 5),
  },
];

const INITIAL_HISTORY: ChatHistoryEntry[] = [
  {
    role: "model",
    content:
      "Hey! 👋 I'm your Financial Dost. I can help you save smarter and reach your goals faster. What are you saving for?",
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [chatHistory, setChatHistory] =
    useState<ChatHistoryEntry[]>(INITIAL_HISTORY);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      // Add user message to UI
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        text: trimmed,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Show typing indicator
      setIsTyping(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: chatHistory,
          }),
        });

        const data = await response.json();

        const aiText =
          data.text ||
          "Sorry, I couldn't process that. Could you try asking again? 🙏";

        // Build the AI message
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          text: aiText,
          sender: "ai",
          timestamp: new Date(),
          recommendation: data.recommendation || undefined,
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, aiMsg]);

        // Update conversation history for context
        setChatHistory((prev) => [
          ...prev,
          { role: "user" as const, content: trimmed },
          { role: "model" as const, content: aiText },
        ]);
      } catch (error) {
        console.error("Chat API error:", error);
        setIsTyping(false);

        const errorMsg: Message = {
          id: `ai-error-${Date.now()}`,
          text: "I'm having trouble connecting right now. Please check your internet and try again! 🙏",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    },
    [chatHistory, isTyping]
  );

  return (
    <div className="flex h-dvh flex-col bg-white">
      <ChatHeader />

      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain px-4 pt-3 pb-2"
        id="chat-messages-area"
      >
        {/* Date divider */}
        <div className="mb-4 flex items-center justify-center">
          <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-medium text-text-tertiary">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="mb-3 flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  fill="#1A73E8"
                  opacity="0.2"
                />
                <circle cx="12" cy="12" r="3" fill="#1A73E8" />
              </svg>
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-surface px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-text-tertiary [animation-delay:0ms]" />
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-text-tertiary [animation-delay:150ms]" />
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-text-tertiary [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="shrink-0 border-t border-border-subtle bg-white pb-[env(safe-area-inset-bottom)]">
        <QuickReplies onSelect={handleSendMessage} disabled={isTyping} />
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
