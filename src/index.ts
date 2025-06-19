#!/usr/bin/env node

import 'dotenv/config';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { 
  getDocumentSchema, 
  getDocumentHandler,
  searchDocumentsSchema,
  searchDocumentsHandler
} from "./tools/index.js";
import { log } from "./utils/logger.js";

// Handle CLI arguments
function showHelp() {
  console.log(`
Lucid MCP Server v0.1.0

DESCRIPTION:
  Model Context Protocol (MCP) server for Lucid App integration.
  Enables multimodal LLMs to access and analyze Lucid diagrams.

USAGE:
  lucid-mcp-server [options]

OPTIONS:
  --help, -h     Show this help message
  --version, -v  Show version information

ENVIRONMENT VARIABLES:
  LUCID_API_KEY              Required: Your Lucid API key
  AZURE_OPENAI_API_KEY       Optional: Azure OpenAI API key for AI analysis
  AZURE_OPENAI_ENDPOINT      Optional: Azure OpenAI endpoint
  AZURE_OPENAI_DEPLOYMENT_NAME Optional: Azure OpenAI deployment name

TOOLS:
  get-document       Get document metadata and export images
  search-documents   Search for documents in your Lucid account

For more information, visit: https://github.com/smartzan63/lucid-mcp-server
`);
}

function showVersion() {
  console.log("0.1.0");
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
  version: "0.1.0",
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log.info("Lucid MCP Server running on stdio");
}

main().catch((error) => {
  log.error("Fatal error in main():", error);
  process.exit(1);
});
