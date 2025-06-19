import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDocumentHandler } from '../../../src/tools/getDocument.js';
import { searchDocumentsHandler } from '../../../src/tools/searchDocuments.js';
import { setupTestEnvironment, resetTestEnvironment, createHttpMockResponse } from '../../utils.js';
import { mockLucidDocument, mockDocumentList } from '../../fixtures/data.js';

// Mock the ImageAnalyzer
vi.mock('../../../src/llm/image-analyzer.js', () => ({
  ImageAnalyzer: vi.fn().mockImplementation(() => ({
    analyze: vi.fn().mockResolvedValue({
      success: true,
      analysis: 'Mocked analysis result'
    })
  }))
}));

describe('tools', () => {
  beforeEach(() => {
    setupTestEnvironment();
    vi.clearAllMocks();
  });

  afterEach(() => {
    resetTestEnvironment();
  });

  describe('getDocumentHandler', () => {
    it('should return comprehensive document metadata when no options provided', async () => {
      const mockResponse = createHttpMockResponse(mockLucidDocument);
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await getDocumentHandler({ documentId: 'test-doc-123' }); 
      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('**Document Information**');
      expect(result.content[0].text).toContain('Title: Test Document');
      expect(result.content[0].text).toContain('ID: test-doc-123');
      expect(result.content[0].text).toContain('Product:');
      expect(result.content[0].text).toContain('Version:');
      expect(result.content[0].text).toContain('Page Count: 1');
      expect(result.content[0].text).toContain('Status: Active');
      expect(result.content[0].text).toContain('Classification:');
      expect(result.content[0].text).toContain('Can Edit:');
      expect(result.content[0].text).toContain('Created:');
      expect(result.content[0].text).toContain('Last Modified:');
    });

    it('should analyze image when analyzeImage is true', async () => {
      const mockDocResponse = createHttpMockResponse(mockLucidDocument);
      const mockImageBuffer = Buffer.from('fake-png-data');
      const mockImageResponse = {
        ok: true,
        status: 200,
        headers: {
          get: vi.fn().mockReturnValue('image/png')
        },
        arrayBuffer: vi.fn().mockResolvedValue(mockImageBuffer.buffer)
      } as unknown as Response;

      global.fetch = vi.fn()
        .mockResolvedValueOnce(mockDocResponse)
        .mockResolvedValueOnce(mockImageResponse);

      const result = await getDocumentHandler({ 
        documentId: 'test-doc-123', 
        analyzeImage: true 
      });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('**Test Document**');
      expect(result.content[0].text).toContain('Mocked analysis result');
    });

    it('should handle documents not found', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Document not found' })
      } as unknown as Response;
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await getDocumentHandler({ documentId: 'nonexistent-doc' });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Error:');
    });    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const result = await getDocumentHandler({ documentId: 'test-doc-123' });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Failed to get document test-doc-123: Network error');
    });
  });

  describe('searchDocumentsHandler', () => {    it('should return list of documents when search succeeds', async () => {
      const mockResponse = createHttpMockResponse(mockDocumentList);
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await searchDocumentsHandler({});
      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Found 2 documents');
      expect(result.content[0].text).toContain('Test Document (ID: test-doc-123)');
      expect(result.content[0].text).toContain('Another Test Document (ID: test-doc-456)');
    });

    it('should handle no documents found', async () => {
      const mockResponse = createHttpMockResponse([]);
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await searchDocumentsHandler({});

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('No documents found in your account');
    });    it('should handle API errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('API error'));

      const result = await searchDocumentsHandler({});

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Error searching documents: Failed to search documents: API error');
    });

    it('should handle keywords search with no results', async () => {
      global.fetch = vi.fn()
        .mockResolvedValueOnce(createHttpMockResponse([]))  // First call with keywords
        .mockResolvedValueOnce(createHttpMockResponse(mockDocumentList));  // Second call without keywords

      const result = await searchDocumentsHandler({ keywords: 'nonexistent' });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('No documents found for keywords: "nonexistent"');
      expect(result.content[0].text).toContain('However, found 2 total documents');
    });    it('should handle keywords search with results', async () => {
      const filteredResults = [mockDocumentList[0]]; // Only first document
      const mockResponse = createHttpMockResponse(filteredResults);
      global.fetch = vi.fn().mockResolvedValue(mockResponse);

      const result = await searchDocumentsHandler({ keywords: 'test' });

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('Found 1 documents');
      expect(result.content[0].text).toContain('Test Document (ID: test-doc-123)');
    });
  });
});
