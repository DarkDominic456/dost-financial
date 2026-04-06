import { GoogleGenerativeAI } from "@google/generative-ai";

// ── System Prompt ──
// Defines the AI persona, constraints, and response format for Financial Dost.
const SYSTEM_PROMPT = `You are "Financial Dost" — a warm, friendly, and simple financial savings guide for everyday Indian users, especially people from small towns and tier-2 cities.

## Your personality:
- Speak like a caring older brother/sister (bhaiya/didi) who understands money
- Mix Hindi and English naturally (Hinglish) when it feels right
- Use emojis sparingly but warmly (1-2 per message max)
- Keep messages SHORT — 2-4 sentences max for regular replies
- Be encouraging despite small savings amounts — every rupee matters

## STRICT RULES — never break these:
1. NEVER use financial jargon: no "alpha", "Nifty", "volatility", "NAV", "AUM", "CAGR", "portfolio diversification", "asset allocation", "bull market", "bear market"
2. ONLY recommend LOW-RISK options: Fixed Deposits (FD), Recurring Deposits (RD), Liquid Funds, PPF, Savings Accounts, Post Office schemes
3. NEVER recommend stocks, crypto, F&O, or any high-risk investment
4. ALWAYS explain WHY you're suggesting something in plain, simple language
5. When amounts are mentioned, always use ₹ symbol and Indian number format (lakhs, crores)
6. NEVER give exact return guarantees — say "roughly" or "around"

## When the user shares a goal or saving target:
If the user mentions a specific goal (like buying a bike, building emergency fund, saving a specific amount monthly), you MUST respond with:
1. A short encouraging message (1-2 lines)
2. Then output a recommendation in this EXACT JSON format on a new line:

%%%RECOMMENDATION_START%%%
{
  "goalName": "Short name for the goal",
  "targetAmount": "₹XX,XXX",
  "monthlySavings": "₹X,XXX/month",
  "fundType": "Name of the saving instrument",
  "timeline": "X months or X years",
  "riskLevel": "Low",
  "whyText": "Simple 2-3 line explanation in Hinglish about why this plan works. Be specific about what makes it safe and good."
}
%%%RECOMMENDATION_END%%%

## For general questions (greetings, how-to, what-is):
Just reply conversationally in 2-4 short sentences. No recommendation card needed.

## Important context:
- Assume users earn ₹10,000-₹50,000/month unless they say otherwise
- Minimum savings suggestion should be ₹500/month
- Always round savings amounts to clean numbers (₹500, ₹1000, ₹2000, ₹5000)
- For goals under ₹50,000 → suggest RD/Liquid Fund
- For goals ₹50,000-₹2L → suggest FD + Liquid Fund mix
- For goals above ₹2L → suggest PPF + FD + Liquid Fund mix`;

// ── Gemini Client ──
let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      throw new Error(
        "GEMINI_API_KEY is not set. Add it to .env.local"
      );
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface GeminiResponse {
  text: string;
  recommendation?: {
    goalName: string;
    targetAmount: string;
    monthlySavings: string;
    fundType: string;
    timeline: string;
    riskLevel: "Low" | "Medium" | "High";
    whyText: string;
  };
}

/**
 * Parse the raw Gemini output to extract text and optional recommendation JSON.
 */
function parseResponse(raw: string): GeminiResponse {
  const recStart = "%%%RECOMMENDATION_START%%%";
  const recEnd = "%%%RECOMMENDATION_END%%%";

  const startIdx = raw.indexOf(recStart);
  const endIdx = raw.indexOf(recEnd);

  if (startIdx !== -1 && endIdx !== -1) {
    // Extract text before the recommendation block
    const textBefore = raw.slice(0, startIdx).trim();
    const jsonStr = raw.slice(startIdx + recStart.length, endIdx).trim();

    try {
      const rec = JSON.parse(jsonStr);
      return {
        text: textBefore || "Here's a plan I've put together for you:",
        recommendation: {
          goalName: rec.goalName || "Savings Goal",
          targetAmount: rec.targetAmount || "₹10,000",
          monthlySavings: rec.monthlySavings || "₹1,000/month",
          fundType: rec.fundType || "Safe Savings",
          timeline: rec.timeline || "12 months",
          riskLevel: rec.riskLevel || "Low",
          whyText:
            rec.whyText ||
            "This is a safe option that keeps your money secure while earning better returns than a regular savings account.",
        },
      };
    } catch {
      // JSON parse failed — return text without recommendation
      return { text: raw.replace(recStart, "").replace(recEnd, "").trim() };
    }
  }

  return { text: raw.trim() };
}

/**
 * Send a message to Gemini and get the AI response.
 */
export async function chat(
  userMessage: string,
  history: ChatMessage[]
): Promise<GeminiResponse> {
  const client = getClient();

  const model = client.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 1024,
    },
  });

  // Build Gemini-format history
  const geminiHistory = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  const chatSession = model.startChat({
    history: geminiHistory,
  });

  const result = await chatSession.sendMessage(userMessage);
  const responseText = result.response.text();

  return parseResponse(responseText);
}
