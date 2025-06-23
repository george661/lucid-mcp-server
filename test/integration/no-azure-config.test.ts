import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageAnalyzer } from '../../src/llm/image-analyzer.js';
import { AnalysisRequest } from '../../src/llm/types.js';
import { mockImageBase64 } from '../fixtures/data.js';

describe('Integration: No Azure OpenAI Configuration', () => {
  beforeEach(() => {
    // Clear all Azure OpenAI related environment variables
    vi.unstubAllEnvs();
    vi.stubEnv('LUCID_API_KEY', 'test-lucid-key');
    
    // Ensure Azure OpenAI variables are not set
    delete process.env.AZURE_OPENAI_API_KEY;
    delete process.env.AZURE_OPENAI_ENDPOINT;
    delete process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should report no LLM providers available when Azure OpenAI is not configured', async () => {
    const analyzer = new ImageAnalyzer();
    
    const testRequest: AnalysisRequest = {
      imageBase64: mockImageBase64,
      customPrompt: 'Analyze this test image'
    };

    const result = await analyzer.analyze(testRequest);

    expect(result.success).toBe(false);
    expect(result.error).toContain('No LLM providers available');
    expect(result.metadata?.provider).toBe('none');
  });

  it('should handle invalid image data gracefully when no providers available', async () => {
    const analyzer = new ImageAnalyzer();
    
    const testRequest: AnalysisRequest = {
      imageBase64: 'invalid-base64-data',
      customPrompt: 'Analyze this test image'
    };

    const result = await analyzer.analyze(testRequest);

    expect(result.success).toBe(false);
    expect(result.error).toContain('No LLM providers available');
  });

  it('should handle empty imageBase64 gracefully when no providers available', async () => {
    const analyzer = new ImageAnalyzer();
    
    const testRequest: AnalysisRequest = {
      imageBase64: '',
      customPrompt: 'Analyze this test image'
    };

    const result = await analyzer.analyze(testRequest);

    expect(result.success).toBe(false);
    expect(result.error).toContain('No LLM providers available');
  });

  it('should include proper metadata in error response', async () => {
    const analyzer = new ImageAnalyzer();
    
    const testRequest: AnalysisRequest = {
      imageBase64: mockImageBase64,
      customPrompt: 'Analyze this test image'
    };

    const result = await analyzer.analyze(testRequest);

    expect(result.metadata).toBeDefined();
    expect(result.metadata?.provider).toBe('none');
    expect(result.metadata?.model).toBe('none');
    expect(result.metadata?.timestamp).toBeDefined();
    expect(typeof result.metadata?.timestamp).toBe('string');
  });
});
