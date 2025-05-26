import { aiClient } from '../ai-client';

// Mock fetch globally
global.fetch = jest.fn();

describe('AIClient', () => {
  beforeEach(() => {
    // Clear mock before each test
    (global.fetch as jest.Mock).mockClear();
  });

  it('should call OpenAI API and return summary', async () => {
    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: 'Test summary',
            },
          },
        ],
      }),
    });

    const result = await aiClient.summarize('Test transcript');

    expect(result).toEqual({
      title: 'AI-Generated Summary',
      summary: 'Test summary',
    });
  });

  it('should handle API errors gracefully', async () => {
    // Mock failed API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(aiClient.summarize('Test transcript')).rejects.toThrow();
  });
}); 