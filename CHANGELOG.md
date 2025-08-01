# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.5] - 2025-08-01

### Added
- **Tab Metadata Tool**: New `get-document-tabs` tool for retrieving lightweight page metadata from Lucidchart documents
- Returns compact JSON with document info and page metadata (id, title, index) without heavy content like shapes and lines
- Optimized for LLM usage scenarios and automation workflows

### Changed
- Enhanced MCP server tool registration to include 3 tools (was 2)
- Updated test suite to support new tool functionality

## [0.1.4] - 2025-07-01

### Added
- **OpenAI Provider**: Added support for OpenAI as an alternative to Azure OpenAI
- Automatic fallback between Azure OpenAI and OpenAI providers based on configuration

### Changed
- Refactored LLM provider architecture to support multiple providers
- Updated tests to reflect new provider behavior

## [0.1.3] - 2025-06-23

### Added
- Utility functions in lucidModels.ts (validation, filtering, sorting)
- Comprehensive unit and integration tests (81%+ coverage)

### Fixed
- **Critical**: "Cannot find module 'oas'" error in npm package
- isValidLucidDocument type guard returning null instead of false

### Changed
- **Major refactoring**: Extracted logic from index.ts into separate modules (cli, config, server)
- Streamlined README.md for easier installation
- Improved error handling and environment validation

## [0.1.0] - [0.1.2] - 2025-06-19

### Added
- Initial release of Lucid MCP Server
- Document search and retrieval functionality
- PNG/JPEG image export from Lucid diagrams
- AI-powered diagram analysis with multimodal LLMs
- TypeScript implementation with comprehensive test coverage
- Support for LucidChart, LucidSpark, and LucidScale
- Environment-based configuration
- MCP Inspector integration for testing

### Features
- `get-document` tool for document metadata and AI analysis
- `search-documents` tool for document discovery
- Built-in image analysis using Azure OpenAI GPT-4o
- Configurable AI analysis with custom prompts
- Comprehensive error handling and logging

### Dependencies
- Model Context Protocol SDK v1.13.0
- Official Lucid Developer API SDK
- Azure OpenAI integration
- Zod for schema validation
