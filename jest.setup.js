import '@testing-library/jest-dom';

// Mock environment variables
process.env = {
  ...process.env,
  AI_PROVIDER: 'openai',
  AI_MODEL: 'gpt-4-turbo',
  OPENAI_API_KEY: 'test-api-key',
}; 