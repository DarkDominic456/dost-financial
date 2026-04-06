"use client";

import { motion } from "framer-motion";
import type { Message } from "./ChatInterface";
import RecommendationCard from "./RecommendationCard";

interface MessageBubbleProps {
  message: Message;
}

// Format time as HH:MM
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8,
        }}
        className={`mb-3 flex ${isUser ? "justify-end" : "items-start gap-2"}`}
      >
        {/* AI Avatar */}
        {!isUser && (
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
        )}

        {/* Bubble */}
        <motion.div
          layout
          className={`relative max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
            isUser
              ? "rounded-br-sm bg-brand text-white"
              : "rounded-tl-sm bg-surface text-text-primary"
          }`}
        >
          {/* Message text — render newlines */}
          <p className="whitespace-pre-wrap text-[14px] leading-relaxed">
            {message.text}
          </p>

          {/* Timestamp */}
          <p
            className={`mt-1 text-right text-[10px] ${
              isUser ? "text-white/60" : "text-text-tertiary"
            }`}
          >
            {formatTime(message.timestamp)}
          </p>
        </motion.div>
      </motion.div>

      {/* Recommendation Card — rendered below the AI bubble */}
      {message.recommendation && (
        <RecommendationCard data={message.recommendation} />
      )}
    </>
  );
}
