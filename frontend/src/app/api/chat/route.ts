import { NextResponse } from "next/server";

import {
  createDigitalTwinPrompt,
  extractReplyContent,
  sanitizeMessages,
} from "@/lib/chat";
import {
  getOpenRouterApiKey,
  getOpenRouterModel,
  getOpenRouterModels,
} from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const apiKey = getOpenRouterApiKey();
  const model = getOpenRouterModel();
  const models = getOpenRouterModels();

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

  const requestBody = {
    ...(models.length > 0 ? { models } : { model }),
    temperature: 0.7,
    max_tokens: 450,
    messages: [
      {
        role: "system",
        content: createDigitalTwinPrompt(),
      },
      ...messages,
    ],
  };

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": request.headers.get("origin") ?? "http://localhost:3000",
      "X-Title": "Clyde Dumpa MVP",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const details = await response.text();
    let upstreamMessage = "OpenRouter request failed.";

    try {
      const parsed = JSON.parse(details) as {
        error?: {
          message?: string;
          metadata?: {
            raw?: string;
          };
        };
      };
      const rawDetail = parsed.error?.metadata?.raw?.trim();
      upstreamMessage = rawDetail || parsed.error?.message || upstreamMessage;
    } catch {
      if (details.trim()) {
        upstreamMessage = details.trim();
      }
    }

    return NextResponse.json(
      {
        error: upstreamMessage,
        details,
        model: models.length > 0 ? models.join(", ") : model,
      },
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
