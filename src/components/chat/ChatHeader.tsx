"use client";

import Link from "next/link";

export default function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-border-subtle bg-white/95 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-3 px-4">
        {/* Back button */}
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface active:bg-border-subtle"
          id="chat-back-btn"
          aria-label="Go back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="#202124"
            />
          </svg>
        </Link>

        {/* AI Avatar & Status */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-.17.02-.34.04-.51.05V17h-1v2.98c-.17-.01-.34-.03-.51-.05A8.015 8.015 0 0 1 4.07 13H7v-1H4.07A8.015 8.015 0 0 1 10.98 5.07V8h1V5.07c.17.01.34.03.51.05A8.015 8.015 0 0 1 19.93 12H17v1h2.93a8.015 8.015 0 0 1-6.93 6.93z"
                  fill="white"
                />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-success" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight text-text-primary">
              Financial Dost
            </span>
            <span className="text-[11px] leading-tight text-success">
              Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
