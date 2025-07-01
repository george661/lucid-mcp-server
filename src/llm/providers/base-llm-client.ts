import { AnalysisRequest, AnalysisResult, LLMProvider } from '../types.js';
import { BASE_PROMPTS } from '../prompts/base-prompts.js';

export abstract class BaseLLMClient implements LLMProvider {
  public abstract readonly name: string;
  protected abstract config: any;

  abstract isAvailable(): boolean;
  abstract analyzeImage(request: AnalysisRequest): Promise<AnalysisResult>;
  protected createErrorResult(error: string): AnalysisResult {
    return {
      success: false,
      error,
      metadata: {
        provider: this.name,
        model: 'unknown',
        timestamp: new Date().toISOString()
      }
    };
  }

  protected createSuccessResult(
    analysis: string, 
    model: string
  ): AnalysisResult {
    return {
      success: true,
      analysis,
      metadata: {
        provider: this.name,
        model,
        timestamp: new Date().toISOString()
      }
    };
  }

  protected validateImageBase64(imageBase64: string): boolean {
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return false;
    }
    
    // Basic validation for base64 string
    try {
      return imageBase64.length > 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(imageBase64);
    } catch {
      return false;
    }
  }

  protected buildPrompt(request: AnalysisRequest): string {
    if (request.customPrompt) {
      return request.customPrompt;
    }
    return BASE_PROMPTS.LUCID_DIAGRAM_ANALYSIS;
  }

  getConfig(): any {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<any>): void {
    this.config = { ...this.config, ...newConfig };
    this.reinitializeClient(newConfig);
  }

  // Subclasses can override this if they need to reinit client
  protected reinitializeClient(_newConfig: Partial<any>): void {}
}