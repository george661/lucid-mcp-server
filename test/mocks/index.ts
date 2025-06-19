import { vi } from 'vitest';

export const createMockLucidApi = () => ({
  getDocument: vi.fn(),
  searchDocuments: vi.fn(),
  exportDocument: vi.fn(),
});

export const createMockLLMProvider = () => ({
  name: 'mock-provider',
  isAvailable: vi.fn().mockReturnValue(true),
  analyzeImage: vi.fn(),
  getConfig: vi.fn().mockReturnValue({}),
  updateConfig: vi.fn(),
});

export const createMockImageAnalyzer = () => ({
  analyzeImage: vi.fn(),
});

export const createMockMCPServer = () => ({
  connect: vi.fn(),
  request: vi.fn(),
  notification: vi.fn(),
  close: vi.fn(),
});
