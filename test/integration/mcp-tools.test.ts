import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDocumentHandler, searchDocumentsHandler } from '../../src/tools/index.js';
import { mockLucidDocument, mockDocumentList, mockImageBase64 } from '../fixtures/data.js';
import { createHttpMockResponse } from '../utils.js';

// Mock the LucidService to avoid real API calls
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

// Mock the ImageAnalyzer 
vi.mock('../../src/llm/image-analyzer.js', () => ({
  ImageAnalyzer: vi.fn()
}));

describe('Integration: MCP Tools', () => {
  beforeEach(() => {
    vi.stubEnv('LUCID_API_KEY', 'test-lucid-key');
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('search-documents tool', () => {
    it('should successfully search documents without keywords', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      (lucidService.instance.searchDocuments as any).mockResolvedValue(mockDocumentList);

      const result = await searchDocumentsHandler({});

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Found 2 documents');
      expect(result.content[0].text).toContain('Test Document');
      expect(result.content[0].text).toContain('Another Test Document');
    });

    it('should successfully search documents with keywords', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      (lucidService.instance.searchDocuments as any).mockResolvedValue([mockLucidDocument]);

      const result = await searchDocumentsHandler({ keywords: 'test' });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Found 1 documents');
      expect(result.content[0].text).toContain('Test Document');
    });

    it('should handle empty search results', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      (lucidService.instance.searchDocuments as any).mockResolvedValue([]);

      const result = await searchDocumentsHandler({ keywords: 'nonexistent' });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('No documents found');
    });

    it('should handle API errors gracefully', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      (lucidService.instance.searchDocuments as any).mockRejectedValue(new Error('API Error'));

      const result = await searchDocumentsHandler({});

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Error searching documents');
    });    it('should handle search with different Lucid products filter', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      (lucidService.instance.searchDocuments as any).mockResolvedValue([
        { ...mockLucidDocument, product: 'lucidspark' },
        { ...mockLucidDocument, id: 'doc2', product: 'lucidscale', title: 'Scale Document' }
      ]);

      const result = await searchDocumentsHandler({ keywords: 'test' });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Found 2 documents');
      expect(result.content[0].text).toContain('Scale Document');
    });

    it('should handle very long keywords string', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      const longKeywords = 'a'.repeat(1000); // Very long string
      (lucidService.instance.searchDocuments as any).mockResolvedValue([]);

      const result = await searchDocumentsHandler({ keywords: longKeywords });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('No documents found');
    });

    it('should handle special characters in keywords', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      const specialKeywords = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./';
      (lucidService.instance.searchDocuments as any).mockResolvedValue([]);

      const result = await searchDocumentsHandler({ keywords: specialKeywords });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('No documents found');
    });
  });

  describe('get-document tool', () => {
    it('should get document metadata without image analysis', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      (lucidService.instance.getDocument as any).mockResolvedValue(mockLucidDocument);

      const result = await getDocumentHandler({
        documentId: 'test-doc-123',
        analyzeImage: false
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');      expect(result.content[0].text).toContain('Test Document');
      expect(result.content[0].text).toContain('Lucidchart');
      expect(result.content[0].text).toContain('1/1/2024'); // Date format as shown in the actual output
    });

    it('should handle image analysis when Azure OpenAI is not available', async () => {
      // Clear Azure OpenAI environment variables
      delete process.env.AZURE_OPENAI_API_KEY;
      delete process.env.AZURE_OPENAI_ENDPOINT;
      delete process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

      const { lucidService } = await import('../../src/services/lucidService.js');
      const { ImageAnalyzer } = await import('../../src/llm/image-analyzer.js');
      
      (lucidService.instance.getDocument as any).mockResolvedValue(mockLucidDocument);
      (lucidService.instance.exportDocumentAsPng as any).mockResolvedValue({
        base64: mockImageBase64,
        contentType: 'image/png',
        size: 1024
      });

      const mockAnalyzer = {
        analyze: vi.fn().mockResolvedValue({
          success: false,
          error: 'No LLM providers available. Please check your configuration.',
          metadata: {
            provider: 'none',
            model: 'none',
            timestamp: new Date().toISOString()
          }
        })
      };
      (ImageAnalyzer as any).mockImplementation(() => mockAnalyzer);

      const result = await getDocumentHandler({
        documentId: 'test-doc-123',
        analyzeImage: true
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');      expect(result.content[0].text).toContain('Test Document');
      expect(result.content[0].text).toContain('Analysis failed'); // Match actual output
      expect(result.content[0].text).toContain('No LLM providers available');
    });

    it('should handle document not found', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      (lucidService.instance.getDocument as any).mockRejectedValue(new Error('Document not found'));

      const result = await getDocumentHandler({
        documentId: 'nonexistent-doc-123'
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Document not found'); // Match actual error message
    });    it('should handle invalid documentId parameter', async () => {
      const result = await getDocumentHandler({
        documentId: '',
        analyzeImage: false
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Document not found');
    });    it('should handle invalid pageId parameter', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      (lucidService.instance.getDocument as any).mockResolvedValue(mockLucidDocument);
      (lucidService.instance.exportDocumentAsPng as any).mockRejectedValue(new Error('Invalid page ID'));

      const result = await getDocumentHandler({
        documentId: 'test-doc-123',
        pageId: 'invalid-page-id',
        analyzeImage: true
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Error:');
      expect(result.content[0].text).toContain('Invalid page ID');
    });    it('should handle export image failure gracefully', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      const { ImageAnalyzer } = await import('../../src/llm/image-analyzer.js');
      
      (lucidService.instance.getDocument as any).mockResolvedValue(mockLucidDocument);
      (lucidService.instance.exportDocumentAsPng as any).mockRejectedValue(new Error('Export failed'));

      const result = await getDocumentHandler({
        documentId: 'test-doc-123',
        analyzeImage: true
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Error:');
      expect(result.content[0].text).toContain('Export failed');
    });

    it('should handle different Lucid products (LucidChart, LucidSpark, LucidScale)', async () => {
      const { lucidService } = await import('../../src/services/lucidService.js');
      
      const lucidSparkDoc = {
        ...mockLucidDocument,
        product: 'lucidspark',
        title: 'Test LucidSpark Board'
      };
      
      (lucidService.instance.getDocument as any).mockResolvedValue(lucidSparkDoc);

      const result = await getDocumentHandler({
        documentId: 'test-spark-doc-123',
        analyzeImage: false
      });

      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Test LucidSpark Board');
      expect(result.content[0].text).toContain('lucidspark');
    });
  });
});
