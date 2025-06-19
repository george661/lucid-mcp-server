import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseLLMClient } from '../../../../src/llm/providers/base-llm-client.js';
import { AnalysisRequest, AnalysisResult } from '../../../../src/llm/types.js';

// Create a concrete implementation for testing
class TestLLMClient extends BaseLLMClient {
  public readonly name = 'test-client';
  protected config = { apiKey: 'test-key' };

  isAvailable(): boolean {
    return true;
  }

  async analyzeImage(request: AnalysisRequest): Promise<AnalysisResult> {
    return super.createSuccessResult('Test analysis', 'test-model');
  }

  // Expose protected methods for testing
  public testCreateErrorResult(error: string): AnalysisResult {
    return super.createErrorResult(error);
  }

  public testCreateSuccessResult(analysis: string, model: string): AnalysisResult {
    return super.createSuccessResult(analysis, model);
  }

  public testValidateImageBase64(imageBase64: string): boolean {
    return super.validateImageBase64(imageBase64);
  }
}

describe('BaseLLMClient', () => {
  let client: TestLLMClient;

  beforeEach(() => {
    client = new TestLLMClient();
  });

  describe('createErrorResult', () => {
    it('should create proper error result structure', () => {
      const errorMessage = 'Test error';
      const result = client.testCreateErrorResult(errorMessage);

      expect(result.success).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.metadata?.provider).toBe('test-client');
      expect(result.metadata?.model).toBe('unknown');
      expect(result.metadata?.timestamp).toBeDefined();
    });
  });
  describe('createSuccessResult', () => {
    it('should create proper success result structure', () => {
      const analysis = 'Test analysis result';
      const model = 'test-model-v1';

      const result = client.testCreateSuccessResult(analysis, model);

      expect(result.success).toBe(true);
      expect(result.analysis).toBe(analysis);
      expect(result.metadata?.provider).toBe('test-client');
      expect(result.metadata?.model).toBe(model);
      expect(result.metadata?.timestamp).toBeDefined();
    });
  });

  describe('validateImageBase64', () => {
    it('should validate correct base64 strings', () => {
      const validBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ';
      expect(client.testValidateImageBase64(validBase64)).toBe(true);
    });

    it('should validate base64 with padding', () => {
      const validBase64WithPadding = 'SGVsbG8gV29ybGQ=';
      expect(client.testValidateImageBase64(validBase64WithPadding)).toBe(true);
    });

    it('should reject empty strings', () => {
      expect(client.testValidateImageBase64('')).toBe(false);
    });

    it('should reject null or undefined', () => {
      expect(client.testValidateImageBase64(null as any)).toBe(false);
      expect(client.testValidateImageBase64(undefined as any)).toBe(false);
    });

    it('should reject non-string values', () => {
      expect(client.testValidateImageBase64(123 as any)).toBe(false);
      expect(client.testValidateImageBase64({} as any)).toBe(false);
    });

    it('should reject invalid base64 characters', () => {
      const invalidBase64 = 'invalid@#$%base64!';
      expect(client.testValidateImageBase64(invalidBase64)).toBe(false);
    });

    it('should reject strings with too much padding', () => {
      const invalidPadding = 'SGVsbG8===';
      expect(client.testValidateImageBase64(invalidPadding)).toBe(false);
    });

    it('should handle regex validation errors gracefully', () => {
      // Mock regex to throw error
      const originalTest = RegExp.prototype.test;
      vi.spyOn(RegExp.prototype, 'test').mockImplementation(() => {
        throw new Error('Regex error');
      });

      const result = client.testValidateImageBase64('validBase64');
      expect(result).toBe(false);

      // Restore original method
      RegExp.prototype.test = originalTest;
    });
  });

  describe('abstract methods implementation', () => {
    it('should have concrete implementations of abstract methods', () => {
      expect(client.name).toBe('test-client');
      expect(client.isAvailable()).toBe(true);
      expect(typeof client.analyzeImage).toBe('function');
    });
  });
});
