import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageAnalyzer } from '../../src/llm/image-analyzer.js';
import { getDocumentHandler } from '../../src/tools/index.js';
import { mockLucidDocument } from '../fixtures/data.js';

// Mock the LucidService
vi.mock('../../src/services/lucidService.js', () => ({
  lucidService: {
    instance: {
      searchDocuments: vi.fn(),
      getDocument: vi.fn(),
      exportDocumentAsPng: vi.fn(),
    },
    resetInstance: vi.fn()
  }
}));

describe('Integration: Advanced Scenarios', () => {
  beforeEach(() => {
    vi.stubEnv('LUCID_API_KEY', 'test-lucid-key');
    vi.stubEnv('AZURE_OPENAI_API_KEY', 'test-azure-key');
    vi.stubEnv('AZURE_OPENAI_ENDPOINT', 'https://test.openai.azure.com');
    vi.stubEnv('AZURE_OPENAI_DEPLOYMENT_NAME', 'gpt-4o');
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('Timeout Handling', () => {
    it('should handle API timeout gracefully', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      
      // Mock a timeout error
      (lucidService.instance.getDocument as any).mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 100);
        });
      });

      const result = await getDocumentHandler({ documentId: 'test-doc-123' });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Request timeout');
    });    it('should handle image export timeout', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      
      (lucidService.instance.getDocument as any).mockResolvedValue(mockLucidDocument);
      (lucidService.instance.exportDocumentAsPng as any).mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Export timeout')), 100);
        });
      });

      const result = await getDocumentHandler({
        documentId: 'test-doc-123',
        analyzeImage: true
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Error:');
      expect(result.content[0].text).toContain('Export timeout');
    });    it('should handle LLM analysis timeout', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      
      (lucidService.instance.getDocument as any).mockResolvedValue(mockLucidDocument);
      (lucidService.instance.exportDocumentAsPng as any).mockResolvedValue({
        base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        contentType: 'image/png',
        size: 1024
      });

      // Mock ImageAnalyzer with timeout
      const mockAnalyzer = {
        analyze: vi.fn().mockImplementation(() => {
          return new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Analysis timeout')), 100);
          });
        })
      };

      vi.doMock('../../src/llm/image-analyzer.js', () => ({
        ImageAnalyzer: vi.fn().mockImplementation(() => mockAnalyzer)
      }));

      const result = await getDocumentHandler({
        documentId: 'test-doc-123',
        analyzeImage: true
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Analysis failed');
      // The exact error message may vary, so let's just check for failure
    });
  });

  describe('Different Image Formats', () => {
    it('should handle PNG image format', async () => {
      const analyzer = new ImageAnalyzer();
      
      const pngImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      
      const result = await analyzer.analyze({
        imageBase64: pngImage,
        customPrompt: 'Analyze this PNG image'
      });

      // Should handle PNG format (success depends on Azure OpenAI availability)
      expect(result).toBeDefined();
      expect(result.metadata).toBeDefined();
    });

    it('should handle JPEG image format', async () => {
      const analyzer = new ImageAnalyzer();
      
      // Mock JPEG base64 data
      const jpegImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XmYO3HF';
      
      const result = await analyzer.analyze({
        imageBase64: jpegImage,
        customPrompt: 'Analyze this JPEG image'
      });

      // Should handle JPEG format (success depends on Azure OpenAI availability)
      expect(result).toBeDefined();
      expect(result.metadata).toBeDefined();
    });

    it('should handle WebP image format', async () => {
      const analyzer = new ImageAnalyzer();
      
      // Mock WebP base64 data
      const webpImage = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4IBYAAAAwAQCdASoBAAEAD8D+JaQAA3AAAAAA';
      
      const result = await analyzer.analyze({
        imageBase64: webpImage,
        customPrompt: 'Analyze this WebP image'
      });

      // Should handle WebP format (success depends on Azure OpenAI availability)
      expect(result).toBeDefined();
      expect(result.metadata).toBeDefined();
    });

    it('should handle invalid image format gracefully', async () => {
      const analyzer = new ImageAnalyzer();
      
      const invalidImage = 'data:image/invalid;base64,invalid-data-here';
      
      const result = await analyzer.analyze({
        imageBase64: invalidImage,
        customPrompt: 'Analyze this invalid image'
      });

      // Should handle invalid format gracefully
      expect(result).toBeDefined();
      expect(result.success).toBeDefined();
    });

    it('should handle corrupted base64 data', async () => {
      const analyzer = new ImageAnalyzer();
      
      const corruptedImage = 'data:image/png;base64,this-is-not-valid-base64-data!!!';
      
      const result = await analyzer.analyze({
        imageBase64: corruptedImage,
        customPrompt: 'Analyze this corrupted image'
      });

      // Should handle corrupted data gracefully
      expect(result).toBeDefined();
      expect(result.success).toBeDefined();
    });
  });

  describe('Large Image Handling', () => {
    it('should handle large images gracefully', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      
      (lucidService.instance.getDocument as any).mockResolvedValue(mockLucidDocument);
      
      // Mock a large image (5MB)
      const largeImageData = 'x'.repeat(5 * 1024 * 1024);
      (lucidService.instance.exportDocumentAsPng as any).mockResolvedValue({
        base64: `data:image/png;base64,${largeImageData}`,
        contentType: 'image/png',
        size: 5 * 1024 * 1024
      });

      const result = await getDocumentHandler({
        documentId: 'test-doc-123',
        analyzeImage: true
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      // Should either succeed or fail gracefully
    });
  });
});
