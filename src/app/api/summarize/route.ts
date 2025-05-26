import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
import { aiClient } from '@/lib/ai-client';

// Helper to extract video ID from YouTube URL
function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function POST(request: Request) {
  try {
    const { url, model } = await request.json();
    const videoId = extractVideoId(url);

    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Get transcript
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    if (!transcriptItems || transcriptItems.length === 0) {
      return NextResponse.json(
        { error: 'Could not fetch transcript or transcript is empty' },
        { status: 404 } 
      );
    }
    const fullTranscript = transcriptItems.map(item => item.text).join(' ');
    
    // Pass transcript, video URL, and the model selected on the frontend
    const summaryData = await aiClient.summarize(fullTranscript, url, model);

    return NextResponse.json({
      ...summaryData,
      transcriptPreview: fullTranscript.slice(0, 200) + '...',
    });
  } catch (error) {
    console.error('Error processing video:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process video';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 