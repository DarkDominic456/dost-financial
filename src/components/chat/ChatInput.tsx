"use client";

import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 px-3 pb-3 pt-1.5"
      id="chat-input-form"
    >
      {/* Text Input */}
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleInput();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-2xl border border-border-subtle bg-surface px-4 py-2.5 text-[14px] leading-relaxed text-text-primary placeholder:text-text-tertiary focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/10 disabled:opacity-50"
          id="chat-input-textarea"
          aria-label="Message input"
        />
      </div>

      {/* Send Button */}
      <button
        type="submit"
        disabled={!canSend}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
          canSend
            ? "bg-brand text-white shadow-[0_2px_8px_rgba(26,115,232,0.3)] hover:bg-brand-dark active:scale-90"
            : "bg-surface text-text-tertiary"
        }`}
        id="chat-send-btn"
        aria-label="Send message"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
            fill="currentColor"
          />
        </svg>
      </button>
    </form>
  );
}
