// Move all mock setup to the very top, before any imports
const mockAzureProvider = {
  name: 'azure-openai',
  isAvailable: vi.fn(() => true),
  analyzeImage: vi.fn()
};
const mockOpenAIProvider = {
  name: 'openai',
  isAvailable: vi.fn(() => true),
  analyzeImage: vi.fn()
};

vi.mock('../../../src/llm/providers/openai-client.js', () => ({
  createAzureOpenAIClient: () => mockAzureProvider,
  createOpenAIClient: () => mockOpenAIProvider
}));

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageAnalyzer } from '../../../src/llm/image-analyzer.js';
import { AnalysisRequest } from '../../../src/llm/types.js';
import { mockImageBase64 } from '../../fixtures/data.js';
import { setupTestEnvironment, resetTestEnvironment } from '../../utils.js';

// Mock the provider classes
vi.mock('../../../src/llm/providers/azure-openai-client.js', () => ({
  createAzureOpenAIClient: vi.fn()
}));

describe('ImageAnalyzer', () => {
  let analyzer: ImageAnalyzer;

  beforeEach(() => {
    setupTestEnvironment();
    // Ensure environment variables are set so the real factories return available clients
    vi.stubEnv('AZURE_OPENAI_API_KEY', 'test-azure-key');
    vi.stubEnv('AZURE_OPENAI_ENDPOINT', 'https://test-resource.openai.azure.com');
    vi.stubEnv('AZURE_OPENAI_DEPLOYMENT_NAME', 'test-deployment');
    vi.stubEnv('OPENAI_API_KEY', 'test-openai-key');
    vi.stubEnv('OPENAI_MODEL', 'gpt-4o');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with providers', () => {
      analyzer = new ImageAnalyzer();
      expect(analyzer).toBeInstanceOf(ImageAnalyzer);
    });
  });
  describe('analyze', () => {
    const mockRequest: AnalysisRequest = {
      imageBase64: mockImageBase64
    };

    beforeEach(() => {
      analyzer = new ImageAnalyzer();
    });

    it('should successfully analyze with primary provider', async () => {
      const mockResult = {
        success: true,
        analysis: 'Analysis successful',
        metadata: {
          provider: 'azure-openai',
          model: 'gpt-4o',
          timestamp: new Date().toISOString()
        }
      };

      mockAzureProvider.analyzeImage.mockResolvedValue(mockResult);

      const result = await analyzer.analyze(mockRequest);

      expect(result.success).toBe(true);
      expect(result.analysis).toBe('Analysis successful');
      expect(mockAzureProvider.analyzeImage).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle failure gracefully', async () => {
      const mockError = {
        success: false,
        error: 'Analysis failed',
        metadata: {
          provider: 'azure-openai',
          model: 'gpt-4o',
          timestamp: new Date().toISOString()
        }
      };      mockAzureProvider.analyzeImage.mockResolvedValue(mockError);

      const result = await analyzer.analyze(mockRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('All LLM providers failed');
    });

    it('should return error for empty image data', async () => {
      const emptyRequest = { ...mockRequest, imageBase64: '' };

      const result = await analyzer.analyze(emptyRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('No image data provided');
    });    it('should handle provider exceptions', async () => {
      mockAzureProvider.analyzeImage.mockRejectedValue(new Error('Provider error'));

      const result = await analyzer.analyze(mockRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('All LLM providers failed');
    });
  });

  describe('utility methods', () => {
    beforeEach(() => {
      analyzer = new ImageAnalyzer();
    });    it('should return available providers', () => {
      const providers = analyzer.getAvailableProviders();
      expect(providers).toEqual(['azure-openai', 'openai']);
    });

    it('should return provider status', () => {
      const status = analyzer.getCurrentProviderStatus();
      expect(status).toHaveProperty('primary');
      expect(status).toHaveProperty('fallback');
      expect(status).toHaveProperty('available');
    });
  });

  describe('initialization scenarios', () => {
    it('should handle no available providers', () => {
      // Mock providers as unavailable
      mockAzureProvider.isAvailable.mockReturnValue(false);
      mockOpenAIProvider.isAvailable.mockReturnValue(false);
      
      analyzer = new ImageAnalyzer();
      
      const providers = analyzer.getAvailableProviders();
      expect(providers).toHaveLength(0);
      
      const status = analyzer.getCurrentProviderStatus();
      expect(status.primary).toBeNull();
      expect(status.fallback).toBeNull();
      expect(status.available).toHaveLength(0);
    });

    it('should set Azure OpenAI as primary when LLM_PROVIDER is azure-openai', () => {
      vi.stubEnv('LLM_PROVIDER', 'azure-openai');
      analyzer = new ImageAnalyzer();
      const status = analyzer.getCurrentProviderStatus();
      expect(status.primary).toBe('azure-openai');
    });

    it('should set OpenAI as primary when LLM_PROVIDER is openai', () => {
      vi.stubEnv('LLM_PROVIDER', 'openai');
      analyzer = new ImageAnalyzer();
      const status = analyzer.getCurrentProviderStatus();
      expect(status.primary).toBe('openai');
    });

    it('should fallback to first available provider if LLM_PROVIDER is not set or invalid', () => {
      vi.stubEnv('LLM_PROVIDER', 'invalid-provider');
      analyzer = new ImageAnalyzer();
      const status = analyzer.getCurrentProviderStatus();
      expect(status.primary).toBe('azure-openai'); // Assuming azure-openai is the first available
    });

    it('should handle when no providers are available and analyze is called', async () => {
      mockAzureProvider.isAvailable.mockReturnValue(false);
      analyzer = new ImageAnalyzer();
      
      const mockRequest: AnalysisRequest = {
        imageBase64: mockImageBase64
      };

      const result = await analyzer.analyze(mockRequest);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('All LLM providers failed to analyze the image. Please try again later.');
      expect(result.metadata?.provider).toBe('all-failed');
    });
  });

  describe('testProviders method', () => {
    beforeEach(() => {
      analyzer = new ImageAnalyzer();
    });

    it('should test all providers successfully', async () => {
      mockAzureProvider.analyzeImage.mockResolvedValue({
        success: true,
        analysis: 'Test successful.'
      });

      const results = await analyzer.testProviders();
      
      expect(results).toHaveProperty('azure-openai');
      expect(results['azure-openai']).toBe(true);
      expect(mockAzureProvider.analyzeImage).toHaveBeenCalledWith(
        expect.objectContaining({
          customPrompt: 'This is a test. Please respond with just "Test successful."'
        })
      );
    });

    it('should handle provider test failures', async () => {
      mockAzureProvider.analyzeImage.mockRejectedValue(new Error('Test failed'));

      const results = await analyzer.testProviders();
      
      expect(results).toHaveProperty('azure-openai');
      expect(results['azure-openai']).toBe(false);
    });

    it('should handle provider returning unsuccessful result', async () => {
      mockAzureProvider.analyzeImage.mockResolvedValue({
        success: false,
        error: 'Test failed'
      });

      const results = await analyzer.testProviders();
      
      expect(results).toHaveProperty('azure-openai');
      expect(results['azure-openai']).toBe(false);
    });
  });

  describe('provider failure scenarios', () => {
    beforeEach(() => {
      analyzer = new ImageAnalyzer();
    });

    it('should handle primary provider failure with unsuccessful result', async () => {
      const mockRequest: AnalysisRequest = {
        imageBase64: mockImageBase64
      };

      mockAzureProvider.analyzeImage.mockResolvedValue({
        success: false,
        error: 'Primary failed',
        metadata: {
          provider: 'azure-openai',
          model: 'gpt-4o',
          timestamp: new Date().toISOString()
        }
      });

      const result = await analyzer.analyze(mockRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('All LLM providers failed');
    });

    it('should handle when primary provider is null', async () => {
      // Create analyzer with no providers
      mockAzureProvider.isAvailable.mockReturnValue(false);
      analyzer = new ImageAnalyzer();
      
      const mockRequest: AnalysisRequest = {
        imageBase64: mockImageBase64
      };

      const result = await analyzer.analyze(mockRequest);

      expect(result.success).toBe(false);
      expect(result.error).toContain('All LLM providers failed to analyze the image. Please try again later.');
    });
  });
});