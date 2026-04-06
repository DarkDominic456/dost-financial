"use client";

import { useRef } from "react";

interface QuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const QUICK_REPLIES = [
  { label: "🏍️ Save for a bike", value: "I want to save for a bike" },
  {
    label: "🛡️ Build emergency fund",
    value: "Help me build an emergency fund",
  },
  { label: "💰 Save ₹500/month", value: "I want to save ₹500 per month" },
  { label: "📈 Start investing", value: "I want to start investing" },
  { label: "🎯 Set a goal", value: "Help me set a savings goal" },
];

export default function QuickReplies({ onSelect, disabled }: QuickRepliesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative px-3 pt-2.5 pb-1">
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-2 overflow-x-auto"
        role="list"
        aria-label="Quick reply suggestions"
      >
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply.value}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(reply.value)}
            className="shrink-0 rounded-full border border-border-subtle bg-white px-3.5 py-2 text-[13px] font-medium text-text-secondary whitespace-nowrap transition-all duration-150 hover:border-brand/30 hover:bg-brand-light hover:text-brand active:scale-95 disabled:opacity-40 disabled:hover:border-border-subtle disabled:hover:bg-white disabled:hover:text-text-secondary"
            role="listitem"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  );
}
