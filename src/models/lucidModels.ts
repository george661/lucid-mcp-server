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
