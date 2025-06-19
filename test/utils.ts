import { vi, expect } from 'vitest';
import { mockEnvironmentVariables } from './fixtures/data.js';

export function setupTestEnvironment() {
  Object.entries(mockEnvironmentVariables).forEach(([key, value]) => {
    vi.stubEnv(key, value);
  });
}

export function resetTestEnvironment() {
  Object.keys(mockEnvironmentVariables).forEach((key) => {
    vi.unstubAllEnvs();
  });
}

export function createHttpMockResponse(data: any, status = 200) {
  const headers = new Map([['content-type', 'application/json']]);
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: (key: string) => headers.get(key.toLowerCase()),
      set: (key: string, value: string) => headers.set(key.toLowerCase(), value)
    },
    json: vi.fn().mockResolvedValue(data),
    text: vi.fn().mockResolvedValue(JSON.stringify(data)),
    arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
  };
}

export function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function expectToMatchSnapshot(received: any, snapshotName?: string) {
  expect(received).toMatchSnapshot(snapshotName);
}
