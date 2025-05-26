export interface AIProvider {
  name: string;
  models: string[];
}

export const AI_PROVIDERS: Record<string, AIProvider> = {
  openai: {
    name: 'OpenAI',
    models: ['openai/gpt-4', 'openai/gpt-3.5-turbo', 'openai/gpt-4o-mini', 'openai/gpt-4.1'],
  },
  anthropic: {
    name: 'Anthropic',
    models: ['anthropic/claude-3-opus', 'anthropic/claude-3.7-sonnet', 'anthropic/claude-sonnet-4'],
  },
  google: {
    name: 'Google',
    models: ['google/gemini-pro', 'google/palm-2', 'google/gemini-2.0-flash-001', 'google/gemini-2.5-pro-preview', 'google/gemini-2.5-flash-preview'],
  },
  deepseek: {
    name: 'DeepSeek',
    models: ['deepseek/deepseek-chat-v3-0324:free'],
  },
};

export interface SelectableModel {
  id: string;
  name: string;
}

export const AVAILABLE_MODELS: SelectableModel[] = [
  { id: "openai/gpt-4o-mini", name: "openai/gpt-4o-mini" },
  { id: "anthropic/claude-3.7-sonnet", name: "anthropic/claude-3.7-sonnet" },
  { id: "google/gemini-2.0-flash-001", name: "google/gemini-2.0-flash-001" },
  { id: "google/gemini-2.5-pro-preview", name: "google/gemini-2.5-pro-preview" },
  { id: "google/gemini-2.5-flash-preview", name: "google/gemini-2.5-flash-preview" },
  { id: "deepseek/deepseek-chat-v3-0324:free", name: "deepseek/deepseek-chat-v3-0324:free" },
  { id: "anthropic/claude-sonnet-4", name: "anthropic/claude-sonnet-4" },
  { id: "openai/gpt-4.1", name: "openai/gpt-4.1" },
];

export const DEFAULT_PROMPT = `
You are a skilled technical writer for a security and technology newsletter.
Summarize the following YouTube video transcript in two short paragraphs.
Use plain English. Include what the video is about, why it matters, and actions users or businesses should consider.

Transcript:
---
{{transcript}}
---
`;

export const getAIConfig = () => {
  const defaultModelId = process.env.AI_MODEL || (AVAILABLE_MODELS.length > 0 ? AVAILABLE_MODELS[0].id : 'openai/gpt-4o-mini');
  
  const providerName = defaultModelId.split('/')[0] || 'unknown';
  const providerData = AI_PROVIDERS[providerName] || { name: providerName, models: [defaultModelId] };

  return {
    provider: providerData,
    model: defaultModelId,
  };
}; 