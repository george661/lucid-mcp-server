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
