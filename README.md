# Lucid MCP Server

[![npm version](https://img.shields.io/npm/v/lucid-mcp-server.svg)](https://www.npmjs.com/package/lucid-mcp-server)
[![npm downloads](https://img.shields.io/npm/dm/lucid-mcp-server.svg)](https://www.npmjs.com/package/lucid-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Model Context Protocol (MCP) server for Lucid App integration. Enables multimodal LLMs to access and analyze Lucid diagrams through visual exports.

## Features

- 🔍 Document discovery and metadata retrieval from LucidChart, LucidSpark, and LucidScale
- 🖼️ PNG/JPEG image export from Lucid diagrams
- 🤖 Built-in AI analysis with multimodal LLMs (GPT-4o, Claude 3, etc.)
- ⚙️ Environment-based API key management
- 📝 TypeScript implementation with full test coverage
- 🔧 MCP Inspector integration for easy testing

## Installation

### NPM Package

```bash
npm install -g lucid-mcp-server
```

### From Source

```bash
git clone https://github.com/yourusername/lucid-mcp-server.git
cd lucid-mcp-server
npm install
npm run build
```

## Quick Start

1. **Get API Keys**
   - [Lucid API Key](https://developer.lucid.co/docs/api-keys)
   - [Azure OpenAI API Key](https://portal.azure.com/) (optional, for AI analysis)

2. **Configure Environment**

```bash
export LUCID_API_KEY="your_api_key_here"
export AZURE_OPENAI_API_KEY="your_azure_openai_key"  # Optional
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com"  # Optional
export AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4o"  # Optional
```

3. **Run the Server**

```bash
# If installed globally
lucid-mcp-server

# Or from source
node ./build/index.js
```

4. **Test with MCP Inspector**

```bash
npx @modelcontextprotocol/inspector lucid-mcp-server
```

## 🔧 VS Code Configuration

### For Regular Users

Add to your VS Code settings (`~/.config/@modelcontextprotocol/mcp-config.json`):

```json
{
  "servers": {
    "lucid-mcp-server": {
      "type": "stdio",
      "command": "lucid-mcp-server"
    }
  }
}
```

### For Developers

If you're developing this package locally, use the development configuration in `.vscode/mcp.json`:

```json
{
  "servers": {
    "lucid-mcp-server-dev": {
      "type": "stdio", 
      "command": "node",
      "args": ["./build/index.js"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

## Tools Available

### 🔍 `get-document`
Get document metadata or analyze with AI vision

**Parameters:**
- `documentId` (string) - Document ID from Lucid URL
- `analyzeImage` (boolean, optional) - Perform AI analysis of exported diagram  
- `pageId` (string, optional) - Page ID to export (default: "0_0")

**Example:**
```json
{
  "documentId": "8077d744-2b83-4f07-bde3-f2b1d9a0df65",
  "analyzeImage": true
}
```

### 📋 `search-documents`  
List documents in your Lucid account

**Parameters:**
- `keywords` (string, optional) - Search keywords to filter documents

**Example:**
```json
{
  "keywords": "architecture diagram"
}
```

## 📁 Project Structure

```
src/
├── index.ts              # MCP server entry point
├── services/
│   └── lucidService.ts   # Lucid API integration
├── tools/                # MCP tool implementations
│   ├── getDocument.ts    # Document retrieval and analysis
│   └── searchDocuments.ts # Document search
├── llm/                  # AI analysis components
│   ├── image-analyzer.ts # Analysis orchestrator
│   ├── types.ts         # Type definitions
│   ├── prompts/         # Analysis prompts
│   └── providers/       # LLM provider implementations
└── utils/
    └── logger.ts        # Logging utilities
```

## 🔧 Development

### Running Tests

```bash
npm test                 # Run all tests
npm run test:coverage   # Run with coverage report
npm run test:watch     # Watch mode
npm run inspector       # Start MCP Inspector for interactive testing
```

### Adding New Tools

1. Create tool file in `src/tools/`
2. Export schema and handler functions  
3. Add exports to `src/tools/index.ts`
4. Register tool in `src/index.ts`
5. Add tests in `test/unit/tools/`

## 📖 Examples

### Document ID Extraction
Extract document ID from Lucid URLs:
```
https://lucid.app/lucidchart/demo-document-id-here-12345678/edit
                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                            This is your document ID
```

### Test Document
For testing: Create a demo document in your Lucid account or use any public document
Document ID: `demo-document-id-here-12345678`

## 📋 Requirements

- Node.js 18+ 
- Lucid API key ([Get one here](https://developer.lucid.co/docs/api-keys))
- Azure OpenAI or compatible LLM service (optional, for AI analysis)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 References

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Lucid Developer API](https://developer.lucid.co/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
