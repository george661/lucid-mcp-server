# Lucid MCP Server

[![npm version](https://img.shields.io/npm/v/lucid-mcp-server.svg)](https://www.npmjs.com/package/lucid-mcp-server)
[![npm downloads](https://img.shields.io/npm/dm/lucid-mcp-server.svg)](https://www.npmjs.com/package/lucid-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Install in VS Code](https://img.shields.io/badge/Install_in-VS_Code-0078d4?style=flat-square&logo=visualstudiocode)](https://vscode.dev/redirect/mcp/install?name=lucid-mcp-server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22lucid-mcp-server%22%7D)

Model Context Protocol (MCP) server for Lucid App integration. Enables multimodal LLMs to access and analyze Lucid diagrams through visual exports.

## Features

- 🔍 **Document discovery** and metadata retrieval from LucidChart, LucidSpark, and LucidScale
- 🖼️ **PNG image export** from Lucid diagrams  
- 🤖 **AI-powered diagram analysis** with multimodal LLMs (requires Azure OpenAI)
- ⚙️ **Environment-based API key management**
- 📝 **TypeScript implementation** with full test coverage
- 🔧 **MCP Inspector integration** for easy testing

## Quick Start

1. **Install the package**: `npm install -g lucid-mcp-server`

2. **Get your Lucid API Key** from [Lucid Developer Portal](https://developer.lucid.co/docs/api-keys) ⚠️ **REQUIRED**

3. **Set environment variable**:
   ```bash
   # Required
   export LUCID_API_KEY="your_api_key_here"
   
   # Optional (for AI analysis)
   export AZURE_OPENAI_API_KEY="your_azure_openai_key"
   export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com"  
   export AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4o"
   export OPENAI_API_KEY="your_openai_api_key"
   export OPENAI_MODEL="gpt-4o"
   ```

4. **Test it works**:
   ```bash
   npx @modelcontextprotocol/inspector lucid-mcp-server
   ```

## VS Code Configuration

### Method 1: Through VS Code UI (Recommended)

1. Open VS Code
2. Open **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Run command: **"MCP: Add Server"**
4. Choose **"npm"** as source
5. Enter package name: **`lucid-mcp-server`**
6. VS Code will automatically add the server to your configuration and prompt for API keys
7. Verify automatically created configuration, because AI can make mistakes.

### Method 2: Quick Install Link

Click the **"Install in VS Code"** badge above, then:

1. Click **"Install"** when prompted
2. **Add environment variables** to your VS Code `settings.json` (see Manual Configuration below)
3. **Restart VS Code** to apply changes
4. Server will prompt for API keys when first used

### Method 3: Manual Configuration

Add this to your VS Code `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "lucid-mcp-server": {
        "type": "stdio",
        "command": "lucid-mcp-server",
        "env": {
          "LUCID_API_KEY": "${input:lucid_api_key}",
          "AZURE_OPENAI_API_KEY": "${input:azure_openai_api_key}",
          "AZURE_OPENAI_ENDPOINT": "${input:azure_openai_endpoint}",
          "AZURE_OPENAI_DEPLOYMENT_NAME": "${input:azure_openai_deployment_name}",
          "OPENAI_API_KEY": "${input:openai_api_key}",
          "OPENAI_MODEL": "${input:openai_model}"
        }
      }
    },
    "inputs": [
      {
        "id": "lucid_api_key", 
        "type": "promptString",
        "description": "Lucid API Key (REQUIRED)"
      },
      {
        "id": "azure_openai_api_key",
        "type": "promptString", 
        "description": "Azure OpenAI API Key (optional - for AI analysis)"
      },
      {
        "id": "azure_openai_endpoint",
        "type": "promptString",
        "description": "Azure OpenAI Endpoint (optional - for AI analysis)"
      },
      {
        "id": "azure_openai_deployment_name",
        "type": "promptString",
        "description": "Azure OpenAI Deployment Name (optional - for AI analysis)"
      },
      {
        "id": "openai_api_key",
        "type": "promptString", 
        "description": "OpenAI API Key (optional - for AI analysis)"
      },
      {
        "id": "openai_model",
        "type": "promptString",
        "description": "OpenAI Model (optional - for AI analysis, default: gpt-4o)"
      }
    ]
  }
}
```

### How It Works

After configuration, the server will prompt you for API keys when first used:
- **Lucid API Key** (required) - Get from [Lucid Developer Portal](https://developer.lucid.co/docs/api-keys)
- **Azure OpenAI keys** (optional) - Only needed for AI diagram analysis

**Basic commands** (works with just Lucid API key):
- "Show me all my Lucid documents"
- "Get information about this document: [document-id]"

**AI Analysis** (requires Azure OpenAI setup):
- "Analyze this diagram: [document-id]"
- "What does this Lucid diagram show: [document-id]"

## Available Tools

### 🔍 `search-documents`  
List documents in your Lucid account

**Parameters:**
- `keywords` (string, optional) - Search keywords to filter documents

**Example:**
```json
{
  "keywords": "architecture diagram"
}
```

### 📋 `get-document`
Get document metadata and optionally analyze with AI

**Parameters:**
- `documentId` (string) - Document ID from Lucid URL  
- `analyzeImage` (boolean, optional) - Perform AI analysis ⚠️ **Requires Azure OpenAI**
- `pageId` (string, optional) - Page ID to export (default: "0_0")

**Example:**
```json
{
  "documentId": "demo-document-id-here-12345678/edit",
  "analyzeImage": true
}
```

## Small Demo
![image](https://github.com/user-attachments/assets/eb6a2870-2544-4c2f-8b26-aa2b93e8972a)

## Requirements

- **Node.js 18+** 
- **Lucid API key** ([Get one here](https://developer.lucid.co/docs/api-keys)) ⚠️ **Required**
- **Azure OpenAI** (optional, for AI analysis features)

> 💡 **Note**: Without Azure OpenAI, document search and metadata work normally. AI analysis requires Azure OpenAI configuration.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 References

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Lucid Developer API](https://developer.lucid.co/)
- [MCP Typescript SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
