/**
 * @file Unit tests for CLI handler module
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  parseCliArgs, 
  showHelp, 
  showVersion, 
  handleCliArgs 
} from '../../../src/cli/cli-handler.js';

describe('CLI Handler', () => {
  let mockConsoleLog: any;
  let mockExit: any;

  beforeEach(() => {
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockExit = vi.spyOn(process, 'exit').mockImplementation((() => { 
      throw new Error('process.exit'); 
    }) as any);
  });

  afterEach(() => {
    mockConsoleLog.mockRestore();
    mockExit.mockRestore();
  });

  describe('parseCliArgs', () => {
    it('should parse help flags correctly', () => {
      expect(parseCliArgs(['--help'])).toEqual({ help: true, version: false });
      expect(parseCliArgs(['-h'])).toEqual({ help: true, version: false });
      expect(parseCliArgs(['--help', 'other'])).toEqual({ help: true, version: false });
    });

    it('should parse version flags correctly', () => {
      expect(parseCliArgs(['--version'])).toEqual({ help: false, version: true });
      expect(parseCliArgs(['-v'])).toEqual({ help: false, version: true });
      expect(parseCliArgs(['--version', 'other'])).toEqual({ help: false, version: true });
    });

    it('should handle both help and version flags', () => {
      expect(parseCliArgs(['--help', '--version'])).toEqual({ help: true, version: true });
      expect(parseCliArgs(['-h', '-v'])).toEqual({ help: true, version: true });
    });

    it('should handle no flags', () => {
      expect(parseCliArgs([])).toEqual({ help: false, version: false });
      expect(parseCliArgs(['other', 'args'])).toEqual({ help: false, version: false });
    });

    it('should handle mixed case and similar flags', () => {
      expect(parseCliArgs(['--Help'])).toEqual({ help: false, version: false });
      expect(parseCliArgs(['--help2'])).toEqual({ help: false, version: false });
      expect(parseCliArgs(['-help'])).toEqual({ help: false, version: false });
    });

    it('should handle duplicate flags', () => {
      expect(parseCliArgs(['--help', '--help'])).toEqual({ help: true, version: false });
      expect(parseCliArgs(['-v', '--version'])).toEqual({ help: false, version: true });
    });
  });

  describe('showHelp', () => {
    it('should display help message with version', () => {
      showHelp('1.2.3');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Lucid MCP Server v1.2.3')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('DESCRIPTION:')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('USAGE:')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('OPTIONS:')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('ENVIRONMENT VARIABLES:')
      );
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('TOOLS:')
      );
    });

    it('should handle empty version', () => {
      showHelp('');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Lucid MCP Server v')
      );
    });

    it('should handle special characters in version', () => {
      showVersion('1.0.0-beta.1+build.123');

      expect(mockConsoleLog).toHaveBeenCalledWith('1.0.0-beta.1+build.123');
    });
  });

  describe('showVersion', () => {
    it('should display version', () => {
      showVersion('1.2.3');

      expect(mockConsoleLog).toHaveBeenCalledWith('1.2.3');
    });

    it('should handle empty version', () => {
      showVersion('');

      expect(mockConsoleLog).toHaveBeenCalledWith('');
    });
  });

  describe('handleCliArgs', () => {
    it('should show help and exit when help flag is present', () => {
      expect(() => {
        handleCliArgs(['--help'], '1.2.3');
      }).toThrow('process.exit');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Lucid MCP Server v1.2.3')
      );
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should show help and exit when -h flag is present', () => {
      expect(() => {
        handleCliArgs(['-h'], '1.2.3');
      }).toThrow('process.exit');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Lucid MCP Server v1.2.3')
      );
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should show version and exit when version flag is present', () => {
      expect(() => {
        handleCliArgs(['--version'], '1.2.3');
      }).toThrow('process.exit');

      expect(mockConsoleLog).toHaveBeenCalledWith('1.2.3');
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should show version and exit when -v flag is present', () => {
      expect(() => {
        handleCliArgs(['-v'], '1.2.3');
      }).toThrow('process.exit');

      expect(mockConsoleLog).toHaveBeenCalledWith('1.2.3');
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should prioritize help over version when both are present', () => {
      expect(() => {
        handleCliArgs(['--help', '--version'], '1.2.3');
      }).toThrow('process.exit');

      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Lucid MCP Server v1.2.3')
      );
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should return true when no flags are present', () => {
      const result = handleCliArgs([], '1.2.3');
      expect(result).toBe(true);
      expect(mockExit).not.toHaveBeenCalled();
    });

    it('should return true when other args are present', () => {
      const result = handleCliArgs(['other', 'args'], '1.2.3');
      expect(result).toBe(true);
      expect(mockExit).not.toHaveBeenCalled();
    });
  });
});
