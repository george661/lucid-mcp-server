/**
 * Simple logging utilities for MCP server
 *
 * IMPORTANT: MCP Inspector expects ONLY protocol JSON on stdout (stdio transport)!
 * All logs must go to stderr, otherwise the inspector will crash with a parsing error.
 */

export const log = {
  info: (message: string, ...args: any[]) => {
    process.stderr.write(`[INFO] ${message} ${args.map(String).join(' ')}\n`);
  },

  error: (message: string, ...args: any[]) => {
    process.stderr.write(`[ERROR] ${message} ${args.map(String).join(' ')}\n`);
  },

  debug: (message: string, ...args: any[]) => {
    if (process.env.DEBUG) {
      process.stderr.write(`[DEBUG] ${message} ${args.map(String).join(' ')}\n`);
    }
  }
};
