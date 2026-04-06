import { NextRequest } from "next/server";
import { chat, type ChatMessage } from "@/lib/gemini";

export const runtime = "nodejs";

interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    if (!body.message || typeof body.message !== "string") {
      return Response.json(
        { error: "Message is required and must be a string." },
        { status: 400 }
      );
    }

    const history = body.history ?? [];
    const response = await chat(body.message, history);

    return Response.json(response);
  } catch (error: unknown) {
    console.error("[/api/chat] Error:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    // If API key isn't configured, tell the user
    if (message.includes("GEMINI_API_KEY")) {
      return Response.json(
        {
          error: message,
          text: "⚠️ API key not configured. Please add your GEMINI_API_KEY to .env.local and restart the server.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        error: "Failed to get AI response.",
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment! 🙏",
      },
      { status: 500 }
    );
  }
}
