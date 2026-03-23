import { NextResponse } from "next/server";

import {
  createDigitalTwinPrompt,
  extractReplyContent,
  OPENROUTER_MODEL,
  sanitizeMessages,
} from "@/lib/chat";
import { getOpenRouterApiKey } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const apiKey = getOpenRouterApiKey();

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { messages?: unknown };
  const messages = sanitizeMessages(body.messages);

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "At least one valid user message is required." },
      { status: 400 },
    );
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": request.headers.get("origin") ?? "http://localhost:3000",
      "X-Title": "Clyde Dumpa MVP",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      temperature: 0.7,
      max_tokens: 450,
      messages: [
        {
          role: "system",
          content: createDigitalTwinPrompt(),
        },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json(
      { error: "OpenRouter request failed.", details },
      { status: response.status },
    );
  }

  const payload = await response.json();
  const reply = extractReplyContent(payload);

  if (!reply) {
    return NextResponse.json(
      { error: "The model returned an empty response." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply });
}
