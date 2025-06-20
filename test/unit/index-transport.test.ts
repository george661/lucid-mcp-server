import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupTestEnvironment, resetTestEnvironment } from '../utils.js';

vi.mock('@modelcontextprotocol/sdk/server/stdio.js', () => {
  return { StdioServerTransport: vi.fn(() => ({ kind: 'stdio' })) };
});

vi.mock('@modelcontextprotocol/sdk/server/streamableHttp.js', () => {
  return { StreamableHTTPServerTransport: vi.fn(() => ({ kind: 'http' })) };
});

describe('createTransport', () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    resetTestEnvironment();
  });

  it('creates stdio transport by default', async () => {
    const { createTransport } = await import('../../src/index.js');
    const transport: any = createTransport('stdio');
    expect(transport.kind).toBe('stdio');
  });

  it('creates streamable-http transport when requested', async () => {
    const { createTransport } = await import('../../src/index.js');
    const transport: any = createTransport('streamable-http');
    expect(transport.kind).toBe('http');
  });
});
