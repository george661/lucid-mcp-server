import { AnalysisRequest, AnalysisResult, LLMProvider } from './types.js';
import { createAzureOpenAIClient, createOpenAIClient } from './providers/openai-client.js';
import { log } from '../utils/logger.js';

export class ImageAnalyzer {
  private providers: LLMProvider[] = [];
  private primaryProvider: LLMProvider | null = null;
  private fallbackProvider: LLMProvider | null = null;

  constructor() {
    this.initializeProviders();
  }
  private initializeProviders(): void {
    const preferredProvider = process.env.LLM_PROVIDER || 'azure-openai';
    // Initialize available providers
    const azureClient = createAzureOpenAIClient();
    const openAIClient = createOpenAIClient();

    // Add available providers
    if (azureClient.isAvailable()) {
      this.providers.push(azureClient);
    }
    if (openAIClient.isAvailable()) {
      this.providers.push(openAIClient);
    }

    // Set primary provider based on preference and availability
    if (preferredProvider === 'azure-openai' && azureClient.isAvailable()) {
      this.primaryProvider = azureClient;
      this.fallbackProvider = null;
    } else if (preferredProvider === 'openai' && openAIClient.isAvailable()) {
      this.primaryProvider = openAIClient;
      this.fallbackProvider = null;
    } else {
      // Auto-select the first available provider
      this.primaryProvider = this.providers[0] || null;
      this.fallbackProvider = null;
    }
    log.debug('ImageAnalyzer initialized:');
    log.debug(`- Primary provider: ${this.primaryProvider?.name || 'none'}`);
    log.debug(`- Total providers available: ${this.providers.length}`);
  }

  async analyze(request: AnalysisRequest): Promise<AnalysisResult> {
    if (this.providers.length === 0) {
      return {
        success: false,
        error: 'No LLM providers available. Please check your configuration.',        metadata: {
          provider: 'none',
          model: 'none',
          timestamp: new Date().toISOString()
        }
      };
    }

    // Validate request
    if (!request.imageBase64) {
      return {
        success: false,
        error: 'No image data provided.',        metadata: {
          provider: 'validation',
          model: 'none',
          timestamp: new Date().toISOString()
        }
      };
    }    // Try primary provider first
    if (this.primaryProvider) {
      try {
        log.debug(`Attempting analysis with primary provider: ${this.primaryProvider.name}`);
        const result = await this.primaryProvider.analyzeImage(request);
        
        if (result.success) {
          log.debug(`Analysis successful with primary provider: ${this.primaryProvider.name}`);
          return result;
        } else {
          log.debug(`Primary provider failed: ${result.error}`);
        }
      } catch (error) {
        log.error(`Primary provider error:`, error);
      }
    }

    // Try fallback provider
    if (this.fallbackProvider) {
      try {
        log.debug(`Attempting analysis with fallback provider: ${this.fallbackProvider.name}`);
        const result = await this.fallbackProvider.analyzeImage(request);
        
        if (result.success) {
          log.debug(`Analysis successful with fallback provider: ${this.fallbackProvider.name}`);
          return result;
        } else {
          log.debug(`Fallback provider failed: ${result.error}`);
        }
      } catch (error) {
        log.error(`Fallback provider error:`, error);
      }
    }

    // If all providers failed, return error
    return {
      success: false,      error: 'All LLM providers failed to analyze the image. Please try again later.',
      metadata: {
        provider: 'all-failed',
        model: 'none',
        timestamp: new Date().toISOString()
      }
    };
  }

  getAvailableProviders(): string[] {
    return this.providers.map(provider => provider.name);
  }

  getCurrentProviderStatus(): { primary: string | null; fallback: string | null; available: string[] } {
    return {
      primary: this.primaryProvider?.name || null,
      fallback: this.fallbackProvider?.name || null,
      available: this.getAvailableProviders()
    };
  }

  // Method to test provider connectivity
  async testProviders(): Promise<{ [providerName: string]: boolean }> {
    const results: { [providerName: string]: boolean } = {};
    
    // Simple test image (1x1 white pixel in base64)
    const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
      const testRequest: AnalysisRequest = {
      imageBase64: testImageBase64,
      customPrompt: 'This is a test. Please respond with just "Test successful."'
    };

    for (const provider of this.providers) {
      try {
        const result = await provider.analyzeImage(testRequest);
        results[provider.name] = result.success;
      } catch (error) {
        results[provider.name] = false;
      }
    }

    return results;
  }
}
