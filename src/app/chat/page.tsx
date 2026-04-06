import type { Metadata } from "next";
import ChatInterface from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "Financial Dost — Chat",
  description:
    "Chat with your AI financial advisor. Get personalized savings advice, goal planning, and smart money tips.",
};

export default function ChatPage() {
  return <ChatInterface />;
}
