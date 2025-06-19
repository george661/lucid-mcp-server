export interface AnalysisRequest {
  imageBase64: string;
  customPrompt?: string;
}

export interface AnalysisResult {
  success: boolean;
  analysis?: string;
  error?: string;
  metadata?: {
    provider: string;
    model: string;
    timestamp: string;
  };
}

export interface LLMClientConfig {
  endpoint?: string;
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface LLMProvider {
  name: string;
  isAvailable(): boolean;
  analyzeImage(request: AnalysisRequest): Promise<AnalysisResult>;
}
