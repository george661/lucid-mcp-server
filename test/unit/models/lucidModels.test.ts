/**
 * @file Unit tests for lucidModels module
 */

import { describe, it, expect } from 'vitest';
import { 
  LucidDocument, 
  LucidSearchResult, 
  LucidImageExport, 
  SearchDocumentsParams,
  isValidLucidDocument,
  isDocumentTrashed,
  getDocumentDisplayName,
  filterDocumentsByProduct,
  sortDocumentsByLastModified,
  createSearchResult,
  validateSearchParams
} from '../../../src/models/lucidModels.js';

describe('Lucid Models', () => {
  describe('LucidDocument interface', () => {
    it('should accept valid document with required fields', () => {
      const doc: LucidDocument = {
        documentId: 'test-123'
      };

      expect(doc.documentId).toBe('test-123');
    });

    it('should accept document with all optional fields', () => {
      const doc: LucidDocument = {
        documentId: 'test-123',
        title: 'Test Document',
        editUrl: 'https://example.com/edit',
        viewUrl: 'https://example.com/view',
        version: 1,
        pageCount: 5,
        canEdit: true,
        creatorId: 123,
        lastModified: '2023-01-01T00:00:00Z',
        lastModifiedUserId: 456,
        trashed: null,
        status: 'active',
        classification: null,
        customAttributes: [],
        customTags: ['tag1', 'tag2'],
        product: 'lucidchart',
        created: '2023-01-01T00:00:00Z',
        owner: {
          id: 123,
          type: 'user',
          name: 'Test User'
        },
        parent: 789
      };

      expect(doc.documentId).toBe('test-123');
      expect(doc.title).toBe('Test Document');
      expect(doc.product).toBe('lucidchart');
      expect(doc.customTags).toEqual(['tag1', 'tag2']);
      expect(doc.owner?.name).toBe('Test User');
    });

    it('should accept document with different product types', () => {
      const chartDoc: LucidDocument = { documentId: 'chart-1', product: 'lucidchart' };
      const scaleDoc: LucidDocument = { documentId: 'scale-1', product: 'lucidscale' };
      const sparkDoc: LucidDocument = { documentId: 'spark-1', product: 'lucidspark' };

      expect(chartDoc.product).toBe('lucidchart');
      expect(scaleDoc.product).toBe('lucidscale');
      expect(sparkDoc.product).toBe('lucidspark');
    });

    it('should handle null and undefined values correctly', () => {
      const doc: LucidDocument = {
        documentId: 'test-123',
        trashed: null,
        classification: null,
        title: undefined
      };

      expect(doc.trashed).toBeNull();
      expect(doc.classification).toBeNull();
      expect(doc.title).toBeUndefined();
    });
  });

  describe('LucidSearchResult interface', () => {
    it('should accept search result with documents', () => {
      const result: LucidSearchResult = {
        documents: [
          { documentId: 'doc-1', title: 'Document 1' },
          { documentId: 'doc-2', title: 'Document 2' }
        ]
      };

      expect(result.documents).toHaveLength(2);
      expect(result.documents[0].documentId).toBe('doc-1');
    });

    it('should accept search result with total count', () => {
      const result: LucidSearchResult = {
        documents: [],
        totalCount: 42
      };

      expect(result.documents).toHaveLength(0);
      expect(result.totalCount).toBe(42);
    });

    it('should accept empty search result', () => {
      const result: LucidSearchResult = {
        documents: []
      };

      expect(result.documents).toHaveLength(0);
      expect(result.totalCount).toBeUndefined();
    });
  });

  describe('LucidImageExport interface', () => {
    it('should accept valid image export data', () => {
      const imageExport: LucidImageExport = {
        base64: 'iVBORw0KGgoAAAANSUhEUgAA...',
        contentType: 'image/png',
        size: 1024
      };

      expect(imageExport.base64).toBeTruthy();
      expect(imageExport.contentType).toBe('image/png');
      expect(imageExport.size).toBe(1024);
    });

    it('should accept different content types', () => {
      const pngExport: LucidImageExport = {
        base64: 'data',
        contentType: 'image/png',
        size: 100
      };

      const jpegExport: LucidImageExport = {
        base64: 'data',
        contentType: 'image/jpeg',
        size: 200
      };

      expect(pngExport.contentType).toBe('image/png');
      expect(jpegExport.contentType).toBe('image/jpeg');
    });

    it('should handle different size values', () => {
      const smallImage: LucidImageExport = {
        base64: 'small',
        contentType: 'image/png',
        size: 0
      };

      const largeImage: LucidImageExport = {
        base64: 'large',
        contentType: 'image/png',
        size: 999999
      };

      expect(smallImage.size).toBe(0);
      expect(largeImage.size).toBe(999999);
    });
  });

  describe('SearchDocumentsParams interface', () => {
    it('should accept empty params', () => {
      const params: SearchDocumentsParams = {};

      expect(params.keywords).toBeUndefined();
      expect(params.product).toBeUndefined();
      expect(params.limit).toBeUndefined();
    });

    it('should accept params with keywords', () => {
      const params: SearchDocumentsParams = {
        keywords: 'test search'
      };

      expect(params.keywords).toBe('test search');
    });

    it('should accept params with single product', () => {
      const params: SearchDocumentsParams = {
        product: ['lucidchart']
      };

      expect(params.product).toEqual(['lucidchart']);
    });

    it('should accept params with multiple products', () => {
      const params: SearchDocumentsParams = {
        product: ['lucidchart', 'lucidscale', 'lucidspark']
      };

      expect(params.product).toEqual(['lucidchart', 'lucidscale', 'lucidspark']);
    });

    it('should accept params with limit', () => {
      const params: SearchDocumentsParams = {
        limit: 50
      };

      expect(params.limit).toBe(50);
    });

    it('should accept all params together', () => {
      const params: SearchDocumentsParams = {
        keywords: 'flowchart',
        product: ['lucidchart'],
        limit: 10
      };

      expect(params.keywords).toBe('flowchart');
      expect(params.product).toEqual(['lucidchart']);
      expect(params.limit).toBe(10);
    });

    it('should handle edge cases for limit', () => {
      const zeroLimit: SearchDocumentsParams = { limit: 0 };
      const negativeLimit: SearchDocumentsParams = { limit: -1 };
      const largeLimit: SearchDocumentsParams = { limit: 999999 };

      expect(zeroLimit.limit).toBe(0);
      expect(negativeLimit.limit).toBe(-1);
      expect(largeLimit.limit).toBe(999999);
    });
  });

  describe('Utility Functions', () => {
    describe('isValidLucidDocument', () => {
      it('should return true for valid document', () => {
        const validDoc = { documentId: 'test-123' };
        expect(isValidLucidDocument(validDoc)).toBe(true);
      });      it('should return false for invalid documents', () => {
        expect(isValidLucidDocument(null)).toBe(false);
        expect(isValidLucidDocument(undefined)).toBe(false);
        expect(isValidLucidDocument({})).toBe(false);
        expect(isValidLucidDocument({ title: 'test' })).toBe(false);
        expect(isValidLucidDocument({ documentId: 123 })).toBe(false);
        expect(isValidLucidDocument({ documentId: '' })).toBe(false);
      });
    });

    describe('isDocumentTrashed', () => {
      it('should return true for trashed documents', () => {
        const trashedDoc: LucidDocument = {
          documentId: 'test',
          trashed: '2023-01-01T00:00:00Z'
        };
        expect(isDocumentTrashed(trashedDoc)).toBe(true);
      });

      it('should return false for non-trashed documents', () => {
        const activeDoc: LucidDocument = { documentId: 'test', trashed: null };
        const noTrashedField: LucidDocument = { documentId: 'test' };
        
        expect(isDocumentTrashed(activeDoc)).toBe(false);
        expect(isDocumentTrashed(noTrashedField)).toBe(false);
      });
    });

    describe('getDocumentDisplayName', () => {
      it('should return title when available', () => {
        const doc: LucidDocument = {
          documentId: 'test-123',
          title: 'My Document'
        };
        expect(getDocumentDisplayName(doc)).toBe('My Document');
      });

      it('should return documentId when title is not available', () => {
        const doc: LucidDocument = { documentId: 'test-123' };
        expect(getDocumentDisplayName(doc)).toBe('test-123');
      });

      it('should return documentId when title is empty', () => {
        const doc: LucidDocument = {
          documentId: 'test-123',
          title: ''
        };
        expect(getDocumentDisplayName(doc)).toBe('test-123');
      });
    });

    describe('filterDocumentsByProduct', () => {
      const documents: LucidDocument[] = [
        { documentId: '1', product: 'lucidchart' },
        { documentId: '2', product: 'lucidscale' },
        { documentId: '3', product: 'lucidspark' },
        { documentId: '4' } // no product
      ];

      it('should filter by single product', () => {
        const result = filterDocumentsByProduct(documents, ['lucidchart']);
        expect(result).toHaveLength(1);
        expect(result[0].documentId).toBe('1');
      });

      it('should filter by multiple products', () => {
        const result = filterDocumentsByProduct(documents, ['lucidchart', 'lucidspark']);
        expect(result).toHaveLength(2);
        expect(result.map(d => d.documentId)).toEqual(['1', '3']);
      });

      it('should return empty array when no matches', () => {
        const result = filterDocumentsByProduct(documents, []);
        expect(result).toHaveLength(0);
      });

      it('should exclude documents without product field', () => {
        const result = filterDocumentsByProduct(documents, ['lucidchart', 'lucidscale', 'lucidspark']);
        expect(result).toHaveLength(3);
        expect(result.map(d => d.documentId)).toEqual(['1', '2', '3']);
      });
    });

    describe('sortDocumentsByLastModified', () => {
      it('should sort documents by last modified date (newest first)', () => {
        const documents: LucidDocument[] = [
          { documentId: '1', lastModified: '2023-01-01T00:00:00Z' },
          { documentId: '2', lastModified: '2023-01-03T00:00:00Z' },
          { documentId: '3', lastModified: '2023-01-02T00:00:00Z' }
        ];

        const result = sortDocumentsByLastModified(documents);
        expect(result.map(d => d.documentId)).toEqual(['2', '3', '1']);
      });

      it('should handle documents without lastModified date', () => {
        const documents: LucidDocument[] = [
          { documentId: '1', lastModified: '2023-01-01T00:00:00Z' },
          { documentId: '2' },
          { documentId: '3', lastModified: '2023-01-02T00:00:00Z' }
        ];

        const result = sortDocumentsByLastModified(documents);
        expect(result[0].documentId).toBe('3'); // newest
        expect(result[1].documentId).toBe('1');
        expect(result[2].documentId).toBe('2'); // no date, goes last
      });

      it('should not modify original array', () => {
        const documents: LucidDocument[] = [
          { documentId: '1', lastModified: '2023-01-01T00:00:00Z' },
          { documentId: '2', lastModified: '2023-01-02T00:00:00Z' }
        ];

        const original = [...documents];
        sortDocumentsByLastModified(documents);
        expect(documents).toEqual(original);
      });
    });

    describe('createSearchResult', () => {
      it('should create search result with provided totalCount', () => {
        const documents: LucidDocument[] = [{ documentId: '1' }];
        const result = createSearchResult(documents, 10);
        
        expect(result.documents).toBe(documents);
        expect(result.totalCount).toBe(10);
      });

      it('should use documents length as totalCount when not provided', () => {
        const documents: LucidDocument[] = [
          { documentId: '1' },
          { documentId: '2' }
        ];
        const result = createSearchResult(documents);
        
        expect(result.documents).toBe(documents);
        expect(result.totalCount).toBe(2);
      });

      it('should handle empty documents array', () => {
        const result = createSearchResult([]);
        expect(result.documents).toHaveLength(0);
        expect(result.totalCount).toBe(0);
      });
    });

    describe('validateSearchParams', () => {
      it('should return no errors for valid params', () => {
        const params: SearchDocumentsParams = {
          keywords: 'test',
          product: ['lucidchart'],
          limit: 10
        };
        expect(validateSearchParams(params)).toHaveLength(0);
      });

      it('should validate limit range', () => {
        expect(validateSearchParams({ limit: -1 })).toContain('Limit must be between 0 and 1000');
        expect(validateSearchParams({ limit: 1001 })).toContain('Limit must be between 0 and 1000');
        expect(validateSearchParams({ limit: 0 })).toHaveLength(0);
        expect(validateSearchParams({ limit: 1000 })).toHaveLength(0);
      });

      it('should validate keywords length', () => {
        const longKeywords = 'a'.repeat(1001);
        expect(validateSearchParams({ keywords: longKeywords }))
          .toContain('Keywords must be less than 1000 characters');
        
        const validKeywords = 'a'.repeat(999);
        expect(validateSearchParams({ keywords: validKeywords })).toHaveLength(0);
      });

      it('should validate product array', () => {
        expect(validateSearchParams({ product: [] }))
          .toContain('Product array cannot be empty');
        
        expect(validateSearchParams({ product: ['lucidchart'] })).toHaveLength(0);
      });

      it('should return multiple errors', () => {
        const params: SearchDocumentsParams = {
          limit: -1,
          keywords: 'a'.repeat(1001),
          product: []
        };
        const errors = validateSearchParams(params);
        expect(errors).toHaveLength(3);
      });

      it('should handle undefined params', () => {
        expect(validateSearchParams({})).toHaveLength(0);
      });
    });
  });
});
