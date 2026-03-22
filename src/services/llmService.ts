export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  success: boolean;
  content: string;
  source: 'groq' | 'local';
  model?: string;
  usage?: any;
  error?: string;
  raw?: any;
}

import { LOCAL_SYSTEM_PROMPT } from '../systemPromptLocal';

export class LLMService {
  private consecutiveFailures: number = 0;
  private maxFailuresBeforeFallback: number = 2;

  async chat(
    messages: Message[],
    options: { useWebSearch?: boolean; forceLocal?: boolean } = {}
  ): Promise<ChatResponse> {
    const { useWebSearch = true, forceLocal = false } = options;

    if (forceLocal) {
      console.log('🔧 [LLM] Force using local LLM');
      return await this.callLocalLLM(messages, useWebSearch);
    }

    if (this.consecutiveFailures >= this.maxFailuresBeforeFallback) {
      console.log(`⚠️ [LLM] Switching to local LLM (${this.consecutiveFailures} failures)`);
      return await this.callLocalLLM(messages, useWebSearch);
    }

    try {
      const result = await this.callGroqAPI(messages, useWebSearch);
      this.consecutiveFailures = 0;
      return result;
    } catch (error: any) {
      console.error(`❌ [LLM] Groq failed: ${error.message}`);
      this.consecutiveFailures++;
      console.log('🔄 [LLM] Falling back to local LLM');
      return await this.callLocalLLM(messages, useWebSearch);
    }
  }

  private async callGroqAPI(messages: Message[], useWebSearch: boolean): Promise<ChatResponse> {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GROQ_BASE_URL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
    const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

    const requestBody: any = {
      model: GROQ_MODEL,
      messages,
      temperature: parseFloat(process.env.LLM_TEMPERATURE || '0.7'),
      max_tokens: parseInt(process.env.LLM_MAX_TOKENS || '4096'),
      top_p: parseFloat(process.env.LLM_TOP_P || '0.9'),
    };

    if (useWebSearch) {
      requestBody.tools = [{ type: 'browser_search' }];
      requestBody.tool_choice = 'auto';
    }

    console.log(`📤 [Groq] Calling ${GROQ_MODEL}...`);

    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    console.log(`✅ [Groq] Response received from ${GROQ_MODEL}`);

    return {
      success: true,
      content: data.choices[0].message.content,
      source: 'groq',
      model: GROQ_MODEL,
      usage: data.usage,
      raw: data // Keep original data if needed
    };
  }

  private async callLocalLLM(messages: Message[], useWebSearch: boolean = false): Promise<ChatResponse> {
    const LLM_BASE_URL = process.env.LLM_BASE_URL || 'http://127.0.0.1:1234/v1';
    const LLM_MODEL = process.env.LLM_MODEL || 'llama-3.2-3b-instruct';

    let processedMessages = [...messages];
    if (processedMessages.length > 0 && processedMessages[0].role === 'system') {
      processedMessages[0] = { ...processedMessages[0], content: LOCAL_SYSTEM_PROMPT };
    }
    if (processedMessages.length > 10) {
      processedMessages = [
        processedMessages[0],
        ...processedMessages.slice(-8),
      ];
    }

    console.log(`📤 [Local] Calling ${LLM_MODEL}...`);

    const requestBody: any = {
      model: LLM_MODEL,
      messages: processedMessages,
      temperature: parseFloat(process.env.LLM_TEMPERATURE || '0.6'),
      max_tokens: parseInt(process.env.LLM_MAX_TOKENS || '6000'),
      top_p: parseFloat(process.env.LLM_TOP_P || '0.85'),
      repeat_penalty: 1.1,
    };

    if (useWebSearch) {
      requestBody.tools = [{ type: 'browser_search' }];
      requestBody.tool_choice = 'auto';
    }

    const response = await fetch(`${LLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Local LLM error: ${response.status}`);
    }

    const data = await response.json();

    console.log(`✅ [Local] Response received from ${LLM_MODEL}`);

    return {
      success: true,
      content: data.choices[0].message.content,
      source: 'local',
      model: LLM_MODEL,
      raw: data
    };
  }

  // Reset fallback status
  resetFallbackStatus(): void {
    this.consecutiveFailures = 0;
    console.log('🔄 [LLM] Fallback status reset');
  }
}

export const llmService = new LLMService();
