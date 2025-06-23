// src/models/lucidModels.ts
// Lucid API data models

export interface LucidDocument {
  documentId: string;
  title?: string;
  editUrl?: string;
  viewUrl?: string;
  version?: number;
  pageCount?: number;
  canEdit?: boolean;
  creatorId?: number;
  lastModified?: string;
  lastModifiedUserId?: number;
  trashed?: string | null;
  status?: string;
  classification?: string | null;
  customAttributes?: any[];
  customTags?: string[];
  product?: 'lucidchart' | 'lucidscale' | 'lucidspark';
  created?: string;
  owner?: {
    id: number;
    type: string;
    name?: string;
  };
  parent?: number;
}

export interface LucidSearchResult {
  documents: LucidDocument[];
  totalCount?: number;
}

export interface LucidImageExport {
  base64: string;
  contentType: string;
  size: number;
}

export interface SearchDocumentsParams {
  keywords?: string;
  product?: ('lucidchart' | 'lucidscale' | 'lucidspark')[];
  limit?: number;
}

// Utility functions for working with Lucid models

/**
 * Check if a document is valid (has required fields)
 */
export function isValidLucidDocument(doc: any): doc is LucidDocument {
  return doc !== null && doc !== undefined && typeof doc === 'object' && typeof doc.documentId === 'string' && doc.documentId.length > 0;
}

/**
 * Check if a document is trashed
 */
export function isDocumentTrashed(doc: LucidDocument): boolean {
  return doc.trashed !== null && doc.trashed !== undefined;
}

/**
 * Get document display name (title or document ID)
 */
export function getDocumentDisplayName(doc: LucidDocument): string {
  return doc.title || doc.documentId;
}

/**
 * Filter documents by product type
 */
export function filterDocumentsByProduct(
  documents: LucidDocument[],
  products: ('lucidchart' | 'lucidscale' | 'lucidspark')[]
): LucidDocument[] {
  return documents.filter(doc => doc.product && products.includes(doc.product));
}

/**
 * Sort documents by last modified date (newest first)
 */
export function sortDocumentsByLastModified(documents: LucidDocument[]): LucidDocument[] {
  return [...documents].sort((a, b) => {
    if (!a.lastModified) return 1;
    if (!b.lastModified) return -1;
    return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
  });
}

/**
 * Create a minimal search result
 */
export function createSearchResult(documents: LucidDocument[], totalCount?: number): LucidSearchResult {
  return {
    documents,
    totalCount: totalCount ?? documents.length
  };
}

/**
 * Validate search parameters
 */
export function validateSearchParams(params: SearchDocumentsParams): string[] {
  const errors: string[] = [];

  if (params.limit !== undefined && (params.limit < 0 || params.limit > 1000)) {
    errors.push('Limit must be between 0 and 1000');
  }

  if (params.keywords !== undefined && params.keywords.length > 1000) {
    errors.push('Keywords must be less than 1000 characters');
  }

  if (params.product !== undefined && params.product.length === 0) {
    errors.push('Product array cannot be empty');
  }

  return errors;
}
