/**
 * @file Integration tests for main index module
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Main Index Integration', () => {
  let originalArgv: string[];
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalArgv = [...process.argv];
    originalEnv = { ...process.env };
    vi.clearAllMocks();
    // Clear module cache
    vi.resetModules();
  });

  afterEach(() => {
    process.argv = originalArgv;
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  describe('CLI Integration', () => {
    it('should handle CLI arguments and call handleCliArgs', async () => {
      process.argv = ['node', 'index.js', '--help'];

      // Mock all dependencies for this test
      vi.doMock('../../src/config/version.js', () => ({
        getVersion: vi.fn().mockReturnValue('1.0.0-test')
      }));

      vi.doMock('../../src/cli/cli-handler.js', () => ({
        handleCliArgs: vi.fn().mockImplementation(() => {
          throw new Error('process.exit');
        })
      }));

      vi.doMock('../../src/config/env-validator.js', () => ({
        validateEnvironment: vi.fn().mockReturnValue({ valid: true, errors: [] }),
        exitWithEnvErrors: vi.fn()
      }));

      vi.doMock('../../src/server/mcp-setup.js', () => ({
        createMcpServer: vi.fn().mockReturnValue({}),
        startMcpServer: vi.fn().mockResolvedValue(undefined)
      }));

      vi.doMock('../../src/utils/logger.js', () => ({
        log: { error: vi.fn(), info: vi.fn() }
      }));

      const { main } = await import('../../src/index.js');
      const { handleCliArgs } = await import('../../src/cli/cli-handler.js');

      await expect(main()).rejects.toThrow('process.exit');
      expect(handleCliArgs).toHaveBeenCalledWith(['--help'], '1.0.0-test');
    });

    it('should validate environment when no CLI flags', async () => {
      process.argv = ['node', 'index.js'];

      vi.doMock('../../src/config/version.js', () => ({
        getVersion: vi.fn().mockReturnValue('1.0.0-test')
      }));

      vi.doMock('../../src/cli/cli-handler.js', () => ({
        handleCliArgs: vi.fn() // Normal call, don't throw
      }));

      vi.doMock('../../src/config/env-validator.js', () => ({
        validateEnvironment: vi.fn().mockReturnValue({ 
          valid: false, 
          errors: ['LUCID_API_KEY environment variable is required'] 
        }),
        exitWithEnvErrors: vi.fn().mockImplementation(() => {
          throw new Error('process.exit');
        })
      }));

      vi.doMock('../../src/server/mcp-setup.js', () => ({
        createMcpServer: vi.fn().mockReturnValue({}),
        startMcpServer: vi.fn().mockResolvedValue(undefined)
      }));

      vi.doMock('../../src/utils/logger.js', () => ({
        log: { error: vi.fn(), info: vi.fn() }
      }));

      const { main } = await import('../../src/index.js');
      const { validateEnvironment, exitWithEnvErrors } = await import('../../src/config/env-validator.js');

      await expect(main()).rejects.toThrow('process.exit');
      
      expect(validateEnvironment).toHaveBeenCalled();
      expect(exitWithEnvErrors).toHaveBeenCalledWith(['LUCID_API_KEY environment variable is required']);
    });
  });

  describe('Server Integration', () => {
    it('should start server with valid environment', async () => {
      process.argv = ['node', 'index.js'];
      process.env.LUCID_API_KEY = 'valid-api-key';

      vi.doMock('../../src/config/version.js', () => ({
        getVersion: vi.fn().mockReturnValue('1.0.0-test')
      }));

      vi.doMock('../../src/cli/cli-handler.js', () => ({
        handleCliArgs: vi.fn() // Normal call, don't throw
      }));

      vi.doMock('../../src/config/env-validator.js', () => ({
        validateEnvironment: vi.fn().mockReturnValue({ valid: true, errors: [] }),
        exitWithEnvErrors: vi.fn()
      }));

      vi.doMock('../../src/server/mcp-setup.js', () => ({
        createMcpServer: vi.fn().mockReturnValue({}),
        startMcpServer: vi.fn().mockResolvedValue(undefined)
      }));

      vi.doMock('../../src/utils/logger.js', () => ({
        log: { error: vi.fn(), info: vi.fn() }
      }));

      const { main } = await import('../../src/index.js');
      const { validateEnvironment } = await import('../../src/config/env-validator.js');
      const { createMcpServer, startMcpServer } = await import('../../src/server/mcp-setup.js');

      await main();
      
      expect(validateEnvironment).toHaveBeenCalled();
      expect(createMcpServer).toHaveBeenCalledWith('1.0.0-test');
      expect(startMcpServer).toHaveBeenCalled();
    });

    it('should handle server startup errors', async () => {
      process.argv = ['node', 'index.js'];
      process.env.LUCID_API_KEY = 'valid-api-key';

      vi.doMock('../../src/config/version.js', () => ({
        getVersion: vi.fn().mockReturnValue('1.0.0-test')
      }));

      vi.doMock('../../src/cli/cli-handler.js', () => ({
        handleCliArgs: vi.fn() // Normal call, don't throw
      }));

      vi.doMock('../../src/config/env-validator.js', () => ({
        validateEnvironment: vi.fn().mockReturnValue({ valid: true, errors: [] }),
        exitWithEnvErrors: vi.fn()
      }));

      vi.doMock('../../src/server/mcp-setup.js', () => ({
        createMcpServer: vi.fn().mockReturnValue({}),
        startMcpServer: vi.fn().mockRejectedValue(new Error('Server failed'))
      }));

      vi.doMock('../../src/utils/logger.js', () => ({
        log: { error: vi.fn(), info: vi.fn() }
      }));

      const { main } = await import('../../src/index.js');
      const { createMcpServer, startMcpServer } = await import('../../src/server/mcp-setup.js');

      await expect(main()).rejects.toThrow('Server failed');
      
      expect(createMcpServer).toHaveBeenCalled();
      expect(startMcpServer).toHaveBeenCalled();
    });
  });
});
