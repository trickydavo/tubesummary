# TubeSummary: AI-Powered YouTube Video Summarizer

TubeSummary is a simple project designed to quickly generate concise summaries of YouTube videos, perfect for including in internal tech newsletters or briefings. It leverages AI models via OpenRouter.ai to fetch video transcripts and produce summaries based on a user-selected model.

## Features

*   **YouTube Video Summarization:** Paste a YouTube video URL to get its summary.
*   **AI Model Selection:** Choose from a curated list of AI models available through OpenRouter.ai.
*   **Customizable Prompts:** The summarization prompt can be easily adjusted to tailor the output format (currently configured for concise, icon-driven bullet points).
*   **Markdown Output:** Summaries are provided in Markdown for easy copying and pasting into newsletters or other documents.
*   **Next.js & Tailwind CSS:** Built with a modern tech stack for a clean user interface.

## Purpose

This project was created to streamline the process of extracting key information from YouTube videos for an internal tech newsletter, saving time and effort in content creation.

## Getting Started

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn

### Environment Variables

Create a `.env.local` file in the root of the project and add the following variables. **An OpenRouter API key is required for the application to function.**

```
# Required: Your API key from OpenRouter.ai
# Sign up at https://openrouter.ai to get your key.
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Recommended: Your application's public URL (used for HTTP Referer header with OpenRouter)
# This helps OpenRouter with tracking and can be used for benefits like rate limit increases.
# For local development, http://localhost:3000 is fine.
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Set a default AI model. 
# This must match an ID from the AVAILABLE_MODELS list in src/lib/ai-config.ts
# Example: AI_MODEL=openai/gpt-4o-mini 
```

Replace `your_openrouter_api_key_here` with your actual OpenRouter API key.

### Installation & Running Locally

1.  Clone the repository (if you haven\'t already):
    ```bash
    git clone <your-repo-url>
    cd <repo-name>
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

This is a personal project, but suggestions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [YouTube Transcript API](https://github.com/jdepoix/youtube-transcript-api)
- [OpenRouter.ai](https://openrouter.ai/) for AI model access.
