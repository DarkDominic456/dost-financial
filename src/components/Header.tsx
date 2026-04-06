import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-white/95 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-5">
        {/* App Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5" id="header-logo">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-.17.02-.34.04-.51.05V17h-1v2.98c-.17-.01-.34-.03-.51-.05A8.015 8.015 0 0 1 4.07 13H7v-1H4.07A8.015 8.015 0 0 1 10.98 5.07V8h1V5.07c.17.01.34.03.51.05A8.015 8.015 0 0 1 19.93 12H17v1h2.93a8.015 8.015 0 0 1-6.93 6.93z"
                fill="white"
              />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">
            Dost
          </span>
        </Link>

        {/* Minimal right-side indicator — future use for profile/notifications */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light"
            id="header-profile-placeholder"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Profile"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#1A73E8"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
