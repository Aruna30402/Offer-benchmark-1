interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta?: {
      role?: string;
      content?: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class PerplexityAPI {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY || '';
    this.apiUrl = import.meta.env.VITE_PERPLEXITY_API_URL || 'https://api.perplexity.ai/chat/completions';
    
    if (!this.apiKey) {
      console.warn('Perplexity API key not found. Please set VITE_PERPLEXITY_API_KEY in your environment variables.');
    }
  }

  async sendMessage(messages: PerplexityMessage[], model: string = 'llama-3.1-sonar-small-128k-online'): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Perplexity API key is not configured');
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.9,
          return_citations: true,
          search_domain_filter: ["perplexity.ai"],
          return_images: false,
          return_related_questions: false,
          search_recency_filter: "month",
          top_k: 0,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 1
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Perplexity API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data: PerplexityResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from Perplexity API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Perplexity API:', error);
      throw error;
    }
  }

  async streamMessage(
    messages: PerplexityMessage[], 
    onChunk: (chunk: string) => void,
    model: string = 'llama-3.1-sonar-small-128k-online'
  ): Promise<void> {
    if (!this.apiKey) {
      throw new Error('Perplexity API key is not configured');
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.9,
          return_citations: true,
          search_domain_filter: ["perplexity.ai"],
          return_images: false,
          return_related_questions: false,
          search_recency_filter: "month",
          top_k: 0,
          stream: true,
          presence_penalty: 0,
          frequency_penalty: 1
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Perplexity API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                onChunk(content);
              }
            } catch (e) {
              // Ignore parsing errors for individual chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Error streaming from Perplexity API:', error);
      throw error;
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const perplexityAPI = new PerplexityAPI();
export type { PerplexityMessage };