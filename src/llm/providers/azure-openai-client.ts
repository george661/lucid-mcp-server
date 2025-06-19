import { AzureOpenAI } from 'openai';
import { BaseLLMClient } from './base-llm-client.js';
import { AnalysisRequest, AnalysisResult, LLMClientConfig } from '../types.js';
import { BASE_PROMPTS } from '../prompts/base-prompts.js';
import { log } from '../../utils/logger.js';

export class AzureOpenAIClient extends BaseLLMClient {
  public readonly name = 'azure-openai';
  private client: AzureOpenAI | null = null;
  protected config: LLMClientConfig;

  constructor() {
    super();
    
    this.config = {
      endpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
      apiKey: process.env.AZURE_OPENAI_API_KEY || '',
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o',
      maxTokens: 4000, // Increased for detailed analysis
      temperature: 0.1
    };
    if (this.isAvailable()) {
      const timeout = parseInt(process.env.LLM_TIMEOUT || '120000');
      this.client = new AzureOpenAI({
        endpoint: this.config.endpoint,
        apiKey: this.config.apiKey,
        apiVersion: process.env.OPENAI_API_VERSION || '2025-01-01-preview',
        timeout: timeout, // Configurable timeout
        maxRetries: 2
      });
    }
  }

  isAvailable(): boolean {
    return !!(
      this.config.endpoint && 
      this.config.apiKey && 
      this.config.endpoint.includes('openai.azure.com')
    );
  }

  async analyzeImage(request: AnalysisRequest): Promise<AnalysisResult> {
    if (!this.client) {
      return this.createErrorResult('Azure OpenAI client not initialized. Check configuration.');
    }

    if (!this.validateImageBase64(request.imageBase64)) {
      return this.createErrorResult('Invalid image data provided.');
    }

    try {
      const prompt = this.buildPrompt(request);
        const response = await this.client.chat.completions.create({
        model: this.config.model!,
        messages: [
          {
            role: 'system',
            content: BASE_PROMPTS.SYSTEM_MESSAGE
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/png;base64,${request.imageBase64}`,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature
      });

      const analysis = response.choices[0]?.message?.content;
      if (!analysis) {
        return this.createErrorResult('No analysis received from Azure OpenAI.');
      }

      return this.createSuccessResult(analysis, this.config.model!);    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      log.error('Azure OpenAI analysis error:', errorMessage);
      
      return this.createErrorResult(`Azure OpenAI error: ${errorMessage}`);
    }
  }  private buildPrompt(request: AnalysisRequest): string {
    if (request.customPrompt) {
      return request.customPrompt;
    }

    return BASE_PROMPTS.LUCID_DIAGRAM_ANALYSIS;
  }

  getConfig(): LLMClientConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<LLMClientConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Reinitialize client if endpoint or apiKey changed
    if (newConfig.endpoint || newConfig.apiKey) {
      if (this.isAvailable()) {
        this.client = new AzureOpenAI({
          endpoint: this.config.endpoint,
          apiKey: this.config.apiKey,
          apiVersion: process.env.OPENAI_API_VERSION || '2024-02-15-preview'
        });
      } else {
        this.client = null;
      }
    }
  }
}
