# Contributing to Lucid MCP Server

Thank you for your interest in contributing to Lucid MCP Server! This document provides guidelines and information for contributors.

## Development Setup

1. **Fork and Clone**
```bash
git clone https://github.com/yourusername/lucid-mcp-server.git
cd lucid-mcp-server
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment**
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. **Build and Test**
```bash
npm run build
npm test
```

## Development Workflow

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting
- Add JSDoc comments for public APIs
- Use meaningful variable and function names

### Testing
- Write tests for all new functionality
- Maintain test coverage above 80%
- Use descriptive test names
- Test both success and error cases

### Commit Messages
Follow conventional commits format:
```
type(scope): description

feat(tools): add new diagram analysis tool
fix(api): handle timeout errors properly
docs(readme): update installation instructions
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Pull Request Process

1. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**
- Write code following project conventions
- Add/update tests as needed
- Update documentation if required

3. **Test Your Changes**
```bash
npm run build
npm test
npm run test:coverage
```

4. **Submit Pull Request**
- Provide clear description of changes
- Reference any related issues
- Ensure CI passes

## Adding New Tools

1. **Create Tool File**
```typescript
// src/tools/newTool.ts
import { z } from 'zod';

export const newToolSchema = z.object({
  // Define parameters
});

export async function newToolHandler(args: z.infer<typeof newToolSchema>) {
  // Implementation
}
```

2. **Export from Index**
```typescript
// src/tools/index.ts
export { newToolSchema, newToolHandler } from './newTool.js';
```

3. **Register Tool**
```typescript
// src/index.ts
server.tool(
  "new-tool",
  "Tool description",
  newToolSchema,
  newToolHandler
);
```

4. **Add Tests**
```typescript
// test/unit/tools/newTool.test.ts
import { describe, it, expect } from 'vitest';
import { newToolHandler } from '../../../src/tools/newTool.js';

describe('newTool', () => {
  it('should handle valid input', async () => {
    // Test implementation
  });
});
```

## Code Quality Standards

### TypeScript
- Use strict mode
- Avoid `any` types
- Define proper interfaces
- Use type guards where appropriate

### Error Handling
- Use proper error types
- Provide meaningful error messages
- Log errors appropriately
- Handle async errors properly

### Performance
- Avoid blocking operations
- Use streaming where possible
- Implement proper caching
- Monitor memory usage

## Documentation

### Code Documentation
- Add JSDoc comments for public APIs
- Document complex algorithms
- Include usage examples
- Keep comments up to date

### User Documentation
- Update README.md for new features
- Add examples for new tools
- Update API documentation
- Include troubleshooting guides

## Issues and Bugs

### Reporting Issues
- Use issue templates
- Provide reproduction steps
- Include environment details
- Add relevant logs/errors

### Bug Fixes
- Write tests that reproduce the bug
- Fix the minimal necessary code
- Verify the fix works
- Update documentation if needed

## Questions and Support

- Open an issue for questions
- Join discussions in GitHub Discussions
- Check existing documentation first
- Provide context for questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
