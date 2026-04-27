import { existsSync } from "node:fs";
import { join } from "node:path";

import { config } from "dotenv";

const DEFAULT_OPENROUTER_MODEL = "openai/gpt-oss-120b:free";

let envLoaded = false;

function loadServerEnv() {
  if (envLoaded) {
    return;
  }

  const candidates = [
    join(/* turbopackIgnore: true */ process.cwd(), ".env.local"),
    join(/* turbopackIgnore: true */ process.cwd(), ".env"),
    join(/* turbopackIgnore: true */ process.cwd(), "..", ".env"),
  ];

  for (const path of candidates) {
    if (existsSync(path)) {
      config({ path, override: false });
    }
  }

  envLoaded = true;
}

export function getOpenRouterApiKey() {
  loadServerEnv();
  return process.env.OPENROUTER_API_KEY?.trim() ?? "";
}

export function getOpenRouterModel() {
  loadServerEnv();
  return process.env.OPENROUTER_MODEL?.trim() || DEFAULT_OPENROUTER_MODEL;
}

export function getOpenRouterModels() {
  loadServerEnv();

  const models = (process.env.OPENROUTER_MODELS ?? "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);

  return models;
}
