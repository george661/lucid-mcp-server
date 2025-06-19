import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AzureOpenAIClient } from '../../../src/llm/providers/azure-openai-client.js';
import { AnalysisRequest } from '../../../src/llm/types.js';
import { mockImageBase64 } from '../../fixtures/data.js';
import { setupTestEnvironment, resetTestEnvironment } from '../../utils.js';

// Mock the OpenAI module
vi.mock('openai', () => {
  const mockCreate = vi.fn();
  return {
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

describe('AzureOpenAIClient', () => {
  let client: AzureOpenAIClient;
  let mockCreate: any;
  beforeEach(async () => {
    setupTestEnvironment();
    
    // Clear the mock and get reference to it
    const openaiModule = vi.mocked(await import('openai'));
    mockCreate = (openaiModule as any).__mockCreate;
    mockCreate.mockClear();
    
    client = new AzureOpenAIClient();
  });

  afterEach(() => {
    resetTestEnvironment();
    vi.restoreAllMocks();
  });

  describe('isAvailable', () => {
    it('should return true when all required environment variables are set', () => {
      expect(client.isAvailable()).toBe(true);
    });

    it('should return false when API key is missing', () => {
      vi.stubEnv('AZURE_OPENAI_API_KEY', '');
      client = new AzureOpenAIClient();
      expect(client.isAvailable()).toBe(false);
    });

    it('should return false when endpoint is missing', () => {
      vi.stubEnv('AZURE_OPENAI_ENDPOINT', '');
      client = new AzureOpenAIClient();
      expect(client.isAvailable()).toBe(false);
    });

    it('should return false when endpoint is not Azure OpenAI', () => {
      vi.stubEnv('AZURE_OPENAI_ENDPOINT', 'https://api.openai.com');
      client = new AzureOpenAIClient();
      expect(client.isAvailable()).toBe(false);
    });
  });

  describe('name property', () => {
    it('should return correct provider name', () => {
      expect(client.name).toBe('azure-openai');
    });
  });
  describe('analyzeImage', () => {
    const mockRequest: AnalysisRequest = {
      imageBase64: mockImageBase64
    };

    it('should return error when client is not available', async () => {
      vi.stubEnv('AZURE_OPENAI_API_KEY', '');
      client = new AzureOpenAIClient();

      const result = await client.analyzeImage(mockRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Azure OpenAI client not initialized');
    });

    it('should return error for invalid image data', async () => {
      const invalidRequest = { ...mockRequest, imageBase64: 'invalid-base64!' };

      const result = await client.analyzeImage(invalidRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid image data provided');
    });

    it('should successfully analyze image with valid response', async () => {
      const mockCompletion = {
        choices: [{
          message: {
            content: 'Analysis result from OpenAI'
          }
        }]
      };

      mockCreate.mockResolvedValue(mockCompletion);

      const result = await client.analyzeImage(mockRequest);

      expect(result.success).toBe(true);
      expect(result.analysis).toBe('Analysis result from OpenAI');
      expect(result.metadata?.provider).toBe('azure-openai');
      expect(result.metadata?.timestamp).toBeDefined();      // Verify the API was called with correct parameters
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: expect.any(String),
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'system'
            }),
            expect.objectContaining({
              role: 'user',
              content: expect.arrayContaining([
                expect.objectContaining({
                  type: 'text'
                }),
                expect.objectContaining({
                  type: 'image_url',
                  image_url: expect.objectContaining({
                    url: `data:image/png;base64,${mockImageBase64}`
                  })
                })
              ])
            })
          ]),
          max_tokens: expect.any(Number),
          temperature: expect.any(Number)
        })
      );
    });

    it('should handle API errors gracefully', async () => {
      mockCreate.mockRejectedValue(new Error('API Error'));

      const result = await client.analyzeImage(mockRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Azure OpenAI error: API Error');
    });

    it('should handle empty response from API', async () => {
      const mockCompletion = { choices: [] };
      mockCreate.mockResolvedValue(mockCompletion);

      const result = await client.analyzeImage(mockRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('No analysis received from Azure OpenAI');
    });

    it('should handle custom prompts', async () => {
      const customRequest = {
        ...mockRequest,
        customPrompt: 'Custom analysis prompt'
      };

      const mockCompletion = {
        choices: [{
          message: {
            content: 'Custom analysis result'
          }
        }]
      };

      mockCreate.mockResolvedValue(mockCompletion);

      const result = await client.analyzeImage(customRequest);

      expect(result.success).toBe(true);
      expect(result.analysis).toBe('Custom analysis result');
    });
  });

  describe('configuration management', () => {
    it('should return current configuration', () => {
      const config = client.getConfig();
      expect(config).toHaveProperty('endpoint');
      expect(config).toHaveProperty('apiKey');
      expect(config).toHaveProperty('model');
    });

    it('should update configuration', () => {
      const newConfig = { maxTokens: 1000, temperature: 0.5 };
      client.updateConfig(newConfig);
      
      const config = client.getConfig();
      expect(config.maxTokens).toBe(1000);
      expect(config.temperature).toBe(0.5);
    });
  });
});
