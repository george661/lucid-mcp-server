# Lucid MCP Server

[![smithery badge](https://smithery.ai/badge/@smartzan63/lucid-mcp-server)](https://smithery.ai/server/@smartzan63/lucid-mcp-server)
[![npm version](https://img.shields.io/npm/v/lucid-mcp-server.svg)](https://www.npmjs.com/package/lucid-mcp-server)
[![npm downloads](https://img.shields.io/npm/dm/lucid-mcp-server.svg)](https://www.npmjs.com/package/lucid-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Install in VS Code](https://img.shields.io/badge/Install_in-VS_Code-0078d4?style=flat-square&logo=visualstudiocode)](https://vscode.dev/redirect/mcp/install?name=lucid-mcp-server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22lucid-mcp-server%22%7D)

Model Context Protocol (MCP) server for Lucid App integration. Enables multimodal LLMs to access and analyze Lucid diagrams through visual exports.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [VS Code Integration](#vs-code-integration)
- [Contributing](#contributing)
- [References](#references)
- [License](#license)

## Features

- 🔍 **Document discovery** and metadata retrieval from LucidChart, LucidSpark, and LucidScale
- 🖼️ **PNG image export** from Lucid diagrams  
- 🤖 **AI-powered diagram analysis** with multimodal LLMs (supports Azure OpenAI and OpenAI)
- ⚙️ **Environment-based API key management** with automatic fallback from Azure to OpenAI.
- 📝 **TypeScript implementation** with full test coverage
- 🔧 **MCP Inspector integration** for easy testing

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js**: Version 18 or higher.
- **Lucid API Key**: A key from the [Lucid Developer Portal](https://developer.lucid.co/docs/api-keys) is **required** for all features.
- **AI Provider Key (Optional)**: For AI-powered diagram analysis, you need an API key for either:
    - [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
    - [OpenAI](https://platform.openai.com/)

## Quick Start

Follow these steps to get the server running.

### Installing via Smithery

To install lucid-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@smartzan63/lucid-mcp-server):

```bash
npx -y @smithery/cli install @smartzan63/lucid-mcp-server --client claude
```

### 1. Install
Install the package globally from npm:
```bash
npm install -g lucid-mcp-server
```

### 2. Configure
Set the following environment variables in your terminal. Only the Lucid API key is required.

```bash
# Required for all features
export LUCID_API_KEY="your_api_key_here"

# Optional: For AI analysis, configure either Azure OpenAI or OpenAI

# Option 1: Azure OpenAI (takes precedence)
export AZURE_OPENAI_API_KEY="your_azure_openai_key"
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com"  
export AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4o"

# Option 2: OpenAI (used as a fallback if Azure is not configured)
export OPENAI_API_KEY="your_openai_api_key"
export OPENAI_MODEL="gpt-4o" # Optional, defaults to gpt-4o
```
> **Note**: The server automatically uses Azure OpenAI if `AZURE_OPENAI_API_KEY` is set. If not, it falls back to OpenAI if `OPENAI_API_KEY` is provided.

### 3. Verify
Test your installation using the MCP Inspector:
```bash
npx @modelcontextprotocol/inspector lucid-mcp-server
```

## Usage

Once the server is running, you can interact with it using natural language or by calling its tools directly.

### Example Prompts

- **Basic commands** (works with just a Lucid API key):
  - *"Show me all my Lucid documents"*
  - *"Get information about the document with ID: [document-id]"*

- **AI Analysis** (requires Azure OpenAI or OpenAI setup):
  - *"Analyze this diagram: [document-id]"*
  - *"What does this Lucid diagram show: [document-id]"*

### Available Tools

#### 🔍 `search-documents`  
Lists documents in your Lucid account.

- **Parameters:**
  - `keywords` (string, optional): Search keywords to filter documents.
- **Example:**
  ```json
  {
    "keywords": "architecture diagram"
  }
  ```

#### 📋 `get-document`
Gets document metadata and can optionally perform AI analysis on its visual content.

- **Parameters:**
  - `documentId` (string): The ID of the document from the Lucid URL.
  - `analyzeImage` (boolean, optional): Set to `true` to perform AI analysis. ⚠️ **Requires Azure or OpenAI key.**
  - `pageId` (string, optional): The specific page to export (default: "0_0").
- **Example:**
  ```json
  {
    "documentId": "demo-document-id-here-12345678/edit",
    "analyzeImage": true
  }
  ```

## VS Code Integration

You can integrate the server directly into Visual Studio Code.

### Method 1: Through VS Code UI (Recommended)

1.  Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2.  Run the command: **"MCP: Add Server"**.
3.  Choose **"npm"** as the source.
4.  Enter the package name: **`lucid-mcp-server`**.
5.  VS Code will guide you through the rest of the setup.
6.  Verify automatically created configuration, because AI can make mistakes

### Method 2: Quick Install Link

Click the **"Install in VS Code"** badge at the top of this README, then follow the on-screen prompts. You will need to configure the environment variables manually in your `settings.json`.

### Method 3: Manual Configuration

<details>
<summary>Click to view manual `settings.json` configuration</summary>

Add the following JSON to your VS Code `settings.json` file. This method provides the most control and is useful for custom setups.

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
        "description": "Azure OpenAI API Key (Optional, for AI analysis)"
      },
      {
        "id": "azure_openai_endpoint",
        "type": "promptString",
        "description": "Azure OpenAI Endpoint (Optional, for AI analysis)"
      },
      {
        "id": "azure_openai_deployment_name",
        "type": "promptString",
        "description": "Azure OpenAI Deployment Name (Optional, for AI analysis)"
      },
      {
        "id": "openai_api_key",
        "type": "promptString", 
        "description": "OpenAI API Key (Optional, for AI analysis - used if Azure is not configured)"
      },
      {
        "id": "openai_model",
        "type": "promptString",
        "description": "OpenAI Model (Optional, for AI analysis, default: gpt-4o)"
      }
    ]
  }
}
```
</details>

## Small Demo
![image](https://github.com/user-attachments/assets/eb6a2870-2544-4c2f-8b26-aa2b93e8972a)

## 🤝 Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📚 References

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Lucid Developer API](https://developer.lucid.co/)
- [MCP Typescript SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
