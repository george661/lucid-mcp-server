import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupTestEnvironment, resetTestEnvironment } from '../../utils.js';

describe('tools/index', () => {
  beforeEach(() => {
    setupTestEnvironment();
    vi.clearAllMocks();
  });

  afterEach(() => {
    resetTestEnvironment();
  });

  it('should export getDocument tools', async () => {
    const module = await import('../../../src/tools/index.js');
    
    expect(module.getDocumentSchema).toBeDefined();
    expect(module.getDocumentHandler).toBeDefined();
    expect(typeof module.getDocumentHandler).toBe('function');
  });
  it('should export searchDocuments tools', async () => {
    const module = await import('../../../src/tools/index.js');
    
    expect(module.searchDocumentsSchema).toBeDefined();
    expect(module.searchDocumentsHandler).toBeDefined();
    expect(typeof module.searchDocumentsHandler).toBe('function');
  });
});
