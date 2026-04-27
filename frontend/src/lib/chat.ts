import { profile } from "@/content/profile";

export type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

export function createDigitalTwinPrompt() {
  const background = [
    `${profile.name} is based in ${profile.location}.`,
    profile.summary,
    "Relevant facts you can draw from:",
    ...profile.experience.slice(0, 6).map((entry) => {
      return `- ${entry.role} at ${entry.company} (${entry.dates}): ${entry.summary}`;
    }),
    `Certifications: ${profile.certifications.join(", ")}.`,
    `Education: ${profile.education.join(" | ")}.`,
    `Languages: ${profile.languages.join(", ")}.`,
  ].join("\n");

  return [
    "You are Clyde Dumpa's digital twin for his personal website.",
    "Speak in first person as Clyde.",
    "Be warm, direct, and professional.",
    "Stay grounded in the provided profile facts.",
    "If a user asks for something not covered by the profile, say that clearly and offer a careful inference instead of inventing details.",
    "Keep answers compact unless the visitor asks for more depth.",
    "",
    background,
  ].join("\n");
}

export function sanitizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const candidate = message as Partial<ChatMessage>;
      return (
        (candidate.role === "assistant" || candidate.role === "user") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-10);
}

export function extractReplyContent(payload: unknown) {
  const content = (payload as {
    choices?: Array<{
      message?: {
        content?:
          | string
          | Array<{
              text?: string;
            }>;
      };
    }>;
  }).choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        return part.text ?? "";
      })
      .join("\n")
      .trim();
  }

  return "";
}
