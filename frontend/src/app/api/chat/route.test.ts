import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/env", () => ({
  getOpenRouterApiKey: vi.fn(),
  getOpenRouterModel: vi.fn(),
  getOpenRouterModels: vi.fn(),
}));

import { POST } from "./route";
import {
  getOpenRouterApiKey,
  getOpenRouterModel,
  getOpenRouterModels,
} from "@/lib/env";

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.mocked(getOpenRouterApiKey).mockReturnValue("test-openrouter-key");
    vi.mocked(getOpenRouterModel).mockReturnValue("openai/gpt-oss-120b:free");
    vi.mocked(getOpenRouterModels).mockReturnValue([]);
  });

  it("returns the OpenRouter reply", async () => {
    const fetchMock = vi.fn(async () => {
      return {
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: "I focus on calm, structured troubleshooting in live environments.",
              },
            },
          ],
        }),
      };
    });

    vi.stubGlobal("fetch", fetchMock);

    const request = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "What kind of work fits Clyde best?" }],
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as { reply?: string };

    expect(response.status).toBe(200);
    expect(payload.reply).toContain("structured troubleshooting");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://openrouter.ai/api/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-openrouter-key",
        }),
      }),
    );
  });

  it("returns an error when OPENROUTER_API_KEY is missing", async () => {
    vi.mocked(getOpenRouterApiKey).mockReturnValue("");

    const request = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello?" }],
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as { error?: string };

    expect(response.status).toBe(500);
    expect(payload.error).toBe("OPENROUTER_API_KEY is not configured.");
  });
});
