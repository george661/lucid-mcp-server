#!/usr/bin/env node

import 'dotenv/config';
import { getVersion } from "./config/version.js";
import { handleCliArgs } from "./cli/cli-handler.js";
import { validateEnvironment, exitWithEnvErrors } from "./config/env-validator.js";
import { createMcpServer, startMcpServer } from "./server/mcp-setup.js";
import { log } from "./utils/logger.js";

async function main() {
  // Get version
  const version = getVersion();

  // Handle CLI arguments (exits if --help or --version)
  handleCliArgs(process.argv.slice(2), version);

  // Validate environment
  const envValidation = validateEnvironment();
  if (!envValidation.valid) {
    exitWithEnvErrors(envValidation.errors);
  }

  // Create and start server
  const server = createMcpServer(version);
  await startMcpServer(server);
}

// Export main for testing
export { main };

// Only run main if this is the entry point and not in test environment
if (typeof process !== 'undefined' && 
    !process.env.NODE_ENV?.includes('test') && 
    !process.env.VITEST &&
    (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('index.js'))) {
  main().catch((error) => {
    log.error("Fatal error in main():", error);
    process.exit(1);
  });
}
