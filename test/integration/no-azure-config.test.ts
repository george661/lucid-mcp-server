import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageAnalyzer } from '../../src/llm/image-analyzer.js';
import { AnalysisRequest } from '../../src/llm/types.js';
import { mockImageBase64 } from '../fixtures/data.js';

// Mock the OpenAI module for integration tests
vi.mock('openai', () => {
  const mockCreate = vi.fn();
  return {
    OpenAI: vi.fn(() => ({
      chat: {
        completions: {
          create: mockCreate
        }
      }
    })),
    AzureOpenAI: vi.fn(() => ({
      chat: {
        completions: {
          create: mockCreate
        }
      }
    })),
    __mockCreate: mockCreate
  };
});

describe('Integration: Azure OpenAI Fallback to OpenAI', () => {
  let mockCreate: any;

  beforeEach(async () => {
    // Clear all environment variables and set up OpenAI fallback scenario
    vi.unstubAllEnvs();
    vi.stubEnv('LUCID_API_KEY', 'test-lucid-key');
    vi.stubEnv('OPENAI_API_KEY', 'test-openai-key'); // OpenAI available as fallback
    
    // Ensure Azure OpenAI variables are not configured
    vi.stubEnv('AZURE_OPENAI_API_KEY', undefined);
    vi.stubEnv('AZURE_OPENAI_ENDPOINT', undefined);
    vi.stubEnv('AZURE_OPENAI_DEPLOYMENT_NAME', undefined);

    // Setup OpenAI mock for successful responses
    const openaiModule = vi.mocked(await import('openai'));
    mockCreate = (openaiModule as any).__mockCreate;
    mockCreate.mockClear();
    
    // Mock successful OpenAI response
    mockCreate.mockResolvedValue({
      choices: [{
        message: {
          content: 'Test analysis result from OpenAI'
        }
      }],
      usage: {
        prompt_tokens: 100,
        completion_tokens: 50,
        total_tokens: 150
      }
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should successfully fallback to OpenAI when Azure OpenAI is not configured', async () => {
    const analyzer = new ImageAnalyzer();
    
    const testRequest: AnalysisRequest = {
      imageBase64: mockImageBase64,
      customPrompt: 'Analyze this test image'
    };

    const result = await analyzer.analyze(testRequest);

    // Should succeed with OpenAI fallback
    expect(result.success).toBe(true);
    expect(result.metadata?.provider).toBe('openai');
  });

  it('should handle invalid image data gracefully using OpenAI fallback', async () => {
    // For this test, we need to reset the mock to simulate validation failure
    mockCreate.mockClear();
    
    const analyzer = new ImageAnalyzer();
    
    const testRequest: AnalysisRequest = {
      imageBase64: 'invalid@#$%data', // Invalid base64 characters
      customPrompt: 'Analyze this test image'
    };

    const result = await analyzer.analyze(testRequest);

    expect(result.success).toBe(false);
    // The provider should detect invalid data and fail appropriately
    expect(result.error).toBeDefined();
    expect(typeof result.error).toBe('string');
    // Should not even try to call OpenAI with invalid data
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('should handle empty imageBase64 gracefully using OpenAI fallback', async () => {
    const analyzer = new ImageAnalyzer();
    
    const testRequest: AnalysisRequest = {
      imageBase64: '',
      customPrompt: 'Analyze this test image'
    };

    const result = await analyzer.analyze(testRequest);

    expect(result.success).toBe(false);
    expect(result.error).toContain('No image data provided');
  });

  it('should include proper OpenAI metadata in successful response', async () => {
    const analyzer = new ImageAnalyzer();
    
    const testRequest: AnalysisRequest = {
      imageBase64: mockImageBase64,
      customPrompt: 'Analyze this test image'
    };

    const result = await analyzer.analyze(testRequest);

    expect(result.metadata).toBeDefined();
    expect(result.metadata?.provider).toBe('openai');
    expect(result.metadata?.model).toBe('gpt-4o');
    expect(result.metadata?.timestamp).toBeDefined();
    expect(typeof result.metadata?.timestamp).toBe('string');
  });
});

describe('Integration: No LLM Providers Available', () => {
  beforeEach(() => {
    // Clear all environment variables - no LLM providers configured
    vi.unstubAllEnvs();
    vi.stubEnv('LUCID_API_KEY', 'test-lucid-key');
    
    // Explicitly ensure no LLM providers are available
    vi.stubEnv('AZURE_OPENAI_API_KEY', undefined);
    vi.stubEnv('AZURE_OPENAI_ENDPOINT', undefined);
    vi.stubEnv('AZURE_OPENAI_DEPLOYMENT_NAME', undefined);
    vi.stubEnv('OPENAI_API_KEY', undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should report no LLM providers available when no providers are configured', async () => {
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

  it('should include proper metadata in error response when no providers available', async () => {
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
