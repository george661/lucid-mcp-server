import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchDocumentsHandler } from '../../../src/tools/searchDocuments.js';
import { setupTestEnvironment, resetTestEnvironment, createHttpMockResponse } from '../../utils.js';
import { mockDocumentList } from '../../fixtures/data.js';

describe('searchDocumentsHandler', () => {
  beforeEach(() => {
    setupTestEnvironment();
    vi.clearAllMocks();
  });

  afterEach(() => {
    resetTestEnvironment();
  });

  it('should return list of documents when search succeeds', async () => {
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
  });

  it('should handle API errors', async () => {
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
  });

  it('should handle keywords search with results', async () => {
    const filteredResults = [mockDocumentList[0]]; // Only first document
    const mockResponse = createHttpMockResponse(filteredResults);
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await searchDocumentsHandler({ keywords: 'test' });

    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('Found 1 documents');
    expect(result.content[0].text).toContain('Test Document (ID: test-doc-123)');
  });

  it('should handle no results with keywords, and no results without keywords', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce(createHttpMockResponse([])) // First call with keywords
      .mockResolvedValueOnce(createHttpMockResponse([])); // Second call without keywords

    const result = await searchDocumentsHandler({ keywords: 'nonexistent' });

    expect(result.content).toHaveLength(1);
    expect(result.content[0].text).toContain('No documents found in your account');
  });

  it('should handle network errors during search', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network timeout'));

    const result = await searchDocumentsHandler({ keywords: 'test' });

    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('Error searching documents: Failed to search documents: Network timeout');
  });

  it('should handle invalid API response', async () => {
    const mockResponse = createHttpMockResponse({ invalid: 'response' });
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await searchDocumentsHandler({});

    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('No documents found in your account');
  });
});
