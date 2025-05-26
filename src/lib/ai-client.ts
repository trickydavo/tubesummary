import OpenAI from 'openai';
import { getAIConfig } from './ai-config';

interface SummaryResponse {
  title: string;
  summary: string;
  videoUrl: string;
  provider: string;
  modelUsed: string;
}

class AIClient {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY || '',
      defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'TubeSummary',
      },
    });
  }

  async summarize(transcript: string, videoUrl: string, requestedModel?: string): Promise<SummaryResponse> {
    const defaultConfig = getAIConfig();
    const modelToUse = requestedModel || defaultConfig.model;
    
    const providerName = modelToUse.split('/')[0] || 'unknown';

    const system_prompt = 'You are an expert content creator and technical writer for a tech and security news publication. Your task is to summarize YouTube video transcripts into a short, scannable, Markdown-formatted list of key takeaways.';
    const user_prompt = `Please analyze the following YouTube video transcript and generate a summary using Markdown, adhering to these specific requirements:

1.  **Overall Length:** The summary must be **very concise** and easily digestible at a glance. Focus on a limited number of impactful key points.
2.  **Primary Structure: Icon-Driven Bulleted List**
    *   The summary should primarily consist of a single, flat bulleted list.
    *   **Each bullet point MUST begin with an appropriate icon/emoji** that visually represents the topic of that point. This icon is crucial for scannability.
    *   After the icon, you can use bold text for a very brief sub-topic or product name, followed by the concise explanation.
    *   Example format:
        *   🧑‍💻 **Copilot Evolution:** Key updates include [brief detail 1] and [brief detail 2], transforming it into more of a teammate.
        *   🛡️ **New Security Protocol:** [Protocol Name] introduced to address [specific threat/vulnerability].
        *   ⚙️ **VS Code Enhancements:** Now supports [feature X] and improved [area Y].
        *   📈 **Performance Gains:** [Product/Service] shows [specific improvement] in [area Z].
3.  **Content Focus:**
    *   Each bullet point should convey a distinct and significant announcement, feature update, key topic, or critical insight relevant to tech and security leaders.
4.  **Markdown Formatting:**
    *   Use standard Markdown for the bulleted list (\`* \` or \`- \`).
    *   Use **bold text** for the sub-topic/product name immediately following the icon.
    *   **Strictly Avoid:**
        *   Multi-level headings (e.g., \`##\`, \`###\`).
        *   Blockquotes (\`>\`).
        *   Horizontal rules (\`---\`).
        *   Lengthy paragraphs. The entire output should feel like a list, not prose.
5.  **Optional TL;DR (Very Brief):**
    *   If, and only if, you feel a 2-3 point super-summary is absolutely necessary *in addition* to the main icon-driven list, you may add a section at the end:
        \`---\`
        \`🔥 **TL;DR**\`
        \`*   iconic_point_1\`
        \`*   iconic_point_2\`
    *   This TL;DR should also use leading icons for its points and be extremely short. Most summaries should NOT need this if the main list is concise enough.

**Key Goal:** A visually distinct, icon-enhanced, and very short list of the most important information, perfect for quick scanning and direct use in a news brief format.

---\nTranscript:\n${transcript}\n---`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: modelToUse,
        messages: [
          {
            role: 'system',
            content: system_prompt,
          },
          {
            role: 'user',
            content: user_prompt,
          },
        ],
        temperature: 0.6,
      });

      const summaryContent = completion.choices[0].message.content || 'No summary generated. The model may have returned an empty response or failed to follow instructions.';
      
      return {
        title: 'Key Takeaways',
        summary: summaryContent,
        videoUrl: videoUrl,
        provider: providerName,
        modelUsed: modelToUse,
      };
    } catch (error) {
      console.error(`Error calling OpenRouter with model ${modelToUse}:`, error);
      throw new Error(`Failed to generate Markdown summary via AI client using model ${modelToUse}.`);
    }
  }
}

export const aiClient = new AIClient(); 