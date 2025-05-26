# TubeSummary - AI-Powered YouTube Video Summarizer

A modern React application that generates concise summaries of YouTube videos using AI, specifically tailored for security and technology briefings.

## Features

- Extract transcripts from YouTube videos
- Generate AI-powered summaries optimized for business briefings
- Clean, accessible UI using ShadCN UI components
- Support for multiple AI providers (OpenAI, Claude, Groq)
- Copy-to-clipboard functionality
- Responsive design with dark mode support

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- ShadCN UI
- YouTube Transcript API

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tubesummary.git
   cd tubesummary
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your AI provider API keys to the `.env` file.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `GROQ_API_KEY`: Your Groq API key
- `AI_PROVIDER`: Selected AI provider (openai, anthropic, or groq)
- `AI_MODEL`: Selected AI model (e.g., gpt-4-turbo, claude-3-opus)

## API Routes

- `POST /api/summarize`: Accepts a YouTube URL, extracts the transcript, and returns an AI-generated summary

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [YouTube Transcript API](https://github.com/jdepoix/youtube-transcript-api)
