<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is an MCP Server project for Lucid App (Lucidchart/LucidSpark) integration.

- Always try to get documentation for API that your trying to use, do following: read documentation => write code => test it. If you did something else inbeetween, read documentation again.
- Try to use context7 tool to get documentation for libraries and APIs, if doesn't provide enough information, use web search.
- Always write tests for your code and measure code coverage, desired code coverage is 80% for all new code.
- Maintain test pyramids, prefer unit/component tests over integration tests.
- Prefer updating existing files over creating new ones.
- Keep the codebase clean and maintainable.
- Keep the code modular and testable.
- Simplicity is key, avoid unnecessary complexity.
- If you going to add new code always make sure that the old one is not broken by your change and still needed.
- Don't write unnecessary comments and documentation if not asked
- Use the @modelcontextprotocol/sdk for all MCP protocol logic.
- Don't use emojis in code, comments or documentation.
- Use stdio transport for server communication.
- You can find more info and examples at https://modelcontextprotocol.io/llms-full.txt
- For Lucid API integration, refer to https://developer.lucid.co/
- All documentation and comments must be in English.
