#!/usr/bin/env node

import 'dotenv/config';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "http";
import { randomUUID } from "crypto";
import { 
  getDocumentSchema, 
  getDocumentHandler,
  searchDocumentsSchema,
  searchDocumentsHandler
} from "./tools/index.js";
import { log } from "./utils/logger.js";

// Get version from package.json dynamically
function getVersion(): string {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const packagePath = join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
    return packageJson.version;
  } catch (error) {
    return '0.1.1'; // fallback version
  }
}

const VERSION = getVersion();

// Handle CLI arguments
function showHelp() {
  console.log(`
Lucid MCP Server v${VERSION}

DESCRIPTION:
  Model Context Protocol (MCP) server for Lucid App integration.
  Enables multimodal LLMs to access and analyze Lucid diagrams.

USAGE:
  lucid-mcp-server [options]

OPTIONS:
  --help, -h     Show this help message
  --version, -v  Show version information
  --transport, -t <stdio|streamable-http>  Select server transport (default: stdio)

ENVIRONMENT VARIABLES:
  LUCID_API_KEY              Required: Your Lucid API key
  AZURE_OPENAI_API_KEY       Optional: Azure OpenAI API key for AI analysis
  AZURE_OPENAI_ENDPOINT      Optional: Azure OpenAI endpoint
  AZURE_OPENAI_DEPLOYMENT_NAME Optional: Azure OpenAI deployment name
  MCP_SERVER_TRANSPORT        Optional: stdio or streamable-http
  MCP_HTTP_PORT               Optional: HTTP port for streamable-http (default: 3737)

TOOLS:
  get-document       Get document metadata and export images
  search-documents   Search for documents in your Lucid account

For more information, visit: https://github.com/smartzan63/lucid-mcp-server
`);
}

function showVersion() {
  console.log(VERSION);
}

// Check CLI arguments before starting server
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  showVersion();
  process.exit(0);
}

// Check required environment variables
if (!process.env.LUCID_API_KEY) {
  console.error('Error: LUCID_API_KEY environment variable is required');
  console.error('Set it with: export LUCID_API_KEY="your_api_key_here"');
  process.exit(1);
}

const server = new McpServer({
  name: "lucid-mcp-server",
  version: VERSION,
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register all tools with proper description
server.tool(
  "get-document",
  "Get a specific Lucid document by its ID. Extract document ID from Lucid URL or use known document ID. Supports image export and AI analysis of diagrams.",
  getDocumentSchema,
  getDocumentHandler
);

server.tool(
  "search-documents",
  "Search Lucid documents in your account returns document list with namesname and their IDs. Supports filtering by keywords",
  searchDocumentsSchema,
  searchDocumentsHandler
);

export function createTransport(type: string) {
  if (type === "streamable-http" || type === "http") {
    return new StreamableHTTPServerTransport({ sessionIdGenerator: () => randomUUID() });
  }
  return new StdioServerTransport();
}

async function main() {
  const argTransportIndex = args.findIndex((arg) => arg === "--transport" || arg === "-t");
  const cliTransport = argTransportIndex !== -1 ? args[argTransportIndex + 1] : undefined;
  const transportType = cliTransport || process.env.MCP_SERVER_TRANSPORT || "stdio";
  const transport = createTransport(transportType);

  await server.connect(transport);

  if (transport instanceof StreamableHTTPServerTransport) {
    const port = parseInt(process.env.MCP_HTTP_PORT || "3737", 10);
    const httpServer = createServer(async (req, res) => {
      try {
        await transport.handleRequest(req, res);
      } catch (err: any) {
        log.error("HTTP transport error:", err);
        if (!res.headersSent) {
          res.writeHead(500).end();
        }
      }
    });
    httpServer.listen(port, () => {
      log.info(`Lucid MCP Server running on HTTP port ${port}`);
    });
  } else {
    log.info("Lucid MCP Server running on stdio");
  }
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((error) => {
    log.error("Fatal error in main():", error);
    process.exit(1);
  });
}
