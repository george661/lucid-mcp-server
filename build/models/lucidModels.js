// src/models/lucidModels.ts
// Lucid API data models
// Utility functions for working with Lucid models
/**
 * Check if a document is valid (has required fields)
 */
export function isValidLucidDocument(doc) {
    return doc !== null && doc !== undefined && typeof doc === 'object' && typeof doc.documentId === 'string' && doc.documentId.length > 0;
}
/**
 * Check if a document is trashed
 */
export function isDocumentTrashed(doc) {
    return doc.trashed !== null && doc.trashed !== undefined;
}
/**
 * Get document display name (title or document ID)
 */
export function getDocumentDisplayName(doc) {
    return doc.title || doc.documentId;
}
/**
 * Filter documents by product type
 */
export function filterDocumentsByProduct(documents, products) {
    return documents.filter(doc => doc.product && products.includes(doc.product));
}
/**
 * Sort documents by last modified date (newest first)
 */
export function sortDocumentsByLastModified(documents) {
    return [...documents].sort((a, b) => {
        if (!a.lastModified)
            return 1;
        if (!b.lastModified)
            return -1;
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    });
}
/**
 * Create a minimal search result
 */
export function createSearchResult(documents, totalCount) {
    return {
        documents,
        totalCount: totalCount ?? documents.length
    };
}
/**
 * Validate search parameters
 */
export function validateSearchParams(params) {
    const errors = [];
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
