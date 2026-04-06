import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col" id="landing-main">
        {/* Hero Section */}
        <section className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          {/* Illustration area */}
          <div className="mb-10 flex items-center justify-center">
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 animate-pulse rounded-full border border-brand/10" />
              <div className="absolute -inset-8 rounded-full border border-brand/5" />

              {/* Main illustration circle */}
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-brand-light">
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Savings jar / piggy bank style icon */}
                  <circle cx="36" cy="36" r="28" fill="#1A73E8" opacity="0.1" />
                  <path
                    d="M36 18C26.06 18 18 26.06 18 36s8.06 18 18 18 18-8.06 18-18S45.94 18 36 18z"
                    fill="#1A73E8"
                    opacity="0.15"
                  />
                  {/* Upward trend arrow */}
                  <path
                    d="M24 44l8-8 4 4 12-12"
                    stroke="#1A73E8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40 28h8v8"
                    stroke="#1A73E8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Coin stack */}
                  <ellipse cx="28" cy="48" rx="6" ry="2" fill="#1A73E8" opacity="0.2" />
                  <ellipse cx="28" cy="46" rx="6" ry="2" fill="#1A73E8" opacity="0.3" />
                  <ellipse cx="28" cy="44" rx="6" ry="2" fill="#1A73E8" opacity="0.4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-text-primary">
              Achieve your life goals
              <br />
              <span className="text-brand">with AI-guided savings</span>
            </h1>

            <p className="mb-8 max-w-[320px] text-[15px] leading-relaxed text-text-secondary">
              Your personal finance companion that helps you save smarter, plan better, and build wealth — one goal at a time.
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/chat" className="w-full max-w-[320px]">
            <Button
              size="lg"
              className="h-12 w-full rounded-xl bg-brand text-[15px] font-semibold text-white shadow-[0_2px_8px_rgba(26,115,232,0.3)] transition-all duration-200 hover:bg-brand-dark hover:shadow-[0_4px_16px_rgba(26,115,232,0.4)] active:scale-[0.98]"
              id="cta-start-saving"
            >
              Start Saving
            </Button>
          </Link>

          {/* Trust Indicators */}
          <div className="mt-6 flex items-center gap-1.5 text-xs text-text-tertiary">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
                fill="#0F9D58"
                opacity="0.8"
              />
              <path
                d="M10 15.17l-3.59-3.58L5 13l5 5 9-9-1.41-1.42L10 15.17z"
                fill="white"
              />
            </svg>
            <span>Bank-grade security • 100% free</span>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="border-t border-border-subtle bg-surface px-6 py-8" id="features-section">
          <div className="grid grid-cols-3 gap-4">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                    fill="#1A73E8"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-text-primary">Smart Save</span>
              <span className="mt-0.5 text-[10px] text-text-tertiary">AI-powered</span>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl bg-success-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
                    fill="#0F9D58"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-text-primary">Track Goals</span>
              <span className="mt-0.5 text-[10px] text-text-tertiary">Visual progress</span>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="#1A73E8"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-text-primary">AI Advice</span>
              <span className="mt-0.5 text-[10px] text-text-tertiary">Personalized</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
