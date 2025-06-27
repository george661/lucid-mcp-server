import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.unmock('../../../src/utils/logger.js');

// Important: import the logger dynamically after the stderr moc to make the tests work correctly

describe('logger', () => {
  let output: string[] = [];
  let originalWrite: typeof process.stderr.write;
  let log: typeof import('../../../src/utils/logger.js').log;

  beforeEach(async () => {
    output = [];
    originalWrite = process.stderr.write;
    // @ts-ignore
    process.stderr.write = (str: string) => { output.push(str); return true; };
    // Dynamic import of the logger after mocking
    log = (await import('../../../src/utils/logger.js')).log;
  });

  afterEach(() => {
    process.stderr.write = originalWrite;
  });

  describe('info', () => {
    it('should log info messages to stderr', () => {
      log.info('Test message');
      expect(output.join('')).toContain('[INFO] Test message');
    });

    it('should log info messages with additional arguments', () => {
      log.info('Test message', 'arg1', 123);
      expect(output.join('')).toContain('[INFO] Test message arg1 123');
    });
  });

  describe('error', () => {
    it('should log error messages to stderr', () => {
      log.error('Error message');
      expect(output.join('')).toContain('[ERROR] Error message');
    });

    it('should log error messages with additional arguments', () => {
      const errorObj = new Error('Test error');
      log.error('Error message', errorObj);
      expect(output.join('')).toContain('[ERROR] Error message Error: Test error');
    });
  });

  describe('debug', () => {
    it('should log debug messages to stderr if DEBUG is set', () => {
      process.env.DEBUG = '1';
      log.debug('Debug message');
      expect(output.join('')).toContain('[DEBUG] Debug message');
    });

    it('should log debug messages with additional arguments if DEBUG is set', () => {
      process.env.DEBUG = '1';
      log.debug('Debug message', 'arg1', 42);
      expect(output.join('')).toContain('[DEBUG] Debug message arg1 42');
    });

    it('should not log debug messages if DEBUG is not set', () => {
      delete process.env.DEBUG;
      log.debug('Debug message');
      expect(output.join('')).not.toContain('[DEBUG] Debug message');
    });
  });
});
