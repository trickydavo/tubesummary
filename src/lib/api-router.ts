import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';
import { AIProvider } from './ai-config';

export interface SummaryRequest {
  url: string;
  provider?: string;
  model?: string;
}

export interface SummaryResponse {
  title: string;
  summary: string;
  transcriptPreview?: string;
  provider: string;
  model: string;
}

export const router = new OpenAPIRouter({
  schema: {
    info: {
      title: 'TubeSummary API',
      version: '1.0.0',
    },
  },
});

// Define routes
router.post('/api/summarize', {
  tags: ['Summary'],
  summary: 'Generate video summary',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'YouTube video URL' },
            provider: { type: 'string', description: 'AI provider (openai, anthropic, groq)' },
            model: { type: 'string', description: 'AI model name' },
          },
          required: ['url'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Summary generated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              summary: { type: 'string' },
              transcriptPreview: { type: 'string' },
              provider: { type: 'string' },
              model: { type: 'string' },
            },
          },
        },
      },
    },
    '400': {
      description: 'Invalid request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
  },
}); 