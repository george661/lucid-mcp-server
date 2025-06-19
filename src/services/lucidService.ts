// src/services/lucidService.ts
// Lucid API service using official SDK

import lucidDeveloperDocs from '../../.api/apis/lucid-developer-docs/index.js';
import { log } from '../utils/logger.js';

export interface LucidImageExport {
  base64: string;
  contentType: string;
  size: number;
}

export class LucidService {
  private apiKey: string;
  private sdk: any; // Use any to bypass TypeScript issues

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.LUCID_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('Lucid API key is required. Set LUCID_API_KEY environment variable or pass apiKey parameter.');
    }
    
    // Set up authentication - lucidDeveloperDocs is already an instance
    this.sdk = lucidDeveloperDocs;
    this.sdk.auth(this.apiKey);
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
    
    log.debug('Lucid SDK search request:', { body: searchBody });
    
    try {
      const { data } = await this.sdk.searchDocuments(searchBody, {
        'Lucid-Api-Version': '1'
      });
      
      log.debug('Lucid SDK search response:', { 
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
      log.error('Lucid SDK search failed:', error);
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
    
    log.debug('Lucid SDK get document request:', { documentId });
    
    try {
      const { data } = await this.sdk.getOrExportDocument({
        id: documentId,
        'Lucid-Api-Version': '1'
      });
      
      log.debug('Lucid SDK get document response:', { 
        documentId: data.documentId 
      });
      
      return data;
    } catch (error: any) {
      log.error('Lucid SDK get document failed:', error);
      throw new Error(`Failed to get document ${documentId}: ${error.message}`);
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
