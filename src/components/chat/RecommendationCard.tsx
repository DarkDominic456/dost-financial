"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface RecommendationData {
  goalName: string;
  targetAmount: string;
  monthlySavings: string;
  fundType: string;
  timeline: string;
  whyText: string;
  riskLevel: "Low" | "Medium" | "High";
}

interface RecommendationCardProps {
  data: RecommendationData;
}

function getRiskColor(risk: "Low" | "Medium" | "High") {
  switch (risk) {
    case "Low":
      return {
        bg: "bg-success-light",
        text: "text-success",
        dot: "bg-success",
      };
    case "Medium":
      return {
        bg: "bg-amber-50",
        text: "text-amber-600",
        dot: "bg-amber-500",
      };
    case "High":
      return { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" };
  }
}

export default function RecommendationCard({
  data,
}: RecommendationCardProps) {
  const riskStyle = getRiskColor(data.riskLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 28,
        mass: 0.9,
        delay: 0.15,
      }}
      className="mb-4 ml-9 overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
      id="recommendation-card"
    >
      {/* Header — Goal & Amount */}
      <div className="border-b border-border-subtle bg-gradient-to-r from-brand-light/60 to-brand-light/30 px-4 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M19.14 12.94a7.07 7.07 0 0 0 .06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.26.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"
                  fill="#1A73E8"
                />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold leading-tight text-text-primary">
                {data.goalName}
              </p>
              <p className="text-[11px] text-text-tertiary">
                AI-curated plan
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold leading-tight text-brand">
              {data.targetAmount}
            </p>
            <p className="text-[10px] text-text-tertiary">Target</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3.5">
        {/* Monthly savings row */}
        <div className="flex items-center justify-between rounded-xl bg-surface px-3.5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  fill="#1A73E8"
                />
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-text-primary">
                {data.monthlySavings}
              </p>
              <p className="text-[11px] text-text-secondary">
                {data.fundType}
              </p>
            </div>
          </div>
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${riskStyle.bg}`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${riskStyle.dot}`}
            />
            <span className={`text-[10px] font-medium ${riskStyle.text}`}>
              {data.riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-3 flex items-center gap-2 px-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
              fill="#9AA0A6"
            />
          </svg>
          <span className="text-[12px] text-text-secondary">
            Timeline: <span className="font-medium text-text-primary">{data.timeline}</span>
          </span>
        </div>

        {/* Explainable AI section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-3.5 rounded-xl border border-amber-200/60 bg-amber-50/50 px-3.5 py-3"
        >
          <div className="mb-1.5 flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"
                fill="#F59E0B"
              />
            </svg>
            <span className="text-[12px] font-semibold text-amber-700">
              Why this plan?
            </span>
          </div>
          <p className="text-[12px] leading-relaxed text-amber-800/80">
            {data.whyText}
          </p>
        </motion.div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="mt-4 h-11 w-full rounded-xl bg-brand text-[14px] font-semibold text-white shadow-[0_2px_8px_rgba(26,115,232,0.25)] transition-all duration-200 hover:bg-brand-dark hover:shadow-[0_4px_14px_rgba(26,115,232,0.35)] active:scale-[0.98]"
          id="recommendation-start-saving"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-1"
            aria-hidden="true"
          >
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              fill="currentColor"
            />
          </svg>
          Start Saving Now
        </Button>

        {/* Disclaimer */}
        <p className="mt-2.5 text-center text-[10px] leading-snug text-text-tertiary">
          Returns are estimated. Past performance doesn&apos;t guarantee future results.
        </p>
      </div>
    </motion.div>
  );
}
