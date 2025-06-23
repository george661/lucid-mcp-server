/**
 * @file Unit tests for version configuration module
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'fs';
import { getVersion } from '../../../src/config/version.js';

// Mock fs module
vi.mock('fs');
const mockReadFileSync = vi.mocked(readFileSync);

describe('Version Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getVersion', () => {
    it('should return correct version from package.json', () => {
      mockReadFileSync.mockReturnValue(JSON.stringify({
        version: '0.1.3',
        name: 'lucid-mcp-server'
      }));

      const version = getVersion();
      
      expect(version).toBe('0.1.3');
      expect(mockReadFileSync).toHaveBeenCalledWith(
        expect.stringContaining('package.json'),
        'utf-8'
      );
    });

    it('should return fallback version on file read error', () => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      const version = getVersion();
      
      expect(version).toBe('0.1.1');
      expect(mockReadFileSync).toHaveBeenCalled();
    });

    it('should return fallback version on JSON parse error', () => {
      mockReadFileSync.mockReturnValue('invalid json');

      const version = getVersion();
      
      expect(version).toBe('0.1.1');
      expect(mockReadFileSync).toHaveBeenCalled();
    });

    it('should return fallback version if version field is missing', () => {
      mockReadFileSync.mockReturnValue(JSON.stringify({
        name: 'lucid-mcp-server'
        // version field missing
      }));

      const version = getVersion();
      
      expect(version).toBe('0.1.1');
      expect(mockReadFileSync).toHaveBeenCalled();
    });    it('should handle empty version field', () => {
      mockReadFileSync.mockReturnValue(JSON.stringify({
        version: '',
        name: 'lucid-mcp-server'
      }));

      const version = getVersion();
      
      expect(version).toBe('0.1.1'); // Empty version should fallback to default
    });

    it('should handle version with special characters', () => {
      mockReadFileSync.mockReturnValue(JSON.stringify({
        version: '0.1.3-beta.1+build.123',
        name: 'lucid-mcp-server'
      }));

      const version = getVersion();
      
      expect(version).toBe('0.1.3-beta.1+build.123');
    });
  });
});
