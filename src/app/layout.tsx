import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dost — AI-Guided Savings",
  description:
    "Achieve your life goals with AI-guided savings. Dost helps you save smarter, plan better, and build wealth — one goal at a time.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dost",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    title: "Dost — AI-Guided Savings",
    description:
      "Achieve your life goals with AI-guided savings. Save smarter, plan better, build wealth.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1A73E8",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        {/* Mobile-first container: max-480px, centered on desktop */}
        <div className="mx-auto w-full max-w-[480px] min-h-dvh flex flex-col bg-white shadow-[0_0_0_1px_#e8eaed] sm:shadow-[0_0_40px_rgba(0,0,0,0.06)]">
          {children}
        </div>
      </body>
    </html>
  );
}
