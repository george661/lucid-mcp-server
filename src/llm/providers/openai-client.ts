import { BaseLLMClient } from './base-llm-client.js';
import { AnalysisRequest, AnalysisResult, LLMClientConfig } from '../types.js';
import { BASE_PROMPTS } from '../prompts/base-prompts.js';
import { log } from '../../utils/logger.js';
import { OpenAI } from 'openai';
import { AzureOpenAI } from 'openai';

export interface OpenAICompatibleClient {
  chat: {
    completions: {
      create: (args: any) => Promise<any>;
    };
  };
}

export class ParametrizedOpenAIClient extends BaseLLMClient {
  public readonly name: string;
  private client: OpenAICompatibleClient | null = null;
  protected config: LLMClientConfig;
  private displayName: string;

  constructor(
    name: string,
    config: LLMClientConfig,
    clientInstance?: OpenAICompatibleClient
  ) {
    super();
    this.name = name;
    this.config = config;
    this.client = clientInstance || null;
    // Always normalize name for error messages (e.g. 'OpenAI', 'AzureOpenAI')
    this.displayName =
      name === 'openai' ? 'OpenAI' :
      name === 'azure-openai' ? 'Azure OpenAI' :
      name.charAt(0).toUpperCase() + name.slice(1);
  }

  isAvailable(): boolean {
    return !!this.client && !!this.config.apiKey;
  }

  async analyzeImage(request: AnalysisRequest): Promise<AnalysisResult> {
    if (!this.isAvailable()) {
      return this.createErrorResult(`${this.displayName} client not initialized. Check configuration.`);
    }
    if (!this.validateImageBase64(request.imageBase64)) {
      return this.createErrorResult('Invalid image data provided.');
    }
    try {
      const prompt = this.buildPrompt(request);
      const response = await this.client!.chat.completions.create({
        model: this.config.model!,
        messages: [
          { role: 'system', content: BASE_PROMPTS.SYSTEM_MESSAGE },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: `data:image/png;base64,${request.imageBase64}`, detail: 'high' } }
            ]
          }
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature
      });
      const analysis = response.choices[0]?.message?.content;
      if (!analysis) {
        return this.createErrorResult(`No analysis received from ${this.displayName}.`);
      }
      return this.createSuccessResult(analysis, this.config.model!);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      log.error(`${this.displayName} analysis error:`, errorMessage);
      return this.createErrorResult(`${this.displayName} error: ${errorMessage}`);
    }
  }
}

// Factory for OpenAI
/**
 * Create an OpenAI client for image analysis.
 * @param config Optional overrides for API key, model, etc.
 * @returns ParametrizedOpenAIClient for OpenAI.
 */
export function createOpenAIClient(config?: Partial<LLMClientConfig>) {
  const baseConfig: LLMClientConfig = {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    maxTokens: 4000,
    temperature: 0.1,
    ...config
  };
  const client = new OpenAI({
    apiKey: baseConfig.apiKey,
    timeout: parseInt(process.env.LLM_TIMEOUT || '120000'),
    maxRetries: 2
  });
  return new ParametrizedOpenAIClient('openai', baseConfig, client);
}

/**
 * Create an Azure OpenAI client for image analysis.
 * Requires endpoint to include 'openai.azure.com'.
 * @param config Optional overrides for endpoint, API key, model, etc.
 * @returns ParametrizedOpenAIClient for Azure OpenAI, or unavailable client if config is incomplete.
 */
export function createAzureOpenAIClient(config?: Partial<LLMClientConfig>) {
  const baseConfig: LLMClientConfig = {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
    apiKey: process.env.AZURE_OPENAI_API_KEY || '',
    model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o',
    maxTokens: 4000,
    temperature: 0.1,
    ...config
  };
  // Only construct the client if all required credentials are present and valid
  if (
    baseConfig.endpoint &&
    baseConfig.apiKey &&
    baseConfig.endpoint.includes('openai.azure.com')
  ) {
    const client = new AzureOpenAI({
      endpoint: baseConfig.endpoint,
      apiKey: baseConfig.apiKey,
      apiVersion: process.env.OPENAI_API_VERSION || '2025-01-01-preview',
      timeout: parseInt(process.env.LLM_TIMEOUT || '120000'),
      maxRetries: 2
    });
    return new ParametrizedOpenAIClient('azure-openai', baseConfig, client);
  }
  // Return a client with isAvailable() === false and no SDK instance
  return new ParametrizedOpenAIClient('azure-openai', baseConfig);
}
