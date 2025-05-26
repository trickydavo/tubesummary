'use client';
import { VideoSummarizer } from "@/components/VideoSummarizer";

export default function Home() {
  const handleSubmit = async (url: string, model: string) => {
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, model }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          YouTube Video Summarizer
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Generate concise summaries of YouTube videos for security and technology briefings
        </p>
        <VideoSummarizer onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
