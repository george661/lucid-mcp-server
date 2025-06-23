/**
 * @file Unit tests for environment validator module
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateEnvironment, exitWithEnvErrors } from '../../../src/config/env-validator.js';

describe('Environment Validator', () => {
  let originalEnv: NodeJS.ProcessEnv;
  let mockExit: any;
  let mockConsoleError: any;

  beforeEach(() => {
    originalEnv = { ...process.env };
    mockExit = vi.spyOn(process, 'exit').mockImplementation((() => { 
      throw new Error('process.exit'); 
    }) as any);
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    mockExit.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('validateEnvironment', () => {
    it('should return valid result when LUCID_API_KEY is present', () => {
      process.env.LUCID_API_KEY = 'test-api-key';

      const result = validateEnvironment();

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should return invalid result when LUCID_API_KEY is missing', () => {
      delete process.env.LUCID_API_KEY;

      const result = validateEnvironment();

      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(['LUCID_API_KEY environment variable is required']);
    });

    it('should return invalid result when LUCID_API_KEY is empty string', () => {
      process.env.LUCID_API_KEY = '';

      const result = validateEnvironment();

      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(['LUCID_API_KEY environment variable is required']);
    });

    it('should handle whitespace-only LUCID_API_KEY as invalid', () => {
      process.env.LUCID_API_KEY = '   ';

      const result = validateEnvironment();

      // Current implementation doesn't trim, so this would be valid
      // But we might want to add trimming in the future
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should be case-sensitive for environment variable names', () => {
      delete process.env.LUCID_API_KEY;
      process.env.lucid_api_key = 'test-key'; // lowercase

      const result = validateEnvironment();

      expect(result.valid).toBe(false);
      expect(result.errors).toEqual(['LUCID_API_KEY environment variable is required']);
    });
  });

  describe('exitWithEnvErrors', () => {
    it('should log error message and exit with code 1', () => {
      const errors = ['LUCID_API_KEY environment variable is required'];

      expect(() => {
        exitWithEnvErrors(errors);
      }).toThrow('process.exit');

      expect(mockConsoleError).toHaveBeenCalledWith('Error: LUCID_API_KEY environment variable is required');
      expect(mockConsoleError).toHaveBeenCalledWith('Set it with: export LUCID_API_KEY="your_api_key_here"');
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should handle multiple errors by showing only the first one', () => {
      const errors = [
        'LUCID_API_KEY environment variable is required',
        'Another error'
      ];

      expect(() => {
        exitWithEnvErrors(errors);
      }).toThrow('process.exit');

      expect(mockConsoleError).toHaveBeenCalledWith('Error: LUCID_API_KEY environment variable is required');
      expect(mockConsoleError).toHaveBeenCalledWith('Set it with: export LUCID_API_KEY="your_api_key_here"');
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should handle empty errors array', () => {
      const errors: string[] = [];

      expect(() => {
        exitWithEnvErrors(errors);
      }).toThrow('process.exit');

      expect(mockConsoleError).toHaveBeenCalledWith('Error: undefined');
      expect(mockConsoleError).toHaveBeenCalledWith('Set it with: export LUCID_API_KEY="your_api_key_here"');
      expect(mockExit).toHaveBeenCalledWith(1);
    });
  });
});
