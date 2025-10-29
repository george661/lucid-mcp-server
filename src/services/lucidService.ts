// src/services/lucidService.ts
// Lucid API service using direct fetch calls

import { log } from '../utils/logger.js';

export interface LucidImageExport {
  base64: string;
  contentType: string;
  size: number;
}

export class LucidService {
  private apiKey: string;
  private baseUrl: string = 'https://api.lucid.co';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.LUCID_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('Lucid API key is required. Set LUCID_API_KEY environment variable or pass apiKey parameter.');
    }
  }

  private async fetchLucidAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Lucid-Api-Version': '1',
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(`Lucid API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
  /**
   * Search for documents using keywords
   */
  async searchDocuments(keywords?: string, product: string[] = ['lucidchart', 'lucidscale', 'lucidspark']) {
    const searchBody: any = { product };

    if (keywords && keywords.trim()) {
      searchBody.keywords = keywords.trim();
      log.info(`Searching for documents with keywords: "${keywords.trim()}"`);
    } else {
      log.info('Searching for all documents (no keywords)');
    }

    log.debug('Lucid API search request:', { body: searchBody });

    try {
      const data = await this.fetchLucidAPI('/documents', {
        method: 'POST',
        body: JSON.stringify(searchBody)
      });

      log.debug('Lucid API search response:', {
        dataType: typeof data,
        dataLength: Array.isArray(data) ? data.length : 'not array'
      });

      const documents = Array.isArray(data) ? data : [];
      log.info(`Search returned ${documents.length} documents`);

      if (documents.length > 0) {
        log.debug('Found documents:', documents.map((doc: any) => ({
          id: doc.documentId,
          title: doc.title,
          product: doc.product
        })));
      }

      return data;
    } catch (error: any) {
      log.error('Lucid API search failed:', error);
      throw new Error(`Failed to search documents: ${error.message}`);
    }
  }
  /**
   * Get document metadata by ID
   */
  async getDocument(documentId: string) {
    if (!documentId) {
      throw new Error('Document ID is required');
    }

    log.debug('Lucid API get document request:', { documentId });

    try {
      const data = await this.fetchLucidAPI(`/documents/${documentId}`);

      log.debug('Lucid API get document response:', {
        documentId: data.documentId
      });

      return data;
    } catch (error: any) {
      log.error('Lucid API get document failed:', error);
      throw new Error(`Failed to get document ${documentId}: ${error.message}`);
    }
  }

  /**
   * Get document contents (includes page metadata)
   */
  async getDocumentContent(documentId: string) {
    if (!documentId) {
      throw new Error('Document ID is required');
    }

    log.debug('Lucid API get document content request:', { documentId });

    try {
      const data = await this.fetchLucidAPI(`/documents/${documentId}/content`);

      log.debug('Lucid API get document content response:', {
        documentId: data.id,
        pageCount: data.pages?.length || 0
      });

      return data;
    } catch (error: any) {
      log.error('Lucid API get document content failed:', error);
      throw new Error(`Failed to get document content ${documentId}: ${error.message}`);
    }
  }

  /**
   * Export document as PNG image
   */
  async exportDocumentAsPng(documentId: string, pageId: string = '0_0'): Promise<LucidImageExport> {
    if (!documentId) {
      throw new Error('Document ID is required');
    }
    
    log.debug('Exporting document as PNG:', { documentId, pageId });
    
    try {
      // Use direct fetch for image export as SDK might not support this properly
      const url = `https://api.lucid.co/documents/${documentId}?pageId=${pageId}`;
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Lucid-Api-Version": "1",
          "Accept": "image/png",
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to export document as PNG: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type') || 'image/png';
      if (!contentType.includes('image/')) {
        throw new Error(`Expected image, got: ${contentType}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      log.debug('PNG export successful:', { 
        contentType, 
        size: buffer.length,
        documentId 
      });
      
      return {
        base64: buffer.toString('base64'),
        contentType,
        size: buffer.length
      };
    } catch (error: any) {
      log.error('PNG export failed:', error);
      throw new Error(`Failed to export document ${documentId} as PNG: ${error.message}`);
    }
  }
}

// Export singleton instance for convenience - lazy initialization
let _lucidServiceInstance: LucidService | null = null;

export const lucidService = {
  get instance(): LucidService {
    if (!_lucidServiceInstance) {
      _lucidServiceInstance = new LucidService();
    }
    return _lucidServiceInstance;
  },
  
  // For testing - allow resetting the singleton
  resetInstance(): void {
    _lucidServiceInstance = null;
  }
};
