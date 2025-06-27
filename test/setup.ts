import { vi } from 'vitest';

vi.mock('../src/utils/logger.js', () => ({
  log: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  },
}));
