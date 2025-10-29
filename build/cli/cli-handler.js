/**
 * Parse CLI arguments
 * @param {string[]} args - Command line arguments
 * @returns {CliArgs} Parsed arguments
 */
export function parseCliArgs(args) {
    return {
        help: args.includes('--help') || args.includes('-h'),
        version: args.includes('--version') || args.includes('-v')
    };
}
/**
 * Show help message
 * @param {string} version - Application version
 */
export function showHelp(version) {
    console.log(`
Lucid MCP Server v${version}

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
  OPENAI_API_KEY             Optional: OpenAI API key for AI analysis
  OPENAI_MODEL               Optional: OpenAI model to use (default: gpt-4o)

TOOLS:
  get-document       Get document metadata and export images
  search-documents   Search for documents in your Lucid account

For more information, visit: https://github.com/smartzan63/lucid-mcp-server
`);
}
/**
 * Show version information
 * @param {string} version - Application version
 */
export function showVersion(version) {
    console.log(version);
}
/**
 * Handle CLI arguments and exit if needed
 * @param {string[]} args - Command line arguments
 * @param {string} version - Application version
 * @returns {boolean} True if should continue, false if should exit
 */
export function handleCliArgs(args, version) {
    const parsed = parseCliArgs(args);
    if (parsed.help) {
        showHelp(version);
        process.exit(0);
    }
    if (parsed.version) {
        showVersion(version);
        process.exit(0);
    }
    return true;
}
